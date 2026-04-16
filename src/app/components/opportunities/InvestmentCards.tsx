import { useState, useEffect } from 'react';

/* ── Types ── */
interface CardData {
  id: number;
  company: string;
  oppId: string;
  returnPct: number;
  riskLabel: string;
  riskColor: 'green' | 'amber';
  financingType: string;
  iconType: 'invoice' | 'capital' | 'equipment';
  tenor: string;
  funded: number;
  goal: number;
  fundingPct: number;
  comingSoon?: boolean;
  daysToLaunch?: number;
}

const cards: CardData[] = [
  { id: 1, company: 'شركة البركة التجارية', oppId: 'FM-0001-309', returnPct: 11.5, riskLabel: 'B - منخفض', riskColor: 'green', financingType: 'تمويل الفواتير', iconType: 'invoice', tenor: '20 شهر', funded: 340000, goal: 500000, fundingPct: 68 },
  { id: 2, company: 'مؤسسة الأفق للتجزئة', oppId: 'FM-0002-412', returnPct: 13.2, riskLabel: 'C - متوسط', riskColor: 'amber', financingType: 'تمويل رأس المال', iconType: 'capital', tenor: '20 شهر', funded: 147000, goal: 350000, fundingPct: 42 },
  { id: 3, company: 'الشركة الصناعية المتقدمة', oppId: 'FM-0003-578', returnPct: 9.8, riskLabel: 'A - منخفض جداً', riskColor: 'green', financingType: 'تمويل المعدات', iconType: 'equipment', tenor: '24 شهر', funded: 0, goal: 750000, fundingPct: 0, comingSoon: true, daysToLaunch: 5 },
];

const fmt = (n: number) => n.toLocaleString('ar-SA');

/* ── SVG Patterns ── */

function PatternBars() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#38bdf8" /></linearGradient></defs>
      <path d="M0 120 Q80 60 160 90 T320 50 T400 80" stroke="url(#pg1)" strokeWidth="1.2" />
      <path d="M0 140 Q100 100 200 110 T400 70" stroke="url(#pg1)" strokeWidth="0.8" />
      <rect x="280" y="18" width="38" height="26" rx="8" stroke="url(#pg1)" strokeWidth="0.8" transform="rotate(8 299 31)" />
      <rect x="325" y="40" width="28" height="18" rx="6" stroke="url(#pg1)" strokeWidth="0.6" transform="rotate(-5 339 49)" />
      <circle cx="55" cy="28" r="2" fill="#60a5fa" opacity="0.6" /><circle cx="72" cy="22" r="1.5" fill="#60a5fa" opacity="0.4" /><circle cx="45" cy="38" r="1" fill="#38bdf8" opacity="0.5" /><circle cx="88" cy="35" r="1.2" fill="#60a5fa" opacity="0.3" />
      <circle cx="340" cy="100" r="18" stroke="url(#pg1)" strokeWidth="0.6" /><circle cx="340" cy="100" r="30" stroke="url(#pg1)" strokeWidth="0.4" />
    </svg>
  );
}

function PatternCircles() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="pg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
      <circle cx="90" cy="70" r="70" stroke="url(#pg2)" strokeWidth="0.7" /><circle cx="110" cy="55" r="50" stroke="url(#pg2)" strokeWidth="0.6" /><circle cx="70" cy="90" r="35" stroke="url(#pg2)" strokeWidth="0.5" />
      <circle cx="320" cy="40" r="8" stroke="url(#pg2)" strokeWidth="0.5" /><circle cx="350" cy="120" r="5" stroke="url(#pg2)" strokeWidth="0.4" />
      <path d="M200 30 Q250 10 300 50 T400 30" stroke="url(#pg2)" strokeWidth="0.8" />
      <path d="M180 130 Q230 110 280 140" stroke="url(#pg2)" strokeWidth="0.6" />
      <rect x="290" y="65" width="32" height="32" rx="4" stroke="url(#pg2)" strokeWidth="0.7" transform="rotate(45 306 81)" />
    </svg>
  );
}

