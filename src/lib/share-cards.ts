import { LOCALES, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import type { GuideId, PageKey, ServiceId, StaticPageKey, ZoneId } from "@/content/types";
import { BUSINESS } from "@/content/business";
import { getPages } from "@/content/pages";
import { formatDuration, getService } from "@/content/services";
import { getZone } from "@/content/zones";
import { getGuide } from "@/content/guides";
import { indexablePageKeys, pathFor } from "@/content/routes";

// The share image (og:image) of each page: its own photo and title on the
// brand card, so a link sent on WhatsApp or Facebook shows the treatment, area
// or guide it leads to. Built from the content at build time by the route
// app/og/[locale]/[image], so a new price or title updates the image too.
// The home page keeps the hand-made brand card in public/og.

export interface ShareCard {
  eyebrow: string;
  title: string;
  /** Gold badge under the title: price and duration, or two key facts. */
  badge?: string[];
  /** Photo in public/, drawn behind the text. */
  photo: string;
  /** Alt text of the finished image. */
  alt: string;
}

const LABELS: Record<Locale, { massage: string; hammam: string; area: string; guide: string }> = {
  fr: {
    massage: "Massage à domicile · Marrakech",
    hammam: "Hammam à domicile · Marrakech",
    area: "Massage & hammam à domicile",
    guide: "Guide pratique · Marrakech",
  },
  en: {
    massage: "Massage at home · Marrakech",
    hammam: "Hammam at home · Marrakech",
    area: "Massage & hammam at home",
    guide: "Practical guide · Marrakech",
  },
};

/** Photo of each landing page with a share card (the same one the page shows, where it has one). */
const LANDING_PHOTO: Partial<Record<StaticPageKey, string>> = {
  hammam: "/assets/hammam-royal-fleur-oranger.webp",
  duo: "/assets/massage-duo-couple.webp",
  inRoom: BUSINESS.heroImage,
  groups: "/assets/massage-duo-couple.webp",
  prices: "/assets/massage-huile-argan-therapeute.webp",
  areas: BUSINESS.heroImage,
  charter: "/assets/massage-huile-argan-therapeute.webp",
  guides: "/assets/massage-thai-serviettes-chaudes.webp",
};

type LandingKey = "hammam" | "duo" | "inRoom" | "groups" | "prices" | "areas" | "charter";

function hasCard(key: PageKey): boolean {
  return key.includes(":") || key in LANDING_PHOTO;
}

export function shareCard(key: PageKey, locale: Locale): ShareCard | undefined {
  if (!hasCard(key)) return undefined;
  const ui = UI[locale];
  const labels = LABELS[locale];
  const [kind, id] = key.split(":");

  if (kind === "service") {
    const service = getService(id as ServiceId, locale);
    const badge = [
      `${service.price} MAD`,
      formatDuration(service.minutes, locale),
      ...(service.therapists === 2 ? [ui.common.twoTherapists] : []),
    ];
    return {
      eyebrow: service.category === "hammam" ? labels.hammam : labels.massage,
      title: service.name,
      badge,
      photo: service.image,
      alt: `${service.name} — ${badge.join(" · ")}`,
    };
  }
  if (kind === "zone") {
    const zone = getZone(id as ZoneId, locale);
    // An area has no photo of its own: show its most recommended treatment.
    return {
      eyebrow: labels.area,
      title: zone.h1,
      badge: [ui.common.travelIncluded, ui.common.hours],
      photo: getService(zone.services[0], locale).image,
      alt: zone.h1,
    };
  }
  if (kind === "guide") {
    const guide = getGuide(id as GuideId, locale);
    return { eyebrow: labels.guide, title: guide.title, photo: guide.image, alt: guide.title };
  }

  const pages = getPages(locale);
  const photo = LANDING_PHOTO[key as StaticPageKey] as string;
  if (key === "guides") {
    return { eyebrow: pages.guidesIndex.eyebrow, title: pages.guidesIndex.h1, photo, alt: pages.guidesIndex.h1 };
  }
  const copy = pages[key as LandingKey];
  // The card's last line already says "female therapists".
  const badge = copy.facts.filter((fact) => fact !== ui.common.therapists).slice(0, 2);
  return { eyebrow: copy.eyebrow, title: copy.h1, badge, photo, alt: copy.h1 };
}

/** File name from the page path: "/en/guides/tipping-…" → "guides-tipping-…". */
function imageName(key: PageKey, locale: Locale): string {
  const path = pathFor(key, locale).replace(/^\/en(?=\/|$)/, "");
  return `${path.slice(1).replaceAll("/", "-")}.jpg`;
}

/** The page's generated share image, or undefined to use the brand card. */
export function shareImageFor(key: PageKey, locale: Locale): { url: string; alt: string } | undefined {
  const card = shareCard(key, locale);
  return card ? { url: `/og/${locale}/${imageName(key, locale)}`, alt: card.alt } : undefined;
}

export function shareImageParams(): { locale: Locale; image: string }[] {
  const keys = indexablePageKeys().filter(hasCard);
  return LOCALES.flatMap((locale) => keys.map((key) => ({ locale, image: imageName(key, locale) })));
}

export function resolveShareImage(locale: string, image: string): { key: PageKey; locale: Locale } | undefined {
  const match = LOCALES.find((candidate) => candidate === locale);
  if (!match) return undefined;
  const key = indexablePageKeys()
    .filter(hasCard)
    .find((candidate) => imageName(candidate, match) === image);
  return key ? { key, locale: match } : undefined;
}
