import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import { Loi } from '../../ho-so/scripts/hoso.mjs';
import { kiemSaoKe, lap, xlsxTsv } from './doichieu.mjs';

const CLI = fileURLToPath(new URL('./doichieu.mjs', import.meta.url));
const HDR = 'ngay\tso_tien\tchieu\tma_gd\tnoi_dung\tnguon';
const dir = () => mkdtempSync(join(tmpdir(), 'doichieu-'));
const tsv = (...dong) => {
  const f = join(dir(), 'sk.tsv');
  writeFileSync(f, [HDR, ...dong].join('\n') + '\n');
  return f;
};
const mã = async (p) => {
  try { await p; } catch (e) { return e instanceof Loi ? e.code : e; }
  return 0;
};
const BA_DONG = [
  '2026-09-05\t10000000\tthu\tGD1\tNộp tiền\tnhan/sk.pdf#trang1',
  '2026-09-10\t3000000\tchi\tGD2\tTrả NCC\tnhan/sk.pdf#trang1',
  '2026-09-30\t11000\tchi\tGD3\tPhí SMS\tnhan/sk.pdf#trang2',
];
const goc = { ky: '2026-09', dauKy: 5000000, cuoiKy: 11989000 };

test('kiem-sao-ke: tệp đúng khớp, trả n, thu, chi', () => {
  assert.deepEqual(kiemSaoKe({ tep: tsv(...BA_DONG), ...goc }), { n: 3, thu: 10000000, chi: 3011000, problems: [] });
});

test('kiem-sao-ke: lệch số dư 1.000 đ thì problems có chênh', () => {
  const { problems } = kiemSaoKe({ tep: tsv(...BA_DONG), ...goc, cuoiKy: 11990000 });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /-1\.000 đ/);
});

test('kiem-sao-ke: ngày ngoài kỳ và ma_gd trùng báo cùng một lần', () => {
  const { problems } = kiemSaoKe({
    tep: tsv(BA_DONG[0], '2026-10-01\t3000000\tchi\tGD1\tTrả NCC\tnhan/sk.pdf#trang1'),
    ...goc,
    cuoiKy: 12000000,
  });
  assert.deepEqual(problems, [
    'dòng 3, cột ngay: "2026-10-01" ngoài kỳ 2026-09',
    'dòng 3, cột ma_gd: "GD1" trùng trong tệp',
  ]);
});

test('kiem-sao-ke: thiếu cột tiêu đề là Loi(1)', async () => {
  const f = join(dir(), 'x.tsv');
  writeFileSync(f, 'ngay\tso_tien\n2026-09-01\t1\n');
  assert.equal(await mã(Promise.resolve().then(() => kiemSaoKe({ tep: f, ...goc }))), 1);
});

test('CLI kiem-sao-ke lệch số dư: exit 1, stderr nêu chênh', () => {
  const r = spawnSync('node', [CLI, 'kiem-sao-ke', tsv(...BA_DONG), '--ky', '2026-09', '--dau-ky', '5000000', '--cuoi-ky', '11990000'], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /1\.000 đ/);
});

const dacTa = (dong, extra = {}) => ({
  mst: '0101234567',
  ky: '2026-09',
  tieuDe: 'Đối chiếu TK 1121 với sao kê',
  a: { ten: 'Sổ chi tiết TK 1121', tep: 'nhan/so.xlsx' },
  b: { ten: 'Sao kê', tep: 'lam/sk.tsv' },
  soDu: { a: 120000000, nguonA: "'TK1121'!F88", b: 118500000, nguonB: 'nhan/sk.pdf#trang3' },
  dong,
  ...extra,
});
const DONG = { ngay: '2026-09-30', noiDung: 'Phí SMS', a: null, b: 11000, nhom: 'phi-lai-ngan-hang', nguonA: '', nguonB: 'lam/sk.tsv:dòng 4', ghiChu: '' };

async function doiRa(d, ten = 'dc.xlsx') {
  const ra = join(dir(), ten);
  await lap({ dacTa: d, ra });
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ra);
  return wb.getWorksheet('DoiChieu');
}

test('lap: công thức chênh, tổng, chênh chưa giải thích; =1+1 giữ là chuỗi', async () => {
  const ws = await doiRa(dacTa([DONG, { ...DONG, noiDung: '=1+1', b: null, a: 500, nguonA: 'x', nguonB: '' }]));
  assert.equal(ws.getCell('F10').value.formula, 'N(D10)-N(E10)');
  assert.equal(ws.getCell('C11').value, '=1+1');
  assert.equal(ws.getCell('G10').value, 'Phí hoặc lãi ngân hàng');
  assert.equal(ws.getCell('D12').value.formula, 'SUM(D10:D11)');
  assert.equal(ws.getCell('F13').value.formula, 'D13-E13');
  assert.equal(ws.getCell('F14').value.formula, 'F13-F12');
});

test('lap: không có dòng thì tổng không tự tham chiếu', async () => {
  const ws = await doiRa(dacTa([]));
  assert.equal(ws.getCell('D10').value.formula, 'SUM(0)');
  assert.equal(ws.getCell('F12').value.formula, 'F11-F10');
});

test('lap: từ chối dữ liệu sai bằng Loi(1)', async () => {
  const ra = join(dir(), 'dc.xlsx');
  assert.equal(await mã(lap({ dacTa: dacTa([{ ...DONG, nguonB: '' }]), ra })), 1);
  assert.equal(await mã(lap({ dacTa: dacTa([{ ...DONG, nhom: 'khong-co' }]), ra })), 1);
  const nhan = join(dir(), 'nhan');
  mkdirSync(nhan);
  assert.equal(await mã(lap({ dacTa: dacTa([DONG]), ra: join(nhan, 'x.xlsx') })), 1);
});

test('xlsx-tsv: tham chiếu dòng, ngày, số, kết quả công thức, chuỗi bị làm sạch', async () => {
  const f = join(dir(), 'in.xlsx');
  const wb = new ExcelJS.Workbook();
  const a = wb.addWorksheet('TK 1121');
  a.addRow(['Ngày', 'Số tiền', 'Ghi chú']);
  a.addRow([new Date(Date.UTC(2026, 8, 5)), 1500, 'a\tb']);
  a.addRow([]);
  a.addRow(['', { formula: 'B2*2', result: 3000 }, '=cmd']);
  wb.addWorksheet('Khác').addRow(['x']);
  await wb.xlsx.writeFile(f);
  assert.equal(
    await xlsxTsv({ tep: f, sheet: 'TK 1121' }),
    ["o\tA\tB\tC", "'TK 1121'!A1\tNgày\tSố tiền\tGhi chú", "'TK 1121'!A2\t2026-09-05\t1500\ta b", "'TK 1121'!A4\t\t3000\t'=cmd"].join('\n'),
  );
  assert.equal((await xlsxTsv({ tep: f })).split('\n').at(-1), "'Khác'!A1\tx\t\t");
  assert.equal(await mã(xlsxTsv({ tep: f, sheet: 'Không có' })), 1);
});
