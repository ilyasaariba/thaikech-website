import { BeautyPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("beauty", "fr");

export default function Page() {
  return <BeautyPage locale="fr" />;
}
