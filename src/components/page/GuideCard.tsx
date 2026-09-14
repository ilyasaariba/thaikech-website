import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { Guide } from "@/content/guides";
import { pathFor } from "@/content/routes";
import { ArrowIcon } from "@/components/icons";

export default function GuideCard({
  guide,
  locale,
  readMore,
  headingTag: Heading = "h3",
}: {
  guide: Guide;
  locale: Locale;
  readMore: string;
  headingTag?: "h2" | "h3";
}) {
  return (
    <Link
      href={pathFor(`guide:${guide.id}`, locale)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-lotus-dark/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-serif text-lg text-bamboo leading-snug mb-2 group-hover:text-gold transition-colors duration-300">
          {guide.title}
        </Heading>
        <p className="text-sm text-charcoal-light leading-relaxed mb-4 line-clamp-3">{guide.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-gold-dark group-hover:gap-3 transition-all duration-300">
          {readMore}
          <ArrowIcon className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
