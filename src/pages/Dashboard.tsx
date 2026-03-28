import { useState } from 'react';
import { StatusBadge } from '@/components/app/StatusBadge';
import { mockProjects, mockActivity } from '@/lib/mock-data';
import { useDemo } from '@/contexts/DemoContext';
import { Link } from 'react-router-dom';
import {
  FolderKanban, Clock, CheckCircle, AlertTriangle, ArrowRight,
  FileText, MessageSquare, Upload, UserPlus, Eye, AlertCircle, ArrowUpRight, Sparkles, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import { useFounderBeta } from '@/hooks/use-founder-beta';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ClientActivityTracker } from '@/components/app/ClientActivityTracker';
import { OnboardingChecklist, OnboardingWelcome } from '@/components/app/OnboardingChecklist';
import { useOnboarding } from '@/hooks/use-onboarding';

// Derive attention items
const overdueProjects = mockProjects.filter(p => p.isOverdue && p.status !== 'approved');
const changesRequested = mockProjects.filter(p => p.status === 'changes_requested');
const pendingReview = mockProjects.filter(p => p.status === 'in_review');
const recentApprovals = mockProjects.filter(p => p.status === 'approved');

const attentionItems = [
  ...overdueProjects.map(p => ({ ...p, urgency: 'overdue' as const, urgencyLabel: 'Overdue', urgencyColor: 'text-destructive bg-destructive/5 dark:bg-destructive/10' })),
  ...changesRequested.filter(p => !p.isOverdue).map(p => ({ ...p, urgency: 'changes' as const, urgencyLabel: 'Changes requested', urgencyColor: 'text-warning bg-warning/5 dark:bg-warning/10' })),
  ...pendingReview.filter(p => !p.isOverdue).map(p => ({ ...p, urgency: 'pending' as const, urgencyLabel: 'Awaiting client', urgencyColor: 'text-primary bg-primary/5 dark:bg-primary/10' })),
];

