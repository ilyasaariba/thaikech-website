import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { Guide } from "@/content/guides";
import { pathFor } from "@/content/routes";

/** Compact links to the guides on the same topic as the page, titled by the guide's own title. */
export default function GuideLinks({ guides, locale, heading }: { guides: Guide[]; locale: Locale; heading: string }) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl sm:text-3xl text-bamboo mb-6 leading-snug">{heading}</h2>
      <ul className="space-y-4">
        {guides.map((guide) => (
          <li key={guide.id}>
            <Link
              href={pathFor(`guide:${guide.id}`, locale)}
              className="group flex items-center gap-4 rounded-2xl bg-white border border-lotus-dark/50 p-3 sm:p-4 shadow-sm hover:shadow-lg hover:border-gold/50 transition-all duration-300"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-xl">
                {/* Decorative: the guide title next to it names the link. */}
                <Image src={guide.image} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-bamboo leading-snug group-hover:text-gold-dark transition-colors duration-300">
                  {guide.title}
                </h3>
                <p className="mt-1 text-sm text-charcoal-light leading-relaxed line-clamp-2">{guide.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
