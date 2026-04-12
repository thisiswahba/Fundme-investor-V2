import { useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { OpportunityCardCompact } from '../opportunities/OpportunityCardCompact';

const opportunities = [
  {
    id: 1,
    borrowerName: 'شركة البركة التجارية',
    opportunityId: 'FM-0001-309',
    financingType: 'تمويل الفواتير',
    roi: 11.5,
    risk: 'B' as const,
    tenor: '20 شهر',
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
    tenor: '20 شهر',
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
    tenor: '24 شهر',
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
    tenor: '20 شهر',
    fundingProgress: 29,
    totalAmount: 450000,
    fundedAmount: 130500,
    categoryIcon: 'expansion' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #075985 100%)',
  },
];

export function OpportunitiesPreview() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.42;
    // In RTL, scrollLeft is negative (or inverted). Use scrollBy with appropriate direction.
    const amount = direction === 'right' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[20px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          فرص استثمارية جديدة
        </h3>
        <div className="flex items-center gap-3">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F1F4F9] transition-colors"
              style={{ border: '1px solid #E5E7EB' }}
            >
              <ChevronRight className="w-4 h-4 text-[#6B7280]" strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F1F4F9] transition-colors"
              style={{ border: '1px solid #E5E7EB' }}
            >
              <ChevronLeft className="w-4 h-4 text-[#6B7280]" strokeWidth={2} />
            </button>
          </div>
          <button
            onClick={() => navigate('/opportunities')}
            className="flex items-center gap-1 text-[13px] text-[#2563EB] hover:gap-2 transition-all"
            style={{ fontWeight: 500 }}
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="flex-shrink-0"
            style={{ width: 'calc((100% - 32px) / 2.5)', scrollSnapAlign: 'start' }}
          >
            <OpportunityCardCompact
              {...opp}
              onClick={() => navigate(`/opportunities/${opp.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
