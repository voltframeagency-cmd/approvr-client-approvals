import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { planConfigs, type PlanConfig, type PlanFeatures } from '@/lib/plan-config';
import { demoDataSets, type DemoDataSet, type DemoUsageStats } from '@/lib/demo-data';

export type DemoPlan = 'scaler' | 'studio' | null;

interface DemoContextType {
  isDemoMode: boolean;
  demoPlan: DemoPlan;
  demoUserName: string;
  demoAgencyName: string;
  planConfig: PlanConfig | null;
  demoData: DemoDataSet | null;
  usage: DemoUsageStats | null;
  hasFeature: (feature: keyof PlanFeatures) => boolean;
  enterDemo: (plan: 'scaler' | 'studio') => void;
  exitDemo: () => void;
}

const demoProfiles: Record<'scaler' | 'studio', { userName: string; agencyName: string }> = {
  scaler: { userName: 'Jamie Torres', agencyName: 'Torres Creative' },
  studio: { userName: 'Alex Rivera', agencyName: 'Rivera Design Studio' },
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const [demoPlan, setDemoPlan] = useState<DemoPlan>(null);

  const enterDemo = (plan: 'scaler' | 'studio') => {
    setDemoPlan(plan);
  };

  const exitDemo = () => {
    setDemoPlan(null);
  };

  const profile = demoPlan ? demoProfiles[demoPlan] : { userName: '', agencyName: '' };
  const planConfig = demoPlan ? planConfigs[demoPlan] : null;
  const demoData = demoPlan ? demoDataSets[demoPlan] : null;
  const usage = demoData?.usage ?? null;

  const hasFeature = useMemo(() => {
    return (feature: keyof PlanFeatures): boolean => {
      if (!planConfig) return false;
      return planConfig.features[feature];
    };
  }, [planConfig]);

  return (
    <DemoContext.Provider value={{
      isDemoMode: demoPlan !== null,
      demoPlan,
      demoUserName: profile.userName,
      demoAgencyName: profile.agencyName,
      planConfig,
      demoData,
      usage,
      hasFeature,
      enterDemo,
      exitDemo,
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
};
