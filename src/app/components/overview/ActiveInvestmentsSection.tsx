import { formatSAR, formatPercentage } from '../../utils/currency';
import { StatusBadge } from '../ui/StatusBadge';
import { ArrowLeft } from 'lucide-react';

const investments = [
  {
    name: 'تمويل مشروع عقاري - الرياض',
    amount: 150000,
    returnRate: 9.5,
    status: 'active' as const,
  },
  {
    name: 'صندوق التجزئة الإلكترونية',
    amount: 100000,
    returnRate: 12.2,
    status: 'active' as const,
  },
  {
    name: 'تمويل شركة لوجستية',
    amount: 85000,
    returnRate: 8.7,
    status: 'late' as const,
  },
  {
    name: 'مشروع صناعي - جدة',
    amount: 105000,
    returnRate: 10.4,
    status: 'active' as const,
  },
];

export function ActiveInvestmentsSection() {
  return (
    <div 
      className="bg-white rounded-2xl p-6"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          الاستثمارات النشطة
        </h3>
        <button className="flex items-center gap-1 text-[13px] text-[#2563EB] hover:gap-2 transition-all" style={{ fontWeight: 500 }}>
          <span>عرض الكل</span>
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Investments List */}
      <div className="space-y-3">
        {investments.map((investment, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 p-4 rounded-xl bg-[#F9FAFB] hover:bg-[#F1F4F9] transition-all cursor-pointer"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="text-[14px] text-[#0B1A3A] truncate" style={{ fontWeight: 600 }}>
                  {investment.name}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-[12px] text-[#6B7280]">
                  {formatSAR(investment.amount)}
                </div>
                <div className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                <StatusBadge status={investment.status} />
              </div>
            </div>

            {/* Return */}
            <div className="flex-shrink-0 text-left">
              <div 
                className={`text-[15px] ${
                  investment.status === 'late' ? 'text-[#DC2626]' : 'text-[#10B981]'
                }`}
                style={{ fontWeight: 700 }}
              >
                {formatPercentage(investment.returnRate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
