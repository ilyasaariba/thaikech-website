// SEO snapshot of every page of a running build, and a check that a change did
// not move anything Google reads. Start a production build first:
//   npm run build && npx next start -p 3123
//
//   node scripts/seo-crawl.mjs <before.json>                        crawl and save a snapshot
//   node scripts/seo-crawl.mjs <after.json> --compare <before.json>  crawl, then list every SEO difference
//   node scripts/seo-crawl.mjs <out.json> --base http://localhost:3000
//
// Per page it records the status, title, description, robots, canonical, hreflang,
// Open Graph tags, H1/H2, JSON-LD types and images without alt text. It then lists
// problems (missing tags, duplicate titles, broken internal links). Save the
// snapshots outside the project, in a temporary folder: they are not code.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://www.thaikech.com";
// Pages kept out of the sitemap (noindex) that still have to be checked.
const EXTRA = ["/book", "/en/book", "/confidentialite", "/en/privacy"];
// The fields compared between two snapshots.
const SEO_FIELDS = ["status", "lang", "title", "description", "robots", "canonical", "hreflang", "ogTitle", "ogUrl", "ogImage", "h1", "jsonld"];

const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const OUT = args[0];
const BASE = option("--base") || "http://localhost:3123";
const BEFORE = option("--compare");
if (!OUT || OUT.startsWith("--")) {
  console.log("usage: node scripts/seo-crawl.mjs <out.json> [--compare <before.json>] [--base <url>]");
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;|&#160;|&#xa0;/gi, " ");
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : undefined;
};
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];
const inner = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "gi"))].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
  );

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [
  ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/"),
  ...EXTRA,
];

const pages = [];
const linkTargets = new Map(); // path -> Set of the pages linking to it
for (const path of paths) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const metas = tags(head, "meta");
  const links = tags(head, "link");
  const meta = (n) => metas.map((t) => (attr(t, "name") === n || attr(t, "property") === n ? attr(t, "content") : undefined)).find(Boolean);
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      const j = JSON.parse(m[1]);
      return (j["@graph"] || [j]).map((n) => n["@type"]);
    } catch {
      return ["PARSE_ERROR"];
    }
  });
  // Visible text, without the header and footer that every page shares.
  const text = decode(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<header[\s\S]*?<\/header>/i, " ")
      .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
  const anchors = tags(body, "a").map((t) => attr(t, "href")).filter(Boolean);
  for (const a of anchors) {
    if (a.startsWith("/") || a.startsWith(SITE)) {
      const target = a.replace(SITE, "").split("#")[0] || "/";
      if (!linkTargets.has(target)) linkTargets.set(target, new Set());
      linkTargets.get(target).add(path);
    }
  }
  const imgs = tags(body, "img");
  pages.push({
    path,
    status: res.status,
    lang: (html.match(/<html[^>]*lang="([^"]+)"/) || [])[1],
    title: inner(head, "title")[0],
    description: meta("description"),
    robots: meta("robots"),
    canonical: links.filter((t) => attr(t, "rel") === "canonical").map((t) => attr(t, "href"))[0],
    hreflang: Object.fromEntries(links.filter((t) => attr(t, "hreflang")).map((t) => [attr(t, "hreflang"), attr(t, "href")])),
    ogTitle: meta("og:title"),
    ogUrl: meta("og:url"),
    ogImage: meta("og:image"),
    h1: inner(body, "h1"),
    h2: inner(body, "h2"),
    words: text.split(" ").length,
    jsonld: jsonld.flat(),
    imgs: imgs.length,
    // alt="" is right for a decorative image; only a missing alt attribute is a problem.
    imgsNoAlt: imgs.filter((t) => attr(t, "alt") === undefined).map((t) => attr(t, "src")),
    anchorsInternal: anchors.filter((a) => a.startsWith("/") || a.startsWith(SITE)).length,
    anchorsExternal: [...new Set(anchors.filter((a) => /^https?:/.test(a) && !a.startsWith(SITE)))],
    htmlBytes: html.length,
  });
}

const broken = [];
for (const [target, sources] of linkTargets) {
  const r = await fetch(BASE + target.split("?")[0], { redirect: "manual" });
  if (r.status !== 200) broken.push({ target, status: r.status, from: [...sources].slice(0, 5) });
}
const inbound = Object.fromEntries(
  pages.map((p) => [p.path, linkTargets.has(p.path) ? [...linkTargets.get(p.path)].filter((s) => s !== p.path).length : 0])
);
writeFileSync(OUT, JSON.stringify({ pages, broken, inbound }, null, 2));

const problems = [];
const byTitle = new Map();
for (const p of pages) {
  if (p.status !== 200) problems.push(`${p.path}: status ${p.status}`);
  if (!p.title) problems.push(`${p.path}: no title`);
  if (!p.description) problems.push(`${p.path}: no description`);
  if (!p.canonical) problems.push(`${p.path}: no canonical`);
  if (p.h1.length !== 1) problems.push(`${p.path}: ${p.h1.length} H1 headings`);
  if (p.imgsNoAlt.length) problems.push(`${p.path}: ${p.imgsNoAlt.length} image(s) with no alt attribute`);
  if (p.jsonld.includes("PARSE_ERROR")) problems.push(`${p.path}: invalid JSON-LD`);
  byTitle.set(p.title, [...(byTitle.get(p.title) || []), p.path]);
}
for (const [title, same] of byTitle) if (same.length > 1) problems.push(`same title "${title}" on ${same.join(", ")}`);
for (const b of broken) problems.push(`broken link ${b.target} (${b.status}) from ${b.from.join(", ")}`);

console.log(`crawled ${pages.length} pages, ${linkTargets.size} internal link targets, saved to ${OUT}`);
console.log(problems.length ? `${problems.length} problem(s):\n  ${problems.join("\n  ")}` : "no problems found");

if (BEFORE) {
  const before = new Map(JSON.parse(readFileSync(BEFORE, "utf8")).pages.map((p) => [p.path, p]));
  const after = new Map(pages.map((p) => [p.path, p]));
  const changes = [];
  for (const path of before.keys()) if (!after.has(path)) changes.push(`- page gone: ${path}`);
  for (const [path, page] of after) {
    const old = before.get(path);
    if (!old) {
      changes.push(`+ new page: ${path}`);
      continue;
    }
    for (const field of SEO_FIELDS) {
      const a = JSON.stringify(old[field]);
      const b = JSON.stringify(page[field]);
      if (a !== b) changes.push(`~ ${path} ${field}: ${a} -> ${b}`);
    }
  }
  console.log(changes.length ? `${changes.length} SEO difference(s) with ${BEFORE}:\n  ${changes.join("\n  ")}` : `0 SEO differences with ${BEFORE}`);
}
