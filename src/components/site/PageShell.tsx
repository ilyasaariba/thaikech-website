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

/** What the page is about, quoted in the pre-filled WhatsApp message. */
function pageTopic(key: PageKey, locale: Locale): string | undefined {
  const [kind, id] = key.split(":");
  if (kind === "service") return getService(id as ServiceId, locale).name;
  if (kind === "zone") return getZone(id as ZoneId, locale).h1;
  if (kind === "guide") return getGuide(id as GuideId, locale).title;
  if (key === "hammam" || key === "duo" || key === "inRoom" || key === "groups") return getPages(locale)[key].h1;
  return undefined;
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
  const topic = pageTopic(pageKey, locale);
  const message = topic ? contact.messageAbout.replace("{page}", topic) : contact.message;

  return (
    <>
      <SiteHeader locale={locale} alternateHref={alternateHref} overlay={overlayHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} alternateHref={alternateHref} />
      <FloatingContact
        locale={locale}
        whatsappHref={whatsappUrl(BUSINESS.phoneDigits, message)}
        labels={{ whatsapp: contact.whatsapp, question: contact.question, book: contact.book }}
      />
      <LanguageSuggestion pageLocale={locale} href={alternateHref} lang={alternate} {...UI[alternate].suggestion} />
    </>
  );
}
