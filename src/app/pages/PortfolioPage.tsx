import { formatSAR, formatPercentage, formatChartValue } from '../utils/currency';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useI18n } from '../i18n';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
} from 'recharts';
import {
  TrendingUp, DollarSign, Wallet, Zap, AlertTriangle, Clock,
  CheckCircle, Eye, RefreshCw, Rocket, ShieldAlert, Briefcase,
  Calendar, Activity,
} from 'lucide-react';

const summary = {
  totalInvested: 440000,
  realizedReturns: 18000,
  avgReturn: 11.8,
  monthlyChange: 2.3,
  activeCount: 4,
};

const investments = [
  { id: 'INV-1042', project: 'تمويل مشروع عقاري - الرياض', amount: 150000, returnRate: 9.5, status: 'active' as const, nextPayment: 'خلال ٥ أيام' },
  { id: 'INV-1038', project: 'صندوق التجزئة الإلكترونية', amount: 100000, returnRate: 12.2, status: 'active' as const, nextPayment: 'خلال ١٢ يوم' },
  { id: 'INV-1035', project: 'تمويل شركة لوجستية', amount: 85000, returnRate: 8.7, status: 'late' as const, nextPayment: 'متأخر ٣ أيام' },
  { id: 'INV-1029', project: 'مشروع صناعي - جدة', amount: 105000, returnRate: 10.4, status: 'active' as const, nextPayment: 'خلال ٢٠ يوم' },
  { id: 'INV-1015', project: 'مطاعم وجبات سريعة', amount: 75000, returnRate: 11.8, status: 'completed' as const, nextPayment: 'مكتمل' },
];

const sparkline = [
  { v: 150 }, { v: 250 }, { v: 335 }, { v: 335 }, { v: 440 }, { v: 458 },
];

const growthData = [
  { month: 'يناير', invested: 150000, returns: 2400 },
  { month: 'فبراير', invested: 250000, returns: 5100 },
  { month: 'مارس', invested: 335000, returns: 8200 },
  { month: 'أبريل', invested: 335000, returns: 11400 },
  { month: 'مايو', invested: 440000, returns: 14800 },
  { month: 'يونيو', invested: 440000, returns: 18000 },
];

