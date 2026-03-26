import { StatusBadge } from '@/components/app/StatusBadge';
import { mockProjects, mockActivity } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import { FolderKanban, Clock, CheckCircle, AlertTriangle, ArrowRight, FileText, MessageSquare, Upload, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';

const statCards = [
  { label: 'Active projects', value: mockProjects.filter(p => p.status !== 'approved').length, icon: FolderKanban, accent: 'primary' },
  { label: 'Pending reviews', value: mockProjects.filter(p => p.status === 'in_review').length, icon: Clock, accent: 'info' },
  { label: 'Changes requested', value: mockProjects.filter(p => p.status === 'changes_requested').length, icon: AlertTriangle, accent: 'warning' },
  { label: 'Approved', value: mockProjects.filter(p => p.status === 'approved').length, icon: CheckCircle, accent: 'success' },
];

const accentColors: Record<string, string> = {
  primary: 'text-primary bg-primary/[0.08]',
  info: 'text-info bg-info/[0.08]',
  warning: 'text-warning bg-warning/[0.08]',
  success: 'text-success bg-success/[0.08]',
};

const activityIcons: Record<string, typeof FileText> = {
  approval: CheckCircle,
  comment: MessageSquare,
  upload: Upload,
  status_change: AlertTriangle,
  invite: UserPlus,
};

const Dashboard = () => (
  <div className="space-y-8">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
        <p className="text-muted-foreground mt-1 text-sm">Here's what's happening across your projects.</p>
      </div>
      <Link to="/dashboard/projects">
        <Button className="gap-2">
          <FolderKanban className="h-4 w-4" />
          New project
        </Button>
      </Link>
    </motion.div>

    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.06}>
      {statCards.map(card => (
        <StaggerItem key={card.label}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="card-elevated p-5"
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

    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Projects</h2>
          <Link to="/dashboard/projects" className="text-[13px] text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <StaggerContainer className="space-y-2.5" staggerDelay={0.05}>
          {mockProjects.slice(0, 4).map(project => (
            <StaggerItem key={project.id}>
              <Link to={`/dashboard/projects/${project.id}`}>
                <motion.div
                  whileHover={{ y: -1, boxShadow: '0 4px 20px -4px hsl(160 84% 39% / 0.06)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="card-elevated p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-[14px] truncate">{project.name}</p>
                      <p className="text-[13px] text-muted-foreground">{project.clientName}</p>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>{project.approvedCount}/{project.deliverableCount} approved</span>
                    <span>Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
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
      </div>

      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-base font-semibold">Recent activity</h2>
        <div className="space-y-0.5">
          {mockActivity.map((item, i) => {
            const Icon = activityIcons[item.type] || FileText;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-muted/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug">
                    <span className="font-medium">{item.actor}</span>{' '}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.projectName}</p>
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
