import { InvestmentGrowthIllustration } from '../illustrations';

export function EmptyPerformanceSection() {
  return (
    <div
      className="bg-white rounded-2xl pt-8 px-8"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Title — right-aligned */}
      <h3 className="text-[18px] text-[#0B1A3A] mb-6" style={{ fontWeight: 700 }}>
        أداء المحفظة
      </h3>

      {/* Empty State — centered */}
      <div className="flex flex-col items-center pb-8" style={{ minHeight: '388px', justifyContent: 'center' }}>
        <div className="mb-8">
          <InvestmentGrowthIllustration size={180} />
        </div>
        <h4 className="text-[18px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 700 }}>
          ابدأ الاستثمار لتتبع الأداء
        </h4>
        <p className="text-[14px] text-[#6B7280] text-center">
          سيظهر هنا رسم بياني لأداء محفظتك بمجرد البدء في الاستثمار
        </p>
      </div>
    </div>
  );
}
