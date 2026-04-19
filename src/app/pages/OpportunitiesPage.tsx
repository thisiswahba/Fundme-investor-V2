import { useState } from 'react';
import { ArrowRight, ArrowLeft, SlidersHorizontal, ChevronDown, TrendingUp, Lightbulb, Zap, Crown, ArrowLeft as ArrowL, Shield } from 'lucide-react';
import { OpportunityCardCompact } from '../components/opportunities/OpportunityCardCompact';
import { Link, useNavigate } from 'react-router';
import { usePersona } from '../demoPersona';
import { useI18n } from '../i18n';
import { colors } from '../components/fundme';

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      titleAccent: '#60A5FA',
      returnAccent: '#34D399',
      cardBg: colors.dark.card,
      cardBorder: `1px solid ${colors.dark.border}`,
      insightBg: colors.dark.card,
      insightBorder: '1px solid rgba(96,165,250,0.2)',
      insightIconBg: 'rgba(37,99,235,0.15)',
      insightIconColor: '#60A5FA',
      insightBtnBg: colors.primary,
      insightBtnColor: '#fff',
      filterSectionBg: colors.dark.elevated,
      filterSectionBorder: `1px solid ${colors.dark.border}`,
      filterLabelColor: colors.textOnDark.tertiary,
      filterChipActiveBg: colors.primary,
      filterChipActiveColor: '#fff',
      filterChipInactiveBg: colors.dark.card,
      filterChipInactiveColor: colors.textOnDark.secondary,
      filterChipInactiveBorder: colors.dark.border,
      filterChipHoverBg: colors.dark.hover,
      sortBtnBg: colors.dark.card,
      sortBtnBorder: colors.dark.border,
      sortBtnText: colors.textOnDark.primary,
      sortBtnHover: colors.dark.hover,
      sortMenuBg: colors.dark.elevated,
      sortMenuShadow: '0 8px 24px rgba(0,0,0,0.4)',
      sortMenuActive: '#60A5FA',
      sortMenuInactive: colors.textOnDark.primary,
      sortMenuHover: colors.dark.hover,
      pageBtnBg: colors.dark.card,
      pageBtnHover: colors.dark.hover,
      pageBtnColor: colors.textOnDark.primary,
      pageBtnDisabledBg: colors.dark.hover,
      pageBtnDisabledColor: colors.textOnDark.muted,
      pageBtnShadow: '0 2px 8px rgba(0,0,0,0.3)',
      iconAccent: '#60A5FA',
    };
  }
  return {
    isVIP: false,
    textPrimary: '#0B1A3A',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textFaint: '#CBD5E1',
    titleAccent: '#0D82F9',
    returnAccent: '#10B981',
    cardBg: '#FFFFFF',
    cardBorder: '1px solid #EDF0F7',
    insightBg: '#FFFFFF',
    insightBorder: '1px solid rgba(13, 130, 249, 0.12)',
    insightIconBg: 'rgba(13, 130, 249, 0.1)',
    insightIconColor: '#0D82F9',
    insightBtnBg: '#002E83',
    insightBtnColor: '#fff',
    filterSectionBg: '#F8FAFC',
    filterSectionBorder: '1px solid #EDF0F7',
    filterLabelColor: '#9CA3AF',
    filterChipActiveBg: '#002E83',
    filterChipActiveColor: '#fff',
    filterChipInactiveBg: '#FFFFFF',
    filterChipInactiveColor: '#6B7280',
    filterChipInactiveBorder: '#E5E9F0',
    filterChipHoverBg: '#EDF0F7',
    sortBtnBg: '#FFFFFF',
    sortBtnBorder: '#E5E9F0',
    sortBtnText: '#0B1A3A',
    sortBtnHover: '#EDF0F7',
    sortMenuBg: '#FFFFFF',
    sortMenuShadow: '0 8px 24px rgba(0,0,0,0.12)',
    sortMenuActive: '#002E83',
    sortMenuInactive: '#0B1A3A',
    sortMenuHover: '#F1F4F9',
    pageBtnBg: '#FFFFFF',
    pageBtnHover: '#F1F4F9',
    pageBtnColor: '#0B1A3A',
    pageBtnDisabledBg: '#F1F4F9',
    pageBtnDisabledColor: '#CBD5E1',
    pageBtnShadow: '0 2px 8px rgba(0,0,0,0.08)',
    iconAccent: '#002E83',
  };
}

