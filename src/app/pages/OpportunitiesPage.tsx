import { useState } from 'react';
import { ArrowRight, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';

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
    tenor: '٠٢ شهر',
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
    tenor: '٠٥ شهر',
    fundingProgress: 29,
    totalAmount: 450000,
    fundedAmount: 130500,
    categoryIcon: 'expansion' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #075985 100%)',
  },
  {
    id: 5,
    borrowerName: 'مطاعم النخبة السريعة',
    opportunityId: 'FM-0005-887',
    financingType: 'تمويل التوسع',
    roi: 12.8,
    risk: 'B' as const,
    tenor: '٢٠ شهر',
    fundingProgress: 55,
    totalAmount: 600000,
    fundedAmount: 330000,
    categoryIcon: 'food' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0369a1 100%)',
  },
  {
    id: 6,
    borrowerName: 'شركة التقنية التعليمية',
    opportunityId: 'FM-0006-134',
    financingType: 'تمويل الابتكار',
    roi: 16.2,
    risk: 'D' as const,
    tenor: '٢٤ شهر',
    fundingProgress: 18,
    totalAmount: 400000,
    fundedAmount: 72000,
    categoryIcon: 'innovation' as const,
    gradientTone: 'linear-gradient(135deg, #001d5a 0%, #1e3a8a 100%)',
  },
];

export function OpportunitiesPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 rows × 3 columns

  const filteredOpportunities = selectedRisk === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.risk === selectedRisk);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOpportunities = filteredOpportunities.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleRiskFilter = (risk: string) => {
    setSelectedRisk(risk);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[28px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
          الفرص الاستثمارية
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          استكشف الفرص المتاحة واختر المشاريع التي تناسب أهدافك الاستثمارية
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 mb-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
        <div className="flex items-center gap-3 mb-4">
          <SlidersHorizontal className="w-5 h-5 text-[#6B7280]" strokeWidth={2} />
          <span className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
            تصفية حسب
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => handleRiskFilter('all')}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
              selectedRisk === 'all'
                ? 'bg-[#0B1A3A] text-white'
                : 'bg-[#F1F4F9] text-[#6B7280] hover:bg-[#E5E9F0]'
            }`}
            style={{ fontWeight: 500 }}
          >
            جميع الفرص
          </button>
          {(['A', 'B', 'C', 'D'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => handleRiskFilter(risk)}
              className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                selectedRisk === risk
                  ? 'bg-[#0B1A3A] text-white'
                  : 'bg-[#F1F4F9] text-[#6B7280] hover:bg-[#E5E9F0]'
              }`}
              style={{ fontWeight: 500 }}
            >
              تصنيف {risk}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {currentOpportunities.map((opp) => (
          <OpportunityCard
            key={opp.id}
            borrowerName={opp.borrowerName}
            opportunityId={opp.opportunityId}
            financingType={opp.financingType}
            roi={opp.roi}
            risk={opp.risk}
            tenor={opp.tenor}
            fundingProgress={opp.fundingProgress}
            totalAmount={opp.totalAmount}
            fundedAmount={opp.fundedAmount}
            categoryIcon={opp.categoryIcon}
            gradientTone={opp.gradientTone}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          {/* Previous Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentPage > 1
                ? 'bg-white hover:bg-[#F1F4F9] text-[#0B1A3A]'
                : 'bg-[#F1F4F9] text-[#CBD5E1] cursor-not-allowed'
            }`}
            style={{ boxShadow: currentPage > 1 ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none' }}
            aria-label="الصفحة السابقة"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2} />
          </button>

          {/* Page Indicator */}
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
            <span className="text-[16px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
              {currentPage}
            </span>
            <span className="text-[16px] text-[#94A3B8]" style={{ fontWeight: 400 }}>/</span>
            <span className="text-[16px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
              {totalPages}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentPage < totalPages
                ? 'bg-white hover:bg-[#F1F4F9] text-[#0B1A3A]'
                : 'bg-[#F1F4F9] text-[#CBD5E1] cursor-not-allowed'
            }`}
            style={{ boxShadow: currentPage < totalPages ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none' }}
            aria-label="الصفحة التالية"
          >
            <ArrowRight className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}