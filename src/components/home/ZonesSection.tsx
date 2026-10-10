import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { getZones } from "@/content/zones";
import { pathFor } from "@/content/routes";
import SectionHeading from "@/components/SectionHeading";

export default function ZonesSection({ locale }: { locale: Locale }) {
  const copy = getPages(locale).home.zones;

  return (
    <section id="zones" className="py-20 sm:py-28 bg-bamboo-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} tone="dark" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {getZones(locale).map((zone) => (
            <Link
              key={zone.id}
              href={pathFor(`zone:${zone.id}`, locale)}
              className="group rounded-2xl border border-gold/15 bg-white/5 p-6 hover:bg-white/10 hover:border-gold/40 transition-all duration-300"
            >
              <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{zone.name}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{zone.teaser}</p>
            </Link>
          ))}
        </div>
        <p className="text-center mt-10">
          <Link
            href={pathFor("areas", locale)}
            className="text-gold font-medium underline underline-offset-4 hover:text-gold-light transition-colors"
          >
            {copy.allAreas}
          </Link>
        </p>
      </div>
    </section>
  );
}
