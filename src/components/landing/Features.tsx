import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UploadDemo,
  FeedbackDemo,
  ApprovalDemo,
  TimelineDemo,
  BrandingDemo,
  AuditDemo,
} from './FeatureInteractiveDemos';

const features = [
  { demo: UploadDemo, title: 'Upload deliverables', description: 'Share files, designs, and documents with clients in one organized space. Drag and drop or bulk-upload — everything stays versioned.' },
  { demo: FeedbackDemo, title: 'Threaded feedback', description: 'Clients leave contextual comments directly on each deliverable. No more copy-pasting screenshots into emails.' },
  { demo: ApprovalDemo, title: 'One-click approval', description: 'Clients approve or request changes with a single action. Every decision is captured instantly.' },
  { demo: TimelineDemo, title: 'Activity timeline', description: 'Every comment, approval, and status change is logged automatically. See what happened and when.' },
  { demo: BrandingDemo, title: 'Branded portal', description: 'Add your logo and accent color so the portal feels like your own. White-label the entire experience.' },
  { demo: AuditDemo, title: 'Audit trail', description: 'Every decision is timestamped and attributed. Built for accountability and compliance.' },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle when idle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section id="features" className="py-20 md:py-32 section-glow">
      <div className="container">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold mb-3">
            Everything you need. Nothing you don't.
          </h2>
          <p data-gsap="fade-up" className="text-muted-foreground text-lg">
            Approvr replaces scattered approval conversations with a single source of truth.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-6 lg:gap-10 items-stretch">
          {/* Left: Clickable feature list */}
          <div className="flex flex-col justify-center gap-0">
            {features.map((f, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={f.title}
                  onClick={() => setActiveIndex(i)}
                  className="relative border-l-2 text-left transition-all duration-300 cursor-pointer rounded-r-xl"
                  style={{
                    borderColor: isActive
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--border))',
                    backgroundColor: isActive
                      ? 'hsl(var(--primary) / 0.06)'
                      : 'transparent',
                  }}
                >
                  <div className="pl-5 py-3">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-xs tabular-nums transition-colors duration-300"
                        style={{
                          color: isActive
                            ? 'hsl(var(--primary))'
                            : 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className="font-semibold text-base transition-colors duration-300"
                        style={{
                          color: isActive
                            ? 'hsl(var(--foreground))'
                            : 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {f.title}
                      </h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="text-muted-foreground text-sm leading-relaxed pl-8 pr-2 overflow-hidden"
                        >
                          {f.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="mt-4 ml-5 flex gap-1.5">
              {features.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full cursor-pointer"
                  onClick={() => setActiveIndex(i)}
                  animate={{
                    width: activeIndex === i ? 28 : 6,
                    backgroundColor: activeIndex === i
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--border))',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>

          {/* Right: Interactive Demo */}
          <div className="relative rounded-2xl border bg-card overflow-hidden min-h-[340px] md:min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full flex items-center justify-center p-6"
              >
                {(() => {
                  const Demo = features[activeIndex].demo;
                  return <Demo />;
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="container mt-20">
        <div data-gsap="line" className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </section>
  );
};

export default Features;
