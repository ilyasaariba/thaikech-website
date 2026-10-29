import type { Locale } from "@/i18n/locales";
import type { GuideCopy, GuideId, PageKey } from "./types";
import { guidesFr } from "./fr/guides";
import { guidesEn } from "./en/guides";

// Practical guides. Each one answers a real traveller question and points to
// one money page (`target`), so its authority flows to a bookable treatment.
// `related` and `shownOn` link every guide from the pages on the same topic,
// so older guides are not left with only the guides index linking to them.

export interface GuideBase {
  id: GuideId;
  published: string;
  updated: string;
  image: string;
  target: PageKey;
  /** The three guides suggested at the end of this one, closest topic first. */
  related: GuideId[];
  /** Treatment, area and landing pages that suggest this guide. */
  shownOn: PageKey[];
}

export interface Guide extends GuideBase, GuideCopy {}

/** Newest first on the guides index. */
export const GUIDE_IDS: GuideId[] = [
  "home-massage-prices",
  "hammam-marrakech",
  "hammam-at-home",
  "berber-or-thai",
  "hotel-room-massage",
  "atlas-trek-recovery",
  "pregnancy-travel",
  "tipping",
];

// Photos under the Unsplash License: massage-huile-argan-therapeute
// (unsplash.com/photos/-AakIaAPV0w), massage-tete-relaxation (Y1JKxNFwZx4),
// massage-thai-serviettes-chaudes (VxAwTeiqDao).
const BASE: Record<GuideId, GuideBase> = {
  "home-massage-prices": {
    id: "home-massage-prices",
    published: "2026-10-10",
    updated: "2026-10-23",
    image: "/assets/massage-huile-argan-therapeute.webp",
    target: "prices",
    related: ["tipping", "berber-or-thai", "hotel-room-massage"],
    shownOn: ["prices", "groups", "service:massage-berbere", "service:massage-4-mains", "zone:gueliz"],
  },
  "hammam-marrakech": {
    id: "hammam-marrakech",
    published: "2026-10-10",
    updated: "2026-10-23",
    image: "/assets/hammam-berbere-savon-noir-kessa.webp",
    target: "hammam",
    related: ["hammam-at-home", "tipping", "pregnancy-travel"],
    shownOn: ["hammam", "service:hammam-berbere", "service:hammam-royal", "zone:medina"],
  },
  "hammam-at-home": {
    id: "hammam-at-home",
    published: "2026-09-14",
    updated: "2026-10-23",
    image: "/assets/hammam-royal-fleur-oranger.webp",
    target: "hammam",
    related: ["hammam-marrakech", "pregnancy-travel", "hotel-room-massage"],
    shownOn: ["hammam", "groups", "service:hammam-berbere", "service:hammam-royal", "zone:palmeraie", "zone:targa"],
  },
  "berber-or-thai": {
    id: "berber-or-thai",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-huile-argan-therapeute.webp",
    target: "service:massage-berbere",
    related: ["home-massage-prices", "atlas-trek-recovery", "hammam-at-home"],
    shownOn: ["duo", "service:massage-berbere", "service:massage-thai", "zone:gueliz"],
  },
  "hotel-room-massage": {
    id: "hotel-room-massage",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-tete-relaxation.webp",
    target: "inRoom",
    related: ["tipping", "hammam-at-home", "berber-or-thai"],
    shownOn: [
      "inRoom",
      "duo",
      "service:massage-4-mains",
      "zone:medina",
      "zone:hivernage",
      "zone:agdal",
      "zone:agafay",
      "zone:route-amizmiz",
      "zone:al-maaden",
    ],
  },
  "atlas-trek-recovery": {
    id: "atlas-trek-recovery",
    published: "2026-09-14",
    updated: "2026-10-23",
    image: "/assets/massage-sportif-recuperation.webp",
    target: "service:massage-sportif",
    related: ["berber-or-thai", "hammam-marrakech", "hotel-room-massage"],
    shownOn: [
      "service:massage-sportif",
      "service:massage-thai",
      "service:massage-pierres-chaudes",
      "service:pedicure",
      "zone:route-ourika",
      "zone:amelkis",
    ],
  },
  "pregnancy-travel": {
    id: "pregnancy-travel",
    published: "2026-09-14",
    updated: "2026-10-23",
    image: "/assets/massage-femme-enceinte.webp",
    target: "service:massage-future-maman",
    related: ["hammam-at-home", "hotel-room-massage", "berber-or-thai"],
    shownOn: ["hammam", "service:massage-future-maman", "zone:agdal"],
  },
  tipping: {
    id: "tipping",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-thai-serviettes-chaudes.webp",
    target: "prices",
    related: ["home-massage-prices", "hammam-marrakech", "hotel-room-massage"],
    shownOn: ["prices", "inRoom", "groups"],
  },
};

const COPY: Record<Locale, Record<GuideId, GuideCopy>> = {
  fr: guidesFr,
  en: guidesEn,
};

export function getGuide(id: GuideId, locale: Locale): Guide {
  return { ...BASE[id], ...COPY[locale][id] };
}

export function getGuides(locale: Locale): Guide[] {
  return GUIDE_IDS.map((id) => getGuide(id, locale));
}

/** Guides suggested on a treatment, area or landing page, newest first. */
export function guidesFor(key: PageKey, locale: Locale): Guide[] {
  return GUIDE_IDS.filter((id) => BASE[id].shownOn.includes(key)).map((id) => getGuide(id, locale));
}
