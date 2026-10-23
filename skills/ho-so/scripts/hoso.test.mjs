import test from 'node:test';
import assert from 'node:assert/strict';
import { appendFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Loi, chuyen, clean, init, kiem, kiemMst, ky, nhan, trangThaiHienTai } from './hoso.mjs';

const MST = '0101234567';
const KY = '2026-09';
const CLI = fileURLToPath(new URL('./hoso.mjs', import.meta.url));

function setup() {
  const root = mkdtempSync(join(tmpdir(), 'hoso-'));
  init({ root, mst: MST, ten: 'Công ty A', cheDo: 'TT133' });
  ky({ root, mst: MST, ky: KY });
  const f = join(root, 'in-a.txt');
  writeFileSync(f, 'a1');
  return { root, f, base: { root, mst: MST, ky: KY } };
}
const dong = (root, name) =>
  readFileSync(join(root, MST, KY, name), 'utf8').split('\n').filter(Boolean);
const gõ = (s) => () => s;
const mã = async (p) => {
  try { await p; } catch (e) { return e instanceof Loi ? e.code : e; }
  return 0;
};

test('chuyển trái bảng (mo -> da-duyet) exit 1 và không ghi gì', async () => {
  const { root, base } = setup();
  const truoc = dong(root, 'trang-thai.tsv');
  assert.equal(await mã(chuyen({ ...base, den: 'da-duyet', nguoi: 'An', xacNhan: gõ(MST) })), 1);
  assert.deepEqual(dong(root, 'trang-thai.tsv'), truoc);
});

test('dang-lam -> cho-duyet bị từ chối khi tệp nhan bị sửa; được phép khi kiem khớp', async () => {
  const { root, f, base } = setup();
  nhan({ ...base, files: [f] });
  await chuyen({ ...base, den: 'dang-lam' });
  writeFileSync(join(root, MST, KY, 'nhan', 'in-a.txt'), 'sửa');
  assert.equal(await mã(chuyen({ ...base, den: 'cho-duyet' })), 1);
  assert.equal(trangThaiHienTai(base), 'dang-lam');
  writeFileSync(join(root, MST, KY, 'nhan', 'in-a.txt'), 'a1');
  assert.deepEqual(kiem(base), { n: 1, problems: [] });
  await chuyen({ ...base, den: 'cho-duyet' });
  assert.equal(trangThaiHienTai(base), 'cho-duyet');
});

test('chuyển của người: không TTY -> exit 3; xác nhận đúng MST -> ghi dòng', async () => {
  const { base, root } = setup();
  await chuyen({ ...base, den: 'dang-lam' });
  await chuyen({ ...base, den: 'cho-duyet' });
  assert.equal(await mã(chuyen({ ...base, den: 'da-duyet', nguoi: 'An' })), 3);
  assert.equal(await mã(chuyen({ ...base, den: 'da-duyet', nguoi: 'An', xacNhan: gõ('sai') })), 3);
  assert.equal(trangThaiHienTai(base), 'cho-duyet');
  await chuyen({ ...base, den: 'da-duyet', nguoi: 'An', ghiChu: 'ok', xacNhan: gõ(MST) });
  const cuoi = dong(root, 'trang-thai.tsv').at(-1).split('\t');
  assert.deepEqual(cuoi.slice(1), ['cho-duyet', 'da-duyet', 'An', 'ok']);
});

test('chuyển của người thiếu --nguoi -> exit 2', async () => {
  const { base } = setup();
  await chuyen({ ...base, den: 'dang-lam' });
  await chuyen({ ...base, den: 'cho-duyet' });
  assert.equal(await mã(chuyen({ ...base, den: 'da-duyet', xacNhan: gõ(MST) })), 2);
});

test('nhan hai lần cùng tệp là no-op; nội dung đổi thì exit 1', async () => {
  const { root, f, base } = setup();
  nhan({ ...base, files: [f] });
  assert.equal(nhan({ ...base, files: [f] }), 0);
  assert.equal(dong(root, 'bang-bam.tsv').length, 2);
  writeFileSync(f, 'a2');
  assert.throws(() => nhan({ ...base, files: [f] }), (e) => e.code === 1);
  assert.equal(dong(root, 'bang-bam.tsv').length, 2);
  assert.equal(readFileSync(join(root, MST, KY, 'nhan', 'in-a.txt'), 'utf8'), 'a1');
});

test('nhan bị từ chối khi kỳ da-khoa', async () => {
  const { f, base } = setup();
  await chuyen({ ...base, den: 'dang-lam' });
  await chuyen({ ...base, den: 'cho-duyet' });
  await chuyen({ ...base, den: 'da-duyet', nguoi: 'An', xacNhan: gõ(MST) });
  await chuyen({ ...base, den: 'da-khoa', nguoi: 'An', xacNhan: gõ(MST) });
  assert.throws(() => nhan({ ...base, files: [f] }), (e) => e.code === 1);
});

test('kiem báo tệp thừa và tệp mất', () => {
  const { root, f, base } = setup();
  nhan({ ...base, files: [f] });
  writeFileSync(join(root, MST, KY, 'nhan', 'la.txt'), 'x');
  appendFileSync(join(root, MST, KY, 'bang-bam.tsv'), 'ts\tmat.txt\tdeadbeef\t1\n');
  assert.equal(kiem(base).problems.length, 2);
});

test('clean() chặn công thức và xuống dòng/tab', () => {
  assert.equal(clean('=SUM(A1)'), "'=SUM(A1)");
  assert.equal(clean('a\tb'), 'a b');
  assert.equal(clean('a\r\nb'), 'a  b');
});

test('MST "12345" bị từ chối; hai dạng hợp lệ được nhận', () => {
  assert.throws(() => kiemMst('12345'), (e) => e.code === 2);
  assert.equal(kiemMst('0101234567'), '0101234567');
  assert.equal(kiemMst('0101234567-001'), '0101234567-001');
});

test('init idempotent; khác nội dung -> exit 1', () => {
  const { root } = setup();
  assert.equal(init({ root, mst: MST, ten: 'Công ty A', cheDo: 'TT133' }), 'đã có');
  assert.throws(() => init({ root, mst: MST, ten: 'Công ty B', cheDo: 'TT133' }), (e) => e.code === 1);
});

test('CLI: thiếu root -> exit 2; chuyển của người khi không TTY -> exit 3', () => {
  const { root, base } = setup();
  const chay = (args, env) => spawnSync(process.execPath, [CLI, ...args], { env: { PATH: process.env.PATH, ...env }, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
  assert.equal(chay(['trang-thai', MST, KY], {}).status, 2);
  assert.equal(chay(['trang-thai', MST, KY], { KETOAN_ROOT: root }).stdout.trim(), 'mo');
  const dl = chay(['chuyen', MST, KY, 'dang-lam'], { KETOAN_ROOT: root });
  assert.equal(dl.status, 0);
  chay(['chuyen', MST, KY, 'cho-duyet'], { KETOAN_ROOT: root });
  const r = chay(['chuyen', MST, KY, 'da-duyet', '--nguoi', 'An'], { KETOAN_ROOT: root });
  assert.equal(r.status, 3);
  assert.match(r.stderr, /người duyệt gõ xác nhận/);
  assert.equal(trangThaiHienTai(base), 'cho-duyet');
  rmSync(root, { recursive: true });
});
