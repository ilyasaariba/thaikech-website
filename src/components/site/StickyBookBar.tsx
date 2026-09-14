"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";

/** Mobile-only booking button that appears once the visitor scrolls past the first screen. */
export default function StickyBookBar({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
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
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-bamboo-dark/95 backdrop-blur-xl border-t border-gold/20 px-4 py-3">
        <a
          href={href}
          tabIndex={visible ? 0 : -1}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-bamboo-dark font-semibold text-sm tracking-wider uppercase rounded-full animate-gold-pulse"
        >
          <WhatsAppIcon className="w-5 h-5" />
          {label}
        </a>
      </div>
    </div>
  );
}
