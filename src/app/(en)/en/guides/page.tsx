import GuidesIndexView, { guidesIndexMetadata } from "@/views/GuidesIndexView";

export const metadata = guidesIndexMetadata("en");

export default function Page() {
  return <GuidesIndexView locale="en" />;
}
