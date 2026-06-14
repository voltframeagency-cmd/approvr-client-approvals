import { motion } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
import { getLenis } from '@/hooks/use-smooth-scroll';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  // Ensure we reset scroll position immediately on mounting the route
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.985, y: -12, filter: 'blur(8px)' }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1], // Custom out-quint curve for organic acceleration
      }}
      className="w-full min-h-screen origin-top"
    >
      {children}
    </motion.div>
  );
};
