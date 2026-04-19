import { useState, useId } from 'react';
import { Link } from 'react-router';
import {
  TrendingUp, ArrowUpRight, ArrowDownLeft, ArrowRight, ArrowDownToLine,
  Wallet, PieChart, Target, Calendar, CheckCircle,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePersona } from '../demoPersona';
import { useI18n } from '../i18n';
import { formatSAR, formatPercentage, formatChartValue } from '../utils/currency';
import { OpportunitiesPreview } from '../components/overview/OpportunitiesPreview';
import { EmptyHeroSection } from '../components/overview/EmptyHeroSection';
import { AutoInvestWidget } from '../components/overview/AutoInvestWidget';
import {
  InfoTile,
  colors,
} from '../components/fundme';

/* ──────────────────────────────────────────────
   A. Wallet Card — matches empty state design
   ────────────────────────────────────────────── */

function WalletCardSection() {
  return <EmptyHeroSection />;
}

/* ──────────────────────────────────────────────
   B. Metrics Row — 4 clean stat cards
   ────────────────────────────────────────────── */

function MetricsRow() {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const p = persona.portfolio;

  const metrics = [
    { icon: <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'إجمالي المستثمر' : 'Total Invested', value: formatSAR(p.totalInvested, { decimals: 0 }) },
    { icon: <Target className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'إجمالي العوائد' : 'Total Returns', value: formatSAR(p.realizedReturns, { decimals: 0 }), valueColor: colors.success },
    { icon: <PieChart className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'الاستثمارات النشطة' : 'Active Investments', value: isAr ? `${p.activeInvestments} صفقة` : `${p.activeInvestments} deals` },
    { icon: <Wallet className="w-3.5 h-3.5" strokeWidth={1.8} />, label: isAr ? 'متوسط العائد' : 'Avg. Return', value: formatPercentage(p.averageReturn), valueColor: colors.success },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <InfoTile key={i} icon={m.icon} label={m.label} value={m.value} surface="light" valueColor={m.valueColor} />
      ))}
    </div>
  );
}


/* ──────────────────────────────────────────────
   C2. Performance Chart — tighter, cleaner
   ────────────────────────────────────────────── */

const chartData = {
  '1M': [
    { month: 'W1', value: 440000 },
    { month: 'W2', value: 455000 },
    { month: 'W3', value: 465000 },
    { month: 'W4', value: 485000 },
  ],
  '6M': [
    { month: 'Jan', value: 350000 },
    { month: 'Feb', value: 380000 },
    { month: 'Mar', value: 410000 },
    { month: 'Apr', value: 440000 },
    { month: 'May', value: 465000 },
    { month: 'Jun', value: 485000 },
  ],
  '1Y': [
    { month: 'Jan', value: 250000 },
    { month: 'Mar', value: 310000 },
    { month: 'May', value: 370000 },
    { month: 'Jul', value: 420000 },
    { month: 'Sep', value: 455000 },
    { month: 'Nov', value: 480000 },
    { month: 'Dec', value: 485000 },
  ],
};

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{ background: '#0F172A', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
    >
      <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>
        {formatSAR(payload[0].value, { decimals: 0 })}
      </span>
    </div>
  );
}

