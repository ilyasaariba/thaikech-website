// Knowledge file for the WhatsApp AI assistant (the Claude Project described in
// business/whatsapp/ai-assistant.md). It is built from the site's own content, so
// the assistant knows exactly what the site says: every treatment, price, area,
// page, guide and FAQ, in French and English.
//   node scripts/assistant-knowledge.mjs [out.md] [--lang fr|en]
// Default output: business/whatsapp/knowledge.md. Run it again after any change
// to src/content, then replace the file in the Claude Project.
import { registerHooks } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The content is TypeScript, which Node runs by stripping the types. Its imports
// leave out the ".ts" extension, as the Next.js bundler allows: add it here.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith(".") && !specifier.endsWith(".ts")) return nextResolve(`${specifier}.ts`, context);
      throw error;
    }
  },
});
// Node then warns that package.json has no "type": "module", which is noise here.
const emitWarning = process.emitWarning;
process.emitWarning = (warning, ...rest) =>
  String(warning).includes("doesn't parse as CommonJS") ? undefined : emitWarning.call(process, warning, ...rest);

const content = (file) => import(new URL(`../src/content/${file}`, import.meta.url));
const { BUSINESS, SITE_URL, CONTENT_UPDATED } = await content("business.ts");
const { SERVICE_IDS, getService, formatDuration, PRICE_RANGE } = await content("services.ts");
const { ZONE_IDS, getZone } = await content("zones.ts");
const { GUIDE_IDS, getGuide } = await content("guides.ts");
const { getPages } = await content("pages.ts");
const { pathFor } = await content("routes.ts");

const args = process.argv.slice(2);
const OUT = args[0] && !args[0].startsWith("--") ? args[0] : "business/whatsapp/knowledge.md";
const LOCALES = args.includes("--lang") ? [args[args.indexOf("--lang") + 1]] : ["fr", "en"];

const LABELS = {
  fr: {
    language: "Français",
    idealFor: "Idéal si",
    steps: "Déroulement",
    precautions: "Précautions",
    onSite: "À prévoir sur place",
    places: "Lieux cités",
    faqs: "Questions fréquentes",
  },
  en: {
    language: "English",
    idealFor: "Ideal if",
    steps: "How it goes",
    precautions: "Precautions",
    onSite: "To have ready",
    places: "Places named",
    faqs: "Frequently asked questions",
  },
};

// Same light syntax as the site (see src/content/types.ts): [label](page key) and **bold**.
const plain = (text) => {
  let previous;
  let current = text;
  do {
    previous = current;
    current = current.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
  } while (current !== previous);
  return current;
};
const url = (key, locale) => SITE_URL + pathFor(key, locale);
const bullets = (items) => items.map((item) => `- ${plain(item)}`).join("\n");
const blocks = (list) =>
  list
    .map((block) => {
      if (typeof block === "string") return plain(block);
      if ("list" in block) return block.list.map((item, i) => `${block.ordered ? `${i + 1}.` : "-"} ${plain(item)}`).join("\n");
      return `Note: ${plain(block.note)}`;
    })
    .join("\n\n");
const sections = (list) => list.map((section) => `**${section.heading}**\n\n${blocks(section.blocks)}`).join("\n\n");
const faqs = (list) => list.map((faq) => `- Q: ${faq.q}\n  A: ${plain(faq.a)}`).join("\n");
const part = (label, body) => (body ? `${label}:\n${body}` : "");
const join = (...pieces) => pieces.filter(Boolean).join("\n\n");
const pagesLine = (key) => LOCALES.map((locale) => `${locale.toUpperCase()} page: ${url(key, locale)}`).join("\n");

function treatment(id) {
  const names = LOCALES.map((locale) => getService(id, locale).name).join(" / ");
  const base = getService(id, LOCALES[0]);
  const facts = `${base.price} MAD per person · ${formatDuration(base.minutes, "en")} · ${base.therapists} therapist${base.therapists > 1 ? "s" : ""} · ${base.category}`;
  const copies = LOCALES.map((locale) => {
    const s = getService(id, locale);
    const t = LABELS[locale];
    return join(
      `#### ${t.language}`,
      plain(s.summary),
      ...s.lead.map(plain),
      part(t.idealFor, bullets(s.idealFor)),
      part(t.steps, s.steps.map((step, i) => `${i + 1}. ${step.title}: ${plain(step.text)}`).join("\n")),
      sections(s.sections),
      part(t.onSite, s.onSite ? bullets(s.onSite) : ""),
      part(t.precautions, bullets(s.precautions)),
      part(t.faqs, faqs(s.faqs)),
    );
  });
  return join(`### ${names}`, `${facts}\n${pagesLine(`service:${id}`)}`, ...copies);
}

function area(id) {
  const names = [...new Set(LOCALES.map((locale) => getZone(id, locale).name))].join(" / ");
  const copies = LOCALES.map((locale) => {
    const z = getZone(id, locale);
    const t = LABELS[locale];
    return join(
      `#### ${t.language}`,
      plain(z.teaser),
      ...z.lead.map(plain),
      `${t.places}: ${z.places.join(", ")}.`,
      sections(z.sections),
      part(t.faqs, faqs(z.faqs)),
    );
  });
  return join(`### ${names}`, pagesLine(`zone:${id}`), ...copies);
}

