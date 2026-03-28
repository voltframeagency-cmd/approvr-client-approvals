import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: "We were drowning in email threads — 40, 50 per project. Now clients open the portal and approve in minutes. I got three hours of my Monday back.",
    author: 'Jessica Hart',
    role: 'Creative Director',
    company: 'Wildframe Studio',
    initials: 'JH',
  },
  {
    quote: "Two scope disputes last quarter almost cost us a client. Both times, we pulled up the audit trail. Timestamped. Case closed.",
    author: 'Marcus Cole',
    role: 'Agency Partner',
    company: 'Cole & Partners',
    initials: 'MC',
  },
  {
    quote: "Our clients actually said it looks like we built it. That's the point — it's our brand, not some third-party tool.",
    author: 'Priya Sharma',
    role: 'Founder',
    company: 'Luma Design Co',
    initials: 'PS',
  },
];

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-muted/20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="flex items-center justify-center gap-1 mb-6" style={{ filter: 'drop-shadow(0 4px 12px hsl(0 0% 0% / 0.15))' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 tracking-tighter leading-[1.1]" style={{ textShadow: '0 4px 12px hsl(0 0% 0% / 0.15)' }}>
            The new standard for <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">client relations.</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto relative px-12">
          <div className="relative overflow-hidden rounded-[3rem] border border-primary/10 bg-card/40 backdrop-blur-2xl p-8 md:p-16 shadow-2xl">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/10" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-12 text-foreground/90 tracking-tight italic">
                  "{testimonials[active].quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl border border-primary/20">
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{testimonials[active].author}</p>
                    <p className="text-sm text-muted-foreground font-medium">{testimonials[active].role} at {testimonials[active].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
              <motion.div
                key={active + (isAutoPlaying ? '-playing' : '-stopped')}
                initial={{ width: "0%" }}
                animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                transition={{ duration: isAutoPlaying ? 6 : 0, ease: "linear" }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-card border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-xl z-20"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-card border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-xl z-20"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
