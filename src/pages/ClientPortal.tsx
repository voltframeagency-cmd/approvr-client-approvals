import { mockProjects, mockDeliverables, mockComments, mockNextStepActions } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { CheckCircle2, FileText, MessageSquare, Send, Clock, ThumbsUp, ArrowRight, ExternalLink, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { providerIcons } from '@/lib/provider-icons';

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

  const approvedCount = deliverables.filter(d => d.status === 'approved').length;
  const allApproved = approvedCount === deliverables.length;

  return (
    <div className="min-h-screen surface-sunken">
      {/* Branded header */}
      <header className="bg-card border-b">
        <div className="container flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2.5 font-bold text-[15px]"
          >
            <div className="h-8 w-8 rounded-lg bg-primary/[0.08] flex items-center justify-center">
              <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
            </div>
            Rivera Design Co
          </motion.div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="hidden sm:inline text-[13px]">Reviewing as</span>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center text-[10px] font-semibold text-info ring-1 ring-info/10">SC</div>
              <span className="font-medium text-foreground text-[13px]">Sarah Chen</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-5xl">
        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1 text-[14px] max-w-xl">{project.description}</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] font-medium">Review progress</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {approvedCount} of {deliverables.length} deliverables approved
              </p>
            </div>
            {allApproved ? (
              <span className="text-[12px] font-semibold text-success bg-success/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                All approved
              </span>
            ) : (
              <span className="text-[12px] text-muted-foreground">
                Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </span>
            )}
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(approvedCount / deliverables.length) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </motion.div>

        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-elevated p-5 mb-6 text-[13px]"
        >
          <p className="font-medium text-foreground mb-1">Welcome!</p>
          <p className="text-muted-foreground leading-relaxed">
            Review each deliverable below. Approve what looks good, request changes on what doesn't. Your agency will be notified instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Deliverable list */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            {/* Deliverable count summary */}
            <p className="text-[12px] text-muted-foreground font-medium px-1 mb-1">
              {deliverables.length} deliverables · {approvedCount} approved
            </p>

            {deliverables.map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                onClick={() => setSelectedDel(d.id)}
                className={cn(
                  'w-full text-left rounded-xl border p-4 transition-all duration-200',
                  selectedDel === d.id
                    ? 'ring-2 ring-primary shadow-sm bg-card'
                    : 'bg-card hover:bg-muted/30'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-10 w-10 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold',
                    fileTypeColors[d.fileType] || 'bg-muted text-muted-foreground'
                  )}>
                    {d.fileType.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[13px] truncate">{d.title}</p>
                    <p className="text-[11px] text-muted-foreground">v{d.version} · {new Date(d.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  {d.status === 'approved' && (
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  )}
                </div>
                {d.status !== 'approved' && (
                  <div className="mt-2"><StatusBadge status={d.status} /></div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Review panel */}
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
                    <div className="h-56 rounded-xl bg-muted/30 border border-dashed flex items-center justify-center text-sm text-muted-foreground">
                      <FileText className="h-8 w-8 mr-2 text-muted-foreground/30" />
                      File preview
                    </div>
                    {currentDel.status !== 'approved' && (
                      <div className="flex gap-3 mt-5">
                        <Button variant="outline" className="flex-1 gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Request changes
                        </Button>
                        <Button className="flex-1 gap-2">
                          <ThumbsUp className="h-4 w-4" />
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
                        Approved — you're all set!
                      </motion.div>
                    )}
                  </div>

                  {/* Simple feedback area */}
                  <div className="card-elevated p-6">
                    <h3 className="font-semibold text-[14px] flex items-center gap-2 mb-4">
                      <MessageSquare className="h-4 w-4" /> Feedback
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
                          <div className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0',
                            c.authorType === 'agency'
                              ? 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/10'
                              : 'bg-gradient-to-br from-info/20 to-info/5 text-info ring-1 ring-info/10'
                          )}>
                            {c.authorName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-medium">{c.authorName}</span>
                              <span className="text-[11px] text-muted-foreground">
                                {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              {c.resolved && (
                                <span className="text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Check className="h-2.5 w-2.5" />
                                  Resolved
                                </span>
                              )}
                            </div>
                            <p className={cn(
                              "text-[13px] mt-1 leading-relaxed",
                              c.resolved ? "text-muted-foreground/60 line-through" : "text-muted-foreground"
                            )}>{c.body}</p>
                            {!c.resolved && (
                              <button className="text-[11px] text-muted-foreground hover:text-primary mt-1 transition-colors">
                                Mark as resolved
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      {comments.length === 0 && (
                        <div className="text-center py-8">
                          <MessageSquare className="h-6 w-6 mx-auto mb-2 text-muted-foreground/20" />
                          <p className="text-[13px] text-muted-foreground">No feedback yet. Share your thoughts below.</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your feedback here..."
                        className="min-h-[60px] resize-none text-[13px]"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                      />
                      <Button size="sm" className="self-end gap-1.5" disabled={!newComment.trim()}>
                        <Send className="h-3 w-3" />
                        Send
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* What's next — post-approval actions with celebration */}
        {allApproved && (() => {
          const actions = mockNextStepActions.filter(
            a => a.scope === 'workspace' || (a.scope === 'project' && a.projectId === project.id)
          );
          return (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="card-elevated p-6 mt-8 relative overflow-hidden"
            >
              {/* Celebration particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: i % 2 === 0 ? 'hsl(var(--success))' : 'hsl(var(--primary))' }}
                  initial={{ opacity: 0, scale: 0, x: '50%', y: '30%' }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                    x: `${20 + Math.cos((i / 8) * Math.PI * 2) * 40}%`,
                    y: `${20 + Math.sin((i / 8) * Math.PI * 2) * 30}%`,
                  }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 1.2 }}
                />
              ))}

              <div className="flex items-center gap-2.5 mb-1">
                <div className="h-8 w-8 rounded-lg bg-success/[0.08] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-success" />
                </div>
                <h3 className="font-semibold text-[15px]">All approved — here's what's next</h3>
              </div>
              <p className="text-[13px] text-muted-foreground mb-5 ml-[42px]">
                Your review is complete. Here are your next steps.
              </p>
              {actions.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {actions.map((action, i) => {
                    const Icon = providerIcons[action.providerType];
                    return (
                      <motion.a
                        key={action.id}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex items-center gap-3 rounded-xl border p-4 hover:bg-muted/30 hover:border-primary/20 transition-all duration-200 group"
                      >
                        <div className="h-10 w-10 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/[0.1] transition-colors">
                          <Icon className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <span className="text-[13px] font-medium flex-1">{action.label}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })()}
      </main>

      {/* Minimal footer */}
      <footer className="border-t mt-16">
        <div className="container py-6 text-center text-[12px] text-muted-foreground">
          Powered by <span className="font-medium text-foreground">Approvr</span>
        </div>
      </footer>
    </div>
  );
};

export default ClientPortal;
