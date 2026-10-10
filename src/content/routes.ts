import type { Locale } from "@/i18n/locales";
import type { GuideId, PageKey, ServiceId, StaticPageKey, ZoneId } from "./types";
import { SERVICE_IDS, getService, isServiceId } from "./services";
import { ZONE_IDS, getZone } from "./zones";
import { GUIDE_IDS, getGuide } from "./guides";

// One place that maps a language-independent page key to its URL in each
// language. Links, hreflang alternates, the sitemap and static params all
// come from here, so a slug changed once is changed everywhere.

const STATIC_PATHS: Record<StaticPageKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/en" },
  book: { fr: "/book", en: "/en/book" },
  prices: { fr: "/tarifs", en: "/en/prices" },
  areas: { fr: "/zones-desservies-marrakech", en: "/en/areas-we-cover-marrakech" },
  hammam: { fr: "/hammam-a-domicile-marrakech", en: "/en/hammam-at-home-marrakech" },
  duo: { fr: "/massage-duo-couple-a-domicile-marrakech", en: "/en/couples-massage-marrakech" },
  inRoom: { fr: "/massage-chambre-hotel-riad-marrakech", en: "/en/in-room-massage-marrakech" },
  charter: { fr: "/charte-qualite", en: "/en/code-of-conduct" },
  guides: { fr: "/guides", en: "/en/guides" },
  groups: { fr: "/massage-groupe-evjf-marrakech", en: "/en/group-spa-bachelorette-marrakech" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
};

/** Pages kept out of search results and the sitemap. */
const NOINDEX_KEYS: StaticPageKey[] = ["book", "privacy"];

export function isNoindexKey(key: PageKey): boolean {
  return (NOINDEX_KEYS as string[]).includes(key);
}

const PREFIX: Record<Locale, string> = { fr: "", en: "/en" };

const ZONE_ID_SET = new Set<string>(ZONE_IDS);
const GUIDE_ID_SET = new Set<string>(GUIDE_IDS);

export function isPageKey(value: string): value is PageKey {
  if (value in STATIC_PATHS) return true;
  const [kind, id] = value.split(":");
  if (!id) return false;
  if (kind === "service") return isServiceId(id);
  if (kind === "zone") return ZONE_ID_SET.has(id);
  if (kind === "guide") return GUIDE_ID_SET.has(id);
  return false;
}

export function pathFor(key: PageKey, locale: Locale): string {
  const [kind, id] = key.split(":");
  if (kind === "service") return `${PREFIX[locale]}/${getService(id as ServiceId, locale).slug}`;
  if (kind === "zone") return `${PREFIX[locale]}/${getZone(id as ZoneId, locale).slug}`;
  if (kind === "guide") return `${STATIC_PATHS.guides[locale]}/${getGuide(id as GuideId, locale).slug}`;
  return STATIC_PATHS[key as StaticPageKey][locale];
}

/** Booking page with a treatment preselected. */
export function bookingPathFor(serviceId: ServiceId, locale: Locale): string {
  return `${STATIC_PATHS.book[locale]}?service=${serviceId}`;
}

/** Every indexable page (the booking form and the privacy policy are noindex). */
export function indexablePageKeys(): PageKey[] {
  const statics = (Object.keys(STATIC_PATHS) as StaticPageKey[]).filter((key) => !isNoindexKey(key));
  return [
    ...statics,
    ...SERVICE_IDS.map((id) => `service:${id}` as const),
    ...ZONE_IDS.map((id) => `zone:${id}` as const),
    ...GUIDE_IDS.map((id) => `guide:${id}` as const),
  ];
}

/** Treatments and areas share the top-level [slug] route of each language. */
export function topLevelSlugParams(locale: Locale): { slug: string }[] {
  return [
    ...SERVICE_IDS.map((id) => ({ slug: getService(id, locale).slug })),
    ...ZONE_IDS.map((id) => ({ slug: getZone(id, locale).slug })),
  ];
}

export function resolveTopLevelSlug(
  slug: string,
  locale: Locale
): { kind: "service"; id: ServiceId } | { kind: "zone"; id: ZoneId } | undefined {
  const serviceId = SERVICE_IDS.find((id) => getService(id, locale).slug === slug);
  if (serviceId) return { kind: "service", id: serviceId };
  const zoneId = ZONE_IDS.find((id) => getZone(id, locale).slug === slug);
  if (zoneId) return { kind: "zone", id: zoneId };
  return undefined;
}

export function guideSlugParams(locale: Locale): { slug: string }[] {
  return GUIDE_IDS.map((id) => ({ slug: getGuide(id, locale).slug }));
}

export function resolveGuideSlug(slug: string, locale: Locale): GuideId | undefined {
  return GUIDE_IDS.find((id) => getGuide(id, locale).slug === slug);
}
