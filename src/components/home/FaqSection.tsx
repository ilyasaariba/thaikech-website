import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";

export default function FaqSection({ locale }: { locale: Locale }) {
  const copy = getPages(locale).home.faq;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-lotus-dark/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} />
        <FaqList faqs={copy.items} locale={locale} />
      </div>
    </section>
  );
}
