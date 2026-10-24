// How much text the pages share, to catch near-duplicates: Google can treat a set
// of look-alike area pages as doorway pages. Compares the <main> text of every
// indexable page with every other page of the same language (5-word shingles,
// Jaccard). Needs a snapshot from seo-crawl.mjs and the same running build:
//   node scripts/page-similarity.mjs <crawl.json> [--base http://localhost:3123]
// In October 2026 the area pages shared about 12% of their text with each other.
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const CRAWL = args[0];
const BASE = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:3123";
if (!CRAWL || CRAWL.startsWith("--")) {
  console.log("usage: node scripts/page-similarity.mjs <crawl.json> [--base <url>]");
  process.exit(1);
}
// Area pages: /massage-a-domicile-… in French, /en/massage-… in English.
const isArea = (path) => /^\/massage-a-domicile-|^\/en\/massage-/.test(path);

const words = (html) => {
  const m = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return (m ? m[1] : html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
};
const shingles = (w) => {
  const s = new Set();
  for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(" "));
  return s;
};

const { pages } = JSON.parse(readFileSync(CRAWL, "utf8"));
const docs = [];
for (const p of pages.filter((p) => !p.robots)) {
  const html = await (await fetch(BASE + p.path)).text();
  docs.push({ path: p.path, en: p.path.startsWith("/en"), sh: shingles(words(html)) });
}

const pairs = [];
for (let i = 0; i < docs.length; i++)
  for (let j = i + 1; j < docs.length; j++) {
    if (docs[i].en !== docs[j].en) continue;
    const a = docs[i].sh;
    const b = docs[j].sh;
    let shared = 0;
    for (const x of a) if (b.has(x)) shared++;
    pairs.push({ a: docs[i].path, b: docs[j].path, j: shared / (a.size + b.size - shared) });
  }
pairs.sort((x, y) => y.j - x.j);

const pct = (n) => (n * 100).toFixed(1) + "%";
console.log("15 most similar pairs (same language):");
for (const p of pairs.slice(0, 15)) console.log(" ", pct(p.j), p.a, "<>", p.b);
const areas = pairs.filter((p) => isArea(p.a) && isArea(p.b));
if (areas.length) {
  console.log(`area vs area: average ${pct(areas.reduce((n, p) => n + p.j, 0) / areas.length)}, highest ${pct(areas[0].j)}`);
}
