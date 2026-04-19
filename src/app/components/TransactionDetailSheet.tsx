import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ArrowDownRight, ArrowUpRight, Briefcase, TrendingUp, MoreHorizontal,
  Download, Copy, Calendar, Hash, FileText, CheckCircle, Clock, AlertCircle,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { formatSAR } from '../utils/currency';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';

export type TxType = 'deposit' | 'investment' | 'return' | 'withdrawal' | 'fee';
export type TxStatus = 'completed' | 'processing' | 'pending';

export interface TransactionLike {
  type: TxType;
  title: string;
  titleEn: string;
  detail: string;
  detailEn: string;
  amount: number;
  date: string;
  dateEn: string;
  time: string;
  timeEn: string;
  status: TxStatus;
}

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      surface: colors.dark.card,
      innerSurface: colors.dark.elevated,
      border: `1px solid ${colors.dark.border}`,
      divider: colors.dark.borderSubtle,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      iconBg: colors.dark.hover,
      iconColor: colors.textOnDark.tertiary,
      depositBg: 'rgba(43,182,115,0.15)', depositColor: '#34D399',
      returnBg: 'rgba(43,182,115,0.15)', returnColor: '#34D399',
      investmentBg: 'rgba(37,99,235,0.15)', investmentColor: '#60A5FA',
      withdrawalBg: 'rgba(220,38,38,0.15)', withdrawalColor: '#F87171',
      feeBg: colors.dark.hover, feeColor: colors.textOnDark.tertiary,
      completedBg: 'rgba(43,182,115,0.15)', completedColor: '#34D399',
      processingBg: 'rgba(245,158,11,0.15)', processingColor: '#FBBF24',
      pendingBg: 'rgba(220,38,38,0.15)', pendingColor: '#F87171',
      ctaBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      btnBorder: `1px solid ${colors.dark.border}`,
      btnHover: colors.dark.hover,
    };
  }
  return {
    isVIP: false,
    surface: '#FFFFFF',
    innerSurface: '#F8FAFC',
    border: '1px solid #EEF1F5',
    divider: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textFaint: '#CBD5E1',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    depositBg: '#ECFDF5', depositColor: '#059669',
    returnBg: '#ECFDF5', returnColor: '#059669',
    investmentBg: '#EFF6FF', investmentColor: '#1D4ED8',
    withdrawalBg: '#FEF2F2', withdrawalColor: '#DC2626',
    feeBg: '#F8FAFC', feeColor: '#94A3B8',
    completedBg: '#ECFDF5', completedColor: '#059669',
    processingBg: '#FEF3C7', processingColor: '#D97706',
    pendingBg: '#FEF2F2', pendingColor: '#DC2626',
    ctaBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    btnBorder: '1px solid #E5E7EB',
    btnHover: '#F8FAFC',
  };
}

function txIcon(type: TxType, t: ReturnType<typeof buildTokens>) {
  switch (type) {
    case 'deposit': return { Icon: ArrowDownRight, bg: t.depositBg, color: t.depositColor };
    case 'return': return { Icon: TrendingUp, bg: t.returnBg, color: t.returnColor };
    case 'investment': return { Icon: Briefcase, bg: t.investmentBg, color: t.investmentColor };
    case 'withdrawal': return { Icon: ArrowUpRight, bg: t.withdrawalBg, color: t.withdrawalColor };
    case 'fee': return { Icon: Clock, bg: t.feeBg, color: t.feeColor };
    default: return { Icon: MoreHorizontal, bg: t.feeBg, color: t.feeColor };
  }
}

function typeLabel(type: TxType, isAr: boolean): string {
  const map: Record<TxType, { ar: string; en: string }> = {
    deposit: { ar: 'إيداع', en: 'Deposit' },
    return: { ar: 'عائد', en: 'Return' },
    investment: { ar: 'استثمار', en: 'Investment' },
    withdrawal: { ar: 'سحب', en: 'Withdrawal' },
    fee: { ar: 'رسوم', en: 'Fee' },
  };
  return map[type][isAr ? 'ar' : 'en'];
}

function statusConfig(status: TxStatus, isAr: boolean, t: ReturnType<typeof buildTokens>) {
  switch (status) {
    case 'completed':
      return { label: isAr ? 'مكتملة' : 'Completed', bg: t.completedBg, color: t.completedColor, Icon: CheckCircle };
    case 'processing':
      return { label: isAr ? 'قيد المعالجة' : 'Processing', bg: t.processingBg, color: t.processingColor, Icon: Clock };
    case 'pending':
      return { label: isAr ? 'معلقة' : 'Pending', bg: t.pendingBg, color: t.pendingColor, Icon: AlertCircle };
  }
}

