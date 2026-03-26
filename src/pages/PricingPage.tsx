import Navbar from '@/components/landing/Navbar';
import Pricing from '@/components/landing/Pricing';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

const PricingPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24">
      <Pricing />
    </div>
    <CTA />
    <Footer />
  </div>
);

export default PricingPage;
