/* Renders resume/resume.html to public/Shiezza-Lauron-Resume.pdf via
   headless Chrome. The site links that path from four places in
   page.tsx, so the filename must not change.

   Usage: node resume/build.mjs

   The sheet uses `height: 297mm; overflow: hidden` to stop Chrome
   emitting a spurious blank second page. That clip also means content
   which runs past the page is silently truncated rather than spilling
   somewhere visible, so this script measures an UNCLIPPED copy first
   and refuses to build if the content does not genuinely fit. Never
   drop that check: without it, editing copy can drop whole sections
   off the PDF with no error and no visual warning in the HTML. */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { existsSync, readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { inflateSync } from "node:zlib";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "resume.html");
const out = resolve(here, "..", "public", "Shiezza-Lauron-Resume.pdf");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}`);
  process.exit(1);
}

const chrome = (args) =>
  execFileSync(CHROME, ["--headless", "--disable-gpu", ...args], {
    stdio: ["ignore", "ignore", "pipe"],
  });

/* ---- 1. overflow guard, measured without the clip ---- */
const A4_PX = Math.round((794 * 297) / 210); // 794px wide render of A4
const tmp = mkdtempSync(join(tmpdir(), "resume-"));
const probeHtml = join(tmp, "probe.html");
const probePng = join(tmp, "probe.png");

writeFileSync(
  probeHtml,
  readFileSync(src, "utf8").replace(
    "height: 297mm;\n    overflow: hidden;",
    "min-height: 297mm;",
  ),
);

chrome([
  `--screenshot=${probePng}`,
  "--window-size=794,2400",
  "--hide-scrollbars",
  `file://${probeHtml}`,
]);

/* Last row containing non-background pixels in the main (left) column.
   The navy sidebar always runs full height, so it is excluded. */
const png = readFileSync(probePng);
const bottom = lastInkRow(png);

if (bottom > A4_PX) {
  console.error(
    `Content overflows the page by ${bottom - A4_PX}px ` +
      `(bottom ${bottom}, page ${A4_PX}).\n` +
      `The PDF would silently drop whatever sits past the boundary.\n` +
      `Reduce body font-size or line-height in resume.html, or cut content.`,
  );
  process.exit(1);
}

console.log(`Fits: content bottom ${bottom}px, page ${A4_PX}px (${A4_PX - bottom}px slack)`);

/* ---- 2. render ---- */
chrome(["--no-pdf-header-footer", `--print-to-pdf=${out}`, `file://${src}`]);

const pages = (readFileSync(out).toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
if (pages !== 1) {
  console.error(`Expected a 1-page PDF, got ${pages}.`);
  process.exit(1);
}

console.log(`Wrote ${out} (${pages} page)`);

/* Minimal PNG decoder: enough to find the lowest row with non-white
   pixels in the left 540px, avoiding an image-library dependency. */
function lastInkRow(buf) {
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
    throw new Error(`Unsupported PNG: depth ${bitDepth}, color ${colorType}`);
  }
  const channels = colorType === 6 ? 4 : 3;

  // concatenate IDAT chunks
  let idat = [];
  let off = 8;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    if (type === "IDAT") idat.push(buf.subarray(off + 8, off + 8 + len));
    off += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));

  const stride = width * channels;
  const prev = Buffer.alloc(stride);
  const cur = Buffer.alloc(stride);
  let pos = 0;
  let last = 0;
  const limit = Math.min(540, width) * channels;

  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    raw.copy(cur, 0, pos, pos + stride);
    pos += stride;
    unfilter(filter, cur, prev, channels, stride);
    for (let i = 0; i < limit; i += channels) {
      if (cur[i] < 235 || cur[i + 1] < 235 || cur[i + 2] < 235) {
        last = y;
        break;
      }
    }
    cur.copy(prev);
  }
  return last;
}

function unfilter(type, cur, prev, bpp, stride) {
  for (let i = 0; i < stride; i++) {
    const a = i >= bpp ? cur[i - bpp] : 0;
    const b = prev[i];
    const c = i >= bpp ? prev[i - bpp] : 0;
    let v = cur[i];
    if (type === 1) v += a;
    else if (type === 2) v += b;
    else if (type === 3) v += (a + b) >> 1;
    else if (type === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
    }
    cur[i] = v & 0xff;
  }
}
