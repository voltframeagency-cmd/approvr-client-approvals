import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import {
  UploadDemo,
  FeedbackDemo,
  ApprovalDemo,
  TimelineDemo,
  BrandingDemo,
  AuditDemo,
} from './FeatureInteractiveDemos';
import { EASING, DURATION, STAGGER } from '@/components/motion/Animations';

const features = [
  { 
    id: 1,
    demo: UploadDemo, 
    title: 'Stop digging through Drive', 
    description: 'Designs, docs, and assets organized by session and version. Every file has a home, and it\'s not your inbox.',
    tag: 'Version Control'
  },
  { 
    id: 2,
    demo: FeedbackDemo, 
    title: 'No more "Which version?"', 
    description: 'Clients leave feedback directly on the deliverable. Context is preserved, and ambiguity is eliminated.',
    tag: 'Contextual Feedback'
  },
  { 
    id: 3,
    demo: ApprovalDemo, 
    title: 'One-click client "Yes"', 
    description: 'One button. No login required. Clients open, review, and approve in seconds. That\'s the whole flow.',
    tag: 'Instant Sign-off'
  },
  { 
    id: 4,
    demo: TimelineDemo, 
    title: 'Follow the momentum', 
    description: 'A live feed of client interactions. Know exactly when they opened the link and what they\'re looking at.',
    tag: 'Live Signaling'
  },
  { 
    id: 5,
    demo: BrandingDemo, 
    title: 'Your brand, their portal', 
    description: 'Fully white-labeled. Your logo, your domain, and your fonts. Professionalism that scales with you.',
    tag: 'White-Label'
  },
  { 
    id: 6,
    demo: AuditDemo, 
    title: 'Audit-ready receipts', 
    description: 'Every decision is timestamped and attributed. When projects go sideways, you\'ve got the paper trail.',
    tag: 'Liability Protection'
  },
];

export const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % features.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features" className="py-16 md:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 65%)' }} />

      <div className="container px-4 mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DURATION.large, ease: EASING.enter as unknown as number[] }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>What you actually get</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 md:mb-8 tracking-tighter leading-[1.1]" style={{ textShadow: '0 4px 12px hsl(0 0% 0% / 0.15)' }}>
            Six problems you <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">won't have anymore</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We didn't build another project manager. We built the thing that gets clients to say "yes" — fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-8 lg:gap-20 items-center">
          {/* Left: Interactive feature list */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.large, delay: 0.2, ease: EASING.enter as unknown as number[] }}
            className="flex flex-col gap-1 md:gap-2"
          >
            {features.map((feature, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative p-4 md:p-6 rounded-xl md:rounded-2xl text-left transition-colors duration-150 overflow-hidden ${
                    isActive 
                      ? 'bg-primary/[0.03] border-primary/20 border shadow-[0_10px_30px_-15px_rgba(var(--primary),0.1)]' 
                      : 'hover:bg-muted/50 border-transparent border'
                  }`}
                >
                  <div className="relative z-10 flex items-start gap-3 md:gap-4">
                    <div className={`mt-0.5 font-mono text-xs tabular-nums transition-colors duration-150 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className={`text-base md:text-lg font-bold mb-1 md:mb-2 transition-colors duration-150 ${
                        isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {feature.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: DURATION.structural, ease: EASING.standard as unknown as number[] }}
                            className="overflow-hidden"
                          >
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3 md:mb-4">
                              {feature.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase">
                              {feature.tag} <ArrowRight className="h-3 w-3" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right: Interactive Demo Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.large, ease: EASING.enter as unknown as number[], delay: 0.3 }}
            className="relative"
          >
            {/* Glossy Mockup Container */}
            <div className="relative rounded-xl md:rounded-[2rem] border border-primary/10 bg-card/75 backdrop-blur-md overflow-hidden min-h-[280px] md:min-h-[460px] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.3)] ring-1 ring-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] via-transparent to-primary/[0.05]" />
              
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DURATION.structural, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12"
              >
                <div className="w-full max-w-2xl aspect-video mockup-mesh-bg rounded-[2rem] border border-primary/25 flex items-center justify-center relative shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-inner overflow-hidden">
                  {/* 3D Curved Glass Bezel Glare & Shadow */}
                  <div className="absolute inset-0 pointer-events-none rounded-[2rem] overflow-hidden z-20">
                    {/* Glossy bezel reflection */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/60 via-white/5 to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent" />
                    {/* Left bezel shadow representing depth recursion */}
                    <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/[0.12] to-transparent dark:from-black/60 dark:to-transparent" />
                    {/* Right bezel shadow */}
                    <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/[0.05] to-transparent dark:from-black/30 dark:to-transparent" />
                    {/* Top reflection glare */}
                    <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/45 to-transparent dark:from-white/10" />
                    {/* Screen diagonal glare sheen */}
                    <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/[0.08] dark:via-white/[0.03] to-transparent rotate-12 translate-x-1/3" />
                  </div>

                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                    {(() => {
                      const Demo = features[activeIndex].demo;
                      return <Demo />;
                    })()}
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/20" />
                <div className="w-2 h-2 rounded-full bg-primary/10" />
                <div className="w-2 h-2 rounded-full bg-primary/5" />
              </div>
            </div>

            {/* Glowing accent dots */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-150" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 65%)' }} />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-150" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 65%)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
