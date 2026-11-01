import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Barbers from "@/components/sections/Barbers";
import Gallery from "@/components/sections/Gallery";
import Booking from "@/components/sections/Booking";
import Reviews from "@/components/sections/Reviews";
import About from "@/components/sections/About";
import Visit from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Barbers />
        <Gallery />
        <Booking />
        <Reviews />
        <About />
        <Visit />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
