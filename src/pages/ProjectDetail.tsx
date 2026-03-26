import { useParams, Link } from 'react-router-dom';
import { mockProjects, mockDeliverables, mockComments } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { ArrowLeft, FileText, MessageSquare, Upload, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const fileTypeColors: Record<string, string> = {
  svg: 'bg-primary/10 text-primary',
  pdf: 'bg-destructive/10 text-destructive',
  fig: 'bg-info/10 text-info',
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id);
  const deliverables = mockDeliverables.filter(d => d.projectId === id);
  const [selectedDeliverable, setSelectedDeliverable] = useState(deliverables[0]?.id);
  const comments = mockComments.filter(c => c.deliverableId === selectedDeliverable);
  const [newComment, setNewComment] = useState('');

  if (!project) return <div className="text-center py-20 text-muted-foreground">Project not found.</div>;

  const selectedDel = deliverables.find(d => d.id === selectedDeliverable);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/projects" className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.clientName} · Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {project.description && (
        <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-4">{project.description}</p>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Deliverables list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2"><FileText className="h-4 w-4" /> Deliverables</h2>
            <Button variant="outline" size="sm" className="gap-1"><Upload className="h-3 w-3" /> Upload</Button>
          </div>
          <div className="space-y-2">
            {deliverables.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDeliverable(d.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${selectedDeliverable === d.id ? 'ring-2 ring-primary shadow-sm' : 'hover:bg-muted/30'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${fileTypeColors[d.fileType] || 'bg-muted text-muted-foreground'}`}>
                    {d.fileType.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{d.title}</p>
                    <p className="text-xs text-muted-foreground">v{d.version} · {d.fileName}</p>
                  </div>
                </div>
                <div className="mt-2"><StatusBadge status={d.status} /></div>
              </button>
            ))}
          </div>
          {deliverables.length === 0 && (
            <div className="text-center py-10 text-sm text-muted-foreground border rounded-xl border-dashed">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              No deliverables yet. Upload your first file.
            </div>
          )}
        </div>

        {/* Detail + Comments */}
        <div className="lg:col-span-2 space-y-6">
          {selectedDel ? (
            <>
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedDel.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      Submitted {new Date(selectedDel.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      <span>· Version {selectedDel.version}</span>
                    </p>
                  </div>
                  <StatusBadge status={selectedDel.status} />
                </div>
                <div className="h-48 rounded-lg bg-muted/50 border border-dashed flex items-center justify-center text-sm text-muted-foreground">
                  <FileText className="h-8 w-8 mr-2 text-muted-foreground/50" />
                  {selectedDel.fileName}
                </div>
                {selectedDel.status !== 'approved' && (
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" className="flex-1">Request changes</Button>
                    <Button className="flex-1">Approve</Button>
                  </div>
                )}
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <MessageSquare className="h-4 w-4" /> Comments ({comments.length})
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
                          <span className="text-xs text-muted-foreground capitalize">{c.authorType}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.body}</p>
                      </div>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[60px] resize-none"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                  />
                  <Button size="sm" className="self-end gap-1" disabled={!newComment.trim()}>
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-muted-foreground">Select a deliverable to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
