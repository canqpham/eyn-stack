#!/usr/bin/env node
import {
  appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync,
  readdirSync, realpathSync, writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

export class Loi extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const CHE_DO = ['TT99', 'TT133', 'TT152'];

export const BANG_CHUYEN = [
  { from: 'mo', to: 'dang-lam', actor: 'agent' },
  { from: 'dang-lam', to: 'cho-duyet', actor: 'agent', canKiem: true },
  { from: 'cho-duyet', to: 'dang-lam', actor: 'human' },
  { from: 'cho-duyet', to: 'da-duyet', actor: 'human' },
  { from: 'da-duyet', to: 'da-khoa', actor: 'human' },
  { from: 'da-khoa', to: 'dang-lam', actor: 'human' },
];
const TRANG_THAI = new Set(BANG_CHUYEN.flatMap((t) => [t.from, t.to]));
const KHOA_NHAN = new Set(['cho-duyet', 'da-duyet', 'da-khoa']);

const HDR_TRANG_THAI = ['ts', 'tu', 'den', 'nguoi', 'ghi_chu'];
const HDR_BANG_BAM = ['ts', 'tep', 'sha256', 'bytes'];
const HDR_NHAT_KY = ['ts', 'phase', 'decision', 'why', 'evidence', 'result'];

export function clean(v) {
  const s = String(v ?? '').replace(/[\t\r\n]/g, ' ');
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
}

export function kiemMst(mst) {
  if (!/^\d{10}(-\d{3})?$/.test(mst ?? '')) {
    throw new Loi(2, `MST không hợp lệ: "${mst}" (cần 10 chữ số, hoặc 10 chữ số + "-" + 3 chữ số).`);
  }
  return mst;
}

export function kiemKy(ky) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(ky ?? '')) {
    throw new Loi(2, `Kỳ không hợp lệ: "${ky}" (cần YYYY-MM, tháng 01-12).`);
  }
  return ky;
}

export function layRoot(flag, env = process.env) {
  const r = flag ?? env.KETOAN_ROOT;
  if (!r) throw new Loi(2, 'Thiếu thư mục gốc: dùng --root <thư mục> hoặc biến môi trường KETOAN_ROOT.');
  return resolve(r);
}

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const now = () => new Date().toISOString();
const dongTsv = (cells) => `${cells.map(clean).join('\t')}\n`;
const themDong = (file, cells) => appendFileSync(file, dongTsv(cells));

function docTsv(file) {
  const [hdr, ...rows] = readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => l.split('\t'));
  return rows.map((r) => Object.fromEntries(hdr.map((h, i) => [h, r[i] ?? ''])));
}

function duongDan(root, mst, ky) {
  const kh = join(root, kiemMst(mst));
  if (!existsSync(join(kh, 'khach-hang.json'))) throw new Loi(1, `Chưa có khách hàng ${mst}. Chạy "init" trước.`);
  if (ky === undefined) return { kh };
  const dir = join(kh, kiemKy(ky));
  if (!existsSync(join(dir, 'trang-thai.tsv'))) throw new Loi(1, `Chưa mở kỳ ${ky} cho ${mst}. Chạy "ky" trước.`);
  return {
    kh, dir,
    nhan: join(dir, 'nhan'),
    trangThai: join(dir, 'trang-thai.tsv'),
    bangBam: join(dir, 'bang-bam.tsv'),
    nhatKy: join(dir, 'nhat-ky.tsv'),
  };
}

export function trangThaiHienTai({ root, mst, ky }) {
  const p = duongDan(root, mst, ky);
  const rows = docTsv(p.trangThai);
  return rows[rows.length - 1].den;
}

