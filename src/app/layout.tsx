import type { Metadata } from "next";
import { cinzel, outfit } from "./fonts";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thaikech.com"),
  alternates: {
    canonical: "/",
  },
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
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '28233906552916903'); fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=28233906552916903&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
