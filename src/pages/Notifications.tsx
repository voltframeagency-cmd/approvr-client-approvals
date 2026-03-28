import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNotifications, Notification, providerTypeLabels } from '@/lib/mock-data';
import { useDemo } from '@/contexts/DemoContext';
import { 
  Bell, 
  CheckCircle2, 
  MessageSquare, 
  Upload, 
  Clock, 
  Filter, 
  Check, 
  Archive, 
  ExternalLink,
  AlertCircle,
  MoreVertical,
  Trash2,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const icons: Record<string, any> = {
  approval: CheckCircle2,
  comment: MessageSquare,
  upload: Upload,
  reminder: Clock,
};

const urgencyConfig: Record<string, { color: string; bg: string; border: string }> = {
  low: { color: 'text-muted-foreground', bg: 'bg-muted/50', border: 'border-muted' },
  medium: { color: 'text-info', bg: 'bg-info/5', border: 'border-info/20' },
  high: { color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20' },
  critical: { color: 'text-destructive', bg: 'bg-destructive/5', border: 'border-destructive/20' },
};

type FilterType = 'all' | 'unread' | 'approval' | 'comment' | 'reminder';

const Notifications = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (n.archived) return false;
      if (filter === 'unread') return !n.read;
      if (filter === 'all') return true;
      return n.type === filter;
    });
  }, [notifications, filter]);

  const groupedNotifications = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: Record<string, Notification[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    filteredNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).forEach(n => {
      const date = new Date(n.createdAt);
      if (date.toDateString() === today.toDateString()) {
        groups.Today.push(n);
      } else if (date.toDateString() === yesterday.toDateString()) {
        groups.Yesterday.push(n);
      } else {
        groups.Earlier.push(n);
      }
    });

    return groups;
  }, [filteredNotifications]);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    toast.success('Marked as read');
  };

  const handleArchive = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n));
    toast.success('Notification archived');
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 sm:pb-20 overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-5 sm:mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-bold tracking-tight"
          >
            Notifications
          </motion.h1>
          <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1">Manage project alerts and cues.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-[11px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 flex-shrink-0">
          Mark all read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-5 sm:mb-8 border-b pb-3 sm:pb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {(['all', 'unread', 'approval', 'comment', 'reminder'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all whitespace-nowrap flex-shrink-0",
              filter === f 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unread' && notifications.filter(n => !n.read && !n.archived).length > 0 && (
              <span className="ml-1.5 sm:ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px]">
                {notifications.filter(n => !n.read && !n.archived).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification Groups */}
      <div className="space-y-6 sm:space-y-10">
        {Object.entries(groupedNotifications).map(([group, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={group} className="space-y-2 sm:space-y-4">
              <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2 px-1">
                <Calendar className="h-3 w-3" /> {group}
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                <AnimatePresence mode="popLayout">
                  {items.map((n, i) => {
                    const Icon = icons[n.type] || Bell;
                    const urgency = urgencyConfig[n.urgency];
                    
                    return (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          'group relative flex items-start gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300',
                          n.read ? 'bg-card' : 'bg-primary/[0.01] border-primary/10 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]',
                          !n.read && `border-l-4 ${urgency.border.replace('border-', 'border-l-')}`
                        )}
                      >
                        {/* Icon Container */}
                        <div className={cn(
                          'h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                          n.read ? 'bg-muted/50' : urgency.bg
                        )}>
                          <Icon className={cn('h-3.5 w-3.5 sm:h-4.5 sm:w-4.5', n.read ? 'text-muted-foreground/60' : urgency.color)} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-12 sm:pr-8">
                          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 flex-wrap">
                            <p className={cn('text-[13px] sm:text-[14px] font-semibold tracking-tight leading-tight', !n.read ? 'text-foreground' : 'text-muted-foreground')}>
                              {n.title}
                            </p>
                            {n.urgency === 'critical' && (
                              <span className="bg-destructive/10 text-destructive text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded uppercase tracking-tighter flex items-center gap-0.5">
                                <AlertCircle className="h-2 w-2 sm:h-2.5 sm:w-2.5" /> Action Required
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1 leading-relaxed line-clamp-2">
                            {n.body}
                          </p>

                          {/* Context Tags */}
                          {(n.projectName || n.deliverableName) && (
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                              {n.projectName && (
                                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-muted/60 text-[10px] sm:text-[11px] font-medium text-muted-foreground border">
                                  {n.projectName}
                                </span>
                              )}
                              {n.deliverableName && (
                                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-primary/[0.03] text-[10px] sm:text-[11px] font-medium text-primary border border-primary/10">
                                  {n.deliverableName} {n.version && `v${n.version}`}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-2 sm:gap-3 mt-2.5 sm:mt-4">
                            {!n.read && (
                              <button 
                                onClick={() => handleMarkRead(n.id)}
                                className="text-[10px] sm:text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                              >
                                <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Mark Read
                              </button>
                            )}
                            <button 
                              onClick={() => handleArchive(n.id)}
                              className="text-[10px] sm:text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                              <Archive className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Archive
                            </button>
                            {n.projectId && (
                              <button 
                                onClick={() => navigate(`/dashboard/projects/${n.projectId}`)}
                                className="text-[10px] sm:text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
                              >
                                <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> View Project
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col items-end gap-1 sm:gap-2">
                          <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground/60 tabular-nums">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-34">
                              <DropdownMenuItem className="text-xs" onClick={() => handleMarkRead(n.id)}>
                                <Check className="h-3.5 w-3.5 mr-2" /> Mark as read
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs" onClick={() => handleArchive(n.id)}>
                                <Archive className="h-3.5 w-3.5 mr-2" /> Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs text-destructive focus:text-destructive" onClick={() => handleArchive(n.id)}>
                                <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 sm:py-24 text-center"
          >
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/40" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">All caught up</h3>
            <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-1 max-w-[240px]">
              No {filter !== 'all' ? filter : ''} notifications to show right now.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
