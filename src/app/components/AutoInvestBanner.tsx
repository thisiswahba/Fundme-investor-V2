import { useState } from 'react';

function AutomationIllustration({ active }: { active: boolean }) {
  const baseColor = active ? '#34d399' : '#60a5fa';
  const accentColor = active ? '#5eead4' : '#93c5fd';
  const fadedColor = active ? 'rgba(52,211,153,0.12)' : 'rgba(96,165,250,0.10)';
  const nodeInner = active ? '#134e4a' : '#1e3a5f';
  const id = active ? 'a' : 'i';

  return (
    <svg viewBox="0 0 180 100" fill="none" style={{ width: 180, height: 100 }}>
      {/* Background grid dots */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r={0.8} fill="rgba(255,255,255,0.08)" />
        ))
      )}

      {/* Dashed flow line — animated */}
      <path d="M20 70 Q50 70 60 50 T100 40 T140 55" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.35" style={{ animation: 'aibDash 3s linear infinite' }} />
      {/* Second flow path — solid subtle */}
      <path d="M30 80 Q65 60 80 45 T120 35 T160 45" stroke={baseColor} strokeWidth="2" fill="none" opacity="0.2" />

      {/* Rising graph polyline */}
      <polyline points="25,75 45,68 65,58 85,45 105,38 125,28 150,20" stroke={baseColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Graph area gradient fill */}
      <polygon points="25,75 45,68 65,58 85,45 105,38 125,28 150,20 150,85 25,85" fill={`url(#gfDk-${id})`} opacity="0.5" />

      {/* Flow nodes — small, dark inner */}
      <circle cx="45" cy="68" r="4" fill={nodeInner} stroke={baseColor} strokeWidth="1.5" />
      <circle cx="125" cy="28" r="4" fill={nodeInner} stroke={accentColor} strokeWidth="1.5" />

      {/* Center node — outer ring + inner + tiny play triangle */}
      <circle cx="85" cy="45" r="9" fill={fadedColor} stroke={baseColor} strokeWidth="1.5" opacity="0.7" />
      <circle cx="85" cy="45" r="5" fill={nodeInner} stroke={baseColor} strokeWidth="2" />
      <polygon points="83,42 83,48 88,45" fill={baseColor} />

      {/* Pulse rings — active only */}
      {active && (
        <>
          <circle cx="125" cy="28" r="8" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.5" style={{ animation: 'aibPulse 2s ease-out infinite' }} />
          <circle cx="125" cy="28" r="12" stroke={accentColor} strokeWidth="0.6" fill="none" opacity="0.25" style={{ animation: 'aibPulse 2s ease-out infinite', animationDelay: '0.5s' }} />
        </>
      )}

      {/* Thin connector arrows */}
      <path d="M52 65 L78 48" stroke={baseColor} strokeWidth="1" opacity="0.25" markerEnd={`url(#arrDk-${id})`} />
      <path d="M92 42 L118 30" stroke={accentColor} strokeWidth="1" opacity="0.25" markerEnd={`url(#arrDk-${id})`} />

      {/* Floating decorative rects */}
      <rect x="140" y="60" width="16" height="12" rx="3" stroke={accentColor} strokeWidth="0.8" fill={fadedColor} transform="rotate(-8 148 66)" />
      <rect x="15" y="35" width="12" height="10" rx="2" stroke={baseColor} strokeWidth="0.7" fill={fadedColor} transform="rotate(5 21 40)" />

      <defs>
        <linearGradient id={`gfDk-${id}`} x1="0" y1="20" x2="0" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={baseColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={baseColor} stopOpacity="0" />
        </linearGradient>
        <marker id={`arrDk-${id}`} markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill={baseColor} opacity="0.4" />
        </marker>
      </defs>
    </svg>
  );
}

