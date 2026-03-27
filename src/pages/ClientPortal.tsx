import { mockProjects, mockDeliverables, mockComments, mockNextStepActions } from '@/lib/mock-data';
import { StatusBadge } from '@/components/app/StatusBadge';
import { 
  CheckCircle2, FileText, MessageSquare, Send, Clock, ThumbsUp, 
  ArrowRight, ExternalLink, Sparkles, Check, ShieldCheck, Download,
  Maximize2, Share2, Info, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { providerIcons } from '@/lib/provider-icons';
import { Logo } from '@/components/brand/Logo';
import { Badge } from '@/components/ui/badge';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';

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
  const [resolvedCommentIds, setResolvedCommentIds] = useState<string[]>([]);
  const currentDel = deliverables.find(d => d.id === selectedDel);

  const toggleResolve = (id: string) => {
    setResolvedCommentIds(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const approvedCount = deliverables.filter(d => d.status === 'approved').length;
  const allApproved = approvedCount === deliverables.length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      {/* Branded header */}
      <header className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b sticky top-0 z-50">
        <div className="container max-w-7xl flex items-center justify-between h-18 py-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Logo variant="small" />
            <div className="h-4 w-px bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-primary">Secure Portal</span>
              <span className="text-[14px] font-bold text-slate-900 dark:text-white leading-none">Rivera Design Co</span>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-border/40">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Authenticated Access</span>
            </div>
            <div className="flex items-center gap-2.5 pl-4 border-l">
              <div className="text-right hidden xs:block">
                <p className="text-[12px] font-bold text-slate-900 dark:text-white leading-tight">Sarah Chen</p>
                <p className="text-[10px] text-muted-foreground font-medium">Project Owner</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-info via-info/80 to-blue-500 flex items-center justify-center text-[12px] font-black text-white shadow-sm ring-2 ring-info/10">
                SC
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10 md:py-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Project Info & History */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5">
                  Active Review
                </Badge>
                <div className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Started Mar 12, 2024
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
                {project.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl">
                {project.description}
              </p>
            </motion.div>

            {/* Premium Progress Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="card-elevated p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="h-24 w-24 text-primary" />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Project Completion</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                      {Math.round((approvedCount / deliverables.length) * 100)}%
                    </span>
                    <span className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">Approved</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md w-full space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                    <span>{approvedCount} of {deliverables.length} approved</span>
                    <span className={cn(allApproved ? "text-emerald-500" : "")}>
                      {allApproved ? "Phase Complete" : `Targeting ${new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 dark:bg-white/5 p-0.5 overflow-hidden ring-1 ring-slate-200/50 dark:ring-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(approvedCount / deliverables.length) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        allApproved ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "bg-primary shadow-[0_0_12px_rgba(var(--primary),0.3)]"
                      )}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Portal Context/Help */}
          <div className="lg:col-span-4 lg:pt-24">
            <StaggerContainer>
              <StaggerItem>
                <div className="glass-panel p-6 border-none ring-1 ring-primary/10 bg-primary/[0.02]">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-[14px] text-slate-900 dark:text-white">Review Interface</p>
                      <p className="text-[12px] text-muted-foreground leading-relaxed font-semibold">
                        Approve deliverables to lock in decisions, or request changes to initiate a revision cycle.
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 h-9">
                    View FAQ
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Deliverable list */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-[11px] text-muted-foreground font-black uppercase tracking-widest">
                Deliverables
              </p>
              <Badge variant="outline" className="text-[10px] font-bold border-muted/50 text-muted-foreground">
                {deliverables.length} Total
              </Badge>
            </div>

            <StaggerContainer className="space-y-3">
              {deliverables.map((d, i) => (
                <StaggerItem key={d.id}>
                  <button
                    onClick={() => setSelectedDel(d.id)}
                    className={cn(
                      'w-full text-left rounded-2xl transition-all duration-300 group relative',
                      selectedDel === d.id
                        ? 'p-0.5 bg-gradient-to-br from-primary/50 to-primary/10 shadow-lg ring-1 ring-primary/20'
                        : 'p-px bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/5'
                    )}
                  >
                    <div className={cn(
                      "rounded-[14px] p-4 flex items-center gap-4 transition-all duration-300",
                      selectedDel === d.id ? "bg-white dark:bg-slate-900" : "bg-white dark:bg-card border border-border/50"
                    )}>
                      <div className={cn(
                        'h-12 w-12 rounded-xl flex items-center justify-center text-[10px] font-black tracking-tighter shadow-sm transition-transform group-hover:scale-105',
                        fileTypeColors[d.fileType] || 'bg-slate-100 text-slate-400'
                      )}>
                        {d.fileType.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-bold text-[14px] truncate tracking-tight transition-colors",
                          selectedDel === d.id ? "text-primary" : "text-slate-900 dark:text-white"
                        )}>{d.title}</p>
                        <p className="text-[11px] text-muted-foreground font-semibold mt-0.5 flex items-center gap-1.5">
                          v{d.version} <span className="opacity-40">·</span> {new Date(d.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      {d.status === 'approved' ? (
                        <div className="h-6 w-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>

          {/* Review panel */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {currentDel && (
                <motion.div
                  key={currentDel.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="card-elevated p-0 overflow-hidden border-none ring-1 ring-slate-200/60 dark:ring-white/5">
                    <div className="p-8 border-b bg-white dark:bg-card">
                      <div className="flex items-start justify-between mb-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/5">
                              Deliverable
                            </Badge>
                            <span className="text-[11px] font-bold text-muted-foreground">ID: #{currentDel.id.slice(0, 8)}</span>
                          </div>
                          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{currentDel.title}</h3>
                          <div className="flex items-center gap-3 mt-2">
                             <div className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                               <Clock className="h-3.5 w-3.5" />
                               Revised yesterday
                             </div>
                             <div className="h-1 w-1 rounded-full bg-slate-300" />
                             <div className="text-[12px] font-bold text-muted-foreground">
                               {currentDel.fileName}
                             </div>
                          </div>
                        </div>
                        <StatusBadge status={currentDel.status} animated />
                      </div>

                      {/* File Preview Mock */}
                      <div className="aspect-video rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-white/5 flex flex-col items-center justify-center text-center p-12 group/preview relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-200/[0.05] bg-[size:20px_20px]" />
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative z-10"
                        >
                          <div className={cn(
                            "h-20 w-16 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-2xl ring-1 ring-white/10",
                            fileTypeColors[currentDel.fileType] || 'bg-slate-100 text-slate-400'
                          )}>
                            <FileText className="h-10 w-10" />
                          </div>
                          <p className="text-[14px] font-bold text-slate-900 dark:text-white mb-2">Preview for {currentDel.fileName}</p>
                          <p className="text-[12px] text-muted-foreground font-medium max-w-[200px] leading-relaxed">
                            Click to expand content or download the original file.
                          </p>
                        </motion.div>
                        
                        <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover/preview:opacity-100 transition-all translate-y-2 group-hover/preview:translate-y-0">
                          <Button variant="secondary" size="sm" className="h-9 px-4 rounded-xl font-bold text-[11px] uppercase tracking-widest gap-2">
                            <Download className="h-3.5 w-3.5" /> Download
                          </Button>
                          <Button variant="secondary" size="sm" className="h-9 px-4 rounded-xl font-bold text-[11px] uppercase tracking-widest gap-2">
                            <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
                          </Button>
                        </div>
                      </div>

                      {currentDel.status !== 'approved' ? (
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <Button variant="outline" className="h-12 rounded-xl font-black text-[12px] uppercase tracking-widest border-slate-200 hover:bg-slate-50 transition-all gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Request changes
                          </Button>
                          <Button className="h-12 rounded-xl font-black text-[12px] uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            Approve Version {currentDel.version}
                          </Button>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-8 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-500/20 p-6 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-emerald-700 dark:text-emerald-400">Approved by Client</p>
                              <p className="text-[12px] text-emerald-600/70 dark:text-emerald-400/60 font-semibold">Mar 27, 2024 at 11:42 AM</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-emerald-500 hover:bg-emerald-500/10 font-black text-[11px] uppercase tracking-widest h-9 px-4">
                            View Logs
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Premium Feedback Area */}
                  <div className="card-elevated p-0 overflow-hidden border-none ring-1 ring-slate-200/60 dark:ring-white/5">
                    <div className="p-8 bg-slate-50/50 dark:bg-white/5 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-[14px] flex items-center gap-2.5 uppercase tracking-widest text-slate-900 dark:text-white">
                          <MessageSquare className="h-4 w-4 text-primary" /> Revision History
                        </h3>
                        <Badge variant="outline" className="text-[10px] font-bold border-slate-200 text-muted-foreground bg-white">
                          {comments.length} Comments
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8 space-y-8">
                      {comments.map((c, i) => (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 relative group/comment"
                        >
                          {i < comments.length - 1 && (
                            <div className="absolute left-5 top-10 bottom-[-20px] w-px bg-slate-200 dark:bg-white/10" />
                          )}
                          <div className={cn(
                            'h-10 w-10 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 shadow-sm ring-2 relative z-10',
                            c.authorType === 'agency'
                              ? 'bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-white ring-primary/20'
                              : 'bg-gradient-to-br from-info via-info/80 to-blue-500 text-white ring-info/20'
                          )}>
                            {c.authorName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-bold text-slate-900 dark:text-white">{c.authorName}</span>
                                <span className="text-[11px] text-muted-foreground font-semibold">
                                  {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10">
                                  <Share2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className={cn(
                              "text-[13px] leading-relaxed font-medium p-4 rounded-2xl transition-all duration-300",
                              c.authorType === 'agency' 
                                ? "bg-primary/[0.04] text-slate-700 dark:text-slate-300 rounded-tl-none border border-primary/10" 
                                : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none border border-border/40",
                              (c.resolved || resolvedCommentIds.includes(c.id)) && "opacity-50 grayscale-[0.5]"
                            )}>
                              {c.body}
                              
                              {(c.resolved || resolvedCommentIds.includes(c.id)) && (
                                <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex items-center gap-2 text-[11px] font-bold text-emerald-500">
                                  <Check className="h-3.5 w-3.5" /> Resolved
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              {!(c.resolved || resolvedCommentIds.includes(c.id)) && (
                                <button 
                                  onClick={() => toggleResolve(c.id)}
                                  className="text-[11px] text-primary hover:text-primary/80 transition-colors font-black uppercase tracking-widest pl-1"
                                >
                                  Mark as resolved
                                </button>
                              )}
                              {(c.resolved || resolvedCommentIds.includes(c.id)) && !c.resolved && (
                                <button 
                                  onClick={() => toggleResolve(c.id)}
                                  className="text-[11px] text-muted-foreground hover:text-slate-900 transition-colors font-black uppercase tracking-widest pl-1"
                                >
                                  Unresolve
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {comments.length === 0 && (
                        <div className="text-center py-12">
                          <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                            <MessageSquare className="h-6 w-6 text-muted-foreground/30" />
                          </div>
                          <p className="text-[14px] font-bold text-slate-900 dark:text-white">No feedback yet</p>
                          <p className="text-[12px] text-muted-foreground font-medium mt-1">Start the conversation by adding a comment below.</p>
                        </div>
                      )}
                    </div>

                    <div className="p-8 bg-slate-50/50 dark:bg-white/5 border-t">
                      <div className="flex flex-col gap-4">
                        <Textarea
                          placeholder="Your feedback or change request..."
                          className="min-h-[100px] rounded-2xl border-none ring-1 ring-slate-200 focus-visible:ring-primary/40 bg-white shadow-inner text-[13px] font-medium p-4 resize-none"
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] text-muted-foreground font-bold italic">
                            Markdown supported
                          </p>
                          <Button 
                            className="h-10 px-6 rounded-xl font-black text-[12px] uppercase tracking-widest bg-slate-900 dark:bg-primary hover:bg-slate-800 dark:hover:bg-primary/90 shadow-lg transition-all gap-2"
                            disabled={!newComment.trim()}
                          >
                            <Send className="h-3.5 w-3.5" />
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Elite Celebration & Next Steps */}
        {allApproved && (() => {
          const actions = mockNextStepActions.filter(
            a => a.scope === 'workspace' || (a.scope === 'project' && a.projectId === project.id)
          );
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 card-elevated p-0 border-none ring-1 ring-emerald-500/20 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                <Sparkles className="h-64 w-64 text-emerald-500" />
              </div>

              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 p-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex flex-col justify-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent)]" />
                   
                   <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 1, duration: 0.6 }}
                     className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl ring-1 ring-white/30"
                   >
                     <CheckCircle2 className="h-8 w-8 text-white" />
                   </motion.div>
                   
                   <h3 className="text-3xl font-black tracking-tighter mb-4 leading-tight">Project Fully Approved</h3>
                   <p className="text-[15px] font-medium text-emerald-50/80 leading-relaxed mb-8">
                     Excellent! Every deliverable in this phase has been verified. You're ready to proceed to the next stage.
                   </p>
                   
                   <div className="flex items-center gap-3">
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className="h-8 w-8 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm">
                         <span className="text-[10px] font-black uppercase tracking-tighter">ELITE</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="md:col-span-3 p-10 space-y-8 bg-white dark:bg-card">
                   <div className="flex items-center justify-between">
                     <h4 className="font-black text-[13px] uppercase tracking-[0.2em] text-muted-foreground/80">Available Next Steps</h4>
                     <Badge className="bg-emerald-500 text-white border-none font-bold text-[10px] px-2.5">Ready</Badge>
                   </div>
                   
                   {actions.length > 0 && (
                    <StaggerContainer className="grid gap-4">
                      {actions.map((action, i) => {
                        const Icon = providerIcons[action.providerType];
                        return (
                          <StaggerItem key={action.id}>
                            <motion.a
                              href={action.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-5 rounded-2xl border border-slate-200 dark:border-white/5 p-5 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
                            >
                              <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:scale-105 transition-all shadow-sm ring-1 ring-slate-200/50 dark:ring-white/10">
                                <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200 group-hover:text-emerald-500 transition-colors" />
                              </div>
                              <div className="flex-1">
                                <span className="text-[15px] font-bold text-slate-900 dark:text-white block mb-0.5">{action.label}</span>
                                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                   Launch Asset <ArrowUpRight className="h-3 w-3" />
                                </span>
                              </div>
                              <div className="h-10 w-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <ExternalLink className="h-4 w-4" />
                              </div>
                            </motion.a>
                          </StaggerItem>
                        );
                      })}
                    </StaggerContainer>
                  )}
                </div>
              </div>
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
