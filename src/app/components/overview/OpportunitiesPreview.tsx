import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { OpportunityCard } from '../opportunities/OpportunityCard';

const opportunities = [
  {
    id: 1,
    borrowerName: 'شركة البركة التجارية',
    opportunityId: 'FM-0001-309',
    financingType: 'تمويل الفواتير',
    roi: 11.5,
    risk: 'B' as const,
    tenor: '٢٠ شهر',
    fundingProgress: 68,
    totalAmount: 500000,
    fundedAmount: 340000,
    categoryIcon: 'invoice' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0D82F9 100%)',
  },
  {
    id: 2,
    borrowerName: 'مؤسسة الأفق للتجزئة',
    opportunityId: 'FM-0002-412',
    financingType: 'تمويل رأس المال',
    roi: 13.2,
    risk: 'C' as const,
    tenor: '٢٠ شهر',
    fundingProgress: 42,
    totalAmount: 350000,
    fundedAmount: 147000,
    categoryIcon: 'capital' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #1e40af 100%)',
  },
  {
    id: 3,
    borrowerName: 'الشركة الصناعية المتقدمة',
    opportunityId: 'FM-0003-578',
    financingType: 'تمويل المعدات',
    roi: 9.8,
    risk: 'A' as const,
    tenor: '٢٤ شهر',
    fundingProgress: 85,
    totalAmount: 750000,
    fundedAmount: 637500,
    categoryIcon: 'equipment' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0c4a6e 100%)',
  },
  {
    id: 4,
    borrowerName: 'شركة النقل السريع',
    opportunityId: 'FM-0004-221',
    financingType: 'تمويل التوسع',
    roi: 14.5,
    risk: 'C' as const,
    tenor: '٢٠ شهر',
    fundingProgress: 29,
    totalAmount: 450000,
    fundedAmount: 130500,
    categoryIcon: 'expansion' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #075985 100%)',
  },
];

export function OpportunitiesPreview() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[20px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          فرص استثمارية جديدة
        </h3>
        <button 
          onClick={() => navigate('/opportunities')}
          className="flex items-center gap-1 text-[13px] text-[#2563EB] hover:gap-2 transition-all" 
          style={{ fontWeight: 500 }}
        >
          <span>عرض الكل</span>
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <OpportunityCard
            key={opp.id}
            {...opp}
            onClick={() => navigate(`/opportunities/${opp.id}`)}
          />
        ))}
      </div>
    </div>
  );
}