import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import {
  UploadDemo,
  FeedbackDemo,
  ApprovalDemo,
  TimelineDemo,
  BrandingDemo,
  AuditDemo,
} from './FeatureInteractiveDemos';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { demo: UploadDemo, title: 'Upload deliverables', description: 'Share files, designs, and documents with clients in one organized space. Drag and drop or bulk-upload — everything stays versioned.' },
  { demo: FeedbackDemo, title: 'Threaded feedback', description: 'Clients leave contextual comments directly on each deliverable. No more copy-pasting screenshots into emails.' },
  { demo: ApprovalDemo, title: 'One-click approval', description: 'Clients approve or request changes with a single action. Every decision is captured instantly.' },
  { demo: TimelineDemo, title: 'Activity timeline', description: 'Every comment, approval, and status change is logged automatically. See what happened and when.' },
  { demo: BrandingDemo, title: 'Branded portal', description: 'Add your logo and accent color so the portal feels like your own. White-label the entire experience.' },
  { demo: AuditDemo, title: 'Audit trail', description: 'Every decision is timestamped and attributed. Built for accountability and compliance.' },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile || !sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${features.length * 80}%`,
        pin: pinRef.current,
        scrub: 0.3,
        onUpdate: (self) => {
          const idx = Math.min(
            features.length - 1,
            Math.floor(self.progress * features.length)
          );
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // ─── Mobile: stacked cards ───────────────────────────────
  if (isMobile) {
    return (
      <section id="features" className="py-20 section-glow">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 data-gsap="heading" className="text-3xl font-bold mb-4">Everything you need. Nothing you don't.</h2>
            <p data-gsap="fade-up" className="text-muted-foreground text-lg">Approvr replaces scattered approval conversations with a single source of truth.</p>
          </div>
          <div className="space-y-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                data-gsap="card"
                data-delay={String(i * 0.07)}
                className="rounded-2xl border bg-card p-5"
              >
                <div className="h-40 mb-4 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
                  <f.demo />
                </div>
                <h3 className="font-semibold text-base mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Desktop: pinned scrollytelling ──────────────────────
  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-glow relative"
      style={{ height: `${features.length * 80}vh` }}
    >
      <div ref={pinRef} className="h-screen flex flex-col justify-center py-10">
        {/* Header */}
        <div className="container mb-8">
          <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold mb-3 max-w-xl">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg">
            Approvr replaces scattered approval conversations with a single source of truth.
          </p>
        </div>

        {/* Two-column layout: feature list left, demo right */}
        <div className="container flex-1 min-h-0">
          <div className="grid lg:grid-cols-[1fr,1.4fr] gap-6 lg:gap-10 h-full items-stretch">

            {/* Left: Feature list as accordion-style nav */}
            <div className="flex flex-col justify-center gap-0 overflow-hidden">
              {features.map((f, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.div
                    key={f.title}
                    className="relative border-l-2 transition-colors duration-300"
                    animate={{
                      borderColor: isActive
                        ? 'hsl(160, 84%, 39%)'
                        : 'hsl(220, 13%, 91%)',
                    }}
                  >
                    <div className="pl-5 py-3">
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-mono text-xs tabular-nums transition-colors duration-300"
                          style={{
                            color: isActive
                              ? 'hsl(160, 84%, 39%)'
                              : 'hsl(220, 10%, 62%)',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className="font-semibold text-base transition-colors duration-300"
                          style={{
                            color: isActive
                              ? 'hsl(220, 20%, 10%)'
                              : 'hsl(220, 10%, 62%)',
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
                  </motion.div>
                );
              })}

              {/* Progress bar */}
              <div className="mt-4 ml-5">
                <div className="flex gap-1.5">
                  {features.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 rounded-full"
                      animate={{
                        width: activeIndex === i ? 28 : 6,
                        backgroundColor: activeIndex === i
                          ? 'hsl(160, 84%, 39%)'
                          : 'hsl(220, 13%, 91%)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Demo */}
            <div className="relative rounded-2xl border bg-card overflow-hidden min-h-[340px]">
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
      </div>
    </section>
  );
};

export default Features;
