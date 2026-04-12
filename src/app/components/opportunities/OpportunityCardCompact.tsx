import { formatSAR, formatPercentage } from '../../utils/currency';
import { RiskBadge } from '../ui/RiskBadge';
import { ProgressBar } from '../ui/ProgressBar';
import { ArrowLeft, FileText, Briefcase, Cog, TrendingUp, Store, Lightbulb } from 'lucide-react';

interface OpportunityCardCompactProps {
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
}

export function OpportunityCardCompact({
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
}: OpportunityCardCompactProps) {
  const returnValue = netReturn || roi || 0;

  const IconComponent = {
    invoice: FileText,
    capital: Briefcase,
    equipment: Cog,
    expansion: TrendingUp,
    food: Store,
    innovation: Lightbulb,
  }[categoryIcon];

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5 h-full"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Cover */}
      <div className="relative h-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: gradientTone }}>
          <div
            className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(13, 130, 249, 0.15) 0%, transparent 60%)',
              transform: 'translate(25%, -50%)',
            }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <IconComponent className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* 1. TITLE — strongest element */}
        <div className="mb-3">
          <h3
            className="text-[15px] text-[#0B1A3A] mb-0.5 group-hover:text-[#002E83] transition-colors leading-snug"
            style={{ fontWeight: 600 }}
          >
            {borrowerName}
          </h3>
          <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 400 }}>
            {opportunityId}
          </span>
        </div>

        {/* 2. NET RETURN — dominant metric */}
        <div className="mb-3">
          <div className="text-[30px] text-[#10B981] leading-none" style={{ fontWeight: 800 }}>
            {formatPercentage(returnValue)}
          </div>
          <div className="text-[10px] text-[#9CA3AF] mt-1.5" style={{ fontWeight: 500 }}>
            صافي العائد
          </div>
        </div>

        {/* 3. SECONDARY META — risk, type, tenor in one compact row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <RiskBadge grade={risk} size="sm" />
          <span className="text-[10px] text-[#6B7280]">·</span>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 500 }}>
            {financingType}
          </span>
          <span className="text-[10px] text-[#6B7280]">·</span>
          <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 500 }}>
            {tenor}
          </span>
        </div>

        {/* 4. PROGRESS — visible but secondary */}
        <div className="pt-3 border-t border-[#F1F4F9]">
          <div className="mb-2">
            <ProgressBar progress={fundingProgress} showLabel />
          </div>

          {/* 5. FUNDING SUMMARY — compact single line */}
          <div className="text-[12px] text-[#6B7280] mb-3">
            <span style={{ fontWeight: 700, color: '#0B1A3A' }}>{formatSAR(fundedAmount)}</span>
            <span className="mx-1">/</span>
            <span>{formatSAR(totalAmount)}</span>
          </div>

          {/* 6. CTA — subtle */}
          <button
            className="flex items-center gap-1 text-[11px] text-[#2563EB] hover:gap-2 transition-all group-hover:text-[#0D82F9]"
            style={{ fontWeight: 600 }}
          >
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
