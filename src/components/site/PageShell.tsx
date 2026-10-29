import type { ReactNode } from "react";
import { otherLocale, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import type { GuideId, PageKey, ServiceId, ZoneId } from "@/content/types";
import { pathFor } from "@/content/routes";
import { getService } from "@/content/services";
import { getZone } from "@/content/zones";
import { getGuide } from "@/content/guides";
import { getPages } from "@/content/pages";
import { whatsappUrl } from "@/lib/whatsapp-booking";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingContact from "./FloatingContact";
import LanguageSuggestion from "./LanguageSuggestion";

/**
 * The pre-filled WhatsApp message of a page's contact buttons. Kept to a few
 * families the team answers with one stock reply each: a named treatment or
 * occasion, an area (named, one reply for all), or a general question. A guide
 * sends the message of the page it promotes.
 */
function whatsappMessage(key: PageKey, locale: Locale): string {
  const contact = UI[locale].contact;
  const [kind, id] = key.split(":");
  if (kind === "service") return contact.messageAbout.replace("{page}", getService(id as ServiceId, locale).name);
  if (kind === "zone") return contact.messageArea.replace("{area}", getZone(id as ZoneId, locale).name);
  if (kind === "guide") return whatsappMessage(getGuide(id as GuideId, locale).target, locale);
  if (key === "hammam" || key === "beauty" || key === "duo" || key === "inRoom" || key === "groups") {
    return contact.messageAbout.replace("{page}", getPages(locale)[key].h1);
  }
  return contact.message;
}

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
  const contact = UI[locale].contact;
  const whatsappHref = whatsappUrl(BUSINESS.phoneDigits, whatsappMessage(pageKey, locale));

  return (
    <>
      <SiteHeader locale={locale} alternateHref={alternateHref} overlay={overlayHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} alternateHref={alternateHref} whatsappHref={whatsappHref} />
      <FloatingContact
        locale={locale}
        whatsappHref={whatsappHref}
        labels={{ whatsapp: contact.whatsapp, question: contact.question, book: contact.book }}
      />
      <LanguageSuggestion pageLocale={locale} href={alternateHref} lang={alternate} {...UI[alternate].suggestion} />
    </>
  );
}
