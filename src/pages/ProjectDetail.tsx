import { useParams, Link } from 'react-router-dom';
import { mockProjects, mockDeliverables, mockComments, mockActivity, mockNextStepActions, providerTypeLabels, type NextStepProviderType } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import {
  ArrowLeft, FileText, MessageSquare, Upload, Clock, Send, CheckCircle2,
  Eye, History, ExternalLink, AlertCircle, Zap, Plus, Trash2, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { providerIcons } from '@/lib/provider-icons';
import { useFounderBeta } from '@/hooks/use-founder-beta';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const fileTypeColors: Record<string, string> = {
  svg: 'bg-primary/10 text-primary',
  pdf: 'bg-destructive/10 text-destructive',
  fig: 'bg-info/10 text-info',
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

const activityIcons: Record<string, typeof FileText> = {
  approval: CheckCircle2,
  comment: MessageSquare,
  upload: Upload,
  status_change: AlertCircle,
  invite: ExternalLink,
  view: Eye,
};

const ProjectDetail = () => {
  const beta = useFounderBeta();
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id);
  const deliverables = mockDeliverables.filter(d => d.projectId === id);
  const projectActivity = mockActivity.filter(a => a.projectId === id);
  const [selectedDeliverable, setSelectedDeliverable] = useState(deliverables[0]?.id);
  const comments = mockComments.filter(c => c.deliverableId === selectedDeliverable);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'versions' | 'timeline' | 'next_steps'>('preview');
  const [showAddAction, setShowAddAction] = useState(false);
  const [commentFilter, setCommentFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [isReminderSending, setIsReminderSending] = useState(false);
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'sent'>('idle');

  const projectActions = mockNextStepActions.filter(a => a.scope === 'project' && a.projectId === id);
  const workspaceActions = mockNextStepActions.filter(a => a.scope === 'workspace');

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
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold truncate">{project.name}</h1>
            {project.isOverdue && project.status !== 'approved' && (
              <span className="text-[11px] font-semibold text-destructive bg-destructive/[0.08] px-2 py-0.5 rounded-full">Overdue</span>
            )}
          </div>
          <p className="text-[13px] text-muted-foreground">{project.clientName} · Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <StatusBadge status={project.status} animated />
      </motion.div>

      {/* Project meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-6 text-[13px] text-muted-foreground"
      >
        <span className="font-mono">{project.approvedCount}/{project.deliverableCount} approved</span>
        {project.lastViewedByClient && (
          <span className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            Client last viewed {timeAgo(project.lastViewedByClient)}
          </span>
        )}
        <Link to="/portal" className="flex items-center gap-1 text-primary hover:underline">
          <ExternalLink className="h-3 w-3" />
          Preview portal
        </Link>
        <div className="flex items-center gap-2 ml-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-[11px] font-bold uppercase tracking-wider rounded-lg"
            onClick={() => {
              setIsReminderSending(true);
              setTimeout(() => {
                setIsReminderSending(false);
                setReminderStatus('sent');
              }, 1500);
            }}
            disabled={isReminderSending || reminderStatus === 'sent' || project.status === 'approved'}
          >
            {isReminderSending ? (
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 animate-spin" /> Sending...</span>
            ) : reminderStatus === 'sent' ? (
              <span className="flex items-center gap-1.5 text-success"><CheckCircle2 className="h-3 w-3" /> Reminder Sent</span>
            ) : (
              <span className="flex items-center gap-1.5"><Send className="h-3 w-3" /> Nudge Client</span>
            )}
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider rounded-lg">
             Download Summary
          </Button>
        </div>
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
        {/* Deliverables sidebar */}
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
                onClick={() => { setSelectedDeliverable(d.id); setActiveTab('preview'); }}
                className={cn(
                  'w-full text-left rounded-xl border p-4 transition-all duration-200',
                  selectedDeliverable === d.id ? 'ring-2 ring-primary shadow-sm bg-card' : 'hover:bg-muted/30 bg-card'
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
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      v{d.version}
                      {d.versions && d.versions.length > 1 && (
                        <span className="flex items-center gap-0.5 text-primary/70">
                          <History className="h-2.5 w-2.5" />
                          {d.versions.length} versions
                        </span>
                      )}
                    </p>
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

        {/* Main content */}
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
                {/* Tab navigation */}
                <div className="flex items-center gap-1 border-b">
                  {(['preview', 'versions', 'timeline', 'next_steps'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px capitalize',
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {tab === 'versions' ? `Versions (${selectedDel.versions?.length || 1})` : tab === 'next_steps' ? 'Next Steps' : tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'preview' && (
                  <>
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
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className={cn("flex-1", !beta.canAddEvent && "cursor-not-allowed")}>
                                  <Button variant="outline" className="w-full" disabled={!beta.canAddEvent}>Request changes</Button>
                                </div>
                              </TooltipTrigger>
                              {!beta.canAddEvent && <TooltipContent><p>Event limit reached ({beta.eventLimit} events)</p></TooltipContent>}
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className={cn("flex-1", !beta.canAddEvent && "cursor-not-allowed")}>
                                  <Button className="w-full gap-2" disabled={!beta.canAddEvent}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Approve
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              {!beta.canAddEvent && <TooltipContent><p>Event limit reached ({beta.eventLimit} events)</p></TooltipContent>}
                            </Tooltip>
                          </TooltipProvider>
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

                    {/* Comments */}
                    <div className="card-elevated p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[14px] flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" /> Comments ({comments.length})
                        </h3>
                        <div className="flex bg-muted/40 p-0.5 rounded-lg border border-border/40">
                          {(['all', 'open', 'resolved'] as const).map(f => (
                            <button
                              key={f}
                              onClick={() => setCommentFilter(f)}
                              className={cn(
                                "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                                commentFilter === f 
                                  ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 mb-4">
                        {comments
                          .filter(c => commentFilter === 'all' || (commentFilter === 'open' ? !c.resolved : c.resolved))
                          .map((c, i) => (
                          <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                              'flex items-start gap-3 p-3 rounded-xl transition-all',
                              c.resolved ? 'bg-muted/30 opacity-60' : 'bg-transparent'
                            )}
                          >
                            <div className={cn(
                              'h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0',
                              c.authorType === 'agency'
                                ? 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/10'
                                : 'bg-gradient-to-br from-info/20 to-info/5 text-info ring-1 ring-info/10'
                            )}>
                              {c.authorName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-[13px] font-bold text-slate-900 dark:text-white">{c.authorName}</span>
                                  <span className="text-[11px] text-muted-foreground font-medium">
                                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </span>
                                </div>
                                {c.resolved ? (
                                  <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Resolved</span>
                                ) : (
                                  <button className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">Resolve</button>
                                )}
                              </div>
                              <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed font-medium">{c.body}</p>
                            </div>
                          </motion.div>
                        ))}
                        {comments.length === 0 && (
                          <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed">
                            <MessageSquare className="h-6 w-6 mx-auto mb-2 text-muted-foreground/20" />
                            <p className="text-[13px] text-muted-foreground font-medium">No comments yet</p>
                          </div>
                        )}
                        {comments.length > 0 && comments.filter(c => commentFilter === 'open' ? !c.resolved : commentFilter === 'resolved' ? c.resolved : true).length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-widest">No {commentFilter} comments</p>
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
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={cn("self-end", !beta.canAddEvent && "cursor-not-allowed")}>
                                <Button size="sm" className="gap-1" disabled={!newComment.trim() || !beta.canAddEvent}>
                                  <Send className="h-3 w-3" />
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {!beta.canAddEvent && <TooltipContent><p>Event limit reached ({beta.eventLimit} events)</p></TooltipContent>}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </>
                )}

                {/* Version history tab */}
                {activeTab === 'versions' && (
                  <div className="card-elevated p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-bold text-[15px] flex items-center gap-2.5 uppercase tracking-widest text-slate-900 dark:text-white">
                        <History className="h-4 w-4 text-primary" /> Version history
                      </h3>
                      <Badge variant="outline" className="text-[10px] font-bold border-slate-200 text-muted-foreground bg-white">
                        {selectedDel.versions?.length || 1} Versions
                      </Badge>
                    </div>
                    <div className="relative">
                      <div className="absolute left-[15px] top-6 bottom-6 w-[1.5px] bg-slate-100 dark:bg-slate-800" />
                      <div className="space-y-8">
                        {(selectedDel.versions || [{ version: selectedDel.version, submittedAt: selectedDel.submittedAt, note: 'Initial submission' }])
                          .slice().reverse().map((v, i) => (
                          <div key={v.version} className="flex items-start gap-6 relative group/v">
                            <div className={cn(
                              'h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 z-10 shadow-sm ring-4 ring-white dark:ring-slate-900 transition-all group-hover/v:scale-110',
                              i === 0 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground'
                            )}>
                              {v.version}
                            </div>
                            <div className="flex-1 min-w-0 bg-slate-50/50 dark:bg-white/5 p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all">
                              <div className="flex items-center justify-between mb-1.5">
                                <p className="text-[14px] font-bold text-slate-900 dark:text-white">
                                  Version {v.version}
                                  {i === 0 && <span className="ml-2 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Latest</span>}
                                </p>
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                  {new Date(v.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground mb-3">
                                <Building2 className="h-3 w-3" />
                                <span>Uploaded by Rivera Design Co</span>
                                <span className="opacity-40">·</span>
                                <Clock className="h-3 w-3" />
                                <span>{new Date(v.submittedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-border/40 shadow-sm italic text-[12px] text-slate-600 dark:text-slate-400 font-medium">
                                "{v.note || 'No change summary provided.'}"
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline tab */}
                {activeTab === 'timeline' && (
                  <div className="card-elevated p-6">
                    <h3 className="font-semibold text-[14px] flex items-center gap-2 mb-5">
                      <Clock className="h-4 w-4" /> Project timeline
                    </h3>
                    {projectActivity.length > 0 ? (
                      <div className="relative">
                        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border" />
                        <div className="space-y-4">
                          {projectActivity.map((item, i) => {
                            const Icon = activityIcons[item.type] || FileText;
                            return (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-4 relative"
                              >
                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 z-10">
                                  <Icon className="h-3 w-3 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-[13px]">
                                    <span className="font-medium">{item.actor}</span>{' '}
                                    <span className="text-muted-foreground">{item.action}</span>
                                  </p>
                                  <p className="text-[11px] text-muted-foreground mt-0.5">{timeAgo(item.createdAt)}</p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground/20" />
                        <p className="text-[13px] text-muted-foreground">No activity yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Next Steps tab */}
                {activeTab === 'next_steps' && (
                  <div className="card-elevated p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-semibold text-[14px] flex items-center gap-2">
                        <Zap className="h-4 w-4" /> Next step actions
                      </h3>
                      <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => setShowAddAction(!showAddAction)}>
                        <Plus className="h-3 w-3" /> Add action
                      </Button>
                    </div>

                    {showAddAction && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border rounded-xl p-4 mb-5 space-y-3 bg-muted/20"
                      >
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-[12px]">Label</Label>
                            <Input placeholder="e.g. Pay now" className="text-[13px]" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[12px]">Destination URL</Label>
                            <Input placeholder="https://..." className="text-[13px]" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-[12px]">Provider type</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[13px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              {Object.entries(providerTypeLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[12px]">Show when</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[13px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option value="on_approval">After approval</option>
                              <option value="always">Always</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" onClick={() => setShowAddAction(false)}>Cancel</Button>
                          <Button size="sm" onClick={() => setShowAddAction(false)}>Add action</Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Project-level actions */}
                    {projectActions.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Project actions</p>
                        <div className="space-y-2">
                          {projectActions.map(action => {
                            const Icon = providerIcons[action.providerType];
                            return (
                              <div key={action.id} className="flex items-center gap-3 rounded-xl border p-3.5 bg-card">
                                <div className="h-9 w-9 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                                  <Icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-medium">{action.label}</p>
                                  <p className="text-[11px] text-muted-foreground truncate">{action.url}</p>
                                </div>
                                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{providerTypeLabels[action.providerType]}</span>
                                <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Workspace-level (inherited) actions */}
                    {workspaceActions.length > 0 && (
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Building2 className="h-3 w-3" /> Inherited from workspace
                        </p>
                        <div className="space-y-2">
                          {workspaceActions.map(action => {
                            const Icon = providerIcons[action.providerType];
                            return (
                              <div key={action.id} className="flex items-center gap-3 rounded-xl border border-dashed p-3.5 opacity-75">
                                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                  <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-medium">{action.label}</p>
                                  <p className="text-[11px] text-muted-foreground truncate">{action.url}</p>
                                </div>
                                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{providerTypeLabels[action.providerType]}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {projectActions.length === 0 && workspaceActions.length === 0 && (
                      <div className="text-center py-10">
                        <Zap className="h-6 w-6 mx-auto mb-2 text-muted-foreground/20" />
                        <p className="text-[13px] text-muted-foreground">No next step actions configured</p>
                        <p className="text-[12px] text-muted-foreground mt-1">Add actions that appear after client approval</p>
                      </div>
                    )}
                  </div>
                )}
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
