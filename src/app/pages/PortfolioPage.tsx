import { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router';
import { formatSAR, formatPercentage, formatChartValue } from '../utils/currency';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { AutoInvestModal } from '../components/AutoInvestModal';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, Wallet, AlertTriangle, Clock, CheckCircle,
  Eye, Rocket, ShieldAlert, Briefcase, Calendar, Activity,
  ChevronLeft, Search, Download, Filter, Lightbulb, ArrowUpRight,
  PieChart as PieChartIcon, Zap,
} from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Data
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const summary = {
  totalPortfolio: 360000,
  activeInvested: 265000,
  avgReturn: 12.1,
  monthlyChange: 2.3,
  realizedReturns: 17532,
  unrealizedReturns: 24843,
  activeCount: 4,
  completedCount: 3,
};

const investments = [
  { id: 'FM-0004-360', project: 'تمويل مشروع عقاري', projectEn: 'Real Estate Finance', risk: 'A', amount: 100000, nextPayment: 'Apr 19, 2026', nextPaymentAr: '١٩ أبريل ٢٠٢٦', nextPaymentRel: 'in 4 days', nextPaymentRelAr: 'خلال ٤ أيام', netReturn: 13090, returnPct: 13.1, status: 'active' as const },
  { id: 'FM-0001-309', project: 'تمويل الفواتير', projectEn: 'Invoice Finance', risk: 'A', amount: 50000, nextPayment: 'Apr 19, 2026', nextPaymentAr: '١٩ أبريل ٢٠٢٦', nextPaymentRel: 'in 4 days', nextPaymentRelAr: 'خلال ٤ أيام', netReturn: 3123, returnPct: 6.2, status: 'active' as const },
  { id: 'FM-0002-326', project: 'تمويل رأس المال', projectEn: 'Capital Finance', risk: 'B', amount: 75000, nextPayment: 'Pending', nextPaymentAr: 'قيد الانتظار', nextPaymentRel: '', nextPaymentRelAr: '', netReturn: 10500, returnPct: 14.0, status: 'funding' as const },
  { id: 'FM-0007-411', project: 'تمويل التجزئة', projectEn: 'Retail Finance', risk: 'C', amount: 40000, nextPayment: 'May 29, 2026', nextPaymentAr: '٢٩ مايو ٢٠٢٦', nextPaymentRel: 'in 44 days', nextPaymentRelAr: 'خلال ٤٤ يوم', netReturn: 6210, returnPct: 15.5, status: 'active' as const },
  { id: 'FM-0003-287', project: 'تمويل شركة لوجستية', projectEn: 'Logistics Finance', risk: 'D', amount: 65000, nextPayment: 'Apr 11, 2026', nextPaymentAr: '١١ أبريل ٢٠٢٦', nextPaymentRel: 'Overdue 4 days', nextPaymentRelAr: 'متأخر ٤ أيام', netReturn: -6306, returnPct: -9.7, status: 'late' as const },
  { id: 'FM-0005-190', project: 'تمويل معدات صناعية', projectEn: 'Equipment Finance', risk: 'B', amount: 20000, nextPayment: '', nextPaymentAr: '', nextPaymentRel: 'Completed', nextPaymentRelAr: 'مكتمل', netReturn: 2800, returnPct: 14.0, status: 'completed' as const },
  { id: 'FM-0006-245', project: 'تمويل مطاعم', projectEn: 'Restaurant Finance', risk: 'A', amount: 10000, nextPayment: '', nextPaymentAr: '', nextPaymentRel: 'Completed', nextPaymentRelAr: 'مكتمل', netReturn: 1100, returnPct: 11.0, status: 'completed' as const },
];

const riskDistribution = [
  { grade: 'A', amount: 80000, count: 2, color: '#3B82F6' },
  { grade: 'B', amount: 175000, count: 2, color: '#14B8A6' },
  { grade: 'C', amount: 40000, count: 1, color: '#F59E0B' },
  { grade: 'D', amount: 65000, count: 1, color: '#EF4444' },
];

