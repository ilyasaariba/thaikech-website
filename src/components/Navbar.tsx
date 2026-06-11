"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Nos Soins" },
    { href: "#concept", label: "Concept" },
    { href: "#avis", label: "Avis" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bamboo/95 backdrop-blur-xl shadow-2xl shadow-bamboo-dark/30"
            : "bg-gradient-to-b from-bamboo-dark/60 to-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-gold/40 group-hover:border-gold shadow-lg shadow-gold/10 transition-all duration-300">
                <Image
                  src="/assets/logo.png"
                  alt="Thai Kech Logo"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-[1.7rem] tracking-[0.15em] text-gold leading-tight">
                  THAI KECH
                </span>
                <span className={`text-[0.6rem] tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
                  scrolled ? "text-lotus/50" : "text-white/40"
                }`}>
                  Spa Mobile de Luxe
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links — centered */}
            <div className="hidden md:flex items-center gap-10 -ml-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-[0.12em] uppercase transition-colors duration-300 hover:text-gold ${
                    scrolled ? "text-lotus/80" : "text-white/80"
                  } after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block flex-shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-3 bg-gold/10 border border-gold/60 text-gold font-semibold text-sm tracking-[0.12em] uppercase rounded-full hover:bg-gold hover:text-bamboo-dark transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Réserver
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Menu de navigation"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? "rotate-45 translate-y-[7px] bg-gold"
                      : scrolled
                      ? "bg-lotus"
                      : "bg-white"
                  }`}
                />
                <span
                  className={`block w-4 h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? "opacity-0 translate-x-2"
                      : scrolled
                      ? "bg-lotus"
                      : "bg-white"
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? "-rotate-45 -translate-y-[7px] bg-gold"
                      : scrolled
                      ? "bg-lotus"
                      : "bg-white"
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-bamboo-dark/98 backdrop-blur-2xl px-6 py-8 space-y-5 border-t border-gold/15">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lotus/80 hover:text-gold text-lg font-medium tracking-wide transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-bamboo-dark font-bold tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Réserver Maintenant
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
