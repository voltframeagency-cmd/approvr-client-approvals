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
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { providerIcons } from '@/lib/provider-icons';

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
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id);
  const deliverables = mockDeliverables.filter(d => d.projectId === id);
  const projectActivity = mockActivity.filter(a => a.projectId === id);
  const [selectedDeliverable, setSelectedDeliverable] = useState(deliverables[0]?.id);
  const comments = mockComments.filter(c => c.deliverableId === selectedDeliverable);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'versions' | 'timeline' | 'next_steps'>('preview');
  const [showAddAction, setShowAddAction] = useState(false);

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
        <Link to="/portal" className="flex items-center gap-1 text-primary hover:underline ml-auto">
          <ExternalLink className="h-3 w-3" />
          Preview client portal
        </Link>
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

                    {/* Comments */}
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
                            className={cn(
                              'flex items-start gap-3',
                              c.resolved && 'opacity-60'
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
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-medium">{c.authorName}</span>
                                <span className="text-[11px] text-muted-foreground">
                                  {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                {c.resolved && (
                                  <span className="text-[10px] text-success bg-success/10 px-1.5 py-0.5 rounded-full font-medium">Resolved</span>
                                )}
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
                  </>
                )}

                {/* Version history tab */}
                {activeTab === 'versions' && (
                  <div className="card-elevated p-6">
                    <h3 className="font-semibold text-[14px] flex items-center gap-2 mb-5">
                      <History className="h-4 w-4" /> Version history
                    </h3>
                    <div className="relative">
                      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border" />
                      <div className="space-y-5">
                        {(selectedDel.versions || [{ version: selectedDel.version, submittedAt: selectedDel.submittedAt }])
                          .slice().reverse().map((v, i) => (
                          <div key={v.version} className="flex items-start gap-4 relative">
                            <div className={cn(
                              'h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 z-10',
                              i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            )}>
                              {v.version}
                            </div>
                            <div>
                              <p className="text-[13px] font-medium">Version {v.version} {i === 0 && <span className="text-primary">(Current)</span>}</p>
                              <p className="text-[12px] text-muted-foreground mt-0.5">
                                {new Date(v.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                              {v.note && <p className="text-[12px] text-muted-foreground mt-1 italic">"{v.note}"</p>}
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
