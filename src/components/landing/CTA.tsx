import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => (
  <section className="py-20 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at center, hsl(160, 84%, 39%), transparent 70%)' }} />
    <div className="container relative">
      <motion.div
        data-gsap="cta"
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-[12px] font-semibold text-primary uppercase tracking-[0.15em] mb-3">Get started today</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your first approval is five minutes away</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">Create a workspace, upload your first deliverable, and send it for review. No credit card required.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8 text-[15px] gap-2 glow-primary font-medium">
              Start your free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="lg" className="h-12 px-8 text-[15px] font-medium">
              View pricing
            </Button>
          </Link>
        </div>
        <p className="text-[12px] text-muted-foreground mt-5">Free plan available · No credit card required · Setup in 2 minutes</p>
      </motion.div>
    </div>

    <div className="container absolute top-0 left-1/2 -translate-x-1/2">
      <div data-gsap="line" className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  </section>
);

export default CTA;
