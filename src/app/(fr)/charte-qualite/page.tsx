import { CharterPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("charter", "fr");

export default function Page() {
  return <CharterPage locale="fr" />;
}