function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-md px-3 py-2 shadow-md border border-[#E5E7EB] text-[11px]">
      <div className="text-[#64748B] mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#64748B]">{p.name}</span>
          <span className="text-[#0F172A] font-semibold">{formatSAR(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function statusColor(s: string) {
  if (s === 'late') return '#DC2626';
  if (s === 'completed') return '#64748B';
  return '#1D4ED8';
}

export function PortfolioPage() {
  const { t } = useI18n();
  const total = summary.totalInvested + summary.realizedReturns;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 pb-24 md:pb-8">
      <section className="relative rounded-lg overflow-hidden mb-8 p-8" style={{ backgroundColor: '#0F2A44' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-[0.04]" style={{ backgroundColor: '#1D4ED8' }} />
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full opacity-[0.06]" style={{ backgroundColor: '#1D4ED8' }} />
          <div className="absolute -bottom-10 right-40 w-32 h-32 rounded-full opacity-[0.03]" style={{ backgroundColor: '#fff' }} />
          <svg className="absolute bottom-0 left-0 w-full h-20 opacity-[0.05]" viewBox="0 0 400 80" fill="none">
            <path d="M0 60 Q100 20 200 40 T400 30" stroke="white" strokeWidth="1.5" />
            <path d="M0 70 Q100 40 200 55 T400 45" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[13px] uppercase tracking-[0.1em] text-white/50 mb-3" style={{ fontWeight: 500 }}>{t('portfolio.title')}</h1>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[44px] text-white leading-none" style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>{formatSAR(total)}</span>
              <span className="text-[13px] text-[#16A34A]" style={{ fontWeight: 600 }}>{formatPercentage(summary.monthlyChange)} {t('portfolio.thisMonth')}</span>
            </div>
            <p className="text-[12px] text-white/40">{t('portfolio.subtitle')}</p>
          </div>
          <div className="w-[100px] h-[40px] opacity-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkline}><Line type="monotone" dataKey="v" stroke="#fff" strokeWidth={1.5} dot={false} /></LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="flex items-center gap-2 mb-8 h-[44px] px-4 rounded-lg" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-1.5 h-7 px-3 rounded text-[11px] bg-white border border-[#FECACA] text-[#DC2626]" style={{ fontWeight: 500 }}><ShieldAlert className="w-3 h-3" strokeWidth={1.5} />1 {t('portfolio.overdue')}</div>
        <div className="flex items-center gap-1.5 h-7 px-3 rounded text-[11px] bg-white border border-[#FDE68A] text-[#F59E0B]" style={{ fontWeight: 500 }}><Clock className="w-3 h-3" strokeWidth={1.5} />2 {t('portfolio.upcoming')}</div>
        <div className="flex items-center gap-1.5 h-7 px-3 rounded text-[11px] bg-white border border-[#BBF7D0] text-[#16A34A]" style={{ fontWeight: 500 }}><CheckCircle className="w-3 h-3" strokeWidth={1.5} />1 {t('portfolio.received')}</div>
        <div className="flex-1" />
        <span className="text-[10px] text-[#64748B]">{t('portfolio.totalDue')}: {formatSAR(25050, { showCurrency: false })}</span>
      </section>

      <section className="flex items-center gap-3 mb-8">
        <button className="h-10 flex items-center gap-2 px-5 rounded-lg text-[13px] text-white transition-colors" style={{ backgroundColor: '#0F2A44', fontWeight: 600 }}><Rocket className="w-4 h-4" strokeWidth={1.5} />{t('portfolio.investNow')}</button>
        <button className="h-10 flex items-center gap-2 px-4 rounded-lg text-[13px] text-[#64748B] bg-white border transition-colors" style={{ borderColor: '#E5E7EB', fontWeight: 500 }}><Wallet className="w-4 h-4 text-[#64748B]" strokeWidth={1.5} />{t('portfolio.addFunds')}</button>
        <button className="hidden sm:flex h-10 items-center gap-2 px-4 rounded-lg text-[13px] text-[#64748B] bg-white border transition-colors" style={{ borderColor: '#E5E7EB', fontWeight: 500 }}><Zap className="w-4 h-4 text-[#64748B]" strokeWidth={1.5} />{t('portfolio.autoInvest')}</button>
      </section>

      <section className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 sm:col-span-6 bg-white rounded-lg p-5" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mb-2" style={{ fontWeight: 500 }}><DollarSign className="w-3.5 h-3.5" strokeWidth={1.5} />{t('portfolio.totalInvested')}</div>
              <div className="text-[28px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(summary.totalInvested)}</div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F8FAFC' }}><Briefcase className="w-5 h-5 text-[#64748B]" strokeWidth={1.5} /></div>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 bg-white rounded-lg p-4" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mb-2" style={{ fontWeight: 500 }}><TrendingUp className="w-3.5 h-3.5" strokeWidth={1.5} />{t('portfolio.returns')}</div>
          <div className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(summary.realizedReturns)}</div>
          <div className="text-[10px] text-[#16A34A] mt-1" style={{ fontWeight: 500 }}>{formatPercentage(summary.avgReturn)} {t('portfolio.avgReturn')}</div>
        </div>
        <div className="col-span-6 sm:col-span-3 bg-white rounded-lg p-4" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mb-2" style={{ fontWeight: 500 }}><Activity className="w-3.5 h-3.5" strokeWidth={1.5} />{t('portfolio.active')}</div>
          <div className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>{summary.activeCount}</div>
          <div className="text-[10px] text-[#64748B] mt-1" style={{ fontWeight: 500 }}>{t('portfolio.outOf')} {investments.length}</div>
        </div>
      </section>

      <section className="bg-white rounded-lg overflow-hidden mb-8" style={{ border: '1px solid #E5E7EB' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#E5E7EB' }}><h2 className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>{t('portfolio.allInvestments')}</h2></div>
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-6 px-6 h-[36px] items-center text-[10px] uppercase tracking-wide text-[#64748B] border-b" style={{ fontWeight: 500, borderColor: '#F8FAFC' }}>
            <div className="col-span-4">{t('portfolio.opportunity')}</div><div className="col-span-2">{t('portfolio.amount')}</div><div className="col-span-2">{t('portfolio.return')}</div><div className="col-span-2">{t('portfolio.status')}</div><div className="col-span-2">{t('portfolio.nextPayment')}</div>
          </div>
          {investments.map((inv) => (
            <div key={inv.id} className="grid grid-cols-12 gap-6 items-center px-6 h-[68px] border-b relative hover:bg-[#FAFBFC] transition-colors" style={{ borderColor: '#F8FAFC' }}>
              <div className="absolute right-0 top-[14px] bottom-[14px] w-[3px] rounded-full" style={{ backgroundColor: statusColor(inv.status) }} />
              <div className="col-span-4 pr-3"><div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{inv.project}</div><div className="text-[10px] text-[#64748B] mt-0.5">{inv.id}</div></div>
              <div className="col-span-2 text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(inv.amount)}</div>
              <div className="col-span-2 text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{formatPercentage(inv.returnRate)}</div>
              <div className="col-span-2"><StatusBadge status={inv.status} /></div>
              <div className="col-span-2 flex items-center justify-between">
                <span className={`text-[11px] flex items-center gap-1 ${inv.status === 'late' ? 'text-[#DC2626]' : 'text-[#64748B]'}`} style={{ fontWeight: inv.status === 'late' ? 600 : 400 }}>{inv.status === 'late' && <AlertTriangle className="w-3 h-3" strokeWidth={1.5} />}{inv.nextPayment}</span>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F8FAFC]"><Eye className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.5} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden">
          {investments.map((inv) => (
            <div key={inv.id} className="p-4 border-b relative" style={{ borderColor: '#F8FAFC' }}>
              <div className="absolute right-0 top-3 bottom-3 w-[3px] rounded-full" style={{ backgroundColor: statusColor(inv.status) }} />
              <div className="flex items-start justify-between mb-2 pr-3">
                <div><div className="text-[13px] text-[#0F172A] truncate" style={{ fontWeight: 600 }}>{inv.project}</div><div className="flex items-center gap-2 mt-1"><span className="text-[10px] text-[#64748B]">{inv.id}</span><StatusBadge status={inv.status} /></div></div>
                <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{formatPercentage(inv.returnRate)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-2 border-t pr-3" style={{ borderColor: '#F8FAFC' }}><span>{formatSAR(inv.amount)}</span><span className={inv.status === 'late' ? 'text-[#DC2626] font-medium' : ''}>{inv.nextPayment}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg p-6 mb-8" style={{ border: '1px solid #E5E7EB' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>{t('portfolio.growth')}</h2>
          <div className="flex items-center gap-4 text-[10px] text-[#64748B]">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#1D4ED8' }} />{t('portfolio.invested')}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#16A34A' }} />{t('portfolio.returnsLabel')}</span>
          </div>
        </div>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="fillInv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.06} /><stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} /></linearGradient>
                <linearGradient id="fillRet" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16A34A" stopOpacity={0.08} /><stop offset="100%" stopColor="#16A34A" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatChartValue(v)} orientation="right" />
              <Tooltip content={<ChartTip />} cursor={{ stroke: '#E5E7EB', strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="invested" name={t('portfolio.invested')} stroke="#1D4ED8" strokeWidth={1.5} fill="url(#fillInv)" dot={false} activeDot={{ r: 3, fill: '#1D4ED8', strokeWidth: 1.5, stroke: '#fff' }} />
              <Area type="monotone" dataKey="returns" name={t('portfolio.returnsLabel')} stroke="#16A34A" strokeWidth={1.5} fill="url(#fillRet)" dot={false} activeDot={{ r: 3, fill: '#16A34A', strokeWidth: 1.5, stroke: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-4 flex items-start gap-3 p-4 rounded-lg bg-white" style={{ border: '1px solid #E5E7EB' }}><TrendingUp className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" strokeWidth={1.5} /><div><div className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>{t('portfolio.positive')}</div><div className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{formatPercentage(summary.avgReturn)} — +2% vs market</div></div></div>
        <div className="col-span-12 sm:col-span-4 flex items-start gap-3 p-4 rounded-lg bg-white" style={{ border: '1px solid #E5E7EB' }}><ShieldAlert className="w-4 h-4 text-[#DC2626] mt-0.5 flex-shrink-0" strokeWidth={1.5} /><div><div className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>{t('portfolio.riskAlert')}</div><div className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">Logistics — 3 days overdue</div></div></div>
        <div className="col-span-12 sm:col-span-4 flex items-start gap-3 p-4 rounded-lg bg-white" style={{ border: '1px solid #E5E7EB' }}><Rocket className="w-4 h-4 text-[#1D4ED8] mt-0.5 flex-shrink-0" strokeWidth={1.5} /><div><div className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>{t('portfolio.opportunity2')}</div><div className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{formatSAR(summary.realizedReturns)} ready to reinvest</div></div></div>
      </section>
    </div>
  );
}
