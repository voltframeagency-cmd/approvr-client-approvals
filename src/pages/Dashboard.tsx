import { StatusBadge } from '@/components/app/StatusBadge';
import { mockProjects, mockActivity } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import { FolderKanban, Clock, CheckCircle, AlertTriangle, ArrowRight, FileText, MessageSquare, Upload, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statCards = [
  { label: 'Active projects', value: mockProjects.filter(p => p.status !== 'approved').length, icon: FolderKanban, color: 'text-primary' },
  { label: 'Pending reviews', value: mockProjects.filter(p => p.status === 'in_review').length, icon: Clock, color: 'text-info' },
  { label: 'Changes requested', value: mockProjects.filter(p => p.status === 'changes_requested').length, icon: AlertTriangle, color: 'text-warning' },
  { label: 'Approved', value: mockProjects.filter(p => p.status === 'approved').length, icon: CheckCircle, color: 'text-success' },
];

const activityIcons: Record<string, typeof FileText> = {
  approval: CheckCircle,
  comment: MessageSquare,
  upload: Upload,
  status_change: AlertTriangle,
  invite: UserPlus,
};

const Dashboard = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening across your projects.</p>
      </div>
      <Link to="/dashboard/projects">
        <Button className="gap-2">
          <FolderKanban className="h-4 w-4" />
          New project
        </Button>
      </Link>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map(card => (
        <div key={card.label} className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </div>
          <p className="text-2xl font-bold">{card.value}</p>
          <p className="text-sm text-muted-foreground">{card.label}</p>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-5 gap-6">
      {/* Projects */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Link to="/dashboard/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {mockProjects.slice(0, 4).map(project => (
            <Link key={project.id} to={`/dashboard/projects/${project.id}`} className="block rounded-xl border bg-card p-4 hover:shadow-md hover:shadow-primary/5 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium truncate">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.clientName}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span>{project.approvedCount}/{project.deliverableCount} approved</span>
                <span>Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(project.approvedCount / project.deliverableCount) * 100}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <div className="space-y-1">
          {mockActivity.map(item => {
            const Icon = activityIcons[item.type] || FileText;
            return (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{item.actor}</span>{' '}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.projectName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
