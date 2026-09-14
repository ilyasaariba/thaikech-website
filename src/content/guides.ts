import type { Locale } from "@/i18n/locales";
import type { GuideCopy, GuideId, PageKey } from "./types";
import { guidesFr } from "./fr/guides";
import { guidesEn } from "./en/guides";

// Practical guides. Each one answers a real traveller question and points to
// one money page (`target`), so its authority flows to a bookable treatment.

export interface GuideBase {
  id: GuideId;
  published: string;
  updated: string;
  image: string;
  target: PageKey;
}

export interface Guide extends GuideBase, GuideCopy {}

/** Newest first on the guides index. */
export const GUIDE_IDS: GuideId[] = [
  "hammam-at-home",
  "berber-or-thai",
  "hotel-room-massage",
  "atlas-trek-recovery",
  "pregnancy-travel",
  "tipping",
];

const BASE: Record<GuideId, GuideBase> = {
  "hammam-at-home": {
    id: "hammam-at-home",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/hammam-royal-fleur-oranger.webp",
    target: "hammam",
  },
  "berber-or-thai": {
    id: "berber-or-thai",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-huile-argan-therapeute.webp",
    target: "service:massage-berbere",
  },
  "hotel-room-massage": {
    id: "hotel-room-massage",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-tete-relaxation.webp",
    target: "inRoom",
  },
  "atlas-trek-recovery": {
    id: "atlas-trek-recovery",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-sportif-recuperation.webp",
    target: "service:massage-sportif",
  },
  "pregnancy-travel": {
    id: "pregnancy-travel",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-femme-enceinte.webp",
    target: "service:massage-future-maman",
  },
  tipping: {
    id: "tipping",
    published: "2026-09-14",
    updated: "2026-09-14",
    image: "/assets/massage-thai-serviettes-chaudes.webp",
    target: "prices",
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
