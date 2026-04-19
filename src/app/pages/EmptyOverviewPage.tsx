import { EmptyHeroSection } from '../components/overview/EmptyHeroSection';
import { EmptyKPISummary } from '../components/overview/EmptyKPISummary';
import { EmptyPerformanceSection } from '../components/overview/EmptyPerformanceSection';
import { EmptyActiveInvestments } from '../components/overview/EmptyActiveInvestments';
import { EmptyTransactionsSection } from '../components/overview/EmptyTransactionsSection';
import { OpportunitiesPreview } from '../components/overview/OpportunitiesPreview';
import { AutoInvestWidget } from '../components/overview/AutoInvestWidget';

export function EmptyOverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-7 pb-24 md:pb-8">

      {/* A. Wallet Card — same hero used by the regular investor */}
      <div className="mb-5">
        <EmptyHeroSection />
      </div>

      {/* B. Metrics Row — empty/zero state matches the regular layout */}
      <div className="mb-5">
        <EmptyKPISummary />
      </div>

      {/* C. Performance + Auto-Invest — replaces the regular's investments/repayments slot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <EmptyPerformanceSection />
        <AutoInvestWidget />
      </div>

      {/* D. Opportunities Preview — same as regular */}
      <div className="mb-5">
        <OpportunitiesPreview />
      </div>

      {/* E. Active Investments + Transactions — empty states */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmptyActiveInvestments />
        <EmptyTransactionsSection />
      </div>
    </div>
  );
}
