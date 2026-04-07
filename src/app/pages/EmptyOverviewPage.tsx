import { EmptyHeroSection } from '../components/overview/EmptyHeroSection';
import { EmptyKPISummary } from '../components/overview/EmptyKPISummary';
import { EmptyPerformanceSection } from '../components/overview/EmptyPerformanceSection';
import { EmptyActiveInvestments } from '../components/overview/EmptyActiveInvestments';
import { OpportunitiesPreview } from '../components/overview/OpportunitiesPreview';
import { EmptyTransactionsSection } from '../components/overview/EmptyTransactionsSection';
import { WelcomeGuideCard } from '../components/overview/WelcomeGuideCard';
import { VIPUpgradeWidget } from '../components/overview/VIPUpgradeWidget';
import { Link } from 'react-router';
import { TrendingUp } from 'lucide-react';

export function EmptyOverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Welcome Text - Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-6">
          <div className="text-left">
            <h1 className="text-[32px] lg:text-[42px] leading-tight mb-3" style={{ color: '#002E83', fontWeight: 700, letterSpacing: '-0.02em' }}>
              ابدأ رحلتك الاستثمارية
            </h1>
            <p className="text-[14px] lg:text-[15px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)', fontWeight: 400, maxWidth: '620px' }}>
              استثمر في فرص مختارة بعناية، وتابع أداء محفظتك، واستمتع بعوائد مجزية
            </p>
          </div>
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] transition-all hover:scale-105 flex-shrink-0"
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
      </div>

      {/* Hero Section - Empty State */}
      <div className="mb-8">
        <EmptyHeroSection />
      </div>

      {/* KPI Summary - Zero State */}
      <div className="mb-8">
        <EmptyKPISummary />
      </div>

      {/* VIP Upgrade Widget */}
      <div className="mb-8">
        <VIPUpgradeWidget />
      </div>

      {/* Welcome Guide + Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <WelcomeGuideCard />
        </div>
        <div className="lg:col-span-2">
          <EmptyPerformanceSection />
        </div>
      </div>

      {/* Active Investments Empty State */}
      <div className="mb-8">
        <EmptyActiveInvestments />
      </div>

      {/* Opportunities Preview - Show available opportunities */}
      <div className="mb-8">
        <OpportunitiesPreview />
      </div>

      {/* Transactions Empty State */}
      <div>
        <EmptyTransactionsSection />
      </div>
    </div>
  );
}