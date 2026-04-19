import { useParams, useNavigate, Link } from 'react-router';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from '../components/fundme';
import { formatSAR, formatPercentage } from '../utils/currency';
import {
  ArrowRight, ChevronLeft, Download, FileText,
  AlertTriangle,
} from 'lucide-react';

/* ── Investment Data ────────────────────────── */

const investmentsMap: Record<string, {
  id: string; project: string; projectEn: string; risk: string;
  amount: number; duration: number; roi: number;
  netReturn: number; returnPct: number; status: string;
  nextPayment: string; nextPaymentAr: string;
  nextPaymentRel: string; nextPaymentRelAr: string;
  investDate: string; investDateAr: string;
  schedule: { month: string; monthAr: string; date: string; dateAr: string; amount: number; principal: number; profit: number; status: 'paid' | 'current' | 'upcoming' }[];
}> = {
  'FM-0004-360': {
    id: 'FM-0004-360', project: 'تمويل مشروع عقاري', projectEn: 'Real Estate Finance', risk: 'A',
    amount: 100000, duration: 18, roi: 13.1, netReturn: 13090, returnPct: 13.1, status: 'active',
    nextPayment: 'Apr 19, 2026', nextPaymentAr: '١٩ أبريل ٢٠٢٦', nextPaymentRel: 'in 4 days', nextPaymentRelAr: 'خلال ٤ أيام',
    investDate: 'Jan 15, 2026', investDateAr: '١٥ يناير ٢٠٢٦',
    schedule: [
      { month: 'Feb', monthAr: 'فبراير', date: 'Feb 15', dateAr: '١٥ فبراير', amount: 6283, principal: 5556, profit: 727, status: 'paid' },
      { month: 'Mar', monthAr: 'مارس', date: 'Mar 15', dateAr: '١٥ مارس', amount: 6283, principal: 5556, profit: 727, status: 'paid' },
      { month: 'Apr', monthAr: 'أبريل', date: 'Apr 19', dateAr: '١٩ أبريل', amount: 6283, principal: 5556, profit: 727, status: 'current' },
      { month: 'May', monthAr: 'مايو', date: 'May 15', dateAr: '١٥ مايو', amount: 6283, principal: 5556, profit: 727, status: 'upcoming' },
      { month: 'Jun', monthAr: 'يونيو', date: 'Jun 15', dateAr: '١٥ يونيو', amount: 6283, principal: 5556, profit: 727, status: 'upcoming' },
    ],
  },
  'FM-0001-309': {
    id: 'FM-0001-309', project: 'تمويل الفواتير', projectEn: 'Invoice Finance', risk: 'A',
    amount: 50000, duration: 12, roi: 6.2, netReturn: 3123, returnPct: 6.2, status: 'active',
    nextPayment: 'Apr 19, 2026', nextPaymentAr: '١٩ أبريل ٢٠٢٦', nextPaymentRel: 'in 4 days', nextPaymentRelAr: 'خلال ٤ أيام',
    investDate: 'Mar 1, 2026', investDateAr: '١ مارس ٢٠٢٦',
    schedule: [
      { month: 'Apr', monthAr: 'أبريل', date: 'Apr 19', dateAr: '١٩ أبريل', amount: 4427, principal: 4167, profit: 260, status: 'current' },
      { month: 'May', monthAr: 'مايو', date: 'May 19', dateAr: '١٩ مايو', amount: 4427, principal: 4167, profit: 260, status: 'upcoming' },
    ],
  },
  'FM-0003-287': {
    id: 'FM-0003-287', project: 'تمويل شركة لوجستية', projectEn: 'Logistics Finance', risk: 'D',
    amount: 65000, duration: 18, roi: -9.7, netReturn: -6306, returnPct: -9.7, status: 'late',
    nextPayment: 'Apr 11, 2026', nextPaymentAr: '١١ أبريل ٢٠٢٦', nextPaymentRel: 'Overdue 4 days', nextPaymentRelAr: 'متأخر ٤ أيام',
    investDate: 'Nov 10, 2025', investDateAr: '١٠ نوفمبر ٢٠٢٥',
    schedule: [
      { month: 'Dec', monthAr: 'ديسمبر', date: 'Dec 10', dateAr: '١٠ ديسمبر', amount: 4100, principal: 3611, profit: 489, status: 'paid' },
      { month: 'Jan', monthAr: 'يناير', date: 'Jan 10', dateAr: '١٠ يناير', amount: 4100, principal: 3611, profit: 489, status: 'paid' },
      { month: 'Apr', monthAr: 'أبريل', date: 'Apr 11', dateAr: '١١ أبريل', amount: 4100, principal: 3611, profit: 489, status: 'current' },
    ],
  },
};

