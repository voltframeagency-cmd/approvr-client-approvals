import { mockProjects } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Projects = () => {
  const [search, setSearch] = useState('');
  const filtered = mockProjects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>Project</span>
          <span className="hidden sm:block">Status</span>
          <span className="hidden md:block">Progress</span>
          <span className="hidden md:block">Deadline</span>
        </div>
        {filtered.map(project => (
          <Link
            key={project.id}
            to={`/dashboard/projects/${project.id}`}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b last:border-0 hover:bg-muted/30 transition-colors"
          >
            <div className="min-w-0">
              <p className="font-medium truncate">{project.name}</p>
              <p className="text-sm text-muted-foreground truncate">{project.clientName}</p>
            </div>
            <div className="hidden sm:block"><StatusBadge status={project.status} /></div>
            <span className="hidden md:block text-sm text-muted-foreground">{project.approvedCount}/{project.deliverableCount}</span>
            <span className="hidden md:block text-sm text-muted-foreground">
              {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
