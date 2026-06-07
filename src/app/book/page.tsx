import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Réserver un Massage",
  description:
    "Réservez votre massage thaïlandais de luxe à domicile à Marrakech. Choisissez votre soin, la date et l'heure — confirmation instantanée.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-lotus flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
