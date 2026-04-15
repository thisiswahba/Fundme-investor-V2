/**
 * FundMeHeroCard — Premium portfolio summary card
 * Used on overview/dashboard as the primary financial snapshot.
 */

import { type ReactNode } from 'react';
import { colors, radius, darkCardStyle } from './tokens';
import { ChangeBadge, StatPill, DarkCardBg } from './primitives';

interface FundMeHeroCardProps {
  title: string;           // e.g. "Total Portfolio"
  subtitle?: string;       // e.g. "Welcome back, Fahad"
  mainValue: string;       // e.g. "2,850,000"
  changeValue?: string;    // e.g. "+6.2%"
  changePositive?: boolean;
  stats?: { label: string; value: string; color?: string }[];
  actions?: ReactNode;
  badge?: ReactNode;       // e.g. VIP badge
}

export function FundMeHeroCard({
  title,
  subtitle,
  mainValue,
  changeValue,
  changePositive = true,
  stats,
  actions,
  badge,
}: FundMeHeroCardProps) {
  return (
    <div className={`relative ${radius.card} overflow-hidden`} style={{ ...darkCardStyle, background: colors.dark.base }}>
      <DarkCardBg />

      <div className="relative p-5 lg:p-7">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          {subtitle && (
            <span className="text-[12px] font-medium" style={{ color: colors.textOnDark.tertiary }}>
              {subtitle}
            </span>
          )}
          {badge}
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Value zone */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.08em] font-semibold mb-1.5" style={{ color: colors.textOnDark.tertiary }}>
              {title}
            </div>
            <div className="flex items-baseline gap-2.5">
              <span
                className="text-[36px] lg:text-[42px] leading-none font-bold"
                dir="ltr"
                style={{ color: 'white', letterSpacing: '-0.03em' }}
              >
                {mainValue}
              </span>
              {changeValue && (
                <ChangeBadge value={changeValue} positive={changePositive} />
              )}
            </div>
          </div>

          {/* Stats strip */}
          {stats && stats.length > 0 && (
            <div className="flex items-center gap-5 lg:gap-6">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-5 lg:gap-6">
                  {i > 0 && <div className="w-px h-8" style={{ background: colors.dark.border }} />}
                  <StatPill label={s.label} value={s.value} surface="dark" valueColor={s.color} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 mt-5">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
