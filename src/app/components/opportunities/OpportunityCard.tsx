import { formatSAR, formatPercentage } from '../../utils/currency';
import { RiskBadge } from '../ui/RiskBadge';
import { ProgressBar } from '../ui/ProgressBar';
import { ArrowLeft, FileText, Briefcase, Cog, TrendingUp, Store, Lightbulb } from 'lucide-react';

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
}

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
}: OpportunityCardProps) {
  const returnValue = netReturn || roi || 0;

  // Category icon mapping
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
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* ABSTRACT COVER */}
      <div className="relative h-32 overflow-hidden">
        {/* 1. BACKGROUND: Deep Navy to Blue Gradient */}
        <div 
          className="absolute inset-0"
          style={{ background: gradientTone }}
        >
          {/* Subtle Radial Glow - Very soft */}
          <div 
            className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(13, 130, 249, 0.15) 0%, transparent 60%)',
              transform: 'translate(25%, -50%)',
            }}
          />
        </div>

        {/* 2. MINIMAL BRAND ELEMENT: Single Subtle Curved Line */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.08 }}
        >
          {/* Large subtle arc */}
          <circle
            cx="150"
            cy="-50"
            r="140"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        {/* 3. SECONDARY SUBTLE ELEMENT */}
        <svg
          className="absolute -bottom-20 -left-20 w-48 h-48"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.06 }}
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        {/* 4. FLOW NODES - Minimal glowing points */}
        {/* Node 1 - Small accent */}
        <div 
          className="absolute"
          style={{
            top: '25%',
            right: '30%',
          }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#80FF00',
              boxShadow: '0 0 8px rgba(128, 255, 0, 0.4)',
            }}
          />
        </div>

        {/* Node 2 - Smaller accent */}
        <div 
          className="absolute"
          style={{
            bottom: '30%',
            left: '25%',
          }}
        >
          <div 
            className="w-1 h-1 rounded-full"
            style={{
              background: '#0D82F9',
              boxShadow: '0 0 6px rgba(13, 130, 249, 0.4)',
            }}
          />
        </div>

        {/* 5. CATEGORY ICON - Clean and centered */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <IconComponent 
              className="w-6 h-6 text-white" 
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* ROI Badge on Cover */}
        <div 
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md backdrop-blur-md z-10"
          style={{ 
            background: 'rgba(16, 185, 129, 0.95)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="text-[14px] text-white" style={{ fontWeight: 700 }}>
            {formatPercentage(returnValue)}
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-6">
        {/* SECTION 1: IDENTITY */}
        <div className="mb-5 pb-5 border-b border-[#F1F4F9]">
          {/* Borrower Name - Highest Priority */}
          <h3 className="text-[18px] text-[#0B1A3A] mb-2 group-hover:text-[#002E83] transition-colors" style={{ fontWeight: 600, lineHeight: 1.3 }}>
            {borrowerName}
          </h3>
          {/* Opportunity ID */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6B7280]" style={{ fontWeight: 500 }}>
              رقم الفرصة:
            </span>
            <span className="text-[12px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
              {opportunityId}
            </span>
          </div>
        </div>

        {/* SECTION 2: CLASSIFICATION & KEY METRICS */}
        <div className="mb-5">
          {/* Financing Type & Risk - Same Row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
                نوع التمويل
              </div>
              <div className="text-[13px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                {financingType}
              </div>
            </div>
            <div>
              <RiskBadge grade={risk} size="md" />
            </div>
          </div>

          {/* TERMS: Return & Tenor - Grid Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Net Return - Second Priority */}
            <div>
              <div className="text-[10px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
                صافي العائد
              </div>
              <div className="text-[24px] text-[#10B981] leading-none" style={{ fontWeight: 700 }}>
                {formatPercentage(returnValue)}
              </div>
            </div>
            {/* Tenor */}
            <div>
              <div className="text-[10px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
                المدة
              </div>
              <div className="text-[16px] text-[#0B1A3A] leading-none" style={{ fontWeight: 600 }}>
                {tenor}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: FUNDING STATUS */}
        <div className="pt-5 border-t border-[#F1F4F9]">
          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar progress={fundingProgress} showLabel />
          </div>

          {/* Funding Amounts - Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Funded Amount */}
            <div>
              <div className="text-[10px] text-[#6B7280] mb-1" style={{ fontWeight: 500 }}>
                المبلغ الممول
              </div>
              <div className="text-[13px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                {formatSAR(fundedAmount)}
              </div>
            </div>
            {/* Total Amount */}
            <div className="text-left">
              <div className="text-[10px] text-[#6B7280] mb-1" style={{ fontWeight: 500 }}>
                إجمالي التمويل
              </div>
              <div className="text-[13px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                {formatSAR(totalAmount)}
              </div>
            </div>
          </div>

          {/* View Details Link */}
          <button className="flex items-center gap-1.5 text-[12px] text-[#2563EB] hover:gap-2.5 transition-all group-hover:text-[#0D82F9]" style={{ fontWeight: 600 }}>
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}