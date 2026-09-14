import BookView, { bookMetadata } from "@/views/BookView";

export const metadata = bookMetadata("fr");

export default function Page() {
  return <BookView locale="fr" />;
}
