import type { Locale } from "@/i18n/locales";
import type { ServiceId, ZoneCopy, ZoneId } from "./types";
import { zonesFr } from "./fr/zones";
import { zonesEn } from "./en/zones";

// Areas with their own page. Each page carries information specific to that
// area (access, accommodation, landmarks); areas without such information
// are listed on the areas hub instead of getting a thin page.

export interface ZoneBase {
  id: ZoneId;
  neighbours: ZoneId[];
  services: ServiceId[];
}

export interface Zone extends ZoneBase, ZoneCopy {}

export const ZONE_IDS: ZoneId[] = [
  "medina",
  "gueliz",
  "hivernage",
  "palmeraie",
  "agdal",
  "route-ourika",
  "amelkis",
  "agafay",
  "route-amizmiz",
  "targa",
  "al-maaden",
];

const BASE: Record<ZoneId, ZoneBase> = {
  medina: {
    id: "medina",
    neighbours: ["hivernage", "gueliz", "agdal"],
    services: ["hammam-berbere", "massage-berbere", "pedicure"],
  },
  gueliz: {
    id: "gueliz",
    neighbours: ["hivernage", "targa", "medina"],
    services: ["massage-berbere", "massage-sportif", "manucure"],
  },
  hivernage: {
    id: "hivernage",
    neighbours: ["gueliz", "medina", "agdal"],
    services: ["massage-berbere", "hammam-berbere", "manucure"],
  },
  palmeraie: {
    id: "palmeraie",
    neighbours: ["gueliz", "medina", "hivernage"],
    services: ["massage-berbere", "hammam-berbere", "massage-sportif"],
  },
  agdal: {
    id: "agdal",
    neighbours: ["hivernage", "medina", "route-ourika"],
    services: ["massage-berbere", "massage-future-maman", "hammam-berbere"],
  },
  "route-ourika": {
    id: "route-ourika",
    neighbours: ["agdal", "amelkis", "agafay"],
    services: ["massage-sportif", "hammam-berbere", "massage-berbere"],
  },
  amelkis: {
    id: "amelkis",
    neighbours: ["al-maaden", "route-ourika", "agdal"],
    services: ["massage-sportif", "massage-berbere", "pedicure"],
  },
  agafay: {
    id: "agafay",
    neighbours: ["route-amizmiz", "route-ourika", "agdal"],
    services: ["massage-pierres-chaudes", "massage-sportif", "massage-berbere"],
  },
  "route-amizmiz": {
    id: "route-amizmiz",
    neighbours: ["agafay", "targa", "hivernage"],
    services: ["massage-sportif", "hammam-berbere", "manucure"],
  },
  targa: {
    id: "targa",
    neighbours: ["gueliz", "hivernage", "route-amizmiz"],
    services: ["hammam-royal", "massage-berbere", "brushing"],
  },
  "al-maaden": {
    id: "al-maaden",
    neighbours: ["amelkis", "agdal", "route-ourika"],
    services: ["massage-sportif", "massage-berbere", "hammam-royal"],
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