export function init({ root, mst, ten, cheDo }) {
  kiemMst(mst);
  if (!ten) throw new Loi(2, 'Thiếu --ten.');
  if (!CHE_DO.includes(cheDo)) throw new Loi(2, `--che-do phải là một trong ${CHE_DO.join(' | ')}.`);
  const dir = join(root, mst);
  const file = join(dir, 'khach-hang.json');
  const moi = { mst, ten, che_do: cheDo };
  if (existsSync(file)) {
    const cu = JSON.parse(readFileSync(file, 'utf8'));
    if (JSON.stringify(cu) !== JSON.stringify(moi)) throw new Loi(1, `Khách hàng ${mst} đã tồn tại với nội dung khác.`);
    return 'đã có';
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, `${JSON.stringify(moi, null, 2)}\n`);
  return 'đã tạo';
}

export function ky({ root, mst, ky: kyHan }) {
  const { kh } = duongDan(root, mst);
  const dir = join(kh, kiemKy(kyHan));
  for (const d of ['nhan', 'lam', 'day-vao']) mkdirSync(join(dir, d), { recursive: true });
  const taoNeuThieu = (name, hdr, rows = []) => {
    const f = join(dir, name);
    if (existsSync(f)) return;
    writeFileSync(f, dongTsv(hdr));
    for (const r of rows) themDong(f, r);
  };
  taoNeuThieu('trang-thai.tsv', HDR_TRANG_THAI, [[now(), '', 'mo', 'agent', 'mở kỳ']]);
  taoNeuThieu('bang-bam.tsv', HDR_BANG_BAM);
  taoNeuThieu('nhat-ky.tsv', HDR_NHAT_KY);
}

export function nhan({ root, mst, ky: kyHan, files }) {
  const p = duongDan(root, mst, kyHan);
  const st = trangThaiHienTai({ root, mst, ky: kyHan });
  if (KHOA_NHAN.has(st)) throw new Loi(1, `Kỳ đang ở trạng thái "${st}", không nhận thêm tệp.`);
  if (!files.length) throw new Loi(2, 'Thiếu tệp cần nhận.');
  const daCo = new Map(docTsv(p.bangBam).map((r) => [r.tep, r.sha256]));
  const viec = files.map((f) => {
    if (!existsSync(f)) throw new Loi(1, `Không tìm thấy tệp: ${f}`);
    const buf = readFileSync(f);
    const ten = basename(f);
    const sha = sha256(buf);
    const cu = daCo.get(clean(ten));
    if (cu !== undefined && cu !== sha) throw new Loi(1, `Tệp "${ten}" đã nhận trước đó với nội dung khác; không ghi đè.`);
    if (cu === undefined) daCo.set(clean(ten), sha);
    return { f, ten, sha, bytes: buf.length, moi: cu === undefined };
  });
  for (const v of viec.filter((x) => x.moi)) {
    copyFileSync(v.f, join(p.nhan, v.ten));
    themDong(p.bangBam, [now(), v.ten, v.sha, v.bytes]);
  }
  return viec.filter((v) => v.moi).length;
}

