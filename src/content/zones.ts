import type { Locale } from "@/i18n/locales";
import type { ServiceId, ZoneCopy, ZoneId } from "./types";
import { zonesFr } from "./fr/zones";
import { zonesEn } from "./en/zones";

// Areas with their own page. Each page carries information specific to that
// area (access, accommodation, travel fee); areas without such information
// are listed on the areas hub instead of getting a thin page.

export interface ZoneBase {
  id: ZoneId;
  /** False where a travel fee may apply (confirmed before booking). */
  travelIncluded: boolean;
  neighbours: ZoneId[];
  services: ServiceId[];
}

export interface Zone extends ZoneBase, ZoneCopy {}

export const ZONE_IDS: ZoneId[] = ["medina", "gueliz", "hivernage", "palmeraie", "agdal", "route-ourika"];

const BASE: Record<ZoneId, ZoneBase> = {
  medina: {
    id: "medina",
    travelIncluded: true,
    neighbours: ["hivernage", "gueliz", "agdal"],
    services: ["hammam-berbere", "massage-berbere", "massage-4-mains"],
  },
  gueliz: {
    id: "gueliz",
    travelIncluded: true,
    neighbours: ["hivernage", "medina", "palmeraie"],
    services: ["massage-thai", "massage-sportif", "massage-berbere"],
  },
  hivernage: {
    id: "hivernage",
    travelIncluded: true,
    neighbours: ["gueliz", "medina", "agdal"],
    services: ["massage-berbere", "massage-4-mains", "hammam-royal"],
  },
  palmeraie: {
    id: "palmeraie",
    travelIncluded: true,
    neighbours: ["gueliz", "medina", "hivernage"],
    services: ["massage-4-mains", "hammam-royal", "massage-berbere"],
  },
  agdal: {
    id: "agdal",
    travelIncluded: true,
    neighbours: ["hivernage", "medina", "route-ourika"],
    services: ["massage-berbere", "massage-future-maman", "hammam-berbere"],
  },
  "route-ourika": {
    id: "route-ourika",
    travelIncluded: false,
    neighbours: ["agdal", "medina", "palmeraie"],
    services: ["massage-sportif", "massage-4-mains", "hammam-royal"],
  },
};

const COPY: Record<Locale, Record<ZoneId, ZoneCopy>> = {
  fr: zonesFr,
  en: zonesEn,
};

export function getZone(id: ZoneId, locale: Locale): Zone {
  return { ...BASE[id], ...COPY[locale][id] };
}

export function getZones(locale: Locale): Zone[] {
  return ZONE_IDS.map((id) => getZone(id, locale));
}
