import { formatSAR } from '../../utils/currency';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet } from 'lucide-react';

const transactions = [
  {
    type: 'investment',
    title: 'استثمار في مشروع عقاري',
    amount: -50000,
    date: 'اليوم، ١٠:٣٠ص',
    icon: TrendingUp,
  },
  {
    type: 'deposit',
    title: 'إيداع من حساب بنكي',
    amount: 100000,
    date: 'أمس، ٣:٤٥م',
    icon: ArrowDownLeft,
  },
  {
    type: 'return',
    title: 'عائد من صندوق التجزئة',
    amount: 8500,
    date: '٣ أبريل ٢٠٢٦',
    icon: Wallet,
  },
  {
    type: 'investment',
    title: 'استثمار في شركة لوجستية',
    amount: -35000,
    date: '١ أبريل ٢٠٢٦',
    icon: TrendingUp,
  },
  {
    type: 'return',
    title: 'عائد من مشروع صناعي',
    amount: 6800,
    date: '٢٨ مارس ٢٠٢٦',
    icon: Wallet,
  },
];

export function TransactionsSection() {
  return (
    <div 
      className="bg-white rounded-2xl p-6"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          آخر العمليات
        </h3>
        <button className="text-[13px] text-[#2563EB] hover:underline" style={{ fontWeight: 500 }}>
          عرض الكل
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F9FAFB] transition-all cursor-pointer"
          >
            {/* Icon */}
            <div 
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                transaction.amount > 0 
                  ? 'bg-[#ECFDF5]' 
                  : 'bg-[#F1F4F9]'
              }`}
            >
              <transaction.icon 
                className={`w-5 h-5 ${
                  transaction.amount > 0 ? 'text-[#10B981]' : 'text-[#0B1A3A]'
                }`} 
                strokeWidth={2} 
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-[#0B1A3A] mb-0.5 truncate" style={{ fontWeight: 600 }}>
                {transaction.title}
              </div>
              <div className="text-[11px] text-[#6B7280]">
                {transaction.date}
              </div>
            </div>

            {/* Amount */}
            <div className="flex-shrink-0 text-left">
              <div 
                className={`text-[14px] ${
                  transaction.amount > 0 ? 'text-[#10B981]' : 'text-[#0B1A3A]'
                }`}
                style={{ fontWeight: 700 }}
              >
                {transaction.amount > 0 ? '+' : ''}{formatSAR(Math.abs(transaction.amount))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