function landing(key, extra = () => "") {
  const copies = LOCALES.map((locale) => {
    const page = getPages(locale)[key];
    return join(
      `#### ${LABELS[locale].language}: ${page.h1}`,
      ...page.lead.map(plain),
      page.facts.join(" · "),
      sections(page.sections),
      extra(page),
      part(LABELS[locale].faqs, faqs(page.faqs)),
    );
  });
  return join(pagesLine(key), ...copies);
}

// A guide is a long article: its summary and FAQ are enough to answer a client,
// and the link sends them to the rest.
function guide(id) {
  const copies = LOCALES.map((locale) => {
    const g = getGuide(id, locale);
    return join(`#### ${LABELS[locale].language}: ${g.title}`, plain(g.excerpt), part(LABELS[locale].faqs, faqs(g.faqs)));
  });
  return join(pagesLine(`guide:${id}`), ...copies);
}

const homeCopies = LOCALES.map((locale) => {
  const home = getPages(locale).home;
  const book = getPages(locale).book;
  return join(
    `#### ${LABELS[locale].language}`,
    plain(home.hero.subtitle),
    part(home.concept.heading, home.concept.steps.map((step, i) => `${i + 1}. ${step.title}: ${plain(step.text)}`).join("\n")),
    part(home.commitments.heading, home.commitments.items.map((item) => `- ${item.title}: ${plain(item.text)}`).join("\n")),
    part(book.h1, join(plain(book.lead), bullets(book.checklist))),
    part(LABELS[locale].faqs, faqs(home.faq.items)),
  );
});

const treatmentTable = [
  `| ${LOCALES.map((locale) => `Name (${locale.toUpperCase()})`).join(" | ")} | Price per person | Duration | Therapists |`,
  `|${" --- |".repeat(LOCALES.length + 3)}`,
  ...SERVICE_IDS.map((id) => {
    const s = getService(id, LOCALES[0]);
    const names = LOCALES.map((locale) => getService(id, locale).name).join(" | ");
    return `| ${names} | ${s.price} MAD | ${formatDuration(s.minutes, "en")} | ${s.therapists} |`;
  }),
].join("\n");

const LANDINGS = [
  ["Prices", "prices"],
  ["Hammam at home", "hammam"],
  ["Beauty at home: manicure, pedicure, blow-dry", "beauty"],
  ["Couples (duo)", "duo"],
  ["In-room massage: hotels, riads, villas, apartments", "inRoom"],
  ["Groups and bachelorettes", "groups"],
  ["Code of conduct", "charter"],
];

const today = new Date().toISOString().slice(0, 10);
const doc = join(
  `# ${BUSINESS.name}: everything the website says`,
  `Built on ${today} from the website's content (last reviewed ${CONTENT_UPDATED}) by scripts/assistant-knowledge.mjs. Do not edit by hand: when the site changes, build it again and replace this file in the Claude Project.`,
  "## 1. Business facts",
  bullets([
    `${BUSINESS.name} is a mobile spa in Marrakech, Morocco: massages, hammams and beauty treatments at home, in riads, villas, hotels and apartments. There is no spa to visit: the therapists come to the client.`,
    `WhatsApp and phone: ${BUSINESS.phoneDisplay}. Email: ${BUSINESS.email} (WhatsApp is faster).`,
    `Website: ${url("home", "fr")} (French), ${url("home", "en")} (English).`,
    `Open every day from ${BUSINESS.opens} to ${BUSINESS.closes}.`,
    `Prices from ${PRICE_RANGE.min} to ${PRICE_RANGE.max} MAD per person. All prices: ${url("prices", "fr")} (EN: ${url("prices", "en")}).`,
    `Google review link, to send after a treatment: ${BUSINESS.reviewUrl}`,
    `Profiles: Google Maps ${BUSINESS.profiles.google} · Instagram ${BUSINESS.profiles.instagram} · Facebook ${BUSINESS.profiles.facebook}`,
  ]),
  "### Home page and booking",
  ...homeCopies,
  "## 2. Treatments",
  treatmentTable,
  ...SERVICE_IDS.map(treatment),
  "## 3. Areas we cover",
  landing("areas", (page) => part(page.otherAreasHeading, join(plain(page.otherAreasText), page.otherAreas.join(", ")))),
  ...ZONE_IDS.map(area),
  "## 4. Practical pages",
  ...LANDINGS.map(([title, key]) => join(`### ${title}`, landing(key))),
  "## 5. Guides",
  ...GUIDE_IDS.map((id) => join(`### ${getGuide(id, "en").title}`, guide(id))),
);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${doc}\n`);
const words = doc.split(/\s+/).length;
console.log(`${OUT}: ${(doc.length / 1024).toFixed(0)} KB, ${words} words (about ${Math.round(doc.length / 3.8 / 1000)}k tokens)`);
