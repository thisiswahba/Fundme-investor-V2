import { Link } from 'react-router';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { OpportunityIllustration } from '../illustrations';

export function EmptyActiveInvestments() {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          الاستثمارات النشطة
        </h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12">
        {/* Illustration */}
        <div className="mb-6">
          <OpportunityIllustration size={160} />
        </div>

        {/* Message */}
        <h4 className="text-[18px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 600 }}>
          لا توجد استثمارات بعد
        </h4>
        <p className="text-[14px] text-[#6B7280] mb-6 text-center" style={{ maxWidth: '320px' }}>
          ابدأ باستكشاف الفرص الاستثمارية المتاحة وقم بأول استثمار لك
        </p>

        {/* CTA */}
        <Link
          to="/opportunities"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105"
          style={{
            background: '#002E83',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 46, 131, 0.2)',
          }}
        >
          <span>استكشف الفرص</span>
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
