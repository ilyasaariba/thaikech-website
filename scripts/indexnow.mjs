// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver…) that the
// site's pages changed, so they recrawl them within hours instead of weeks.
// Bing's index also feeds DuckDuckGo, Yahoo and ChatGPT search.
//
// Runs automatically after each deploy (.github/workflows/indexnow.yml).
// By hand, after a deploy has gone live:
//   node scripts/indexnow.mjs              every URL in the sitemap
//   node scripts/indexnow.mjs --recent 3   only URLs whose lastmod is in the last 3 days
//   node scripts/indexnow.mjs https://www.thaikech.com/tarifs   specific URLs

const HOST = "www.thaikech.com";
// Must match the file public/<KEY>.txt, which proves we own the site.
const KEY = "68045d48c3432ad87fd5124d0ef32ace";

async function sitemapUrls(recentDays) {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const since = recentDays ? Date.now() - recentDays * 24 * 60 * 60 * 1000 : 0;
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((m) => ({
      loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
      lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
    }))
    .filter((u) => u.loc && (!since || (u.lastmod && Date.parse(u.lastmod) >= since)))
    .map((u) => u.loc);
}

const args = process.argv.slice(2);
const recentIndex = args.indexOf("--recent");
const urls =
  recentIndex >= 0
    ? await sitemapUrls(Number(args[recentIndex + 1]) || 3)
    : args.length > 0
      ? args
      : await sitemapUrls(0);

if (urls.length === 0) {
  console.log("IndexNow: no recently changed URLs, nothing to send.");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200 = accepted, 202 = accepted (key check pending), 4xx = problem with key or URLs.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