function PatternGrid() {
  const dots: JSX.Element[] = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 15; c++) dots.push(<circle key={`${r}-${c}`} cx={18 + c * 26} cy={12 + r * 19} r="1" fill="white" opacity="0.25" />);
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="pg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#34d399" /></linearGradient></defs>
      {dots}
      <polygon points="310,35 328,25 346,35 346,55 328,65 310,55" stroke="url(#pg3)" strokeWidth="0.7" />
      <polygon points="338,52 356,42 374,52 374,72 356,82 338,72" stroke="url(#pg3)" strokeWidth="0.5" />
      <path d="M35 135 L75 105 L125 125 L165 95 L200 110" stroke="url(#pg3)" strokeWidth="0.8" />
      <rect x="55" y="28" width="18" height="18" rx="2" stroke="url(#pg3)" strokeWidth="0.6" transform="rotate(30 64 37)" />
      <rect x="240" y="110" width="14" height="14" rx="2" stroke="url(#pg3)" strokeWidth="0.5" transform="rotate(-20 247 117)" />
    </svg>
  );
}

/* ── Category Icons (48x48 viewBox) ── */

function IconInvoice() {
  return (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="4" width="28" height="36" rx="4" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
      <line x1="14" y1="15" x2="30" y2="15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="21" x2="30" y2="21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="27" x2="22" y2="27" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="31" cy="33" r="5" fill="rgba(59,130,246,0.35)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
      <line x1="31" y1="30.5" x2="31" y2="35.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round" />
      <line x1="28.5" y1="33" x2="33.5" y2="33" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function IconCapital() {
  return (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <path d="M22 6 L36 18 L8 18 Z" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <rect x="12" y="20" width="4" height="16" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
      <rect x="20" y="20" width="4" height="16" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
      <rect x="28" y="20" width="4" height="16" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
      <line x1="7" y1="37" x2="37" y2="37" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="12" r="2.5" fill="rgba(99,102,241,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
    </svg>
  );
}

function IconEquipment() {
  return (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="7" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" fill="none" />
      <circle cx="22" cy="22" r="3" fill="rgba(34,211,238,0.35)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={22 + 10 * Math.cos(rad)} y1={22 + 10 * Math.sin(rad)} x2={22 + 13.5 * Math.cos(rad)} y2={22 + 13.5 * Math.sin(rad)} stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />;
      })}
      <rect x="33" y="30" width="3" height="8" rx="1" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" fill="none" transform="rotate(-30 34.5 34)" />
    </svg>
  );
}

const iconMap = { invoice: IconInvoice, capital: IconCapital, equipment: IconEquipment };
const patternMap = [PatternBars, PatternCircles, PatternGrid];
const coverGradients = [
  'linear-gradient(135deg, #0B1F3A 0%, #1A3F73 40%, #2563EB 100%)',
  'linear-gradient(135deg, #0E2345 0%, #1D4690 40%, #3B82F6 100%)',
  'linear-gradient(135deg, #091C35 0%, #163A6E 40%, #2158D4 100%)',
];

/* ── Single Card ── */