function FieldRow({ icon: Icon, label, labelEn, value, mono, monospace }: {
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  label: string;
  labelEn: string;
  value: React.ReactNode;
  mono?: boolean;
  monospace?: boolean;
}) {
  const { lang } = useI18n();
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');
  const isAr = lang === 'ar';
  return (
    <div className="flex items-start gap-3 py-3.5" style={{ borderBottom: `1px solid ${tk.divider}` }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: tk.innerSurface }}>
        <Icon className="w-3.5 h-3.5" strokeWidth={1.6} style={{ color: tk.iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase mb-0.5" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.08em' }}>
          {isAr ? label : labelEn}
        </div>
        <div
          className={`text-[13px] break-words ${mono || monospace ? 'font-mono tracking-wide' : ''}`}
          dir={mono || monospace ? 'ltr' : undefined}
          style={{ fontWeight: 600, color: tk.textPrimary, textAlign: mono || monospace ? (isAr ? 'right' : 'left') : undefined }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export function TransactionDetailSheet({ open, onClose, tx }: {
  open: boolean;
  onClose: () => void;
  tx: TransactionLike | null;
}) {
  const { lang, dir } = useI18n();
  const isAr = lang === 'ar';
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!tx) return null;

  const { Icon, bg, color } = txIcon(tx.type, tk);
  const sc = statusConfig(tx.status, isAr, tk);
  const isIncoming = tx.amount > 0;
  const reference = `${tx.type.toUpperCase().slice(0, 3)}-2026-${String(Math.abs(tx.amount)).slice(0, 4).padEnd(4, '0')}`;
  const sheetSide = dir === 'rtl' ? 'left-0' : 'right-0';
  const slideFrom = dir === 'rtl' ? -100 : 100;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150]"
            style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.aside
            initial={{ x: `${slideFrom}%` }}
            animate={{ x: 0 }}
            exit={{ x: `${slideFrom}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className={`fixed top-0 ${sheetSide} h-full w-full max-w-[440px] z-[151] flex flex-col`}
            style={{ background: tk.surface, borderInlineStart: tk.border, boxShadow: '-20px 0 60px rgba(15,23,42,0.18)' }}
            dir={dir}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: `1px solid ${tk.divider}` }}
            >
              <h2 className="text-[15px]" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>
                {isAr ? 'تفاصيل العملية' : 'Transaction Details'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                style={{ color: tk.textMuted, background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tk.btnHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Hero — icon + amount + status */}
              <div className="text-center mb-7">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon className="w-7 h-7" strokeWidth={1.5} style={{ color }} />
                </div>
                <div className="text-[10px] uppercase mb-1.5" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.1em' }}>
                  {typeLabel(tx.type, isAr)}
                </div>
                <div
                  className="text-[34px] tabular-nums leading-none mb-3"
                  style={{ fontWeight: 700, color: isIncoming ? tk.depositColor : tk.textPrimary, letterSpacing: '-0.02em' }}
                  dir="ltr"
                >
                  {isIncoming ? '+' : '−'}
                  {formatSAR(Math.abs(tx.amount), { decimals: 0, showCurrency: false })}
                  <span className="text-[15px] mx-1 opacity-60" style={{ fontWeight: 500 }}>﷼</span>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11px]"
                  style={{ fontWeight: 600, background: sc.bg, color: sc.color }}
                >
                  <sc.Icon className="w-3 h-3" strokeWidth={2.2} />
                  {sc.label}
                </span>
              </div>

              {/* Field rows */}
              <div>
                <FieldRow
                  icon={FileText}
                  label="الوصف"
                  labelEn="Description"
                  value={isAr ? tx.title : tx.titleEn}
                />
                <FieldRow
                  icon={Briefcase}
                  label="التفاصيل"
                  labelEn="Details"
                  value={isAr ? tx.detail : tx.detailEn}
                />
                <FieldRow
                  icon={Calendar}
                  label="التاريخ والوقت"
                  labelEn="Date & Time"
                  value={`${isAr ? tx.date : tx.dateEn} · ${isAr ? tx.time : tx.timeEn}`}
                />
                <FieldRow
                  icon={Hash}
                  label="الرقم المرجعي"
                  labelEn="Reference"
                  value={
                    <div className="flex items-center gap-2">
                      <span dir="ltr">{reference}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(reference)}
                        className="p-1 rounded-md transition-colors cursor-pointer"
                        style={{ color: tk.textMuted, background: 'transparent' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = tk.btnHover; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        title={isAr ? 'نسخ' : 'Copy'}
                      >
                        <Copy className="w-3 h-3" strokeWidth={1.8} />
                      </button>
                    </div>
                  }
                  monospace
                />
              </div>

              {/* Help text */}
              <p className="text-[11px] leading-relaxed mt-4" style={{ color: tk.textMuted }}>
                {isAr
                  ? 'إذا كان لديك أي استفسار حول هذه العملية، يمكنك تحميل الإيصال أو التواصل مع فريق الدعم.'
                  : 'If you have any question about this transaction, download the receipt or contact support.'}
              </p>
            </div>

            {/* Footer actions */}
            <div
              className="px-6 py-4 flex items-center gap-2 shrink-0"
              style={{ borderTop: `1px solid ${tk.divider}` }}
            >
              <button
                className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-[13px] text-white transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  fontWeight: 600,
                  background: tk.ctaBg,
                  boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
                }}
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                {isAr ? 'تحميل الإيصال' : 'Download Receipt'}
              </button>
              <button
                onClick={onClose}
                className="h-11 px-4 rounded-xl text-[12px] transition-colors cursor-pointer"
                style={{ fontWeight: 600, color: tk.textSecondary, border: tk.btnBorder, background: tk.surface }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tk.btnHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = tk.surface)}
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
