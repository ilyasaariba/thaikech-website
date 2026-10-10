import { GroupsPage, landingMetadata } from "@/views/LandingPages";

export const metadata = landingMetadata("groups", "en");

export default function Page() {
  return <GroupsPage locale="en" />;
}
