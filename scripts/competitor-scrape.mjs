// Usage: node scripts/competitor-scrape.mjs <out.json> <domain> [domain...]
// Pulls each competitor's homepage, sitemaps, and its pricing + booking pages,
// and extracts the structure that matters for the Thai Kech plan. The list of
// competitors to pass is in business/growth-plan.md, section 14.
import dns from "node:dns";
import fs from "node:fs";

dns.setDefaultResultOrder("ipv4first");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

async function get(url, ms = 25000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  const t0 = Date.now();
  try {
    const r = await fetch(url, {
      headers: { "user-agent": UA, "accept-language": "fr-FR,fr;q=0.9,en;q=0.8" },
      redirect: "follow",
      signal: ctl.signal,
    });
    const text = await r.text();
    return { ok: r.ok, status: r.status, url: r.url, text, ms: Date.now() - t0, headers: Object.fromEntries(r.headers) };
  } catch (e) {
    return { ok: false, status: 0, url, text: "", ms: Date.now() - t0, error: String((e.cause && e.cause.code) || e.message) };
  } finally {
    clearTimeout(timer);
  }
}

const all = (re, s) => [...s.matchAll(re)];
const strip = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&rsquo;|&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const FINGERPRINTS = [
  "wordpress", "wp-content", "elementor", "divi", "woocommerce", "wix", "squarespace", "webflow", "shopify", "_next", "nuxt",
  "calendly", "zenoti", "setmore", "fresha", "simplybook", "booksy", "planity", "acuity", "bookingkit", "fareharbor", "bokun",
  "trustindex", "elfsight", "trustpilot", "wp-google-reviews", "reviews.io", "tripadvisor",
  "joinchat", "chaty", "click-to-chat", "wa.me", "tawk", "crisp", "intercom",
  "googletagmanager", "gtag(", "fbq(", "snaptr", "tiktok", "hotjar", "clarity.ms", "gtranslate", "weglot", "wpml", "polylang", "translatepress",
];

