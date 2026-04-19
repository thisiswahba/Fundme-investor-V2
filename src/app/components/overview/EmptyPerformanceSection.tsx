import { InvestmentGrowthIllustration } from '../illustrations';
import { useI18n } from '../../i18n';

export function EmptyPerformanceSection() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div
      className="bg-white rounded-2xl pt-8 px-8"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Title */}
      <h3 className="text-[18px] text-[#0B1A3A] mb-6" style={{ fontWeight: 700 }}>
        {isAr ? 'أداء المحفظة' : 'Portfolio Performance'}
      </h3>

      {/* Empty State */}
      <div className="flex flex-col items-center pb-8" style={{ minHeight: '388px', justifyContent: 'center' }}>
        <div className="mb-8">
          <InvestmentGrowthIllustration size={180} />
        </div>
        <h4 className="text-[18px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 700 }}>
          {isAr ? 'ابدأ الاستثمار لتتبع الأداء' : 'Start investing to track performance'}
        </h4>
        <p className="text-[14px] text-[#6B7280] text-center">
          {isAr
            ? 'سيظهر هنا رسم بياني لأداء محفظتك بمجرد البدء في الاستثمار'
            : 'A chart of your portfolio performance will appear here once you start investing'}
        </p>
      </div>
    </div>
  );
}
