import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, X, Rocket, FolderPlus, Upload, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const stepIcons: Record<string, typeof FolderPlus> = {
  create_project: FolderPlus,
  upload_deliverable: Upload,
  share_link: Share2,
  first_approval: ThumbsUp,
};

const stepActions: Record<string, { label: string; to?: string; action?: string }> = {
  create_project: { label: 'Create Project', to: '/dashboard/projects' },
  upload_deliverable: { label: 'Upload File', to: '/dashboard/projects' },
  share_link: { label: 'Copy Link', action: 'copy' },
  first_approval: { label: 'View Portal', to: '/portal' },
};

export const OnboardingChecklist = () => {
  const { steps, completeStep, dismiss, isVisible, progress, completedCount } = useOnboarding();

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card-elevated p-5 md:p-6 relative overflow-hidden border-none ring-1 ring-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.02]"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-foreground">Get your first approval</h3>
              <p className="text-[11px] text-muted-foreground font-medium">Complete these steps in under 3 minutes</p>
            </div>
          </div>
          <button 
            onClick={dismiss} 
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{completedCount} of {steps.length} complete</span>
            <span className="text-[10px] font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => {
            const Icon = stepIcons[step.id] || Circle;
            const action = stepActions[step.id];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all",
                  step.completed ? "bg-emerald-500/5 opacity-60" : "bg-muted/30 hover:bg-muted/50"
                )}
              >
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/20 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-[13px] font-bold",
                    step.completed ? "line-through text-muted-foreground" : "text-foreground"
                  )}>{step.title}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{step.description}</p>
                </div>
                {!step.completed && (
                  action?.to ? (
                    <Link to={action.to}>
                      <Button size="sm" variant="ghost" className="h-7 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary hover:bg-primary/10">
                        {action.label}
                      </Button>
                    </Link>
                  ) : action?.action === 'copy' ? (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary hover:bg-primary/10"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/portal`);
                        toast.success('Portal link copied!');
                        completeStep(step.id);
                      }}
                    >
                      {action.label}
                    </Button>
                  ) : null
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export const OnboardingWelcome = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-8 md:p-10 max-w-md w-full text-center space-y-6 border-none ring-1 ring-primary/20"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Welcome to Approvr</h2>
            <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">
              Let's get your first approval in under 3 minutes. We'll guide you through each step.
            </p>
          </div>
          <Button onClick={onDismiss} className="w-full rounded-xl font-bold h-12 text-[13px] shadow-lg shadow-primary/20">
            Let's Go <Rocket className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
