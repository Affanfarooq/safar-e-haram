import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoTrust from "@/components/BentoTrust";
import StickyPackages from "@/components/StickyPackages";
import HotelGallery from "@/components/HotelGallery";
import SacredCities from "@/components/SacredCities";
import JourneyCarousel from "@/components/JourneyCarousel";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-w-0 overflow-x-hidden">
        <Hero />
        <BentoTrust />
        <StickyPackages />
        <HotelGallery />
        <SacredCities />
        <JourneyCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
