import { useDemo } from '@/contexts/DemoContext';
import type { PlanFeatures } from '@/lib/plan-config';
import { featureLabels } from '@/lib/plan-config';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeatureGateProps {
  feature: keyof PlanFeatures;
  children: React.ReactNode;
  /** Render inline lock badge instead of overlay */
  inline?: boolean;
  className?: string;
}

export const FeatureGate = ({ feature, children, inline = false, className }: FeatureGateProps) => {
  const { isDemoMode, hasFeature, demoPlan } = useDemo();

  // Not in demo mode or feature is available — render normally
  if (!isDemoMode || hasFeature(feature)) {
    return <>{children}</>;
  }

  const label = featureLabels[feature];

  if (inline) {
    return (
      <div className={cn("relative", className)}>
        <div className="opacity-40 pointer-events-none select-none blur-[1px]">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/90 border border-border/60 backdrop-blur-sm shadow-sm">
            <Lock className="h-3 w-3 text-muted-foreground" />
            <span className="text-[11px] font-bold text-muted-foreground">Studio only</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl overflow-hidden", className)}>
      <div className="opacity-30 pointer-events-none select-none blur-[2px]">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
        <div className="text-center p-6 max-w-xs">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h4 className="text-sm font-bold tracking-tight text-foreground mb-1">{label}</h4>
          <p className="text-[12px] text-muted-foreground mb-4">
            This feature is available on <strong>The Studio</strong> plan.
          </p>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs rounded-lg font-bold border-primary/20 text-primary hover:bg-primary/5">
            Upgrade to Studio <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

/** Simple hook to check feature availability in demo */
export const useDemoFeature = (feature: keyof PlanFeatures): boolean => {
  const { isDemoMode, hasFeature } = useDemo();
  if (!isDemoMode) return true;
  return hasFeature(feature);
};
