import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { pathFor } from "@/content/routes";
import SectionHeading from "@/components/SectionHeading";

// Honest reassurance in place of testimonials: only facts the business states
// elsewhere on the site. Real client reviews can be added once they exist.
const ICONS = [
  "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z",
  "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
];

export default function CommitmentsSection({ locale }: { locale: Locale }) {
  const copy = getPages(locale).home.commitments;

  return (
    <section id="engagements" className="py-20 sm:py-28 bg-lotus-dark/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.items.map((item, index) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-lotus-dark/30">
              <svg className="w-8 h-8 text-gold mb-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[index]} />
              </svg>
              <h3 className="font-serif text-lg text-bamboo mb-3">{item.title}</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10">
          <Link
            href={pathFor("charter", locale)}
            className="text-bamboo font-medium underline decoration-gold underline-offset-4 hover:text-gold-dark transition-colors"
          >
            {copy.charterLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
