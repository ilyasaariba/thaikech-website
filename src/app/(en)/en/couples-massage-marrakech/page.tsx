import { DuoPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("duo", "en");

export default function Page() {
  return <DuoPage locale="en" />;
}