const growthData = [
  { month: 'Jan', monthAr: 'يناير', invested: 80000, returns: 1200 },
  { month: 'Feb', monthAr: 'فبراير', invested: 150000, returns: 3800 },
  { month: 'Mar', monthAr: 'مارس', invested: 230000, returns: 7200 },
  { month: 'Apr', monthAr: 'أبريل', invested: 290000, returns: 11400 },
  { month: 'May', monthAr: 'مايو', invested: 340000, returns: 15800 },
  { month: 'Jun', monthAr: 'يونيو', invested: 360000, returns: 17532 },
];

const sparkline = [{ v: 80 }, { v: 150 }, { v: 230 }, { v: 290 }, { v: 340 }, { v: 360 }];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Shared styles
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const cardStyle = { background: '#0C1C34', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' };
const riskColor: Record<string, string> = { A: '#3B82F6', B: '#14B8A6', C: '#F59E0B', D: '#EF4444' };

function statusBadge(status: string, isAr: boolean) {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    active: { label: isAr ? 'نشط' : 'On-time', bg: 'transparent', color: '#2BB673', border: '#BBF7D0' },
    late: { label: isAr ? 'متأخر' : 'Delayed', bg: '#FEF2F2', color: '#EF4444', border: '#FECACA' },
    funding: { label: isAr ? 'قيد التمويل' : 'Funding', bg: 'transparent', color: '#3B82F6', border: '#BFDBFE' },
    completed: { label: isAr ? 'مكتمل' : 'Completed', bg: '#F8FAFC', color: '#94A3B8', border: '#E2E8F0' },
  };
  const c = map[status] || map.active;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px]" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontWeight: 600 }}>
      {status === 'late' && <AlertTriangle className="w-2.5 h-2.5" strokeWidth={2} />}
      {status === 'funding' && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.color }} />}
      {c.label}
    </span>
  );
}

