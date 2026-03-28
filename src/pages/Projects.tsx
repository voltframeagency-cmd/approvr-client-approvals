import { mockProjects, type ProjectStatus, type Project, type ProjectType } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, AlertCircle, Palette, Globe, Video, Megaphone, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import { cn } from '@/lib/utils';
import { useFounderBeta } from '@/hooks/use-founder-beta';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { addDays, format } from 'date-fns';

type FilterTab = 'all' | ProjectStatus | 'overdue';

type DeadlinePreset = '1_week' | '2_weeks' | '30_days' | 'custom';

const deadlinePresets: { key: DeadlinePreset; label: string; days?: number }[] = [
  { key: '1_week', label: '1 week', days: 7 },
  { key: '2_weeks', label: '2 weeks', days: 14 },
  { key: '30_days', label: '30 days', days: 30 },
  { key: 'custom', label: 'Custom' },
];

const projectTypes: { key: ProjectType; label: string; icon: React.ReactNode }[] = [
  { key: 'branding', label: 'Branding', icon: <Palette className="h-3.5 w-3.5" /> },
  { key: 'web_design', label: 'Web Design', icon: <Globe className="h-3.5 w-3.5" /> },
  { key: 'video_motion', label: 'Video/Motion', icon: <Video className="h-3.5 w-3.5" /> },
  { key: 'social_ads', label: 'Social/Ads', icon: <Megaphone className="h-3.5 w-3.5" /> },
  { key: 'other', label: 'Other', icon: <MoreHorizontal className="h-3.5 w-3.5" /> },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

const Projects = () => {
  const beta = useFounderBeta();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);
  const [deadlinePreset, setDeadlinePreset] = useState<DeadlinePreset | null>(null);
  const [customDeadline, setCustomDeadline] = useState('');

  const computedDeadline = (() => {
    if (!deadlinePreset) return '';
    if (deadlinePreset === 'custom') return customDeadline;
    const preset = deadlinePresets.find(p => p.key === deadlinePreset);
    if (preset?.days) return format(addDays(new Date(), preset.days), 'yyyy-MM-dd');
    return '';
  })();

  const canCreate = projectName.trim() && clientName.trim() && computedDeadline;

  const resetForm = () => {
    setProjectName('');
    setClientName('');
    setSelectedType(null);
    setDeadlinePreset(null);
    setCustomDeadline('');
  };

  const handleCreateProject = () => {
    if (!canCreate) return;

    const project: Project = {
      id: `proj-${Date.now()}`,
      name: projectName.trim(),
      clientName: clientName.trim(),
      clientEmail: `${clientName.trim().toLowerCase().replace(/\s/g, '.')}@example.com`,
      status: 'draft',
      deadline: computedDeadline,
      description: '',
      createdAt: new Date().toISOString(),
      deliverableCount: 0,
      approvedCount: 0,
      projectType: selectedType || undefined,
    };

    setProjects(prev => [project, ...prev]);
    resetForm();
    setDialogOpen(false);
    toast.success(`Project "${project.name}" created`, {
      description: `Draft project for ${project.clientName}`,
    });
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: projects.length },
    { key: 'in_review', label: 'In Review', count: projects.filter(p => p.status === 'in_review').length },
    { key: 'changes_requested', label: 'Changes Requested', count: projects.filter(p => p.status === 'changes_requested').length },
    { key: 'overdue', label: 'Overdue', count: projects.filter(p => p.isOverdue && p.status !== 'approved').length },
    { key: 'approved', label: 'Approved', count: projects.filter(p => p.status === 'approved').length },
    { key: 'draft', label: 'Draft', count: projects.filter(p => p.status === 'draft').length },
  ];

  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'overdue') return p.isOverdue && p.status !== 'approved';
    return p.status === activeTab;
  });

  return (
    <div className="space-y-4 sm:space-y-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-xl sm:text-2xl font-bold">Projects</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(!beta.canCreateProject && "cursor-not-allowed")}>
                  <DialogTrigger asChild>
                    <Button className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-[13px] px-3 sm:px-4" disabled={!beta.canCreateProject}>
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">New project</span>
                      <span className="sm:hidden">New</span>
                    </Button>
                  </DialogTrigger>
                </div>
              </TooltipTrigger>
              {!beta.canCreateProject && (
                <TooltipContent>
                  <p>{beta.isExpired ? "Beta expired" : `Limit reached (${beta.projectLimit} projects)`}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 mt-2">
              {/* Project Name — hero field */}
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Project Name *</Label>
                <Input
                  placeholder="e.g. Website Redesign, Brand Package..."
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  className="h-12 text-[15px] font-medium"
                  autoFocus
                />
              </div>

              {/* Client / Brand Name */}
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Client / Brand Name *</Label>
                <Input
                  placeholder="e.g. Acme Corp, Nike, Freelance Client"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Project Type — optional chips */}
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Project Type</Label>
                <div className="flex flex-wrap gap-1.5">
                  {projectTypes.map(type => (
                    <button
                      key={type.key}
                      type="button"
                      onClick={() => setSelectedType(prev => prev === type.key ? null : type.key)}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-200',
                        selectedType === type.key
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                      )}
                    >
                      {type.icon}
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Approval Deadline — preset chips */}
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Approval Deadline *</Label>
                <div className="flex gap-1.5">
                  {deadlinePresets.map(preset => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => { setDeadlinePreset(preset.key); if (preset.key !== 'custom') setCustomDeadline(''); }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-200',
                        deadlinePreset === preset.key
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                {deadlinePreset === 'custom' && (
                  <Input
                    type="date"
                    value={customDeadline}
                    onChange={e => setCustomDeadline(e.target.value)}
                    className="h-10 mt-2"
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                )}
                {deadlinePreset && deadlinePreset !== 'custom' && (
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Due {format(new Date(computedDeadline), 'MMM d, yyyy')}
                  </p>
                )}
              </div>

              <Button
                onClick={handleCreateProject}
                disabled={!canCreate}
                className="w-full h-11 rounded-xl font-bold"
              >
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filter tabs - horizontal scroll on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-1 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 sm:gap-1.5 flex-shrink-0',
              activeTab === tab.key
                ? 'bg-primary/[0.08] text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            )}
          >
            {tab.key === 'overdue' && <AlertCircle className="h-3 w-3" />}
            {tab.label}
            <span className={cn(
              'text-[10px] sm:text-[11px] min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] rounded-full flex items-center justify-center',
              activeTab === tab.key ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-sm"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search projects..." className="pl-9 h-9 sm:h-10 text-[13px]" value={search} onChange={e => setSearch(e.target.value)} />
      </motion.div>

      {/* Desktop table view */}
      <div className="card-elevated overflow-hidden hidden sm:block">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Project</span>
          <span className="hidden sm:block">Status</span>
          <span className="hidden md:block">Progress</span>
          <span className="hidden lg:block">Client activity</span>
          <span className="hidden md:block">Deadline</span>
        </div>
        <StaggerContainer staggerDelay={0.04}>
          {filtered.map(project => (
            <StaggerItem key={project.id}>
              <Link
                to={`/dashboard/projects/${project.id}`}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 border-b last:border-0 hover:bg-muted/30 transition-colors"
              >
                <div className="min-w-0 flex items-center gap-3">
                  {project.isOverdue && project.status !== 'approved' && (
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-[14px] truncate">{project.name}</p>
                    <p className="text-[13px] text-muted-foreground truncate">{project.clientName}</p>
                  </div>
                </div>
                <div className="hidden sm:block"><StatusBadge status={project.status} /></div>
                <span className="hidden md:block text-[13px] text-muted-foreground font-mono">{project.approvedCount}/{project.deliverableCount}</span>
                <span className="hidden lg:flex items-center gap-1 text-[12px] text-muted-foreground">
                  {project.lastViewedByClient ? (
                    <>
                      <Eye className="h-3 w-3" />
                      {timeAgo(project.lastViewedByClient)}
                    </>
                  ) : (
                    <span className="text-muted-foreground/40">Not viewed</span>
                  )}
                </span>
                <span className={cn(
                  'hidden md:block text-[13px]',
                  project.isOverdue && project.status !== 'approved' ? 'text-destructive font-medium' : 'text-muted-foreground'
                )}>
                  {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search className="h-8 w-8 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-2">
        <StaggerContainer staggerDelay={0.04}>
          {filtered.map(project => (
            <StaggerItem key={project.id}>
              <Link
                to={`/dashboard/projects/${project.id}`}
                className="block card-elevated p-3.5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {project.isOverdue && project.status !== 'approved' && (
                        <AlertCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
                      )}
                      <p className="font-medium text-[13px] truncate">{project.name}</p>
                    </div>
                    <p className="text-[12px] text-muted-foreground truncate mt-0.5">{project.clientName}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
                  <span className="font-mono">{project.approvedCount}/{project.deliverableCount} approved</span>
                  <span className={cn(
                    project.isOverdue && project.status !== 'approved' ? 'text-destructive font-medium' : ''
                  )}>
                    {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Search className="h-6 w-6 mx-auto mb-2 text-muted-foreground/30" />
            <p className="text-[13px] text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