const defaultInvestment = {
  id: 'FM-0000-000', project: 'استثمار', projectEn: 'Investment', risk: 'B',
  amount: 50000, duration: 12, roi: 10, netReturn: 5000, returnPct: 10, status: 'active',
  nextPayment: '', nextPaymentAr: '', nextPaymentRel: '', nextPaymentRelAr: '',
  investDate: 'Jan 1, 2026', investDateAr: '١ يناير ٢٠٢٦',
  schedule: [],
};

const riskColor: Record<string, string> = { A: '#3B82F6', B: '#14B8A6', C: '#F59E0B', D: '#EF4444' };

/* ── Tokens ────────────────────────────────── */

type Tokens = ReturnType<typeof buildTokens>;

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      card: { background: colors.dark.card, border: `1px solid ${colors.dark.border}` } as React.CSSProperties,
      divider: colors.dark.border,
      innerSurface: colors.dark.elevated,
      innerBorder: colors.dark.border,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      rowHover: colors.dark.hover,
      currentRowBg: 'rgba(37,99,235,0.08)',
      tableHeaderBg: colors.dark.elevated,
      progressTrack: colors.dark.hover,
      progressFill: '#34D399',
      profitText: '#34D399',
      successColor: '#34D399',
      successBg: 'rgba(43,182,115,0.12)',
      successBorder: 'rgba(43,182,115,0.3)',
      infoColor: '#60A5FA',
      infoBg: 'rgba(37,99,235,0.12)',
      infoBorder: 'rgba(37,99,235,0.3)',
      dangerColor: '#F87171',
      dangerBg: 'rgba(220,38,38,0.12)',
      dangerBorder: 'rgba(220,38,38,0.3)',
      completedBg: colors.dark.hover,
      completedColor: colors.textOnDark.tertiary,
      completedBorder: colors.dark.border,
      secondaryBtnBorder: `1px solid ${colors.dark.border}`,
      secondaryBtnText: colors.textOnDark.secondary,
      secondaryBtnHover: colors.dark.hover,
      iconAccentBg: 'rgba(37,99,235,0.15)',
      iconAccentColor: '#60A5FA',
      breadcrumbHover: colors.textOnDark.secondary,
    };
  }
  return {
    isVIP: false,
    card: { background: 'white', border: '1px solid #E8ECF2', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' } as React.CSSProperties,
    divider: '#F1F5F9',
    innerSurface: '#F8FAFC',
    innerBorder: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textFaint: '#CBD5E1',
    rowHover: '#F8FAFC',
    currentRowBg: '#FAFBFE',
    tableHeaderBg: '#FAFBFC',
    progressTrack: '#F1F5F9',
    progressFill: '#2BB673',
    profitText: '#2BB673',
    successColor: '#2BB673',
    successBg: '#F0FDF4',
    successBorder: '#BBF7D0',
    infoColor: '#3B82F6',
    infoBg: '#EFF6FF',
    infoBorder: '#BFDBFE',
    dangerColor: '#EF4444',
    dangerBg: '#FEF2F2',
    dangerBorder: '#FECACA',
    completedBg: '#F8FAFC',
    completedColor: '#94A3B8',
    completedBorder: '#E2E8F0',
    secondaryBtnBorder: '1px solid #E2E8F0',
    secondaryBtnText: '#64748B',
    secondaryBtnHover: '#F8FAFC',
    iconAccentBg: '#EFF6FF',
    iconAccentColor: '#3B82F6',
    breadcrumbHover: '#64748B',
  };
}

function useTokens(): Tokens {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

function statusBadge(status: string, isAr: boolean, t: Tokens) {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    active: { label: isAr ? 'نشط' : 'On-time', bg: 'transparent', color: t.successColor, border: t.successBorder },
    late: { label: isAr ? 'متأخر' : 'Delayed', bg: t.dangerBg, color: t.dangerColor, border: t.dangerBorder },
    funding: { label: isAr ? 'قيد التمويل' : 'Funding', bg: 'transparent', color: t.infoColor, border: t.infoBorder },
    completed: { label: isAr ? 'مكتمل' : 'Completed', bg: t.completedBg, color: t.completedColor, border: t.completedBorder },
    paid: { label: isAr ? 'تم السداد' : 'Paid', bg: t.successBg, color: t.successColor, border: t.successBorder },
    current: { label: isAr ? 'الحالية' : 'Due', bg: t.infoBg, color: t.infoColor, border: t.infoBorder },
    upcoming: { label: isAr ? 'قادمة' : 'Upcoming', bg: t.completedBg, color: t.completedColor, border: t.completedBorder },
  };
  const c = map[status] || map.active;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px]" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontWeight: 600 }}>
      {status === 'late' && <AlertTriangle className="w-2.5 h-2.5" strokeWidth={2} />}
      {c.label}
    </span>
  );
}

