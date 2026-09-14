import { PricesPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("prices", "en");

export default function Page() {
  return <PricesPage locale="en" />;
}
