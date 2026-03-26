import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageSquare, Clock, FileText, Image, Palette } from 'lucide-react';

type Status = 'draft' | 'in_review' | 'approved';

interface MockDeliverable {
  id: number;
  name: string;
  type: string;
  icon: typeof FileText;
  status: Status;
}

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Draft' },
  in_review: { bg: 'bg-info/10', text: 'text-info', label: 'In Review' },
  approved: { bg: 'bg-success/10', text: 'text-success', label: 'Approved' },
};

const initialDeliverables: MockDeliverable[] = [
  { id: 1, name: 'Primary Logo', type: 'SVG', icon: Image, status: 'approved' },
  { id: 2, name: 'Color Palette', type: 'PDF', icon: Palette, status: 'in_review' },
  { id: 3, name: 'Typography Guide', type: 'PDF', icon: FileText, status: 'in_review' },
];

const comments = [
  { author: 'SC', name: 'Sarah Chen', text: 'Love the direction! Can we try bolder weights?', time: '2m ago', color: 'bg-info/10 text-info ring-info/10' },
  { author: 'AR', name: 'Alex Rivera', text: 'Updated — v3 ready for your review.', time: 'just now', color: 'bg-primary/10 text-primary ring-primary/10' },
];

const HeroDemoMockup = () => {
  const [deliverables, setDeliverables] = useState(initialDeliverables);
  const [activeTab, setActiveTab] = useState(2);
  const [showApproveAnim, setShowApproveAnim] = useState(false);
  const [commentIndex, setCommentIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 55, y: 35 });
  const [cursorClick, setCursorClick] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Single unified timeline — cursor + demo events in sync
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const moveTo = (x: number, y: number) => setCursorPos({ x, y });
    const click = () => { setCursorClick(true); setTimeout(() => setCursorClick(false), 200); };

    // 0s — cursor starts near the comment area, reading discussion
    moveTo(55, 52);

    // 1.5s — cursor drifts over the first comment
    at(1500, () => moveTo(65, 58));

    // 3s — typing indicator appears, cursor watches
    at(3000, () => {
      setShowTyping(true);
      moveTo(55, 68);
    });

    // 4.5s — new comment appears, cursor reads it
    at(4500, () => {
      setShowTyping(false);
      setCommentIndex(1);
      moveTo(60, 65);
    });

    // 5.5s — cursor moves toward the Approve button
    at(5500, () => moveTo(72, 88));

    // 6.5s — cursor hovers right on the Approve button
    at(6500, () => moveTo(72, 90));

    // 7s — cursor clicks Approve → approval fires
    at(7000, () => {
      click();
      setShowApproveAnim(true);
      setDeliverables(prev => prev.map(d => d.id === 2 ? { ...d, status: 'approved' as Status } : d));
    });

    // 8s — cursor drifts up to the status badge to admire the result
    at(8000, () => moveTo(80, 22));

    // 9.5s — cursor moves to sidebar progress bar
    at(9500, () => moveTo(18, 82));

    // 11s — reset everything
    at(11000, () => {
      setCursorVisible(false);
      setDeliverables(initialDeliverables);
      setActiveTab(2);
      setShowApproveAnim(false);
      setCommentIndex(0);
      setShowTyping(false);
    });

    // 11.3s — reappear cursor at starting position
    at(11300, () => {
      moveTo(55, 35);
      setCursorVisible(true);
    });

    return () => timers.forEach(clearTimeout);
  }, [deliverables[1].status]);

  const activeDeliverable = deliverables.find(d => d.id === activeTab)!;
  const st = statusStyles[activeDeliverable.status];

  return (
    <div className="rounded-2xl border bg-card overflow-hidden relative" style={{ boxShadow: '0 25px 80px -15px hsl(160 84% 39% / 0.08), 0 8px 24px -8px hsl(220 20% 10% / 0.06)' }}>
      {/* Animated cursor */}
      <motion.div
        className="absolute z-50 pointer-events-none"
        animate={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
          opacity: cursorVisible ? 1 : 0,
          scale: cursorClick ? 0.85 : 1,
        }}
        transition={{
          left: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          top: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.15 },
          opacity: { duration: 0.2 },
        }}
        style={{ marginLeft: -2, marginTop: -2 }}
      >
        {/* Cursor SVG */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
          <path d="M5 3l14 8.5L12 14l-2.5 7.5L5 3z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {/* Click ripple */}
        <AnimatePresence>
          {cursorClick && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-1 left-1 w-3 h-3 rounded-full bg-primary/30"
            />
          )}
        </AnimatePresence>
        {/* Cursor label */}
        <motion.div
          className="absolute left-5 top-3 bg-foreground text-background text-[9px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sarah C.
        </motion.div>
      </motion.div>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b bg-muted/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/[0.08]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 bg-muted/50 rounded-md px-3 py-1">
            <svg width="10" height="10" viewBox="0 0 16 16" className="text-muted-foreground/50"><path d="M8 1L2 4v4.5c0 4 2.5 6.5 6 7.5 3.5-1 6-3.5 6-7.5V4L8 1z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span className="text-[11px] text-muted-foreground font-mono">portal.approvr.io/acme/brand-refresh</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[200px_1fr] min-h-[320px]">
        {/* Sidebar — deliverable list */}
        <div className="border-r bg-muted/[0.03] p-3 space-y-1 hidden md:block">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">Deliverables</p>
          {deliverables.map(d => {
            const s = statusStyles[d.status];
            const active = activeTab === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`w-full text-left rounded-lg px-2.5 py-2 text-[12px] transition-all duration-200 flex items-center gap-2.5 ${active ? 'bg-primary/[0.06] text-foreground' : 'text-muted-foreground hover:bg-muted/40'}`}
              >
                <d.icon className="h-3.5 w-3.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`truncate ${active ? 'font-medium' : ''}`}>{d.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {d.status === 'in_review' && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'hsl(210, 100%, 52%)', animationDuration: '2s' }} />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: 'hsl(210, 100%, 52%)' }} />
                      </span>
                    )}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={d.status}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`text-[10px] ${s.text}`}
                      >
                        {s.label}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                {d.status === 'approved' && <Check className="h-3 w-3 text-success" />}
              </button>
            );
          })}

          {/* Progress */}
          <div className="px-2.5 pt-3 mt-2 border-t">
            <p className="text-[10px] text-muted-foreground mb-1.5">Project progress</p>
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${(deliverables.filter(d => d.status === 'approved').length / deliverables.length) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {deliverables.filter(d => d.status === 'approved').length}/{deliverables.length} approved
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[14px] font-semibold">{activeDeliverable.name}</h3>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3" />
                    v3 · Updated 2 hours ago
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeDeliverable.status}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}
                  >
                    {activeDeliverable.status === 'approved' && <Check className="h-3 w-3" />}
                    {st.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* File preview area */}
              <div className="h-28 rounded-lg bg-muted/20 border border-dashed border-border/60 flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent" />
                <activeDeliverable.icon className="h-6 w-6 text-muted-foreground/25" />

                {/* Approval animation overlay */}
                <AnimatePresence>
                  {showApproveAnim && activeTab === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-success/[0.06] backdrop-blur-[1px]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                        >
                          <Check className="h-6 w-6 text-success" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Comments thread */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3" />
                  Discussion
                </p>
                {comments.slice(0, commentIndex + 1).map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-semibold ring-1 flex-shrink-0 ${c.color}`}>
                      {c.author}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-medium">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{c.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-2 pl-8"
                    >
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="h-1 w-1 rounded-full bg-muted-foreground/40"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">Alex is typing…</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons — only show for non-approved */}
              {activeDeliverable.status !== 'approved' && !showApproveAnim && (
                <div className="flex gap-2 mt-4">
                  <div className="flex-1 h-8 rounded-lg border border-border/60 flex items-center justify-center text-[11px] text-muted-foreground font-medium cursor-default">
                    Request changes
                  </div>
                  <div className="flex-1 h-8 rounded-lg bg-primary flex items-center justify-center text-[11px] text-primary-foreground font-medium gap-1 cursor-default">
                    <Check className="h-3 w-3" />
                    Approve
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroDemoMockup;
