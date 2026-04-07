import { formatSAR, formatPercentage } from '../utils/currency';
import { StatusBadge } from '../components/ui/StatusBadge';
import { TrendingUp, Target, DollarSign, Activity } from 'lucide-react';

const summary = {
  totalInvested: 440000,
  expectedReturns: 58000,
  realizedReturns: 18000,
  avgReturn: 11.8,
};

const investments = [
  {
    project: 'تمويل مشروع عقاري - الرياض',
    amount: 150000,
    returnRate: 9.5,
    expectedReturn: 14250,
    status: 'active' as const,
    nextPayment: 'خلال ٥ أيام',
  },
  {
    project: 'صندوق التجزئة الإلكترونية',
    amount: 100000,
    returnRate: 12.2,
    expectedReturn: 12200,
    status: 'active' as const,
    nextPayment: 'خلال ١٢ يوم',
  },
  {
    project: 'تمويل شركة لوجستية',
    amount: 85000,
    returnRate: 8.7,
    expectedReturn: 7395,
    status: 'late' as const,
    nextPayment: 'متأخر ٣ أيام',
  },
  {
    project: 'مشروع صناعي - جدة',
    amount: 105000,
    returnRate: 10.4,
    expectedReturn: 10920,
    status: 'active' as const,
    nextPayment: 'خلال ٢٠ يوم',
  },
  {
    project: 'مطاعم وجبات سريعة',
    amount: 75000,
    returnRate: 11.8,
    expectedReturn: 8850,
    status: 'completed' as const,
    nextPayment: 'مكتمل',
  },
];

export function PortfolioPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
          محفظتي
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          تتبع جميع استثماراتك وأدائها المالي
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[13px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
            إجمالي المستثمر
          </div>
          <div className="text-[22px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            {formatSAR(summary.totalInvested)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
              <Target className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[13px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
            العوائد المتوقعة
          </div>
          <div className="text-[22px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            {formatSAR(summary.expectedReturns)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[13px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
            العوائد المحققة
          </div>
          <div className="text-[22px] text-[#10B981]" style={{ fontWeight: 700 }}>
            {formatSAR(summary.realizedReturns)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
            </div>
          </div>
          <div className="text-[13px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
            متوسط العائد
          </div>
          <div className="text-[22px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            {formatPercentage(summary.avgReturn)}
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
        <div className="p-6 border-b border-[#F1F4F9]">
          <h2 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
            جميع الاستثمارات
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#F1F4F9]">
                <th className="px-6 py-4 text-right text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                  المشروع
                </th>
                <th className="px-6 py-4 text-right text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                  المبلغ المستثمر
                </th>
                <th className="px-6 py-4 text-right text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                  معدل العائد
                </th>
                <th className="px-6 py-4 text-right text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                  العائد المتوقع
                </th>
                <th className="px-6 py-4 text-right text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                  الدفعة القادمة
                </th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv, index) => (
                <tr 
                  key={index} 
                  className="border-b border-[#F1F4F9] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                      {inv.project}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                      {formatSAR(inv.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#10B981]" style={{ fontWeight: 700 }}>
                      {formatPercentage(inv.returnRate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                      {formatSAR(inv.expectedReturn)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[13px] text-[#6B7280]">
                      {inv.nextPayment}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#F1F4F9]">
          {investments.map((inv, index) => (
            <div key={index} className="p-4 hover:bg-[#F9FAFB] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-[14px] text-[#0B1A3A] mb-1" style={{ fontWeight: 600 }}>
                    {inv.project}
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
                  <div className="text-[#6B7280] mb-1">المبلغ</div>
                  <div className="text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                    {formatSAR(inv.amount)}
                  </div>
                </div>
                <div>
                  <div className="text-[#6B7280] mb-1">الدفعة القادمة</div>
                  <div className="text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                    {inv.nextPayment}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
