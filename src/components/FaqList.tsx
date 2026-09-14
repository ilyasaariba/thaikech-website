import type { Locale } from "@/i18n/locales";
import type { Faq } from "@/content/types";
import RichText from "./RichText";

/** Server-rendered accordion: every answer is in the HTML, no JavaScript needed. */
export default function FaqList({ faqs, locale }: { faqs: Faq[]; locale: Locale }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.q}
          className="group bg-white rounded-2xl border border-lotus-dark/60 shadow-sm open:shadow-md transition-shadow duration-300"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
            <h3 className="font-serif text-base sm:text-lg text-bamboo group-hover:text-gold transition-colors duration-300">
              {faq.q}
            </h3>
            <svg
              className="h-5 w-5 flex-shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="rich border-t border-lotus-dark/30 px-5 sm:px-6 py-5 text-charcoal-light text-sm sm:text-base leading-relaxed">
            <RichText text={faq.a} locale={locale} />
          </div>
        </details>
      ))}
    </div>
  );
}
