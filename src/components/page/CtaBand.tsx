import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";

/** Closing call to action; scrolls back to the page's booking form. */
export default function CtaBand({ locale }: { locale: Locale }) {
  const ui = UI[locale];

  return (
    <section className="bg-bamboo px-4 py-16 sm:py-20 text-center">
      <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">{ui.common.ctaHeading}</h2>
      <p className="text-white/70 max-w-xl mx-auto mb-8">{ui.common.ctaText}</p>
      <a
        href="#reserver"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bamboo-dark font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
      >
        {ui.common.ctaButton}
      </a>
    </section>
  );
}
