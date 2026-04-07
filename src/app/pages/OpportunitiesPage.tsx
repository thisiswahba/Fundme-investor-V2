import { useState } from 'react';
import { ArrowRight, ArrowLeft, SlidersHorizontal, ChevronDown, Star, Flame, Clock, TrendingUp } from 'lucide-react';
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
    urgency: 'تبقى 32% فقط' as string | undefined,
    recommended: false,
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
    urgency: 'طلب عالي' as string | undefined,
    recommended: true,
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
    urgency: 'تبقى 15% فقط' as string | undefined,
    recommended: true,
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
    urgency: undefined,
    recommended: true,
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
    urgency: 'سينتهي قريبًا' as string | undefined,
    recommended: false,
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
    urgency: undefined,
    recommended: false,
  },
];

type SortKey = 'default' | 'roi' | 'risk' | 'progress';

const sortLabels: Record<SortKey, string> = {
  default: 'الترتيب الافتراضي',
  roi: 'الأعلى عائدًا',
  risk: 'الأقل مخاطرة',
  progress: 'الأقرب اكتمالًا',
};

const riskOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 };

export function OpportunitiesPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const recommended = opportunities.filter(o => o.recommended);

  let filtered = selectedRisk === 'all'
    ? opportunities
    : opportunities.filter(o => o.risk === selectedRisk);

  if (sortBy === 'roi') filtered = [...filtered].sort((a, b) => b.roi - a.roi);
  if (sortBy === 'risk') filtered = [...filtered].sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);
  if (sortBy === 'progress') filtered = [...filtered].sort((a, b) => b.fundingProgress - a.fundingProgress);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const avgRoi = (opportunities.reduce((s, o) => s + o.roi, 0) / opportunities.length).toFixed(1);

  const handleRiskFilter = (risk: string) => { setSelectedRisk(risk); setCurrentPage(1); };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[28px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
          الفرص الاستثمارية
        </h1>
        <p className="text-[14px] text-[#6B7280] mb-3">
          اختر من بين فرص مدروسة بعناية مع عوائد تنافسية ومخاطر محسوبة
        </p>
        {/* Summary stats */}
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#0D82F9]" style={{ fontWeight: 600 }}>
            {opportunities.length} فرصة متاحة
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#6B7280]">
            متوسط العائد <span className="text-[#10B981]" style={{ fontWeight: 700 }}>{avgRoi}%</span>
          </span>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-[#F59E0B]" fill="#F59E0B" strokeWidth={0} />
          <h2 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            موصى به لك
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommended.map((opp) => (
            <OpportunityCard
              key={opp.id}
              {...opp}
              badge="موصى به لك"
              urgency={opp.urgency}
            />
          ))}
        </div>
      </div>

      {/* Filters + Sorting */}
      <div className="bg-white rounded-2xl p-5 mb-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 ml-2">
              <SlidersHorizontal className="w-4 h-4 text-[#6B7280]" strokeWidth={2} />
              <span className="text-[13px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                تصفية حسب
              </span>
            </div>
            {['all', 'A', 'B', 'C', 'D'].map((risk) => (
              <button
                key={risk}
                onClick={() => handleRiskFilter(risk)}
                className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                  selectedRisk === risk
                    ? 'bg-[#002E83] text-white shadow-md'
                    : 'bg-[#F1F4F9] text-[#6B7280] hover:bg-[#E5E9F0]'
                }`}
                style={{ fontWeight: selectedRisk === risk ? 700 : 500 }}
              >
                {risk === 'all' ? 'جميع الفرص' : `تصنيف ${risk}`}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F1F4F9] text-[13px] text-[#0B1A3A] hover:bg-[#E5E9F0] transition-all"
              style={{ fontWeight: 500 }}
            >
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div
                className="absolute top-full left-0 mt-2 bg-white rounded-xl py-2 z-20 min-w-[180px]"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              >
                {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSortBy(key); setSortOpen(false); }}
                    className={`w-full text-right px-4 py-2.5 text-[13px] hover:bg-[#F1F4F9] transition-colors ${
                      sortBy === key ? 'text-[#002E83]' : 'text-[#0B1A3A]'
                    }`}
                    style={{ fontWeight: sortBy === key ? 700 : 400 }}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All Opportunities Title */}
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-5 h-5 text-[#002E83]" strokeWidth={2} />
        <h2 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
          جميع الفرص
        </h2>
        <span className="text-[13px] text-[#9CA3AF] mr-1">({filtered.length})</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {current.map((opp) => (
          <OpportunityCard
            key={opp.id}
            {...opp}
            urgency={opp.urgency}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentPage > 1 ? 'bg-white hover:bg-[#F1F4F9] text-[#0B1A3A]' : 'bg-[#F1F4F9] text-[#CBD5E1] cursor-not-allowed'
            }`}
            style={{ boxShadow: currentPage > 1 ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none' }}
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
            <span className="text-[16px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>{currentPage}</span>
            <span className="text-[16px] text-[#94A3B8]">/</span>
            <span className="text-[16px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{totalPages}</span>
          </div>
          <button
            onClick={() => { if (currentPage < totalPages) { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              currentPage < totalPages ? 'bg-white hover:bg-[#F1F4F9] text-[#0B1A3A]' : 'bg-[#F1F4F9] text-[#CBD5E1] cursor-not-allowed'
            }`}
            style={{ boxShadow: currentPage < totalPages ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none' }}
          >
            <ArrowRight className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