function Card({ data, index }: { data: CardData; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [ctaHover, setCTAHover] = useState(false);
  const [notifyHover, setNotifyHover] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!data.comingSoon) { const t = setTimeout(() => setProgress(data.fundingPct), 200); return () => clearTimeout(t); }
  }, [data.fundingPct, data.comingSoon]);

  const Icon = iconMap[data.iconType];
  const Pattern = patternMap[index];

  const riskColors = data.riskColor === 'green'
    ? { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' }
    : { color: '#d97706', bg: '#fffbeb', border: '#fde68a' };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid #e2e8f0',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.5s cubic-bezier(.4,0,.2,1)',
        cursor: 'pointer',
        opacity: 0,
        animation: `fadeUp 0.5s ${index * 0.12}s forwards cubic-bezier(.4,0,.2,1)`,
      }}
    >
      {/* Cover */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: coverGradients[index], flexShrink: 0 }}>
        <Pattern />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '16px 20px 18px' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Return */}
            <div>
              <div style={{ fontSize: 38, fontWeight: 700, color: 'white', lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
                {data.returnPct}%+
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500 }}>صافي العائد</div>
            </div>
            {/* Icon + badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <Icon />
              </div>
              {data.comingSoon && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.08)', fontSize: 10, fontWeight: 600, color: '#e0e7ff',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', animation: 'pulse 2s infinite' }} />
                  قريباً
                </div>
              )}
            </div>
          </div>
          {/* Bottom row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'white' }}>{data.company}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400 }}>{data.oppId}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Pills — fixed row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, minHeight: 26 }}>
          {!data.comingSoon ? (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 600, color: riskColors.color, background: riskColors.bg, border: `1px solid ${riskColors.border}`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: riskColors.color }} />
              {data.riskLabel}
            </span>
          ) : (
            <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: '#7c3aed', background: '#f5f3ff', border: '1px solid #ddd6fe' }}>قريباً</span>
          )}
          <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0' }}>{data.financingType}</span>
          <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0' }}>{data.tenor}</span>
        </div>

        {/* State block — exact fixed height, pushed to bottom */}
        <div style={{ marginTop: 'auto', height: 62, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {data.comingSoon ? (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>يفتح خلال</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>{data.daysToLaunch} أيام</span>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>{fmt(data.funded)}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', marginRight: 4 }}> / {fmt(data.goal)} ر.س</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0d9488', fontFamily: "'IBM Plex Mono', monospace" }}>{data.fundingPct}%</span>
              </div>
              <div style={{ width: '100%', height: 7, borderRadius: 999, background: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #1e3a8a, #0891b2)', width: `${progress}%`, transition: 'width 1.5s cubic-bezier(.4,0,.2,1)' }} />
              </div>
            </>
          )}
        </div>

        {/* CTA — fixed height, always bottom-aligned */}
        <div style={{ marginTop: 14, flexShrink: 0 }}>
          {data.comingSoon ? (
            <button
              onMouseEnter={() => setNotifyHover(true)}
              onMouseLeave={() => setNotifyHover(false)}
              style={{
                width: '100%', height: 46, borderRadius: 14, border: `1px solid ${notifyHover ? '#c4b5fd' : '#ddd6fe'}`,
                background: notifyHover ? '#ede9fe' : '#f5f3ff', color: '#7c3aed', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              أشعرني عند الإطلاق
            </button>
          ) : (
            <button
              onMouseEnter={() => setCTAHover(true)}
              onMouseLeave={() => setCTAHover(false)}
              style={{
                width: '100%', height: 46, borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg, #0f2847 0%, #1a4a8a 100%)', color: 'white',
                fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                boxShadow: ctaHover ? '0 6px 20px -4px rgba(15,40,71,0.45)' : '0 4px 12px -4px rgba(15,40,71,0.3)',
                transform: ctaHover ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
              }}
            >
              عرض التفاصيل
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */

export default function InvestmentCards() {
  const [viewAllHover, setViewAllHover] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
      <div style={{ direction: 'rtl', fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>فرص استثمارية جديدة</h2>
          <button
            onMouseEnter={() => setViewAllHover(true)}
            onMouseLeave={() => setViewAllHover(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 999,
              border: `1px solid ${viewAllHover ? '#cbd5e1' : '#e2e8f0'}`, background: 'white',
              fontSize: 13, fontWeight: 600, color: viewAllHover ? '#1e293b' : '#64748b', cursor: 'pointer',
              boxShadow: viewAllHover ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            عرض الكل
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
          </button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {cards.map((c, i) => <Card key={c.id} data={c} index={i} />)}
        </div>
      </div>
    </>
  );
}
