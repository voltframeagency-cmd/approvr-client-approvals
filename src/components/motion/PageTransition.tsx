import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="relative">
      {/* Content Fade & Slide */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{
          duration: 0.5,
          ease: [0.2, 0.0, 0, 1.0], // Standard material easing
        }}
      >
        {children}
      </motion.div>

      {/* Wipe overlay for EXIT phase (slides up from bottom to cover viewport) */}
      <motion.div
        className="fixed inset-x-0 bottom-0 w-screen h-[110vh] z-[9999] pointer-events-none bg-gradient-to-br from-teal-900 via-primary to-cyan-950 shadow-[0_-12px_40px_rgba(0,0,0,0.3)]"
        initial={{ y: "100%", borderTopLeftRadius: "8rem", borderTopRightRadius: "8rem" }}
        exit={{ y: "0%", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem" }}
        transition={{
          duration: 0.55,
          ease: [0.76, 0, 0.24, 1], // Liquid acceleration curve
        }}
        style={{ originY: 1 }}
      >
        {/* Ambient glow inside overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </motion.div>

      {/* Wipe overlay for ENTRY phase (starts covering viewport, slides up and out to top) */}
      <motion.div
        className="fixed inset-x-0 top-0 w-screen h-[110vh] z-[9999] pointer-events-none bg-gradient-to-br from-teal-900 via-primary to-cyan-950 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
        initial={{ y: "0%", borderBottomLeftRadius: "0rem", borderBottomRightRadius: "0rem" }}
        animate={{ y: "-105%", borderBottomLeftRadius: "8rem", borderBottomRightRadius: "8rem" }}
        transition={{
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1], // Liquid acceleration curve
        }}
        style={{ originY: 0 }}
      >
        {/* Ambient glow inside overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </motion.div>
    </div>
  );
};
