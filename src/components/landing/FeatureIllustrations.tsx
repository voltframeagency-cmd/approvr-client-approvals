import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

// Upload deliverables — files floating into a folder
export const UploadIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Folder back */}
    <motion.path
      d="M16 28h88a4 4 0 014 4v40a4 4 0 01-4 4H16a4 4 0 01-4 4V32a4 4 0 014-4z"
      fill="hsl(160, 84%, 39%)" fillOpacity={0.06}
      stroke="hsl(160, 84%, 39%)" strokeOpacity={0.2} strokeWidth={1}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
    />
    {/* Folder tab */}
    <motion.path
      d="M16 28l8-12h24l8 12"
      stroke="hsl(160, 84%, 39%)" strokeOpacity={0.3} strokeWidth={1}
      fill="hsl(160, 84%, 39%)" fillOpacity={0.04}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
    />
    {/* File 1 */}
    <motion.g
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4, type: 'spring', damping: 12 }}
    >
      <rect x="36" y="34" width="20" height="26" rx="2" fill="hsl(160, 84%, 39%)" fillOpacity={0.1} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.25} strokeWidth={0.8} />
      <path d="M40 42h12M40 46h8M40 50h10" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.3} strokeWidth={0.6} />
    </motion.g>
    {/* File 2 */}
    <motion.g
      initial={{ y: -28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.55, type: 'spring', damping: 12 }}
    >
      <rect x="62" y="36" width="20" height="26" rx="2" fill="hsl(210, 100%, 52%)" fillOpacity={0.08} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={0.8} />
      <rect x="66" y="42" width="12" height="8" rx="1" fill="hsl(210, 100%, 52%)" fillOpacity={0.1} />
      <path d="M66 54h12" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={0.6} />
    </motion.g>
    {/* Upload arrow */}
    <motion.path
      d="M60 18V8M55 13l5-5 5 5"
      stroke="hsl(160, 84%, 39%)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      variants={draw} initial="hidden" whileInView="visible"
      viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
    />
  </svg>
);

// Threaded feedback — chat bubbles stacking
export const FeedbackIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Bubble 1 — left (client) */}
    <motion.g
      initial={{ x: -16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <rect x="12" y="12" width="52" height="20" rx="10" fill="hsl(160, 84%, 39%)" fillOpacity={0.08} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.2} strokeWidth={0.8} />
      <path d="M24 20h28" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.25} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M24 26h16" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.15} strokeWidth={1} strokeLinecap="round" />
      <circle cx="16" cy="22" r="4" fill="hsl(160, 84%, 39%)" fillOpacity={0.15} />
    </motion.g>
    {/* Bubble 2 — right (agency) */}
    <motion.g
      initial={{ x: 16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      <rect x="56" y="38" width="52" height="20" rx="10" fill="hsl(210, 100%, 52%)" fillOpacity={0.06} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.15} strokeWidth={0.8} />
      <path d="M68 46h28" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M68 52h20" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.12} strokeWidth={1} strokeLinecap="round" />
      <circle cx="104" cy="48" r="4" fill="hsl(210, 100%, 52%)" fillOpacity={0.12} />
    </motion.g>
    {/* Bubble 3 — left again */}
    <motion.g
      initial={{ x: -16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <rect x="12" y="62" width="40" height="14" rx="7" fill="hsl(160, 84%, 39%)" fillOpacity={0.06} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.15} strokeWidth={0.8} />
      <path d="M22 69h20" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.2} strokeWidth={1} strokeLinecap="round" />
    </motion.g>
    {/* Connector line */}
    <motion.path
      d="M38 32v6M82 58v4"
      stroke="hsl(160, 84%, 39%)" strokeOpacity={0.1} strokeWidth={0.5} strokeDasharray="2 2"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ delay: 0.6 }}
    />
  </svg>
);

