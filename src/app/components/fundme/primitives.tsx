/**
 * FundMe Design System — Shared Primitives
 * Buttons, badges, progress, stats, trust rows.
 */

import { type ReactNode } from 'react';
import { TrendingUp, Star, ShieldCheck } from 'lucide-react';
import { colors, radius } from './tokens';
import { SARIcon } from '../ui/SARIcon';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Buttons
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSurface = 'dark' | 'light';

interface FundMeButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  surface?: ButtonSurface;
  icon?: ReactNode;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  className?: string;
}

export function FundMeButton({
  children,
  variant = 'primary',
  surface = 'light',
  icon,
  onClick,
  className = '',
}: FundMeButtonProps) {
  const base = `inline-flex items-center justify-center gap-1.5 h-9 px-4 ${radius.element} text-[12px] font-semibold transition-all duration-200 cursor-pointer`;

  const styles: Record<ButtonSurface, Record<ButtonVariant, string>> = {
    dark: {
      primary: `${base} bg-[${colors.primary}] text-white hover:bg-[${colors.primaryHover}]`,
      secondary: `${base} text-white/50 hover:text-white/70 hover:bg-white/[0.06]`,
      ghost: `${base} text-white/40 hover:text-white/60`,
    },
    light: {
      primary: `${base} text-white hover:brightness-110`,
      secondary: `${base} text-[#334155] hover:bg-[#F1F5F9]`,
      ghost: `${base} text-[#64748B] hover:text-[#334155]`,
    },
  };

  // Use inline styles for colors since Tailwind can't handle dynamic values
  const inlineStyles: Record<ButtonSurface, Record<ButtonVariant, React.CSSProperties>> = {
    dark: {
      primary: { background: colors.primary, boxShadow: '0 2px 8px rgba(37,99,235,0.25)' },
      secondary: { border: `1px solid ${colors.dark.border}` },
      ghost: {},
    },
    light: {
      primary: { background: `linear-gradient(135deg, ${colors.primaryMuted} 0%, ${colors.primary} 100%)`, boxShadow: '0 2px 8px rgba(37,99,235,0.2)' },
      secondary: { border: `1px solid ${colors.light.borderSubtle}` },
      ghost: {},
    },
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[surface][variant]} ${className}`}
      style={inlineStyles[surface][variant]}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   StatPill — compact label + value
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface StatPillProps {
  label: string;
  value: string;
  surface?: 'dark' | 'light';
  valueColor?: string;
}

export function StatPill({ label, value, surface = 'dark', valueColor }: StatPillProps) {
  const labelColor = surface === 'dark' ? 'text-white/25' : 'text-[#94A3B8]';
  const defaultValueColor = surface === 'dark' ? 'white' : '#0F172A';

  return (
    <div>
      <div className={`text-[10px] uppercase tracking-[0.06em] font-medium ${labelColor} mb-0.5`}>{label}</div>
      <div className="text-[17px] leading-tight font-bold" style={{ color: valueColor || defaultValueColor }}>{value}</div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MetricInline — icon + label + value in a row
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface MetricInlineProps {
  label: string;
  value: string;
  surface?: 'dark' | 'light';
}

export function MetricInline({ label, value, surface = 'light' }: MetricInlineProps) {
  const labelColor = surface === 'dark' ? 'text-white/30' : 'text-[#94A3B8]';
  const valueColor = surface === 'dark' ? 'text-white/80' : 'text-[#0F172A]';

  return (
    <div className="flex items-center justify-between">
      <span className={`text-[11px] font-medium ${labelColor}`}>{label}</span>
      <span className={`text-[13px] font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ProgressFunding — thin progress bar + labels
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface ProgressFundingProps {
  progress: number;
  funded: string;
  total: string;
  surface?: 'dark' | 'light';
}

export function ProgressFunding({ progress, funded, total, surface = 'dark' }: ProgressFundingProps) {
  const trackBg = surface === 'dark' ? 'rgba(255,255,255,0.04)' : '#F1F5F9';
  const labelColor = surface === 'dark' ? 'text-white/30' : 'text-[#94A3B8]';
  const fundedColor = surface === 'dark' ? 'text-white/60' : 'text-[#0F172A]';
  const pctColor = surface === 'dark' ? 'text-white/25' : 'text-[#64748B]';
  const fillColor = progress >= 80 ? colors.successMuted : colors.primary;

  return (
    <div>
      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: trackBg }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%`, background: fillColor }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className={`text-[10px] font-medium ${labelColor}`}>
          <span className={`font-bold ${fundedColor}`}>{funded}</span>
          <span className="mx-0.5">/</span>
          {total}
        </span>
        <span className={`text-[10px] font-semibold ${pctColor}`}>{progress}%</span>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RiskGrade — minimal risk indicator
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const riskColors: Record<string, string> = {
  A: '#2BB673', B: '#60A5FA', C: '#FBBF24', D: '#FB923C', E: '#F87171',
};

interface RiskGradeProps {
  grade: string;
  surface?: 'dark' | 'light';
}

export function RiskGrade({ grade, surface = 'dark' }: RiskGradeProps) {
  const color = riskColors[grade] || '#94A3B8';
  const bg = surface === 'dark' ? `${color}15` : `${color}18`;

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 ${radius.badge} text-[9px] font-bold`}
      style={{ background: bg, color }}
    >
      <span className="w-1 h-1 rounded-full" style={{ background: color }} />
      {grade}
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VIPBadge
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function VIPBadge() {
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 ${radius.badge} text-[8px] font-bold tracking-wide`}
      style={{ background: colors.vipBg, color: colors.vipMuted }}
    >
      <Star className="w-2 h-2" strokeWidth={3} />
      VIP
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ChangeBadge — percentage change indicator
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface ChangeBadgeProps {
  value: string;
  positive?: boolean;
}

export function ChangeBadge({ value, positive = true }: ChangeBadgeProps) {
  const bg = positive ? colors.successBg : colors.dangerBg;
  const color = positive ? colors.successMuted : colors.danger;

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 ${radius.badge} text-[11px] font-semibold`}
      style={{ background: bg, color }}
    >
      {positive && <TrendingUp className="w-3 h-3" strokeWidth={2.5} />}
      {value}
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TrustRow — "Secure" / "Shariah-compliant"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface TrustRowProps {
  items: string[];
  surface?: 'dark' | 'light';
}

export function TrustRow({ items, surface = 'dark' }: TrustRowProps) {
  const color = surface === 'dark' ? 'text-white/20' : 'text-[#94A3B8]';

  return (
    <div className={`flex items-center gap-3 ${color}`}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1 text-[10px] font-medium">
          <ShieldCheck className="w-3 h-3" strokeWidth={1.8} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   InfoTile — compact stat card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface InfoTileProps {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: string;
  surface?: 'dark' | 'light';
  valueColor?: string;
}

export function InfoTile({ icon, label, value, delta, surface = 'light', valueColor }: InfoTileProps) {
  const isDark = surface === 'dark';

  return (
    <div
      className={`${radius.inner} p-3.5 transition-all duration-150 hover:shadow-sm`}
      style={isDark
        ? { background: colors.dark.card, border: `1px solid ${colors.dark.border}` }
        : { background: colors.light.card, border: `1px solid ${colors.light.border}`, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }
      }
    >
      <div className={`w-3.5 h-3.5 mb-2 ${isDark ? 'text-white/20' : 'text-[#94A3B8]'}`}>
        {icon}
      </div>
      <div className={`text-[10px] uppercase tracking-[0.06em] font-medium mb-0.5 ${isDark ? 'text-white/25' : 'text-[#94A3B8]'}`}>
        {label}
      </div>
      <div className="text-[16px] leading-tight font-bold" style={{ color: valueColor || (isDark ? 'white' : '#0F172A') }}>
        {value}
      </div>
      {delta && (
        <div className="text-[10px] font-semibold mt-0.5" style={{ color: colors.successMuted }}>
          {delta}
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AmountSelector — quick amount chips
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface AmountSelectorProps {
  amounts: number[];
  selected: number | null;
  onSelect: (amount: number) => void;
  surface?: 'dark' | 'light';
  formatFn?: (n: number) => string;
}

export function AmountSelector({ amounts, selected, onSelect, surface = 'light', formatFn }: AmountSelectorProps) {
  const isDark = surface === 'dark';
  const format = formatFn || ((n: number) => n.toLocaleString('en-US'));

  return (
    <div className="flex flex-wrap gap-2">
      {amounts.map((amt) => {
        const active = selected === amt;
        return (
          <button
            key={amt}
            onClick={() => onSelect(amt)}
            className={`h-8 px-3 ${radius.element} text-[12px] font-semibold transition-all cursor-pointer`}
            style={
              active
                ? { background: colors.primary, color: 'white' }
                : isDark
                  ? { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', border: `1px solid ${colors.dark.border}` }
                  : { background: '#F8FAFC', color: '#64748B', border: `1px solid ${colors.light.border}` }
            }
          >
            {format(amt)}
          </button>
        );
      })}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DarkCardBg — subtle financial pattern for dark cards
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function DarkCardBg() {
  return (
    <>
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fm-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fm-dots)" />
      </svg>
      {/* Subtle radial glow */}
      <div
        className="absolute top-[-20%] right-[5%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 60%)' }}
      />
    </>
  );
}
