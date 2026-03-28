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
import { History, Building2, User2, Laptop, Calendar, CheckCircle, AlertCircle, Eye, CornerDownRight, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

const fileTypeColors: Record<string, string> = {
  svg: 'bg-primary/10 text-primary',
  pdf: 'bg-destructive/10 text-destructive',
  fig: 'bg-info/10 text-info',
};

const providerTypeLabels: Record<string, string> = {
  contract: 'Contract',
  invoice: 'Invoice',
  payment: 'Payment',
  booking: 'Booking',
  delivery: 'File Delivery',
  onboarding: 'Onboarding',
  custom: 'External Link'
};

const ClientPortal = () => {
  // For now, use mockProjects[0] as the portal preview.
  // In production, this would accept a project token via URL param.
  const project = mockProjects[0];
  const agencyName = project?.clientName ? 'Your Agency' : 'Agency';
  const portalYear = new Date().getFullYear();

  const deliverables = mockDeliverables.filter(d => d.projectId === project.id);
  const [selectedDel, setSelectedDel] = useState(deliverables[0]?.id);
  const currentDel = deliverables.find(d => d.id === selectedDel);
  const [activeVersion, setActiveVersion] = useState(currentDel?.version || 1);
  const comments = mockComments.filter(c => c.deliverableId === selectedDel && c.versionNumber === activeVersion);
  const [newComment, setNewComment] = useState('');
  const [resolvedCommentIds, setResolvedCommentIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleResolve = (id: string) => {
    setResolvedCommentIds(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (currentDel) {
      setActiveVersion(currentDel.version);
    }
  }, [selectedDel]);

  const approvedCount = deliverables.filter(d => d.status === 'approved').length;
  const allApproved = approvedCount === deliverables.length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      {/* Branded header */}
      <header className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b sticky top-0 z-50">
        <div className="container max-w-7xl flex items-center justify-between h-14 sm:h-18 py-3 sm:py-4 px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 sm:gap-4"
          >
            <Logo variant="small" />
            <div className="h-4 w-px bg-border/60 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] text-primary">Secure Portal</span>
              <span className="text-[13px] sm:text-[14px] font-bold text-slate-900 dark:text-white leading-none">{project.clientName}</span>
            </div>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-slate-900 dark:text-white leading-tight">{project.clientName}</p>
                <p className="text-[10px] text-muted-foreground font-medium">Client</p>
              </div>
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-info via-info/80 to-blue-500 flex items-center justify-center text-[11px] sm:text-[12px] font-black text-white shadow-sm ring-2 ring-info/10">
                {project.clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-10 md:py-16 max-w-7xl px-3 sm:px-4">
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12">
          {/* Left: Project Info & History */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-0.5 w-6 sm:w-8 bg-primary rounded-full" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary">
                  Reviewing Phase 01
                </span>
                <div className="h-1 w-1 rounded-full bg-slate-200 hidden sm:block" />
                <span className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:inline">
                  Secure Client Link
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-8 leading-[1.1]">
                Welcome back, <span className="text-primary/90">{project.clientName.split(' ')[0]}</span>.
              </h1>
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6 mb-6 sm:mb-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 text-center sm:text-left">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-border/50 flex items-center justify-center">
                    <Laptop className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground leading-none mb-0.5 sm:mb-1">Project</p>
                    <p className="text-[11px] sm:text-[14px] font-bold text-slate-900 dark:text-white leading-tight">{project.name}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 text-center sm:text-left border-x sm:border-x-0 border-border/30 sm:border-l sm:pl-6">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-border/50 flex items-center justify-center">
                    <User2 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground leading-none mb-0.5 sm:mb-1">Agency</p>
                    <p className="text-[11px] sm:text-[14px] font-bold text-slate-900 dark:text-white leading-tight">Approvr</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 text-center sm:text-left sm:border-l sm:pl-6">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-border/50 flex items-center justify-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground leading-none mb-0.5 sm:mb-1">Status</p>
                    <p className="text-[11px] sm:text-[14px] font-bold text-slate-900 dark:text-white leading-tight">Awaiting</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium Progress Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="card-elevated p-5 sm:p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="h-16 w-16 sm:h-24 sm:w-24 text-primary" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Project Completion</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                      {Math.round((approvedCount / deliverables.length) * 100)}%
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">Approved</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md w-full space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                    <span>{approvedCount} of {deliverables.length} approved</span>
                    <span className={cn(allApproved ? "text-emerald-500" : "")}>
                      {allApproved ? "Phase Complete" : `Targeting ${new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    </span>
                  </div>
                  <div className="h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-white/5 p-0.5 overflow-hidden ring-1 ring-slate-200/50 dark:ring-white/5">
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
                <div className="glass-panel p-4 sm:p-6 border-none ring-1 ring-primary/10 bg-primary/[0.02]">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Info className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-[13px] sm:text-[14px] text-slate-900 dark:text-white">Review Interface</p>
                      <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-relaxed font-semibold">
                        Approve deliverables to lock in decisions, or request changes to initiate a revision cycle.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 h-8 sm:h-9"
                    onClick={() => window.open('https://approvr.com/support', '_blank')}
                  >
                    View FAQ
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14">
          {/* Deliverable list */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex items-center justify-between px-1 sm:px-2">
              <p className="text-[10px] sm:text-[11px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                Review Assets
              </p>
              <Badge variant="outline" className="text-[9px] sm:text-[10px] font-bold border-muted/30 text-muted-foreground/60 bg-transparent">
                {deliverables.length} Items
              </Badge>
            </div>

            {/* Mobile: horizontal scroll, Desktop: vertical list */}
            <div className="sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 scrollbar-hide">
                {deliverables.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDel(d.id)}
                    className={cn(
                      'flex-shrink-0 w-[140px] text-left rounded-xl transition-all p-3',
                      selectedDel === d.id
                        ? 'bg-primary/5 border-primary/20 border shadow-sm'
                        : 'border border-border/40'
                    )}
                  >
                    <div className={cn(
                      'h-9 w-9 rounded-lg flex items-center justify-center text-[9px] font-black mb-2',
                      selectedDel === d.id ? "bg-primary text-white" : fileTypeColors[d.fileType] || 'bg-slate-100 text-slate-400'
                    )}>
                      {d.fileType.toUpperCase()}
                    </div>
                    <p className={cn(
                      "font-bold text-[12px] truncate tracking-tight",
                      selectedDel === d.id ? "text-slate-900 dark:text-white" : "text-muted-foreground"
                    )}>{d.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">v{d.version}</span>
                      {d.status === 'approved' && (
                        <span className="text-[8px] font-black uppercase text-emerald-500">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <StaggerContainer className="space-y-2 hidden sm:block">
              {deliverables.map((d, i) => (
                <StaggerItem key={d.id}>
                  <button
                    onClick={() => setSelectedDel(d.id)}
                    className={cn(
                      'w-full text-left rounded-2xl transition-all duration-500 group relative overflow-hidden',
                      selectedDel === d.id
                        ? 'p-px bg-gradient-to-br from-primary via-primary/40 to-transparent shadow-[0_20px_40px_-15px_rgba(var(--primary),0.15)] scale-[1.02] z-10'
                        : 'p-px bg-transparent hover:bg-slate-200/40 dark:hover:bg-white/5'
                    )}
                  >
                    <div className={cn(
                      "rounded-[15px] p-5 flex items-center gap-4 transition-all duration-500",
                      selectedDel === d.id ? "bg-white dark:bg-slate-900" : "bg-transparent border border-transparent"
                    )}>
                      <div className={cn(
                        'h-12 w-12 rounded-xl flex items-center justify-center text-[10px] font-black tracking-tighter shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:rotate-3',
                        selectedDel === d.id ? "bg-primary text-white" : fileTypeColors[d.fileType] || 'bg-slate-100 text-slate-400'
                      )}>
                        {d.fileType.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-bold text-[15px] truncate tracking-tight transition-colors duration-500",
                          selectedDel === d.id ? "text-slate-900 dark:text-white" : "text-muted-foreground group-hover:text-slate-700 dark:group-hover:text-slate-300"
                        )}>{d.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">Version {d.version}</span>
                          {d.status === 'approved' ? (
                            <>
                              <div className="h-1 w-1 rounded-full bg-emerald-500/30" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Approved</span>
                            </>
                          ) : d.status === 'changes_requested' ? (
                            <>
                              <div className="h-1 w-1 rounded-full bg-amber-500/30" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/80">Revising</span>
                            </>
                          ) : null}
                        </div>
                      </div>
                      {selectedDel === d.id && (
                        <div className="h-6 w-1 bg-primary rounded-full" />
                      )}
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>

          {/* Review panel */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              {currentDel && (
                <motion.div
                  key={currentDel.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="card-elevated p-0 overflow-hidden border-none ring-1 ring-slate-200/60 dark:ring-white/5">
                    <div className="p-4 sm:p-8 border-b bg-white dark:bg-card">
                      {/* Header: stack on mobile */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <Badge variant="outline" className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] border-primary/20 text-primary bg-primary/5 px-2 py-0.5 sm:py-1">
                              Action Required
                            </Badge>
                            <div className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Version {isComparing ? currentDel.version - 1 : currentDel.version}</span>
                          </div>
                          <h3 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                            {currentDel.title}
                          </h3>
                        </div>
                        <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-3">
                          <StatusBadge status={currentDel.status} animated />
                          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
                            {currentDel.versions && currentDel.versions.length > 1 && (
                              <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg sm:rounded-xl p-0.5 sm:p-1 border border-border/40">
                                {currentDel.versions.map((v) => (
                                  <button
                                    key={v.version}
                                    onClick={() => setActiveVersion(v.version)}
                                    className={cn(
                                      "px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-tight transition-all",
                                      activeVersion === v.version
                                        ? "bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-border/20"
                                        : "text-muted-foreground hover:text-slate-900 dark:hover:text-white"
                                    )}
                                  >
                                    v{v.version}
                                  </button>
                                ))}
                              </div>
                            )}
                            {activeVersion > 1 && (
                              <Button
                                variant="ghost"
                                className={cn(
                                  "h-7 sm:h-9 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all gap-1 sm:gap-2 border border-primary/10",
                                  isComparing ? "bg-primary text-white scale-95 shadow-lg shadow-primary/20" : "bg-primary/5 text-primary hover:bg-primary/10"
                                )}
                                onMouseDown={() => setIsComparing(true)}
                                onMouseUp={() => setIsComparing(false)}
                                onMouseLeave={() => setIsComparing(false)}
                                onTouchStart={() => setIsComparing(true)}
                                onTouchEnd={() => setIsComparing(false)}
                              >
                                <History className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                <span className="hidden sm:inline">Hold to Compare (v{activeVersion - 1})</span>
                                <span className="sm:hidden">Compare</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* File Preview Mock */}
                      <div className="aspect-[16/10] rounded-2xl sm:rounded-[32px] bg-slate-50 dark:bg-slate-950 border border-border/50 flex flex-col items-center justify-center text-center p-6 sm:p-12 group/preview relative overflow-hidden shadow-inner cursor-zoom-in">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.03),transparent)]" />
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                        
                        <motion.div
                          key={isComparing ? 'prev' : 'curr'}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10"
                        >
                          <div className={cn(
                            "h-20 w-16 sm:h-32 sm:w-24 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 mx-auto shadow-2xl ring-1 ring-white/10 group-hover/preview:scale-110 transition-transform duration-700",
                            isComparing ? "bg-slate-300 dark:bg-slate-700 text-slate-500 grayscale opacity-80" : (fileTypeColors[currentDel.fileType] || 'bg-slate-100 text-slate-400')
                          )}>
                            <FileText className="h-8 w-8 sm:h-12 sm:w-12" />
                            {isComparing && (
                              <div className="absolute inset-x-0 -bottom-8 sm:-bottom-10 flex justify-center">
                                <Badge className="bg-slate-900 text-white border-none font-black text-[8px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5">Comparing v{activeVersion - 1}</Badge>
                              </div>
                            )}
                          </div>
                          <h4 className="text-[14px] sm:text-[18px] font-black tracking-tight text-slate-900 dark:text-white mb-1 sm:mb-2">
                            {isComparing ? currentDel.fileName.replace(`v${currentDel.version}`, `v${activeVersion - 1}`) : currentDel.fileName.replace(`v${currentDel.version}`, `v${activeVersion}`)}
                          </h4>
                          <p className="text-[11px] sm:text-[13px] text-muted-foreground font-medium max-w-[280px] leading-relaxed mx-auto">
                            {isComparing 
                              ? `Comparing changes from version ${activeVersion - 1}.`
                              : `Reviewing version ${activeVersion} of this deliverable.`}
                          </p>
                        </motion.div>
                        
                        <div className="absolute bottom-4 sm:bottom-8 flex gap-2 sm:gap-3 opacity-0 group-hover/preview:opacity-100 transition-all translate-y-4 group-hover/preview:translate-y-0 duration-500">
                          <Button variant="secondary" className="h-8 sm:h-11 px-3 sm:px-6 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] gap-1.5 sm:gap-3 bg-white dark:bg-slate-900 shadow-xl border-border/40">
                            <Download className="h-3 w-3 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Download Original</span><span className="sm:hidden">Download</span>
                          </Button>
                          <Button variant="secondary" className="h-8 sm:h-11 px-3 sm:px-6 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] gap-1.5 sm:gap-3 bg-white dark:bg-slate-900 shadow-xl border-border/40">
                            <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Expand View</span><span className="sm:hidden">Expand</span>
                          </Button>
                        </div>
                      </div>

                      {currentDel.status !== 'approved' ? (
                        <div className="flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-12 bg-primary/[0.02] dark:bg-white/[0.02] p-5 sm:p-10 rounded-2xl sm:rounded-[32px] border-2 border-primary/20">
                          <div className="text-center space-y-1">
                            <h4 className="text-[14px] sm:text-[16px] font-black uppercase tracking-widest text-foreground">Your Decision</h4>
                            <p className="text-[12px] sm:text-[14px] text-muted-foreground font-medium">Review carefully, then choose an action below.</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <Button variant="outline" className="h-14 sm:h-16 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-[13px] uppercase tracking-[0.1em] sm:tracking-[0.15em] border-2 border-border hover:border-primary/30 hover:bg-primary/5 transition-all gap-2 sm:gap-3 group">
                              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              Request Changes
                            </Button>
                            <Button className="h-14 sm:h-16 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-[13px] uppercase tracking-[0.1em] sm:tracking-[0.15em] bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_20px_40px_-10px_hsl(var(--primary)/0.4)] transition-all gap-2 sm:gap-3 group">
                              <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                              Approve This Version
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-6 sm:mt-12 rounded-2xl sm:rounded-[32px] bg-emerald-500/5 border border-emerald-500/20 p-6 sm:p-10 flex flex-col items-center text-center space-y-3 sm:space-y-4"
                        >
                          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-1 sm:mb-2">
                            <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-[0.1em]">Officially Approved</h4>
                            <p className="text-[12px] sm:text-[14px] text-muted-foreground font-medium mt-1">This version has been officially approved and locked</p>
                          </div>
                          <Button variant="ghost" className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 mt-1 sm:mt-2 px-6 sm:px-8 h-8 sm:h-10 rounded-xl">
                            View Audit Trail
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Premium Feedback Area */}
                   <div className="card-elevated p-0 overflow-hidden border-none ring-1 ring-border/40">
                    <button 
                      onClick={() => setShowComments(!showComments)}
                      className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-black text-[12px] sm:text-[13px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground">
                            Feedback
                          </h3>
                          <p className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                            {comments.length} Comments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] sm:text-[10px] font-bold border-emerald-500/20 text-emerald-600 bg-emerald-500/5 px-2 py-0.5">
                          {resolvedCommentIds.length + comments.filter(c => c.resolved).length} Resolved
                        </Badge>
                        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showComments && "rotate-180")} />
                      </div>
                    </button>

                    <AnimatePresence>
                    {showComments && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="p-4 sm:p-10 space-y-6 sm:space-y-10">
                      {/* Version Revision Narrative */}
                      {currentDel.versions?.find(v => v.version === activeVersion) && (
                        <div className="bg-primary/[0.03] border border-primary/10 p-4 sm:p-8 rounded-2xl sm:rounded-[32px] mb-4 sm:mb-8 relative overflow-hidden group/narrative">
                          <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-[0.03] group-hover/narrative:opacity-[0.07] transition-opacity">
                            <Sparkles className="h-10 w-10 sm:h-16 sm:w-16 text-primary" />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-3 sm:mb-4">
                            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> What Changed in v{activeVersion}
                            </p>
                            <span className="text-[9px] sm:text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                              Submitted by {currentDel.versions?.find(v => v.version === activeVersion)?.submittedBy}
                            </span>
                          </div>
                          <h4 className="text-[15px] sm:text-[18px] font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight leading-tight">
                            {currentDel.versions?.find(v => v.version === activeVersion)?.note || "Official Revision Update"}
                          </h4>
                          <p className="text-[12px] sm:text-[14px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                            {currentDel.versions?.find(v => v.version === activeVersion)?.changeSummary || "No detailed change log provided for this version."}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary/10">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-500" />
                              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                {currentDel.versions?.find(v => v.version === activeVersion)?.resolvedCount || 0} Resolved
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500" />
                              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                {currentDel.versions?.find(v => v.version === activeVersion)?.openCount || 0} Pending
                              </span>
                            </div>
                             <div className="ml-auto flex items-center gap-2">
                              <span className="text-[9px] sm:text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Round #{currentDel.versions?.find(v => v.version === activeVersion)?.reviewRound}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-6 sm:space-y-12 relative">
                        {comments.length > 1 && (
                          <div className="absolute left-[16px] sm:left-[20px] top-6 bottom-6 w-px bg-slate-100 dark:bg-white/5" />
                        )}
                        
                        {comments.map((c, i) => (
                          <motion.div
                            key={c.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 sm:gap-6 relative group/comment"
                          >
                            <div className={cn(
                              'h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[10px] sm:text-[11px] font-black flex-shrink-0 shadow-lg ring-2 sm:ring-4 ring-white dark:ring-slate-900 relative z-10 transition-all group-hover/comment:scale-110',
                              c.authorType === 'agency'
                                ? 'bg-slate-900 text-white'
                                : 'bg-primary text-white'
                            )}>
                              {c.authorName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <span className="text-[12px] sm:text-[14px] font-black text-slate-900 dark:text-white tracking-tight">{c.authorName}</span>
                                  <div className="h-1 w-1 rounded-full bg-slate-200" />
                                  <span className="text-[9px] sm:text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {new Date(c.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                                  </span>
                                </div>
                                {(c.resolved || resolvedCommentIds.includes(c.id)) && (
                                  <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-500" />
                                    <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Resolved</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className={cn(
                                "text-[13px] sm:text-[15px] leading-relaxed font-medium p-4 sm:p-6 rounded-xl sm:rounded-[24px] shadow-sm transition-all duration-500",
                                c.authorType === 'agency' 
                                  ? "bg-white dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-white/5" 
                                  : "bg-slate-50 dark:bg-white/5 border border-transparent",
                                (c.resolved || resolvedCommentIds.includes(c.id)) && "opacity-40 scale-[0.98] blur-[0.2px]"
                              )}>
                                {c.body}
                                
                                <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 border-t border-slate-100 dark:border-white/5 pt-3 sm:pt-4">
                                  {!(c.resolved || resolvedCommentIds.includes(c.id)) ? (
                                    <button 
                                      onClick={() => toggleResolve(c.id)}
                                      className="text-[10px] sm:text-[11px] text-primary hover:text-primary/70 transition-all font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1.5 sm:gap-2"
                                    >
                                      <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Mark Resolved
                                    </button>
                                  ) : !c.resolved && (
                                    <button 
                                      onClick={() => toggleResolve(c.id)}
                                      className="text-[10px] sm:text-[11px] text-muted-foreground hover:text-slate-900 transition-all font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1.5 sm:gap-2"
                                    >
                                      <CornerDownRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Unresolve
                                    </button>
                                  )}
                                  <button className="text-[10px] sm:text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-all font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] ml-auto">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {comments.length === 0 && (
                        <div className="text-center py-12 sm:py-20 bg-slate-50/50 dark:bg-white/[0.02] rounded-2xl sm:rounded-[32px] border border-dashed border-border/60">
                          <div className="h-14 w-14 sm:h-20 sm:w-20 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl ring-1 ring-border/20">
                            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/20" />
                          </div>
                          <h4 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-[0.1em]">No Feedback Recorded</h4>
                          <p className="text-[12px] sm:text-[14px] text-muted-foreground font-medium mt-2 max-w-[300px] mx-auto leading-relaxed">Everything looks clear! Use the field below if you have any questions or requests.</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-10 bg-slate-50/80 dark:bg-white/5 border-t">
                      <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="relative">
                          <Textarea
                            placeholder="Type a comment or ask a question..."
                            className="min-h-[100px] sm:min-h-[140px] rounded-xl sm:rounded-[24px] border-none ring-1 ring-border/60 focus-visible:ring-primary/40 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/10 text-[13px] sm:text-[15px] font-medium p-4 sm:p-6 resize-none transition-all placeholder:text-muted-foreground/40"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                          />
                          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
                             <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-border/40">
                               <Info className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground/40" />
                             </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500/60" />
                            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                              Reviewing as <span className="text-slate-900 dark:text-white">Sarah Chen</span>
                            </p>
                          </div>
                          <Button 
                            className="h-10 sm:h-12 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] bg-slate-900 dark:bg-primary text-white hover:bg-slate-800 dark:hover:bg-primary/90 shadow-2xl transition-all gap-2 sm:gap-3 overflow-hidden group w-full sm:w-auto"
                            disabled={!newComment.trim()}
                          >
                            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Submit Feedback
                          </Button>
                        </div>
                      </div>
                    </div>
                    </motion.div>
                    )}
                    </AnimatePresence>
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
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 sm:mt-28 card-elevated p-0 border-none ring-1 ring-emerald-500/20 overflow-hidden relative shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)]"
            >
              <div className="absolute top-0 right-0 p-6 sm:p-12 opacity-[0.02] rotate-12 pointer-events-none">
                <Sparkles className="h-48 w-48 sm:h-96 sm:w-96 text-emerald-500" />
              </div>

              <div className="grid lg:grid-cols-5">
                <div className="lg:col-span-2 p-6 sm:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent)]" />
                   
                   <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                     className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-emerald-500 flex items-center justify-center mb-5 sm:mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)] ring-1 ring-white/20"
                   >
                     <CheckCircle2 className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
                   </motion.div>
                   
                    <h3 className="text-2xl sm:text-4xl font-black tracking-tighter mb-4 sm:mb-6 leading-[1.1]">Phase <br/><span className="text-emerald-400">Approved ✨</span></h3>
                   <p className="text-[13px] sm:text-[16px] font-medium text-slate-300 leading-relaxed mb-6 sm:mb-10">
                     Outstanding! All deliverables for this phase have been officially approved.
                   </p>
                   
                   <div className="flex items-center gap-3 sm:gap-4">
                     <div className="flex -space-x-2 sm:-space-x-3">
                       {[...Array(3)].map((_, i) => (
                         <div key={i} className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl border-2 border-slate-900 overflow-hidden flex items-center justify-center bg-slate-800 text-[9px] sm:text-[10px] font-black uppercase ring-1 ring-white/10">
                           <User2 className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                         </div>
                       ))}
                     </div>
                     <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400">Team Notified</span>
                   </div>
                </div>

                <div className="lg:col-span-3 p-6 sm:p-12 space-y-6 sm:space-y-10 bg-white dark:bg-slate-900/50">
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5 sm:space-y-1">
                       <h4 className="font-black text-[12px] sm:text-[14px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-900 dark:text-white">Next Phase Assets</h4>
                       <p className="text-[10px] sm:text-[12px] text-muted-foreground font-medium uppercase tracking-widest leading-none">Your approved resources</p>
                     </div>
                     <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 uppercase tracking-widest">Locked</Badge>
                   </div>
                   
                   {actions.length > 0 && (
                    <StaggerContainer className="grid gap-3 sm:gap-4">
                      {actions.map((action, i) => {
                        const Icon = providerIcons[action.providerType];
                        return (
                          <StaggerItem key={action.id}>
                            <motion.a
                              href={action.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 sm:gap-6 rounded-2xl sm:rounded-3xl border border-border/40 p-4 sm:p-6 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-slate-900 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 group"
                            >
                              <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-xl sm:rounded-[20px] bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-500 shadow-sm ring-1 ring-border/20">
                                <Icon className="h-5 w-5 sm:h-8 sm:w-8 text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[13px] sm:text-[16px] font-black text-slate-900 dark:text-white block mb-0.5 sm:mb-1 tracking-tight truncate">{action.label}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] sm:text-[11px] font-black text-muted-foreground/60 uppercase tracking-widest leading-none">
                                     {providerTypeLabels[action.providerType] || "External Link"}
                                  </span>
                                </div>
                              </div>
                              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl border border-border/40 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 dark:group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
      <footer className="border-t mt-16 sm:mt-32 bg-white dark:bg-slate-950/50">
        <div className="container py-6 sm:py-12 px-3 sm:px-4">
          <div className="flex flex-col items-center gap-4 sm:gap-8 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Logo variant="small" />
              <div className="h-4 w-px bg-border/60" />
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">Client Portal</p>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="mailto:hello@approvr.com" className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Support</a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Terms</a>
            </div>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-bold uppercase tracking-widest italic opacity-40">
              © 2024 Rivera Design Co
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile approve bar */}
      {currentDel && currentDel.status !== 'approved' && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-card/95 backdrop-blur-xl border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest border-2">
              <MessageSquare className="h-4 w-4 mr-1.5" />
              Changes
            </Button>
            <Button className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/30">
              <ThumbsUp className="h-4 w-4 mr-1.5" />
              Approve
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
