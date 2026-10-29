import type { Locale } from "@/i18n/locales";
import type { ServiceCopy, ServiceId } from "./types";
import { servicesFr } from "./fr/services";
import { servicesEn } from "./en/services";

// The treatment catalogue. Prices and durations live here, in the code.
// Change a price here and redeploy.

export interface ServiceBase {
  id: ServiceId;
  /** Price in Moroccan dirhams (MAD). */
  price: number;
  minutes: number;
  category: "massage" | "hammam" | "beauty";
  image: string;
  therapists: 1 | 2;
  related: ServiceId[];
}

export interface Service extends ServiceBase, ServiceCopy {}

/**
 * Ordered as shown on the site: massages and hammams first (the core offer),
 * by price ascending with massages before hammams at equal price, then the
 * beauty treatments.
 */
export const SERVICE_IDS: ServiceId[] = [
  "massage-berbere",
  "massage-sportif",
  "massage-thai",
  "massage-future-maman",
  "hammam-berbere",
  "massage-pierres-chaudes",
  "hammam-royal",
  "massage-4-mains",
  "brushing",
  "manucure",
  "pedicure",
];

const BASE: Record<ServiceId, ServiceBase> = {
  "massage-berbere": {
    id: "massage-berbere",
    price: 450,
    minutes: 60,
    category: "massage",
    image: "/assets/massage-berbere-huile-argan.webp",
    therapists: 1,
    related: ["massage-sportif", "hammam-berbere", "massage-pierres-chaudes"],
  },
  "massage-sportif": {
    id: "massage-sportif",
    price: 500,
    minutes: 60,
    category: "massage",
    image: "/assets/massage-sportif-recuperation.webp",
    therapists: 1,
    related: ["massage-berbere", "hammam-berbere", "massage-pierres-chaudes"],
  },
  "massage-thai": {
    id: "massage-thai",
    price: 550,
    minutes: 75,
    category: "massage",
    image: "/assets/massage-thai-etirements.webp",
    therapists: 1,
    related: ["massage-sportif", "massage-berbere", "hammam-berbere"],
  },
  "massage-future-maman": {
    id: "massage-future-maman",
    price: 550,
    minutes: 90,
    category: "massage",
    image: "/assets/massage-femme-enceinte.webp",
    therapists: 1,
    related: ["massage-berbere", "pedicure"],
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
    price: 750,
    minutes: 75,
    category: "massage",
    image: "/assets/massage-4-mains.webp",
    therapists: 2,
    related: ["massage-berbere", "massage-sportif", "hammam-berbere"],
  },
  "hammam-royal": {
    id: "hammam-royal",
    price: 650,
    minutes: 90,
    category: "hammam",
    image: "/assets/hammam-royal-fleur-oranger.webp",
    therapists: 1,
    related: ["hammam-berbere", "massage-berbere", "manucure"],
  },
  // Photo: Unsplash License (unsplash.com/photos/SMwCQZWayj0).
  "massage-pierres-chaudes": {
    id: "massage-pierres-chaudes",
    price: 600,
    minutes: 60,
    category: "massage",
    image: "/assets/massage-pierres-chaudes.webp",
    therapists: 1,
    related: ["massage-berbere", "massage-sportif", "hammam-berbere"],
  },
  // Beauty photos: Unsplash License (unsplash.com/photos/FkAZqQJTbXM,
  // Xa8fX8bQCgs and qeuJczNo54w).
  brushing: {
    id: "brushing",
    price: 350,
    minutes: 60,
    category: "beauty",
    image: "/assets/brushing-cheveux-a-domicile.webp",
    therapists: 1,
    related: ["manucure", "pedicure", "hammam-royal"],
  },
  manucure: {
    id: "manucure",
    price: 300,
    minutes: 60,
    category: "beauty",
    image: "/assets/manucure-vernis-classique.webp",
    therapists: 1,
    related: ["pedicure", "brushing", "massage-berbere"],
  },
  pedicure: {
    id: "pedicure",
    price: 300,
    minutes: 60,
    category: "beauty",
    image: "/assets/pedicure-bain-de-pieds.webp",
    therapists: 1,
    related: ["manucure", "brushing", "massage-sportif"],
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
