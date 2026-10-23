import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { getServices } from "@/content/services";
import { pathFor } from "@/content/routes";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { ArrowIcon } from "@/components/icons";

/** Every treatment in the HTML, each card linking to its own page. */
export default function ServicesSection({ locale }: { locale: Locale }) {
  const copy = getPages(locale).home.services;
  const services = getServices(locale);
  const groups = [
    { title: copy.massages, items: services.filter((s) => s.category === "massage") },
    {
      title: copy.hammams,
      items: services.filter((s) => s.category === "hammam"),
      link: { href: pathFor("hammam", locale), label: copy.hammamLink },
    },
    { title: copy.beauty, items: services.filter((s) => s.category === "beauty") },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-lotus scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} intro={copy.intro} />

        {groups.map((group) => (
          <div key={group.title} className="max-w-5xl mx-auto mb-14 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
              <h3 className="font-serif text-2xl text-bamboo">{group.title}</h3>
              {group.link && (
                <Link
                  href={group.link.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold-dark hover:text-bamboo transition-colors"
                >
                  {group.link.label}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {group.items.map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} headingTag="h4" />
              ))}
            </div>
          </div>
        ))}

        <p className="text-center mt-4">
          <Link
            href={pathFor("prices", locale)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-bamboo/30 text-bamboo font-medium hover:bg-bamboo hover:text-gold transition-colors duration-300"
          >
            {copy.allPrices}
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
