import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, MessageSquare, Shield, Palette, Clock, FileText, Image as ImageIcon, Eye, Download } from 'lucide-react';

// ─── Upload Demo ───────────────────────────────────────────
export const UploadDemo = () => {
  const [files, setFiles] = useState<{ name: string; progress: number; done: boolean }[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setFiles([]);
    t.push(setTimeout(() => setFiles([{ name: 'logo.svg', progress: 0, done: false }]), 400));
    t.push(setTimeout(() => setFiles(f => f.map(x => ({ ...x, progress: 60 }))), 900));
    t.push(setTimeout(() => setFiles(f => [
      { ...f[0], progress: 100, done: true },
      { name: 'palette.pdf', progress: 0, done: false },
    ]), 1500));
    t.push(setTimeout(() => setFiles(f => f.map((x, i) => i === 1 ? { ...x, progress: 70 } : x)), 2100));
    t.push(setTimeout(() => setFiles(f => f.map(x => ({ ...x, progress: 100, done: true }))), 2800));
    t.push(setTimeout(() => setCycle(c => c + 1), 4500));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6">
      <motion.div
        className="flex items-center gap-2 text-sm text-muted-foreground"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Upload className="h-5 w-5" />
        <span>Uploading…</span>
      </motion.div>
      <div className="w-full max-w-xs space-y-2.5">
        <AnimatePresence mode="popLayout">
          {files.map(f => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-3 bg-muted/30 rounded-lg px-4 py-2.5"
            >
              <FileText className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
              <span className="text-sm flex-1 truncate">{f.name}</span>
              {f.done ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="h-5 w-5 text-success" />
                </motion.div>
              ) : (
                <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${f.progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Feedback Demo ─────────────────────────────────────────
const feedbackMessages = [
  { author: 'SC', text: 'Can we try bolder?', side: 'left' as const },
  { author: 'AR', text: 'Updated — v3 ready', side: 'right' as const },
  { author: 'SC', text: 'Approved! 🎉', side: 'left' as const },
];

export const FeedbackDemo = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setVisibleCount(0);
    setShowTyping(false);

    t.push(setTimeout(() => setVisibleCount(1), 500));
    t.push(setTimeout(() => setShowTyping(true), 1500));
    t.push(setTimeout(() => { setShowTyping(false); setVisibleCount(2); }, 2300));
    t.push(setTimeout(() => setShowTyping(true), 3000));
    t.push(setTimeout(() => { setShowTyping(false); setVisibleCount(3); }, 3800));
    t.push(setTimeout(() => setCycle(c => c + 1), 5500));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 px-6 py-4">
      <AnimatePresence mode="popLayout">
        {feedbackMessages.slice(0, visibleCount).map((m, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: m.side === 'left' ? -12 : 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className={`flex items-start gap-2.5 ${m.side === 'right' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${m.side === 'left' ? 'bg-info/10 text-info' : 'bg-primary/10 text-primary'}`}>
              {m.author}
            </div>
            <div className={`rounded-xl px-4 py-2.5 text-base max-w-[70%] ${m.side === 'left' ? 'bg-muted/40' : 'bg-primary/[0.06]'}`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {showTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 pl-10"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Approval Demo ─────────────────────────────────────────
export const ApprovalDemo = () => {
  const [approved, setApproved] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setApproved(false);
    t.push(setTimeout(() => setApproved(true), 1800));
    t.push(setTimeout(() => setCycle(c => c + 1), 4000));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-8">
      <AnimatePresence mode="wait">
        {!approved ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex gap-3 w-full max-w-xs"
          >
            <div className="flex-1 h-12 rounded-lg border border-border/60 flex items-center justify-center text-base text-muted-foreground">
              Request changes
            </div>
            <motion.div
              className="flex-1 h-12 rounded-lg bg-primary flex items-center justify-center text-base text-primary-foreground gap-1.5 cursor-default"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Check className="h-5 w-5" />
              Approve
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="approved"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              className="h-18 w-18 rounded-full bg-success/10 flex items-center justify-center"
            >
              <Check className="h-9 w-9 text-success" />
            </motion.div>
            <span className="text-base text-success font-medium">Approved</span>
            {/* Ripple */}
            <motion.div
              className="absolute h-18 w-18 rounded-full border-2 border-success/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Timeline Demo ─────────────────────────────────────────
const timelineEvents = [
  { icon: Eye, label: 'Client opened link', user: 'Sarah C.', time: '2m ago', color: 'text-warning' },
  { icon: Upload, label: 'Files uploaded', user: 'You', time: '1m ago', color: 'text-primary' },
  { icon: MessageSquare, label: 'Comment added', user: 'Sarah C.', time: '45s ago', color: 'text-info' },
  { icon: Download, label: 'Downloaded asset', user: 'Sarah C.', time: '30s ago', color: 'text-muted-foreground' },
  { icon: Check, label: 'Approved', user: 'Sarah C.', time: 'just now', color: 'text-success' },
];

export const TimelineDemo = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setIsFading(false);
    setVisibleCount(0);
    t.push(setTimeout(() => setVisibleCount(1), 600));
    t.push(setTimeout(() => setVisibleCount(2), 1300));
    t.push(setTimeout(() => setVisibleCount(3), 2000));
    t.push(setTimeout(() => setVisibleCount(4), 2700));
    t.push(setTimeout(() => setVisibleCount(5), 3400));
    // Smooth fade-out before reset
    t.push(setTimeout(() => setIsFading(true), 5200));
    t.push(setTimeout(() => setCycle(c => c + 1), 6000));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center gap-0 px-6 py-4"
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
    >
      {timelineEvents.map((ev, i) => (
        <div key={i} className="flex items-stretch gap-3 relative">
          {/* Vertical connector */}
          <div className="flex flex-col items-center">
            {i < visibleCount ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: 'spring', 
                  damping: 20, 
                  stiffness: 300,
                  mass: 0.8,
                }}
                className="relative"
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${ev.color} bg-current/10`}>
                  <ev.icon className={`h-4 w-4 ${ev.color}`} />
                </div>
                {/* Pulse ring on latest */}
                {i === visibleCount - 1 && (
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${ev.color.replace('text-', 'border-')}/20`}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: [0.2, 0, 0, 1] }}
                  />
                )}
              </motion.div>
            ) : (
              <div className="h-8 w-8" />
            )}
            {/* Connecting line */}
            {i < timelineEvents.length - 1 && (
              <motion.div
                className="w-px flex-1 min-h-[8px] origin-top"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: i < visibleCount ? 1 : 0,
                  opacity: i < visibleCount ? 1 : 0,
                  background: i < visibleCount 
                    ? 'linear-gradient(to bottom, hsl(var(--border) / 0.5), hsl(var(--border) / 0.15))' 
                    : 'hsl(var(--border) / 0.2)'
                }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: 0.15 }}
              />
            )}
          </div>
          {/* Content */}
          {i < visibleCount ? (
            <motion.div
              initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, ease: [0.05, 0.7, 0.1, 1] }}
              className="flex-1 flex items-center justify-between pb-3 min-h-[40px]"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground/90">{ev.label}</span>
                <span className="text-xs text-muted-foreground/50">{ev.user}</span>
              </div>
              <motion.span 
                className="text-xs text-muted-foreground/40 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {ev.time}
              </motion.span>
            </motion.div>
          ) : (
            <div className="flex-1 pb-3 min-h-[40px]" />
          )}
        </div>
      ))}
    </motion.div>
  );
};

