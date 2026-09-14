import type { Locale } from "@/i18n/locales";
import type { ServiceCopy, ServiceId } from "./types";
import { servicesFr } from "./fr/services";
import { servicesEn } from "./en/services";

// The treatment catalogue. Prices and durations live here, in the code, so
// pages render without Supabase. Change a price here and redeploy.

export interface ServiceBase {
  id: ServiceId;
  /** Price in Moroccan dirhams (MAD). */
  price: number;
  minutes: number;
  category: "massage" | "hammam";
  image: string;
  therapists: 1 | 2;
  related: ServiceId[];
}

export interface Service extends ServiceBase, ServiceCopy {}

/** Ordered as shown on the site: price ascending, massages before hammams at equal price. */
export const SERVICE_IDS: ServiceId[] = [
  "massage-berbere",
  "massage-sportif",
  "massage-thai",
  "massage-future-maman",
  "hammam-berbere",
  "massage-4-mains",
  "hammam-royal",
];

const BASE: Record<ServiceId, ServiceBase> = {
  "massage-berbere": {
    id: "massage-berbere",
    price: 450,
    minutes: 60,
    category: "massage",
    image: "/assets/massage-berbere-huile-argan.webp",
    therapists: 1,
    related: ["massage-thai", "hammam-berbere", "massage-sportif"],
  },
  "massage-sportif": {
    id: "massage-sportif",
    price: 500,
    minutes: 60,
    category: "massage",
    image: "/assets/massage-sportif-recuperation.webp",
    therapists: 1,
    related: ["massage-thai", "massage-berbere", "massage-4-mains"],
  },
  "massage-thai": {
    id: "massage-thai",
    price: 550,
    minutes: 75,
    category: "massage",
    image: "/assets/massage-thai-etirements.webp",
    therapists: 1,
    related: ["massage-sportif", "massage-berbere", "massage-4-mains"],
  },
  "massage-future-maman": {
    id: "massage-future-maman",
    price: 550,
    minutes: 90,
    category: "massage",
    image: "/assets/massage-femme-enceinte.webp",
    therapists: 1,
    related: ["massage-berbere", "massage-4-mains"],
  },
  "hammam-berbere": {
    id: "hammam-berbere",
    price: 550,
    minutes: 75,
    category: "hammam",
    image: "/assets/hammam-berbere-savon-noir-kessa.webp",
    therapists: 1,
    related: ["hammam-royal", "massage-berbere", "massage-sportif"],
  },
  "massage-4-mains": {
    id: "massage-4-mains",
    price: 650,
    minutes: 75,
    category: "massage",
    image: "/assets/massage-4-mains.webp",
    therapists: 2,
    related: ["massage-berbere", "massage-thai", "hammam-royal"],
  },
  "hammam-royal": {
    id: "hammam-royal",
    price: 650,
    minutes: 90,
    category: "hammam",
    image: "/assets/hammam-royal-fleur-oranger.webp",
    therapists: 1,
    related: ["hammam-berbere", "massage-4-mains", "massage-berbere"],
  },
};

const COPY: Record<Locale, Record<ServiceId, ServiceCopy>> = {
  fr: servicesFr,
  en: servicesEn,
};

export function getService(id: ServiceId, locale: Locale): Service {
  return { ...BASE[id], ...COPY[locale][id] };
}

export function getServices(locale: Locale): Service[] {
  return SERVICE_IDS.map((id) => getService(id, locale));
}

export function isServiceId(value: string): value is ServiceId {
  return value in BASE;
}

export const PRICE_RANGE = {
  min: Math.min(...SERVICE_IDS.map((id) => BASE[id].price)),
  max: Math.max(...SERVICE_IDS.map((id) => BASE[id].price)),
};

/** "1 h 15" in French, "75 min" in English. */
export function formatDuration(minutes: number, locale: Locale): string {
  if (locale === "en") return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${String(rest).padStart(2, "0")}` : `${hours} h`;
}
