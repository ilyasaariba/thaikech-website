import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import Concept from "@/components/Concept";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <Concept />
        <Testimonials />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
