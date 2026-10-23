#!/usr/bin/env node
import { readFileSync, realpathSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import ExcelJS from 'exceljs';
import { Loi, clean, kiemKy, kiemMst } from '../../ho-so/scripts/hoso.mjs';

const COT = ['ngay', 'so_tien', 'chieu', 'ma_gd', 'noi_dung', 'nguon'];

export const NHOM = [
  { ma: 'chenh-thoi-diem', ten: 'Chênh thời điểm' },
  { ma: 'nhap-trung', ten: 'Nhập trùng' },
  { ma: 'thieu-chung-tu', ten: 'Thiếu chứng từ' },
  { ma: 'sai-so-tien', ten: 'Sai số tiền' },
  { ma: 'sai-tai-khoan', ten: 'Sai tài khoản' },
  { ma: 'phi-lai-ngan-hang', ten: 'Phí hoặc lãi ngân hàng' },
  { ma: 'ty-gia', ten: 'Tỷ giá' },
  { ma: 'sai-doi-tuong', ten: 'Sai đối tượng' },
  { ma: 'chua-ro', ten: 'Chưa rõ' },
];
const TEN_NHOM = new Map(NHOM.map((g) => [g.ma, g.ten]));

const vnd = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
const chuoi = (v) => typeof v === 'string' && v.trim() !== '';
const so = (v) => typeof v === 'number' && Number.isFinite(v);

function ngayThat(s) {
  const d = new Date(`${s}T00:00:00Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function doc(tep) {
  try {
    return readFileSync(tep, 'utf8');
  } catch (e) {
    throw new Loi(1, `Không đọc được ${tep}: ${e.code ?? e.message}`);
  }
}

export function kiemSaoKe({ tep, ky: kyHan, dauKy, cuoiKy }) {
  kiemKy(kyHan);
  if (![dauKy, cuoiKy].every(Number.isSafeInteger)) throw new Loi(2, 'Đầu kỳ và cuối kỳ phải là số nguyên.');
  const [hdr, ...dong] = doc(tep).replace(/^\uFEFF/, '').split('\n').map((l) => l.replace(/\r$/, ''));
  const cot = (hdr ?? '').split('\t');
  const thieu = COT.filter((c) => !cot.includes(c));
  if (thieu.length) throw new Loi(1, `Thiếu cột tiêu đề: ${thieu.join(', ')}.`);
  const problems = [];
  const daCo = new Set();
  let n = 0, thu = 0, chi = 0;
  dong.forEach((l, i) => {
    if (l === '') return;
    const dh = i + 2;
    const o = l.split('\t');
    if (o.length !== cot.length) return problems.push(`dòng ${dh}: cần ${cot.length} cột, có ${o.length}`);
    const v = Object.fromEntries(cot.map((c, j) => [c, o[j]]));
    const sai = (c, why) => problems.push(`dòng ${dh}, cột ${c}: "${v[c]}" ${why}`);
    n++;
    if (!ngayThat(v.ngay)) sai('ngay', 'không phải ngày YYYY-MM-DD hợp lệ');
    else if (!v.ngay.startsWith(`${kyHan}-`)) sai('ngay', `ngoài kỳ ${kyHan}`);
    const tien = /^[1-9]\d*$/.test(v.so_tien) ? Number(v.so_tien) : null;
    if (tien === null) sai('so_tien', 'phải là số nguyên dương, chỉ gồm chữ số');
    if (!['thu', 'chi'].includes(v.chieu)) sai('chieu', 'phải là thu hoặc chi');
    // shortcut: banks without transaction ids need a synthetic id, upgrade when such a bank appears.
    if (v.ma_gd === '') sai('ma_gd', 'để trống');
    else if (daCo.has(v.ma_gd)) sai('ma_gd', 'trùng trong tệp');
    daCo.add(v.ma_gd);
    if (v.nguon === '') sai('nguon', 'để trống');
    if (tien !== null && v.chieu === 'thu') thu += tien;
    if (tien !== null && v.chieu === 'chi') chi += tien;
  });
  const chenh = dauKy + thu - chi - cuoiKy;
  if (chenh !== 0) {
    problems.push(`số dư: đầu kỳ ${vnd(dauKy)} + thu ${vnd(thu)} − chi ${vnd(chi)} = ${vnd(dauKy + thu - chi)}, cuối kỳ khai ${vnd(cuoiKy)}, chênh ${vnd(chenh)}`);
  }
  return { n, thu, chi, problems };
}

function kiemDacTa(d) {
  const p = [];
  const can = (ok, why) => ok || p.push(why);
  can(chuoi(d.tieuDe), 'tieuDe: để trống');
  for (const k of ['a', 'b']) {
    can(chuoi(d[k]?.ten), `${k}.ten: để trống`);
    can(chuoi(d[k]?.tep), `${k}.tep: để trống`);
    can(so(d.soDu?.[k]), `soDu.${k}: phải là số`);
    can(chuoi(d.soDu?.[`nguon${k.toUpperCase()}`]), `soDu.nguon${k.toUpperCase()}: để trống`);
  }
  can(Array.isArray(d.dong), 'dong: phải là mảng');
  (Array.isArray(d.dong) ? d.dong : []).forEach((r, i) => {
    const t = `dong[${i}]`;
    can(so(r.a) || so(r.b), `${t}: cần ít nhất một trong a, b là số`);
    for (const k of ['a', 'b']) {
      can(r[k] == null || so(r[k]), `${t}.${k}: "${r[k]}" không phải số`);
      can(r[k] == null || chuoi(r[`nguon${k.toUpperCase()}`]), `${t}.nguon${k.toUpperCase()}: để trống dù có ${k}`);
    }
    can(TEN_NHOM.has(r.nhom), `${t}.nhom: "${r.nhom}" không có trong danh sách nhóm`);
    can(!r.ngay || (ngayThat(r.ngay) && r.ngay.startsWith(`${d.ky}-`)), `${t}.ngay: "${r.ngay}" không phải ngày trong kỳ ${d.ky}`);
  });
  return p;
}

const VIEN = { style: 'thin' };
const VIEN_BON = { top: VIEN, left: VIEN, bottom: VIEN, right: VIEN };
const TO = (argb) => ({ type: 'pattern', pattern: 'solid', bgColor: { argb } });

export async function lap({ dacTa: d, ra }) {
  kiemMst(d.mst);
  kiemKy(d.ky);
  if (resolve(ra).split(sep).includes('nhan')) throw new Loi(1, `Không ghi vào nhan/: ${ra}. Tệp lập đặt trong lam/.`);
  const problems = kiemDacTa(d);
  if (problems.length) throw new Loi(1, problems.join('\n'));

  const wb = new ExcelJS.Workbook();
  wb.calcProperties.fullCalcOnLoad = true;
  const ws = wb.addWorksheet('DoiChieu', { views: [{ state: 'frozen', ySplit: 9 }] });
  [5, 12, 45, 16, 16, 16, 22, 30, 30, 30].forEach((w, i) => { ws.getColumn(i + 1).width = w; });
  [
    ['Tiêu đề', d.tieuDe],
    ['MST', d.mst],
    ['Kỳ', d.ky],
    ['Đơn vị', 'đ, số dương. Chênh = A − B'],
    ['Nguồn A', `${d.a.ten}: ${d.a.tep}`],
    ['Nguồn B', `${d.b.ten}: ${d.b.tep}`],
    ['Ngày lập', new Date().toISOString().slice(0, 10)],
  ].forEach(([nhan, gt], i) => {
    const r = ws.getRow(i + 1);
    r.getCell(2).value = nhan;
    r.getCell(2).font = { bold: true };
    r.getCell(3).value = gt;
    r.getCell(3).alignment = { wrapText: true, vertical: 'top' };
  });
  ws.getCell('C1').font = { bold: true, size: 14 };

  const hdr = ws.getRow(9);
  ['STT', 'Ngày', 'Nội dung', d.a.ten, d.b.ten, 'Chênh (A − B)', 'Nhóm', 'Nguồn A', 'Nguồn B', 'Ghi chú'].forEach((t, i) => {
    const c = hdr.getCell(i + 1);
    c.value = t;
    c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
    c.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
    c.border = VIEN_BON;
  });

  const dau = 10;
  let tongA = 0, tongB = 0;
  d.dong.forEach((x, i) => {
    const n = dau + i;
    tongA += x.a ?? 0;
    tongB += x.b ?? 0;
    ws.getRow(n).values = [
      i + 1, x.ngay || '', x.noiDung ?? '', x.a ?? null, x.b ?? null,
      { formula: `N(D${n})-N(E${n})`, result: (x.a ?? 0) - (x.b ?? 0) },
      TEN_NHOM.get(x.nhom), x.nguonA ?? '', x.nguonB ?? '', x.ghiChu ?? '',
    ];
    for (const c of [3, 8, 9, 10]) ws.getCell(n, c).alignment = { wrapText: true, vertical: 'top' };
    for (let c = 1; c <= 10; c++) ws.getCell(n, c).border = VIEN_BON;
  });

  const tong = dau + d.dong.length;
  const sd = tong + 1;
  const un = tong + 2;
  const tongF = (c) => (d.dong.length ? `SUM(${c}${dau}:${c}${tong - 1})` : 'SUM(0)');
  ws.getRow(tong).values = [
    null, null, 'Tổng',
    { formula: tongF('D'), result: tongA },
    { formula: tongF('E'), result: tongB },
    { formula: tongF('F'), result: tongA - tongB },
  ];
  ws.getRow(sd).values = [
    null, null, 'Số dư cuối kỳ', d.soDu.a, d.soDu.b,
    { formula: `D${sd}-E${sd}`, result: d.soDu.a - d.soDu.b },
    null, d.soDu.nguonA, d.soDu.nguonB,
  ];
  const chuaGiaiThich = d.soDu.a - d.soDu.b - (tongA - tongB);
  ws.getRow(un).values = [
    null, null, 'Chênh chưa giải thích', null, null,
    { formula: `F${sd}-F${tong}`, result: chuaGiaiThich },
  ];
  for (const n of [tong, sd, un]) {
    ws.getRow(n).font = { bold: true };
    for (const c of [8, 9]) ws.getCell(n, c).alignment = { wrapText: true, vertical: 'top' };
  }
  for (let c = 1; c <= 10; c++) ws.getCell(tong, c).border = { top: { style: 'double' } };
  for (let n = dau; n <= un; n++) for (const c of [4, 5, 6]) ws.getCell(n, c).numFmt = '#,##0';
  ws.addConditionalFormatting({
    ref: `F${un}`,
    rules: [
      { type: 'cellIs', operator: 'equal', formulae: [0], style: { fill: TO('FFC6EFCE') } },
      { type: 'cellIs', operator: 'notEqual', formulae: [0], style: { fill: TO('FFFFC7CE') } },
    ],
  });

  await wb.xlsx.writeFile(ra);
  return { ra, soDong: d.dong.length };
}

function giaTri(v) {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (v && typeof v === 'object') {
    if ('result' in v) return giaTri(v.result);
    if (v.richText) return clean(v.richText.map((t) => t.text).join(''));
    if ('error' in v) return clean(v.error);
    if ('formula' in v || 'sharedFormula' in v) return '';
    return clean(v.text);
  }
  return typeof v === 'string' ? clean(v) : String(v ?? '');
}

export async function xlsxTsv({ tep, sheet }) {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.readFile(tep);
  } catch (e) {
    throw new Loi(1, `Không đọc được ${tep}: ${e.code ?? e.message}`);
  }
  const bang = sheet === undefined ? wb.worksheets : wb.worksheets.filter((w) => w.name === sheet);
  if (!bang.length) throw new Loi(1, `Không có sheet "${sheet}" trong ${tep}.`);
  const rong = Math.max(...bang.map((w) => w.columnCount));
  const cot = Array.from({ length: rong }, (_, i) => i + 1);
  const dong = [['o', ...cot.map(tenCot)].join('\t')];
  for (const w of bang) {
    w.eachRow({ includeEmpty: false }, (r, n) => {
      dong.push([`'${w.name.replace(/'/g, "''")}'!A${n}`, ...cot.map((c) => giaTri(r.getCell(c).value))].join('\t'));
    });
  }
  return dong.join('\n');
}

