import { BeautyPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("beauty", "en");

export default function Page() {
  return <BeautyPage locale="en" />;
}
