import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { pathFor } from "@/content/routes";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon } from "@/components/icons";

export default function OccasionsSection({ locale }: { locale: Locale }) {
  const copy = getPages(locale).home.occasions;

  return (
    <section className="py-20 sm:py-24 bg-lotus-dark/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.items.map((item) => (
            <Link
              key={item.key}
              href={pathFor(item.key, locale)}
              className="group flex flex-col rounded-2xl bg-white p-7 border border-lotus-dark/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <h3 className="font-serif text-xl text-bamboo mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-5">{item.text}</p>
              <ArrowIcon className="mt-auto w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