const tenCot = (c) => (c > 26 ? tenCot(Math.floor((c - 1) / 26)) : '') + String.fromCharCode(65 + ((c - 1) % 26));

const USAGE = `Cách dùng: doichieu.mjs <lệnh> ...
  kiem-sao-ke <tệp.tsv> --ky <YYYY-MM> --dau-ky <số> --cuoi-ky <số>
  lap <dac-ta.json> <ra.xlsx>
  xlsx-tsv <tệp.xlsx> [--sheet <tên>]`;

const nguyen = (s, ten) => {
  if (!/^-?\d+$/.test(s ?? '')) throw new Loi(2, `${ten} phải là số nguyên: "${s}".`);
  return Number(s);
};

export async function main(argv, out = console.log) {
  const { values: v, positionals: [lenh, tep, ra] } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      ky: { type: 'string' },
      'dau-ky': { type: 'string' },
      'cuoi-ky': { type: 'string' },
      sheet: { type: 'string' },
    },
  });
  if (!lenh) throw new Loi(2, USAGE);
  switch (lenh) {
    case 'kiem-sao-ke': {
      const { n, thu, chi, problems } = kiemSaoKe({
        tep, ky: v.ky, dauKy: nguyen(v['dau-ky'], '--dau-ky'), cuoiKy: nguyen(v['cuoi-ky'], '--cuoi-ky'),
      });
      if (problems.length) throw new Loi(1, problems.join('\n'));
      out(`khớp ${n} dòng, thu ${vnd(thu)}, chi ${vnd(chi)}`);
      break;
    }
    case 'lap': {
      let dacTa;
      try {
        dacTa = JSON.parse(doc(tep));
      } catch (e) {
        throw e instanceof Loi ? e : new Loi(1, `Đặc tả không phải JSON hợp lệ: ${e.message}`);
      }
      const r = await lap({ dacTa, ra });
      out(`Đã lập ${r.ra}, ${r.soDong} dòng.`);
      break;
    }
    case 'xlsx-tsv': out(await xlsxTsv({ tep, sheet: v.sheet })); break;
    default: throw new Loi(2, `Lệnh không rõ: "${lenh}".\n${USAGE}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((e) => {
    if (e instanceof Loi) {
      console.error(e.message);
      process.exitCode = e.code;
    } else if (e?.code?.startsWith?.('ERR_PARSE_ARGS')) {
      console.error(`${e.message}\n${USAGE}`);
      process.exitCode = 2;
    } else {
      throw e;
    }
  });
}
