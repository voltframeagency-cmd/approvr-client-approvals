import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { statusConfig } from '@/lib/mock-data';

export const StatusBadge = ({ status, animated = false }: { status: string; animated?: boolean }) => {
  const config = statusConfig[status] || statusConfig.draft;
  const isActive = status === 'in_review' || status === 'changes_requested';

  return (
    <motion.span
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors',
        config.className
      )}
    >
      {isActive && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75',
            status === 'in_review' ? 'bg-info animate-ping' : 'bg-warning animate-ping'
          )} style={{ animationDuration: '2s' }} />
          <span className={cn(
            'relative inline-flex rounded-full h-1.5 w-1.5',
            status === 'in_review' ? 'bg-info' : 'bg-warning'
          )} />
        </span>
      )}
      {config.label}
    </motion.span>
  );
};
