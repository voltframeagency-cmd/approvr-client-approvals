import { mockNotifications } from '@/lib/mock-data';
import { Bell, CheckCircle, MessageSquare, Upload, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const icons: Record<string, typeof Bell> = {
  approval: CheckCircle,
  comment: MessageSquare,
  upload: Upload,
  reminder: Clock,
};

const Notifications = () => (
  <div className="space-y-6">
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-bold"
    >
      Notifications
    </motion.h1>
    <div className="space-y-2 max-w-2xl">
      {mockNotifications.map((n, i) => {
        const Icon = icons[n.type] || Bell;
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 2 }}
            className={cn(
              'flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer',
              n.read ? 'bg-card hover:bg-muted/30' : 'bg-primary/[0.02] border-primary/15 hover:bg-primary/[0.04]'
            )}
          >
            <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0', n.read ? 'bg-muted/80' : 'bg-primary/[0.08]')}>
              <Icon className={cn('h-4 w-4', n.read ? 'text-muted-foreground' : 'text-primary')} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={cn('text-[13px] font-medium', !n.read && 'text-foreground')}>{n.title}</p>
                {!n.read && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 rounded-full bg-primary flex-shrink-0"
                  />
                )}
              </div>
              <p className="text-[13px] text-muted-foreground mt-0.5">{n.body}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default Notifications;
