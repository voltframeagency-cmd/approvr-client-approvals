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
  { demo: UploadDemo, title: 'Upload deliverables', description: 'Share files, designs, and documents with clients in one organized space. Drag and drop or bulk-upload — everything stays versioned and accessible.' },
  { demo: FeedbackDemo, title: 'Threaded feedback', description: 'Clients leave contextual comments directly on each deliverable. No more copy-pasting screenshots into email threads.' },
  { demo: ApprovalDemo, title: 'One-click approval', description: 'Clients approve or request changes with a single action. Every decision is captured instantly — no more email chains.' },
  { demo: TimelineDemo, title: 'Activity timeline', description: 'Every comment, approval, and status change is logged automatically. See exactly what happened and when, at a glance.' },
  { demo: BrandingDemo, title: 'Branded portal', description: 'Add your logo and accent color so the portal feels like your own. White-label the entire experience for your clients.' },
  { demo: AuditDemo, title: 'Audit trail', description: 'Every decision is timestamped and attributed. Built for accountability, compliance, and peace of mind.' },
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
        end: `+=${features.length * 100}%`,
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
      className="section-glow"
      style={{ height: `${features.length * 100}vh` }}
    >
      <div ref={pinRef} className="h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="container mb-10">
          <div className="flex items-end justify-between">
            <div className="max-w-xl">
              <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold mb-3">
                Everything you need. Nothing you don't.
              </h2>
              <p className="text-muted-foreground text-lg">
                Approvr replaces scattered approval conversations with a single source of truth.
              </p>
            </div>
            {/* Feature counter */}
            <div className="hidden lg:flex items-baseline gap-1 text-muted-foreground/60 font-mono text-sm tabular-nums">
              <motion.span
                key={activeIndex}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-foreground font-semibold text-lg"
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.span>
              <span>/</span>
              <span>{String(features.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container flex-1 max-h-[60vh]">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 h-full items-center">
            {/* Left: Interactive Demo */}
            <div className="relative h-full max-h-[420px] rounded-2xl border bg-card overflow-hidden">
              {/* Subtle accent glow behind demo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full flex items-center justify-center p-8"
                >
                  {(() => {
                    const Demo = features[activeIndex].demo;
                    return <Demo />;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Text content */}
            <div className="flex flex-col justify-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <span className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-3 block">
                    Feature {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                    {features[activeIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-md">
                    {features[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex gap-2 mt-10">
                {features.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 rounded-full bg-border"
                    animate={{
                      width: activeIndex === i ? 32 : 8,
                      backgroundColor: activeIndex === i
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--border))',
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
        <div data-gsap="line" className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </section>
  );
};

export default Features;