// ─── Branding Demo ─────────────────────────────────────────
const colors = ['hsl(169, 76%, 48%)', 'hsl(210, 100%, 52%)', 'hsl(38, 92%, 50%)'];

export const BrandingDemo = () => {
  const [activeColor, setActiveColor] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setActiveColor(0);
    t.push(setTimeout(() => setActiveColor(1), 1200));
    t.push(setTimeout(() => setActiveColor(2), 2400));
    t.push(setTimeout(() => setActiveColor(0), 3600));
    t.push(setTimeout(() => setCycle(c => c + 1), 4800));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-8">
      {/* Mini portal preview */}
      <motion.div
        className="w-full max-w-xs rounded-xl border border-border/40 overflow-hidden"
        animate={{ borderColor: colors[activeColor] + '33' }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="h-5 w-full"
          animate={{ backgroundColor: colors[activeColor] }}
          transition={{ duration: 0.4 }}
          style={{ opacity: 0.15 }}
        />
        <div className="px-4 py-3 flex items-center gap-3">
          <motion.div
            className="h-8 w-8 rounded-lg"
            animate={{ backgroundColor: colors[activeColor] }}
            transition={{ duration: 0.4 }}
            style={{ opacity: 0.2 }}
          />
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-20 rounded-full bg-muted-foreground/10" />
            <div className="h-1.5 w-14 rounded-full bg-muted-foreground/5" />
          </div>
        </div>
      </motion.div>
      {/* Color swatches */}
      <div className="flex gap-3">
        {colors.map((c, i) => (
          <motion.div
            key={i}
            className="h-7 w-7 rounded-full cursor-default"
            style={{ backgroundColor: c }}
            animate={{
              scale: activeColor === i ? 1.25 : 1,
              opacity: activeColor === i ? 1 : 0.35,
            }}
            transition={{ type: 'spring', damping: 15 }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Audit Demo ────────────────────────────────────────────
const auditEntries = [
  { action: 'Logged in', user: 'Sarah C.', icon: Shield },
  { action: 'Approved logo', user: 'Sarah C.', icon: Check },
  { action: 'Comment added', user: 'Alex R.', icon: MessageSquare },
];

export const AuditDemo = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setVisibleCount(0);
    t.push(setTimeout(() => setVisibleCount(1), 600));
    t.push(setTimeout(() => setVisibleCount(2), 1400));
    t.push(setTimeout(() => setVisibleCount(3), 2200));
    t.push(setTimeout(() => setCycle(c => c + 1), 4500));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-2.5 px-6 py-4">
      <div className="flex items-center gap-2 mb-1">
        <Shield className="h-4 w-4 text-primary/40" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Audit log</span>
      </div>
      <AnimatePresence mode="popLayout">
        {auditEntries.slice(0, visibleCount).map((entry, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-muted/20 rounded-lg px-4 py-2"
          >
            <entry.icon className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
            <span className="text-sm flex-1 truncate">{entry.action}</span>
            <span className="text-xs text-muted-foreground/50">{entry.user}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
