import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, MessageSquare, Shield, Palette, Clock, FileText, Image as ImageIcon } from 'lucide-react';

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 px-3">
      <motion.div
        className="flex items-center gap-1 text-[9px] text-muted-foreground"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Upload className="h-2.5 w-2.5" />
        <span>Uploading…</span>
      </motion.div>
      <div className="w-full space-y-1">
        <AnimatePresence mode="popLayout">
          {files.map(f => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-1.5 bg-muted/30 rounded px-1.5 py-1"
            >
              <FileText className="h-2.5 w-2.5 text-muted-foreground/50 flex-shrink-0" />
              <span className="text-[8px] flex-1 truncate">{f.name}</span>
              {f.done ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="h-2.5 w-2.5 text-success" />
                </motion.div>
              ) : (
                <div className="w-8 h-1 rounded-full bg-muted overflow-hidden">
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
    <div className="w-full h-full flex flex-col justify-center gap-1 px-3 py-1.5">
      <AnimatePresence mode="popLayout">
        {feedbackMessages.slice(0, visibleCount).map((m, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: m.side === 'left' ? -8 : 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className={`flex items-start gap-1 ${m.side === 'right' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`h-4 w-4 rounded-full flex items-center justify-center text-[6px] font-bold flex-shrink-0 ${m.side === 'left' ? 'bg-info/10 text-info' : 'bg-primary/10 text-primary'}`}>
              {m.author}
            </div>
            <div className={`rounded-lg px-1.5 py-0.5 text-[8px] max-w-[70%] ${m.side === 'left' ? 'bg-muted/40' : 'bg-primary/[0.06]'}`}>
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
            className="flex items-center gap-1 pl-5"
          >
            <div className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40"
                  animate={{ y: [0, -2, 0] }}
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
      <AnimatePresence mode="wait">
        {!approved ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex gap-1.5 w-full"
          >
            <div className="flex-1 h-5 rounded border border-border/60 flex items-center justify-center text-[7px] text-muted-foreground">
              Request changes
            </div>
            <motion.div
              className="flex-1 h-5 rounded bg-primary flex items-center justify-center text-[7px] text-primary-foreground gap-0.5 cursor-default"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Check className="h-2 w-2" />
              Approve
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="approved"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              className="h-7 w-7 rounded-full bg-success/10 flex items-center justify-center"
            >
              <Check className="h-3.5 w-3.5 text-success" />
            </motion.div>
            <span className="text-[8px] text-success font-medium">Approved</span>
            {/* Ripple */}
            <motion.div
              className="absolute h-7 w-7 rounded-full border border-success/20"
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
  { icon: Upload, label: 'Files uploaded', color: 'text-primary' },
  { icon: MessageSquare, label: 'Comment added', color: 'text-info' },
  { icon: Check, label: 'Approved', color: 'text-success' },
];

export const TimelineDemo = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setVisibleCount(0);
    t.push(setTimeout(() => setVisibleCount(1), 500));
    t.push(setTimeout(() => setVisibleCount(2), 1300));
    t.push(setTimeout(() => setVisibleCount(3), 2100));
    t.push(setTimeout(() => setCycle(c => c + 1), 4500));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-0 px-4 py-1">
      {timelineEvents.map((ev, i) => (
        <div key={i} className="flex items-center gap-1.5 relative">
          {/* Vertical line */}
          {i < 2 && <div className="absolute left-[5px] top-4 w-px h-3 bg-border/50" />}
          <AnimatePresence>
            {i < visibleCount && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="flex items-center gap-1.5 py-1"
              >
                <div className={`h-2.5 w-2.5 rounded-full flex items-center justify-center ${ev.color} bg-current/10`}>
                  <ev.icon className={`h-1.5 w-1.5 ${ev.color}`} />
                </div>
                <span className="text-[8px] text-muted-foreground">{ev.label}</span>
                <span className="text-[7px] text-muted-foreground/50">just now</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// ─── Branding Demo ─────────────────────────────────────────
const colors = ['hsl(160, 84%, 39%)', 'hsl(210, 100%, 52%)', 'hsl(38, 92%, 50%)'];

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
      {/* Mini portal preview */}
      <motion.div
        className="w-full rounded border border-border/40 overflow-hidden"
        animate={{ borderColor: colors[activeColor] + '33' }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="h-2 w-full"
          animate={{ backgroundColor: colors[activeColor] }}
          transition={{ duration: 0.4 }}
          style={{ opacity: 0.15 }}
        />
        <div className="px-1.5 py-1 flex items-center gap-1">
          <motion.div
            className="h-3 w-3 rounded"
            animate={{ backgroundColor: colors[activeColor] }}
            transition={{ duration: 0.4 }}
            style={{ opacity: 0.2 }}
          />
          <div className="flex-1 space-y-0.5">
            <div className="h-0.5 w-8 rounded-full bg-muted-foreground/10" />
            <div className="h-0.5 w-5 rounded-full bg-muted-foreground/5" />
          </div>
        </div>
      </motion.div>
      {/* Color swatches */}
      <div className="flex gap-1.5">
        {colors.map((c, i) => (
          <motion.div
            key={i}
            className="h-3.5 w-3.5 rounded-full cursor-default"
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
    <div className="w-full h-full flex flex-col justify-center gap-1 px-3 py-1">
      <div className="flex items-center gap-1 mb-0.5">
        <Shield className="h-2.5 w-2.5 text-primary/40" />
        <span className="text-[7px] text-muted-foreground uppercase tracking-wider font-semibold">Audit log</span>
      </div>
      <AnimatePresence mode="popLayout">
        {auditEntries.slice(0, visibleCount).map((entry, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 bg-muted/20 rounded px-1.5 py-0.5"
          >
            <entry.icon className="h-2 w-2 text-muted-foreground/40 flex-shrink-0" />
            <span className="text-[7px] flex-1 truncate">{entry.action}</span>
            <span className="text-[6px] text-muted-foreground/50">{entry.user}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
