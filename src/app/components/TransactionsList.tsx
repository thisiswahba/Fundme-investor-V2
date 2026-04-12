import { ArrowDownToLine, ArrowLeftRight } from 'lucide-react';
import { formatSAR } from '../utils/currency';

const transactions = [
  {
    type: 'deposit',
    icon: ArrowDownToLine,
    bgColor: 'rgba(128,255,0,0.12)',
    iconColor: '#80FF00',
    name: 'إيداع',
    date: '2 أبريل 2026',
    amount: 10000,
    isPositive: true,
    amountColor: '#002E83',
  },
  {
    type: 'investment',
    icon: ArrowLeftRight,
    bgColor: 'rgba(13,130,249,0.1)',
    iconColor: '#0D82F9',
    name: 'استثمار — صندوق العقارات',
    date: '28 مارس 2026',
    amount: -50000,
    isPositive: false,
    amountColor: '#DC3232',
  },
  {
    type: 'profit',
    icon: ArrowDownToLine,
    bgColor: 'rgba(128,255,0,0.12)',
    iconColor: '#80FF00',
    name: 'أرباح ربع سنوية',
    date: '25 مارس 2026',
    amount: 3200,
    isPositive: true,
    amountColor: '#002E83',
  },
];

export function TransactionsList() {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#E8ECF2]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[18px] text-[#002E83]" style={{ fontWeight: 600 }}>
          آخر المعاملات
        </div>
        <button className="text-[13px] text-[#0D82F9] hover:underline" style={{ fontWeight: 500 }}>
          عرض الكل
        </button>
      </div>

      {/* Transactions List */}
      <div>
        {transactions.map((transaction, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 py-3 hover:bg-[#F5F7FA] -mx-2 px-2 rounded-lg transition-colors cursor-pointer">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: transaction.bgColor }}
              >
                <transaction.icon
                  className="w-5 h-5"
                  style={{ color: transaction.iconColor }}
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[#002E83] mb-0.5" style={{ fontWeight: 500 }}>
                  {transaction.name}
                </div>
                <div className="text-[11px] text-[#8896AD]">
                  {transaction.date}
                </div>
              </div>

              {/* Amount */}
              <div
                className="flex-shrink-0 text-[14px]"
                style={{ fontWeight: 600, color: transaction.amountColor }}
              >
                {transaction.isPositive ? '+' : '−'}{formatSAR(Math.abs(transaction.amount))}
              </div>
            </div>
            {index < transactions.length - 1 && (
              <div className="h-px bg-[#E8ECF2] my-1"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}