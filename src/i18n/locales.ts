export const LOCALES = ["fr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
};

/** BCP 47 tags for Intl formatting and schema.org `inLanguage`. */
export const LANGUAGE_TAG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
