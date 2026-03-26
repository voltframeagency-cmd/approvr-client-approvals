import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => (
  <section className="py-20 md:py-32 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at center, hsl(160, 84%, 39%), transparent 70%)' }} />
    <div className="container relative">
      <div data-gsap="cta" className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to streamline your approvals?</h2>
        <p className="text-lg text-muted-foreground mb-8">Join hundreds of agencies who've replaced email threads with Approvr.</p>
        <Link to="/signup">
          <Button size="lg" className="h-12 px-8 text-base gap-2 glow-primary">
            Start your free trial
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>

    {/* Decorative top divider */}
    <div className="container absolute top-0 left-1/2 -translate-x-1/2">
      <div data-gsap="line" className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  </section>
);

export default CTA;
