import { PrivacyPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("privacy", "en");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
