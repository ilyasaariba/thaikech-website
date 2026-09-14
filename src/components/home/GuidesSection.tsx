import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { getGuides } from "@/content/guides";
import { pathFor } from "@/content/routes";
import SectionHeading from "@/components/SectionHeading";
import GuideCard from "@/components/page/GuideCard";

export default function GuidesSection({ locale }: { locale: Locale }) {
  const pages = getPages(locale);
  const copy = pages.home.guides;

  return (
    <section className="py-20 sm:py-28 bg-lotus">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getGuides(locale)
            .slice(0, 3)
            .map((guide) => (
              <GuideCard key={guide.id} guide={guide} locale={locale} readMore={pages.guidesIndex.readMore} />
            ))}
        </div>
        <p className="text-center mt-10">
          <Link
            href={pathFor("guides", locale)}
            className="text-bamboo font-medium underline decoration-gold underline-offset-4 hover:text-gold-dark transition-colors"
          >
            {copy.all}
          </Link>
        </p>
      </div>
    </section>
  );
}
