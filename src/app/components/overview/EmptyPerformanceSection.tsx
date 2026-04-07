import { InvestmentGrowthIllustration } from '../illustrations';

export function EmptyPerformanceSection() {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          أداء المحفظة
        </h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16" style={{ minHeight: '320px' }}>
        {/* Illustration */}
        <div className="mb-6">
          <InvestmentGrowthIllustration size={180} />
        </div>

        {/* Message */}
        <h4 className="text-[18px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 600 }}>
          ابدأ الاستثمار لتتبع الأداء
        </h4>
        <p className="text-[14px] text-[#6B7280] text-center" style={{ maxWidth: '380px' }}>
          سيظهر هنا رسم بياني لأداء محفظتك بمجرد البدء في الاستثمار
        </p>
      </div>
    </div>
  );
}
