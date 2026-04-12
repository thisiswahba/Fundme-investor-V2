import { useState } from 'react';
import { formatSAR, formatPercentage } from '../utils/currency';
import { StatusBadge } from '../components/ui/StatusBadge';
import { TrendingUp, Target, DollarSign, Activity, CalendarClock, Zap, Settings } from 'lucide-react';

const summary = {
  totalInvested: 440000,
  expectedReturns: 58000,
  realizedReturns: 18000,
  avgReturn: 11.8,
};

const investments = [
  {
    opportunityId: 'FM-0001-309',
    amount: 150000,
    returnRate: 9.5,
    expectedReturn: 14250,
    status: 'active' as const,
    nextPayment: 'خلال 5 أيام',
  },
  {
    opportunityId: 'FM-0002-412',
    amount: 100000,
    returnRate: 12.2,
    expectedReturn: 12200,
    status: 'active' as const,
    nextPayment: 'خلال 12 يوم',
  },
  {
    opportunityId: 'FM-0003-578',
    amount: 85000,
    returnRate: 8.7,
    expectedReturn: 7395,
    status: 'late' as const,
    nextPayment: 'متأخر 3 أيام',
  },
  {
    opportunityId: 'FM-0004-221',
    amount: 105000,
    returnRate: 10.4,
    expectedReturn: 10920,
    status: 'active' as const,
    nextPayment: 'خلال 20 يوم',
  },
  {
    opportunityId: 'FM-0005-887',
    amount: 75000,
    returnRate: 11.8,
    expectedReturn: 8850,
    status: 'completed' as const,
    nextPayment: 'مكتمل',
  },
];

const repayments = [
  { date: '2026/04/15', opportunityId: 'FM-0001-309', amount: 4750, status: 'pending' as const },
  { date: '2026/04/22', opportunityId: 'FM-0002-412', amount: 3050, status: 'pending' as const },
  { date: '2026/04/06', opportunityId: 'FM-0003-578', amount: 2465, status: 'late' as const },
  { date: '2026/05/01', opportunityId: 'FM-0004-221', amount: 3640, status: 'pending' as const },
  { date: '2026/03/28', opportunityId: 'FM-0005-887', amount: 8850, status: 'completed' as const },
];

type InvestmentFilter = 'all' | 'active' | 'completed';

