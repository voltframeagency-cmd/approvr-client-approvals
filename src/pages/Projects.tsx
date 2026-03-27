import { mockProjects, type ProjectStatus } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import { cn } from '@/lib/utils';
import { useFounderBeta } from '@/hooks/use-founder-beta';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type FilterTab = 'all' | ProjectStatus | 'overdue';

const tabs: { key: FilterTab; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: mockProjects.length },
  { key: 'in_review', label: 'In Review', count: mockProjects.filter(p => p.status === 'in_review').length },
  { key: 'changes_requested', label: 'Changes Requested', count: mockProjects.filter(p => p.status === 'changes_requested').length },
  { key: 'overdue', label: 'Overdue', count: mockProjects.filter(p => p.isOverdue && p.status !== 'approved').length },
  { key: 'approved', label: 'Approved', count: mockProjects.filter(p => p.status === 'approved').length },
  { key: 'draft', label: 'Draft', count: mockProjects.filter(p => p.status === 'draft').length },
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

  const filtered = mockProjects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'overdue') return p.isOverdue && p.status !== 'approved';
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold">Projects</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(!beta.canCreateProject && "cursor-not-allowed")}>
                <Button className="gap-2" disabled={!beta.canCreateProject}>
                  <Plus className="h-4 w-4" />
                  New project
                </Button>
              </div>
            </TooltipTrigger>
            {!beta.canCreateProject && (
              <TooltipContent>
                <p>{beta.isExpired ? "Beta expired" : `Limit reached (${beta.projectLimit} projects)`}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-1 overflow-x-auto pb-1"
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5',
              activeTab === tab.key
                ? 'bg-primary/[0.08] text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            )}
          >
            {tab.key === 'overdue' && <AlertCircle className="h-3 w-3" />}
            {tab.label}
            <span className={cn(
              'text-[11px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center',
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
        <Input placeholder="Search projects..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </motion.div>

      <div className="card-elevated overflow-hidden">
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
    </div>
  );
};

export default Projects;
