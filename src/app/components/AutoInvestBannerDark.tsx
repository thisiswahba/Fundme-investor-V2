import { useState } from 'react';
import { useI18n } from '../i18n';

export default function AutoInvestBannerDark({ onConfigure }: { onConfigure?: () => void }) {
  const { lang, dir } = useI18n();
  const isAr = lang === 'ar';
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [priHover, setPriHover] = useState(false);
  const [secHover, setSecHover] = useState(false);

  const blue = { base: '#60a5fa', primary: '#2563eb', accent: '#93c5fd', node: '#1e3a5f', glow: 'rgba(96,165,250,', border: 'rgba(96,165,250,0.15)', texture: '#60a5fa' };
  const teal = { base: '#34d399', primary: '#0d9488', accent: '#5eead4', node: '#134e4a', glow: 'rgba(52,211,153,', border: 'rgba(52,211,153,0.2)', texture: '#34d399' };
  const c = active ? teal : blue;

  return (
    <>
      <style>{`
        @keyframes bannerIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dashFlow{to{stroke-dashoffset:-28}}
        @keyframes ringPulse{0%{r:8;opacity:0.5}100%{r:18;opacity:0}}
      `}</style>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%', height: 116, borderRadius: 20, padding: '0 32px', position: 'relative', overflow: 'hidden', cursor: 'pointer', direction: dir,
          display: 'flex', alignItems: 'center', gap: 28,
          background: active
            ? 'linear-gradient(135deg, rgba(13,148,136,0.08) 0%, #0C1C34 40%, rgba(13,148,136,0.04) 100%)'
            : 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, #0C1C34 40%, rgba(96,165,250,0.04) 100%)',
          border: `1px solid ${c.border}`,
          boxShadow: hovered
            ? (active ? `0 16px 40px -8px ${c.glow}0.15), 0 0 0 1px ${c.glow}0.15)` : `0 16px 40px -8px ${c.glow}0.12), 0 0 0 1px ${c.glow}0.12)`)
            : (active ? `0 2px 16px -4px ${c.glow}0.08)` : `0 2px 16px -4px ${c.glow}0.06)`),
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
          animation: 'bannerIn 0.6s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Layer 1 — texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${c.texture} 8px, ${c.texture} 9px)` }} />
        {/* Layer 2 — corner glow */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${c.glow}${active ? '0.08' : '0.06'}) 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

        {/* ── Illustration (order 3 — far left in RTL) ── */}
        <div style={{ flexShrink: 0, order: 3, width: 180, height: 100 }}>
          <svg width="180" height="100" viewBox="0 0 180 100" fill="none">
            <defs>
              <linearGradient id="dkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.base} stopOpacity="0.2" />
                <stop offset="100%" stopColor={c.base} stopOpacity="0" />
              </linearGradient>
              <marker id="dkArr" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0,0 6,2 0,4" fill={c.base} opacity="0.25" />
              </marker>
            </defs>
            {/* Dot grid */}
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 9 }).map((_, cc) => (
                <circle key={`${r}-${cc}`} cx={10 + cc * 20} cy={8 + r * 20} r="0.8" fill="white" opacity="0.06" />
              ))
            )}
            {/* Area fill */}
            <polygon points="25,75 45,68 65,58 85,45 105,38 125,28 150,20 150,85 25,85" fill="url(#dkFill)" opacity="0.5" />
            {/* Graph line */}
            <polyline points="25,75 45,68 65,58 85,45 105,38 125,28 150,20" stroke={c.base} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
            {/* Flow path 1 — dashed animated */}
            <path d="M20 70 Q50 70 60 50 T100 40 T140 55" stroke={c.accent} strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.35" style={{ animation: 'dashFlow 3s linear infinite' }} />
            {/* Flow path 2 — solid subtle */}
            <path d="M30 80 Q65 60 80 45 T120 35 T160 45" stroke={c.base} strokeWidth="2" fill="none" opacity="0.2" />
            {/* Connectors */}
            <line x1="50" y1="66" x2="78" y2="49" stroke={c.base} strokeWidth="0.8" opacity="0.25" markerEnd="url(#dkArr)" />
            <line x1="92" y1="43" x2="118" y2="31" stroke={c.base} strokeWidth="0.8" opacity="0.25" markerEnd="url(#dkArr)" />
            {/* Nodes */}
            <circle cx="45" cy="68" r="5" fill={c.node} stroke={c.base} strokeWidth="1.5" />
            <circle cx="125" cy="28" r="5" fill={c.node} stroke={c.accent} strokeWidth="1.5" />
            {/* Center node */}
            <circle cx="85" cy="45" r="9" fill={c.base} fillOpacity="0.08" stroke={c.base} strokeWidth="0.5" opacity="0.7" />
            <circle cx="85" cy="45" r="5" fill={c.node} stroke={c.base} strokeWidth="2" />
            <polygon points="83,42 83,48 88,45" fill={c.base} />
            {/* Decorative rects */}
            <rect x="140" y="50" width="14" height="10" rx="3" fill={c.base} fillOpacity="0.04" stroke={c.base} strokeWidth="0.5" strokeOpacity="0.2" transform="rotate(-12 147 55)" />
            <rect x="15" y="40" width="12" height="8" rx="3" fill={c.base} fillOpacity="0.03" stroke={c.base} strokeWidth="0.4" strokeOpacity="0.15" transform="rotate(8 21 44)" />
            {/* Pulse rings — active only */}
            {active && (
              <>
                <circle cx="125" cy="28" r="8" stroke={c.accent} strokeWidth="1" fill="none" style={{ animation: 'ringPulse 2s ease-out infinite' }} />
                <circle cx="125" cy="28" r="12" stroke={c.accent} strokeWidth="0.8" fill="none" style={{ animation: 'ringPulse 2s ease-out infinite', animationDelay: '0.5s' }} />
              </>
            )}
          </svg>
        </div>

        {/* ── Content (order 2 — center) ── */}
        <div style={{ flex: 1, minWidth: 0, order: 2, position: 'relative' }}>
          {active ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#34d399" />
                  <path d="M6 10.5 L9 13.5 L14 7.5" stroke="#0f2847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9' }}>{isAr ? 'تم تفعيل الاستثمار التلقائي' : 'Auto Invest Active'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 12, marginTop: 6 }}>
                <span style={{ color: '#64748b' }}>{isAr ? 'استثمارات تلقائية:' : 'Auto investments:'} <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 700, color: '#34d399' }}>12</span></span>
                <div style={{ width: 1, height: 14, background: '#102344' }} />
                <span style={{ color: '#64748b' }}>{isAr ? 'آخر تنفيذ:' : 'Last run:'} <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>{isAr ? 'قبل 3 ساعات' : '3 hours ago'}</span></span>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{isAr ? 'الاستثمار التلقائي' : 'Auto Invest'}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{isAr ? 'حدد معاييرك ودع النظام يستثمر تلقائيًا في الفرص المناسبة لك' : 'Set your criteria and let the system auto-invest in matching opportunities'}</div>
              <div style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{isAr ? 'بدون رسوم إضافية' : 'No extra fees'}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#334155' }} />
                <span>{isAr ? 'تحكم كامل' : 'Full control'}</span>
              </div>
            </>
          )}
        </div>

        {/* ── CTA (order 1 — far right in RTL) ── */}
        <div style={{ flexShrink: 0, order: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          {active ? (
            <>
              <button
                onClick={e => { e.stopPropagation(); onConfigure?.(); }}
                onMouseEnter={() => setPriHover(true)}
                onMouseLeave={() => setPriHover(false)}
                style={{
                  fontSize: 13, fontWeight: 700, color: '#34d399', whiteSpace: 'nowrap',
                  background: priHover ? 'rgba(52,211,153,0.14)' : 'rgba(52,211,153,0.08)',
                  border: `1px solid ${priHover ? 'rgba(52,211,153,0.35)' : 'rgba(52,211,153,0.2)'}`,
                  padding: '9px 22px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {isAr ? 'تعديل الإعدادات' : 'Edit Settings'}
              </button>
              <button
                onClick={e => { e.stopPropagation(); setActive(false); }}
                onMouseEnter={() => setSecHover(true)}
                onMouseLeave={() => setSecHover(false)}
                style={{ fontSize: 11, color: secHover ? '#f87171' : '#475569', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
              >
                {isAr ? 'إيقاف' : 'Deactivate'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={e => { e.stopPropagation(); setActive(true); onConfigure?.(); }}
                onMouseEnter={() => setPriHover(true)}
                onMouseLeave={() => setPriHover(false)}
                style={{
                  fontSize: 13, fontWeight: 700, color: 'white', whiteSpace: 'nowrap',
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  padding: '10px 24px', borderRadius: 12, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  boxShadow: priHover
                    ? '0 6px 24px -3px rgba(37,99,235,0.5), 0 0 30px -8px rgba(96,165,250,0.3)'
                    : '0 4px 16px -3px rgba(37,99,235,0.4), 0 0 20px -8px rgba(96,165,250,0.2)',
                  transform: priHover ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.2s',
                }}
              >
                {isAr ? 'تفعيل الاستثمار التلقائي' : 'Activate Auto Invest'}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" /></svg>
              </button>
              <button
                onClick={e => e.stopPropagation()}
                onMouseEnter={() => setSecHover(true)}
                onMouseLeave={() => setSecHover(false)}
                style={{ fontSize: 12, color: secHover ? '#93c5fd' : '#64748b', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
              >
                {isAr ? 'كيف يعمل؟' : 'How it works?'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
