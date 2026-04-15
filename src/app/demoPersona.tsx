import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

/* ──────────────────────────────────────────────
   Persona Types
   ────────────────────────────────────────────── */

export type PersonaId = 'completed' | 'new' | 'vip';

export interface PersonaProfile {
  id: PersonaId;
  nameAr: string;
  nameEn: string;
  email: string;
  isVIP: boolean;
  avatarInitialsAr: string;
  avatarInitialsEn: string;
}

export interface PersonaWallet {
  available: number;
  pending: number;
  total: number;
  lastTransactionAr: string;
  lastTransactionEn: string;
}

export interface PersonaPortfolio {
  totalValue: number;
  monthlyGrowth: number;
  totalInvested: number;
  realizedReturns: number;
  averageReturn: number;
  activeInvestments: number;
  remainingLimit: number;
}

export interface PersonaOnboarding {
  completedSteps: number; // 0–3
  totalSteps: number;
}

export interface Persona {
  profile: PersonaProfile;
  wallet: PersonaWallet;
  portfolio: PersonaPortfolio;
  onboarding: PersonaOnboarding;
  /** Which overview page to render */
  dashboardView: 'empty' | 'active' | 'vip';
}

/* ──────────────────────────────────────────────
   Persona Definitions
   ────────────────────────────────────────────── */

export const completedInvestor: Persona = {
  profile: {
    id: 'completed',
    nameAr: 'أحمد المالكي',
    nameEn: 'Ahmed Al-Malki',
    email: 'ahmed@example.com',
    isVIP: true,
    avatarInitialsAr: 'أم',
    avatarInitialsEn: 'AM',
  },
  wallet: {
    available: 45000,
    pending: 8500,
    total: 53500,
    lastTransactionAr: 'إيداع ١٠٠,٠٠٠ ﷼ — ٦ أبريل',
    lastTransactionEn: 'Deposit 100,000 SAR — Apr 6',
  },
  portfolio: {
    totalValue: 485000,
    monthlyGrowth: 8.4,
    totalInvested: 440000,
    realizedReturns: 45000,
    averageReturn: 12.3,
    activeInvestments: 12,
    remainingLimit: 560000,
  },
  onboarding: {
    completedSteps: 3,
    totalSteps: 3,
  },
  dashboardView: 'active',
};

export const newInvestor: Persona = {
  profile: {
    id: 'new',
    nameAr: 'سارة العتيبي',
    nameEn: 'Sara Al-Otaibi',
    email: 'sara@example.com',
    isVIP: false,
    avatarInitialsAr: 'سع',
    avatarInitialsEn: 'SA',
  },
  wallet: {
    available: 0,
    pending: 0,
    total: 0,
    lastTransactionAr: '',
    lastTransactionEn: '',
  },
  portfolio: {
    totalValue: 0,
    monthlyGrowth: 0,
    totalInvested: 0,
    realizedReturns: 0,
    averageReturn: 0,
    activeInvestments: 0,
    remainingLimit: 1000000,
  },
  onboarding: {
    completedSteps: 0,
    totalSteps: 3,
  },
  dashboardView: 'empty',
};

export const vipInvestor: Persona = {
  profile: {
    id: 'vip',
    nameAr: 'فهد الدوسري',
    nameEn: 'Fahad Al-Dosari',
    email: 'fahad@aldosari.sa',
    isVIP: true,
    avatarInitialsAr: 'فد',
    avatarInitialsEn: 'FD',
  },
  wallet: {
    available: 320000,
    pending: 45000,
    total: 365000,
    lastTransactionAr: 'إيداع ٥٠٠,٠٠٠ ﷼ — ١٠ أبريل',
    lastTransactionEn: 'Deposit 500,000 SAR — Apr 10',
  },
  portfolio: {
    totalValue: 2850000,
    monthlyGrowth: 6.2,
    totalInvested: 2400000,
    realizedReturns: 450000,
    averageReturn: 14.8,
    activeInvestments: 28,
    remainingLimit: 2150000,
  },
  onboarding: {
    completedSteps: 3,
    totalSteps: 3,
  },
  dashboardView: 'vip',
};

const PERSONAS: Record<PersonaId, Persona> = {
  completed: completedInvestor,
  new: newInvestor,
  vip: vipInvestor,
};

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */

interface DemoPersonaCtx {
  persona: Persona;
  personaId: PersonaId;
  setPersonaId: (id: PersonaId) => void;
}

const DemoPersonaContext = createContext<DemoPersonaCtx>({
  persona: completedInvestor,
  personaId: 'completed',
  setPersonaId: () => {},
});

export function DemoPersonaProvider({ children }: { children: ReactNode }) {
  // Read initial persona from ?persona= query param or default to 'completed'
  const [personaId, setPersonaIdState] = useState<PersonaId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('persona');
      if (p === 'new' || p === 'completed' || p === 'vip') return p;
    }
    return 'completed';
  });

  function setPersonaId(id: PersonaId) {
    setPersonaIdState(id);
    // Update URL query param without reload
    const url = new URL(window.location.href);
    url.searchParams.set('persona', id);
    window.history.replaceState({}, '', url.toString());
  }

  // Sync if query param changes externally (e.g. paste URL)
  useEffect(() => {
    function onPop() {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('persona');
      if (p === 'new' || p === 'completed') setPersonaIdState(p);
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const persona = PERSONAS[personaId];

  return (
    <DemoPersonaContext.Provider value={{ persona, personaId, setPersonaId }}>
      {children}
    </DemoPersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(DemoPersonaContext);
}
