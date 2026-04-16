import { useState } from 'react';
import { ArrowRight, ArrowLeft, SlidersHorizontal, ChevronDown, TrendingUp, Lightbulb, Zap, Crown, ArrowLeft as ArrowL, Shield } from 'lucide-react';
import { OpportunityCardCompact } from '../components/opportunities/OpportunityCardCompact';
import { Link, useNavigate } from 'react-router';

const opportunities = [
  {
    id: 1, borrowerName: 'شركة البركة التجارية', opportunityId: 'FM-0001-309',
    financingType: 'تمويل الفواتير', roi: 11.5, risk: 'B' as const, tenor: '20 شهر',
    fundingProgress: 68, totalAmount: 500000, fundedAmount: 340000,
    categoryIcon: 'invoice' as const, gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0D82F9 100%)',
    urgency: 'تبقى 32% فقط' as string | undefined, recommended: false,
  },
  {
    id: 2, borrowerName: 'مؤسسة الأفق للتجزئة', opportunityId: 'FM-0002-412',
    financingType: 'تمويل رأس المال', roi: 13.2, risk: 'C' as const, tenor: '20 شهر',
    fundingProgress: 42, totalAmount: 350000, fundedAmount: 147000,
    categoryIcon: 'capital' as const, gradientTone: 'linear-gradient(135deg, #001d5a 0%, #1e40af 100%)',
    urgency: 'طلب عالي' as string | undefined, recommended: true,
  },
  {
    id: 3, borrowerName: 'الشركة الصناعية المتقدمة', opportunityId: 'FM-0003-578',
    financingType: 'تمويل المعدات', roi: 9.8, risk: 'A' as const, tenor: '24 شهر',
    fundingProgress: 85, totalAmount: 750000, fundedAmount: 637500,
    categoryIcon: 'equipment' as const, gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0c4a6e 100%)',
    urgency: 'تبقى 15% فقط' as string | undefined, recommended: true,
  },
  {
    id: 4, borrowerName: 'شركة النقل السريع', opportunityId: 'FM-0004-221',
    financingType: 'تمويل التوسع', roi: 14.5, risk: 'C' as const, tenor: '20 شهر',
    fundingProgress: 29, totalAmount: 450000, fundedAmount: 130500,
    categoryIcon: 'expansion' as const, gradientTone: 'linear-gradient(135deg, #001d5a 0%, #075985 100%)',
    urgency: undefined, recommended: true,
  },
  {
    id: 5, borrowerName: 'مطاعم النخبة السريعة', opportunityId: 'FM-0005-887',
    financingType: 'تمويل التوسع', roi: 12.8, risk: 'B' as const, tenor: '20 شهر',
    fundingProgress: 55, totalAmount: 600000, fundedAmount: 330000,
    categoryIcon: 'food' as const, gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0369a1 100%)',
    urgency: 'سينتهي قريبًا' as string | undefined, recommended: false,
  },
  {
    id: 6, borrowerName: 'شركة التقنية التعليمية', opportunityId: 'FM-0006-134',
    financingType: 'تمويل الابتكار', roi: 16.2, risk: 'D' as const, tenor: '24 شهر',
    fundingProgress: 18, totalAmount: 400000, fundedAmount: 72000,
    categoryIcon: 'innovation' as const, gradientTone: 'linear-gradient(135deg, #001d5a 0%, #1e3a8a 100%)',
    urgency: undefined, recommended: false,
  },
];

type SortKey = 'default' | 'roi' | 'risk' | 'progress';
const sortLabels: Record<SortKey, string> = {
  default: 'الترتيب الافتراضي', roi: 'الأعلى عائدًا', risk: 'الأقل مخاطرة', progress: 'الأقرب اكتمالًا',
};
const riskOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 };

