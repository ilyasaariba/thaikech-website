import { CharterPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("charter", "en");

export default function Page() {
  return <CharterPage locale="en" />;
}
