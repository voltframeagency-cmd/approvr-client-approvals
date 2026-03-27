import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

const float = (delay = 0, duration = 3, y = 3) => ({
  y: [-y, y, -y],
  transition: { duration, repeat: Infinity, ease: 'easeInOut', delay },
});

const pulse = (delay = 0, duration = 2.5) => ({
  scale: [1, 1.08, 1],
  opacity: [0.8, 1, 0.8],
  transition: { duration, repeat: Infinity, ease: 'easeInOut', delay },
});

const shimmer = (delay = 0) => ({
  opacity: [0.15, 0.35, 0.15],
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay },
});

// Upload deliverables — files floating into a folder
export const UploadIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Folder back */}
    <motion.path
      d="M16 28h88a4 4 0 014 4v40a4 4 0 01-4 4H16a4 4 0 01-4 4V32a4 4 0 014-4z"
      fill="hsl(169, 76%, 48%)" fillOpacity={0.06}
      stroke="hsl(169, 76%, 48%)" strokeOpacity={0.2} strokeWidth={1}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
    />
    {/* Folder tab */}
    <motion.path
      d="M16 28l8-12h24l8 12"
      stroke="hsl(169, 76%, 48%)" strokeOpacity={0.3} strokeWidth={1}
      fill="hsl(169, 76%, 48%)" fillOpacity={0.04}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
    />
    {/* File 1 — continuous float */}
    <motion.g
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4, type: 'spring', damping: 12 }}
    >
      <motion.g animate={float(0, 3.5, 2)}>
        <rect x="36" y="34" width="20" height="26" rx="2" fill="hsl(169, 76%, 48%)" fillOpacity={0.1} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.25} strokeWidth={0.8} />
        <path d="M40 42h12M40 46h8M40 50h10" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.3} strokeWidth={0.6} />
      </motion.g>
    </motion.g>
    {/* File 2 — continuous float offset */}
    <motion.g
      initial={{ y: -28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.55, type: 'spring', damping: 12 }}
    >
      <motion.g animate={float(0.8, 3, 2.5)}>
        <rect x="62" y="36" width="20" height="26" rx="2" fill="hsl(210, 100%, 52%)" fillOpacity={0.08} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={0.8} />
        <rect x="66" y="42" width="12" height="8" rx="1" fill="hsl(210, 100%, 52%)" fillOpacity={0.1} />
        <path d="M66 54h12" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={0.6} />
      </motion.g>
    </motion.g>
    {/* Upload arrow — pulsing */}
    <motion.g animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
      <motion.path
        d="M60 18V8M55 13l5-5 5 5"
        stroke="hsl(169, 76%, 48%)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        variants={draw} initial="hidden" whileInView="visible"
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
      />
    </motion.g>
  </svg>
);

