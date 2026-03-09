import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Heritage from './components/Heritage';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Gallery from './components/Gallery';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Heritage />
      <Services />
      <BeforeAfter />
      <Gallery />
      <BookingSection />
      <Footer />
    </main>
  );
}
