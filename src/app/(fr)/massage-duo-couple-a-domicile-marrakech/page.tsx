import { DuoPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("duo", "fr");

export default function Page() {
  return <DuoPage locale="fr" />;
}
