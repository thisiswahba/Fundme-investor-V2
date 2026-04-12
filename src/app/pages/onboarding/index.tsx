import { OnboardingProvider } from "./OnboardingContext";
import { OnboardingLayout } from "./OnboardingLayout";

export function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingLayout />
    </OnboardingProvider>
  );
}
