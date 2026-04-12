import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type InvestorType = "individual" | "institutional" | null;

export interface RiskAnswer {
  question: number;
  answer: number;
}

export interface OnboardingData {
  investorType: InvestorType;
  phone: string;
  otp: string;
  nationalId: string;
  password: string;
  riskAnswers: RiskAnswer[];
}

interface OnboardingContextType {
  step: number;
  totalSteps: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  next: () => void;
  back: () => void;
  updateData: (partial: Partial<OnboardingData>) => void;
  progress: number;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const TOTAL_STEPS = 7;

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    investorType: null,
    phone: "",
    otp: "",
    nationalId: "",
    password: "",
    riskAnswers: [],
  });

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);
  const updateData = useCallback(
    (partial: Partial<OnboardingData>) => setData((d) => ({ ...d, ...partial })),
    [],
  );

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <OnboardingContext.Provider
      value={{ step, totalSteps: TOTAL_STEPS, data, setStep, next, back, updateData, progress }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
