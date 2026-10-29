"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import ContactLink from "./ContactLink";

interface FloatingContactProps {
  locale: string;
  /** wa.me link with a message that names the page the visitor is on. */
  whatsappHref: string;
  labels: {
    /** Short label next to the WhatsApp icon, e.g. "WhatsApp". */
    whatsapp: string;
    /** Hover hint for the round button, e.g. "Une question ? Écrivez-nous". */
    question: string;
    /** Button that scrolls to the booking form. */
    book: string;
  };
}

/**
 * WhatsApp always one tap away on every page.
 * - Desktop: a round WhatsApp button in the bottom-right corner.
 * - Mobile: the same round button over the first screen; once the visitor
 *   scrolls past it, a bottom bar with "WhatsApp" and "Book" side by side.
 */
export default function FloatingContact({ locale, whatsappHref, labels }: FloatingContactProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    // Also evaluate once after mount: on reload or back-navigation the browser
    // restores the scroll position without firing a scroll event.
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Round button: always on desktop, on mobile until the bar takes over */}
      <div
        className={`fixed z-40 right-4 bottom-4 md:right-6 md:bottom-6 transition-all duration-300 ${
          scrolled ? "max-md:translate-y-24 max-md:opacity-0 max-md:pointer-events-none" : ""
        }`}
      >
        <ContactLink
          href={whatsappHref}
          method="whatsapp"
          placement="float"
          locale={locale}
          ariaLabel={labels.question}
          className="group flex items-center gap-3"
        >
          <span className="hidden lg:block opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-lg whitespace-nowrap">
            {labels.question}
          </span>
          <span className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 ring-4 ring-white/70 group-hover:scale-105 transition-transform duration-300">
            <WhatsAppIcon className="h-8 w-8 md:h-9 md:w-9" />
          </span>
        </ContactLink>
      </div>

      {/* Mobile bar, once past the first screen */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
          scrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex gap-3 bg-bamboo-dark/95 backdrop-blur-xl border-t border-gold/20 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <ContactLink
            href={whatsappHref}
            method="whatsapp"
            placement="mobile-bar"
            locale={locale}
            tabIndex={scrolled ? 0 : -1}
            className="flex flex-1 items-center justify-center gap-2 py-3.5 rounded-full bg-green-700 text-white font-semibold text-sm tracking-wide"
          >
            <WhatsAppIcon className="w-5 h-5" />
            {labels.whatsapp}
          </ContactLink>
          <a
            href="#reserver"
            tabIndex={scrolled ? 0 : -1}
            className="flex flex-1 items-center justify-center py-3.5 rounded-full bg-gold text-bamboo-dark font-semibold text-sm tracking-wider uppercase"
          >
            {labels.book}
          </a>
        </div>
      </div>
    </>
  );
}
