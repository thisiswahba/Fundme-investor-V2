import { useParams, useNavigate, Link } from 'react-router';
import { useI18n } from '../i18n';
import { formatSAR, formatPercentage } from '../utils/currency';
import {
  ArrowRight, ChevronLeft, Calendar, Download, FileText,
  AlertTriangle, CheckCircle, Clock, Shield, TrendingUp,
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

// Fallback for IDs not in the map
const defaultInvestment = {
  id: 'FM-0000-000', project: 'استثمار', projectEn: 'Investment', risk: 'B',
  amount: 50000, duration: 12, roi: 10, netReturn: 5000, returnPct: 10, status: 'active',
  nextPayment: '', nextPaymentAr: '', nextPaymentRel: '', nextPaymentRelAr: '',
  investDate: 'Jan 1, 2026', investDateAr: '١ يناير ٢٠٢٦',
  schedule: [],
};

const riskColor: Record<string, string> = { A: '#3B82F6', B: '#14B8A6', C: '#F59E0B', D: '#EF4444' };
const cardStyle = { background: 'white', border: '1px solid #E8ECF2', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' };

function statusBadge(status: string, isAr: boolean) {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    active: { label: isAr ? 'نشط' : 'On-time', bg: 'transparent', color: '#2BB673', border: '#BBF7D0' },
    late: { label: isAr ? 'متأخر' : 'Delayed', bg: '#FEF2F2', color: '#EF4444', border: '#FECACA' },
    funding: { label: isAr ? 'قيد التمويل' : 'Funding', bg: 'transparent', color: '#3B82F6', border: '#BFDBFE' },
    completed: { label: isAr ? 'مكتمل' : 'Completed', bg: '#F8FAFC', color: '#94A3B8', border: '#E2E8F0' },
    paid: { label: isAr ? 'تم السداد' : 'Paid', bg: '#F0FDF4', color: '#2BB673', border: '#BBF7D0' },
    current: { label: isAr ? 'الحالية' : 'Due', bg: '#EFF6FF', color: '#3B82F6', border: '#BFDBFE' },
    upcoming: { label: isAr ? 'قادمة' : 'Upcoming', bg: '#F8FAFC', color: '#94A3B8', border: '#E2E8F0' },
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

  const inv = investmentsMap[investmentId || ''] || { ...defaultInvestment, id: investmentId || 'N/A' };

  const paidCount = inv.schedule.filter(s => s.status === 'paid').length;
  const totalScheduled = inv.schedule.length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] mb-5" style={{ fontWeight: 500 }}>
        <Link to="/app" className="hover:text-[#64748B] transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
        <ChevronLeft className="w-3 h-3" strokeWidth={1.5} />
        <Link to="/app/portfolio" className="hover:text-[#64748B] transition-colors">{isAr ? 'استثماراتي' : 'My Investments'}</Link>
        <ChevronLeft className="w-3 h-3" strokeWidth={1.5} />
        <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{inv.id}</span>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate('/app/portfolio')}
        className="flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors cursor-pointer"
        style={{ fontWeight: 500 }}
      >
        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        {isAr ? 'العودة إلى استثماراتي' : 'Back to My Investments'}
      </button>

      {/* ── Header Card ── */}
      <div className="rounded-2xl p-6 mb-6" style={cardStyle}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          {/* Left: Title + meta */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] text-white shrink-0" style={{ background: riskColor[inv.risk] || '#94A3B8', fontWeight: 700 }}>{inv.risk}</span>
              <h1 className="text-[22px] text-[#0F172A]" style={{ fontWeight: 700 }}>{isAr ? inv.project : inv.projectEn}</h1>
              {statusBadge(inv.status, isAr)}
            </div>
            <div className="text-[12px] text-[#94A3B8] font-mono">{inv.id}</div>
          </div>

          {/* Right: Export */}
          <button className="h-9 px-4 rounded-lg text-[12px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors cursor-pointer shrink-0 flex items-center gap-1.5" style={{ border: '1px solid #E2E8F0', fontWeight: 500 }}>
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
          { label: isAr ? 'العائد المتوقع' : 'Expected Return', value: formatPercentage(inv.roi), color: inv.returnPct >= 0 ? '#2BB673' : '#EF4444' },
          { label: isAr ? 'صافي العائد' : 'Net Return', value: `${inv.netReturn >= 0 ? '+' : ''}${formatSAR(inv.netReturn, { decimals: 0 })}`, color: inv.netReturn >= 0 ? '#2BB673' : '#EF4444' },
          { label: isAr ? 'تاريخ الاستثمار' : 'Invest Date', value: isAr ? inv.investDateAr : inv.investDate },
          { label: isAr ? 'الدفعة القادمة' : 'Next Payment', value: inv.nextPayment ? (isAr ? inv.nextPaymentAr : inv.nextPayment) : '—', color: inv.status === 'late' ? '#EF4444' : undefined },
        ].map((m, i) => (
          <div key={i} className="rounded-2xl p-4" style={cardStyle}>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.06em] mb-1.5" style={{ fontWeight: 600 }}>{m.label}</div>
            <div className="text-[16px] leading-tight" style={{ fontWeight: 700, color: m.color || '#0F172A', fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* ── Two Column: Agreement + Schedule ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Investment Agreement */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <h2 className="text-[15px] text-[#0F172A] mb-5" style={{ fontWeight: 700 }}>
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
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <span className="text-[12px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{row.label}</span>
                <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="mt-5 pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
            <div className="text-[12px] text-[#94A3B8] uppercase tracking-[0.06em] mb-3" style={{ fontWeight: 600 }}>
              {isAr ? 'المستندات' : 'Documents'}
            </div>
            <div className="space-y-2">
              {[
                { name: isAr ? 'اتفاقية الاستثمار' : 'Investment Agreement', size: 'PDF · 245 KB' },
                { name: isAr ? 'جدول السداد' : 'Repayment Schedule', size: 'PDF · 120 KB' },
              ].map((doc, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer" style={{ border: '1px solid #F1F5F9' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#EFF6FF' }}>
                    <FileText className="w-4 h-4 text-[#3B82F6]" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{doc.name}</div>
                    <div className="text-[11px] text-[#94A3B8]">{doc.size}</div>
                  </div>
                  <Download className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.6} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Repayment Schedule */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] text-[#0F172A]" style={{ fontWeight: 700 }}>
              {isAr ? 'جدول السداد' : 'Repayment Schedule'}
            </h2>
            <div className="text-[11px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
              {paidCount}/{totalScheduled} {isAr ? 'مسددة' : 'paid'}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden mb-5" style={{ background: '#F1F5F9' }}>
            <div className="h-full rounded-full" style={{ width: totalScheduled > 0 ? `${(paidCount / totalScheduled) * 100}%` : '0%', background: '#2BB673' }} />
          </div>

          {/* Table */}
          {inv.schedule.length > 0 ? (
            <div>
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 px-3 h-[32px] items-center text-[10px] uppercase tracking-[0.06em] text-[#94A3B8]" style={{ fontWeight: 600, background: '#FAFBFC', borderRadius: '8px' }}>
                <div className="col-span-3">{isAr ? 'الشهر' : 'Month'}</div>
                <div className="col-span-3">{isAr ? 'المبلغ' : 'Amount'}</div>
                <div className="col-span-2">{isAr ? 'أصل' : 'Principal'}</div>
                <div className="col-span-2">{isAr ? 'ربح' : 'Profit'}</div>
                <div className="col-span-2">{isAr ? 'الحالة' : 'Status'}</div>
              </div>

              {/* Rows */}
              {inv.schedule.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-2 items-center px-3 py-3 border-t"
                  style={{ borderColor: '#F1F5F9', background: row.status === 'current' ? '#FAFBFE' : 'transparent' }}
                >
                  <div className="col-span-3">
                    <div className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>{isAr ? row.monthAr : row.month}</div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">{isAr ? row.dateAr : row.date}</div>
                  </div>
                  <div className="col-span-3 text-[12px] text-[#0F172A]" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {formatSAR(row.amount, { decimals: 0 })}
                  </div>
                  <div className="col-span-2 text-[11px] text-[#64748B]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {formatSAR(row.principal, { decimals: 0 })}
                  </div>
                  <div className="col-span-2 text-[11px] text-[#2BB673]" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {formatSAR(row.profit, { decimals: 0 })}
                  </div>
                  <div className="col-span-2">
                    {statusBadge(row.status, isAr)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[13px] text-[#94A3B8]">
              {isAr ? 'لا توجد دفعات بعد' : 'No payments scheduled yet'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