// Threaded feedback — chat bubbles with typing pulse
export const FeedbackIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Bubble 1 — slides in + subtle float */}
    <motion.g
      initial={{ x: -16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.g animate={float(0, 4, 1.5)}>
        <rect x="12" y="12" width="52" height="20" rx="10" fill="hsl(169, 76%, 48%)" fillOpacity={0.08} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.2} strokeWidth={0.8} />
        <path d="M24 20h28" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.25} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M24 26h16" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.15} strokeWidth={1} strokeLinecap="round" />
        <motion.circle cx="16" cy="22" r="4" fill="hsl(169, 76%, 48%)" fillOpacity={0.15} animate={pulse(0.5)} />
      </motion.g>
    </motion.g>
    {/* Bubble 2 — slides in + subtle float */}
    <motion.g
      initial={{ x: 16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      <motion.g animate={float(1, 3.5, 1.5)}>
        <rect x="56" y="38" width="52" height="20" rx="10" fill="hsl(210, 100%, 52%)" fillOpacity={0.06} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.15} strokeWidth={0.8} />
        <path d="M68 46h28" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M68 52h20" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.12} strokeWidth={1} strokeLinecap="round" />
        <motion.circle cx="104" cy="48" r="4" fill="hsl(210, 100%, 52%)" fillOpacity={0.12} animate={pulse(1.2)} />
      </motion.g>
    </motion.g>
    {/* Bubble 3 — typing indicator dots */}
    <motion.g
      initial={{ x: -16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <rect x="12" y="62" width="40" height="14" rx="7" fill="hsl(169, 76%, 48%)" fillOpacity={0.06} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.15} strokeWidth={0.8} />
      {/* Typing dots */}
      {[0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx={26 + i * 6}
          cy="69"
          r="1.5"
          fill="hsl(169, 76%, 48%)"
          fillOpacity={0.3}
          animate={{ y: [0, -2, 0], fillOpacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </motion.g>
    {/* Connector line */}
    <motion.path
      d="M38 32v6M82 58v4"
      stroke="hsl(169, 76%, 48%)" strokeOpacity={0.1} strokeWidth={0.5} strokeDasharray="2 2"
      animate={shimmer(0.3)}
    />
  </svg>
);

// One-click approval — checkmark with continuous ripple
export const ApprovalIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Outer ripple — continuous pulse */}
    <motion.circle
      cx="60" cy="40" r="32"
      stroke="hsl(142, 71%, 45%)" strokeWidth={1}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    />
    <motion.circle
      cx="60" cy="40" r="32"
      stroke="hsl(142, 71%, 45%)" strokeWidth={0.8}
      fill="none"
      animate={{ scale: [1, 1.15, 1], strokeOpacity: [0.08, 0.02, 0.08] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Mid ripple */}
    <motion.circle
      cx="60" cy="40" r="24"
      stroke="hsl(142, 71%, 45%)" strokeOpacity={0.12} strokeWidth={1}
      fill="hsl(142, 71%, 45%)" fillOpacity={0.02}
      animate={{ scale: [1, 1.06, 1], strokeOpacity: [0.12, 0.06, 0.12] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
    />
    {/* Inner circle — breathing */}
    <motion.circle
      cx="60" cy="40" r="16"
      fill="hsl(142, 71%, 45%)" strokeWidth={1}
      stroke="hsl(142, 71%, 45%)"
      animate={{ fillOpacity: [0.06, 0.12, 0.06], strokeOpacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Checkmark */}
    <motion.path
      d="M52 40l5 5 11-11"
      stroke="hsl(142, 71%, 45%)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      variants={draw} initial="hidden" whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.6 }}
    />
    {/* Sparkles — twinkling */}
    {[
      { cx: 88, cy: 18, r: 1.5, delay: 0 },
      { cx: 32, cy: 60, r: 1, delay: 0.6 },
      { cx: 92, cy: 55, r: 1, delay: 1.2 },
      { cx: 28, cy: 22, r: 1.5, delay: 0.9 },
    ].map((s, i) => (
      <motion.circle
        key={i}
        cx={s.cx} cy={s.cy} r={s.r}
        fill="hsl(142, 71%, 45%)"
        animate={{ fillOpacity: [0.1, 0.35, 0.1], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
      />
    ))}
  </svg>
);

// Activity timeline — dots sliding in sequentially with pulse
export const TimelineIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Timeline line — drawing */}
    <motion.path
      d="M30 8v64"
      stroke="hsl(169, 76%, 48%)" strokeOpacity={0.15} strokeWidth={1.5}
      variants={draw} initial="hidden" whileInView="visible"
      viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
    />
    {/* Event 1 — float + pulse dot */}
    <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
      <motion.g animate={float(0, 4, 1)}>
        <motion.circle cx="30" cy="16" r="4" fill="hsl(169, 76%, 48%)" stroke="hsl(169, 76%, 48%)" strokeWidth={0.8}
          animate={{ fillOpacity: [0.15, 0.3, 0.15], strokeOpacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x="42" y="10" width="60" height="12" rx="6" fill="hsl(169, 76%, 48%)" fillOpacity={0.06} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.12} strokeWidth={0.6} />
        <motion.path d="M50 16h40" stroke="hsl(169, 76%, 48%)" strokeLinecap="round" strokeWidth={1} animate={shimmer(0)} />
      </motion.g>
    </motion.g>
    {/* Event 2 */}
    <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.55 }}>
      <motion.g animate={float(0.5, 3.5, 1)}>
        <motion.circle cx="30" cy="38" r="4" fill="hsl(210, 100%, 52%)" stroke="hsl(210, 100%, 52%)" strokeWidth={0.8}
          animate={{ fillOpacity: [0.1, 0.25, 0.1], strokeOpacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <rect x="42" y="32" width="50" height="12" rx="6" fill="hsl(210, 100%, 52%)" fillOpacity={0.05} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.1} strokeWidth={0.6} />
        <motion.path d="M50 38h32" stroke="hsl(210, 100%, 52%)" strokeLinecap="round" strokeWidth={1} animate={shimmer(0.4)} />
      </motion.g>
    </motion.g>
    {/* Event 3 */}
    <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
      <motion.g animate={float(1, 3, 1)}>
        <motion.circle cx="30" cy="60" r="4" fill="hsl(142, 71%, 45%)" stroke="hsl(142, 71%, 45%)" strokeWidth={0.8}
          animate={{ fillOpacity: [0.1, 0.25, 0.1], strokeOpacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <rect x="42" y="54" width="56" height="12" rx="6" fill="hsl(142, 71%, 45%)" fillOpacity={0.05} stroke="hsl(142, 71%, 45%)" strokeOpacity={0.1} strokeWidth={0.6} />
        <motion.path d="M50 60h36" stroke="hsl(142, 71%, 45%)" strokeLinecap="round" strokeWidth={1} animate={shimmer(0.8)} />
      </motion.g>
    </motion.g>
  </svg>
);

// Branded portal — window with breathing swatches
export const BrandingIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Browser window */}
    <motion.g
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <rect x="14" y="10" width="92" height="60" rx="6" fill="hsl(169, 76%, 48%)" fillOpacity={0.03} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.15} strokeWidth={0.8} />
      <path d="M14 22h92" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.1} strokeWidth={0.6} />
      {/* Window dots — staggered pulse */}
      {[24, 32, 40].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy="16" r="2"
          fill="hsl(169, 76%, 48%)"
          animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </motion.g>
    {/* Logo placeholder — breathing */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, type: 'spring', damping: 12 }}
    >
      <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="24" y="28" width="24" height="24" rx="6" fill="hsl(169, 76%, 48%)" fillOpacity={0.1} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.2} strokeWidth={0.8} />
        <path d="M32 36l4 4 4-4" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.4} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 40v-6" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.4} strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>
    </motion.g>
    {/* Color swatches — rotating pulse */}
    <motion.g
      initial={{ x: 12, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.65, duration: 0.4 }}
    >
      {[
        { cx: 62, color: 'hsl(169, 76%, 48%)', delay: 0 },
        { cx: 78, color: 'hsl(210, 100%, 52%)', delay: 0.5 },
        { cx: 94, color: 'hsl(38, 92%, 50%)', delay: 1 },
      ].map(s => (
        <motion.circle
          key={s.cx}
          cx={s.cx} cy="34" r="6"
          fill={s.color}
          animate={{ fillOpacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}
    </motion.g>
    {/* Text lines — shimmer */}
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 }}
    >
      <motion.path d="M56 50h40" stroke="hsl(169, 76%, 48%)" strokeWidth={1.5} strokeLinecap="round" animate={shimmer(0)} />
      <motion.path d="M56 56h28" stroke="hsl(169, 76%, 48%)" strokeWidth={1} strokeLinecap="round" animate={shimmer(0.3)} />
      <motion.path d="M24 58h18" stroke="hsl(169, 76%, 48%)" strokeWidth={1} strokeLinecap="round" animate={shimmer(0.6)} />
    </motion.g>
  </svg>
);

// Audit trail — shield breathing + log entries sliding
export const AuditIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Shield — breathing */}
    <motion.path
      d="M40 14l-20 8v18c0 14 10 26 20 30 10-4 20-16 20-30V22l-20-8z"
      fill="hsl(169, 76%, 48%)" strokeWidth={0.8}
      stroke="hsl(169, 76%, 48%)"
      animate={{ fillOpacity: [0.04, 0.08, 0.04], strokeOpacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Lock icon — subtle pulse */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, type: 'spring', damping: 10 }}
    >
      <motion.g animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="34" y="36" width="12" height="10" rx="2" fill="hsl(169, 76%, 48%)" fillOpacity={0.15} stroke="hsl(169, 76%, 48%)" strokeOpacity={0.3} strokeWidth={0.8} />
        <path d="M36 36v-4a4 4 0 018 0v4" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.25} strokeWidth={0.8} fill="none" />
        <motion.circle cx="40" cy="42" r="1.5" fill="hsl(169, 76%, 48%)"
          animate={{ fillOpacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
    </motion.g>
    {/* Log entries — float + shimmer */}
    {[
      { y: 16, color: 'hsl(169, 76%, 48%)', lineW: 28, delay: 0 },
      { y: 32, color: 'hsl(142, 71%, 45%)', lineW: 24, delay: 0.4 },
      { y: 48, color: 'hsl(210, 100%, 52%)', lineW: 30, delay: 0.8 },
    ].map((entry, i) => (
      <motion.g key={i}
        initial={{ x: 8, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 + i * 0.1 }}
      >
        <motion.g animate={float(entry.delay, 3.5, 1)}>
          <rect x="68" y={entry.y} width="40" height="10" rx="5" fill={entry.color} fillOpacity={0.06} stroke={entry.color} strokeOpacity={0.1} strokeWidth={0.5} />
          <motion.path d={`M74 ${entry.y + 5}h${entry.lineW}`} stroke={entry.color} strokeLinecap="round" strokeWidth={0.8} animate={shimmer(entry.delay)} />
        </motion.g>
      </motion.g>
    ))}
    {/* Timestamp dots — twinkling */}
    {[
      { cy: 21, color: 'hsl(169, 76%, 48%)', delay: 0.2 },
      { cy: 37, color: 'hsl(142, 71%, 45%)', delay: 0.7 },
      { cy: 53, color: 'hsl(210, 100%, 52%)', delay: 1.2 },
    ].map((dot, i) => (
      <motion.circle key={i} cx="66" cy={dot.cy} r="1.5" fill={dot.color}
        animate={{ fillOpacity: [0.1, 0.3, 0.1], scale: [0.8, 1.15, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
      />
    ))}
    <motion.path d="M66 23v8M66 39v8" stroke="hsl(169, 76%, 48%)" strokeOpacity={0.08} strokeWidth={0.5} />
  </svg>
);