export function PortfolioPage() {
  const [filter, setFilter] = useState<InvestmentFilter>('all');

  const filtered = filter === 'all'
    ? investments
    : investments.filter(inv => inv.status === filter);

  const filterTabs: { key: InvestmentFilter; label: string; count: number }[] = [
    { key: 'all', label: 'الكل', count: investments.length },
    { key: 'active', label: 'نشط', count: investments.filter(i => i.status === 'active').length },
    { key: 'completed', label: 'مكتمل', count: investments.filter(i => i.status === 'completed').length },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[28px] text-[#0F172A] mb-1" style={{ fontWeight: 700 }}>
          محفظتي
        </h1>
        <p className="text-[14px] text-[#475569]">
          تتبع جميع استثماراتك وأدائها المالي
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[12px] text-[#475569] mb-1" style={{ fontWeight: 500 }}>
            إجمالي المستثمر
          </div>
          <div className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>
            {formatSAR(summary.totalInvested)}
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center">
              <Target className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[12px] text-[#475569] mb-1" style={{ fontWeight: 500 }}>
            العوائد المتوقعة
          </div>
          <div className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>
            {formatSAR(summary.expectedReturns)}
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[12px] text-[#475569] mb-1" style={{ fontWeight: 500 }}>
            العوائد المحققة
          </div>
          <div className="text-[20px] text-[#10B981]" style={{ fontWeight: 700 }}>
            {formatSAR(summary.realizedReturns)}
          </div>
        </div>

        <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#FEF3C7] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[12px] text-[#475569] mb-1" style={{ fontWeight: 500 }}>
            متوسط العائد
          </div>
          <div className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>
            {formatPercentage(summary.avgReturn)}
          </div>
        </div>
      </div>

      {/* Auto Invest Section */}
      <div
        className="bg-white rounded-[18px] p-5 mb-6 flex items-center justify-between gap-4"
        style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)', border: '1px solid #E2E8F0' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' }}
          >
            <Zap className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[15px] text-[#0F172A] mb-0.5" style={{ fontWeight: 600 }}>
              الاستثمار التلقائي
            </h3>
            <p className="text-[13px] text-[#475569]">
              فعّل الاستثمار التلقائي لتوزيع أموالك على الفرص المناسبة تلقائياً
            </p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] transition-all hover:scale-105 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
          }}
        >
          <Settings className="w-4 h-4" strokeWidth={2} />
          <span>إعداد</span>
        </button>
      </div>

      {/* Investments Table */}
      <div className="bg-white rounded-[18px] overflow-hidden mb-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}>
        <div className="px-6 pt-5 pb-0">
          <h2 className="text-[18px] text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>
            جميع الاستثمارات
          </h2>
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 border-b border-[#F1F5F9]">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`relative px-4 py-2.5 text-[13px] transition-colors ${
                  filter === tab.key
                    ? 'text-[#2563EB]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
                style={{ fontWeight: filter === tab.key ? 700 : 500 }}
              >
                <span>{tab.label}</span>
                <span
                  className={`mr-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
                    filter === tab.key
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'bg-[#F1F5F9] text-[#94A3B8]'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {tab.count}
                </span>
                {filter === tab.key && (
                  <div className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#2563EB] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  رقم الفرصة
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  المبلغ المستثمر
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  معدل العائد
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  العائد المتوقع
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  الحالة
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  الدفعة القادمة
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, index) => (
                <tr
                  key={index}
                  className="border-b border-[#F1F5F9] last:border-b-0 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0F172A] font-mono" style={{ fontWeight: 600 }}>
                      {inv.opportunityId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                      {formatSAR(inv.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#10B981]" style={{ fontWeight: 700 }}>
                      {formatPercentage(inv.returnRate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                      {formatSAR(inv.expectedReturn)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[13px] text-[#475569]">
                      {inv.nextPayment}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#F1F5F9]">
          {filtered.map((inv, index) => (
            <div key={index} className="p-4 hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-[14px] text-[#0F172A] font-mono mb-1" style={{ fontWeight: 600 }}>
                    {inv.opportunityId}
                  </div>
                  <StatusBadge status={inv.status} />
                </div>
                <div className="text-left">
                  <div className="text-[14px] text-[#10B981]" style={{ fontWeight: 700 }}>
                    {formatPercentage(inv.returnRate)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <div className="text-[#475569] mb-1">المبلغ</div>
                  <div className="text-[#0F172A]" style={{ fontWeight: 600 }}>
                    {formatSAR(inv.amount)}
                  </div>
                </div>
                <div>
                  <div className="text-[#475569] mb-1">الدفعة القادمة</div>
                  <div className="text-[#0F172A]" style={{ fontWeight: 600 }}>
                    {inv.nextPayment}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Repayments Section */}
      <div
        className="rounded-[18px] overflow-hidden"
        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
      >
        <div className="px-6 pt-5 pb-4 flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
          <h2 className="text-[18px] text-[#0F172A]" style={{ fontWeight: 600 }}>
            الدفعات القادمة
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F1F5F9]/60">
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  التاريخ
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  رقم الفرصة
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  المبلغ
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] text-[#475569]" style={{ fontWeight: 600 }}>
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {repayments.map((r, index) => (
                <tr
                  key={index}
                  className="border-b border-[#F1F5F9] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 500 }}>
                      {r.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0F172A] font-mono" style={{ fontWeight: 600 }}>
                      {r.opportunityId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                      {formatSAR(r.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#E2E8F0]">
          {repayments.map((r, index) => (
            <div key={index} className="px-4 py-3 bg-white mx-3 first:rounded-t-xl last:rounded-b-xl last:mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[#0F172A] font-mono" style={{ fontWeight: 600 }}>
                  {r.opportunityId}
                </span>
                <StatusBadge status={r.status} />
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#475569]">{r.date}</span>
                <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(r.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
