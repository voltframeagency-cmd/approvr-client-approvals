import { mockProjects, mockDeliverables, mockComments } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { CheckCircle2, FileText, MessageSquare, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fileTypeColors: Record<string, string> = {
  svg: 'bg-primary/10 text-primary',
  pdf: 'bg-destructive/10 text-destructive',
  fig: 'bg-info/10 text-info',
};

const ClientPortal = () => {
  const project = mockProjects[0];
  const deliverables = mockDeliverables.filter(d => d.projectId === project.id);
  const [selectedDel, setSelectedDel] = useState(deliverables[0]?.id);
  const comments = mockComments.filter(c => c.deliverableId === selectedDel);
  const [newComment, setNewComment] = useState('');
  const currentDel = deliverables.find(d => d.id === selectedDel);

  return (
    <div className="min-h-screen surface-sunken">
      <header className="bg-card border-b">
        <div className="container flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 font-bold text-[14px]"
          >
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Rivera Design Co
          </motion.div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline text-[13px]">Reviewing as</span>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center text-[10px] font-semibold text-info ring-1 ring-info/10">SC</div>
            <span className="font-medium text-foreground text-[13px]">Sarah Chen</span>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1 text-[14px]">{project.description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <StatusBadge status={project.status} animated />
            <span>Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
            <span className="font-mono">{project.approvedCount}/{project.deliverableCount} approved</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-elevated p-5 mb-6 text-[13px] text-muted-foreground"
        >
          <p className="font-medium text-foreground mb-1">Welcome!</p>
          Review the deliverables below and leave your feedback. When everything looks good, hit Approve.
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            {deliverables.map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                onClick={() => setSelectedDel(d.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${selectedDel === d.id ? 'ring-2 ring-primary shadow-sm bg-card' : 'bg-card hover:bg-muted/30'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${fileTypeColors[d.fileType] || 'bg-muted text-muted-foreground'}`}>
                    {d.fileType.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[13px] truncate">{d.title}</p>
                    <p className="text-[11px] text-muted-foreground">v{d.version}</p>
                  </div>
                </div>
                <div className="mt-2"><StatusBadge status={d.status} /></div>
              </motion.button>
            ))}
          </motion.div>

          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence mode="wait">
              {currentDel && (
                <motion.div
                  key={currentDel.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="card-elevated p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{currentDel.title}</h3>
                        <p className="text-[13px] text-muted-foreground flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          Version {currentDel.version} · {currentDel.fileName}
                        </p>
                      </div>
                      <StatusBadge status={currentDel.status} animated />
                    </div>
                    <div className="h-48 rounded-xl bg-muted/30 border border-dashed flex items-center justify-center text-sm text-muted-foreground">
                      <FileText className="h-8 w-8 mr-2 text-muted-foreground/30" />
                      File preview
                    </div>
                    {currentDel.status !== 'approved' && (
                      <div className="flex gap-3 mt-5">
                        <Button variant="outline" className="flex-1">Request changes</Button>
                        <Button className="flex-1 gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    )}
                    {currentDel.status === 'approved' && (
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
                      <MessageSquare className="h-4 w-4" /> Discussion
                    </h3>
                    <div className="space-y-4 mb-4">
                      {comments.map((c, i) => (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, y: 6 }}
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
                          <p className="text-[13px] text-muted-foreground">No comments yet. Be the first to share feedback.</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Textarea placeholder="Leave your feedback..." className="min-h-[60px] resize-none text-[13px]" value={newComment} onChange={e => setNewComment(e.target.value)} />
                      <Button size="sm" className="self-end gap-1" disabled={!newComment.trim()}>
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPortal;
