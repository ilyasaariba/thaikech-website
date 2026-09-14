import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { UI } from "@/i18n/ui";
import { formatDuration, type Service } from "@/content/services";
import { pathFor } from "@/content/routes";

export default function ServiceCard({
  service,
  locale,
  headingTag: Heading = "h3",
}: {
  service: Service;
  locale: Locale;
  headingTag?: "h3" | "h4";
}) {
  return (
    <Link
      href={pathFor(`service:${service.id}`, locale)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-lotus-dark/50"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="bg-bamboo-dark/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium tracking-wide shadow-md">
            {formatDuration(service.minutes, locale)}
          </span>
          <span className="bg-bamboo/90 backdrop-blur-sm text-gold px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {service.price} MAD
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-serif text-lg text-bamboo mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
          {service.name}
        </Heading>
        <p className="text-charcoal-light text-sm leading-relaxed mb-4 line-clamp-3">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-gold-dark font-medium text-sm tracking-wide group-hover:gap-3 transition-all duration-300">
          {UI[locale].common.discover}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