// One-click approval — checkmark with ripple
export const ApprovalIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Outer ripple */}
    <motion.circle
      cx="60" cy="40" r="32"
      stroke="hsl(142, 71%, 45%)" strokeOpacity={0.08} strokeWidth={1}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    />
    {/* Mid ripple */}
    <motion.circle
      cx="60" cy="40" r="24"
      stroke="hsl(142, 71%, 45%)" strokeOpacity={0.12} strokeWidth={1}
      fill="hsl(142, 71%, 45%)" fillOpacity={0.02}
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.35 }}
    />
    {/* Inner circle */}
    <motion.circle
      cx="60" cy="40" r="16"
      fill="hsl(142, 71%, 45%)" fillOpacity={0.08}
      stroke="hsl(142, 71%, 45%)" strokeOpacity={0.2} strokeWidth={1}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2, type: 'spring', damping: 12 }}
    />
    {/* Checkmark */}
    <motion.path
      d="M52 40l5 5 11-11"
      stroke="hsl(142, 71%, 45%)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      variants={draw} initial="hidden" whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.6 }}
    />
    {/* Small sparkles */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.3 }}
    >
      <circle cx="88" cy="18" r="1.5" fill="hsl(142, 71%, 45%)" fillOpacity={0.25} />
      <circle cx="32" cy="60" r="1" fill="hsl(142, 71%, 45%)" fillOpacity={0.2} />
      <circle cx="92" cy="55" r="1" fill="hsl(142, 71%, 45%)" fillOpacity={0.15} />
      <circle cx="28" cy="22" r="1.5" fill="hsl(142, 71%, 45%)" fillOpacity={0.2} />
    </motion.g>
  </svg>
);

// Activity timeline — vertical timeline with dots
export const TimelineIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Timeline line */}
    <motion.path
      d="M30 8v64"
      stroke="hsl(160, 84%, 39%)" strokeOpacity={0.15} strokeWidth={1.5}
      variants={draw} initial="hidden" whileInView="visible"
      viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
    />
    {/* Event 1 */}
    <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
      <circle cx="30" cy="16" r="4" fill="hsl(160, 84%, 39%)" fillOpacity={0.2} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.3} strokeWidth={0.8} />
      <rect x="42" y="10" width="60" height="12" rx="6" fill="hsl(160, 84%, 39%)" fillOpacity={0.06} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.12} strokeWidth={0.6} />
      <path d="M50 16h40" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.15} strokeWidth={1} strokeLinecap="round" />
    </motion.g>
    {/* Event 2 */}
    <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.55 }}>
      <circle cx="30" cy="38" r="4" fill="hsl(210, 100%, 52%)" fillOpacity={0.15} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.2} strokeWidth={0.8} />
      <rect x="42" y="32" width="50" height="12" rx="6" fill="hsl(210, 100%, 52%)" fillOpacity={0.05} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.1} strokeWidth={0.6} />
      <path d="M50 38h32" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.12} strokeWidth={1} strokeLinecap="round" />
    </motion.g>
    {/* Event 3 */}
    <motion.g initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
      <circle cx="30" cy="60" r="4" fill="hsl(142, 71%, 45%)" fillOpacity={0.15} stroke="hsl(142, 71%, 45%)" strokeOpacity={0.2} strokeWidth={0.8} />
      <rect x="42" y="54" width="56" height="12" rx="6" fill="hsl(142, 71%, 45%)" fillOpacity={0.05} stroke="hsl(142, 71%, 45%)" strokeOpacity={0.1} strokeWidth={0.6} />
      <path d="M50 60h36" stroke="hsl(142, 71%, 45%)" strokeOpacity={0.12} strokeWidth={1} strokeLinecap="round" />
    </motion.g>
  </svg>
);