function useTokens() {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

interface Opp {
  id: number;
  borrowerNameAr: string; borrowerNameEn: string;
  opportunityId: string;
  financingTypeAr: string; financingTypeEn: string;
  roi: number; risk: 'A' | 'B' | 'C' | 'D';
  tenorMonths: number;
  fundingProgress: number; totalAmount: number; fundedAmount: number;
  categoryIcon: 'invoice' | 'capital' | 'equipment' | 'expansion' | 'food' | 'innovation';
  gradientTone: string;
  recommended: boolean;
  comingSoon?: boolean;
  /** ISO datetime when the opportunity opens. Computed at module load. */
  launchAt?: string;
  completed?: boolean;
  completedAt?: string;
  investorCount?: number;
}

// Stable launch dates relative to load time (used by countdown timers)
const now = Date.now();
const inDays = (d: number, h = 0, m = 0) =>
  new Date(now + d * 86400_000 + h * 3600_000 + m * 60_000).toISOString();

const opportunities: Opp[] = [
  {
    id: 1, borrowerNameAr: 'شركة البركة التجارية', borrowerNameEn: 'Al-Baraka Trading Co.', opportunityId: 'FM-0001-309',
    financingTypeAr: 'تمويل الفواتير', financingTypeEn: 'Invoice Finance', roi: 11.5, risk: 'B', tenorMonths: 20,
    fundingProgress: 68, totalAmount: 500000, fundedAmount: 340000,
    categoryIcon: 'invoice', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0D82F9 100%)',
    recommended: false,
  },
  {
    id: 2, borrowerNameAr: 'مؤسسة الأفق للتجزئة', borrowerNameEn: 'Al-Ufq Retail Est.', opportunityId: 'FM-0002-412',
    financingTypeAr: 'تمويل رأس المال', financingTypeEn: 'Working Capital', roi: 13.2, risk: 'C', tenorMonths: 20,
    fundingProgress: 42, totalAmount: 350000, fundedAmount: 147000,
    categoryIcon: 'capital', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #1e40af 100%)',
    recommended: true,
  },
  {
    id: 3, borrowerNameAr: 'الشركة الصناعية المتقدمة', borrowerNameEn: 'Advanced Industrial Co.', opportunityId: 'FM-0003-578',
    financingTypeAr: 'تمويل المعدات', financingTypeEn: 'Equipment Finance', roi: 9.8, risk: 'A', tenorMonths: 24,
    fundingProgress: 85, totalAmount: 750000, fundedAmount: 637500,
    categoryIcon: 'equipment', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0c4a6e 100%)',
    recommended: true,
  },
  {
    id: 4, borrowerNameAr: 'شركة النقل السريع', borrowerNameEn: 'Fast Transport Co.', opportunityId: 'FM-0004-221',
    financingTypeAr: 'تمويل التوسع', financingTypeEn: 'Expansion Finance', roi: 14.5, risk: 'C', tenorMonths: 20,
    fundingProgress: 29, totalAmount: 450000, fundedAmount: 130500,
    categoryIcon: 'expansion', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #075985 100%)',
    recommended: true,
  },
  {
    id: 5, borrowerNameAr: 'مطاعم النخبة السريعة', borrowerNameEn: 'Elite Quick Restaurants', opportunityId: 'FM-0005-887',
    financingTypeAr: 'تمويل التوسع', financingTypeEn: 'Expansion Finance', roi: 12.8, risk: 'B', tenorMonths: 20,
    fundingProgress: 55, totalAmount: 600000, fundedAmount: 330000,
    categoryIcon: 'food', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0369a1 100%)',
    recommended: false,
  },
  {
    id: 6, borrowerNameAr: 'شركة التقنية التعليمية', borrowerNameEn: 'EdTech Solutions', opportunityId: 'FM-0006-134',
    financingTypeAr: 'تمويل الابتكار', financingTypeEn: 'Innovation Finance', roi: 16.2, risk: 'D', tenorMonths: 24,
    fundingProgress: 18, totalAmount: 400000, fundedAmount: 72000,
    categoryIcon: 'innovation', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #1e3a8a 100%)',
    recommended: false,
  },
  // ── Coming soon ──
  {
    id: 7, borrowerNameAr: 'مجموعة الواحة الزراعية', borrowerNameEn: 'Al-Waha Agricultural Group', opportunityId: 'FM-0007-902',
    financingTypeAr: 'تمويل التوسع', financingTypeEn: 'Expansion Finance', roi: 13.6, risk: 'B', tenorMonths: 18,
    fundingProgress: 0, totalAmount: 800000, fundedAmount: 0,
    categoryIcon: 'expansion', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #4338CA 100%)',
    recommended: false, comingSoon: true, launchAt: inDays(2, 14, 30),
  },
  {
    id: 8, borrowerNameAr: 'شركة الطاقة المتجددة', borrowerNameEn: 'Renewable Energy Co.', opportunityId: 'FM-0008-451',
    financingTypeAr: 'تمويل المعدات', financingTypeEn: 'Equipment Finance', roi: 11.2, risk: 'A', tenorMonths: 30,
    fundingProgress: 0, totalAmount: 1200000, fundedAmount: 0,
    categoryIcon: 'equipment', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #4338CA 100%)',
    recommended: false, comingSoon: true, launchAt: inDays(7, 0, 0),
  },
  // ── Completed / Fully funded ──
  {
    id: 9, borrowerNameAr: 'شركة الخليج للمقاولات', borrowerNameEn: 'Gulf Contracting Co.', opportunityId: 'FM-0009-018',
    financingTypeAr: 'تمويل الفواتير', financingTypeEn: 'Invoice Finance', roi: 12.4, risk: 'B', tenorMonths: 12,
    fundingProgress: 100, totalAmount: 600000, fundedAmount: 600000,
    categoryIcon: 'invoice', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0D82F9 100%)',
    recommended: false, completed: true, completedAt: '2026-03-22', investorCount: 187,
  },
  {
    id: 10, borrowerNameAr: 'مطاعم البحر الذهبي', borrowerNameEn: 'Golden Sea Restaurants', opportunityId: 'FM-0010-744',
    financingTypeAr: 'تمويل التوسع', financingTypeEn: 'Expansion Finance', roi: 14.1, risk: 'C', tenorMonths: 18,
    fundingProgress: 100, totalAmount: 425000, fundedAmount: 425000,
    categoryIcon: 'food', gradientTone: 'linear-gradient(135deg, #001d5a 0%, #0369a1 100%)',
    recommended: false, completed: true, completedAt: '2026-04-08', investorCount: 142,
  },
];

