// Pixel width of page titles in Google's desktop title font (20px Arial). Google
// cuts a title wider than about 580px, whatever its number of characters.
//   node scripts/title-width.mjs "Title one" "Title two"
//   node scripts/title-width.mjs <crawl.json>     every title of a seo-crawl.mjs snapshot
// Needs Google Chrome (set CHROME_PATH if it is not in the default place).
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { tmpdir } from "node:os";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const LIMIT = 580;

const args = process.argv.slice(2);
const titles =
  args.length === 1 && args[0].endsWith(".json")
    ? [...new Set(JSON.parse(readFileSync(args[0], "utf8")).pages.map((p) => p.title).filter(Boolean))]
    : args;
if (titles.length === 0) {
  console.log('usage: node scripts/title-width.mjs "Title one" "Title two" | <crawl.json>');
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "title-width-"));
const page = join(dir, "measure.html");
writeFileSync(
  page,
  `<!doctype html><meta charset=utf-8><body><script>
const c=document.createElement("canvas").getContext("2d"); c.font="20px Arial";
document.body.setAttribute("data-out", JSON.stringify(${JSON.stringify(titles)}.map(t=>[Math.round(c.measureText(t).width), t.length, t])));
</script>`
);
const out = execFileSync(
  CHROME,
  ["--headless=new", "--disable-gpu", `--user-data-dir=${join(dir, "chrome")}`, "--dump-dom", pathToFileURL(page).href],
  { encoding: "utf8" }
);
const raw = out.match(/data-out="([^"]*)"/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const rows = JSON.parse(raw).sort((a, b) => b[0] - a[0]);
for (const [px, chars, title] of rows) console.log(`${px}px\t${chars}c\t${px > LIMIT ? "CUT " : "ok  "}${title}`);
