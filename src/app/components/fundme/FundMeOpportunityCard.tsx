/**
 * FundMeOpportunityCard — Investment opportunity card
 * Unified dark surface, compact, scannable.
 */

import { ArrowLeft } from 'lucide-react';
import { colors, radius, darkCardStyle } from './tokens';
import { RiskGrade, VIPBadge, ProgressFunding } from './primitives';

interface FundMeOpportunityCardProps {
  title: string;
  opportunityId: string;
  financingType: string;
  categoryIcon: React.ReactNode;
  risk: string;
  returnValue: string;     // formatted, e.g. "+14.5%"
  returnLabel: string;     // e.g. "Expected Return"
  tenor: string;
  fundingProgress: number;
  fundedAmount: string;
  totalAmount: string;
  ctaLabel: string;
  vip?: boolean;
  onClick?: () => void;
}

export function FundMeOpportunityCard({
  title,
  opportunityId,
  financingType,
  categoryIcon,
  risk,
  returnValue,
  returnLabel,
  tenor,
  fundingProgress,
  fundedAmount,
  totalAmount,
  ctaLabel,
  vip = false,
  onClick,
}: FundMeOpportunityCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group ${radius.inner} overflow-hidden cursor-pointer transition-all duration-200 h-full flex flex-col`}
      style={{ ...darkCardStyle, background: colors.dark.card }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-3.5">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 ${radius.badge} flex items-center justify-center`}
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {categoryIcon}
          </div>
          <span className="text-[10px] font-medium" style={{ color: colors.textOnDark.tertiary }}>
            {financingType}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {vip && <VIPBadge />}
          <RiskGrade grade={risk} surface="dark" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
        {/* Title */}
        <div className="mb-3">
          <h4
            className="text-[13px] leading-snug font-semibold group-hover:text-white transition-colors"
            style={{ color: colors.textOnDark.primary }}
          >
            {title}
          </h4>
          <span className="text-[9px] font-medium" style={{ color: colors.textOnDark.muted }}>
            {opportunityId}
          </span>
        </div>

        {/* Return */}
        <div className="mb-3">
          <span className="text-[24px] leading-none font-extrabold" style={{ color: colors.successMuted }}>
            {returnValue}
          </span>
          <div className="text-[9px] font-medium mt-1" style={{ color: colors.textOnDark.tertiary }}>
            {returnLabel}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 text-[10px] font-medium" style={{ color: colors.textOnDark.tertiary }}>
          <span>{tenor}</span>
          <span className="w-0.5 h-0.5 rounded-full" style={{ background: colors.dark.border }} />
          <span>{financingType}</span>
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <ProgressFunding
            progress={fundingProgress}
            funded={fundedAmount}
            total={totalAmount}
            surface="dark"
          />
        </div>

        {/* CTA */}
        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${colors.dark.borderSubtle}` }}>
          <span
            className="flex items-center gap-1 text-[11px] font-semibold group-hover:gap-1.5 transition-all"
            style={{ color: '#60A5FA' }}
          >
            {ctaLabel}
            <ArrowLeft className="w-3 h-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}
