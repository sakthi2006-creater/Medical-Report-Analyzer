import { createContext, useContext, useState, ReactNode } from 'react';
import { HealthInput, HealthReport } from '@/lib/types';

interface HealthContextType {
  healthInput: HealthInput | null;
  setHealthInput: (input: HealthInput) => void;
  healthReport: HealthReport | null;
  setHealthReport: (report: HealthReport) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: ReactNode }) {
  const [healthInput, setHealthInput] = useState<HealthInput | null>(null);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);

  return (
    <HealthContext.Provider value={{ healthInput, setHealthInput, healthReport, setHealthReport }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) throw new Error('useHealth must be used within HealthProvider');
  return context;
}
