import { mockProjects } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';

const Projects = () => {
  const [search, setSearch] = useState('');
  const filtered = mockProjects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New project
        </Button>
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
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Project</span>
          <span className="hidden sm:block">Status</span>
          <span className="hidden md:block">Progress</span>
          <span className="hidden md:block">Deadline</span>
        </div>
        <StaggerContainer staggerDelay={0.04}>
          {filtered.map(project => (
            <StaggerItem key={project.id}>
              <Link
                to={`/dashboard/projects/${project.id}`}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b last:border-0 hover:bg-muted/30 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-[14px] truncate">{project.name}</p>
                  <p className="text-[13px] text-muted-foreground truncate">{project.clientName}</p>
                </div>
                <div className="hidden sm:block"><StatusBadge status={project.status} /></div>
                <span className="hidden md:block text-[13px] text-muted-foreground font-mono">{project.approvedCount}/{project.deliverableCount}</span>
                <span className="hidden md:block text-[13px] text-muted-foreground">
                  {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search className="h-8 w-8 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No projects found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
