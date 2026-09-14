import GuidesIndexView, { guidesIndexMetadata } from "@/views/GuidesIndexView";

export const metadata = guidesIndexMetadata("fr");

export default function Page() {
  return <GuidesIndexView locale="fr" />;
}