// Branded portal — window with color swatch + logo
export const BrandingIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Browser window */}
    <motion.g
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <rect x="14" y="10" width="92" height="60" rx="6" fill="hsl(160, 84%, 39%)" fillOpacity={0.03} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.15} strokeWidth={0.8} />
      <path d="M14 22h92" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.1} strokeWidth={0.6} />
      <circle cx="24" cy="16" r="2" fill="hsl(160, 84%, 39%)" fillOpacity={0.15} />
      <circle cx="32" cy="16" r="2" fill="hsl(160, 84%, 39%)" fillOpacity={0.1} />
      <circle cx="40" cy="16" r="2" fill="hsl(160, 84%, 39%)" fillOpacity={0.1} />
    </motion.g>
    {/* Logo placeholder */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, type: 'spring', damping: 12 }}
    >
      <rect x="24" y="28" width="24" height="24" rx="6" fill="hsl(160, 84%, 39%)" fillOpacity={0.1} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.2} strokeWidth={0.8} />
      <path d="M32 36l4 4 4-4" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.4} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 40v-6" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.4} strokeWidth={1.2} strokeLinecap="round" />
    </motion.g>
    {/* Color swatches */}
    <motion.g
      initial={{ x: 12, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.65, duration: 0.4 }}
    >
      <circle cx="62" cy="34" r="6" fill="hsl(160, 84%, 39%)" fillOpacity={0.25} />
      <circle cx="78" cy="34" r="6" fill="hsl(210, 100%, 52%)" fillOpacity={0.18} />
      <circle cx="94" cy="34" r="6" fill="hsl(38, 92%, 50%)" fillOpacity={0.18} />
    </motion.g>
    {/* Text lines */}
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 }}
    >
      <path d="M56 50h40" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.1} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M56 56h28" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.07} strokeWidth={1} strokeLinecap="round" />
      <path d="M24 58h18" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.07} strokeWidth={1} strokeLinecap="round" />
    </motion.g>
  </svg>
);

// Audit trail — shield with lock + log lines
export const AuditIllustration = () => (
  <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
    {/* Shield */}
    <motion.path
      d="M40 14l-20 8v18c0 14 10 26 20 30 10-4 20-16 20-30V22l-20-8z"
      fill="hsl(160, 84%, 39%)" fillOpacity={0.05}
      stroke="hsl(160, 84%, 39%)" strokeOpacity={0.2} strokeWidth={0.8}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    {/* Lock icon inside shield */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, type: 'spring', damping: 10 }}
    >
      <rect x="34" y="36" width="12" height="10" rx="2" fill="hsl(160, 84%, 39%)" fillOpacity={0.15} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.3} strokeWidth={0.8} />
      <path d="M36 36v-4a4 4 0 018 0v4" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.25} strokeWidth={0.8} fill="none" />
      <circle cx="40" cy="42" r="1.5" fill="hsl(160, 84%, 39%)" fillOpacity={0.3} />
    </motion.g>
    {/* Log entries */}
    <motion.g initial={{ x: 8, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
      <rect x="68" y="16" width="40" height="10" rx="5" fill="hsl(160, 84%, 39%)" fillOpacity={0.06} stroke="hsl(160, 84%, 39%)" strokeOpacity={0.1} strokeWidth={0.5} />
      <path d="M74 21h28" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.12} strokeWidth={0.8} strokeLinecap="round" />
    </motion.g>
    <motion.g initial={{ x: 8, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
      <rect x="68" y="32" width="40" height="10" rx="5" fill="hsl(142, 71%, 45%)" fillOpacity={0.05} stroke="hsl(142, 71%, 45%)" strokeOpacity={0.1} strokeWidth={0.5} />
      <path d="M74 37h24" stroke="hsl(142, 71%, 45%)" strokeOpacity={0.12} strokeWidth={0.8} strokeLinecap="round" />
    </motion.g>
    <motion.g initial={{ x: 8, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
      <rect x="68" y="48" width="40" height="10" rx="5" fill="hsl(210, 100%, 52%)" fillOpacity={0.05} stroke="hsl(210, 100%, 52%)" strokeOpacity={0.1} strokeWidth={0.5} />
      <path d="M74 53h30" stroke="hsl(210, 100%, 52%)" strokeOpacity={0.1} strokeWidth={0.8} strokeLinecap="round" />
    </motion.g>
    {/* Timestamp dots */}
    <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }}>
      <circle cx="66" cy="21" r="1.5" fill="hsl(160, 84%, 39%)" fillOpacity={0.2} />
      <circle cx="66" cy="37" r="1.5" fill="hsl(142, 71%, 45%)" fillOpacity={0.2} />
      <circle cx="66" cy="53" r="1.5" fill="hsl(210, 100%, 52%)" fillOpacity={0.15} />
      <path d="M66 23v8M66 39v8" stroke="hsl(160, 84%, 39%)" strokeOpacity={0.08} strokeWidth={0.5} />
    </motion.g>
  </svg>
);
