import { formatSAR, formatPercentage } from '../../utils/currency';
import { RiskBadge } from '../ui/RiskBadge';
import { ProgressBar } from '../ui/ProgressBar';
import { ArrowLeft, FileText, Briefcase, Cog, TrendingUp, Store, Lightbulb, Flame, Clock, Zap } from 'lucide-react';

interface OpportunityCardProps {
  id?: number;
  borrowerName: string;
  opportunityId: string;
  financingType: string;
  risk: 'A' | 'B' | 'C' | 'D' | 'E';
  netReturn?: number;
  roi?: number;
  tenor: string;
  fundingProgress: number;
  totalAmount: number;
  fundedAmount: number;
  categoryIcon?: 'invoice' | 'capital' | 'equipment' | 'expansion' | 'food' | 'innovation';
  gradientTone?: string;
  onClick?: () => void;
  badge?: string;
  urgency?: string;
}

const urgencyConfig: Record<string, { icon: typeof Flame; color: string; bg: string }> = {
  'طلب عالي': { icon: Flame, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  'سينتهي قريبًا': { icon: Clock, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export function OpportunityCard({
  borrowerName,
  opportunityId,
  financingType,
  risk,
  netReturn,
  roi,
  tenor,
  fundingProgress,
  totalAmount,
  fundedAmount,
  categoryIcon = 'capital',
  gradientTone = 'linear-gradient(135deg, #001d5a 0%, #0D82F9 100%)',
  onClick,
  badge,
  urgency,
}: OpportunityCardProps) {
  const returnValue = netReturn || roi || 0;

  const IconComponent = {
    invoice: FileText,
    capital: Briefcase,
    equipment: Cog,
    expansion: TrendingUp,
    food: Store,
    innovation: Lightbulb,
  }[categoryIcon];

  // Default urgency for high progress
  const urgencyText = urgency || (fundingProgress >= 75 ? `تبقى ${100 - fundingProgress}% فقط` : undefined);
  const urgencyStyle = urgencyText
    ? (urgencyConfig[urgencyText] || { icon: Zap, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' })
    : null;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* COVER */}
      <div className="relative h-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: gradientTone }}>
          <div
            className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(13, 130, 249, 0.15) 0%, transparent 60%)',
              transform: 'translate(25%, -50%)',
            }}
          />
        </div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 112" fill="none" style={{ opacity: 0.08 }}>
          <circle cx="150" cy="-50" r="140" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>

        {/* Category Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <IconComponent className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-md z-10 flex items-center gap-1"
            style={{ background: 'rgba(245, 158, 11, 0.95)', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)' }}
          >
            <span className="text-[11px] text-white" style={{ fontWeight: 700 }}>{badge}</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* 1. TITLE — strongest */}
        <div className="mb-1">
          <h3
            className="text-[16px] text-[#0B1A3A] group-hover:text-[#002E83] transition-colors leading-snug"
            style={{ fontWeight: 600 }}
          >
            {borrowerName}
          </h3>
          <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 400 }}>
            {opportunityId}
          </span>
        </div>

        {/* 2. NET RETURN — dominant */}
        <div className="mb-3 mt-3">
          <div className="text-[28px] text-[#10B981] leading-none" style={{ fontWeight: 700 }}>
            {formatPercentage(returnValue)}
          </div>
          <div className="text-[10px] text-[#9CA3AF] mt-1" style={{ fontWeight: 500 }}>
            صافي العائد
          </div>
        </div>

        {/* 3. METADATA ROW — risk, type, tenor */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <RiskBadge grade={risk} size="sm" />
          <span className="text-[10px] text-[#CBD5E1]">·</span>
          <span className="text-[12px] text-[#6B7280]" style={{ fontWeight: 500 }}>{financingType}</span>
          <span className="text-[10px] text-[#CBD5E1]">·</span>
          <span className="text-[12px] text-[#6B7280]" style={{ fontWeight: 500 }}>{tenor}</span>
        </div>

        {/* Urgency indicator */}
        {urgencyText && urgencyStyle && (
          <div
            className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg w-fit"
            style={{ background: urgencyStyle.bg }}
          >
            <urgencyStyle.icon className="w-3.5 h-3.5" style={{ color: urgencyStyle.color }} strokeWidth={2} />
            <span className="text-[11px]" style={{ color: urgencyStyle.color, fontWeight: 600 }}>
              {urgencyText}
            </span>
          </div>
        )}

        {/* 4. PROGRESS */}
        <div className="pt-4 border-t border-[#F1F4F9]">
          <div className="mb-2">
            <ProgressBar progress={fundingProgress} showLabel />
          </div>

          {/* 5. FUNDING SUMMARY */}
          <div className="text-[12px] text-[#6B7280] mb-4">
            <span style={{ fontWeight: 600, color: '#0B1A3A' }}>{formatSAR(fundedAmount)}</span>
            <span className="mx-1">/</span>
            <span>{formatSAR(totalAmount)}</span>
          </div>

          {/* 6. CTA */}
          <button className="flex items-center gap-1.5 text-[13px] text-[#002E83] group-hover:text-[#0D82F9] group-hover:gap-2.5 transition-all" style={{ fontWeight: 600 }}>
            <span>استعرض الفرصة</span>
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
