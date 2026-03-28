import { motion } from 'framer-motion';
import { Eye, Monitor, Smartphone, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockClientViewEvents, type ClientViewEvent } from '@/lib/mock-data';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

const DeviceIcon = ({ device }: { device: string }) => {
  return device === 'mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />;
};

export const ClientActivityTracker = () => {
  const recentEvents = mockClientViewEvents
    .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
    .slice(0, 5);

  const hasRecentActivity = recentEvents.some(e => {
    const diff = Date.now() - new Date(e.viewedAt).getTime();
    return diff < 3600000; // within last hour
  });

  return (
    <section className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            {hasRecentActivity && (
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Client Activity</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Real-time read receipts</p>
          </div>
        </div>
      </div>

      <StaggerContainer className="space-y-2" staggerDelay={0.04}>
        {recentEvents.map((event) => {
          const isRecent = Date.now() - new Date(event.viewedAt).getTime() < 3600000;
          return (
            <StaggerItem key={event.id}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "card-elevated p-3.5 md:p-4 flex items-center gap-3 md:gap-4 border-none ring-1 ring-border/60",
                  isRecent && "ring-primary/20 bg-primary/[0.02]"
                )}
              >
                <div className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0",
                  isRecent ? "bg-emerald-500/10" : "bg-muted/60"
                )}>
                  <div className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    isRecent ? "bg-emerald-500" : "bg-muted-foreground/30"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-foreground truncate">
                    <span className="text-primary/90">{event.clientName}</span>
                    {' '}viewed{' '}
                    <span className="font-semibold">{event.deliverableTitle}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      {formatDuration(event.durationSeconds)}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                      <DeviceIcon device={event.device} />
                      {event.device}
                    </span>
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider flex-shrink-0",
                  isRecent ? "text-emerald-500" : "text-muted-foreground/60"
                )}>
                  {timeAgo(event.viewedAt)}
                </span>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};
