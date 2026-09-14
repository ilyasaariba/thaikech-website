import { HammamPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("hammam", "fr");

export default function Page() {
  return <HammamPage locale="fr" />;
}
