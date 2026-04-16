/**
 * FundMe VIP Dark Theme — Centralized Token System
 * Import and use across all investor pages for consistency.
 */

export const vip = {
  // Surfaces
  bg: {
    app: '#06111F',
    section: '#08162A',
    card: '#0C1C34',
    elevated: '#102344',
    raised: '#0A1A30',
    hover: '#132B4A',
    active: '#163560',
  },

  // Borders
  border: {
    default: 'rgba(255,255,255,0.08)',
    subtle: 'rgba(255,255,255,0.05)',
    light: 'rgba(255,255,255,0.12)',
    accent: 'rgba(59,130,246,0.25)',
    vip: 'rgba(99,102,241,0.2)',
  },

  // Text
  text: {
    primary: 'rgba(255,255,255,0.96)',
    secondary: 'rgba(255,255,255,0.72)',
    tertiary: 'rgba(255,255,255,0.46)',
    muted: 'rgba(255,255,255,0.28)',
    inverse: '#06111F',
  },

  // Accent colors
  accent: {
    blue: '#3B82F6',
    blueLight: '#60A5FA',
    blueMuted: '#2563EB',
    indigo: '#6366F1',
    indigoLight: '#A5B4FC',
    green: '#2BB673',
    greenLight: '#34D399',
    greenBg: 'rgba(43,182,115,0.12)',
    amber: '#F59E0B',
    amberBg: 'rgba(245,158,11,0.12)',
    red: '#F87171',
    redBg: 'rgba(248,113,113,0.1)',
  },

  // Shadows
  shadow: {
    card: '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
    elevated: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
    modal: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
    glow: '0 0 40px -10px rgba(59,130,246,0.15)',
  },

  // Reusable card style
  cardStyle: {
    background: '#0C1C34',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
  } as React.CSSProperties,

  // Reusable elevated card style
  elevatedStyle: {
    background: '#102344',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
  } as React.CSSProperties,

  // Inner surface (stat cards, table headers, input backgrounds)
  innerStyle: {
    background: '#0A1A30',
    border: '1px solid rgba(255,255,255,0.06)',
  } as React.CSSProperties,
} as const;
