/**
 * FundMeWalletCard — Financial wallet/balance card
 * Unified dark surface matching the hero card family.
 */

import { type ReactNode } from 'react';
import { Wallet } from 'lucide-react';
import { colors, radius, darkCardStyle } from './tokens';
import { DarkCardBg } from './primitives';

interface FundMeWalletCardProps {
  title: string;           // e.g. "Wallet" / "المحفظة"
  balance: string;         // formatted balance
  actions?: ReactNode;
}

export function FundMeWalletCard({
  title,
  balance,
  actions,
}: FundMeWalletCardProps) {
  return (
    <div className={`relative ${radius.card} overflow-hidden`} style={{ ...darkCardStyle, background: colors.dark.elevated }}>
      <DarkCardBg />

      <div className="relative p-5 lg:p-7">
        {/* Icon + label */}
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className={`w-9 h-9 ${radius.inner} flex items-center justify-center`}
            style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${colors.dark.border}` }}
          >
            <Wallet className="w-4 h-4" style={{ color: colors.textOnDark.secondary }} strokeWidth={1.8} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: colors.textOnDark.secondary }}>
            {title}
          </span>
        </div>

        {/* Balance */}
        <div
          className="text-[40px] lg:text-[48px] leading-none font-bold mb-5"
          dir="ltr"
          style={{ color: 'white', letterSpacing: '-0.03em' }}
        >
          {balance}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
