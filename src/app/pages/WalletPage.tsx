import { formatSAR } from '../utils/currency';
import { Wallet, Plus, ArrowDownToLine, Download, Crown } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

const walletBalance = 45000;
const investmentLimit = 500000;
const investmentUsed = 440000;
const limitProgress = (investmentUsed / investmentLimit) * 100;
const isNearLimit = limitProgress >= 80;

const transactions = [
  {
    type: 'deposit',
    title: 'إيداع من حساب بنكي',
    details: 'البنك الأهلي •••• 1234',
    amount: 100000,
    date: '6 أبريل 2026، 3:45م',
    status: 'completed' as const,
  },
  {
    type: 'investment',
    title: 'استثمار في مشروع عقاري',
    details: 'تمويل مشروع سكني - الدمام',
    amount: -50000,
    date: '6 أبريل 2026، 10:30ص',
    status: 'completed' as const,
  },
  {
    type: 'return',
    title: 'عائد استثماري',
    details: 'صندوق التجزئة الإلكترونية',
    amount: 8500,
    date: '5 أبريل 2026، 9:15ص',
    status: 'completed' as const,
  },
  {
    type: 'withdrawal',
    title: 'سحب إلى حساب بنكي',
    details: 'بنك الراجحي •••• 5678',
    amount: -25000,
    date: '3 أبريل 2026، 2:20م',
    status: 'processing' as const,
  },
  {
    type: 'return',
    title: 'عائد استثماري',
    details: 'مشروع صناعي - جدة',
    amount: 6800,
    date: '2 أبريل 2026، 11:00ص',
    status: 'completed' as const,
  },
];

export function WalletPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[28px] text-[#0B1A3A] mb-1" style={{ fontWeight: 700 }}>
          المحفظة المالية
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          إدارة أموالك وعرض جميع العمليات المالية
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Wallet Balance Card */}
        <div
          className="lg:col-span-2 relative rounded-2xl p-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0B1A3A 0%, #1E3A5F 100%)',
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
          />

          <div className="relative">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-[13px] mb-3" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  الرصيد المتاح
                </div>
                <div className="text-[42px] leading-none text-white mb-2" style={{ fontWeight: 700 }}>
                  {formatSAR(walletBalance)}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 transition-all"
                style={{ fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                <span className="text-[13px] text-[#0B1A3A]">إضافة أموال</span>
              </button>
              <button
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: 600,
                }}
              >
                <ArrowDownToLine className="w-4 h-4 text-white" strokeWidth={2} />
                <span className="text-[13px] text-white">سحب</span>
              </button>
            </div>
          </div>
        </div>

        {/* Investment Limit Card */}
        <div className="bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <h3 className="text-[16px] text-[#0B1A3A] mb-4" style={{ fontWeight: 600 }}>
            حد الاستثمار
          </h3>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] text-[#6B7280]">المستخدم</span>
              <span className="text-[15px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
                {formatSAR(investmentUsed)}
              </span>
            </div>
            <div className="w-full bg-[#F1F4F9] rounded-full h-2.5">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${limitProgress}%`,
                  background: isNearLimit
                    ? 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)'
                    : 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
                }}
              />
            </div>
            <div className="text-[12px] text-[#6B7280] mt-2">
              متبقي {formatSAR(investmentLimit - investmentUsed)} من {formatSAR(investmentLimit)}
            </div>
          </div>

          {isNearLimit ? (
            <div
              className="mt-auto rounded-xl p-3.5"
              style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-[#D97706]" strokeWidth={2} />
                <span className="text-[12px] text-[#92400E]" style={{ fontWeight: 600 }}>
                  اقتربت من الحد الأقصى
                </span>
              </div>
              <p className="text-[11px] text-[#92400E]/70 mb-3 leading-relaxed">
                ارفع حد الاستثمار واحصل على فرص حصرية
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                  color: '#002E83',
                  fontWeight: 700,
                  fontSize: '13px',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                }}
              >
                <Crown className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>ترقية إلى VIP</span>
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-[#6B7280] leading-relaxed mt-auto">
              الحد الأقصى للاستثمار وفقاً لتصنيفك كمستثمر
            </div>
          )}
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <h2 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
            سجل العمليات
          </h2>
          <button className="flex items-center gap-2 text-[13px] text-[#2563EB] hover:underline" style={{ fontWeight: 500 }}>
            <Download className="w-4 h-4" strokeWidth={2} />
            <span>تصدير</span>
          </button>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-[#F1F4F9]">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="px-6 py-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                    transaction.amount > 0
                      ? 'bg-[#ECFDF5]'
                      : transaction.type === 'withdrawal'
                      ? 'bg-[#FEF2F2]'
                      : 'bg-[#F1F4F9]'
                  }`}
                >
                  {transaction.type === 'deposit' && (
                    <Plus className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
                  )}
                  {transaction.type === 'withdrawal' && (
                    <ArrowDownToLine className="w-5 h-5 text-[#EF4444]" strokeWidth={2} />
                  )}
                  {transaction.type === 'investment' && (
                    <Wallet className="w-5 h-5 text-[#6B7280]" strokeWidth={2} />
                  )}
                  {transaction.type === 'return' && (
                    <Wallet className="w-5 h-5 text-[#10B981]" strokeWidth={2} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="text-[14px] text-[#0B1A3A] mb-1" style={{ fontWeight: 600 }}>
                        {transaction.title}
                      </div>
                      <div className="text-[12px] text-[#6B7280] mb-2">
                        {transaction.details}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        {transaction.date}
                      </div>
                    </div>
                    <div className="text-left flex flex-col items-end gap-2">
                      <div
                        className={`text-[16px] ${
                          transaction.amount > 0 ? 'text-[#10B981]' : 'text-[#0B1A3A]'
                        }`}
                        style={{ fontWeight: 700 }}
                      >
                        {transaction.amount > 0 ? '+' : ''}{formatSAR(Math.abs(transaction.amount))}
                      </div>
                      <StatusBadge status={transaction.status} size="sm" />
                    </div>
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
