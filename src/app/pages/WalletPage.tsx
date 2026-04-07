import { formatSAR } from '../utils/currency';
import { Wallet, Plus, ArrowDownToLine, Building, CreditCard, Download } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';

const walletBalance = 45000;
const investmentLimit = 500000;
const investmentUsed = 440000;
const limitProgress = (investmentUsed / investmentLimit) * 100;

const transactions = [
  {
    type: 'deposit',
    title: 'إيداع من حساب بنكي',
    details: 'البنك الأهلي •••• ١٢٣٤',
    amount: 100000,
    date: '٦ أبريل ٢٠٢٦، ٣:٤٥م',
    status: 'completed' as const,
  },
  {
    type: 'investment',
    title: 'استثمار في مشروع عقاري',
    details: 'تمويل مشروع سكني - الدمام',
    amount: -50000,
    date: '٦ أبريل ٢٠٢٦، ١٠:٣٠ص',
    status: 'completed' as const,
  },
  {
    type: 'return',
    title: 'عائد استثماري',
    details: 'صندوق التجزئة الإلكترونية',
    amount: 8500,
    date: '٥ أبريل ٢٠٢٦، ٩:١٥ص',
    status: 'completed' as const,
  },
  {
    type: 'withdrawal',
    title: 'سحب إلى حساب بنكي',
    details: 'بنك الراجحي •••• ٥٦٧٨',
    amount: -25000,
    date: '٣ أبريل ٢٠٢٦، ٢:٢٠م',
    status: 'processing' as const,
  },
  {
    type: 'return',
    title: 'عائد استثماري',
    details: 'مشروع صناعي - جدة',
    amount: 6800,
    date: '٢ أبريل ٢٠٢٦، ١١:٠٠ص',
    status: 'completed' as const,
  },
];

export function WalletPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
          المحفظة المالية
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          إدارة أموالك وعرض جميع العمليات المالية
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <h3 className="text-[16px] text-[#0B1A3A] mb-5" style={{ fontWeight: 600 }}>
            حد الاستثمار
          </h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
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
                  background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
                }}
              />
            </div>
            <div className="text-[12px] text-[#6B7280] mt-2">
              متبقي {formatSAR(investmentLimit - investmentUsed)} من {formatSAR(investmentLimit)}
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] leading-relaxed">
            الحد الأقصى للاستثمار وفقاً لتصنيفك كمستثمر
          </div>
        </div>
      </div>

      {/* Top-up Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
              <Building className="w-6 h-6 text-[#2563EB]" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] text-[#0B1A3A] mb-1.5" style={{ fontWeight: 600 }}>
                تحويل بنكي
              </h3>
              <p className="text-[13px] text-[#6B7280] mb-4">
                حول من حسابك البنكي باستخدام رقم IBAN
              </p>
              <button 
                className="text-[13px] text-[#2563EB] hover:underline" 
                style={{ fontWeight: 600 }}
              >
                عرض تفاصيل الحساب
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#8B5CF6]" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] text-[#0B1A3A] mb-1.5" style={{ fontWeight: 600 }}>
                الدفع ببطاقة
              </h3>
              <p className="text-[13px] text-[#6B7280] mb-4">
                أضف أموال فوراً باستخدام بطاقة الائتمان
              </p>
              <button 
                className="text-[13px] text-[#8B5CF6] hover:underline" 
                style={{ fontWeight: 600 }}
              >
                إضافة بطاقة جديدة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
        <div className="p-6 border-b border-[#F1F4F9] flex items-center justify-between">
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
              className="p-5 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
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
