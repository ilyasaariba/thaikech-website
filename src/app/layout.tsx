import type { Metadata } from "next";
import { cinzel, outfit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Thai Kech — Spa Mobile de Luxe à Marrakech",
    default: "Thai Kech — Massage Thaï de Luxe à Domicile à Marrakech",
  },
  description:
    "Réservez un massage thaïlandais de luxe directement dans votre riad ou villa à Marrakech. Thérapeutes certifiés, huiles bio et ambiance spa complète. Disponible 24h/7.",
  keywords: [
    "massage a domicile marrakech",
    "massage riad marrakech",
    "spa mobile marrakech",
    "massage couple marrakech",
    "massage thai marrakech",
  ],
  openGraph: {
    title: "Thai Kech — Massage Thaï de Luxe à Domicile à Marrakech",
    description:
      "Réservez un massage thaïlandais de luxe directement dans votre riad ou villa à Marrakech. Disponible 24h/7.",
    locale: "fr_FR",
    type: "website",
    siteName: "Thai Kech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
