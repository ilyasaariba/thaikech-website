import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { otherLocale, type Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import { getPages } from "@/content/pages";
import { getServices } from "@/content/services";
import { pathFor } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";
import WhatsAppBookingForm from "@/components/booking/WhatsAppBookingForm";
import { CheckIcon } from "@/components/icons";

// The booking form is a tool, not a search landing page: kept out of the
// index, but its links are followed.
export function bookMetadata(locale: Locale): Metadata {
  const copy = getPages(locale).book;
  return pageMetadata({ locale, key: "book", title: copy.metaTitle, description: copy.metaDescription, noindex: true });
}

export default function BookView({ locale }: { locale: Locale }) {
  const copy = getPages(locale).book;
  const alternate = otherLocale(locale);
  const home = pathFor("home", locale);

  return (
    <div className="min-h-screen bg-lotus">
      <div className="bg-bamboo-dark">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={home} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gold/40">
              <Image src={BUSINESS.logo} alt="Thai Kech" fill className="object-cover" sizes="40px" />
            </div>
            <span className="font-serif text-lg text-gold tracking-wider">THAI KECH</span>
          </Link>
          <div className="flex items-center gap-5">
            <a
              href={pathFor("book", alternate)}
              hrefLang={alternate}
              lang={alternate}
              title={UI[alternate].language.label}
              className="text-xs font-semibold tracking-[0.2em] text-white/70 hover:text-gold border border-white/20 rounded-full px-2.5 py-1"
            >
              {UI[alternate].language.code}
            </a>
            <Link href={home} className="text-white/50 hover:text-white text-sm transition-colors">
              ✕ {copy.close}
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-xl mx-auto px-4 py-10 sm:py-14">
        <h1 className="font-serif text-3xl sm:text-4xl text-bamboo mb-3">{copy.h1}</h1>
        <p className="text-charcoal-light mb-8 leading-relaxed">{copy.lead}</p>

        <WhatsAppBookingForm
          whatsappNumber={BUSINESS.phoneDigits}
          locale={locale}
          source={pathFor("book", locale)}
          services={getServices(locale).map(({ id, name, price }) => ({ id, name, price }))}
          tone="light"
        />

        <ul className="mt-8 space-y-2 text-sm text-charcoal-light">
          {copy.checklist.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-gold flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href={`${home === "/" ? "" : home}/#services`}
            className="text-sm text-bamboo underline underline-offset-4 hover:text-gold transition-colors duration-300"
          >
            {copy.seeServices}
          </Link>
        </p>
      </main>
    </div>
  );
}