/* ── Page ────────────────────────────────────── */

export function InvestmentDetailPage() {
  const { investmentId } = useParams();
  const navigate = useNavigate();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();

  const inv = investmentsMap[investmentId || ''] || { ...defaultInvestment, id: investmentId || 'N/A' };

  const paidCount = inv.schedule.filter(s => s.status === 'paid').length;
  const totalScheduled = inv.schedule.length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[12px] mb-5" style={{ fontWeight: 500, color: tk.textMuted }}>
        <Link to="/app" className="transition-colors" style={{ color: tk.textMuted }} onMouseEnter={e => (e.currentTarget.style.color = tk.breadcrumbHover)} onMouseLeave={e => (e.currentTarget.style.color = tk.textMuted)}>{isAr ? 'الرئيسية' : 'Home'}</Link>
        <ChevronLeft className="w-3 h-3" strokeWidth={1.5} />
        <Link to="/app/portfolio" className="transition-colors" style={{ color: tk.textMuted }} onMouseEnter={e => (e.currentTarget.style.color = tk.breadcrumbHover)} onMouseLeave={e => (e.currentTarget.style.color = tk.textMuted)}>{isAr ? 'استثماراتي' : 'My Investments'}</Link>
        <ChevronLeft className="w-3 h-3" strokeWidth={1.5} />
        <span style={{ fontWeight: 600, color: tk.textPrimary }}>{inv.id}</span>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate('/app/portfolio')}
        className="flex items-center gap-1.5 text-[13px] mb-6 transition-colors cursor-pointer"
        style={{ fontWeight: 500, color: tk.textSecondary }}
        onMouseEnter={e => (e.currentTarget.style.color = tk.textPrimary)}
        onMouseLeave={e => (e.currentTarget.style.color = tk.textSecondary)}
      >
        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        {isAr ? 'العودة إلى استثماراتي' : 'Back to My Investments'}
      </button>

      {/* ── Header Card ── */}
      <div className="rounded-2xl p-6 mb-6" style={tk.card}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] text-white shrink-0" style={{ background: riskColor[inv.risk] || '#94A3B8', fontWeight: 700 }}>{inv.risk}</span>
              <h1 className="text-[22px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{isAr ? inv.project : inv.projectEn}</h1>
              {statusBadge(inv.status, isAr, tk)}
            </div>
            <div className="text-[12px] font-mono" style={{ color: tk.textMuted }}>{inv.id}</div>
          </div>

          <button
            className="h-9 px-4 rounded-lg text-[12px] transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            style={{ border: tk.secondaryBtnBorder, fontWeight: 500, color: tk.secondaryBtnText, background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.8} />
            {isAr ? 'تحميل PDF' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* ── Key Metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: isAr ? 'المبلغ المستثمر' : 'Amount', value: formatSAR(inv.amount, { decimals: 0 }) },
          { label: isAr ? 'المدة' : 'Duration', value: `${inv.duration} ${isAr ? 'شهر' : 'months'}` },
          { label: isAr ? 'العائد المتوقع' : 'Expected Return', value: formatPercentage(inv.roi), color: inv.returnPct >= 0 ? tk.successColor : tk.dangerColor },
          { label: isAr ? 'صافي العائد' : 'Net Return', value: `${inv.netReturn >= 0 ? '+' : ''}${formatSAR(inv.netReturn, { decimals: 0 })}`, color: inv.netReturn >= 0 ? tk.successColor : tk.dangerColor },
          { label: isAr ? 'تاريخ الاستثمار' : 'Invest Date', value: isAr ? inv.investDateAr : inv.investDate },
          { label: isAr ? 'الدفعة القادمة' : 'Next Payment', value: inv.nextPayment ? (isAr ? inv.nextPaymentAr : inv.nextPayment) : '—', color: inv.status === 'late' ? tk.dangerColor : undefined },
        ].map((m, i) => (
          <div key={i} className="rounded-2xl p-4" style={tk.card}>
            <div className="text-[10px] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600, color: tk.textMuted }}>{m.label}</div>
            <div className="text-[16px] leading-tight" style={{ fontWeight: 700, color: m.color || tk.textPrimary, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* ── Two Column: Agreement + Schedule ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Agreement */}
        <div className="rounded-2xl p-6" style={tk.card}>
          <h2 className="text-[15px] mb-5" style={{ fontWeight: 700, color: tk.textPrimary }}>
            {isAr ? 'تفاصيل الاتفاقية' : 'Agreement Details'}
          </h2>
          <div className="space-y-0">
            {[
              { label: isAr ? 'رقم الاتفاقية' : 'Agreement No.', value: inv.id },
              { label: isAr ? 'نوع التمويل' : 'Finance Type', value: isAr ? 'تمويل بالمرابحة' : 'Murabaha Finance' },
              { label: isAr ? 'تصنيف المخاطر' : 'Risk Grade', value: inv.risk },
              { label: isAr ? 'تكرار السداد' : 'Repayment Freq.', value: isAr ? 'شهري' : 'Monthly' },
              { label: isAr ? 'عدد الدفعات' : 'Total Payments', value: `${totalScheduled}` },
              { label: isAr ? 'الدفعات المسددة' : 'Paid', value: `${paidCount} / ${totalScheduled}` },
              { label: isAr ? 'الضمانات' : 'Guarantees', value: isAr ? 'ضمان عقاري + كفالة شخصية' : 'Property guarantee + personal guarantee' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${tk.divider}` }}>
                <span className="text-[12px]" style={{ fontWeight: 500, color: tk.textMuted }}>{row.label}</span>
                <span className="text-[13px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${tk.divider}` }}>
            <div className="text-[12px] uppercase tracking-[0.06em] mb-3" style={{ fontWeight: 600, color: tk.textMuted }}>
              {isAr ? 'المستندات' : 'Documents'}
            </div>
            <div className="space-y-2">
              {[
                { name: isAr ? 'اتفاقية الاستثمار' : 'Investment Agreement', size: 'PDF · 245 KB' },
                { name: isAr ? 'جدول السداد' : 'Repayment Schedule', size: 'PDF · 120 KB' },
              ].map((doc, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer"
                  style={{ border: `1px solid ${tk.divider}`, background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: tk.iconAccentBg }}>
                    <FileText className="w-4 h-4" strokeWidth={1.6} style={{ color: tk.iconAccentColor }} />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[13px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{doc.name}</div>
                    <div className="text-[11px]" style={{ color: tk.textMuted }}>{doc.size}</div>
                  </div>
                  <Download className="w-4 h-4" strokeWidth={1.6} style={{ color: tk.textMuted }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="rounded-2xl p-6" style={tk.card}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px]" style={{ fontWeight: 700, color: tk.textPrimary }}>
              {isAr ? 'جدول السداد' : 'Repayment Schedule'}
            </h2>
            <div className="text-[11px]" style={{ fontWeight: 500, color: tk.textMuted }}>
              {paidCount}/{totalScheduled} {isAr ? 'مسددة' : 'paid'}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden mb-5" style={{ background: tk.progressTrack }}>
            <div className="h-full rounded-full" style={{ width: totalScheduled > 0 ? `${(paidCount / totalScheduled) * 100}%` : '0%', background: tk.progressFill }} />
          </div>

          {/* Table */}
          {inv.schedule.length > 0 ? (
            <div>
              <div
                className="grid grid-cols-12 gap-2 px-3 h-[32px] items-center text-[10px] uppercase tracking-[0.06em]"
                style={{ fontWeight: 600, color: tk.textMuted, background: tk.tableHeaderBg, borderRadius: '8px' }}
              >
                <div className="col-span-3">{isAr ? 'الشهر' : 'Month'}</div>
                <div className="col-span-3">{isAr ? 'المبلغ' : 'Amount'}</div>
                <div className="col-span-2">{isAr ? 'أصل' : 'Principal'}</div>
                <div className="col-span-2">{isAr ? 'ربح' : 'Profit'}</div>
                <div className="col-span-2">{isAr ? 'الحالة' : 'Status'}</div>
              </div>

              {inv.schedule.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-2 items-center px-3 py-3 border-t"
                  style={{ borderColor: tk.divider, background: row.status === 'current' ? tk.currentRowBg : 'transparent' }}
                >
                  <div className="col-span-3">
                    <div className="text-[12px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{isAr ? row.monthAr : row.month}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: tk.textMuted }}>{isAr ? row.dateAr : row.date}</div>
                  </div>
                  <div className="col-span-3 text-[12px]" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: tk.textPrimary }}>
                    {formatSAR(row.amount, { decimals: 0 })}
                  </div>
                  <div className="col-span-2 text-[11px]" style={{ fontVariantNumeric: 'tabular-nums', color: tk.textSecondary }}>
                    {formatSAR(row.principal, { decimals: 0 })}
                  </div>
                  <div className="col-span-2 text-[11px]" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: tk.profitText }}>
                    {formatSAR(row.profit, { decimals: 0 })}
                  </div>
                  <div className="col-span-2">
                    {statusBadge(row.status, isAr, tk)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[13px]" style={{ color: tk.textMuted }}>
              {isAr ? 'لا توجد دفعات بعد' : 'No payments scheduled yet'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
