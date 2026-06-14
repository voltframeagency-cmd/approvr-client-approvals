import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, MessageSquare, Shield, Palette, Clock, FileText, Image as ImageIcon, Eye, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileIcon } from './FileIcon';

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-6">
      <motion.div
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 dark:border-slate-800/20 shadow-sm"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Upload className="h-3.5 w-3.5 text-primary" />
        <span>Uploading to Portal…</span>
      </motion.div>
      <div className="w-full max-w-xs space-y-2 liquid-card-bg p-4 rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <AnimatePresence mode="popLayout">
          {files.map(f => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 160, damping: 13, mass: 0.8 }}
              className="flex items-center gap-3 bg-muted/40 dark:bg-muted/10 rounded-xl px-3 py-2 border border-border/30"
            >
              <FileIcon ext={f.name.split('.').pop()?.toLowerCase()} className="h-8 w-8 flex-shrink-0" />
              <span className="text-xs font-semibold flex-1 truncate text-foreground">{f.name}</span>
              {f.done ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="h-5 w-5 text-success" />
                </motion.div>
              ) : (
                <div className="w-16 h-2 rounded-full bg-muted dark:bg-slate-800 overflow-hidden">
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
    <div className="w-full max-w-[280px] liquid-card-bg rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Sidebar Header */}
      <div className="border-b border-border/40 px-4 py-2.5 bg-muted/10 flex items-center gap-2">
        <MessageSquare className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Review Discussion</span>
      </div>
      <div className="p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {feedbackMessages.slice(0, visibleCount).map((m, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              initial={{ opacity: 0, x: m.side === 'left' ? -20 : 20, y: 10, scale: 0.88 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.85 }}
              className={`flex items-start gap-2 ${m.side === 'right' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-sm border ${
                m.side === 'left' 
                  ? 'bg-gradient-to-br from-cyan-400 to-cyan-500 text-white border-cyan-300/20' 
                  : 'bg-gradient-to-br from-teal-400 to-teal-500 text-white border-teal-300/20'
              }`}>
                {m.author}
              </div>
              <div className={`rounded-xl px-3 py-2 text-xs max-w-[75%] shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                m.side === 'left' 
                  ? 'bg-muted/65 text-foreground border border-border/30' 
                  : 'bg-primary text-primary-foreground font-medium'
              }`}>
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
              className="flex items-center gap-2 pl-9"
            >
              <div className="flex gap-1 bg-muted/40 px-2 py-1.5 rounded-xl border border-border/30">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="h-1 w-1 rounded-full bg-muted-foreground/50"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Approval Demo ─────────────────────────────────────────
export const ApprovalDemo = () => {
  const [phase, setPhase] = useState<'idle' | 'hover' | 'approved' | 'fading'>('idle');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setPhase('idle');
    t.push(setTimeout(() => setPhase('hover'), 1000));
    t.push(setTimeout(() => setPhase('approved'), 2200));
    t.push(setTimeout(() => setPhase('fading'), 4600));
    t.push(setTimeout(() => setCycle(c => c + 1), 5400));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center px-4"
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-[280px] liquid-card-bg rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden relative">
        {/* Document Header */}
        <div className="border-b border-border/40 bg-muted/10 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <FileIcon ext="pdf" className="h-4 w-4 flex-shrink-0" />
            <span className="text-[10px] font-bold text-foreground truncate max-w-[130px]">Brand_Guidelines_v3.pdf</span>
          </div>
          <span className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-wider">v3</span>
        </div>

        {/* Document Body Mockup */}
        <div className="p-4 space-y-3 relative min-h-[90px] flex flex-col justify-center">
          {phase === 'approved' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.78, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 130, damping: 11, mass: 0.9 }}
              className="absolute inset-0 bg-success/[0.01] flex flex-col items-center justify-center z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 160, damping: 10, mass: 0.7 }}
                className="h-10 w-10 rounded-full bg-success/15 flex items-center justify-center border border-success/30 mb-1 shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
              >
                <Check className="h-5 w-5 text-success" />
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-widest text-success">Approved & Locked</span>
            </motion.div>
          ) : null}

          {/* Dummy text lines representing content */}
          <div className={cn("space-y-2 transition-all duration-300", phase === 'approved' && "opacity-20 blur-[0.5px]")}>
            <div className="h-2 bg-primary/20 w-3/4 rounded-full" />
            <div className="h-1.5 bg-muted-foreground/10 w-full rounded-full" />
            <div className="h-1.5 bg-muted-foreground/10 w-5/6 rounded-full" />
            <div className="flex gap-2 pt-1">
              <div className="h-4 w-12 rounded bg-primary/10 border border-primary/20" />
              <div className="h-4 w-12 rounded bg-muted/40 border border-border/30" />
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="border-t border-border/40 p-2.5 bg-muted/15 flex gap-2">
          <div className="flex-1 h-8 rounded-lg border border-border/80 flex items-center justify-center text-[10px] font-bold text-muted-foreground bg-card shadow-sm cursor-default">
            Request changes
          </div>
          <motion.div
            className="flex-1 h-8 rounded-lg bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground gap-1 cursor-default relative overflow-hidden shadow-[0_2px_8px_rgba(13,148,136,0.15)] dark:shadow-none"
            animate={{ 
              scale: phase === 'hover' ? 1.03 : 1,
              backgroundColor: phase === 'approved' ? 'rgb(16, 185, 129)' : 'rgb(13, 148, 136)'
            }}
            transition={{ duration: 0.2 }}
          >
            {phase === 'hover' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            )}
            <Check className="h-3 w-3" />
            Approve
          </motion.div>
        </div>
      </div>
    </motion.div>
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
    <div className="w-full max-w-[280px] liquid-card-bg rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="border-b border-border/40 px-4 py-2.5 bg-muted/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Activity Feed</span>
        </div>
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <div className="p-4 space-y-2.5 max-h-[260px] overflow-y-auto scrollbar-hide">
        <motion.div
          animate={{ opacity: isFading ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="space-y-3"
        >
          {timelineEvents.map((ev, i) => (
            i < visibleCount ? (
              <motion.div
                key={`${cycle}-${i}`}
                initial={{ opacity: 0, y: 18, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 13, mass: 0.8 }}
                className="flex items-start gap-3 relative"
              >
                {/* Connecting Line */}
                {i < visibleCount - 1 && (
                  <div className="absolute left-3.5 top-7 bottom-[-14px] w-[1px] bg-border/40 dark:bg-slate-800" />
                )}
                
                {/* Icon Container */}
                <div className="relative">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center ${ev.color} bg-current/10 border border-current/5 flex-shrink-0 z-10 relative`}>
                    <ev.icon className="h-3.5 w-3.5" />
                  </div>
                  {/* Active highlight pulse */}
                  {i === visibleCount - 1 && (
                    <motion.div
                      className={`absolute inset-0 rounded-full border ${ev.color.replace('text-', 'border-')}/30`}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] font-bold text-foreground truncate">{ev.label}</p>
                    <span className="text-[9px] text-muted-foreground/50 whitespace-nowrap">{ev.time}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground/75 truncate mt-0.5">{ev.user}</p>
                </div>
              </motion.div>
            ) : null
          ))}
        </motion.div>
      </div>
    </div>
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-6">
      {/* Mini portal preview */}
      <motion.div
        className="w-full max-w-xs rounded-2xl border overflow-hidden liquid-card-bg shadow-[0_16px_36px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        animate={{ borderColor: colors[activeColor] + '22' }}
        transition={{ duration: 0.4 }}
      >
        {/* Brand bar */}
        <motion.div
          className="h-2 w-full"
          animate={{ backgroundColor: colors[activeColor] }}
          transition={{ duration: 0.4 }}
        />
        {/* Portal Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-border/20">
          <div className="flex items-center gap-2">
            <motion.div
              className="h-6 w-6 rounded-md shadow-inner flex items-center justify-center"
              animate={{ backgroundColor: colors[activeColor] }}
              transition={{ duration: 0.4 }}
              style={{ opacity: 0.15 }}
            >
              <Palette className="h-3 w-3" style={{ color: colors[activeColor] }} />
            </motion.div>
            <div className="h-2 w-16 rounded-full bg-foreground/15" />
          </div>
          <motion.div 
            className="px-2.5 py-1 rounded-full text-[9px] font-bold text-white shadow-sm"
            animate={{ backgroundColor: colors[activeColor] }}
            transition={{ duration: 0.4 }}
          >
            Client Portal
          </motion.div>
        </div>
        {/* Portal Body Mock */}
        <div className="p-4 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-muted-foreground/10" />
          <div className="h-1.5 w-1/2 rounded-full bg-muted-foreground/5" />
          <div className="h-8 w-full bg-muted/40 dark:bg-muted/10 rounded-xl border border-border/30 mt-3 flex items-center justify-center">
            <motion.div 
              className="h-3.5 w-16 rounded-full"
              animate={{ backgroundColor: colors[activeColor] }}
              transition={{ duration: 0.4 }}
              style={{ opacity: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Color swatches */}
      <div className="flex gap-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm p-2 rounded-full border border-white/20 dark:border-slate-800/20 shadow-sm">
        {colors.map((c, i) => (
          <motion.div
            key={i}
            className="h-6 w-6 rounded-full cursor-default shadow-sm border border-black/5 dark:border-white/5 relative flex items-center justify-center"
            style={{ backgroundColor: c }}
            animate={{
              scale: activeColor === i ? 1.18 : 0.88,
              opacity: activeColor === i ? 1 : 0.45,
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 11, mass: 0.85 }}
          >
            {activeColor === i && (
              <motion.div 
                layoutId="activeDot"
                className="absolute inset-0.5 rounded-full border border-white/30"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Audit Demo ────────────────────────────────────────────
const auditEntries = [
  { action: 'Logged in', user: 'Sarah C.', icon: Shield, time: '3m ago' },
  { action: 'Viewed proposal', user: 'Sarah C.', icon: Eye, time: '2m ago' },
  { action: 'Approved logo', user: 'Sarah C.', icon: Check, time: '1m ago' },
  { action: 'Comment added', user: 'Alex R.', icon: MessageSquare, time: '30s ago' },
  { action: 'Downloaded PDF', user: 'Sarah C.', icon: Download, time: 'just now' },
];

export const AuditDemo = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    setIsFading(false);
    setVisibleCount(0);
    t.push(setTimeout(() => setVisibleCount(1), 600));
    t.push(setTimeout(() => setVisibleCount(2), 1200));
    t.push(setTimeout(() => setVisibleCount(3), 1800));
    t.push(setTimeout(() => setVisibleCount(4), 2400));
    t.push(setTimeout(() => setVisibleCount(5), 3000));
    t.push(setTimeout(() => setIsFading(true), 5200));
    t.push(setTimeout(() => setCycle(c => c + 1), 6000));
    return () => t.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full max-w-[280px] liquid-card-bg rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="border-b border-border/40 px-4 py-2.5 bg-muted/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Compliance Log</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-extrabold tracking-wider uppercase">
          SECURE
        </div>
      </div>
      <div className="p-4 space-y-2 max-h-[260px] overflow-y-auto scrollbar-hide">
        <motion.div
          animate={{ opacity: isFading ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="space-y-2"
        >
          {auditEntries.map((entry, i) => (
            i < visibleCount ? (
              <motion.div
                key={`${cycle}-${i}`}
                initial={{ opacity: 0, y: 16, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 13, mass: 0.8 }}
                className="flex items-center gap-3 bg-muted/40 dark:bg-muted/10 rounded-xl px-3 py-2 border border-border/30 relative"
              >
                <div className="h-6 w-6 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <entry.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-foreground truncate">{entry.action}</p>
                  <p className="text-[9px] text-muted-foreground/55 truncate">{entry.user}</p>
                </div>
                <span className="text-[9px] text-muted-foreground/40 whitespace-nowrap self-start mt-0.5">{entry.time}</span>
                
                {/* Active highlight pulse */}
                {i === visibleCount - 1 && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/20"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                )}
              </motion.div>
            ) : null
          ))}
        </motion.div>
      </div>
    </div>
  );
};
