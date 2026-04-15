/**
 * FundMe Design System — Shared Tokens
 * Single source of truth for the entire card/component family.
 */

/* ── Colors ─────────────────────────────────── */

export const colors = {
  // Backgrounds
  dark: {
    base: '#0C1220',
    card: '#0F1728',
    elevated: '#131D30',
    hover: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.06)',
    borderSubtle: 'rgba(255,255,255,0.04)',
  },
  light: {
    base: '#F7F9FC',
    card: '#FFFFFF',
    elevated: '#FAFBFD',
    hover: '#F8FAFC',
    border: '#F1F5F9',
    borderSubtle: '#E2E8F0',
  },

  // Brand
  primary: '#2563EB',
  primaryHover: '#3B82F6',
  primaryMuted: '#1D4ED8',

  // Semantic
  success: '#2BB673',
  successMuted: '#2BB673',
  successBg: 'rgba(43,182,115,0.1)',
  warning: '#F59E0B',
  warningBg: 'rgba(245,158,11,0.1)',
  danger: '#DC2626',
  dangerBg: 'rgba(220,38,38,0.08)',

  // VIP accent
  vip: '#6366F1',
  vipMuted: '#A5B4FC',
  vipBg: 'rgba(99,102,241,0.12)',

  // Text — dark surface
  textOnDark: {
    primary: 'rgba(255,255,255,0.90)',
    secondary: 'rgba(255,255,255,0.50)',
    tertiary: 'rgba(255,255,255,0.25)',
    muted: 'rgba(255,255,255,0.15)',
  },

  // Text — light surface
  textOnLight: {
    primary: '#0F172A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    muted: '#CBD5E1',
  },
} as const;

/* ── Spacing ────────────────────────────────── */

export const spacing = {
  cardPadding: 'p-5 lg:p-6',
  cardPaddingLg: 'p-6 lg:p-8',
  sectionGap: 'gap-4',
  innerGap: 'gap-3',
  tightGap: 'gap-2',
} as const;

/* ── Radius ─────────────────────────────────── */

export const radius = {
  card: 'rounded-2xl',       // 16px — main cards
  inner: 'rounded-xl',       // 12px — inner sections, buttons
  element: 'rounded-lg',     // 8px  — inputs, small containers
  badge: 'rounded-md',       // 6px  — badges, tags
  pill: 'rounded-full',      // full — pills, avatars
} as const;

/* ── Shadows ────────────────────────────────── */

export const shadows = {
  card: '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.04)',
  cardHover: '0 2px 4px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)',
  button: '0 1px 3px rgba(0,0,0,0.08), 0 2px 8px rgba(37,99,235,0.2)',
  none: 'none',
} as const;

/* ── Typography ─────────────────────────────── */

export const type = {
  hero: 'text-[36px] lg:text-[42px] leading-none tracking-[-0.03em] font-bold',
  heading: 'text-[20px] lg:text-[24px] leading-tight font-bold',
  title: 'text-[15px] leading-snug font-semibold',
  body: 'text-[13px] leading-relaxed font-medium',
  caption: 'text-[11px] leading-normal font-medium',
  micro: 'text-[10px] leading-normal font-medium',
  label: 'text-[10px] uppercase tracking-[0.06em] font-semibold',
} as const;

/* ── Dark card background style ─────────────── */

export const darkCardStyle = {
  background: colors.dark.card,
  border: `1px solid ${colors.dark.border}`,
} as const;

export const lightCardStyle = {
  background: colors.light.card,
  border: `1px solid ${colors.light.border}`,
  boxShadow: shadows.card,
} as const;
