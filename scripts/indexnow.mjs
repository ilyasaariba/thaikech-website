// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver…) that the
// site's pages changed, so they recrawl them within hours instead of weeks.
// Bing's index also feeds DuckDuckGo, Yahoo and ChatGPT search.
//
// Run after a deploy has gone live:  node scripts/indexnow.mjs
// Optional: pass specific URLs instead of the whole sitemap:
//   node scripts/indexnow.mjs https://www.thaikech.com/tarifs

const HOST = "www.thaikech.com";
// Must match the file public/<KEY>.txt, which proves we own the site.
const KEY = "68045d48c3432ad87fd5124d0ef32ace";

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urls = process.argv.length > 2 ? process.argv.slice(2) : await sitemapUrls();

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
if (!res.ok) console.log(await res.text());
