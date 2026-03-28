import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Upload, MessageSquare, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { EASING, DURATION } from '@/components/motion/Animations';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Drop your work in',
    description: 'Upload your designs, videos, or docs. Select the version, add a note, and hit send. No complex setups.',
    detail: 'Asset Centralization',
    color: 'primary',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Client opens the link',
    description: 'Your client gets a secure, branded link. No login required. They leave feedback directly on the work in seconds.',
    detail: 'Zero-Friction Review',
    color: 'primary',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'The "Yes" is locked',
    description: 'They hit approve. Every decision is timestamped and attributed, giving you a bulletproof paper trail.',
    detail: 'Audit-Ready Approval',
    color: 'primary',
  },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef} 
      className="py-32 relative overflow-hidden bg-card/10"
      data-gsap-section
    >
      <div className="container px-4 mx-auto relative" data-gsap="section-reveal">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Three steps. That's it.</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-8 tracking-tighter leading-[1.1]" style={{ textShadow: '0 4px 12px hsl(0 0% 0% / 0.15)' }}>
            Upload. Review. Approved. <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">Done before lunch.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            No project management degree required. Three moves — signed-off deliverable.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 w-px bg-primary -translate-x-1/2 hidden md:block origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                    <div className="w-14 h-14 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary font-black text-xl shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                      {step.number}
                    </div>
                  </div>

                  {/* Image/Visual Area */}
                  <div className="w-full md:w-1/2 group">
                    <div className="aspect-video rounded-[3rem] border border-primary/20 bg-muted/20 backdrop-blur-md overflow-hidden p-6 md:p-10 flex items-center justify-center relative shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.05] via-transparent to-transparent opacity-50" />
                      
                      {/* Premium Mockup Window Frame */}
                      <motion.div 
                        className="w-full max-w-[90%] bg-card/90 backdrop-blur-3xl border border-primary/10 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_hsl(169_76%_48%/0.15)] relative overflow-hidden will-change-transform"
                      >
                        {/* Chrome / Window Header */}
                        <div className="h-10 border-b border-primary/5 px-6 flex items-center justify-between bg-muted/40">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-destructive/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-success/30" />
                          </div>
                          <div className="h-4 w-32 bg-primary/5 rounded-full" />
                          <div className="w-8 h-8 rounded-full bg-primary/5" />
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-8 flex items-center justify-center min-h-[160px] md:min-h-[200px]">
                          <StepVisual step={index} />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-left' : 'md:text-right'} relative`}>
                    <div className={`inline-flex items-center gap-2 mb-4 text-primary font-bold tracking-widest uppercase text-xs ${isEven ? 'justify-start' : 'justify-end md:justify-end flex-row-reverse'}`}>
                      <step.icon className="h-4 w-4" />
                      <span>{step.detail}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
                      {step.description}
                    </p>
                    <div className={`mt-8 flex items-center gap-2 font-black text-primary ${isEven ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`} style={{ textShadow: '0 4px 12px hsl(0 0% 0% / 0.15)' }}>
                      View Demo <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Simplified visuals
const StepVisual = ({ step }: { step: number }) => {
  if (step === 0) return <UploadVisual />;
  if (step === 1) return <ReviewVisual />;
  return <ApproveVisual />;
};

const UploadVisual = () => (
  <div className="flex flex-col items-center gap-4 w-full max-w-xs">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05, duration: DURATION.structural, ease: EASING.enter as unknown as number[] }}
        className="w-full bg-card/60 backdrop-blur-md border rounded-xl p-4 flex items-center gap-4 shadow-md shadow-black/5 dark:shadow-black/20"
      >
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center relative overflow-hidden">
          <span className="font-black text-[10px] bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">SVG</span>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-lg pointer-events-none" />
        </div>
        <div className="flex-1">
          <div className="h-1.5 w-24 bg-primary/20 rounded-full mb-2" />
          <motion.div 
            className="h-1 bg-primary rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: DURATION.large, delay: 0.3 + i * 0.05, ease: EASING.standard as unknown as number[] }}
          />
        </div>
      </motion.div>
    ))}
  </div>
);

const ReviewVisual = () => (
  <div className="space-y-4 w-full max-w-xs">
    {[
      { side: 'left', text: 'Looks great, one tiny change...' },
      { side: 'right', text: 'Already updated! Check v3.' },
    ].map((m, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9, x: m.side === 'left' ? -20 : 20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: i * 0.05, duration: DURATION.structural, ease: EASING.enter as unknown as number[] }}
        className={`flex ${m.side === 'left' ? 'justify-start' : 'justify-end'}`}
      >
        <div className={`relative p-4 rounded-2xl text-[11px] font-medium max-w-[80%] overflow-hidden ${
          m.side === 'left' 
            ? 'bg-gradient-to-br from-muted via-muted to-accent/30 text-foreground' 
            : 'bg-gradient-to-br from-primary via-primary to-primary/70 text-primary-foreground'
        } shadow-xl shadow-black/10 dark:shadow-black/30`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
          {m.text}
        </div>
      </motion.div>
    ))}
  </div>
);

const ApproveVisual = () => (
  <div className="relative flex items-center justify-center">
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: 'spring', damping: 10 }}
      className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 via-primary/10 to-accent/20 flex items-center justify-center ring-2 ring-primary/20 relative overflow-hidden shadow-xl shadow-primary/10 dark:shadow-primary/20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />
      <CheckCircle2 className="h-12 w-12 text-primary" />
    </motion.div>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
        initial={{ opacity: 0, x: 0, y: 0 }}
        whileInView={{
          opacity: [0, 1, 0],
          x: Math.cos((i / 8) * Math.PI * 2) * 80,
          y: Math.sin((i / 8) * Math.PI * 2) * 80,
          scale: [0, 1, 0]
        }}
        transition={{ duration: DURATION.large, delay: 0.4, ease: EASING.standard as unknown as number[] }}
      />
    ))}
  </div>
);

export default HowItWorks;
