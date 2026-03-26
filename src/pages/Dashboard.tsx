import { StatusBadge } from '@/components/app/StatusBadge';
import { mockProjects, mockActivity, mockDeliverables } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import {
  FolderKanban, Clock, CheckCircle, AlertTriangle, ArrowRight,
  FileText, MessageSquare, Upload, UserPlus, Eye, AlertCircle, ExternalLink, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';

// Derive attention items
const overdueProjects = mockProjects.filter(p => p.isOverdue && p.status !== 'approved');
const changesRequested = mockProjects.filter(p => p.status === 'changes_requested');
const pendingReview = mockProjects.filter(p => p.status === 'in_review');
const recentApprovals = mockProjects.filter(p => p.status === 'approved');

const attentionItems = [
  ...overdueProjects.map(p => ({ ...p, urgency: 'overdue' as const, urgencyLabel: 'Overdue', urgencyColor: 'text-destructive bg-destructive/[0.08]' })),
  ...changesRequested.filter(p => !p.isOverdue).map(p => ({ ...p, urgency: 'changes' as const, urgencyLabel: 'Changes requested', urgencyColor: 'text-warning bg-warning/[0.08]' })),
  ...pendingReview.filter(p => !p.isOverdue).map(p => ({ ...p, urgency: 'pending' as const, urgencyLabel: 'Awaiting client', urgencyColor: 'text-info bg-info/[0.08]' })),
];

// Reordered: urgency-first
const statCards = [
  { label: 'Needs attention', value: attentionItems.length, icon: AlertCircle, accent: 'destructive' },
  { label: 'Changes requested', value: changesRequested.length, icon: AlertTriangle, accent: 'warning' },
  { label: 'Pending reviews', value: pendingReview.length, icon: Clock, accent: 'info' },
  { label: 'Approved', value: recentApprovals.length, icon: CheckCircle, accent: 'success' },
];

const accentColors: Record<string, string> = {
  destructive: 'text-destructive bg-destructive/[0.08]',
  info: 'text-info bg-info/[0.08]',
  warning: 'text-warning bg-warning/[0.08]',
  success: 'text-success bg-success/[0.08]',
};

const accentBorders: Record<string, string> = {
  destructive: 'border-l-destructive',
  info: 'border-l-info',
  warning: 'border-l-warning',
  success: 'border-l-success',
};

const activityIcons: Record<string, typeof FileText> = {
  approval: CheckCircle,
  comment: MessageSquare,
  upload: Upload,
  status_change: AlertTriangle,
  invite: UserPlus,
  view: Eye,
};

// Filter to approval-relevant activity only
const approvalActivity = mockActivity.filter(a =>
  ['approval', 'comment', 'status_change', 'view'].includes(a.type)
);

// Active approvals: non-draft, non-approved
const activeApprovals = mockProjects.filter(p => p.status !== 'draft' && p.status !== 'approved');

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

const Dashboard = () => (
  <div className="space-y-8">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold">Approval overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Here's what's blocked, waiting, or ready.</p>
      </div>
      <Link to="/dashboard/projects">
        <Button className="gap-2">
          <FolderKanban className="h-4 w-4" />
          New project
        </Button>
      </Link>
    </motion.div>

    {/* Stat cards */}
    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.06}>
      {statCards.map(card => (
        <StaggerItem key={card.label}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`card-elevated p-5 border-l-2 ${accentBorders[card.accent]}`}
          >
            <div className={`h-9 w-9 rounded-xl flex items-center justify-center mb-3 ${accentColors[card.accent]}`}>
              <card.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold tracking-tight">{card.value}</p>
            <p className="text-[13px] text-muted-foreground mt-0.5">{card.label}</p>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>

    {/* Attention queue */}
    {attentionItems.length > 0 ? (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <h2 className="text-base font-semibold">Needs attention</h2>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{attentionItems.length}</span>
        </div>
        <StaggerContainer className="space-y-2" staggerDelay={0.04}>
          {attentionItems.map(item => (
            <StaggerItem key={item.id}>
              <Link to={`/dashboard/projects/${item.id}`}>
                <motion.div
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="card-elevated p-4 flex items-center gap-4"
                >
                  <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${item.urgencyColor}`}>
                    {item.urgencyLabel}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[14px] truncate">{item.name}</p>
                    <p className="text-[12px] text-muted-foreground">{item.clientName}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[12px] text-muted-foreground">
                    <span className="font-mono">{item.approvedCount}/{item.deliverableCount} approved</span>
                    {item.isOverdue && (
                      <span className="flex items-center gap-1 text-warning">
                        <Bell className="h-3 w-3" />
                        Reminder sent 2d ago
                      </span>
                    )}
                    {item.lastViewedByClient && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {timeAgo(item.lastViewedByClient)}
                      </span>
                    )}
                    <span>Due {new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-8 text-center"
      >
        <CheckCircle className="h-8 w-8 mx-auto mb-3 text-success/40" />
        <p className="font-medium text-[15px]">All caught up</p>
        <p className="text-[13px] text-muted-foreground mt-1">No blocked approvals right now.</p>
      </motion.div>
    )}

    <div className="grid lg:grid-cols-5 gap-6">
      {/* Active approvals */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Active approvals</h2>
          <Link to="/dashboard/projects" className="text-[13px] text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {activeApprovals.length > 0 ? (
          <StaggerContainer className="space-y-2.5" staggerDelay={0.05}>
            {activeApprovals.slice(0, 5).map(project => (
              <StaggerItem key={project.id}>
                <Link to={`/dashboard/projects/${project.id}`}>
                  <motion.div
                    whileHover={{ y: -1, boxShadow: '0 4px 20px -4px hsl(160 84% 39% / 0.06)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="card-elevated p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-[14px] truncate">{project.name}</p>
                        <p className="text-[13px] text-muted-foreground">{project.clientName}</p>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="font-mono">{project.approvedCount}/{project.deliverableCount} approved</span>
                      <span>Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      {project.lastViewedByClient && (
                        <span className="flex items-center gap-1 ml-auto">
                          <Eye className="h-3 w-3" />
                          Client viewed {timeAgo(project.lastViewedByClient)}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(project.approvedCount / project.deliverableCount) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="card-elevated p-8 text-center">
            <FolderKanban className="h-6 w-6 mx-auto mb-2 text-muted-foreground/30" />
            <p className="text-[13px] text-muted-foreground">No active approvals. Create a project to get started.</p>
          </div>
        )}
      </div>

      {/* Activity feed */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-base font-semibold">Approval activity</h2>
        <div className="divide-y divide-border/50">
          {approvalActivity.map((item, i) => {
            const Icon = activityIcons[item.type] || FileText;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 py-3 first:pt-0"
              >
                <div className="h-7 w-7 rounded-full bg-muted/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug">
                    <span className="font-medium">{item.actor}</span>{' '}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                    <span>{item.projectName}</span>
                    <span>·</span>
                    <span>{timeAgo(item.createdAt)}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