export function AutoInvestBanner({ onConfigure }: { onConfigure?: () => void }) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const blue = { base: '#60a5fa', primary: '#2563eb', accent: '#93c5fd', node: '#1e3a5f', glow: 'rgba(96,165,250,', border: 'rgba(96,165,250,0.12)', texture: '#60a5fa' };
  const teal = { base: '#34d399', primary: '#0d9488', accent: '#5eead4', node: '#134e4a', glow: 'rgba(52,211,153,', border: 'rgba(52,211,153,0.15)', texture: '#34d399' };
  const c = active ? teal : blue;

  return (
    <>
      <style>{`
        @keyframes aibFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes aibDash{to{stroke-dashoffset:-28}}
        @keyframes aibPulse{0%{r:8;opacity:0.4}100%{r:18;opacity:0}}
      `}</style>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%', minHeight: 140, borderRadius: 20, position: 'relative', overflow: 'hidden', cursor: 'pointer',
          background: active
            ? 'linear-gradient(135deg, #0a2e38 0%, #0f3460 40%, #1a4a8a 100%)'
            : 'linear-gradient(135deg, #0f2847 0%, #132e5b 40%, #1a4a8a 100%)',
          border: `1px solid ${c.border}`,
          boxShadow: hovered
            ? (active ? `0 16px 40px -8px ${c.glow}0.15), 0 0 0 1px ${c.glow}0.1)` : '0 16px 40px -8px rgba(37,99,235,0.15), 0 0 0 1px rgba(96,165,250,0.1)')
            : '0 2px 16px -4px rgba(0,0,0,0.2)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
          animation: 'aibFadeUp 0.6s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* ── Background layers ── */}
        {/* Texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${c.texture} 8px, ${c.texture} 9px)` }} />
        {/* Corner glow */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${c.glow}${active ? '0.10' : '0.08'}) 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

        {/* ── Illustration — absolute background decoration ── */}
        <div style={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', opacity: 0.4, pointerEvents: 'none', zIndex: 0 }}>
          <AutomationIllustration active={active} />
        </div>

        {/* ── Foreground: Content with CTAs below ── */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'rtl', padding: '24px 32px' }}>
          {active ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#34d399" />
                  <path d="M6 10.5 L9 13.5 L14 7.5" stroke="#0f2847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#ffffff' }}>تم تفعيل الاستثمار التلقائي</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 12, marginBottom: 10 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>استثمارات تلقائية: <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 700, color: '#34d399' }}>12</span></span>
                <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>آخر تنفيذ: <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>قبل 3 ساعات</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={e => { e.stopPropagation(); onConfigure?.(); }}
                  onMouseEnter={() => setPrimaryHover(true)}
                  onMouseLeave={() => setPrimaryHover(false)}
                  style={{
                    fontSize: 12, fontWeight: 700, color: '#34d399', whiteSpace: 'nowrap',
                    background: primaryHover ? 'rgba(52,211,153,0.18)' : 'rgba(52,211,153,0.1)',
                    border: `1px solid ${primaryHover ? 'rgba(52,211,153,0.35)' : 'rgba(52,211,153,0.2)'}`,
                    padding: '7px 18px', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  تعديل الإعدادات
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setActive(false); }}
                  onMouseEnter={() => setSecondaryHover(true)}
                  onMouseLeave={() => setSecondaryHover(false)}
                  style={{ fontSize: 11, color: secondaryHover ? '#f87171' : 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                >
                  إيقاف
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', marginBottom: 3 }}>الاستثمار التلقائي</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>حدد معاييرك ودع النظام يستثمر تلقائيًا في الفرص المناسبة لك</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={e => { e.stopPropagation(); setActive(true); onConfigure?.(); }}
                  onMouseEnter={() => setPrimaryHover(true)}
                  onMouseLeave={() => setPrimaryHover(false)}
                  style={{
                    fontSize: 12, fontWeight: 700, color: 'white', whiteSpace: 'nowrap',
                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    border: '1px solid rgba(96,165,250,0.3)',
                    padding: '8px 20px', borderRadius: 10, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: primaryHover ? '0 6px 24px -3px rgba(37,99,235,0.6)' : '0 4px 16px -3px rgba(37,99,235,0.5)',
                    transform: primaryHover ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.2s',
                  }}
                >
                  تفعيل الاستثمار التلقائي
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" /></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