function PerformanceChart() {
  const [period, setPeriod] = useState<'1M' | '6M' | '1Y'>('6M');
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const data = chartData[period];
  const gradId = useId();

  // Current value indicator
  const currentValue = data[data.length - 1].value;
  const startValue = data[0].value;
  const changePercent = ((currentValue - startValue) / startValue) * 100;

  return (
    <div
      className="rounded-xl p-5 lg:p-6"
      style={{
        background: 'white',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-[15px] text-[#0F172A]" style={{ fontWeight: 600 }}>
            {isAr ? 'أداء المحفظة' : 'Portfolio Performance'}
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-[#F8FAFC] rounded-lg p-0.5" style={{ border: '1px solid #F1F5F9' }}>
          {(['1M', '6M', '1Y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                period === p
                  ? 'bg-white text-[#0F172A] shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#64748B]'
              }`}
              style={{ fontWeight: 600 }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Current value indicator */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[22px] text-[#0F172A]" style={{ fontWeight: 700 }}>
          {formatSAR(currentValue, { decimals: 0 })}
        </span>
        <span
          className={`text-[12px] ${changePercent >= 0 ? 'text-[#2BB673]' : 'text-[#DC2626]'}`}
          style={{ fontWeight: 600 }}
        >
          {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%
        </span>
      </div>

      {/* Chart */}
      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatChartValue}
              orientation="right"
              width={50}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: '#3B82F6',
                strokeWidth: 2.5,
                stroke: 'white',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   C3. Active Investments — clean list
   ────────────────────────────────────────────── */

const investments = [
  { name: 'تمويل مشروع عقاري - الرياض', nameEn: 'Real Estate — Riyadh', amount: 150000, returnRate: 9.5, status: 'active' as const },
  { name: 'صندوق التجزئة الإلكترونية', nameEn: 'E-Commerce Fund', amount: 100000, returnRate: 12.2, status: 'active' as const },
  { name: 'تمويل شركة لوجستية', nameEn: 'Logistics Company', amount: 85000, returnRate: 8.7, status: 'late' as const },
  { name: 'مشروع صناعي - جدة', nameEn: 'Industrial — Jeddah', amount: 105000, returnRate: 10.4, status: 'active' as const },
];

function ActiveInvestments() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  return (
    <div
      className="rounded-xl p-5 lg:p-6"
      style={{
        background: 'white',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] text-[#0F172A]" style={{ fontWeight: 600 }}>
          {isAr ? 'الاستثمارات النشطة' : 'Active Investments'}
        </h3>
        <Link
          to="/app/portfolio"
          className="text-[12px] text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          style={{ fontWeight: 600 }}
        >
          {isAr ? 'عرض الكل' : 'View All'}
        </Link>
      </div>

      <div className="space-y-1.5">
        {investments.map((inv, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-[#0F172A] truncate" style={{ fontWeight: 600 }}>
                {isAr ? inv.name : inv.nameEn}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-[#94A3B8]">
                  {formatSAR(inv.amount, { decimals: 0 })}
                </span>
                {inv.status === 'late' && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-[#E2E8F0]" />
                    <span className="text-[10px] text-[#DC2626] px-1.5 py-0.5 rounded bg-[#FEF2F2]" style={{ fontWeight: 600 }}>
                      {isAr ? 'متأخر' : 'Late'}
                    </span>
                  </>
                )}
              </div>
            </div>
            <span
              className={`text-[14px] ${inv.status === 'late' ? 'text-[#DC2626]' : 'text-[#2BB673]'}`}
              style={{ fontWeight: 700 }}
            >
              {formatPercentage(inv.returnRate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   C4. Repayments — compact
   ────────────────────────────────────────────── */

const repayments = [
  { title: 'تمويل مشروع عقاري', titleEn: 'Real Estate Project', amount: 8500, date: 'خلال 3 أيام', dateEn: 'In 3 days', type: 'upcoming' as const },
  { title: 'صندوق التجزئة', titleEn: 'E-Commerce Fund', amount: 12300, date: 'خلال 7 أيام', dateEn: 'In 7 days', type: 'upcoming' as const },
  { title: 'مشروع صناعي', titleEn: 'Industrial Project', amount: 6800, date: 'تم استلامه أمس', dateEn: 'Received yesterday', type: 'received' as const },
];

function RepaymentsCard() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  return (
    <div
      className="rounded-xl p-5 lg:p-6"
      style={{
        background: 'white',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] text-[#0F172A]" style={{ fontWeight: 600 }}>
          {isAr ? 'الدفعات المستحقة' : 'Upcoming Payments'}
        </h3>
        <Link
          to="/app/portfolio"
          className="text-[12px] text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          style={{ fontWeight: 600 }}
        >
          {isAr ? 'عرض الكل' : 'View All'}
        </Link>
      </div>

      <div className="space-y-1.5">
        {repayments.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                r.type === 'received' ? 'bg-[#F0F7F4]' : 'bg-[#F1F5F9]'
              }`}
            >
              {r.type === 'received' ? (
                <CheckCircle className="w-4 h-4 text-[#2BB673]" strokeWidth={2} />
              ) : (
                <Calendar className="w-4 h-4 text-[#64748B]" strokeWidth={2} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-[#0F172A] truncate" style={{ fontWeight: 600 }}>
                {isAr ? r.title : r.titleEn}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">
                {isAr ? r.date : r.dateEn}
              </div>
            </div>
            <span
              className={`text-[13px] ${r.type === 'received' ? 'text-[#2BB673]' : 'text-[#0F172A]'}`}
              style={{ fontWeight: 700 }}
            >
              {formatSAR(r.amount, { decimals: 0 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   C5. Recent Transactions — minimal
   ────────────────────────────────────────────── */

const txList = [
  { type: 'investment', title: 'استثمار في مشروع عقاري', titleEn: 'Real Estate Investment', amount: -50000, date: 'اليوم، 10:30ص', dateEn: 'Today, 10:30 AM', icon: TrendingUp },
  { type: 'deposit', title: 'إيداع من حساب بنكي', titleEn: 'Bank Deposit', amount: 100000, date: 'أمس، 3:45م', dateEn: 'Yesterday, 3:45 PM', icon: ArrowDownLeft },
  { type: 'return', title: 'عائد من صندوق التجزئة', titleEn: 'E-Commerce Return', amount: 8500, date: '3 أبريل 2026', dateEn: 'Apr 3, 2026', icon: Wallet },
  { type: 'investment', title: 'استثمار في شركة لوجستية', titleEn: 'Logistics Investment', amount: -35000, date: '1 أبريل 2026', dateEn: 'Apr 1, 2026', icon: TrendingUp },
  { type: 'return', title: 'عائد من مشروع صناعي', titleEn: 'Industrial Return', amount: 6800, date: '28 مارس 2026', dateEn: 'Mar 28, 2026', icon: Wallet },
];

function RecentTransactions() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  return (
    <div
      className="rounded-xl p-5 lg:p-6"
      style={{
        background: 'white',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] text-[#0F172A]" style={{ fontWeight: 600 }}>
          {isAr ? 'آخر العمليات' : 'Recent Transactions'}
        </h3>
        <Link
          to="/app/wallet"
          className="text-[12px] text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          style={{ fontWeight: 600 }}
        >
          {isAr ? 'عرض الكل' : 'View All'}
        </Link>
      </div>

      <div className="space-y-0.5">
        {txList.map((tx, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                tx.amount > 0 ? 'bg-[#F0F7F4]' : 'bg-[#F1F5F9]'
              }`}
            >
              <tx.icon
                className={`w-4 h-4 ${tx.amount > 0 ? 'text-[#2BB673]' : 'text-[#64748B]'}`}
                strokeWidth={1.8}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-[#0F172A] truncate" style={{ fontWeight: 600 }}>
                {isAr ? tx.title : tx.titleEn}
              </div>
              <div className="text-[10px] text-[#94A3B8] mt-0.5">
                {isAr ? tx.date : tx.dateEn}
              </div>
            </div>
            <span
              className={`text-[13px] ${tx.amount > 0 ? 'text-[#2BB673]' : 'text-[#334155]'}`}
              style={{ fontWeight: 700 }}
            >
              {tx.amount > 0 ? '+' : ''}{formatSAR(Math.abs(tx.amount), { decimals: 0 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Page Composition
   ────────────────────────────────────────────── */

export function OverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-7 pb-24 md:pb-8">
      {/* A + Auto-Invest sidebar — mirrors new investor layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 order-2 lg:order-2 flex flex-col gap-5">
          <WalletCardSection />
          <MetricsRow />
        </div>
        <div className="lg:col-span-1 order-1 lg:order-1">
          <AutoInvestWidget />
        </div>
      </div>

      {/* C. Performance Chart */}
      <div className="mb-5">
        <PerformanceChart />
      </div>

      {/* D. Investments + Repayments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ActiveInvestments />
        <RepaymentsCard />
      </div>

      {/* E. Opportunities Preview */}
      <div className="mb-5">
        <OpportunitiesPreview />
      </div>

      {/* F. Recent Transactions */}
      <div>
        <RecentTransactions />
      </div>
    </div>
  );
}
