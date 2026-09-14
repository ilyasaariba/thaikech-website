import type { Locale } from "@/i18n/locales";
import type { PagesCopy } from "./types";
import { pagesFr } from "./fr/pages";
import { pagesEn } from "./en/pages";

const PAGES: Record<Locale, PagesCopy> = {
  fr: pagesFr,
  en: pagesEn,
};

export function getPages(locale: Locale): PagesCopy {
  return PAGES[locale];
}
