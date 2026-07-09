import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-riad.png"
          alt="Massage de luxe dans un riad à Marrakech"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAUBAwT/xAAdEAACAwADAQEAAAAAAAAAAAABAgADEQQFIRIU/8QAGAEAAgMAAAAAAAAAAAAAAAAAAQIAAwT/xAAaEQEBAAMBAQAAAAAAAAAAAAABAAIRMRNB/9oADAMBAAIRAxEAPwDOFd+epqmbclGvntZx8rfCJCFlTnQTrQxNQxCcmZH5XbDtXb7ZtZ/Ykc9gw89iOYMnoXXr6EasEjTN56BK9XwxEJHLl4gxweCIiSGi/9k="
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-bamboo-dark/70 via-bamboo/50 to-bamboo-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-12">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block w-12 h-px bg-gold/60" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            Spa Mobile de Luxe · Marrakech
          </span>
          <span className="block w-12 h-px bg-gold/60" />
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          Massage Thaï de Luxe{" "}
          <span className="text-gold">à Domicile</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Réservez un massage professionnel directement dans votre{" "}
          <span className="text-white font-medium">riad, villa ou hôtel</span>{" "}
          à Marrakech. Thérapeutes certifiés, huiles d&apos;argan bio et
          ambiance spa complète — disponible{" "}
          <span className="text-gold font-medium">24h/7</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-bamboo-dark font-semibold text-base tracking-wider uppercase rounded-full animate-gold-pulse hover:bg-gold-light transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Réserver un Massage
          </Link>
          <a
            href="#services"
            className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-medium text-base tracking-wider uppercase rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            Voir les Soins
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/50 text-xs tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Thérapeutes Certifiés</span>
          </div>
          <span className="hidden sm:inline text-gold/30">·</span>
          <span>Riads · Villas · Hôtels</span>
          <span className="hidden sm:inline text-gold/30">·</span>
          <span>Marrakech & Environs</span>
        </div>

        {/* Scroll indicator - mobile in-flow */}
        <div className="mt-8 flex md:hidden justify-center">
          <a href="#services" className="flex flex-col items-center gap-1.5 text-white/40 hover:text-gold transition-colors duration-300">
            <span className="text-[10px] tracking-widest uppercase">Découvrir</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator - desktop absolute positioned */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#services" className="flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