export function kiem({ root, mst, ky: kyHan }) {
  const p = duongDan(root, mst, kyHan);
  const bam = new Map(docTsv(p.bangBam).map((r) => [r.tep, r.sha256]));
  const problems = [];
  const trenDia = readdirSync(p.nhan, { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name);
  for (const ten of trenDia) {
    const sha = bam.get(clean(ten));
    if (sha === undefined) problems.push(`Tệp ${ten} có trong nhan/ nhưng không có trong bảng băm.`);
    else if (sha !== sha256(readFileSync(join(p.nhan, ten)))) problems.push(`Tệp ${ten} đã bị sửa sau khi nhận (sha256 không khớp).`);
  }
  const set = new Set(trenDia.map(clean));
  for (const ten of bam.keys()) if (!set.has(ten)) problems.push(`Tệp ${ten} có trong bảng băm nhưng không còn trong nhan/.`);
  return { n: trenDia.length, problems };
}

async function xacNhanTrenTerminal(mst) {
  if (!process.stdin.isTTY) throw new Loi(3, 'Chuyển trạng thái này cần người duyệt gõ xác nhận trên terminal.');
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  try {
    return await rl.question(`Gõ đúng MST ${mst} để xác nhận: `);
  } finally {
    rl.close();
  }
}

// shortcut: TTY check stops non-interactive agents, not a determined one; upgrade to signed approvals if the firm needs it.
export async function chuyen({ root, mst, ky: kyHan, den, nguoi, ghiChu = '', xacNhan = xacNhanTrenTerminal }) {
  const p = duongDan(root, mst, kyHan);
  if (!TRANG_THAI.has(den)) throw new Loi(2, `Trạng thái không hợp lệ: "${den}" (${[...TRANG_THAI].join(' | ')}).`);
  const tu = trangThaiHienTai({ root, mst, ky: kyHan });
  const t = BANG_CHUYEN.find((x) => x.from === tu && x.to === den);
  if (!t) throw new Loi(1, `Không thể chuyển từ "${tu}" sang "${den}".`);
  if (t.canKiem) {
    const { problems } = kiem({ root, mst, ky: kyHan });
    if (problems.length) throw new Loi(1, `Chưa qua kiểm:\n${problems.join('\n')}`);
  }
  if (t.actor === 'human') {
    if (!nguoi) throw new Loi(2, 'Chuyển trạng thái này cần --nguoi <tên>.');
    if ((await xacNhan(mst)) !== mst) throw new Loi(3, 'Xác nhận không khớp MST; không chuyển trạng thái.');
  }
  themDong(p.trangThai, [now(), tu, den, nguoi ?? 'agent', ghiChu]);
  return { tu, den };
}

export function ghi({ root, mst, ky: kyHan, cells }) {
  const p = duongDan(root, mst, kyHan);
  if (cells.length !== 5) throw new Loi(2, 'Cần đủ 5 tham số: phase decision why evidence result.');
  themDong(p.nhatKy, [now(), ...cells]);
}

const USAGE = `Cách dùng: hoso.mjs [--root <thư mục>] <lệnh> ...
  init <MST> --ten <tên> --che-do <TT99|TT133|TT152>
  ky <MST> <YYYY-MM>
  nhan <MST> <YYYY-MM> <tệp...>
  kiem <MST> <YYYY-MM>
  chuyen <MST> <YYYY-MM> <trạng thái> --nguoi <tên> [--ghi-chu <text>]
  trang-thai <MST> <YYYY-MM>
  ghi <MST> <YYYY-MM> <phase> <decision> <why> <evidence> <result>`;

export async function main(argv, env = process.env, out = console.log) {
  const { values: v, positionals: [lenh, mst, kyHan, ...rest] } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      root: { type: 'string' },
      ten: { type: 'string' },
      'che-do': { type: 'string' },
      nguoi: { type: 'string' },
      'ghi-chu': { type: 'string' },
    },
  });
  if (!lenh) throw new Loi(2, USAGE);
  const root = layRoot(v.root, env);
  const base = { root, mst, ky: kyHan };
  switch (lenh) {
    case 'init': out(`Khách hàng ${mst}: ${init({ root, mst, ten: v.ten, cheDo: v['che-do'] })}.`); break;
    case 'ky': ky({ root, mst, ky: kyHan }); out(`Kỳ ${kyHan} của ${mst} sẵn sàng.`); break;
    case 'nhan': out(`Đã nhận ${nhan({ ...base, files: rest })} tệp mới.`); break;
    case 'kiem': {
      const { n, problems } = kiem(base);
      if (problems.length) throw new Loi(1, problems.join('\n'));
      out(`khớp ${n} tệp`);
      break;
    }
    case 'chuyen': {
      const r = await chuyen({ ...base, den: rest[0], nguoi: v.nguoi, ghiChu: v['ghi-chu'] });
      out(`${r.tu} -> ${r.den}`);
      break;
    }
    case 'trang-thai': out(trangThaiHienTai(base)); break;
    case 'ghi': ghi({ ...base, cells: rest }); out('Đã ghi nhật ký.'); break;
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
