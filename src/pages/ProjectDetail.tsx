import { useParams, Link } from 'react-router-dom';
import { 
  mockProjects, mockDeliverables, mockComments, mockActivity, mockNextStepActions, providerTypeLabels, 
  type NextStepProviderType, type NextStepAction 
} from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import {
  ArrowLeft, FileText, MessageSquare, Upload, Clock, Send, CheckCircle2,
  Eye, History, ExternalLink, AlertCircle, Zap, Plus, Trash2, Building2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
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
  
  const [selectedDeliverableId, setSelectedDeliverableId] = useState(deliverables[0]?.id);
  const selectedDel = deliverables.find(d => d.id === selectedDeliverableId);
  const [activeVersion, setActiveVersion] = useState(selectedDel?.version || 1);
  const [activeTab, setActiveTab] = useState<'preview' | 'versions' | 'timeline' | 'next_steps'>('preview');
  
  const [newComment, setNewComment] = useState('');
  const [commentFilter, setCommentFilter] = useState<'all' | 'open' | 'resolved'>('all');
  
  const [projectActions, setProjectActions] = useState(mockNextStepActions.filter(a => a.projectId === id && a.scope === 'project'));
  const workspaceActions = mockNextStepActions.filter(a => a.scope === 'workspace');
  const [showAddAction, setShowAddAction] = useState(false);
  
  const [isReminderSending, setIsReminderSending] = useState(false);
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'sent'>('idle');
  
  const [newAction, setNewAction] = useState({
    label: '',
    url: '',
    providerType: 'custom' as NextStepProviderType,
    showWhen: 'on_approval' as 'on_approval' | 'always'
  });

  useEffect(() => {
    if (selectedDel) {
      setActiveVersion(selectedDel.version);
    }
  }, [selectedDeliverableId]);

  const comments = mockComments.filter(c => 
    c.deliverableId === selectedDeliverableId && 
    c.versionNumber === activeVersion
  );

  const handleAddAction = () => {
    if (!newAction.label || !newAction.url) return;
    
    const action: NextStepAction = {
      id: Math.random().toString(36).substr(2, 9),
      projectId: id!,
      label: newAction.label,
      url: newAction.url.startsWith('http') ? newAction.url : `https://${newAction.url}`,
      providerType: newAction.providerType,
      displayCondition: newAction.showWhen,
      scope: 'project'
    };
    
    setProjectActions(prev => [...prev, action]);
    setNewAction({ label: '', url: '', providerType: 'custom', showWhen: 'on_approval' });
    setShowAddAction(false);
  };

  const domainToProvider: Record<string, NextStepProviderType> = {
    'stripe.com/i/': 'invoice',
    'stripe.com': 'payment',
    'calendly.com': 'booking',
    'docusign.com': 'contract',
    'pandadoc.com': 'contract',
    'drive.google.com': 'delivery',
    'dropbox.com': 'delivery',
    'notion.so': 'onboarding',
  };

  const handleUrlChange = (url: string) => {
    setNewAction(prev => {
      const updates: any = { url };
      const matchedDomain = Object.keys(domainToProvider).find(domain => url.toLowerCase().includes(domain));
      if (matchedDomain) {
        updates.providerType = domainToProvider[matchedDomain];
      }
      return { ...prev, ...updates };
    });
  };

  const handleDeleteAction = (actionId: string) => {
    setProjectActions(prev => prev.filter(a => a.id !== actionId));
  };

  if (!project) return (
    <div className="text-center py-20">
      <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
      <p className="text-muted-foreground">Project not found.</p>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-2 md:gap-3"
      >
        <Link to="/dashboard/projects" className="p-1.5 md:p-2 rounded-lg hover:bg-muted transition-colors mt-0.5">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <h1 className="text-lg md:text-xl font-bold truncate">{project.name}</h1>
            {project.isOverdue && project.status !== 'approved' && (
              <span className="text-[10px] md:text-[11px] font-semibold text-destructive bg-destructive/[0.08] px-2 py-0.5 rounded-full">Overdue</span>
            )}
          </div>
          <p className="text-xs md:text-[13px] text-muted-foreground">{project.clientName} · Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <StatusBadge status={project.status} animated />
      </motion.div>

      {/* Project meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-[13px] text-muted-foreground"
      >
        <span className="font-mono">{project.approvedCount}/{project.deliverableCount} approved</span>
        {project.lastViewedByClient && (
          <span className="flex items-center gap-1.5">
            <Eye className="h-3 w-3" />
            Client last viewed {timeAgo(project.lastViewedByClient)}
          </span>
        )}
        <Link to="/portal" className="flex items-center gap-1 text-primary hover:underline">
          <ExternalLink className="h-3 w-3" />
          Preview portal
        </Link>
      </motion.div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-lg flex-1 min-w-0 sm:flex-none"
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
            <span className="flex items-center gap-1.5 text-success"><CheckCircle2 className="h-3 w-3" /> Sent</span>
          ) : (
            <span className="flex items-center gap-1.5"><Send className="h-3 w-3" /> Nudge Client</span>
          )}
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-lg flex-1 min-w-0 sm:flex-none">
           Download Summary
        </Button>
      </div>

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

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
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
                onClick={() => { setSelectedDeliverableId(d.id); setActiveTab('preview'); }}
                className={cn(
                  'w-full text-left rounded-xl border p-3 md:p-4 transition-all duration-200',
                  selectedDeliverableId === d.id ? 'ring-2 ring-primary shadow-sm bg-card' : 'hover:bg-muted/30 bg-card'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center text-[9px] md:text-[10px] font-mono font-bold',
                    fileTypeColors[d.fileType] || 'bg-muted text-muted-foreground'
                  )}>
                    {d.fileType.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs md:text-[13px] truncate">{d.title}</p>
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
                <div className="flex items-center gap-0 overflow-x-auto border-b -mx-1 px-1">
                  {(['preview', 'versions', 'timeline', 'next_steps'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'px-3 md:px-4 py-2 md:py-2.5 text-[11px] md:text-[13px] font-medium transition-colors border-b-2 -mb-px capitalize whitespace-nowrap',
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
                  <div className="space-y-6">
                    <div className="card-elevated p-0 overflow-hidden">
                      <div className="p-4 md:p-6 border-b border-border/40 bg-muted/30">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                               <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/5">
                                 Round #{selectedDel.versions?.find(v => v.version === activeVersion)?.reviewRound || 1}
                               </Badge>
                               <div className="h-1 w-1 rounded-full bg-border" />
                               <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Version {activeVersion}</span>
                            </div>
                            <h2 className="text-base md:text-xl font-bold tracking-tight">{selectedDel.title}</h2>
                            <p className="text-xs md:text-[13px] text-muted-foreground font-medium">{selectedDel.fileName}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {selectedDel.versions && selectedDel.versions.length > 1 && (
                              <div className="flex bg-card p-1 rounded-xl border shadow-sm mr-2">
                                {selectedDel.versions.map(v => (
                                  <button
                                    key={v.version}
                                    onClick={() => setActiveVersion(v.version)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all",
                                      activeVersion === v.version 
                                        ? "bg-primary text-white shadow-sm ring-1 ring-primary/20" 
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    v{v.version}
                                  </button>
                                ))}
                              </div>
                            )}
                            <StatusBadge status={selectedDel.status} animated />
                          </div>
                        </div>

                        {/* Revision Narrative */}
                        {selectedDel.versions?.find(v => v.version === activeVersion) && (
                          <div className="mt-4 md:mt-6 p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border border-border/40 relative overflow-hidden group/nar">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover/nar:opacity-[0.07] transition-opacity">
                              <Sparkles className="h-12 w-12 text-primary" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 md:mb-3 gap-1">
                               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                 <Sparkles className="h-3 w-3" /> Revision Summary
                               </p>
                               <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                 By {selectedDel.versions?.find(v => v.version === activeVersion)?.submittedBy}
                               </span>
                            </div>
                            <p className="text-xs md:text-[13px] font-medium leading-relaxed text-muted-foreground">
                               {selectedDel.versions?.find(v => v.version === activeVersion)?.changeSummary || "Final production version."}
                            </p>
                            <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/40">
                               <div className="flex items-center gap-1.5">
                                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                 <span className="text-[11px] font-bold">{selectedDel.versions?.find(v => v.version === activeVersion)?.resolvedCount || 0} Resolved</span>
                               </div>
                               <div className="flex items-center gap-1.5">
                                 <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                 <span className="text-[11px] font-bold">{selectedDel.versions?.find(v => v.version === activeVersion)?.openCount || 0} Open</span>
                               </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                        <div className="h-48 md:h-64 rounded-xl md:rounded-2xl bg-muted/30 border border-dashed flex flex-col items-center justify-center text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                          <FileText className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-3 text-muted-foreground/20" />
                          <p className="font-bold text-foreground text-sm">{selectedDel.fileName}</p>
                          <p className="text-[11px] md:text-[12px] mt-1 uppercase tracking-widest font-black opacity-40">{selectedDel.fileType} Deliverable</p>
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
                    </div>

                    {/* Comments */}
                    <div className="card-elevated p-4 md:p-6">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h3 className="font-semibold text-xs md:text-[14px] flex items-center gap-2">
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
                                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {new Date(c.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
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
                  </div>
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
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-slate-200 dark:border-white/10 rounded-[32px] p-10 mb-10 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden"
                      >
                        <div className="mb-10">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1 mb-4 block">Select Provider Type</Label>
                          <div className="flex flex-wrap gap-3">
                            {Object.entries(providerTypeLabels).map(([key, label]) => {
                              const Icon = providerIcons[key as NextStepProviderType];
                              const isSelected = newAction.providerType === key;
                              return (
                                <button
                                  key={key}
                                  onClick={() => setNewAction(prev => ({ ...prev, providerType: key as NextStepProviderType }))}
                                  className={cn(
                                    "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all gap-2 min-w-[80px]",
                                    isSelected 
                                      ? "border-primary bg-primary/[0.04] text-primary ring-1 ring-primary" 
                                      : "border-border/40 hover:border-border hover:bg-slate-50 dark:hover:bg-white/5 text-muted-foreground/60"
                                  )}
                                >
                                  <Icon className={cn("h-6 w-6", isSelected ? "text-primary" : "text-muted-foreground/40")} />
                                  <span className="text-[10px] font-bold truncate max-w-full">{label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Action Label</Label>
                            <Input 
                              placeholder="e.g. Download final files" 
                              className="h-14 bg-slate-50 dark:bg-black/20 border-border/20 focus:ring-primary/10 transition-all rounded-2xl text-[15px] font-medium px-5" 
                              value={newAction.label}
                              onChange={e => setNewAction(prev => ({ ...prev, label: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1 text-primary">Destination URL</Label>
                            <Input 
                              placeholder="https://..." 
                              className="h-14 bg-slate-50 dark:bg-black/20 border-border/20 focus:ring-primary/10 transition-all rounded-2xl text-[15px] font-medium px-5" 
                              value={newAction.url}
                              onChange={e => handleUrlChange(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-8 mt-8">
                          <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Show when</Label>
                            <select 
                              className="flex h-14 w-full rounded-2xl border border-border/20 bg-slate-50 dark:bg-black/20 px-5 py-2 text-[15px] font-medium ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/10 transition-all appearance-none"
                              value={newAction.showWhen}
                              onChange={e => setNewAction(prev => ({ ...prev, showWhen: e.target.value as 'on_approval' | 'always' }))}
                            >
                              <option value="on_approval">After final approval</option>
                              <option value="always">Always visible</option>
                            </select>
                          </div>
                          
                          <div className="flex items-end justify-end gap-4 p-2">
                             <Button 
                              variant="ghost" 
                              className="rounded-2xl px-6 h-14 text-[12px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5" 
                              onClick={() => setShowAddAction(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="lg" 
                              className="rounded-2xl px-10 h-14 bg-slate-900 dark:bg-primary text-white shadow-xl shadow-slate-200 dark:shadow-none hover:scale-[1.02] transition-all text-[12px] font-black uppercase tracking-widest"
                              onClick={handleAddAction}
                              disabled={!newAction.label || !newAction.url}
                            >
                              Add action
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {projectActions.length > 0 && (
                      <div className="mb-10">
                        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-1">Project Actions</p>
                        <div className="grid gap-3">
                          {projectActions.map(action => {
                            const Icon = providerIcons[action.providerType];
                            return (
                              <div key={action.id} className="flex items-center gap-5 rounded-[24px] border border-slate-200 dark:border-white/5 p-5 bg-white dark:bg-slate-900 group/item transition-all hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none">
                                <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform shadow-sm ring-1 ring-border/20">
                                  <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[15px] font-bold text-slate-900 dark:text-white mb-0.5">{action.label}</p>
                                  <p className="text-[11px] text-muted-foreground font-medium truncate opacity-60">{action.url}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-muted-foreground border-none">
                                    {providerTypeLabels[action.providerType]}
                                  </Badge>
                                  <button 
                                    onClick={() => handleDeleteAction(action.id)}
                                    className="p-2.5 rounded-xl hover:bg-destructive/10 text-muted-foreground/40 hover:text-destructive transition-all group-hover/item:opacity-100"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {workspaceActions.length > 0 && (
                      <div>
                        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-1 flex items-center gap-2">
                          <Building2 className="h-3.5 w-3.5" /> Inherited from workspace
                        </p>
                        <div className="grid gap-3 opacity-80">
                          {workspaceActions.map(action => {
                            const Icon = providerIcons[action.providerType];
                            return (
                              <div key={action.id} className="flex items-center gap-5 rounded-[24px] border border-dashed border-slate-200 dark:border-white/10 p-5 bg-slate-50/20 dark:bg-transparent transition-all">
                                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-border/20">
                                  <Icon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[15px] font-bold text-slate-400 dark:text-slate-500 mb-0.5">{action.label}</p>
                                  <p className="text-[11px] text-muted-foreground font-medium truncate opacity-40">{action.url}</p>
                                </div>
                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border-slate-200 dark:border-white/5 text-slate-400">
                                  {providerTypeLabels[action.providerType]}
                                </Badge>
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
