import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import { BUSINESS } from "@/content/business";
import { getPages } from "@/content/pages";
import { pathFor } from "@/content/routes";
import RichText from "@/components/RichText";
import WhatsAppBookingForm from "@/components/booking/WhatsAppBookingForm";
import { CheckIcon } from "@/components/icons";

const HERO_ALT: Record<Locale, string> = {
  fr: "Patio d'un riad de Marrakech avec palmiers, zellige et porte en bois peint",
  en: "Courtyard of a Marrakech riad with palm trees, zellige tiles and a painted wooden door",
};

export default function Hero({ locale }: { locale: Locale }) {
  const hero = getPages(locale).home.hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={BUSINESS.heroImage}
          alt={HERO_ALT[locale]}
          fill
          preload
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAUBAwT/xAAdEAACAwADAQEAAAAAAAAAAAABAgADEQQFIRIU/8QAGAEAAgMAAAAAAAAAAAAAAAAAAQIAAwT/xAAaEQEBAAMBAQAAAAAAAAAAAAABAAIRMRNB/9oADAMBAAIRAxEAPwDOFd+epqmbclGvntZx8rfCJCFlTnQTrQxNQxCcmZH5XbDtXb7ZtZ/Ykc9gw89iOYMnoXXr6EasEjTN56BK9XwxEJHLl4gxweCIiSGi/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bamboo-dark/70 via-bamboo/50 to-bamboo-dark/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 pb-12 sm:pt-32">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block w-12 h-px bg-gold/60" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">{hero.eyebrow}</span>
          <span className="block w-12 h-px bg-gold/60" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
          {hero.h1Start} <span className="text-gold">{hero.h1Accent}</span> {hero.h1End}
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed [&_strong]:font-medium [&_strong]:text-white">
          <RichText text={hero.subtitle} locale={locale} />
        </p>

        <div className="max-w-md mx-auto">
          <WhatsAppBookingForm
            whatsappNumber={BUSINESS.phoneDigits}
            locale={locale}
            source={pathFor("home", locale)}
            tone="dark"
          />
          <a
            href="#services"
            className="inline-block mt-4 text-sm text-white/70 hover:text-gold underline underline-offset-4 transition-colors duration-300"
          >
            {hero.seeServices}
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/60 text-xs tracking-wider uppercase">
          {hero.badges.map((badge) => (
            <li key={badge} className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-gold" />
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <a
            href="#services"
            className="flex flex-col items-center gap-1.5 text-white/40 hover:text-gold transition-colors duration-300"
          >
            <span className="text-[10px] tracking-widest uppercase">{hero.discover}</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
