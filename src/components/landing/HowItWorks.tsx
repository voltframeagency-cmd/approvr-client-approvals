import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload & share',
    description: 'Upload deliverables to a project. Organize by version. Hit submit when ready for review.',
    detail: 'Supports PDF, Figma, images, video, and any file type.',
    color: 'primary',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Review & discuss',
    description: 'Clients open their branded portal — no login required. They leave comments on each deliverable.',
    detail: 'Threaded discussions. Contextual feedback. Zero email.',
    color: 'info',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Approve & ship',
    description: 'One click to approve. One click to request changes. Every decision is logged with a timestamp.',
    detail: 'Final signoff triggers completion. Full audit trail.',
    color: 'success',
  },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  primary: { bg: 'bg-primary/[0.08]', text: 'text-primary', ring: 'ring-primary/20', glow: 'shadow-primary/10' },
  info: { bg: 'bg-info/[0.08]', text: 'text-info', ring: 'ring-info/20', glow: 'shadow-info/10' },
  success: { bg: 'bg-success/[0.08]', text: 'text-success', ring: 'ring-success/20', glow: 'shadow-success/10' },
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 4000);
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p data-gsap="fade-up" className="text-[12px] font-semibold text-primary uppercase tracking-[0.15em] mb-3">How it works</p>
          <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold mb-4">From deliverable to signoff in three steps</h2>
          <p data-gsap="fade-up" className="text-muted-foreground text-lg">Replace your scattered approval workflow in under five minutes.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-12" data-gsap="fade-up">
            {steps.map((step, i) => {
              const c = colorMap[step.color];
              const active = activeStep === i;
              const completed = activeStep > i;
              return (
                <div key={step.number} className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={() => handleStepClick(i)}
                    className={`relative overflow-hidden flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${active ? `${c.bg} ${c.text} ring-1 ${c.ring} shadow-lg ${c.glow}` : completed ? `${c.bg} ${c.text}` : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
                  >
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? `${c.bg} ${c.text}` : completed ? `${c.bg} ${c.text}` : 'bg-muted text-muted-foreground'}`}>
                      {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : step.number}
                    </span>
                    <span className="hidden sm:inline">{step.title}</span>

                    {/* Progress scrub inside active step */}
                    {active && (
                      <motion.div
                        className={`absolute inset-0 rounded-full opacity-[0.08] ${c.text.replace('text-', 'bg-')}`}
                        initial={{ clipPath: 'inset(0 100% 0 0 round 9999px)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0 round 9999px)' }}
                        transition={{ duration: 4, ease: 'linear' }}
                        key={`progress-${i}-${activeStep}`}
                      />
                    )}
                  </button>
                  {i < 2 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 hidden md:block" />}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Left: visual */}
              <div className={`rounded-2xl border p-8 h-64 flex items-center justify-center relative overflow-hidden`} style={{ background: `linear-gradient(135deg, hsl(var(--${steps[activeStep].color === 'primary' ? 'primary' : steps[activeStep].color}) / 0.03), transparent)` }}>
                <StepVisual step={activeStep} />
              </div>

              {/* Right: content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colorMap[steps[activeStep].color].bg}`}>
                    {(() => { const Icon = steps[activeStep].icon; return <Icon className={`h-5 w-5 ${colorMap[steps[activeStep].color].text}`} />; })()}
                  </div>
                  <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Step {steps[activeStep].number}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{steps[activeStep].title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{steps[activeStep].description}</p>
                <p className="text-[13px] text-muted-foreground/70 border-l-2 border-primary/20 pl-3">{steps[activeStep].detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Section divider */}
      <div className="container mt-20">
        <div data-gsap="line" className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
};

// Interactive step visuals
const StepVisual = ({ step }: { step: number }) => {
  if (step === 0) return <UploadVisual />;
  if (step === 1) return <ReviewVisual />;
  return <ApproveVisual />;
};

const UploadVisual = () => (
  <div className="flex flex-col items-center gap-3">
    {['Brand_Guidelines.pdf', 'Logo_Final.svg', 'Palette.png'].map((file, i) => (
      <motion.div
        key={file}
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: i * 0.15, duration: 0.4, type: 'spring', damping: 15 }}
        className="flex items-center gap-3 bg-card border rounded-lg px-4 py-2.5 shadow-sm w-56"
      >
        <div className={`h-8 w-8 rounded-md flex items-center justify-center text-[9px] font-mono font-bold ${i === 0 ? 'bg-destructive/10 text-destructive' : i === 1 ? 'bg-primary/10 text-primary' : 'bg-info/10 text-info'}`}>
          {file.split('.')[1].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium truncate">{file.replace('_', ' ').split('.')[0]}</p>
          <motion.div
            className="h-0.5 rounded-full bg-primary mt-1"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
          />
        </div>
      </motion.div>
    ))}
  </div>
);

const ReviewVisual = () => (
  <div className="space-y-3 w-64">
    {[
      { author: 'SC', text: 'Can we try a warmer palette?', align: 'left' as const },
      { author: 'AR', text: 'Good call — v2 uploaded.', align: 'right' as const },
      { author: 'SC', text: 'Perfect. This is the one. ✓', align: 'left' as const },
    ].map((msg, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: msg.align === 'left' ? -16 : 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.3, duration: 0.4 }}
        className={`flex items-start gap-2 ${msg.align === 'right' ? 'flex-row-reverse' : ''}`}
      >
        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0 ${msg.author === 'SC' ? 'bg-info/10 text-info ring-1 ring-info/10' : 'bg-primary/10 text-primary ring-1 ring-primary/10'}`}>
          {msg.author}
        </div>
        <div className={`rounded-xl px-3 py-2 text-[11px] max-w-[180px] ${msg.align === 'left' ? 'bg-muted/60 text-foreground' : 'bg-primary/[0.08] text-foreground'}`}>
          {msg.text}
        </div>
      </motion.div>
    ))}
  </div>
);

const ApproveVisual = () => (
  <div className="flex flex-col items-center gap-4">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 10, stiffness: 150 }}
      className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center ring-1 ring-success/20"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', damping: 10 }}
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
      </motion.div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-center"
    >
      <p className="text-[13px] font-semibold text-success">Approved</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">by Sarah Chen · March 25, 2026</p>
    </motion.div>
    {/* Sparkle particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 w-1 rounded-full bg-success/40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: Math.cos((i / 6) * Math.PI * 2) * 60,
          y: Math.sin((i / 6) * Math.PI * 2) * 60,
        }}
        transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
      />
    ))}
  </div>
);

export default HowItWorks;
