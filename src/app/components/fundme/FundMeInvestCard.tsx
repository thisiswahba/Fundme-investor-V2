/**
 * FundMeInvestCard — Investment action card
 * Used on opportunity detail pages to collect investment amount.
 */

import { type ReactNode, useState } from 'react';
import { Wallet } from 'lucide-react';
import { colors, radius } from './tokens';
import { FundMeButton, AmountSelector, MetricInline, ProgressFunding } from './primitives';
import { SARIcon } from '../ui/SARIcon';

interface FundMeInvestCardProps {
  returnRate: string;       // e.g. "+12.5%"
  returnLabel: string;      // e.g. "Expected Return"
  fundedAmount: string;
  totalAmount: string;
  fundingProgress: number;
  walletBalance: string;
  minAmount: number;
  quickAmounts: number[];
  ctaLabel: string;
  surface?: 'dark' | 'light';
  onInvest?: (amount: number) => void;
  formatAmount?: (n: number) => string;
  labels: {
    amount: string;
    amountPlaceholder: string;
    walletBalance: string;
    expectedReturn: string;
    min: string;
    quickSelect: string;
  };
}

export function FundMeInvestCard({
  returnRate,
  returnLabel,
  fundedAmount,
  totalAmount,
  fundingProgress,
  walletBalance,
  minAmount,
  quickAmounts,
  ctaLabel,
  surface = 'light',
  onInvest,
  formatAmount,
  labels,
}: FundMeInvestCardProps) {
  const [amount, setAmount] = useState('');
  const [selectedQuick, setSelectedQuick] = useState<number | null>(null);
  const isDark = surface === 'dark';
  const parsed = parseInt(amount.replace(/,/g, '')) || 0;
  const canSubmit = parsed >= minAmount;

  function handleQuickSelect(val: number) {
    setSelectedQuick(val);
    setAmount(val.toLocaleString('en-US'));
  }

  const cardStyle = isDark
    ? { background: colors.dark.card, border: `1px solid ${colors.dark.border}` }
    : { background: colors.light.card, border: `1px solid ${colors.light.border}`, boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.04)' };

  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC';
  const inputBorder = isDark ? colors.dark.border : '#E2E8F0';
  const inputColor = isDark ? 'white' : '#0F172A';
  const labelColor = isDark ? colors.textOnDark.secondary : colors.textOnLight.secondary;

  return (
    <div className={`${radius.card} p-5 lg:p-6`} style={cardStyle}>
      {/* Return highlight */}
      <div className="mb-5">
        <span className="text-[28px] font-extrabold" style={{ color: colors.successMuted }}>
          {returnRate}
        </span>
        <div className="text-[10px] font-medium mt-0.5" style={{ color: isDark ? colors.textOnDark.tertiary : colors.textOnLight.tertiary }}>
          {returnLabel}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <ProgressFunding
          progress={fundingProgress}
          funded={fundedAmount}
          total={totalAmount}
          surface={surface}
        />
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold mb-2" style={{ color: labelColor }}>
          {labels.amount}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : '#94A3B8' }}>
            SAR
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => {
              setSelectedQuick(null);
              setAmount(e.target.value.replace(/[^0-9,]/g, ''));
            }}
            placeholder={labels.amountPlaceholder}
            className={`w-full h-11 ${radius.element} pl-12 pr-4 text-[14px] font-semibold outline-none transition-all duration-200`}
            dir="ltr"
            style={{
              background: inputBg,
              border: `1px solid ${inputBorder}`,
              color: inputColor,
            }}
          />
        </div>
        <div className="text-[10px] font-medium mt-1.5" style={{ color: isDark ? colors.textOnDark.tertiary : colors.textOnLight.tertiary }}>
          {labels.min}: {formatAmount ? formatAmount(minAmount) : minAmount.toLocaleString('en-US')}
        </div>
      </div>

      {/* Quick amounts */}
      <div className="mb-5">
        <div className="text-[10px] font-medium mb-2" style={{ color: isDark ? colors.textOnDark.tertiary : colors.textOnLight.tertiary }}>
          {labels.quickSelect}
        </div>
        <AmountSelector
          amounts={quickAmounts}
          selected={selectedQuick}
          onSelect={handleQuickSelect}
          surface={surface}
          formatFn={formatAmount}
        />
      </div>

      {/* Wallet balance */}
      <div className="flex items-center justify-between mb-4 px-3 py-2.5 rounded-lg" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC' }}>
        <div className="flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : '#94A3B8' }} strokeWidth={1.8} />
          <span className="text-[11px] font-medium" style={{ color: isDark ? colors.textOnDark.tertiary : colors.textOnLight.tertiary }}>
            {labels.walletBalance}
          </span>
        </div>
        <span className="text-[12px] font-bold" style={{ color: isDark ? 'white' : '#0F172A' }}>
          {walletBalance}
        </span>
      </div>

      {/* Expected return */}
      {canSubmit && (
        <MetricInline
          label={labels.expectedReturn}
          value={returnRate}
          surface={surface}
        />
      )}

      {/* CTA */}
      <div className="mt-4">
        <FundMeButton
          variant="primary"
          surface={surface}
          onClick={() => canSubmit && onInvest?.(parsed)}
          className={`w-full ${!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {ctaLabel}
        </FundMeButton>
      </div>
    </div>
  );
}
