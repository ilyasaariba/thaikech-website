import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { cinzel, outfit } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thaikech.com"),
  // Next.js already marks 404 responses noindex.
  title: "Page introuvable · Page not found | Thai Kech",
};

/** 404 for URLs that match no route in either language. */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${cinzel.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-gradient-to-b from-bamboo to-bamboo-dark flex items-center justify-center px-4">
        <main className="max-w-md w-full text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Erreur 404 · Error 404</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white mb-4">Page introuvable</h1>
          <p className="text-white/70 mb-2 leading-relaxed">Cette page n&apos;existe pas ou a été déplacée.</p>
          <p lang="en" className="text-white/50 mb-8 leading-relaxed">
            This page doesn&apos;t exist or has moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-gold text-bamboo-dark font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              Accueil
            </Link>
            <Link
              href="/en"
              hrefLang="en"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-white/30 text-white font-medium rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              Home (English)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
