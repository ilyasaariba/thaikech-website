import { PrivacyPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("privacy", "fr");

export default function Page() {
  return <PrivacyPage locale="fr" />;
}
