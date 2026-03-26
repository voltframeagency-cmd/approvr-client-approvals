import { useParams, Link } from 'react-router-dom';
import { mockProjects, mockDeliverables, mockComments } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { ArrowLeft, FileText, MessageSquare, Upload, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  if (!project) return (
    <div className="text-center py-20">
      <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
      <p className="text-muted-foreground">Project not found.</p>
    </div>
  );

  const selectedDel = deliverables.find(d => d.id === selectedDeliverable);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <Link to="/dashboard/projects" className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{project.name}</h1>
          <p className="text-[13px] text-muted-foreground">{project.clientName} · Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <StatusBadge status={project.status} animated />
      </motion.div>

      {project.description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-4"
        >
          {project.description}
        </motion.p>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[14px] flex items-center gap-2"><FileText className="h-4 w-4" /> Deliverables</h2>
            <Button variant="outline" size="sm" className="gap-1 text-xs"><Upload className="h-3 w-3" /> Upload</Button>
          </div>
          <div className="space-y-2">
            {deliverables.map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => setSelectedDeliverable(d.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${selectedDeliverable === d.id ? 'ring-2 ring-primary shadow-sm bg-card' : 'hover:bg-muted/30 bg-card'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${fileTypeColors[d.fileType] || 'bg-muted text-muted-foreground'}`}>
                    {d.fileType.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[13px] truncate">{d.title}</p>
                    <p className="text-[11px] text-muted-foreground">v{d.version} · {d.fileName}</p>
                  </div>
                </div>
                <div className="mt-2"><StatusBadge status={d.status} /></div>
              </motion.button>
            ))}
          </div>
          {deliverables.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground border rounded-xl border-dashed bg-muted/20">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
              <p>No deliverables yet</p>
              <p className="text-[12px] mt-1">Upload your first file to get started</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-5"
        >
          <AnimatePresence mode="wait">
            {selectedDel ? (
              <motion.div
                key={selectedDel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="card-elevated p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedDel.title}</h3>
                      <p className="text-[13px] text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3" />
                        Submitted {new Date(selectedDel.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        <span className="font-mono">· v{selectedDel.version}</span>
                      </p>
                    </div>
                    <StatusBadge status={selectedDel.status} animated />
                  </div>
                  <div className="h-48 rounded-xl bg-muted/30 border border-dashed flex items-center justify-center text-sm text-muted-foreground">
                    <FileText className="h-8 w-8 mr-2 text-muted-foreground/30" />
                    {selectedDel.fileName}
                  </div>
                  {selectedDel.status !== 'approved' && (
                    <div className="flex gap-3 mt-5">
                      <Button variant="outline" className="flex-1">Request changes</Button>
                      <Button className="flex-1 gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  )}
                  {selectedDel.status === 'approved' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-5 rounded-xl bg-success/[0.06] border border-success/20 text-success text-sm font-medium p-4 text-center flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      This deliverable has been approved
                    </motion.div>
                  )}
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-semibold text-[14px] flex items-center gap-2 mb-4">
                    <MessageSquare className="h-4 w-4" /> Comments ({comments.length})
                  </h3>
                  <div className="space-y-4 mb-4">
                    {comments.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${c.authorType === 'agency' ? 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/10' : 'bg-gradient-to-br from-info/20 to-info/5 text-info ring-1 ring-info/10'}`}>
                          {c.authorName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium">{c.authorName}</span>
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{c.body}</p>
                        </div>
                      </motion.div>
                    ))}
                    {comments.length === 0 && (
                      <div className="text-center py-8">
                        <MessageSquare className="h-6 w-6 mx-auto mb-2 text-muted-foreground/20" />
                        <p className="text-[13px] text-muted-foreground">No comments yet</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      className="min-h-[60px] resize-none text-[13px]"
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                    />
                    <Button size="sm" className="self-end gap-1" disabled={!newComment.trim()}>
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground/20" />
                <p className="text-muted-foreground text-sm">Select a deliverable to view details</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
