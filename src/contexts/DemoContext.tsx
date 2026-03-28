import { createContext, useContext, useState, type ReactNode } from 'react';

export type DemoPlan = 'scaler' | 'studio' | null;

interface DemoContextType {
  isDemoMode: boolean;
  demoPlan: DemoPlan;
  demoUserName: string;
  demoAgencyName: string;
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

  return (
    <DemoContext.Provider value={{
      isDemoMode: demoPlan !== null,
      demoPlan,
      demoUserName: profile.userName,
      demoAgencyName: profile.agencyName,
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