const statCards = [
  { label: 'Requires Attention', value: attentionItems.length, icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/5', borderColor: 'border-destructive' },
  { label: 'Feedback Received', value: changesRequested.length, icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/5', borderColor: 'border-warning' },
  { label: 'Pending Review', value: pendingReview.length, icon: Clock, color: 'text-primary', bg: 'bg-primary/5', borderColor: 'border-primary' },
  { label: 'Approved this week', value: recentApprovals.length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/5', borderColor: 'border-emerald-500' },
];

const activityIcons: Record<string, typeof FileText> = {
  approval: CheckCircle,
  comment: MessageSquare,
  upload: Upload,
  status_change: AlertTriangle,
  invite: UserPlus,
  view: Eye,
};

const getProgressColor = (status: string, isOverdue: boolean) => {
  if (isOverdue) return 'bg-destructive';
  if (status === 'changes_requested') return 'bg-warning';
  if (status === 'approved') return 'bg-emerald-500';
  return 'bg-primary';
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

const Dashboard = () => {
  const beta = useFounderBeta();
  const onboarding = useOnboarding();
  const activeApprovals = mockProjects.filter(p => p.status !== 'draft' && p.status !== 'approved');

  return (
    <div className="space-y-6 lg:space-y-12">
      {/* Welcome dialog for first-time users */}
      {onboarding.showWelcome && <OnboardingWelcome onDismiss={onboarding.dismissWelcome} />}
      {/* Beta Usage Banner */}
      {(beta.isProjectLimitReached || beta.isEventLimitReached || beta.daysRemaining < 7) && (
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <Alert variant={beta.isExpired || beta.isProjectLimitReached ? "destructive" : "default"} className="bg-card/50 shadow-sm border-primary/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <Sparkles className="h-5 w-5 text-primary mb-2" />
            <AlertTitle className="text-base font-bold tracking-tight">
              {beta.isExpired ? "Founder Beta Expired" : "Founder Beta Early Access"}
            </AlertTitle>
            <AlertDescription className="text-[13px] text-muted-foreground mt-1.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="font-medium">
                {beta.isProjectLimitReached 
                  ? `You've reached your ${beta.projectLimit} project limit. ` 
                  : beta.isEventLimitReached 
                    ? `You've reached your ${beta.eventLimit} approval event limit. `
                    : `Your early access expires in ${beta.daysRemaining} days. `}
                Upgrade to Pro to scale your agency.
              </span>
              <Link to="/dashboard/settings">
                <Button size="sm" className="rounded-xl font-bold shadow-sm px-5 h-9">
                  Upgrade Plan <ArrowRight className="h-3.5 w-3.5 ml-2" />
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-1 md:mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-xs md:text-base font-medium">Welcome back, Alex Rivera.</p>
        </div>
        <Link to="/dashboard/projects">
          <Button className="rounded-xl shadow-lg shadow-primary/20 px-5 md:px-6 font-bold gap-2 h-10 md:h-11 border-none text-sm w-full md:w-auto">
            <FolderKanban className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </header>

      {/* Stat cards */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6" staggerDelay={0.06}>
        {statCards.map(card => (
          <StaggerItem key={card.label}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                "card-elevated p-4 md:p-6 relative overflow-hidden group border-none ring-1 ring-border/60",
                "before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-transparent hover:before:bg-current transition-all",
                card.color
              )}
            >
              <div className={cn("h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5 transition-transform group-hover:scale-110", card.bg)}>
                <card.icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">{card.value}</p>
              <p className="text-[10px] md:text-[12px] font-bold text-muted-foreground/80 mt-0.5 md:mt-1 uppercase tracking-widest">{card.label}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Onboarding Checklist */}
      {onboarding.isVisible && (
        <OnboardingChecklist />
      )}

      {/* Client Activity Tracker */}
      <ClientActivityTracker />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-12">
        {/* Left Column: Projects & Attention */}
        <div className="lg:col-span-3 space-y-8 md:space-y-12">
          {/* Attention queue */}
          {attentionItems.length > 0 && (
            <section className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight">Project Attention</h2>
                </div>
                <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-muted/60 text-muted-foreground border-none">
                  {attentionItems.length} items
                </Badge>
              </div>
              <StaggerContainer className="space-y-3" staggerDelay={0.04}>
                {attentionItems.map(item => (
                  <StaggerItem key={item.id}>
                    <Link to={`/dashboard/projects/${item.id}`}>
                       <motion.div
                          whileHover={{ x: 4 }}
                          className="card-elevated p-3.5 md:p-5 flex items-center gap-3 md:gap-5 border-none ring-1 ring-border/60 hover:ring-2 hover:ring-primary/20"
                      >
                        <div className={cn("px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] uppercase font-extrabold tracking-wider whitespace-nowrap", item.urgencyColor)}>
                          {item.urgencyLabel}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm md:text-[15px] truncate text-foreground">{item.name}</p>
                          <p className="text-[12px] text-muted-foreground font-medium">{item.clientName}</p>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-1.5">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{item.approvedCount}/{item.deliverableCount} Approved</span>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                             <Clock className="h-3 w-3" />
                             Due {new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 flex-shrink-0 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* Active Approvals */}
           <section className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-lg md:text-xl font-bold tracking-tight">Active Approvals</h2>
               <Link to="/dashboard/projects" className="text-[13px] font-bold text-primary hover:underline flex items-center gap-1.5 group">
                 View all <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
               </Link>
            </div>
            {activeApprovals.length > 0 ? (
              <StaggerContainer className="grid gap-3 md:gap-4" staggerDelay={0.05}>
                {activeApprovals.slice(0, 5).map(project => (
                  <StaggerItem key={project.id}>
                    <div className="relative group/card">
                      <Link to={`/dashboard/projects/${project.id}`}>
                         <motion.div
                           className="card-elevated p-4 md:p-6 border-none ring-1 ring-border/60 group"
                         >
                           <div className="flex items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                             <div className="min-w-0">
                               <p className="font-bold text-sm md:text-[16px] truncate group-hover:text-primary transition-colors duration-300 text-foreground">{project.name}</p>
                               <p className="text-xs md:text-[13px] text-muted-foreground font-medium mt-0.5">{project.clientName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <StatusBadge status={project.status} />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-lg opacity-0 group-hover/card:opacity-100 transition-all hover:bg-primary/5 hover:text-primary text-muted-foreground/40"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toast.success(`Gentle nudge sent to ${project.clientName.split(' ')[0]}`, {
                                    description: "They'll receive a premium, low-pressure reminder.",
                                    icon: <Bell className="h-4 w-4" />,
                                  });
                                }}
                              >
                                <Bell className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
                               <span>Progress</span>
                               <div className="flex items-center gap-4 text-right">
                                  {project.lastViewedByClient && (
                                    <span className="flex items-center gap-1 text-[10px] text-emerald-500/80 lowercase">
                                      <Eye className="h-2.5 w-2.5" />
                                      viewed {timeAgo(project.lastViewedByClient)}
                                    </span>
                                  )}
                                  <span className="font-mono">{Math.round((project.approvedCount / project.deliverableCount) * 100)}%</span>
                               </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(project.approvedCount / project.deliverableCount) * 100}%` }}
                                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className={cn("h-full rounded-full transition-colors duration-500", getProgressColor(project.status, project.isOverdue || false))}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="card-elevated p-12 text-center border-none ring-1 ring-border/40">
                <FolderKanban className="h-10 w-10 mx-auto mb-4 text-muted-foreground/20" />
                <p className="font-bold text-foreground">Start your first approval</p>
                <p className="text-[13px] text-muted-foreground mt-2 max-w-xs mx-auto">Projects you create will appear here for tracking and client feedback.</p>
                <Link to="/dashboard/projects" className="inline-block mt-6">
                   <Button size="sm" className="rounded-xl font-bold px-6">Create Project</Button>
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-2 space-y-6 md:space-y-10">
          <section className="space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-bold tracking-tight">Recent Activity</h2>
            <div className="relative pl-8 md:pl-10 space-y-6 md:space-y-8 before:absolute before:left-[9px] md:before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
              {mockActivity.slice(0, 8).map((item, i) => {
                const Icon = activityIcons[item.type] || FileText;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute -left-[37px] md:-left-[45px] top-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-card flex items-center justify-center ring-4 ring-background z-10">
                      <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-muted/50 border flex items-center justify-center text-primary group-hover:border-primary/40 transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs md:text-[13px] leading-relaxed text-foreground">
                        <span className="font-bold">{item.actor}</span>{' '}
                        <span className="text-muted-foreground font-medium">{item.action}</span>{' '}
                        <span className="font-bold text-primary/90 hover:underline cursor-pointer transition-all">{item.projectName}</span>
                      </p>
                      <time className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{timeAgo(item.createdAt)}</time>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Mini Upgrade Card */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-card dark:via-card dark:to-card text-white dark:text-foreground border-none rounded-2xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
              <CardContent className="p-5 md:p-6 relative z-10">
                <Badge className="bg-primary hover:bg-primary text-white text-[10px] font-black px-2.5 py-1 border-none mb-4 uppercase tracking-widest">Founder Beta</Badge>
                <h3 className="text-lg font-extrabold mb-2 tracking-tight">Upgrade to Pro</h3>
                <p className="text-[12px] text-slate-300 dark:text-muted-foreground mb-6 leading-relaxed font-semibold">Get unlimited projects, custom domains, and white-labeled client portals for your agency.</p>
                <Link to="/dashboard/settings">
                  <Button variant="secondary" className="w-full rounded-xl font-black transition-all h-10 text-[13px] uppercase tracking-wider">
                    View Pricing Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Portal Preview Card */}
            <Card className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-2xl overflow-hidden relative group">
              <CardContent className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/5 rounded-lg">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm tracking-tight">Portal Preview</h3>
                </div>
                <div className="aspect-video rounded-xl bg-muted border border-border/50 flex flex-col items-center justify-center p-4 text-center group-hover:bg-muted/80 transition-colors">
                  <div className="w-12 h-1 bg-primary/20 rounded-full mb-3" />
                  <div className="space-y-1.5 w-full">
                    <div className="h-2 w-3/4 bg-muted-foreground/20 rounded mx-auto" />
                    <div className="h-2 w-1/2 bg-muted-foreground/20 rounded mx-auto" />
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 h-8 text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary hover:bg-primary/5">
                    Launch Preview
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-4 font-medium italic">"Ensure your client's first impression is perfect."</p>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
