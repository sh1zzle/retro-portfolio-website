/* Renders resume/resume.html to public/Shiezza-Lauron-Resume.pdf via
   headless Chrome. The site links that path from four places in
   page.tsx, so the filename must not change.

   Usage: node resume/build.mjs */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "resume.html");
const out = resolve(here, "..", "public", "Shiezza-Lauron-Resume.pdf");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}`);
  process.exit(1);
}

execFileSync(CHROME, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${out}`,
  `file://${src}`,
], { stdio: "inherit" });

console.log(`Wrote ${out}`);
