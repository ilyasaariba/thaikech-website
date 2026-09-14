import { HammamPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("hammam", "en");

export default function Page() {
  return <HammamPage locale="en" />;
}