type SortKey = 'default' | 'roi' | 'risk' | 'progress';
const sortLabelsAr: Record<SortKey, string> = {
  default: 'الترتيب الافتراضي', roi: 'الأعلى عائدًا', risk: 'الأقل مخاطرة', progress: 'الأقرب اكتمالًا',
};
const sortLabelsEn: Record<SortKey, string> = {
  default: 'Default order', roi: 'Highest return', risk: 'Lowest risk', progress: 'Closest to funded',
};
const riskOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 };

export function OpportunitiesPage() {
  const navigate = useNavigate();
  const tk = useTokens();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const sortLabels = isAr ? sortLabelsAr : sortLabelsEn;
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
        <h1 className="text-[28px] mb-2" style={{ fontWeight: 700, color: tk.textPrimary }}>
          {isAr ? 'الفرص الاستثمارية' : 'Investment Opportunities'}
        </h1>
        <div className="flex items-center gap-2 text-[13px]">
          <span style={{ fontWeight: 600, color: tk.titleAccent }}>{opportunities.length} {isAr ? 'فرصة متاحة' : 'opportunities available'}</span>
          <span style={{ color: tk.textFaint }}>•</span>
          <span style={{ color: tk.textSecondary }}>{isAr ? 'متوسط العائد' : 'Avg. return'} <span style={{ fontWeight: 700, color: tk.returnAccent }}>{avgRoi}%</span></span>
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
              <span className="text-[12px] text-white/50" style={{ fontWeight: 600 }}>{isAr ? 'فرص هذا الشهر' : 'This month\'s opportunities'}</span>
            </div>
            <h2 className="text-[24px] lg:text-[28px] text-white leading-tight mb-2" style={{ fontWeight: 700 }}>
              {isAr ? 'استثمر بذكاء هذا الشهر' : 'Invest smartly this month'}
            </h2>
            <p className="text-[14px] text-white/60 mb-5 max-w-[400px]">
              {isAr ? (
                <>متوسط العائد الحالي <span className="text-[#80FF00]" style={{ fontWeight: 700 }}>{avgRoi}%</span> — اختر من فرص مدروسة بعناية ومخاطر محسوبة</>
              ) : (
                <>Current avg. return <span className="text-[#80FF00]" style={{ fontWeight: 700 }}>{avgRoi}%</span> — pick from carefully vetted opportunities with measured risk</>
              )}
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
              <span>{isAr ? 'ابدأ الاستثمار' : 'Start Investing'}</span>
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
        className="flex items-center gap-4 px-6 py-4 rounded-2xl mb-8"
        style={{ background: tk.insightBg, border: tk.insightBorder }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tk.insightIconBg }}>
          <Lightbulb className="w-5 h-5" strokeWidth={2} style={{ color: tk.insightIconColor }} />
        </div>
        <div className="flex-1">
          <p className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>
            {isAr ? 'الفرص ذات التصنيف A تنفد بسرعة' : 'Grade A opportunities are filling up fast'}
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: tk.textSecondary }}>
            {isAr
              ? 'لديك فرص بعائد أعلى من متوسط المحفظة — استكشفها قبل اكتمال التمويل'
              : 'Returns above your portfolio average — explore them before funding closes'}
          </p>
        </div>
        <button
          onClick={() => handleRiskFilter('A')}
          className="flex-shrink-0 px-4 py-2 rounded-lg text-[12px] transition-all hover:shadow-md"
          style={{ background: tk.insightBtnBg, color: tk.insightBtnColor, fontWeight: 700 }}
        >
          {isAr ? 'عرض فرص A' : 'Show Grade A'}
        </button>
      </div>

      {/* ===== VIP UPGRADE BANNER (above filters) ===== */}
      <div
        className="relative overflow-hidden rounded-[16px] mb-6"
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
                {isAr ? 'احصل على فرص حصرية مع عضوية VIP' : 'Unlock exclusive opportunities with VIP'}
              </p>
              <p className="text-[12px] text-white/50 mt-0.5">
                {isAr ? 'عوائد أعلى • أولوية الوصول • تحليلات متقدمة' : 'Higher returns • Priority access • Advanced analytics'}
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
            <span>{isAr ? 'ترقية الآن' : 'Upgrade Now'}</span>
            <Zap className="w-3.5 h-3.5" fill="currentColor" strokeWidth={0} />
          </button>
        </div>
      </div>

      {/* ===== 3. FILTER SECTION ===== */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: tk.filterSectionBg, border: tk.filterSectionBorder }}>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4" strokeWidth={2} style={{ color: tk.iconAccent }} />
          <span className="text-[14px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{isAr ? 'اختر الفرص المناسبة لك' : 'Pick opportunities that fit you'}</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 ml-2">
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} style={{ color: tk.filterLabelColor }} />
              <span className="text-[12px]" style={{ fontWeight: 500, color: tk.filterLabelColor }}>{isAr ? 'تصفية حسب' : 'Filter by'}</span>
            </div>
            {['all', 'A', 'B', 'C', 'D'].map((risk) => {
              const isActive = selectedRisk === risk;
              return (
                <button
                  key={risk}
                  onClick={() => handleRiskFilter(risk)}
                  className="px-4 py-2 rounded-lg text-[13px] transition-all"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? tk.filterChipActiveBg : tk.filterChipInactiveBg,
                    color: isActive ? tk.filterChipActiveColor : tk.filterChipInactiveColor,
                    border: isActive ? 'none' : `1px solid ${tk.filterChipInactiveBorder}`,
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = tk.filterChipHoverBg; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = tk.filterChipInactiveBg; }}
                >
                  {risk === 'all' ? (isAr ? 'جميع الفرص' : 'All') : (isAr ? `تصنيف ${risk}` : `Grade ${risk}`)}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all"
              style={{ background: tk.sortBtnBg, color: tk.sortBtnText, border: `1px solid ${tk.sortBtnBorder}`, fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.background = tk.sortBtnHover)}
              onMouseLeave={e => (e.currentTarget.style.background = tk.sortBtnBg)}
            >
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute top-full left-0 mt-2 rounded-xl py-2 z-20 min-w-[180px]" style={{ background: tk.sortMenuBg, boxShadow: tk.sortMenuShadow, border: tk.isVIP ? tk.cardBorder : 'none' }}>
                {(Object.keys(sortLabels) as SortKey[]).map((key) => {
                  const isActive = sortBy === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { setSortBy(key); setSortOpen(false); }}
                      className="w-full text-start px-4 py-2.5 text-[13px] transition-colors"
                      style={{ fontWeight: isActive ? 700 : 400, color: isActive ? tk.sortMenuActive : tk.sortMenuInactive }}
                      onMouseEnter={e => (e.currentTarget.style.background = tk.sortMenuHover)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {sortLabels[key]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All Opportunities Title */}
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-5 h-5" strokeWidth={2} style={{ color: tk.iconAccent }} />
        <h2 className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{isAr ? 'جميع الفرص' : 'All Opportunities'}</h2>
        <span className="text-[13px] mx-1" style={{ color: tk.textMuted }}>({filtered.length})</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.map((opp) => (
          <OpportunityCardCompact
            key={opp.id}
            borrowerName={isAr ? opp.borrowerNameAr : opp.borrowerNameEn}
            opportunityId={opp.opportunityId}
            financingType={isAr ? opp.financingTypeAr : opp.financingTypeEn}
            roi={opp.roi}
            risk={opp.risk}
            tenor={isAr ? `${opp.tenorMonths} شهر` : `${opp.tenorMonths} months`}
            fundingProgress={opp.fundingProgress}
            totalAmount={opp.totalAmount}
            fundedAmount={opp.fundedAmount}
            categoryIcon={opp.categoryIcon}
            patternIndex={opp.id % 3}
            comingSoon={opp.comingSoon}
            launchAt={opp.launchAt}
            completed={opp.completed}
            completedAt={opp.completedAt}
            investorCount={opp.investorCount}
            onClick={opp.comingSoon ? undefined : () => navigate(`/app/opportunities/${opp.id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-12 h-12 rounded-xl transition-all"
            style={{
              background: currentPage > 1 ? tk.pageBtnBg : tk.pageBtnDisabledBg,
              color: currentPage > 1 ? tk.pageBtnColor : tk.pageBtnDisabledColor,
              boxShadow: currentPage > 1 ? tk.pageBtnShadow : 'none',
              cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={e => { if (currentPage > 1) e.currentTarget.style.background = tk.pageBtnHover; }}
            onMouseLeave={e => { if (currentPage > 1) e.currentTarget.style.background = tk.pageBtnBg; }}
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl" style={{ background: tk.pageBtnBg, boxShadow: tk.pageBtnShadow }}>
            <span className="text-[16px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{currentPage}</span>
            <span className="text-[16px]" style={{ color: tk.textMuted }}>/</span>
            <span className="text-[16px]" style={{ fontWeight: 500, color: tk.textMuted }}>{totalPages}</span>
          </div>
          <button
            onClick={() => { if (currentPage < totalPages) { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-12 h-12 rounded-xl transition-all"
            style={{
              background: currentPage < totalPages ? tk.pageBtnBg : tk.pageBtnDisabledBg,
              color: currentPage < totalPages ? tk.pageBtnColor : tk.pageBtnDisabledColor,
              boxShadow: currentPage < totalPages ? tk.pageBtnShadow : 'none',
              cursor: currentPage < totalPages ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={e => { if (currentPage < totalPages) e.currentTarget.style.background = tk.pageBtnHover; }}
            onMouseLeave={e => { if (currentPage < totalPages) e.currentTarget.style.background = tk.pageBtnBg; }}
          >
            <ArrowRight className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      )}

    </div>
  );
}
