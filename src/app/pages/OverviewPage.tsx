import { HeroSection } from '../components/overview/HeroSection';
import { KPISummary } from '../components/overview/KPISummary';
import { PerformanceSection } from '../components/overview/PerformanceSection';
import { ActiveInvestmentsSection } from '../components/overview/ActiveInvestmentsSection';
import { OpportunitiesPreview } from '../components/overview/OpportunitiesPreview';
import { RepaymentsSection } from '../components/overview/RepaymentsSection';
import { SmartInsightSection } from '../components/overview/SmartInsightSection';
import { TransactionsSection } from '../components/overview/TransactionsSection';

export function OverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="mb-8">
        <HeroSection />
      </div>

      {/* KPI Summary */}
      <div className="mb-8">
        <KPISummary />
      </div>

      {/* Performance Chart + Smart Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PerformanceSection />
        </div>
        <div>
          <SmartInsightSection />
        </div>
      </div>

      {/* Active Investments + Repayments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActiveInvestmentsSection />
        <RepaymentsSection />
      </div>

      {/* Opportunities Preview */}
      <div className="mb-8">
        <OpportunitiesPreview />
      </div>

      {/* Transactions */}
      <div>
        <TransactionsSection />
      </div>
    </div>
  );
}