// Google data for SEO reviews: Search Console (what people searched, which pages
// showed, at what position, which pages are indexed) and Google Analytics 4
// (visits and WhatsApp leads by page and channel). Read-only: it never changes
// anything at Google.
//
// One-time setup, in business/seo/README.md: a Google Cloud service account with
// the Search Console API and the Google Analytics Data API turned on, its JSON key
// saved as business/secrets/google-key.json (business/ never goes to GitHub), and
// its e-mail added as a user in Search Console and in GA4.
//
//   node scripts/google-data.mjs search [--days 28] [--min 10]   searches and pages, this period against the one before
//   node scripts/google-data.mjs index                           index status of every page in the sitemap
//   node scripts/google-data.mjs analytics --property <GA4 property ID> [--days 28]
// Other options: --key <file>, --site <Search Console property>, --out <folder> (default business/seo/data).
//
// Each command saves the raw data as JSON and prints a short report: read the report.
import { createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SITE = "https://www.thaikech.com";
const args = process.argv.slice(2);
const COMMAND = args[0];
const option = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const KEY_FILE = option("--key", "business/secrets/google-key.json");
const OUT_DIR = option("--out", "business/seo/data");
const DAYS = Number(option("--days", "28"));
// Fewer impressions than this over the period is noise, not a signal.
const MIN_IMPRESSIONS = Number(option("--min", "10"));
// Lead events sent by src/lib/tracking.ts.
const LEAD_EVENTS = ["generate_lead", "whatsapp_click", "phone_click"];

if (!["search", "index", "analytics"].includes(COMMAND)) {
  console.log("usage: node scripts/google-data.mjs search|index|analytics [--days 28] [--min 10] [--property <GA4 id>] [--key <file>] [--site <property>] [--out <folder>]");
  process.exit(1);
}
if (!existsSync(KEY_FILE)) {
  console.log(`No Google key at ${KEY_FILE}. The setup steps are in business/seo/README.md.`);
  process.exit(1);
}
const KEY = JSON.parse(readFileSync(KEY_FILE, "utf8"));

// The connection from here drops now and then: retry network errors (not HTTP
// errors) twice, then say which server could not be reached.
async function request(url, init) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetch(url, init);
    } catch (error) {
      if (attempt === 3) throw new Error(`No connection to ${new URL(url).host} after 3 tries (${error.cause?.code || error.message})`);
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
}

// A service account signs a short-lived JWT and trades it for an access token.
async function accessToken(scope) {
  const tokenUrl = KEY.token_uri || "https://oauth2.googleapis.com/token";
  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: KEY.client_email, scope, aud: tokenUrl, iat: now, exp: now + 3600 })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(KEY.private_key, "base64url");
  const response = await request(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Google sign-in failed: ${data.error_description || data.error}`);
  return data.access_token;
}

async function call(token, url, body) {
  const response = await request(url, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status} from ${new URL(url).host}: ${data.error?.message || JSON.stringify(data)}`);
  return data;
}

const today = new Date().toISOString().slice(0, 10);
const shift = (date, days) => new Date(Date.parse(date) + days * 86_400_000).toISOString().slice(0, 10);
const path = (url) => url.replace(SITE, "") || "/";
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const pos = (n) => n.toFixed(1);
const signed = (n) => (n > 0 ? `+${n}` : String(n));

function save(name, data) {
  mkdirSync(OUT_DIR, { recursive: true });
  const file = `${OUT_DIR}/${today}-${name}.json`;
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  return file;
}

function print(title, rows, line, limit = 15) {
  console.log(`\n## ${title}${rows.length > limit ? ` (top ${limit} of ${rows.length})` : ""}`);
  if (!rows.length) console.log("(none)");
  for (const row of rows.slice(0, limit)) console.log(`- ${line(row)}`);
}

