import { AreasPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("areas", "fr");

export default function Page() {
  return <AreasPage locale="fr" />;
}
