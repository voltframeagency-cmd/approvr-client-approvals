import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "We went from 47 email threads per project to zero. Clients just open the portal, review, and approve. It's changed how we operate.",
    author: 'Jessica Hart',
    role: 'Creative Director',
    company: 'Wildframe Studio',
    initials: 'JH',
    color: 'bg-primary/10 text-primary ring-primary/10',
  },
  {
    quote: "The approval audit trail alone saved us from two scope disputes last quarter. Every decision is timestamped and attributed.",
    author: 'Marcus Cole',
    role: 'Agency Partner',
    company: 'Cole & Partners',
    initials: 'MC',
    color: 'bg-info/10 text-info ring-info/10',
  },
  {
    quote: "Our clients love it. They told us it feels more professional than any other tool we've used. The branded portal is a game-changer.",
    author: 'Priya Sharma',
    role: 'Founder',
    company: 'Luma Design Co',
    initials: 'PS',
    color: 'bg-success/10 text-success ring-success/10',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-32 surface-sunken relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] blur-3xl rounded-full" style={{ background: 'radial-gradient(circle, hsl(160, 84%, 39%), transparent 60%)' }} />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p data-gsap="fade-up" className="text-[12px] font-semibold text-primary uppercase tracking-[0.15em] mb-3">What they say</p>
          <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold">Loved by agencies worldwide</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Quote */}
          <div className="relative min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <Quote className="h-8 w-8 text-primary/20 mx-auto mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-balance">
                  "{testimonials[active].quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-[12px] font-semibold ring-1 ${testimonials[active].color}`}>
                    {testimonials[active].initials}
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-semibold">{testimonials[active].author}</p>
                    <p className="text-[12px] text-muted-foreground">{testimonials[active].role}, {testimonials[active].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${active === i ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-muted-foreground/20 hover:bg-muted-foreground/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