async function sitemapUrls() {
  const xml = await (await request(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

// ---------------------------------------------------------------------------
// Search Console
// ---------------------------------------------------------------------------

async function searchConsoleSite(token) {
  const chosen = option("--site");
  if (chosen) return chosen;
  const { siteEntry = [] } = await call(token, "https://www.googleapis.com/webmasters/v3/sites");
  const sites = siteEntry.map((entry) => entry.siteUrl).filter((url) => url.includes("thaikech.com"));
  const site = sites.find((url) => url.startsWith("sc-domain:")) || sites.find((url) => url.startsWith(SITE)) || sites[0];
  if (!site) throw new Error(`This key sees no thaikech.com property: add ${KEY.client_email} as a user in Search Console (Settings → Users and permissions).`);
  return site;
}

async function searchRows(token, site, startDate, endDate, dimensions) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const rows = [];
  for (let startRow = 0; ; startRow += 25_000) {
    const data = await call(token, url, { startDate, endDate, dimensions, rowLimit: 25_000, startRow });
    for (const row of data.rows || []) {
      const keys = Object.fromEntries(dimensions.map((dimension, i) => [dimension, row.keys[i]]));
      rows.push({ ...keys, clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position });
    }
    if (!data.rows || data.rows.length < 25_000) return rows;
  }
}

// Rough click-through rate of an ordinary result at positions 1 to 10. A row far
// below it usually has a title or description that does not answer the search.
const EXPECTED_CTR = [0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.03, 0.025, 0.02];

async function search() {
  const token = await accessToken("https://www.googleapis.com/auth/webmasters.readonly");
  const site = await searchConsoleSite(token);
  // Search Console data settles after 2 to 3 days.
  const end = shift(today, -3);
  const start = shift(end, -(DAYS - 1));
  const previousEnd = shift(start, -1);
  const previousStart = shift(previousEnd, -(DAYS - 1));

  const rows = (dimensions, from = start, to = end) => searchRows(token, site, from, to, dimensions);
  const data = {
    site,
    period: { start, end },
    previous: { start: previousStart, end: previousEnd },
    total: (await rows([]))[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    previousTotal: (await rows([], previousStart, previousEnd))[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    pages: await rows(["page"]),
    previousPages: await rows(["page"], previousStart, previousEnd),
    queries: await rows(["query"]),
    previousQueries: await rows(["query"], previousStart, previousEnd),
    pairs: await rows(["query", "page"]),
    countries: await rows(["country"]),
    devices: await rows(["device"]),
  };
  const file = save(`search-${DAYS}d`, data);

  const { total, previousTotal } = data;
  console.log(`# Search Console, ${site}, ${start} to ${end} (before: ${previousStart} to ${previousEnd})`);
  console.log(
    `Clicks ${total.clicks} (before ${previousTotal.clicks}) · impressions ${total.impressions} (before ${previousTotal.impressions}) · CTR ${pct(total.ctr)} · average position ${pos(total.position)} (before ${pos(previousTotal.position)})`
  );

  const before = (list, key) => new Map(list.map((row) => [row[key], row]));
  const previousPage = before(data.previousPages, "page");
  const previousQuery = before(data.previousQueries, "query");
  const change = (row, old) =>
    old ? `${signed(row.clicks - old.clicks)} clicks, ${signed(row.impressions - old.impressions)} impressions, position was ${pos(old.position)}` : "new";

  print("Pages", data.pages, (r) => `${path(r.page)}: ${r.clicks} clicks, ${r.impressions} impressions, position ${pos(r.position)} (${change(r, previousPage.get(r.page))})`, 25);
  print("Searches", data.queries, (r) => `"${r.query}": ${r.clicks} clicks, ${r.impressions} impressions, CTR ${pct(r.ctr)}, position ${pos(r.position)} (${change(r, previousQuery.get(r.query))})`, 30);

  const pairs = data.pairs.filter((r) => r.impressions >= MIN_IMPRESSIONS);
  print(
    "Positions 4 to 20, close to the top (improve these pages first)",
    pairs.filter((r) => r.position >= 4 && r.position <= 20).sort((a, b) => b.impressions - a.impressions),
    (r) => `"${r.query}" → ${path(r.page)}: position ${pos(r.position)}, ${r.impressions} impressions, ${r.clicks} clicks`,
    20
  );
  print(
    "Seen on page 1 but rarely clicked (rewrite the title and description)",
    pairs
      .filter((r) => r.position < 10.5 && r.ctr < EXPECTED_CTR[Math.max(0, Math.round(r.position) - 1)] / 2)
      .sort((a, b) => b.impressions - a.impressions),
    (r) => `"${r.query}" → ${path(r.page)}: position ${pos(r.position)}, CTR ${pct(r.ctr)} (usual at that position: about ${pct(EXPECTED_CTR[Math.max(0, Math.round(r.position) - 1)])}), ${r.impressions} impressions`
  );

  // Two pages sharing one search split its clicks: Google may hesitate between them.
  const byQuery = Map.groupBy(pairs, (r) => r.query);
  const shared = [...byQuery]
    .map(([query, list]) => {
      const sum = list.reduce((n, r) => n + r.impressions, 0);
      return { query, sum, list: list.filter((r) => r.impressions / sum >= 0.15).sort((a, b) => b.impressions - a.impressions) };
    })
    .filter((q) => q.list.length > 1)
    .sort((a, b) => b.sum - a.sum);
  print("One search, several pages (possible cannibalisation)", shared, (q) => `"${q.query}": ${q.list.map((r) => `${path(r.page)} (${Math.round((r.impressions / q.sum) * 100)}%, position ${pos(r.position)})`).join(", ")}`);

  // Search Console writes the home page with a trailing slash, the sitemap without: compare paths.
  const seen = new Set(data.pages.map((r) => path(r.page)));
  print("Sitemap pages with no impressions (check them with the index command)", (await sitemapUrls()).filter((url) => !seen.has(path(url))), path, 50);

  const share = (list, key) => {
    const sum = list.reduce((n, r) => n + r.impressions, 0) || 1;
    return list
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 8)
      .map((r) => `${r[key]} ${Math.round((r.impressions / sum) * 100)}%`)
      .join(" · ");
  };
  console.log(`\n## Impressions by country\n${share(data.countries, "country")}`);
  console.log(`\n## Impressions by device\n${share(data.devices, "device")}`);
  console.log(`\nRaw data: ${file}`);
}

async function index() {
  const token = await accessToken("https://www.googleapis.com/auth/webmasters.readonly");
  const site = await searchConsoleSite(token);
  const { sitemap: sitemaps = [] } = await call(token, `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps`);
  const urls = await sitemapUrls();
  const results = [];
  for (const url of urls) {
    const { inspectionResult } = await call(token, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      inspectionUrl: url,
      siteUrl: site,
      languageCode: "en-US",
    });
    const status = inspectionResult.indexStatusResult || {};
    results.push({
      url,
      verdict: status.verdict,
      coverage: status.coverageState,
      lastCrawl: status.lastCrawlTime,
      googleCanonical: status.googleCanonical,
      userCanonical: status.userCanonical,
      robots: status.robotsTxtState,
      fetch: status.pageFetchState,
      crawledAs: status.crawledAs,
    });
  }
  const file = save("index", { site, sitemaps, results });

  console.log(`# Index status, ${site}, ${results.length} sitemap pages`);
  print(
    "Sitemaps submitted in Search Console (none: submit sitemap.xml there)",
    sitemaps,
    (s) =>
      `${s.path}: submitted ${s.lastSubmitted?.slice(0, 10) || "never"}, last read by Google ${s.lastDownloaded?.slice(0, 10) || "never"}${s.isPending ? " (pending)" : ""}, ${s.errors || 0} errors, ${s.warnings || 0} warnings${(s.contents || []).map((c) => `, ${c.submitted} ${c.type} URLs`).join("")}`
  );
  console.log();
  const counts = Map.groupBy(results, (r) => r.coverage || "unknown");
  for (const [state, list] of [...counts].sort((a, b) => b[1].length - a[1].length)) console.log(`- ${state}: ${list.length}`);
  print("Not indexed", results.filter((r) => r.verdict !== "PASS"), (r) => `${path(r.url)}: ${r.coverage}${r.lastCrawl ? `, last crawl ${r.lastCrawl.slice(0, 10)}` : ", never crawled"}`, 80);
  print(
    "Google chose another canonical",
    results.filter((r) => r.googleCanonical && r.userCanonical && path(r.googleCanonical) !== path(r.userCanonical)),
    (r) => `${path(r.url)}: Google picked ${path(r.googleCanonical)}`
  );
  console.log(`\nRaw data: ${file}`);
}

// ---------------------------------------------------------------------------
// Google Analytics 4
// ---------------------------------------------------------------------------

async function analytics() {
  const property = option("--property");
  if (!property) {
    console.log("Give the GA4 property ID with --property: GA4 → Admin → Property details (a number like 512345678).");
    process.exit(1);
  }
  const token = await accessToken("https://www.googleapis.com/auth/analytics.readonly");
  const report = async (dimensions, metrics, extra = {}) => {
    const data = await call(token, `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: "yesterday" }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit: 1000,
      ...extra,
    });
    return (data.rows || []).map((row) =>
      Object.fromEntries([
        ...dimensions.map((name, i) => [name, row.dimensionValues[i].value]),
        ...metrics.map((name, i) => [name, Number(row.metricValues[i].value)]),
      ])
    );
  };
  const bySessions = { orderBys: [{ metric: { metricName: "sessions" }, desc: true }] };
  const leadsOnly = {
    dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: LEAD_EVENTS } } },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  };
  const data = {
    property,
    days: DAYS,
    channels: await report(["sessionDefaultChannelGroup"], ["sessions", "engagedSessions", "totalUsers"], bySessions),
    sources: await report(["sessionSource", "sessionMedium"], ["sessions", "engagedSessions"], bySessions),
    landingPages: await report(["landingPage", "sessionDefaultChannelGroup"], ["sessions", "engagedSessions"], bySessions),
    leadsByChannel: await report(["eventName", "sessionDefaultChannelGroup"], ["eventCount"], leadsOnly),
    leadsByLandingPage: await report(["eventName", "landingPage"], ["eventCount"], leadsOnly),
    leadsByPage: await report(["eventName", "pagePath"], ["eventCount"], leadsOnly),
    countries: await report(["country"], ["sessions"], bySessions),
  };
  const file = save(`analytics-${DAYS}d`, data);

  console.log(`# Google Analytics 4, property ${property}, last ${DAYS} days`);
  console.log("Leads: generate_lead = booking form sent; whatsapp_click and phone_click = a direct tap that skips the form.");
  print("Channels", data.channels, (r) => `${r.sessionDefaultChannelGroup}: ${r.sessions} sessions (${r.engagedSessions} engaged), ${r.totalUsers} users`);
  print("Sources", data.sources, (r) => `${r.sessionSource} / ${r.sessionMedium}: ${r.sessions} sessions (${r.engagedSessions} engaged)`);
  print(
    "Landing pages from Google search",
    data.landingPages.filter((r) => r.sessionDefaultChannelGroup === "Organic Search"),
    (r) => `${r.landingPage}: ${r.sessions} sessions (${r.engagedSessions} engaged)`,
    25
  );
  print("Leads by channel", data.leadsByChannel, (r) => `${r.sessionDefaultChannelGroup}: ${r.eventCount} ${r.eventName}`);
  print("Leads by landing page (the page the visit started on)", data.leadsByLandingPage, (r) => `${r.landingPage}: ${r.eventCount} ${r.eventName}`, 25);
  print("Leads by page (where the tap or form happened)", data.leadsByPage, (r) => `${r.pagePath}: ${r.eventCount} ${r.eventName}`, 25);
  print("Countries", data.countries, (r) => `${r.country}: ${r.sessions} sessions`, 10);
  console.log(`\nRaw data: ${file}`);
}

await { search, index, analytics }[COMMAND]();
