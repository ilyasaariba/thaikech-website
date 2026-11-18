// Bing data for SEO reviews (Bing Webmaster Tools API): what people searched on
// Bing, which pages showed and at what position, and how many pages Bing crawled
// and indexed. Read-only: it only calls the API's Get methods, never the ones that
// submit or change anything.
//
// One-time setup: Bing Webmaster Tools → Settings → API access → generate an API
// key, saved as business/secrets/bing-key.txt (business/ never goes to GitHub).
// One key covers every site of the account; generating a new one stops the old one.
//
//   node scripts/bing-data.mjs [--site https://www.thaikech.com/] [--key <file>] [--out <folder>]
//
// It saves the raw data as JSON (<date>-bing.json) and prints a short report: read the report.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const option = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const KEY_FILE = option("--key", "business/secrets/bing-key.txt");
const OUT_DIR = option("--out", "business/seo/data");
const SITE = option("--site", "https://www.thaikech.com/");
const API = "https://ssl.bing.com/webmaster/api.svc/json";

if (!existsSync(KEY_FILE)) {
  console.log(`No Bing key at ${KEY_FILE}: Bing Webmaster Tools → Settings → API access → generate a key, and save it there.`);
  process.exit(1);
}
const KEY = readFileSync(KEY_FILE, "utf8").trim();

// Calls one Get method. The key travels in the URL, so errors name the method,
// never the URL. Network errors are retried twice.
async function get(method, params = {}) {
  const url = `${API}/${method}?${new URLSearchParams({ ...params, apikey: KEY })}`;
  for (let attempt = 1; ; attempt++) {
    let response;
    try {
      response = await fetch(url);
    } catch (error) {
      if (attempt === 3) throw new Error(`No connection to Bing for ${method} after 3 tries (${error.cause?.code || error.message})`);
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
      continue;
    }
    const text = await response.text();
    if (!response.ok) throw new Error(`${method}: ${response.status} from Bing: ${text.slice(0, 300)}`);
    return JSON.parse(text).d ?? [];
  }
}

// Dates come as "/Date(1730000000000-0800)/".
const day = (value) => new Date(Number(/\/Date\((-?\d+)/.exec(value)[1])).toISOString().slice(0, 10);
const path = (url) => url.replace(/^https?:\/\/(www\.)?thaikech\.com/, "") || "/";
const pos = (n) => (n ? n.toFixed(1) : "–");

// Query and page rows come per day or per week: add them up per query (or page),
// with the average position weighted by impressions.
function totals(rows, keyOf) {
  const byKey = new Map();
  for (const row of rows) {
    const key = keyOf(row);
    const t = byKey.get(key) || { key, clicks: 0, impressions: 0, weightedPosition: 0 };
    t.clicks += row.Clicks;
    t.impressions += row.Impressions;
    t.weightedPosition += (row.AvgImpressionPosition || 0) * row.Impressions;
    byKey.set(key, t);
  }
  return [...byKey.values()]
    .map((t) => ({ ...t, position: t.impressions ? t.weightedPosition / t.impressions : 0 }))
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
}

function print(title, rows, line, limit = 15) {
  console.log(`\n## ${title}${rows.length > limit ? ` (top ${limit} of ${rows.length})` : ""}`);
  if (!rows.length) console.log("(none)");
  for (const row of rows.slice(0, limit)) console.log(`- ${line(row)}`);
}

const sites = await get("GetUserSites");
const site = sites.find((s) => s.Url.replace(/\/?$/, "/") === SITE);
if (!site) throw new Error(`This key does not see ${SITE}. It sees: ${sites.map((s) => s.Url).join(", ") || "no site"}`);

const data = {
  site: SITE,
  verified: site.IsVerified,
  traffic: (await get("GetRankAndTrafficStats", { siteUrl: SITE })).map((r) => ({ date: day(r.Date), clicks: r.Clicks, impressions: r.Impressions })),
  queries: (await get("GetQueryStats", { siteUrl: SITE })).map((r) => ({ ...r, Date: day(r.Date) })),
  pages: (await get("GetPageStats", { siteUrl: SITE })).map((r) => ({ ...r, Date: day(r.Date) })),
  crawl: (await get("GetCrawlStats", { siteUrl: SITE })).map((r) => ({ ...r, Date: day(r.Date) })),
};
data.traffic.sort((a, b) => a.date.localeCompare(b.date));
data.crawl.sort((a, b) => a.Date.localeCompare(b.Date));

mkdirSync(OUT_DIR, { recursive: true });
const file = `${OUT_DIR}/${new Date().toISOString().slice(0, 10)}-bing.json`;
writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

const sum = (rows, field) => rows.reduce((n, r) => n + r[field], 0);
const first = data.traffic[0]?.date;
const last = data.traffic.at(-1)?.date;
console.log(`# Bing, ${SITE} (${site.IsVerified ? "verified" : "NOT verified"})`);
console.log(
  first
    ? `Search traffic ${first} to ${last}: ${sum(data.traffic, "clicks")} clicks, ${sum(data.traffic, "impressions")} impressions over ${data.traffic.length} days with data.`
    : "No search traffic data yet."
);
print("Days with impressions", data.traffic.filter((r) => r.impressions), (r) => `${r.date}: ${r.impressions} impressions, ${r.clicks} clicks`, 30);
print("Searches", totals(data.queries, (r) => r.Query), (t) => `${t.key}: ${t.impressions} impressions, ${t.clicks} clicks, position ${pos(t.position)}`, 25);
print("Pages", totals(data.pages, (r) => path(r.Query)), (t) => `${t.key}: ${t.impressions} impressions, ${t.clicks} clicks, position ${pos(t.position)}`, 25);
const crawl = data.crawl.at(-1);
console.log(
  crawl
    ? `\n## Crawl\nOn ${crawl.Date}: ${crawl.InIndex} pages in Bing's index, ${crawl.CrawledPages} crawled that day, ${crawl.CrawlErrors} crawl errors (4xx ${crawl.Code4xx}, 5xx ${crawl.Code5xx}), ${crawl.InLinks} links from other sites.`
    : "\n## Crawl\n(no crawl data yet)"
);
console.log(`\nRaw data: ${file}`);