function analyzePage(html, base) {
  const out = {};
  out.title = ((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
  out.metaDescription = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i) || [])[1];
  out.lang = (html.match(/<html[^>]*\blang=["']([^"']+)/i) || [])[1];
  out.generator = [...new Set(all(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']*)/gi, html).map((m) => m[1]))];
  out.h1 = all(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, html).map((m) => strip(m[1])).filter(Boolean).slice(0, 3);
  out.h2 = all(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, html).map((m) => strip(m[1])).filter(Boolean).slice(0, 20);
  out.hreflang = [...new Set(all(/hreflang=["']([^"']+)/gi, html).map((m) => m[1]))];
  out.schemaTypes = [...new Set(all(/"@type"\s*:\s*"([^"]+)"/g, html).map((m) => m[1]))];
  const text = strip(html);
  out.words = text.split(" ").length;
  const wa = all(/href=["'](https?:\/\/(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp\.com)[^"']*)/gi, html).map((m) => m[1]);
  out.whatsappLinks = wa.length;
  out.whatsappPrefill = [
    ...new Set(
      wa
        .map((u) => {
          try {
            return decodeURIComponent((u.split("text=")[1] || "").split("&")[0].replace(/\+/g, " ")).slice(0, 220);
          } catch {
            return "";
          }
        })
        .filter(Boolean)
    ),
  ].slice(0, 3);
  out.telLinks = [...new Set(all(/href=["']tel:([^"']+)/gi, html).map((m) => m[1].replace(/\s/g, "")))];
  out.forms = all(/<form[\s\S]*?<\/form>/gi, html)
    .map((f) =>
      [...new Set(all(/<(?:input|select|textarea)[^>]*\bname=["']([^"']+)/gi, f[0]).map((m) => m[1]))]
        .filter((n) => !/^(_|g-recaptcha|nonce|action$|referer)/i.test(n))
        .slice(0, 15)
    )
    .filter((f) => f.length);
  const low = html.toLowerCase();
  out.tech = FINGERPRINTS.filter((k) => low.includes(k));
  out.prices = [
    ...new Set(
      all(/(\d{2,4}(?:[ .,]\d{3})?)\s*(MAD|DH|Dhs|Dh|dirhams?|€|EUR)(?![a-z])/gi, text).map(
        (m) => m[1].replace(/\s/g, "") + " " + m[2].toUpperCase()
      )
    ),
  ].slice(0, 40);
  out.hours = [
    ...new Set(
      all(
        /(\b24\s*h\s*\/?\s*(?:24|7)\b|24\/7|7\s*j\s*\/\s*7|\b\d{1,2}\s*h\s*(?:\d{2})?\s*(?:-|–|à)\s*\d{1,2}\s*h(?:\s*\d{2})?|\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*(?:-|–|to)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/gi,
        text
      ).map((m) => m[1].replace(/\s+/g, " "))
    ),
  ].slice(0, 8);
  out.reviewClaims = [
    ...new Set(
      all(/(\d[\d\s.,]*\+?\s*(?:avis|reviews|clients satisfaits|clients|happy clients|étoiles|stars))/gi, text).map((m) => m[1].trim())
    ),
  ].slice(0, 8);
  const lowText = text.toLowerCase();
  out.trustWords = [
    "diplômé", "certifi", "femme", "féminin", "masseuse", "discr", "hygiène", "assurance", "insured",
    "déplacement gratuit", "gratuit", "annulation", "paiement", "carte", "espèces", "cash", "non sensuel", "professionnel",
  ].filter((w) => lowText.includes(w));
  const imgs = all(/<img[^>]+(?:data-src|src)=["']([^"']+)/gi, html).map((m) => m[1]);
  out.images = imgs.length;
  out.imgFormats = imgs.reduce((acc, u) => {
    const e = ((u.split("?")[0].match(/\.(webp|avif|jpe?g|png|gif|svg)$/i) || [])[1] || "other").toLowerCase();
    acc[e] = (acc[e] || 0) + 1;
    return acc;
  }, {});
  out.scripts = all(/<script\b/gi, html).length;
  let host = "";
  try {
    host = new URL(base).host.replace(/^www\./, "");
  } catch {}
  const links = all(/href=["']([^"'#]+)/gi, html)
    .map((m) => {
      try {
        return new URL(m[1], base);
      } catch {
        return null;
      }
    })
    .filter((u) => u && u.host.replace(/^www\./, "") === host && !/\.(css|js|png|jpe?g|webp|svg|ico|xml|woff2?)$/i.test(u.pathname))
    .map((u) => u.pathname);
  out.internalLinks = links.length;
  out.uniqueInternalPaths = [...new Set(links)].slice(0, 100);
  out.bytes = html.length;
  return out;
}

const ZONES = [
  "gueliz", "hivernage", "palmeraie", "medina", "agdal", "targa", "ourika", "amelkis", "agafay", "semlalia", "majorelle",
  "route-de-fes", "sidi", "menara", "massira", "annakhil", "chrifia", "amizmiz", "kasbah", "mhamid", "maaden", "royal-palm",
  "golf", "samanah", "essaouira", "ouarzazate", "agadir", "casablanca", "rabat", "tanger", "fes",
];

function classify(urls) {
  const c = { total: urls.length, byLang: {}, blog: 0, zones: {}, services: 0, occasions: 0, pricing: [], booking: [], about: [], reviews: [], zoneUrls: [] };
  for (const u of urls) {
    let p = u.toLowerCase();
    try {
      p = decodeURIComponent(new URL(u).pathname.toLowerCase());
    } catch {}
    const lang = (p.match(/^\/(en|fr|es|it|de|ar|nl|ru)(\/|$)/) || [])[1] || "root";
    c.byLang[lang] = (c.byLang[lang] || 0) + 1;
    if (/\/(blog|news|actualit|article|conseil|guide|magazine)|\/\d{4}\/\d{2}\//.test(p)) c.blog++;
    let isZone = false;
    for (const z of ZONES)
      if (p.includes(z)) {
        c.zones[z] = (c.zones[z] || 0) + 1;
        isZone = true;
      }
    if (isZone && c.zoneUrls.length < 12) c.zoneUrls.push(u);
    if (/massage|hammam|spa|soin|gommage|reflexolog|drainage|facial|visage|treatment/.test(p)) c.services++;
    if (/evjf|bachelor|couple|duo|anniversaire|birthday|seminaire|seminar|yoga|groupe|group|mariage|wedding|honeymoon|lune-de-miel|entreprise|corporate|party/.test(p)) c.occasions++;
    if (/tarif|prix|price|pricing/.test(p)) c.pricing.push(u);
    if (/reserv|book|rendez|appointment|contact/.test(p)) c.booking.push(u);
    if (/propos|about|equipe|team|praticien|therapeut/.test(p)) c.about.push(u);
    if (/avis|review|temoignage|testimonial/.test(p)) c.reviews.push(u);
  }
  for (const k of ["pricing", "booking", "about", "reviews"]) c[k] = c[k].slice(0, 5);
  return c;
}

async function sitemaps(origin) {
  const robots = await get(origin + "/robots.txt", 15000);
  let seeds = all(/^\s*sitemap:\s*(\S+)/gim, robots.text || "").map((m) => m[1]);
  if (!seeds.length) seeds = [origin + "/sitemap_index.xml", origin + "/sitemap.xml", origin + "/wp-sitemap.xml"];
  const seen = new Set();
  const urls = [];
  const children = [];
  const queue = [...seeds];
  while (queue.length && seen.size < 30) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);
    const r = await get(sm, 20000);
    if (!r.ok || !/<(urlset|sitemapindex)/i.test(r.text)) continue;
    if (/<sitemapindex/i.test(r.text)) {
      all(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\s\]]+)/gi, r.text).forEach((m) => queue.push(m[1].replace(/&amp;/g, "&")));
      continue;
    }
    const locs = all(/<url>([\s\S]*?)<\/url>/gi, r.text).map((m) => ({
      loc: ((m[1].match(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\s\]]+)/i) || [])[1] || "").replace(/&amp;/g, "&"),
      lastmod: (m[1].match(/<lastmod>\s*([^<\s]+)/i) || [])[1],
    }));
    const mods = locs.map((l) => l.lastmod).filter(Boolean).sort();
    children.push({ sitemap: sm.replace(origin, ""), count: locs.length, oldest: mods[0], newest: mods[mods.length - 1] });
    locs.forEach((l) => urls.push(l));
  }
  return { children, urls };
}

(async () => {
  const [outFile, ...domains] = process.argv.slice(2);
  const results = {};
  await Promise.all(
    domains.map(async (d) => {
      const origin = d.startsWith("http") ? d.replace(/\/$/, "") : "https://" + d;
      const home = await get(origin + "/");
      const res = { domain: d, home: { status: home.status, finalUrl: home.url, ms: home.ms, error: home.error, server: home.headers && home.headers.server } };
      if (home.text) Object.assign(res.home, analyzePage(home.text, home.url || origin));
      let base = origin;
      try {
        base = new URL(home.url || origin).origin;
      } catch {}
      const sm = await sitemaps(base);
      res.sitemaps = sm.children;
      res.urlStats = classify(sm.urls.map((u) => u.loc).filter(Boolean));
      res.allUrls = sm.urls;
      res.pages = {};
      const extra = [...new Set([...res.urlStats.pricing.slice(0, 1), ...res.urlStats.booking.slice(0, 1), ...res.urlStats.about.slice(0, 1)])];
      for (const u of extra) {
        const r = await get(u);
        if (!r.text) continue;
        const a = analyzePage(r.text, r.url);
        res.pages[u] = {
          status: r.status, title: a.title, h1: a.h1, h2: a.h2.slice(0, 14), words: a.words, prices: a.prices,
          forms: a.forms, whatsappLinks: a.whatsappLinks, whatsappPrefill: a.whatsappPrefill, tech: a.tech, trustWords: a.trustWords,
        };
      }
      results[d] = res;
      process.stderr.write(`done ${d} home=${home.status} urls=${sm.urls.length}\n`);
    })
  );
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  for (const d of domains) {
    const r = results[d];
    const h = r.home || {};
    const u = r.urlStats;
    console.log(`\n## ${d}  [${h.status} ${h.ms}ms ${h.error || ""}] -> ${h.finalUrl}`);
    console.log(`title: ${h.title}\nmeta: ${(h.metaDescription || "").slice(0, 200)}\nh1: ${JSON.stringify(h.h1)}`);
    console.log(`lang=${h.lang} hreflang=${JSON.stringify(h.hreflang)} generator=${JSON.stringify(h.generator)} server=${h.server}`);
    console.log(`words=${h.words} htmlKB=${Math.round((h.bytes || 0) / 1024)} imgs=${h.images} ${JSON.stringify(h.imgFormats)} scripts=${h.scripts}`);
    console.log(`schema=${JSON.stringify(h.schemaTypes)}`);
    console.log(`whatsapp=${h.whatsappLinks} prefill=${JSON.stringify(h.whatsappPrefill)} tel=${JSON.stringify(h.telLinks)}`);
    console.log(`forms=${JSON.stringify(h.forms)} tech=${JSON.stringify(h.tech)}`);
    console.log(`prices=${JSON.stringify(h.prices)}\nhours=${JSON.stringify(h.hours)} reviews=${JSON.stringify(h.reviewClaims)} trust=${JSON.stringify(h.trustWords)}`);
    console.log(`h2=${JSON.stringify(h.h2)}`);
    console.log(`sitemaps=${JSON.stringify(r.sitemaps)}`);
    console.log(`URLS total=${u.total} lang=${JSON.stringify(u.byLang)} blog=${u.blog} serviceUrls=${u.services} occasionUrls=${u.occasions} zones=${JSON.stringify(u.zones)}`);
    console.log(`pricing=${JSON.stringify(u.pricing)} booking=${JSON.stringify(u.booking)} about=${JSON.stringify(u.about)} reviews=${JSON.stringify(u.reviews)}`);
    for (const [pu, p] of Object.entries(r.pages)) console.log(`  PAGE ${pu}: ${JSON.stringify(p).slice(0, 1100)}`);
  }
})();
