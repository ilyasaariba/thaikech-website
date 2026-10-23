"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavMenuProps {
  homeHref: string;
  /** "#reserver" on pages that carry the booking form. */
  bookHref: string;
  /** Transparent over the homepage hero until the visitor scrolls. */
  overlay: boolean;
  logo: string;
  labels: {
    tagline: string;
    treatments: string;
    massages: string;
    hammams: string;
    beauty: string;
    book: string;
    bookNow: string;
    menu: string;
  };
  massages: NavLink[];
  hammams: NavLink[];
  beauty: NavLink[];
  extras: NavLink[];
  links: NavLink[];
  alternate: { href: string; code: string; label: string; lang: string };
}

const CalendarIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

export default function NavMenu({
  homeHref,
  bookHref,
  overlay,
  logo,
  labels,
  massages,
  hammams,
  beauty,
  extras,
  links,
  alternate,
}: NavMenuProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const handleScroll = () => setScrolled(window.scrollY > 60);
    // Also evaluate once after mount: on reload or back-navigation the browser
    // restores the scroll position without firing a scroll event.
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [overlay]);

  const solid = !overlay || scrolled || mobileMenuOpen;
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-bamboo/95 backdrop-blur-xl shadow-2xl shadow-bamboo-dark/30"
          : "bg-gradient-to-b from-bamboo-dark/60 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
          <Link href={homeHref} className="flex items-center gap-3 sm:gap-4 group flex-shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 border-gold/40 group-hover:border-gold shadow-lg shadow-gold/10 transition-all duration-300">
              <Image src={logo} alt="Thai Kech" fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-gold leading-tight">THAI KECH</span>
              <span className="text-[0.6rem] tracking-[0.25em] uppercase font-medium text-white/50">{labels.tagline}</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button
                type="button"
                aria-haspopup="true"
                className="flex items-center gap-1.5 text-sm font-medium tracking-[0.12em] uppercase text-white/85 hover:text-gold transition-colors duration-300"
              >
                {labels.treatments}
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-5">
                <div className="w-[34rem] grid grid-cols-2 gap-8 rounded-2xl border border-gold/20 bg-bamboo-dark p-6 shadow-2xl">
                  <div>
                    <p className="text-gold text-[0.7rem] tracking-[0.25em] uppercase mb-3">{labels.massages}</p>
                    <ul className="space-y-2.5">
                      {massages.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-sm text-white/80 hover:text-gold transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gold text-[0.7rem] tracking-[0.25em] uppercase mt-6 mb-3">{labels.beauty}</p>
                    <ul className="space-y-2.5">
                      {beauty.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-sm text-white/80 hover:text-gold transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gold text-[0.7rem] tracking-[0.25em] uppercase mb-3">{labels.hammams}</p>
                    <ul className="space-y-2.5">
                      {hammams.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-sm text-white/80 hover:text-gold transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 pt-5 border-t border-white/10 space-y-2.5">
                      {extras.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-sm text-white/80 hover:text-gold transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-[0.12em] uppercase text-white/85 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <a
              href={alternate.href}
              hrefLang={alternate.lang}
              lang={alternate.lang}
              title={alternate.label}
              className="text-xs font-semibold tracking-[0.2em] text-white/70 hover:text-gold border border-white/20 hover:border-gold rounded-full px-3 py-1.5 transition-colors duration-300"
            >
              {alternate.code}
            </a>
            <a
              href={bookHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/60 text-gold font-semibold text-sm tracking-[0.12em] uppercase rounded-full hover:bg-gold hover:text-bamboo-dark transition-all duration-300"
            >
              <CalendarIcon className="w-4 h-4" />
              {labels.book}
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={alternate.href}
              hrefLang={alternate.lang}
              lang={alternate.lang}
              title={alternate.label}
              className="text-xs font-semibold tracking-[0.2em] text-white/80 border border-white/25 rounded-full px-2.5 py-1"
            >
              {alternate.code}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="relative w-10 h-10 flex items-center justify-center"
              aria-label={labels.menu}
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px] bg-gold" : "bg-white"
                  }`}
                />
                <span
                  className={`block w-4 h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 translate-x-2" : "bg-white"
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px] bg-gold" : "bg-white"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu: links stay in the HTML even while collapsed */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[85vh] overflow-y-auto bg-bamboo-dark px-6 py-6 border-t border-gold/15">
          <p className="text-gold text-[0.7rem] tracking-[0.25em] uppercase mb-3">{labels.massages}</p>
          <ul className="space-y-3 mb-6">
            {massages.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu} className="text-white/85 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-gold text-[0.7rem] tracking-[0.25em] uppercase mb-3">{labels.hammams}</p>
          <ul className="space-y-3 mb-6">
            {hammams.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu} className="text-white/85 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-gold text-[0.7rem] tracking-[0.25em] uppercase mb-3">{labels.beauty}</p>
          <ul className="space-y-3 mb-6">
            {beauty.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu} className="text-white/85 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 pt-5 border-t border-white/10">
            {[...extras, ...links].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu} className="text-white/85 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={bookHref}
            onClick={closeMenu}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-bamboo-dark font-bold tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors duration-300"
          >
            <CalendarIcon className="w-5 h-5" />
            {labels.bookNow}
          </a>
        </div>
      </div>
    </header>
  );
}
