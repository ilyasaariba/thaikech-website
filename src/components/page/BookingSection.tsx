import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { BUSINESS } from "@/content/business";
import WhatsAppBookingForm from "@/components/booking/WhatsAppBookingForm";

/** Booking form block for pages without a form in their header (guides). */
export default function BookingSection({ locale, source }: { locale: Locale; source: string }) {
  const ui = UI[locale];

  return (
    <section className="bg-lotus-dark/50 px-4 py-16 sm:py-20">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl text-bamboo text-center mb-3">{ui.common.ctaHeading}</h2>
        <p className="text-center text-charcoal-light mb-8">{ui.common.bookingText}</p>
        <WhatsAppBookingForm whatsappNumber={BUSINESS.phoneDigits} locale={locale} source={source} tone="light" />
      </div>
    </section>
  );
}
