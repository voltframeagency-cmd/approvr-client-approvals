import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import SocialProof from '@/components/landing/SocialProof';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { useLenisScroll, useGsapScrollTrigger } from '@/hooks/use-smooth-scroll';

const Index = () => {
  useLenisScroll();
  useGsapScrollTrigger();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div data-transition="crossfade-out">
        <Hero />
      </div>
      <div data-transition="crossfade-in">
        <SocialProof />
      </div>
      <div data-transition="wipe">
        <HowItWorks />
      </div>
      <div data-transition="scale">
        <Features />
      </div>
      <div data-transition="overlap">
        <Testimonials />
      </div>
      <div data-transition="dissolve">
        <Pricing />
      </div>
      <div data-transition="glow">
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
