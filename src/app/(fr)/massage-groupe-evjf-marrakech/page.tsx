import { GroupsPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("groups", "fr");

export default function Page() {
  return <GroupsPage locale="fr" />;
}
