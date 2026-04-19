import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { OpportunityIllustration } from '../illustrations';
import { useI18n } from '../../i18n';

export function EmptyActiveInvestments() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return (
    <div
      className="bg-white rounded-2xl pt-8 px-8"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Title */}
      <h3 className="text-[18px] text-[#0B1A3A] mb-6" style={{ fontWeight: 700 }}>
        {isAr ? 'الاستثمارات النشطة' : 'Active Investments'}
      </h3>

      {/* Empty State */}
      <div className="flex flex-col items-center pb-8" style={{ minHeight: '426px', justifyContent: 'center' }}>
        <div className="mb-8">
          <OpportunityIllustration size={160} />
        </div>
        <h4 className="text-[18px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 700 }}>
          {isAr ? 'لا توجد استثمارات بعد' : 'No investments yet'}
        </h4>
        <p className="text-[14px] text-[#6B7280] mb-8 text-center" style={{ maxWidth: '320px' }}>
          {isAr
            ? 'ابدأ باستكشاف الفرص الاستثمارية المتاحة وقم بأول استثمار لك'
            : 'Browse available opportunities and make your first investment'}
        </p>
        <Link
          to="/app/opportunities"
          className="inline-flex items-center gap-2 px-5 h-[45px] rounded-[20px] transition-all hover:scale-105"
          style={{
            background: '#002E83',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 46, 131, 0.2)',
          }}
        >
          <Arrow className="w-4 h-4" strokeWidth={2.5} />
          <span>{isAr ? 'استكشف الفرص' : 'Explore Opportunities'}</span>
        </Link>
      </div>
    </div>
  );
}
