import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

// ── Shared motion constants ──────────────────────────────────
export const EASING = {
  standard:   [0.2, 0.0, 0, 1.0] as const,
  enter:      [0.05, 0.7, 0.1, 1.0] as const,
  exit:       [0.3, 0.0, 0.8, 0.15] as const,
  expressive: [0.4, 0.14, 0.3, 1.0] as const,
};

export const DURATION = {
  micro: 0.15,
  structural: 0.35,
  large: 0.5,
};

export const STAGGER = 0.05;

// ── Variant presets ──────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const FadeUp = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: DURATION.structural, delay, ease: EASING.enter }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: DURATION.structural, delay, ease: EASING.standard }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: DURATION.structural, delay, ease: EASING.enter }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    variants={slideInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: DURATION.structural, delay, ease: EASING.standard }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className = '', staggerDelay = STAGGER }: { children: ReactNode; className?: string; staggerDelay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    transition={{ staggerChildren: staggerDelay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={fadeUp}
    transition={{ duration: DURATION.structural, ease: EASING.enter }}
    className={className}
  >
    {children}
  </motion.div>
);

export const HoverScale = ({ children, className = '', scale = 1.02 }: { children: ReactNode; className?: string; scale?: number }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className={className}
  >
    {children}
  </motion.div>
);
