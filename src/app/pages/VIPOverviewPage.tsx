import { useState, useId } from 'react';
import { Link } from 'react-router';
import {
  TrendingUp, ArrowDownLeft, ArrowLeft, ArrowRight, ArrowDownToLine,
  Wallet, PieChart, Target, Crown, Shield, Calendar, CheckCircle,
  BarChart3, Zap, Star,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePersona } from '../demoPersona';
import { useI18n } from '../i18n';
import { formatSAR, formatPercentage, formatChartValue } from '../utils/currency';
import { VIPOpportunitiesPreview } from '../components/overview/VIPOpportunitiesPreview';
import AutoInvestBannerDark from '../components/AutoInvestBannerDark';
import {
  FundMeHeroCard, FundMeButton, InfoTile, VIPBadge,
  colors, darkCardStyle,
} from '../components/fundme';

const card = darkCardStyle;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. VIP Header — uses FundMeHeroCard
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function VIPHeaderSection() {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const p = persona.portfolio;
  const firstName = isAr ? persona.profile.nameAr.split(' ')[0] : persona.profile.nameEn.split(' ')[0];

  return (
    <FundMeHeroCard
      title={isAr ? 'إجمالي المحفظة' : 'Total Portfolio'}
      subtitle={isAr ? `مرحباً، ${firstName}` : `Welcome back, ${firstName}`}
      mainValue={formatSAR(p.totalValue, { decimals: 0 })}
      changeValue={formatPercentage(p.monthlyGrowth)}
      changePositive={p.monthlyGrowth >= 0}
      badge={<VIPBadge />}
      stats={[
        { label: isAr ? 'العوائد' : 'Returns', value: formatSAR(p.realizedReturns, { decimals: 0 }), color: colors.successMuted },
        { label: isAr ? 'العائد السنوي' : 'Annual', value: formatPercentage(p.averageReturn), color: colors.successMuted },
        { label: isAr ? 'نشطة' : 'Active', value: `${p.activeInvestments}` },
      ]}
      actions={
        <>
          <FundMeButton variant="primary" surface="dark" icon={<Zap className="w-3.5 h-3.5" strokeWidth={2.5} />}>
            {isAr ? 'استثمر الآن' : 'Invest Now'}
          </FundMeButton>
          <FundMeButton variant="secondary" surface="dark" icon={<ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />}>
            {isAr ? 'إيداع' : 'Deposit'}
          </FundMeButton>
          <FundMeButton variant="secondary" surface="dark" icon={<ArrowDownToLine className="w-3.5 h-3.5" strokeWidth={2} />}>
            {isAr ? 'سحب' : 'Withdraw'}
          </FundMeButton>
        </>
      }
    />
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. Advanced Metrics — tight, analytical
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AdvancedMetrics() {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const p = persona.portfolio;

  const metrics = [
    { icon: <Target className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'صافي الأرباح' : 'Net Profit', value: formatSAR(p.realizedReturns, { decimals: 0 }), delta: formatPercentage((p.realizedReturns / p.totalInvested) * 100) },
    { icon: <BarChart3 className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'العائد السنوي' : 'Annual Return', value: formatPercentage(p.averageReturn), delta: isAr ? 'أعلى من المتوسط' : 'Above avg' },
    { icon: <Shield className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'مستوى المخاطر' : 'Risk Level', value: isAr ? 'متوسط' : 'Moderate', delta: 'B+' },
    { icon: <PieChart className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'التنويع' : 'Diversification', value: isAr ? `${p.activeInvestments} فرصة` : `${p.activeInvestments} deals`, delta: isAr ? '4 قطاعات' : '4 sectors' },
    { icon: <Wallet className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'الرصيد المتاح' : 'Available', value: formatSAR(persona.wallet.available, { decimals: 0 }), delta: isAr ? 'جاهز للاستثمار' : 'Ready to invest' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
      {metrics.map((m, i) => (
        <InfoTile key={i} icon={m.icon} label={m.label} value={m.value} delta={m.delta} surface="dark" />
      ))}
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. Performance Chart — dark, dense
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const chartData = {
  '1M': [
    { month: 'W1', value: 2650000 },
    { month: 'W2', value: 2720000 },
    { month: 'W3', value: 2780000 },
    { month: 'W4', value: 2850000 },
  ],
  '6M': [
    { month: 'Jan', value: 2100000 },
    { month: 'Feb', value: 2250000 },
    { month: 'Mar', value: 2400000 },
    { month: 'Apr', value: 2550000 },
    { month: 'May', value: 2700000 },
    { month: 'Jun', value: 2850000 },
  ],
  '1Y': [
    { month: 'Jan', value: 1400000 },
    { month: 'Mar', value: 1700000 },
    { month: 'May', value: 2000000 },
    { month: 'Jul', value: 2300000 },
    { month: 'Sep', value: 2550000 },
    { month: 'Nov', value: 2750000 },
    { month: 'Dec', value: 2850000 },
  ],
};

function DarkTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md px-2.5 py-1.5" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
      <span className="text-[12px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(payload[0].value, { decimals: 0 })}</span>
    </div>
  );
}

function VIPChart() {
  const [period, setPeriod] = useState<'1M' | '6M' | '1Y'>('6M');
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const data = chartData[period];
  const gradId = useId();
  const current = data[data.length - 1].value;
  const start = data[0].value;
  const pct = ((current - start) / start) * 100;

  return (
    <div className="rounded-xl p-4 lg:p-5" style={card}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13px] text-white/60" style={{ fontWeight: 600 }}>
          {isAr ? 'أداء المحفظة' : 'Portfolio Performance'}
        </h3>
        <div className="flex items-center gap-0.5 rounded-md p-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {(['1M', '6M', '1Y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2 py-1 rounded text-[10px] transition-all ${period === p ? 'bg-white/8 text-white/80' : 'text-white/25 hover:text-white/40'}`}
              style={{ fontWeight: 600 }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-[20px] text-white" style={{ fontWeight: 700 }}>{formatSAR(current, { decimals: 0 })}</span>
        <span className="text-[11px] text-[#2BB673]" style={{ fontWeight: 600 }}>+{pct.toFixed(1)}%</span>
      </div>
      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={formatChartValue} orientation="right" width={48} />
            <Tooltip content={<DarkTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill={`url(#${gradId})`} dot={false} activeDot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#0E1422' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. Active Investments — with VIP tags
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const vipInvestments = [
  { name: 'صندوق عقاري حصري - الرياض', nameEn: 'Exclusive Real Estate — Riyadh', amount: 500000, returnRate: 14.5, status: 'active' as const, vip: true },
  { name: 'تمويل مشروع طاقة', nameEn: 'Energy Project Finance', amount: 350000, returnRate: 12.8, status: 'active' as const, vip: true },
  { name: 'صندوق التجزئة الإلكترونية', nameEn: 'E-Commerce Fund', amount: 280000, returnRate: 11.2, status: 'active' as const, vip: false },
  { name: 'تمويل سلسلة إمداد', nameEn: 'Supply Chain Finance', amount: 220000, returnRate: 9.8, status: 'active' as const, vip: false },
  { name: 'بنية تحتية - نيوم', nameEn: 'Infrastructure — NEOM', amount: 450000, returnRate: 15.2, status: 'active' as const, vip: true },
  { name: 'تمويل شركة لوجستية', nameEn: 'Logistics Company', amount: 180000, returnRate: 8.4, status: 'late' as const, vip: false },
];

function VIPInvestments() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div className="rounded-xl p-4 lg:p-5" style={card}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] text-white/60" style={{ fontWeight: 600 }}>{isAr ? 'الاستثمارات النشطة' : 'Active Investments'}</h3>
        <Link to="/app/portfolio" className="text-[11px] text-[#60A5FA] hover:text-[#93C5FD] transition-colors" style={{ fontWeight: 600 }}>{isAr ? 'الكل' : 'View All'}</Link>
      </div>
      <div className="space-y-0.5">
        {vipInvestments.map((inv, i) => (
          <div key={i} className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-white/80 truncate" style={{ fontWeight: 600 }}>{isAr ? inv.name : inv.nameEn}</span>
                {inv.vip && (
                  <span className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px]" style={{ background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', fontWeight: 700 }}>
                    <Star className="w-2 h-2" strokeWidth={3} /> VIP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-white/20">{formatSAR(inv.amount, { decimals: 0 })}</span>
                {inv.status === 'late' && (
                  <span className="text-[9px] text-[#F87171] px-1 py-0.5 rounded" style={{ background: 'rgba(248,113,113,0.08)', fontWeight: 600 }}>{isAr ? 'متأخر' : 'Late'}</span>
                )}
              </div>
            </div>
            <span className={`text-[13px] ${inv.status === 'late' ? 'text-[#F87171]' : 'text-[#2BB673]'}`} style={{ fontWeight: 700 }}>{formatPercentage(inv.returnRate)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. Repayments
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const vipRepayments = [
  { title: 'صندوق عقاري حصري', titleEn: 'Exclusive Real Estate', amount: 42000, date: 'خلال 3 أيام', dateEn: 'In 3 days', type: 'upcoming' as const },
  { title: 'مشروع طاقة', titleEn: 'Energy Project', amount: 28500, date: 'خلال 7 أيام', dateEn: 'In 7 days', type: 'upcoming' as const },
  { title: 'سلسلة إمداد', titleEn: 'Supply Chain', amount: 18200, date: 'تم استلامه أمس', dateEn: 'Received yesterday', type: 'received' as const },
];

function VIPRepayments() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div className="rounded-xl p-4 lg:p-5" style={card}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] text-white/60" style={{ fontWeight: 600 }}>{isAr ? 'الدفعات المستحقة' : 'Upcoming Payments'}</h3>
        <Link to="/app/portfolio" className="text-[11px] text-[#60A5FA] hover:text-[#93C5FD] transition-colors" style={{ fontWeight: 600 }}>{isAr ? 'الكل' : 'View All'}</Link>
      </div>
      <div className="space-y-0.5">
        {vipRepayments.map((r, i) => (
          <div key={i} className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: r.type === 'received' ? 'rgba(74,222,128,0.08)' : 'rgba(59,130,246,0.08)' }}>
              {r.type === 'received' ? <CheckCircle className="w-3.5 h-3.5 text-[#2BB673]" strokeWidth={2} /> : <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" strokeWidth={2} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-white/80 truncate" style={{ fontWeight: 600 }}>{isAr ? r.title : r.titleEn}</div>
              <div className="text-[10px] text-white/20 mt-0.5">{isAr ? r.date : r.dateEn}</div>
            </div>
            <span className={`text-[12px] ${r.type === 'received' ? 'text-[#2BB673]' : 'text-white/60'}`} style={{ fontWeight: 700 }}>{formatSAR(r.amount, { decimals: 0 })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. Recent Transactions
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const vipTx = [
  { title: 'استثمار في صندوق عقاري', titleEn: 'Real Estate Fund', amount: -500000, date: 'اليوم', dateEn: 'Today', icon: TrendingUp },
  { title: 'إيداع بنكي', titleEn: 'Bank Deposit', amount: 500000, date: 'أمس', dateEn: 'Yesterday', icon: ArrowDownLeft },
  { title: 'عائد — مشروع طاقة', titleEn: 'Return — Energy', amount: 42000, date: '8 أبريل', dateEn: 'Apr 8', icon: Wallet },
  { title: 'استثمار — بنية تحتية', titleEn: 'Investment — Infra', amount: -450000, date: '5 أبريل', dateEn: 'Apr 5', icon: TrendingUp },
  { title: 'عائد — سلسلة إمداد', titleEn: 'Return — Supply', amount: 18200, date: '3 أبريل', dateEn: 'Apr 3', icon: Wallet },
];

function VIPTransactions() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div className="rounded-xl p-4 lg:p-5" style={card}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] text-white/60" style={{ fontWeight: 600 }}>{isAr ? 'آخر العمليات' : 'Recent Transactions'}</h3>
        <Link to="/app/wallet" className="text-[11px] text-[#60A5FA] hover:text-[#93C5FD] transition-colors" style={{ fontWeight: 600 }}>{isAr ? 'الكل' : 'View All'}</Link>
      </div>
      <div className="space-y-0">
        {vipTx.map((tx, i) => (
          <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: tx.amount > 0 ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)' }}>
              <tx.icon className={`w-3.5 h-3.5 ${tx.amount > 0 ? 'text-[#2BB673]' : 'text-white/25'}`} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-white/70 truncate" style={{ fontWeight: 600 }}>{isAr ? tx.title : tx.titleEn}</div>
              <div className="text-[9px] text-white/15 mt-0.5">{isAr ? tx.date : tx.dateEn}</div>
            </div>
            <span className={`text-[12px] ${tx.amount > 0 ? 'text-[#2BB673]' : 'text-white/40'}`} style={{ fontWeight: 700 }}>
              {tx.amount > 0 ? '+' : ''}{formatSAR(Math.abs(tx.amount), { decimals: 0 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Page Composition
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function VIPOverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-4">
        <VIPHeaderSection />
      </div>

      {/* Auto Invest Banner */}
      <div className="mb-4">
        <AutoInvestBannerDark />
      </div>

      {/* Metrics */}
      <div className="mb-4">
        <AdvancedMetrics />
      </div>

      {/* Chart */}
      <div className="mb-4">
        <VIPChart />
      </div>

      {/* Investments + Repayments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        <VIPInvestments />
        <VIPRepayments />
      </div>

      {/* Opportunities */}
      <div className="mb-4">
        <VIPOpportunitiesPreview />
      </div>

      {/* Transactions */}
      <div>
        <VIPTransactions />
      </div>
    </div>
  );
}
