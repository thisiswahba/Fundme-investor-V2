import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '../../i18n';
import { usePersona } from '../../demoPersona';
import { OpportunityCardCompact } from '../opportunities/OpportunityCardCompact';
import { colors } from '../fundme';

const opportunities = [
  {
    id: 1, borrowerNameAr: 'شركة البركة التجارية', borrowerNameEn: 'Al-Baraka Trading Co.', opportunityId: 'FM-0001-309',
    financingTypeAr: 'تمويل الفواتير', financingTypeEn: 'Invoice Finance', roi: 11.5, risk: 'B' as const, tenorMonths: 20,
    fundingProgress: 68, totalAmount: 500000, fundedAmount: 340000,
    categoryIcon: 'invoice' as const,
  },
  {
    id: 2, borrowerNameAr: 'مؤسسة الأفق للتجزئة', borrowerNameEn: 'Al-Ufq Retail Est.', opportunityId: 'FM-0002-412',
    financingTypeAr: 'تمويل رأس المال', financingTypeEn: 'Working Capital', roi: 13.2, risk: 'C' as const, tenorMonths: 20,
    fundingProgress: 42, totalAmount: 350000, fundedAmount: 147000,
    categoryIcon: 'capital' as const,
  },
  {
    id: 3, borrowerNameAr: 'الشركة الصناعية المتقدمة', borrowerNameEn: 'Advanced Industrial Co.', opportunityId: 'FM-0003-578',
    financingTypeAr: 'تمويل المعدات', financingTypeEn: 'Equipment Finance', roi: 9.8, risk: 'A' as const, tenorMonths: 24,
    fundingProgress: 85, totalAmount: 750000, fundedAmount: 637500,
    categoryIcon: 'equipment' as const,
  },
];

export function OpportunitiesPreview() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const { personaId } = usePersona();
  const isVIP = personaId === 'vip';
  const navigate = useNavigate();

  const headingColor = isVIP ? colors.textOnDark.secondary : '#0B1A3A';
  const linkColor = isVIP ? '#60A5FA' : '#002E83';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px]" style={{ fontWeight: 700, color: headingColor }}>
          {isAr ? 'فرص استثمارية' : 'Investment Opportunities'}
        </h3>
        <Link
          to="/app/opportunities"
          className="flex items-center gap-1 text-[12px] transition-all hover:gap-1.5"
          style={{ fontWeight: 600, color: linkColor }}
        >
          <span>{isAr ? 'عرض الكل' : 'View All'}</span>
          <Arrow className="w-3 h-3" strokeWidth={2.5} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
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
            onClick={() => navigate(`/app/opportunities/${opp.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
