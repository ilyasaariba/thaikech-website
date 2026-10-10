import type { Metadata } from "next";
import { LANGUAGE_TAG, OG_LOCALE, otherLocale, type Locale } from "@/i18n/locales";
import { BUSINESS, SITE_URL } from "@/content/business";
import type { Faq, PageKey } from "@/content/types";
import { pathFor } from "@/content/routes";
import { PRICE_RANGE, getServices } from "@/content/services";
import { getZones } from "@/content/zones";

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Removes the inline link and bold syntax used in content strings. */
export function stripMarkup(text: string): string {
  let previous: string;
  let current = text;
  do {
    previous = current;
    current = current
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1");
  } while (current !== previous);
  return current;
}

// Branded share images (1200×630) shown by WhatsApp, Facebook and X. Set on
// every page explicitly: a page's own openGraph object replaces the one from
// its layout, including any image-file convention.
const SHARE_IMAGE: Record<Locale, { url: string; alt: string }> = {
  fr: {
    url: "/og/thai-kech-fr.jpg",
    alt: "Thai Kech — Massage et hammam à domicile à Marrakech, dans votre riad, villa ou hôtel. Tous les jours de 8h à 22h.",
  },
  en: {
    url: "/og/thai-kech-en.jpg",
    alt: "Thai Kech — Massage and hammam at home in Marrakech, in your riad, villa or hotel. Every day from 8am to 10pm.",
  },
};

function shareImages(locale: Locale) {
  return [{ ...SHARE_IMAGE[locale], width: 1200, height: 630 }];
}

const SITE_DESCRIPTION: Record<Locale, string> = {
  fr: "Massages et hammams à domicile à Marrakech : nos thérapeutes femmes viennent dans votre riad, votre villa ou votre hôtel, tous les jours de 8h à 22h.",
  en: "Massages and hammams at home in Marrakech: our female therapists come to your riad, villa or hotel, every day from 8am to 10pm.",
};

/** Defaults for a root layout; each page adds its own title, canonical and alternates. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | Thai Kech",
      default: locale === "fr" ? "Thai Kech — Massage & Hammam à Domicile à Marrakech" : "Thai Kech — Massage & Hammam at Home in Marrakech",
    },
    description: SITE_DESCRIPTION[locale],
    applicationName: BUSINESS.name,
    openGraph: {
      type: "website",
      siteName: BUSINESS.name,
      locale: OG_LOCALE[locale],
      images: shareImages(locale),
    },
    twitter: {
      card: "summary_large_image",
      images: shareImages(locale),
    },
    verification: siteVerification(),
  };
}

// Ownership tags for Google Search Console and Bing Webmaster Tools. A
// verification code is public by design (it sits in every page's HTML), so
// it may live in the code once known; the env vars allow setting it earlier.
function siteVerification(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

interface PageMetadataInput {
  locale: Locale;
  key: PageKey;
  title: string;
  description: string;
  /** Use the title as is, without the " | Thai Kech" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  article?: { publishedTime: string; modifiedTime: string };
}

export function pageMetadata({ locale, key, title, description, absoluteTitle, noindex, article }: PageMetadataInput): Metadata {
  const fr = pathFor(key, "fr");
  const en = pathFor(key, "en");
  const canonical = locale === "fr" ? fr : en;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      // English is the fallback for visitors who read neither language.
      ...(noindex ? {} : { languages: { fr, en, "x-default": en } }),
    },
    openGraph: {
      type: article ? "article" : "website",
      siteName: BUSINESS.name,
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[otherLocale(locale)]],
      url: canonical,
      title,
      description,
      images: shareImages(locale),
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shareImages(locale),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ---------------------------------------------------------------------------
// Structured data (schema.org JSON-LD)
// ---------------------------------------------------------------------------

type JsonLdNode = Record<string, unknown>;

export function jsonLdGraph(...nodes: (JsonLdNode | undefined | false)[]): JsonLdNode {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

const BUSINESS_DESCRIPTION: Record<Locale, string> = {
  fr: "Spa mobile à Marrakech : massages et hammams à domicile, dans votre riad, votre villa ou votre hôtel, par des thérapeutes femmes.",
  en: "Mobile spa in Marrakech: massages and hammams at home, in your riad, villa or hotel, by female therapists.",
};

/** The business, with its service area, hours and priced catalogue. */
export function businessNode(locale: Locale, { withCatalog = false } = {}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "HealthAndBeautyBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: absoluteUrl(BUSINESS.logo),
    image: absoluteUrl(BUSINESS.heroImage),
    description: BUSINESS_DESCRIPTION[locale],
    telephone: `+${BUSINESS.phoneDigits}`,
    email: BUSINESS.email,
    priceRange: `${PRICE_RANGE.min}–${PRICE_RANGE.max} MAD`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      addressRegion: "Marrakech-Safi",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Marrakech" },
      ...getZones(locale).map((zone) => ({ "@type": "Place", name: `${zone.name}, Marrakech` })),
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
    ...(BUSINESS.sameAs.length > 0 ? { sameAs: BUSINESS.sameAs } : {}),
  };

  if (withCatalog) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: locale === "fr" ? "Massages et hammams à domicile" : "Massages and hammams at home",
      itemListElement: getServices(locale).map((service) => ({
        "@type": "Offer",
        price: service.price,
        priceCurrency: "MAD",
        url: absoluteUrl(pathFor(`service:${service.id}`, locale)),
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
        },
      })),
    };
  }

  return node;
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: [LANGUAGE_TAG.fr, LANGUAGE_TAG.en],
    publisher: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbNode(items: { name: string; href: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceNode({
  locale,
  key,
  name,
  description,
  image,
  price,
  areaName = "Marrakech",
}: {
  locale: Locale;
  key: PageKey;
  name: string;
  description: string;
  image?: string;
  price?: number;
  areaName?: string;
}): JsonLdNode {
  const url = absoluteUrl(pathFor(key, locale));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    ...(image ? { image: absoluteUrl(image) } : {}),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Place", name: areaName },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "MAD",
            url,
          },
        }
      : {}),
  };
}

export function faqNode(faqs: Faq[]): JsonLdNode | undefined {
  if (faqs.length === 0) return undefined;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: stripMarkup(faq.a) },
    })),
  };
}

export function articleNode({
  locale,
  key,
  headline,
  description,
  image,
  published,
  updated,
}: {
  locale: Locale;
  key: PageKey;
  headline: string;
  description: string;
  image: string;
  published: string;
  updated: string;
}): JsonLdNode {
  const url = absoluteUrl(pathFor(key, locale));
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    description,
    image: absoluteUrl(image),
    datePublished: published,
    dateModified: updated,
    inLanguage: LANGUAGE_TAG[locale],
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
    publisher: { "@id": BUSINESS_ID },
  };
}
