import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Upload, MessageSquare, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Centralize & Submit',
    description: 'Upload your deliverables to a dedicated project space. Organize by version and hit submit when you\'re ready for client eyes.',
    detail: 'Supports any file type including Figma, PDF, and Video.',
    color: 'primary',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Collaborative Review',
    description: 'Clients access a branded portal — no login required. They leave precise, contextual feedback exactly where it matters.',
    detail: 'Threaded discussions eliminate "lost in email" syndrome.',
    color: 'primary',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Instant Sign-off',
    description: 'One click for the client to approve or request changes. Every decision is logged with a permanent, legal-grade audit trail.',
    detail: 'A single source of truth for every "Yes".',
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
    <section id="how-it-works" ref={sectionRef} className="py-32 relative overflow-hidden bg-card/10">
      <div className="container px-4 mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>High-Velocity Workflow</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-8 tracking-tighter leading-[1.1]">
            From deliverable to sign-off <span className="text-primary italic">in seconds.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We’ve stripped away the overhead. No logic puzzles, no complex Jira tickets. Just a direct path from work to win.
          </p>
        </motion.div>

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
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
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
                    <div className="aspect-video rounded-[3rem] border border-primary/20 bg-muted/30 overflow-hidden p-6 md:p-10 flex items-center justify-center relative shadow-inner hover:bg-muted/40 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.05] via-transparent to-transparent opacity-50" />
                      
                      {/* Premium Mockup Window Frame */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-[90%] bg-card border border-primary/10 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] relative overflow-hidden group-hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700"
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
                        
                        {/* Content Area - Filling more space as requested */}
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
                    <div className={`mt-8 flex items-center gap-2 font-black text-primary ${isEven ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`}>
                      View Demo <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Simplified but premium visuals
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
        viewport={{ once: true }}
        transition={{ delay: i * 0.15 }}
        className="w-full bg-card border rounded-xl p-4 flex items-center gap-4 shadow-sm"
      >
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">
          SVG
        </div>
        <div className="flex-1">
          <div className="h-1.5 w-24 bg-primary/20 rounded-full mb-2" />
          <motion.div 
            className="h-1 bg-primary rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
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
        viewport={{ once: true }}
        transition={{ delay: i * 0.4 }}
        className={`flex ${m.side === 'left' ? 'justify-start' : 'justify-end'}`}
      >
        <div className={`p-4 rounded-2xl text-[11px] font-medium max-w-[80%] ${
          m.side === 'left' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'
        } shadow-lg shadow-black/5`}>
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
      viewport={{ once: true }}
      transition={{ type: 'spring', damping: 10 }}
      className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20"
    >
      <CheckCircle2 className="h-12 w-12 text-primary" />
    </motion.div>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
        initial={{ opacity: 0, x: 0, y: 0 }}
        viewport={{ once: true }}
        whileInView={{
          opacity: [0, 1, 0],
          x: Math.cos((i / 8) * Math.PI * 2) * 80,
          y: Math.sin((i / 8) * Math.PI * 2) * 80,
          scale: [0, 1, 0]
        }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    ))}
  </div>
);

export default HowItWorks;
