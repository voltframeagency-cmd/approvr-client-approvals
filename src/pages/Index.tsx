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
      <div data-section="hero">
        <Hero />
      </div>
      <div data-section="social-proof">
        <SocialProof />
      </div>
      <div data-section="how-it-works">
        <HowItWorks />
      </div>
      <div data-section="features">
        <Features />
      </div>
      <div data-section="testimonials">
        <Testimonials />
      </div>
      <div data-section="pricing">
        <Pricing />
      </div>
      <div data-section="cta">
        <CTA />
      </div>
      <div data-section="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
