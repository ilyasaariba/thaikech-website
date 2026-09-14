import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import { formatDuration } from "@/content/services";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import WhatsAppBookingForm, { type BookingServiceOption } from "@/components/booking/WhatsAppBookingForm";
import { CheckIcon } from "@/components/icons";

interface LandingHeroProps {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow?: string;
  h1: string;
  lead: string[];
  facts: string[];
  priceTag?: { price: number; minutes: number; therapists: 1 | 2 };
  preset?: BookingServiceOption;
  /** Path of the page, recorded with each lead. */
  source: string;
}

/** Top of every inner page: breadcrumb, H1, introduction and the booking form above the fold. */
export default function LandingHero({ locale, crumbs, eyebrow, h1, lead, facts, priceTag, preset, source }: LandingHeroProps) {
  const ui = UI[locale];

  return (
    <section className="relative bg-bamboo-dark text-white pt-28 sm:pt-32 pb-14 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(197,160,89,0.35) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <div>
          <Breadcrumbs items={crumbs} label={ui.common.breadcrumb} />
          {eyebrow && (
            <p className="mt-6 text-gold text-xs tracking-[0.3em] uppercase font-medium">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">{h1}</h1>

          {priceTag && (
            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              <li className="rounded-full bg-gold text-bamboo-dark font-semibold px-4 py-1.5">
                {priceTag.price} MAD
              </li>
              <li className="rounded-full border border-white/25 px-4 py-1.5">
                {formatDuration(priceTag.minutes, locale)}
              </li>
              <li className="rounded-full border border-white/25 px-4 py-1.5">
                {priceTag.therapists === 2 ? ui.common.twoTherapists : ui.common.therapists}
              </li>
            </ul>
          )}

          <div className="rich-dark mt-6 space-y-4 text-white/80 text-base sm:text-lg leading-relaxed">
            {lead.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} locale={locale} />
              </p>
            ))}
          </div>

          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/75">
            {facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-gold flex-shrink-0" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <WhatsAppBookingForm
          whatsappNumber={BUSINESS.phoneDigits}
          locale={locale}
          source={source}
          preset={preset}
          tone="dark"
        />
      </div>
    </section>
  );
}
