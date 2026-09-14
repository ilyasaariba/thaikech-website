import type { ReactNode } from "react";
import { otherLocale, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { FORM_COPY } from "@/i18n/form";
import type { PageKey } from "@/content/types";
import { pathFor } from "@/content/routes";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import StickyBookBar from "./StickyBookBar";
import LanguageSuggestion from "./LanguageSuggestion";

/**
 * Header, footer and floating controls around a page. Every page rendered in
 * a shell carries the booking form (id="reserver"), which the header button
 * and the mobile bar scroll to.
 */
export default function PageShell({
  locale,
  pageKey,
  overlayHeader = false,
  children,
}: {
  locale: Locale;
  pageKey: PageKey;
  overlayHeader?: boolean;
  children: ReactNode;
}) {
  const alternate = otherLocale(locale);
  const alternateHref = pathFor(pageKey, alternate);

  return (
    <>
      <SiteHeader locale={locale} alternateHref={alternateHref} overlay={overlayHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} alternateHref={alternateHref} />
      <StickyBookBar href="#reserver" label={FORM_COPY[locale].submit} />
      <LanguageSuggestion pageLocale={locale} href={alternateHref} lang={alternate} {...UI[alternate].suggestion} />
    </>
  );
}
