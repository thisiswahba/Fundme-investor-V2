import { formatSAR } from '../../utils/currency';
import { Calendar, CheckCircle, ArrowLeft } from 'lucide-react';

const repayments = [
  {
    title: 'تمويل مشروع عقاري',
    amount: 8500,
    date: 'خلال 3 أيام',
    type: 'upcoming',
  },
  {
    title: 'صندوق التجزئة',
    amount: 12300,
    date: 'خلال 7 أيام',
    type: 'upcoming',
  },
  {
    title: 'مشروع صناعي',
    amount: 6800,
    date: 'تم استلامه أمس',
    type: 'received',
  },
];

export function RepaymentsSection() {
  return (
    <div 
      className="bg-white rounded-2xl p-6"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          الدفعات المستحقة
        </h3>
        <button className="flex items-center gap-1 text-[13px] text-[#2563EB] hover:gap-2 transition-all" style={{ fontWeight: 500 }}>
          <span>عرض الكل</span>
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Repayments List */}
      <div className="space-y-3">
        {repayments.map((repayment, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#F9FAFB] hover:bg-[#F1F4F9] transition-all cursor-pointer"
          >
            {/* Icon */}
            <div 
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                repayment.type === 'received' 
                  ? 'bg-[#ECFDF5]' 
                  : 'bg-[#EFF6FF]'
              }`}
            >
              {repayment.type === 'received' ? (
                <CheckCircle className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
              ) : (
                <Calendar className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-[#0B1A3A] mb-1 truncate" style={{ fontWeight: 600 }}>
                {repayment.title}
              </div>
              <div className="text-[12px] text-[#6B7280]">
                {repayment.date}
              </div>
            </div>

            {/* Amount */}
            <div className="flex-shrink-0 text-left">
              <div 
                className={`text-[15px] ${
                  repayment.type === 'received' ? 'text-[#10B981]' : 'text-[#0B1A3A]'
                }`}
                style={{ fontWeight: 700 }}
              >
                {formatSAR(repayment.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
