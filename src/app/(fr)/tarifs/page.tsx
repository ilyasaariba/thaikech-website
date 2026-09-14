import { PricesPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("prices", "fr");

export default function Page() {
  return <PricesPage locale="fr" />;
}
