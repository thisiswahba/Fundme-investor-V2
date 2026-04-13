import { EmptyHeroSection } from '../components/overview/EmptyHeroSection';
import { EmptyKPISummary } from '../components/overview/EmptyKPISummary';
import { EmptyPerformanceSection } from '../components/overview/EmptyPerformanceSection';
import { EmptyActiveInvestments } from '../components/overview/EmptyActiveInvestments';
import { EmptyTransactionsSection } from '../components/overview/EmptyTransactionsSection';
import { OpportunitiesPreview } from '../components/overview/OpportunitiesPreview';
import { WelcomeGuideCard } from '../components/overview/WelcomeGuideCard';
import { Link } from 'react-router';
import { TrendingUp } from 'lucide-react';

export function EmptyOverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h1 className="text-[28px] lg:text-[36px] leading-tight mb-2" style={{ color: '#002E83', fontWeight: 700, letterSpacing: '-0.02em' }}>
            مرحباً، أحمد 👋
          </h1>
          <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 400 }}>
            استثمر في فرص مختارة بعناية، وتابع أداء محفظتك، واستمتع بعوائد مجزية
          </p>
        </div>
        <Link
          to="/app/opportunities"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 8px 24px rgba(13, 130, 249, 0.3)',
          }}
        >
          <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
          <span>استثمر الآن</span>
        </Link>
      </div>

      {/* Wallet + Onboarding Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 order-2 lg:order-2 flex flex-col gap-5">
          <EmptyHeroSection />
          <EmptyKPISummary />
        </div>
        <div className="lg:col-span-1 order-1 lg:order-1">
          <WelcomeGuideCard />
        </div>
      </div>

      {/* Opportunities Carousel */}
      <div className="mb-6">
        <OpportunitiesPreview />
      </div>

      {/* Performance + Active Investments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <EmptyPerformanceSection />
        <EmptyActiveInvestments />
      </div>

      {/* Recent Transactions */}
      <div>
        <EmptyTransactionsSection />
      </div>
    </div>
  );
}
