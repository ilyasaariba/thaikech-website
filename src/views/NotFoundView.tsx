import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getPages } from "@/content/pages";
import { pathFor } from "@/content/routes";

export default function NotFoundView({ locale }: { locale: Locale }) {
  const copy = getPages(locale).notFound;

  return (
    <main className="min-h-screen bg-gradient-to-b from-bamboo to-bamboo-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">{copy.eyebrow}</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-white mb-4">{copy.h1}</h1>
        <p className="text-white/70 mb-8 leading-relaxed">{copy.text}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={pathFor("book", locale)}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-gold text-bamboo-dark font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
          >
            {copy.book}
          </Link>
          <Link
            href={pathFor("home", locale)}
            className="inline-flex items-center justify-center px-6 py-3.5 border border-white/30 text-white font-medium rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
