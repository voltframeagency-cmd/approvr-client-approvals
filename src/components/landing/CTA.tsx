import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => (
  <section className="py-20 md:py-32">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to streamline your approvals?</h2>
        <p className="text-lg text-muted-foreground mb-8">Join hundreds of agencies who've replaced email threads with Approvr.</p>
        <Link to="/signup">
          <Button size="lg" className="h-12 px-8 text-base gap-2">
            Start your free trial
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default CTA;
