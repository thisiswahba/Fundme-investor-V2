import { useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Star, FileText, Briefcase, Cog, TrendingUp, Store, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useI18n } from '../../i18n';
import { formatSAR, formatPercentage } from '../../utils/currency';

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const opportunities = [
  {
    id: 1,
    borrowerName: 'شركة البركة التجارية',
    borrowerNameEn: 'Al Baraka Trading Co.',
    opportunityId: 'FM-0001-309',
    financingType: 'تمويل الفواتير',
    financingTypeEn: 'Invoice Finance',
    roi: 11.5,
    risk: 'B' as const,
    tenor: '20 شهر',
    tenorEn: '20 months',
    fundingProgress: 68,
    totalAmount: 500000,
    fundedAmount: 340000,
    categoryIcon: 'invoice' as const,
    vip: true,
  },
  {
    id: 2,
    borrowerName: 'مؤسسة الأفق للتجزئة',
    borrowerNameEn: 'Al Ofuq Retail',
    opportunityId: 'FM-0002-412',
    financingType: 'تمويل رأس المال',
    financingTypeEn: 'Capital Finance',
    roi: 13.2,
    risk: 'C' as const,
    tenor: '20 شهر',
    tenorEn: '20 months',
    fundingProgress: 42,
    totalAmount: 350000,
    fundedAmount: 147000,
    categoryIcon: 'capital' as const,
    vip: false,
  },
  {
    id: 3,
    borrowerName: 'الشركة الصناعية المتقدمة',
    borrowerNameEn: 'Advanced Industrial Co.',
    opportunityId: 'FM-0003-578',
    financingType: 'تمويل المعدات',
    financingTypeEn: 'Equipment Finance',
    roi: 9.8,
    risk: 'A' as const,
    tenor: '24 شهر',
    tenorEn: '24 months',
    fundingProgress: 85,
    totalAmount: 750000,
    fundedAmount: 637500,
    categoryIcon: 'equipment' as const,
    vip: true,
  },
  {
    id: 4,
    borrowerName: 'شركة النقل السريع',
    borrowerNameEn: 'Express Logistics',
    opportunityId: 'FM-0004-221',
    financingType: 'تمويل التوسع',
    financingTypeEn: 'Expansion Finance',
    roi: 14.5,
    risk: 'C' as const,
    tenor: '20 شهر',
    tenorEn: '20 months',
    fundingProgress: 29,
    totalAmount: 450000,
    fundedAmount: 130500,
    categoryIcon: 'expansion' as const,
    vip: false,
  },
];

/* ──────────────────────────────────────────────
   Risk config
   ────────────────────────────────────────────── */

const riskConfig: Record<string, { label: string; labelEn: string; color: string }> = {
  A: { label: 'A', labelEn: 'A', color: '#2BB673' },
  B: { label: 'B', labelEn: 'B', color: '#60A5FA' },
  C: { label: 'C', labelEn: 'C', color: '#FBBF24' },
  D: { label: 'D', labelEn: 'D', color: '#FB923C' },
  E: { label: 'E', labelEn: 'E', color: '#F87171' },
};

const iconMap = {
  invoice: FileText,
  capital: Briefcase,
  equipment: Cog,
  expansion: TrendingUp,
  food: Store,
  innovation: Lightbulb,
};

/* ──────────────────────────────────────────────
   VIP Opportunity Card
   ────────────────────────────────────────────── */

interface VIPCardProps {
  borrowerName: string;
  borrowerNameEn: string;
  opportunityId: string;
  financingType: string;
  financingTypeEn: string;
  roi: number;
  risk: 'A' | 'B' | 'C' | 'D' | 'E';
  tenor: string;
  tenorEn: string;
  fundingProgress: number;
  totalAmount: number;
  fundedAmount: number;
  categoryIcon: keyof typeof iconMap;
  vip: boolean;
  onClick?: () => void;
}

