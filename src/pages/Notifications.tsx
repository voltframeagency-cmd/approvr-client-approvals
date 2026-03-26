import { mockNotifications } from '@/lib/mock-data';
import { Bell, CheckCircle, MessageSquare, Upload, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons: Record<string, typeof Bell> = {
  approval: CheckCircle,
  comment: MessageSquare,
  upload: Upload,
  reminder: Clock,
};

const Notifications = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl font-bold">Notifications</h1>
    <div className="space-y-2 max-w-2xl">
      {mockNotifications.map(n => {
        const Icon = icons[n.type] || Bell;
        return (
          <div key={n.id} className={cn('flex items-start gap-4 p-4 rounded-xl border transition-colors', n.read ? 'bg-card' : 'bg-primary/[0.03] border-primary/20')}>
            <div className={cn('h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0', n.read ? 'bg-muted' : 'bg-primary/10')}>
              <Icon className={cn('h-4 w-4', n.read ? 'text-muted-foreground' : 'text-primary')} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={cn('text-sm font-medium', !n.read && 'text-foreground')}>{n.title}</p>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Notifications;