export function OpportunitiesPage() {
  const navigate = useNavigate();
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  let filtered = selectedRisk === 'all' ? opportunities : opportunities.filter(o => o.risk === selectedRisk);
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
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#0D82F9]" style={{ fontWeight: 600 }}>{opportunities.length} فرصة متاحة</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#6B7280]">متوسط العائد <span className="text-[#10B981]" style={{ fontWeight: 700 }}>{avgRoi}%</span></span>
        </div>
      </div>

      {/* ===== 1. HERO BANNER ===== */}
      <div
        className="relative overflow-hidden rounded-[20px] mb-8"
        style={{ background: 'linear-gradient(135deg, #001A4D 0%, #002E83 50%, #003A99 100%)' }}
      >
        {/* Background pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
          <circle cx="15%" cy="50%" r="180" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="15%" cy="50%" r="120" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="15%" cy="50%" r="60" stroke="white" strokeWidth="0.5" fill="none" />
          <line x1="0" y1="100%" x2="40%" y2="0" stroke="white" strokeWidth="0.3" />
          <line x1="5%" y1="100%" x2="45%" y2="0" stroke="white" strokeWidth="0.3" />
        </svg>
        {/* Glow */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]" style={{ background: 'radial-gradient(circle, rgba(13,130,249,0.6) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex items-center justify-between gap-8 px-8 lg:px-10 py-8">
          {/* Right: Text content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(128,255,0,0.15)' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#80FF00' }} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] text-white/50" style={{ fontWeight: 600 }}>فرص هذا الشهر</span>
            </div>
            <h2 className="text-[24px] lg:text-[28px] text-white leading-tight mb-2" style={{ fontWeight: 700 }}>
              استثمر بذكاء هذا الشهر
            </h2>
            <p className="text-[14px] text-white/60 mb-5 max-w-[400px]">
              متوسط العائد الحالي <span className="text-[#80FF00]" style={{ fontWeight: 700 }}>{avgRoi}%</span> — اختر من فرص مدروسة بعناية ومخاطر محسوبة
            </p>
            <Link
              to="/app/opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #80FF00 0%, #65CC00 100%)',
                color: '#002E83', fontWeight: 700, fontSize: '14px',
                boxShadow: '0 8px 24px rgba(128, 255, 0, 0.25)',
              }}
            >
              <span>ابدأ الاستثمار</span>
              <ArrowL className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Left: Abstract illustration */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-center w-[200px] h-[160px]">
            <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
              <circle cx="90" cy="70" r="60" stroke="white" strokeWidth="0.5" opacity="0.15" />
              <circle cx="90" cy="70" r="40" stroke="white" strokeWidth="0.5" opacity="0.1" />
              <path d="M 40 100 Q 65 80, 80 85 T 110 60 T 140 40" stroke="#80FF00" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
              <circle cx="40" cy="100" r="3" fill="#0D82F9" opacity="0.6" />
              <circle cx="80" cy="85" r="3.5" fill="#80FF00" opacity="0.6" />
              <circle cx="110" cy="60" r="4" fill="#0D82F9" opacity="0.7" />
              <circle cx="140" cy="40" r="5" fill="#80FF00" opacity="0.8" />
              <circle cx="140" cy="40" r="12" fill="#80FF00" opacity="0.1" />
            </svg>
          </div>
        </div>
      </div>

      {/* ===== 2. SMART INSIGHT BANNER ===== */}
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-2xl mb-8 bg-white"
        style={{ border: '1px solid rgba(13, 130, 249, 0.12)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(13, 130, 249, 0.1)' }}>
          <Lightbulb className="w-5 h-5 text-[#0D82F9]" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <p className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
            الفرص ذات التصنيف A تنفد بسرعة
          </p>
          <p className="text-[12px] text-[#6B7280] mt-0.5">
            لديك فرص بعائد أعلى من متوسط المحفظة — استكشفها قبل اكتمال التمويل
          </p>
        </div>
        <button
          onClick={() => handleRiskFilter('A')}
          className="flex-shrink-0 px-4 py-2 rounded-lg text-[12px] transition-all hover:shadow-md"
          style={{ background: '#002E83', color: 'white', fontWeight: 700 }}
        >
          عرض فرص A
        </button>
      </div>

      {/* ===== 3. FILTER SECTION ===== */}
      <div className="rounded-2xl p-5 mb-6 bg-[#F8FAFC]" style={{ border: '1px solid #EDF0F7' }}>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-[#002E83]" strokeWidth={2} />
          <span className="text-[14px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>اختر الفرص المناسبة لك</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 ml-2">
              <SlidersHorizontal className="w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <span className="text-[12px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>تصفية حسب</span>
            </div>
            {['all', 'A', 'B', 'C', 'D'].map((risk) => (
              <button
                key={risk}
                onClick={() => handleRiskFilter(risk)}
                className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                  selectedRisk === risk
                    ? 'bg-[#002E83] text-white shadow-md'
                    : 'bg-white text-[#6B7280] hover:bg-[#EDF0F7] border border-[#E5E9F0]'
                }`}
                style={{ fontWeight: selectedRisk === risk ? 700 : 500 }}
              >
                {risk === 'all' ? 'جميع الفرص' : `تصنيف ${risk}`}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[13px] text-[#0B1A3A] hover:bg-[#EDF0F7] transition-all border border-[#E5E9F0]"
              style={{ fontWeight: 500 }}
            >
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl py-2 z-20 min-w-[180px]" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSortBy(key); setSortOpen(false); }}
                    className={`w-full text-right px-4 py-2.5 text-[13px] hover:bg-[#F1F4F9] transition-colors ${sortBy === key ? 'text-[#002E83]' : 'text-[#0B1A3A]'}`}
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
        <h2 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>جميع الفرص</h2>
        <span className="text-[13px] text-[#9CA3AF] mr-1">({filtered.length})</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.map((opp) => (
          <OpportunityCardCompact key={opp.id} {...opp} patternIndex={opp.id % 3} onClick={() => navigate(`/app/opportunities/${opp.id}`)} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${currentPage > 1 ? 'bg-white hover:bg-[#F1F4F9] text-[#0B1A3A]' : 'bg-[#F1F4F9] text-[#CBD5E1] cursor-not-allowed'}`}
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
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${currentPage < totalPages ? 'bg-white hover:bg-[#F1F4F9] text-[#0B1A3A]' : 'bg-[#F1F4F9] text-[#CBD5E1] cursor-not-allowed'}`}
            style={{ boxShadow: currentPage < totalPages ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none' }}
          >
            <ArrowRight className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      )}

      {/* ===== 4. BOTTOM VIP BANNER ===== */}
      <div
        className="relative overflow-hidden rounded-[16px] mt-10"
        style={{ background: 'linear-gradient(135deg, #001A4D 0%, #002E83 100%)', border: '1px solid rgba(212, 175, 55, 0.15)' }}
      >
        <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full opacity-15 blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)' }} />
        <div className="relative z-10 flex items-center justify-between gap-6 px-8 py-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212, 175, 55, 0.15)', border: '1.5px solid rgba(212, 175, 55, 0.3)' }}>
              <Crown className="w-6 h-6" style={{ color: '#D4AF37' }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[15px] text-white" style={{ fontWeight: 700 }}>
                احصل على فرص حصرية مع عضوية VIP
              </p>
              <p className="text-[12px] text-white/50 mt-0.5">
                عوائد أعلى • أولوية الوصول • تحليلات متقدمة
              </p>
            </div>
          </div>
          <button
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
              color: '#002E83', fontWeight: 700, fontSize: '13px',
              boxShadow: '0 6px 16px rgba(212, 175, 55, 0.3)',
            }}
          >
            <span>ترقية الآن</span>
            <Zap className="w-3.5 h-3.5" fill="currentColor" strokeWidth={0} />
          </button>
        </div>
      </div>
    </div>
  );
}
