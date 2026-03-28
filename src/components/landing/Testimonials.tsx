import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { EASING, DURATION } from '@/components/motion/Animations';

const testimonials = [
  {
    quote: "We were drowning in email threads — 40, 50 per project. Now clients open the portal, approve in minutes. I got three hours of my Monday back.",
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
    <section id="testimonials" className="py-16 md:py-32 relative overflow-hidden bg-muted/20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.large, ease: EASING.enter as unknown as number[] }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-20"
        >
          <div className="flex items-center justify-center gap-1 mb-4 md:mb-6" style={{ filter: 'drop-shadow(0 4px 12px hsl(0 0% 0% / 0.15))' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold mb-4 md:mb-6 tracking-tighter leading-[1.1]" style={{ textShadow: '0 4px 12px hsl(0 0% 0% / 0.15)' }}>
            Don't take our <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">word for it.</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto relative px-2 md:px-12">
          <div className="relative overflow-hidden rounded-2xl md:rounded-[3rem] border border-primary/10 bg-card/40 backdrop-blur-2xl p-6 md:p-16 shadow-2xl">
            <Quote className="absolute top-4 left-4 md:top-8 md:left-8 h-8 w-8 md:h-12 md:w-12 text-primary/10 dark:drop-shadow-[0_4px_12px_hsl(169_76%_48%/0.15)]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: DURATION.structural, ease: EASING.standard as unknown as number[] }}
                className="relative"
              >
                <blockquote className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 md:mb-12 text-foreground/90 tracking-tight italic">
                  "{testimonials[active].quote}"
                </blockquote>
                
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="h-11 w-11 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-base md:text-xl border border-primary/20">
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold">{testimonials[active].author}</p>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{testimonials[active].role} at {testimonials[active].company}</p>
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
                transition={{ duration: isAutoPlaying ? 6 : 0, ease: EASING.standard as unknown as number[] }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          {/* Navigation Controls — below card on mobile, overlaid on md+ */}
          <div className="flex justify-center gap-3 mt-4 md:hidden">
            <button 
              onClick={prev}
              className="h-11 w-11 rounded-full bg-card border border-primary/10 flex items-center justify-center text-primary active:bg-primary active:text-primary-foreground transition-colors duration-150 shadow-lg dark:shadow-[0_8px_24px_-4px_hsl(169_76%_48%/0.15)]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={next}
              className="h-11 w-11 rounded-full bg-card border border-primary/10 flex items-center justify-center text-primary active:bg-primary active:text-primary-foreground transition-colors duration-150 shadow-lg dark:shadow-[0_8px_24px_-4px_hsl(169_76%_48%/0.15)]"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          {/* Desktop nav buttons */}
          <button 
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-card border border-primary/10 items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-150 shadow-xl dark:shadow-[0_12px_32px_-6px_hsl(169_76%_48%/0.2)] dark:hover:shadow-[0_16px_48px_-8px_hsl(169_76%_48%/0.3)] z-20"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-card border border-primary/10 items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-150 shadow-xl dark:shadow-[0_12px_32px_-6px_hsl(169_76%_48%/0.2)] dark:hover:shadow-[0_16px_48px_-8px_hsl(169_76%_48%/0.3)] z-20"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
