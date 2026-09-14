import { AreasPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("areas", "en");

export default function Page() {
  return <AreasPage locale="en" />;
}
