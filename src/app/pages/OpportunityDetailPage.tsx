import { useParams, useNavigate } from 'react-router';
import { ArrowRight, Building2, TrendingUp, Clock, Shield, CheckCircle } from 'lucide-react';
import { formatSAR, formatPercentage } from '../utils/currency';
import { RiskBadge } from '../components/ui/RiskBadge';
import { ProgressBar } from '../components/ui/ProgressBar';

export function OpportunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - would fetch based on id
  const opportunity = {
    id: id,
    title: 'تمويل مشروع سكني - الدمام',
    description: 'مشروع لبناء مجمع سكني فاخر في حي النخيل بمدينة الدمام، يتضمن ٤٥ وحدة سكنية بمواصفات عالية الجودة.',
    roi: 11.5,
    risk: 'B' as const,
    duration: '١٨ شهر',
    fundingProgress: 68,
    targetAmount: 500000,
    raisedAmount: 340000,
    minInvestment: 5000,
    investors: 42,
    borrowerName: 'شركة النخيل العقارية',
    borrowerDescription: 'شركة عقارية رائدة مع سجل حافل في تطوير المشاريع السكنية',
    repaymentSchedule: [
      { month: 'الشهر ٦', amount: 15000 },
      { month: 'الشهر ١٢', amount: 20000 },
      { month: 'الشهر ١٨', amount: 25000 },
    ],
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/opportunities')}
        className="flex items-center gap-2 text-[14px] text-[#6B7280] hover:text-[#0B1A3A] mb-6 transition-colors"
        style={{ fontWeight: 500 }}
      >
        <ArrowRight className="w-5 h-5" strokeWidth={2} />
        <span>العودة إلى الفرص</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#2563EB]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h1 className="text-[24px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
                  {opportunity.title}
                </h1>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#ECFDF5] px-4 py-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-[#10B981]" strokeWidth={2} />
                <span className="text-[14px] text-[#10B981]" style={{ fontWeight: 600 }}>
                  عائد {formatPercentage(opportunity.roi)} سنوياً
                </span>
              </div>
              <RiskBadge grade={opportunity.risk} size="md" />
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Clock className="w-4 h-4" strokeWidth={2} />
                <span className="text-[13px]" style={{ fontWeight: 500 }}>
                  {opportunity.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Borrower Info */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-[18px] text-[#0B1A3A] mb-4" style={{ fontWeight: 600 }}>
              معلومات الجهة المقترضة
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] text-[#6B7280] mb-1">اسم الشركة</div>
                <div className="text-[15px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                  {opportunity.borrowerName}
                </div>
              </div>
              <div>
                <div className="text-[13px] text-[#6B7280] mb-1">نبذة</div>
                <div className="text-[14px] text-[#0B1A3A]">
                  {opportunity.borrowerDescription}
                </div>
              </div>
            </div>
          </div>

          {/* Repayment Schedule */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-[18px] text-[#0B1A3A] mb-4" style={{ fontWeight: 600 }}>
              جدول السداد المتوقع
            </h3>
            <div className="space-y-3">
              {opportunity.repaymentSchedule.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                      {payment.month}
                    </span>
                  </div>
                  <span className="text-[15px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
                    {formatSAR(payment.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Card */}
          <div 
            className="bg-white rounded-2xl p-6 sticky top-24"
            style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
          >
            <h3 className="text-[18px] text-[#0B1A3A] mb-5" style={{ fontWeight: 600 }}>
              تفاصيل الاستثمار
            </h3>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[14px] text-[#6B7280]">تم جمع</span>
                <span className="text-[16px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
                  {formatSAR(opportunity.raisedAmount)}
                </span>
              </div>
              <ProgressBar progress={opportunity.fundingProgress} showLabel />
              <div className="text-[13px] text-[#6B7280] mt-2">
                من أصل {formatSAR(opportunity.targetAmount)}
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-6 pb-6 border-b border-[#F1F4F9]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#6B7280]">الحد الأدنى</span>
                <span className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                  {formatSAR(opportunity.minInvestment)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#6B7280]">عدد المستثمرين</span>
                <span className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
                  {opportunity.investors} مستثمر
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="w-full py-4 px-6 rounded-xl text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                fontWeight: 600,
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
              }}
            >
              استثمر الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
