import BookView, { bookMetadata } from "@/views/BookView";

export const metadata = bookMetadata("en");

export default function Page() {
  return <BookView locale="en" />;
}
