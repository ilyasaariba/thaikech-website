import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import SectionHeading from "@/components/SectionHeading";

const STEP_ICONS = [
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
];

export default function ConceptSection({ locale }: { locale: Locale }) {
  const copy = getPages(locale).home.concept;

  return (
    <section id="concept" className="py-20 sm:py-28 bg-bamboo relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(197,160,89,0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} tone="dark" />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className="text-center p-8 rounded-2xl border border-gold/10 bg-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-500"
            >
              <span className="inline-block text-gold/30 font-serif text-5xl font-bold mb-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex justify-center mb-4 text-gold">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={STEP_ICONS[index]} />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-white mb-3">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
