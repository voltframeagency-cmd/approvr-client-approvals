import { mockProjects, mockDeliverables, mockComments } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { CheckCircle2, FileText, MessageSquare, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const fileTypeColors: Record<string, string> = {
  svg: 'bg-primary/10 text-primary',
  pdf: 'bg-destructive/10 text-destructive',
  fig: 'bg-info/10 text-info',
};

const ClientPortal = () => {
  const project = mockProjects[0]; // Demo with first project
  const deliverables = mockDeliverables.filter(d => d.projectId === project.id);
  const [selectedDel, setSelectedDel] = useState(deliverables[0]?.id);
  const comments = mockComments.filter(c => c.deliverableId === selectedDel);
  const [newComment, setNewComment] = useState('');
  const currentDel = deliverables.find(d => d.id === selectedDel);

  return (
    <div className="min-h-screen surface-sunken">
      <header className="bg-card border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Rivera Design Co
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Reviewing as</span>
            <div className="h-7 w-7 rounded-full bg-info/10 flex items-center justify-center text-xs font-medium text-info">SC</div>
            <span className="font-medium text-foreground">Sarah Chen</span>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-5xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <StatusBadge status={project.status} />
            <span>Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
            <span>{project.approvedCount}/{project.deliverableCount} approved</span>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5 mb-6 text-sm text-muted-foreground animate-fade-in">
          <p className="font-medium text-foreground mb-1">Welcome!</p>
          Review the deliverables below and leave your feedback. When everything looks good, hit Approve.
        </div>

        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="space-y-2">
            {deliverables.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDel(d.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${selectedDel === d.id ? 'ring-2 ring-primary shadow-sm bg-card' : 'bg-card hover:bg-muted/30'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${fileTypeColors[d.fileType] || 'bg-muted text-muted-foreground'}`}>
                    {d.fileType.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{d.title}</p>
                    <p className="text-xs text-muted-foreground">v{d.version}</p>
                  </div>
                </div>
                <div className="mt-2"><StatusBadge status={d.status} /></div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {currentDel && (
              <>
                <div className="rounded-xl border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{currentDel.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3" />
                        Version {currentDel.version} · {currentDel.fileName}
                      </p>
                    </div>
                    <StatusBadge status={currentDel.status} />
                  </div>
                  <div className="h-48 rounded-lg bg-muted/50 border border-dashed flex items-center justify-center text-sm text-muted-foreground">
                    <FileText className="h-8 w-8 mr-2 text-muted-foreground/50" />
                    File preview
                  </div>
                  {currentDel.status !== 'approved' && (
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" className="flex-1">Request changes</Button>
                      <Button className="flex-1 gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  )}
                  {currentDel.status === 'approved' && (
                    <div className="mt-4 rounded-lg bg-success/10 text-success text-sm font-medium p-3 text-center">
                      ✓ This deliverable has been approved
                    </div>
                  )}
                </div>

                <div className="rounded-xl border bg-card p-6">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <MessageSquare className="h-4 w-4" /> Discussion
                  </h3>
                  <div className="space-y-4 mb-4">
                    {comments.map(c => (
                      <div key={c.id} className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${c.authorType === 'agency' ? 'bg-primary/10 text-primary' : 'bg-info/10 text-info'}`}>
                          {c.authorName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{c.authorName}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.body}</p>
                        </div>
                      </div>
                    ))}
                    {comments.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to share feedback.</p>}
                  </div>
                  <div className="flex gap-2">
                    <Textarea placeholder="Leave your feedback..." className="min-h-[60px] resize-none" value={newComment} onChange={e => setNewComment(e.target.value)} />
                    <Button size="sm" className="self-end gap-1" disabled={!newComment.trim()}>
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPortal;