function VIPOpportunityCard({
  borrowerName, borrowerNameEn, opportunityId, financingType, financingTypeEn,
  roi, risk, tenor, tenorEn, fundingProgress, totalAmount, fundedAmount,
  categoryIcon, vip, onClick,
}: VIPCardProps) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const Icon = iconMap[categoryIcon];
  const rk = riskConfig[risk];

  return (
    <div
      onClick={onClick}
      className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:bg-white/[0.03] h-full flex flex-col"
      style={{
        background: '#0E1422',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Top bar — category + badges */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-0">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <Icon className="w-3 h-3 text-white/30" strokeWidth={1.8} />
          </div>
          <span className="text-[10px] text-white/25" style={{ fontWeight: 500 }}>
            {isAr ? financingType : financingTypeEn}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {vip && (
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px]"
              style={{ background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', fontWeight: 700, letterSpacing: '0.02em' }}
            >
              <Star className="w-2 h-2" strokeWidth={3} />
              VIP
            </span>
          )}
          <span
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px]"
            style={{ background: `${rk.color}10`, color: rk.color, fontWeight: 700 }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: rk.color }} />
            {risk}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
        {/* Title + ID */}
        <div className="mb-3">
          <h4 className="text-[13px] text-white/85 leading-snug group-hover:text-white transition-colors" style={{ fontWeight: 600 }}>
            {isAr ? borrowerName : borrowerNameEn}
          </h4>
          <span className="text-[9px] text-white/15" style={{ fontWeight: 500 }}>{opportunityId}</span>
        </div>

        {/* Return — dominant metric */}
        <div className="mb-3">
          <span className="text-[26px] text-[#2BB673] leading-none" style={{ fontWeight: 800 }}>
            {formatPercentage(roi)}
          </span>
          <div className="text-[9px] text-white/20 mt-1" style={{ fontWeight: 500 }}>
            {isAr ? 'العائد المتوقع' : 'Expected Return'}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4 text-[10px] text-white/25" style={{ fontWeight: 500 }}>
          <span>{isAr ? tenor : tenorEn}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/10" />
          <span>{isAr ? financingType : financingTypeEn}</span>
        </div>

        {/* Progress — pushed to bottom */}
        <div className="mt-auto">
          {/* Bar */}
          <div className="w-full h-1 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(fundingProgress, 100)}%`,
                background: fundingProgress >= 80 ? '#2BB673' : '#3B82F6',
              }}
            />
          </div>

          {/* Funded / Total */}
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/40">
              <span className="text-white/60" style={{ fontWeight: 700 }}>{formatSAR(fundedAmount, { decimals: 0 })}</span>
              <span className="mx-0.5">/</span>
              {formatSAR(totalAmount, { decimals: 0 })}
            </span>
            <span className="text-white/30" style={{ fontWeight: 600 }}>{fundingProgress}%</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <span
            className="flex items-center gap-1 text-[11px] text-[#60A5FA] group-hover:text-[#93C5FD] group-hover:gap-1.5 transition-all"
            style={{ fontWeight: 600 }}
          >
            {isAr ? 'عرض التفاصيل' : 'View Details'}
            <ArrowLeft className="w-3 h-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   VIP Opportunities Preview (carousel)
   ────────────────────────────────────────────── */

export function VIPOpportunitiesPreview() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.38;
    const amount = direction === 'right' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] text-white/60" style={{ fontWeight: 600 }}>
          {isAr ? 'فرص استثمارية' : 'Investment Opportunities'}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/[0.04] transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <ChevronRight className="w-3.5 h-3.5 text-white/30" strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/[0.04] transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <ChevronLeft className="w-3.5 h-3.5 text-white/30" strokeWidth={2} />
            </button>
          </div>
          <button
            onClick={() => navigate('/app/opportunities')}
            className="flex items-center gap-1 text-[11px] text-[#60A5FA] hover:text-[#93C5FD] hover:gap-1.5 transition-all"
            style={{ fontWeight: 600 }}
          >
            <span>{isAr ? 'عرض الكل' : 'View All'}</span>
            <ArrowLeft className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="flex-shrink-0"
            style={{ width: 'calc((100% - 24px) / 2.8)', scrollSnapAlign: 'start', minWidth: '240px' }}
          >
            <VIPOpportunityCard
              {...opp}
              onClick={() => navigate(`/app/opportunities/${opp.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