function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0C1C34] rounded-lg px-3 py-2 text-[11px]" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="text-[#94A3B8] mb-1" style={{ fontWeight: 500 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#64748B]">{p.name}</span>
          <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(p.value, { decimals: 0 })}</span>
        </div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. Portfolio Hero — tiered hierarchy
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function WalletSummaryCard() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  return (
    <div
      className="rounded-2xl relative overflow-hidden h-full flex flex-col"
      style={{ background: 'linear-gradient(145deg, #F0F5FF 0%, #FAFBFF 60%, #FFFFFF 100%)', border: '1px solid #DBEAFE', padding: '24px 28px' }}
    >
      <div className="absolute top-4 left-4 w-[120px] h-[48px] opacity-30">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkline}><Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={1.5} dot={false} /></LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top spacer */}
      <div style={{ flex: 1 }} />

      <div className="relative">
        <div className="text-[11px] text-[#64748B] uppercase tracking-[0.08em] mb-3" style={{ fontWeight: 600 }}>
          {isAr ? 'إجمالي المحفظة' : 'Total Portfolio Value'}
        </div>
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="text-[36px] text-[#0F172A] leading-none" style={{ fontWeight: 700, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums' }}>
            {formatSAR(summary.totalPortfolio, { decimals: 0 })}
          </span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px]" style={{ background: 'rgba(43,182,115,0.08)', color: '#2BB673', fontWeight: 600 }}>
            <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
            +{summary.monthlyChange}% {isAr ? 'هذا الشهر' : 'this month'}
          </span>
        </div>
        <div className="text-[11px] text-[#94A3B8] mb-5" style={{ fontWeight: 500 }}>
          {isAr ? 'إجمالي قيمة المحفظة' : 'Portfolio value including returns'}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/app/opportunities"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12px] text-white transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)', fontWeight: 600, boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }}
          >
            <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
            {isAr ? 'استثمر الآن' : 'Invest Now'}
          </Link>
          <Link
            to="/app/opportunities"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12px] text-[#3B82F6] transition-all hover:bg-[#EFF6FF]"
            style={{ fontWeight: 600, border: '1px solid #BFDBFE' }}
          >
            {isAr ? 'استكشاف الفرص' : 'Explore'}
          </Link>
        </div>
      </div>

      {/* Spacer — absorbs extra height */}
      <div style={{ flex: 1 }} />

      {/* Stat cards — pushed to bottom */}
      <div style={{ borderTop: '1px solid #E2E8F0', margin: '0 -28px', padding: '16px 28px 0' }}>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl p-4" style={{ background: '#0A1A30', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600 }}>{isAr ? 'نشطة' : 'Active'}</div>
            <div className="text-[18px] text-[#0F172A] leading-tight" style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatSAR(summary.activeInvested, { decimals: 0 })}</div>
            <div className="text-[10px] text-[#94A3B8] mt-1">{summary.activeCount} {isAr ? 'صفقات' : 'deals'}</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: '#0A1A30', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600 }}>{isAr ? 'متوسط العائد' : 'Avg. Return'}</div>
            <div className="text-[18px] text-[#2BB673] leading-tight" style={{ fontWeight: 700 }}>{summary.avgReturn}%</div>
            <div className="text-[10px] text-[#94A3B8] mt-1">{isAr ? 'سنوياً' : 'annual'}</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: '#0A1A30', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600 }}>{isAr ? 'العوائد' : 'Returns'}</div>
            <div className="text-[18px] text-[#2BB673] leading-tight" style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatSAR(summary.realizedReturns, { decimals: 0 })}</div>
            <div className="text-[10px] text-[#94A3B8] mt-1">{isAr ? 'محققة' : 'realized'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1b. Auto Invest Vertical Card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AutoInvestVertical({ onActivate }: { onActivate?: () => void }) {
  const [active, setActive] = useState(false);
  const [hov, setHov] = useState(false);
  const [priHov, setPriHov] = useState(false);
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const bc = active ? '#34d399' : '#60a5fa';
  const ac = active ? '#5eead4' : '#93c5fd';
  const fc = active ? 'rgba(52,211,153,0.10)' : 'rgba(96,165,250,0.10)';
  const ni = active ? '#134e4a' : '#0f2847';
  const sid = active ? 'va' : 'vi';

  return (
    <>
      <style>{`
        @keyframes aivDash{to{stroke-dashoffset:-32}}
        @keyframes aivPulse{0%{r:7;opacity:0.4}100%{r:16;opacity:0}}
        @keyframes aivIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 20, position: 'relative', overflow: 'hidden', cursor: 'pointer', height: '100%', minHeight: 380,
          display: 'flex', flexDirection: 'column', direction: isAr ? 'rtl' : 'ltr',
          background: active
            ? 'linear-gradient(165deg, #0a2e38 0%, #0f2847 35%, #132e5b 100%)'
            : 'linear-gradient(165deg, #0f2847 0%, #132e5b 35%, #1a4a8a 100%)',
          border: `1px solid ${active ? 'rgba(52,211,153,0.15)' : 'rgba(96,165,250,0.1)'}`,
          boxShadow: hov
            ? (active ? '0 20px 40px -10px rgba(13,148,136,0.15), 0 0 0 1px rgba(52,211,153,0.1)' : '0 20px 40px -10px rgba(15,40,71,0.3), 0 0 0 1px rgba(96,165,250,0.08)')
            : '0 4px 20px -6px rgba(15,40,71,0.2)',
          transform: hov ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
          animation: 'aivIn 0.6s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.02, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${bc} 8px, ${bc} 9px)` }} />
        {/* Top-right glow */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${active ? 'rgba(52,211,153,0.1)' : 'rgba(96,165,250,0.08)'} 0%, transparent 70%)`, filter: 'blur(25px)', pointerEvents: 'none' }} />
        {/* Bottom glow */}
        <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 200, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${active ? 'rgba(52,211,153,0.06)' : 'rgba(96,165,250,0.05)'} 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 26px 24px', minHeight: 380 }}>

          {active ? (
            <>
              {/* Icon */}
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#34d399" />
                  <path d="M6 10.5 L9 13.5 L14 7.5" stroke="#0f2847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              {/* Title */}
              <div style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', marginBottom: 20, lineHeight: 1.3 }}>
                {isAr ? 'تم تفعيل الاستثمار التلقائي' : 'Auto Invest Active'}
              </div>
              {/* Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                {[
                  { label: isAr ? 'استثمارات تلقائية' : 'Auto investments', value: '12', color: '#34d399', size: 16 },
                  { label: isAr ? 'آخر تنفيذ' : 'Last run', value: isAr ? 'قبل 3 ساعات' : '3 hours ago', color: 'rgba(255,255,255,0.7)', size: 13 },
                  { label: isAr ? 'إجمالي المستثمر' : 'Total invested', value: '45,200 ر.س', color: 'rgba(255,255,255,0.8)', size: 13 },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: s.size, fontWeight: s.size === 16 ? 700 : 600, color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Icon */}
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(96,165,250,0.1)" />
                </svg>
              </div>
              {/* Title */}
              <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 8, lineHeight: 1.3 }}>
                {isAr ? 'الاستثمار التلقائي' : 'Auto Invest'}
              </div>
              {/* Desc */}
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 10 }}>
                {isAr ? 'حدد معاييرك ودع النظام يستثمر تلقائيًا في الفرص المناسبة لك' : 'Set your criteria and let the system auto-invest in matching opportunities'}
              </div>
              {/* Subtext */}
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span>{isAr ? 'بدون رسوم إضافية' : 'No extra fees'}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <span>{isAr ? 'تحكم كامل' : 'Full control'}</span>
              </div>
            </>
          )}

          {/* Illustration — flex child, bleeds to edges */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', margin: '0 -26px', overflow: 'hidden', opacity: active ? 0.7 : 0.8 }}>
            <svg viewBox="0 0 300 140" fill="none" style={{ width: '100%', height: 140 }}>
              <defs>
                <linearGradient id={`gfW-${sid}`} x1="0" y1="25" x2="0" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={bc} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={bc} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Dot grid */}
              {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 14 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={12 + c * 21} cy={10 + r * 22} r="0.7" fill="rgba(255,255,255,0.04)" />
              )))}
              {/* Area fill */}
              <polygon points="20,120 50,108 90,95 130,78 170,62 210,48 250,35 280,28 300,25 300,140 20,140" fill={`url(#gfW-${sid})`} opacity="0.6" />
              {/* Graph line */}
              <polyline points="20,120 50,108 90,95 130,78 170,62 210,48 250,35 280,28" stroke={bc} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
              {/* Dashed flow */}
              <path d="M30 125 Q80 110 120 88 T200 55 T280 35" stroke={ac} strokeWidth="1.2" strokeDasharray="4 4" fill="none" opacity="0.25" style={{ animation: 'aivDash 4s linear infinite' }} />
              {/* Nodes */}
              <circle cx="90" cy="95" r="3.5" fill={ni} stroke={bc} strokeWidth="1.5" />
              <circle cx="250" cy="35" r="3.5" fill={ni} stroke={ac} strokeWidth="1.5" />
              {/* Center node */}
              <circle cx="170" cy="62" r="8" fill={fc} stroke={bc} strokeWidth="1.5" opacity="0.6" />
              <circle cx="170" cy="62" r="4.5" fill={ni} stroke={bc} strokeWidth="1.8" />
              <polygon points="168.5,59.5 168.5,64.5 172.5,62" fill={bc} opacity="0.9" />
              {/* Connectors */}
              <path d="M97 92 L162 66" stroke={bc} strokeWidth="0.8" opacity="0.2" />
              <path d="M178 59 L242 38" stroke={ac} strokeWidth="0.8" opacity="0.2" />
              {/* Decorative rects */}
              <rect x="260" y="70" width="14" height="10" rx="3" stroke={ac} strokeWidth="0.7" fill={fc} opacity="0.5" transform="rotate(-6 267 75)" />
              <rect x="30" y="75" width="11" height="8" rx="2" stroke={bc} strokeWidth="0.6" fill={fc} opacity="0.4" transform="rotate(4 35.5 79)" />
              {/* Pulse rings — active only */}
              {active && (
                <>
                  <circle cx="250" cy="35" r="7" stroke={ac} strokeWidth="1" fill="none" opacity="0.4" style={{ animation: 'aivPulse 2s ease-out infinite' }} />
                  <circle cx="250" cy="35" r="11" stroke={ac} strokeWidth="0.6" fill="none" opacity="0.2" style={{ animation: 'aivPulse 2s ease-out infinite', animationDelay: '0.6s' }} />
                </>
              )}
            </svg>
          </div>

          {/* CTA */}
          <div style={{ paddingTop: 20 }}>
            {active ? (
              <>
                <button
                  onClick={e => { e.stopPropagation(); onActivate?.(); }}
                  onMouseEnter={() => setPriHov(true)}
                  onMouseLeave={() => setPriHov(false)}
                  style={{
                    width: '100%', padding: '12px 20px', borderRadius: 14, fontSize: 14, fontWeight: 700,
                    color: '#34d399', cursor: 'pointer', transition: 'all 0.2s',
                    background: priHov ? 'rgba(52,211,153,0.14)' : 'rgba(52,211,153,0.08)',
                    border: `1px solid ${priHov ? 'rgba(52,211,153,0.3)' : 'rgba(52,211,153,0.18)'}`,
                  }}
                >
                  {isAr ? 'تعديل الإعدادات' : 'Edit Settings'}
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setActive(false); }}
                  style={{ width: '100%', paddingTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  {isAr ? 'إيقاف التشغيل' : 'Deactivate'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setActive(true); onActivate?.(); }}
                  onMouseEnter={() => setPriHov(true)}
                  onMouseLeave={() => setPriHov(false)}
                  style={{
                    width: '100%', padding: '12px 20px', borderRadius: 14, fontSize: 14, fontWeight: 700,
                    color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    border: '1px solid rgba(96,165,250,0.25)',
                    boxShadow: priHov ? '0 6px 24px -4px rgba(37,99,235,0.6)' : '0 4px 16px -4px rgba(37,99,235,0.5)',
                    transform: priHov ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s',
                  }}
                >
                  {isAr ? 'تفعيل الاستثمار التلقائي' : 'Activate Auto Invest'}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" /></svg>
                </button>
                <button
                  onClick={e => e.stopPropagation()}
                  style={{ width: '100%', paddingTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  {isAr ? 'كيف يعمل؟' : 'How it works?'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. Alert Banner — clean inline card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function InsightBanner() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const hasOverdue = investments.some(i => i.status === 'late');
  const overdueItem = investments.find(i => i.status === 'late');

  if (!hasOverdue) return null;

  return (
    <div
      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
      style={{ background: '#FEF8F8', border: '1px solid #FDE8E8' }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#FEE2E2' }}>
        <ShieldAlert className="w-4 h-4 text-[#EF4444]" strokeWidth={1.8} />
      </div>
      <span className="flex-1 text-[13px] text-[#0F172A]" style={{ fontWeight: 500 }}>
        {isAr
          ? `دفعة متأخرة بقيمة ${formatSAR(Math.abs(overdueItem!.netReturn), { decimals: 0 })} — ${overdueItem!.project}`
          : `Overdue repayment of ${formatSAR(Math.abs(overdueItem!.netReturn), { decimals: 0 })} — ${overdueItem!.projectEn}`}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          to="/app/opportunities"
          className="h-8 px-4 rounded-lg text-[12px] text-white flex items-center gap-1.5 transition-all hover:brightness-110"
          style={{ fontWeight: 600, background: '#3B82F6' }}
        >
          <Zap className="w-3 h-3" strokeWidth={2.5} />
          {isAr ? 'استثمر الآن' : 'Invest Now'}
        </Link>
        <button className="h-8 px-4 rounded-lg text-[12px] text-[#EF4444] hover:bg-[#FEE2E2] transition-colors cursor-pointer" style={{ fontWeight: 600, border: '1px solid #FECACA' }}>
          {isAr ? 'عرض التفاصيل' : 'View Details'}
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. Analytics — donut with breakdown list
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AnalyticsSection() {
  const [tab, setTab] = useState<'risk' | 'activity'>('risk');
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const gradInv = useId();
  const gradRet = useId();

  return (
    <div className="rounded-2xl p-6" style={cardStyle}>
      {/* Title + Tabs row */}
      <div className="mb-5">
        <h2 className="text-[15px] text-[#0F172A] mb-3" style={{ fontWeight: 700 }}>
          {isAr ? 'تحليلات المحفظة' : 'Portfolio Analytics'}
        </h2>
        <div className="flex items-center gap-1">
          {[
            { key: 'risk' as const, label: isAr ? 'توزيع المخاطر' : 'Risk Distribution' },
            { key: 'activity' as const, label: isAr ? 'نمو المحفظة' : 'Portfolio Growth' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-[12px] transition-all ${tab === t.key ? 'bg-[#0F172A] text-white' : 'text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F8FAFC]'}`}
              style={{ fontWeight: 600 }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'risk' ? (
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6">
          {/* LEFT: Breakdown list */}
          <div className="flex-1 w-full space-y-2">
            {riskDistribution.map(d => {
              const pct = Math.round((d.amount / summary.totalPortfolio) * 100);
              return (
                <div key={d.grade} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: '#0A1A30' }}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="w-6 text-[12px] text-[#0F172A]" style={{ fontWeight: 700 }}>{d.grade}</span>
                  <span className="flex-1 text-[12px] text-[#64748B]">{d.count} {isAr ? 'صفقات' : 'deals'}</span>
                  <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatSAR(d.amount, { decimals: 0 })}</span>
                  <span className="w-10 text-left text-[11px] text-[#94A3B8]" style={{ fontWeight: 600 }}>{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Donut */}
          <div className="relative w-[200px] h-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} dataKey="amount" innerRadius={65} outerRadius={95} paddingAngle={2} strokeWidth={0}>
                  {riskDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[18px] text-[#0F172A]" style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatSAR(summary.totalPortfolio, { decimals: 0 })}</span>
              <span className="text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{isAr ? 'إجمالي' : 'Total'}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id={gradInv} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.06} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                <linearGradient id={gradRet} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2BB673" stopOpacity={0.06} /><stop offset="100%" stopColor="#2BB673" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey={isAr ? 'monthAr' : 'month'} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={formatChartValue} orientation="right" width={48} />
              <Tooltip content={<ChartTip />} cursor={{ stroke: '#E2E8F0', strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="invested" name={isAr ? 'المستثمر' : 'Invested'} stroke="#3B82F6" strokeWidth={1.5} fill={`url(#${gradInv})`} dot={false} activeDot={{ r: 3, fill: '#3B82F6', strokeWidth: 1.5, stroke: 'white' }} />
              <Area type="monotone" dataKey="returns" name={isAr ? 'العوائد' : 'Returns'} stroke="#2BB673" strokeWidth={1.5} fill={`url(#${gradRet})`} dot={false} activeDot={{ r: 3, fill: '#2BB673', strokeWidth: 1.5, stroke: 'white' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. Investments Table — refined
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function InvestmentsTable() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const navigate = useNavigate();

  const activeInv = investments.filter(i => i.status !== 'completed');
  const completedInv = investments.filter(i => i.status === 'completed');
  const filtered = activeTab === 'active' ? activeInv : activeTab === 'completed' ? completedInv : investments;

  const tabs = [
    { key: 'active' as const, label: isAr ? 'نشطة' : 'Active', count: activeInv.length },
    { key: 'completed' as const, label: isAr ? 'مكتملة' : 'Completed', count: completedInv.length },
    { key: 'all' as const, label: isAr ? 'الكل' : 'All', count: investments.length },
  ];

  return (
    <div className="rounded-2xl overflow-hidden" style={cardStyle}>
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] text-[#0F172A]" style={{ fontWeight: 700 }}>
            {isAr ? 'استثماراتي' : 'My Investments'}
            <span className="text-[12px] text-[#94A3B8] mr-2 ml-2" style={{ fontWeight: 400 }}>{investments.length}</span>
          </h2>
          <div className="flex items-center gap-2">
            <Link
              to="/app/opportunities"
              className="h-8 px-3 rounded-lg text-[11px] text-white flex items-center gap-1 transition-all hover:brightness-110"
              style={{ fontWeight: 600, background: '#3B82F6' }}
            >
              <Zap className="w-3 h-3" strokeWidth={2.5} />
              {isAr ? 'استثمر الآن' : 'Invest Now'}
            </Link>
            <button className="h-8 px-3 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors cursor-pointer" style={{ border: '1px solid #E2E8F0', fontWeight: 500 }}>
              <Download className="w-3 h-3 inline mr-1 ml-1" strokeWidth={1.8} />
              {isAr ? 'تصدير' : 'Export'}
            </button>
          </div>
        </div>

        {/* Tabs — underline style */}
        <div className="flex items-center gap-0 border-b" style={{ borderColor: '#E8ECF2' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2.5 text-[12px] transition-all border-b-2 -mb-px ${activeTab === t.key ? 'border-[#3B82F6] text-[#0F172A]' : 'border-transparent text-[#94A3B8] hover:text-[#64748B]'}`}
              style={{ fontWeight: activeTab === t.key ? 600 : 500 }}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        {/* Header row — slightly tinted */}
        <div
          className="grid grid-cols-12 gap-4 px-6 h-[40px] items-center text-[10px] uppercase tracking-[0.06em] text-[#94A3B8]"
          style={{ fontWeight: 600, background: '#0A1A30' }}
        >
          <div className="col-span-4">{isAr ? 'الفرصة' : 'Opportunity'}</div>
          <div className="col-span-1 text-center">{isAr ? 'المخاطر' : 'Risk'}</div>
          <div className="col-span-2">{isAr ? 'المبلغ' : 'Amount'}</div>
          <div className="col-span-2">{isAr ? 'الدفعة القادمة' : 'Next Payment'}</div>
          <div className="col-span-2">{isAr ? 'صافي العائد' : 'Net Return'}</div>
          <div className="col-span-1">{isAr ? 'الحالة' : 'Status'}</div>
        </div>

        {filtered.map(inv => (
          <div
            key={inv.id}
            onClick={() => navigate(`/app/portfolio/${inv.id}`)}
            className="grid grid-cols-12 gap-4 items-center px-6 min-h-[68px] py-3 border-t hover:bg-[#FAFBFC] transition-colors cursor-pointer group relative"
            style={{ borderColor: '#F1F5F9' }}
          >
            {/* Risk stripe */}
            <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: riskColor[inv.risk] || '#94A3B8' }} />

            <div className="col-span-4 pr-2">
              <div className="text-[13px] text-[#0F172A] truncate group-hover:text-[#3B82F6] transition-colors" style={{ fontWeight: 600 }}>{isAr ? inv.project : inv.projectEn}</div>
              <div className="text-[10px] text-[#3B82F6] mt-0.5 font-mono">{inv.id}</div>
            </div>

            <div className="col-span-1 flex justify-center">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white" style={{ background: riskColor[inv.risk], fontWeight: 700 }}>{inv.risk}</span>
            </div>

            <div className="col-span-2 text-[13px] text-[#0F172A]" style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{formatSAR(inv.amount, { decimals: 0 })}</div>

            <div className="col-span-2">
              {inv.nextPayment ? (
                <>
                  <div className="text-[11px] text-[#0F172A]" style={{ fontWeight: 500 }}>{isAr ? inv.nextPaymentAr : inv.nextPayment}</div>
                  <div className={`text-[10px] mt-0.5 ${inv.status === 'late' ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} style={{ fontWeight: inv.status === 'late' ? 600 : 400 }}>
                    {isAr ? inv.nextPaymentRelAr : inv.nextPaymentRel}
                  </div>
                </>
              ) : (
                <span className="text-[11px] text-[#94A3B8]">{isAr ? inv.nextPaymentRelAr : inv.nextPaymentRel}</span>
              )}
            </div>

            <div className="col-span-2">
              <div className={`text-[13px] ${inv.netReturn >= 0 ? 'text-[#2BB673]' : 'text-[#EF4444]'}`} style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {inv.netReturn >= 0 ? '+' : ''}{formatSAR(inv.netReturn, { decimals: 0 })}
              </div>
              <div className={`text-[10px] mt-0.5 ${inv.returnPct >= 0 ? 'text-[#2BB673]' : 'text-[#EF4444]'}`} style={{ fontWeight: 500 }}>
                {inv.returnPct >= 0 ? '+' : ''}{inv.returnPct}%
              </div>
            </div>

            <div className="col-span-1 flex items-center justify-between">
              {statusBadge(inv.status, isAr)}
              <ChevronLeft className="w-4 h-4 text-[#CBD5E1] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">
        {filtered.map(inv => (
          <div key={inv.id} onClick={() => navigate(`/app/portfolio/${inv.id}`)} className="p-4 border-t relative cursor-pointer hover:bg-[#FAFBFC] transition-colors" style={{ borderColor: '#F1F5F9' }}>
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{ background: riskColor[inv.risk] }} />
            <div className="flex items-start justify-between mb-2 pr-1 pl-2">
              <div>
                <div className="text-[13px] text-[#0F172A] truncate" style={{ fontWeight: 600 }}>{isAr ? inv.project : inv.projectEn}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[#3B82F6] font-mono">{inv.id}</span>
                  {statusBadge(inv.status, isAr)}
                </div>
              </div>
              <span className={`text-[14px] ${inv.netReturn >= 0 ? 'text-[#2BB673]' : 'text-[#EF4444]'}`} style={{ fontWeight: 700 }}>
                {inv.netReturn >= 0 ? '+' : ''}{formatPercentage(inv.returnPct)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-2 pl-2 border-t" style={{ borderColor: '#F1F5F9' }}>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatSAR(inv.amount, { decimals: 0 })}</span>
              <span className={inv.status === 'late' ? 'text-[#EF4444] font-medium' : ''}>{isAr ? inv.nextPaymentRelAr : inv.nextPaymentRel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. Upcoming Repayments
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function RepaymentsSection() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  const upcoming = investments.filter(i => i.status === 'active' || i.status === 'late').sort((a, b) => {
    if (a.status === 'late') return -1;
    if (b.status === 'late') return 1;
    return 0;
  });
  const totalDue = upcoming.reduce((s, i) => s + Math.abs(i.netReturn), 0);
  const nextDue = upcoming[0];

  return (
    <div className="rounded-2xl p-6" style={cardStyle}>
      <h2 className="text-[15px] text-[#0F172A] mb-5" style={{ fontWeight: 700 }}>
        {isAr ? 'الدفعات القادمة' : 'Upcoming Repayments'}
      </h2>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl" style={{ background: '#0A1A30' }}>
          <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600 }}>{isAr ? 'الإجمالي' : 'Total Due'}</div>
          <div className="text-[18px] text-[#0F172A]" style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatSAR(totalDue, { decimals: 0 })}</div>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: nextDue?.status === 'late' ? '#FEF8F8' : '#F8FAFC', border: nextDue?.status === 'late' ? '1px solid #FDE8E8' : 'none' }}
        >
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600, color: nextDue?.status === 'late' ? '#EF4444' : '#94A3B8' }}>
            {nextDue?.status === 'late' && <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />}
            {isAr ? 'التالي' : 'Next Due'}
          </div>
          <div className="text-[16px] text-[#0F172A]" style={{ fontWeight: 700 }}>
            {nextDue ? (isAr ? nextDue.nextPaymentRelAr : nextDue.nextPaymentRel) : '—'}
          </div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#0A1A30' }}>
          <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600 }}>{isAr ? 'عدد الدفعات' : 'Count'}</div>
          <div className="text-[18px] text-[#0F172A]" style={{ fontWeight: 700 }}>{upcoming.length}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {upcoming.map((inv, i) => (
          <div key={inv.id} className="flex items-start gap-3 py-3.5" style={{ borderBottom: i < upcoming.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <div className="flex flex-col items-center shrink-0 pt-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: inv.status === 'late' ? '#EF4444' : '#3B82F6' }} />
              {i < upcoming.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: '#F1F5F9' }} />}
            </div>
            <div className="flex-1 flex items-center justify-between min-w-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{isAr ? inv.project : inv.projectEn}</span>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white" style={{ background: riskColor[inv.risk], fontWeight: 700 }}>{inv.risk}</span>
                  {inv.status === 'late' && statusBadge('late', isAr)}
                </div>
                <div className="text-[10px] text-[#94A3B8] mt-0.5">{isAr ? inv.nextPaymentRelAr : inv.nextPaymentRel}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`text-[14px] ${inv.netReturn >= 0 ? 'text-[#0F172A]' : 'text-[#EF4444]'}`} style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {formatSAR(Math.abs(inv.netReturn), { decimals: 0 })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Page Composition
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function PortfolioPage() {
  const [autoInvestOpen, setAutoInvestOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Top row: Wallet (with stats) + Auto Invest widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6" style={{ alignItems: 'stretch' }}>
        <div className="lg:col-span-8">
          <WalletSummaryCard />
        </div>
        <div className="lg:col-span-4">
          <AutoInvestVertical onActivate={() => setAutoInvestOpen(true)} />
        </div>
      </div>
      <div className="mb-6"><InsightBanner /></div>
      <div className="mb-6"><AnalyticsSection /></div>
      <div className="mb-6"><InvestmentsTable /></div>
      <div className="mb-8"><RepaymentsSection /></div>
      <div className="text-center text-[11px] text-[#94A3B8] py-4">
        © 2026 FundMe. All rights reserved. · Privacy Policy · Terms of Service · Contact
      </div>
      <AutoInvestModal open={autoInvestOpen} onClose={() => setAutoInvestOpen(false)} />
    </div>
  );
}
