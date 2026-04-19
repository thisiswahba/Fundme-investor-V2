import { useState, useRef, useEffect } from 'react';
import { formatSAR } from '../utils/currency';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from '../components/fundme';
import { WithdrawModal } from '../components/WithdrawModal';
import { AddFundsModal } from '../components/AddFundsModal';
import {
  Wallet, Plus, ArrowDownToLine, Building2, CreditCard, Download,
  ArrowUpRight, ArrowDownRight, Briefcase, TrendingUp, MoreHorizontal,
  Shield, Clock, Filter, ChevronDown, Trash2, Star, X, CheckCircle,
  AlertCircle,
} from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Persona-aware tokens (mirrors VIP overview palette)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Tokens = ReturnType<typeof buildTokens>;

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      cardBg: colors.dark.card,
      cardBorder: `1px solid ${colors.dark.border}`,
      rowHover: colors.dark.hover,
      rowDivider: colors.dark.borderSubtle,
      sectionDivider: colors.dark.border,
      innerSurface: colors.dark.elevated,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      depositBg: colors.successBg,
      depositColor: '#34D399',
      returnBg: colors.successBg,
      returnColor: '#34D399',
      investmentBg: 'rgba(37,99,235,0.15)',
      investmentColor: '#60A5FA',
      withdrawalBg: colors.dangerBg,
      withdrawalColor: '#F87171',
      feeBg: colors.dark.hover,
      feeColor: colors.textOnDark.tertiary,
      completedBg: colors.successBg,
      completedColor: '#34D399',
      processingBg: 'rgba(245,158,11,0.15)',
      processingColor: '#FBBF24',
      primary: colors.primary,
      primaryText: colors.primaryHover,
      primarySoft: 'rgba(37,99,235,0.12)',
      primarySoftBorder: '1px solid rgba(96,165,250,0.3)',
      bankPrimaryBg: 'rgba(37,99,235,0.15)',
      bankPrimaryIcon: '#60A5FA',
      bankSecondaryBg: colors.dark.hover,
      bankSecondaryIcon: colors.textOnDark.tertiary,
      countPillBg: colors.dark.hover,
      countPillColor: colors.textOnDark.secondary,
      filterActiveBg: colors.primary,
      filterActiveColor: '#fff',
      filterInactiveColor: colors.textOnDark.tertiary,
      filterInactiveBorder: `1px solid ${colors.dark.border}`,
      groupHeaderColor: colors.textOnDark.muted,
      heroGradient: `linear-gradient(135deg, ${colors.dark.base} 0%, #0F2A4D 50%, #143766 100%)`,
      trashHoverBg: 'rgba(220,38,38,0.12)',
      secondaryBtnBorder: `1px solid ${colors.dark.border}`,
      secondaryBtnText: colors.textOnDark.secondary,
      secondaryBtnHover: colors.dark.hover,
      amountPrimary: colors.textOnDark.primary,
    };
  }
  return {
    isVIP: false,
    cardBg: '#FFFFFF',
    cardBorder: '1px solid #E5E7EB',
    rowHover: '#FAFBFC',
    rowDivider: '#F8FAFC',
    sectionDivider: '#F1F5F9',
    innerSurface: '#F8FAFC',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textFaint: '#CBD5E1',
    depositBg: '#F0FDF4',
    depositColor: '#16A34A',
    returnBg: '#F0FDF4',
    returnColor: '#16A34A',
    investmentBg: '#EFF6FF',
    investmentColor: '#1D4ED8',
    withdrawalBg: '#FEF2F2',
    withdrawalColor: '#DC2626',
    feeBg: '#F8FAFC',
    feeColor: '#94A3B8',
    completedBg: '#F0FDF4',
    completedColor: '#16A34A',
    processingBg: '#FEF3C7',
    processingColor: '#D97706',
    primary: '#1D4ED8',
    primaryText: '#1D4ED8',
    primarySoft: '#EFF6FF',
    primarySoftBorder: '1px solid #DBEAFE',
    bankPrimaryBg: '#EFF6FF',
    bankPrimaryIcon: '#1D4ED8',
    bankSecondaryBg: '#F8FAFC',
    bankSecondaryIcon: '#94A3B8',
    countPillBg: '#F8FAFC',
    countPillColor: '#94A3B8',
    filterActiveBg: '#0F172A',
    filterActiveColor: '#fff',
    filterInactiveColor: '#94A3B8',
    filterInactiveBorder: '1px solid #F1F5F9',
    groupHeaderColor: '#CBD5E1',
    heroGradient: 'linear-gradient(135deg, #0B1F3A 0%, #0F2A4D 50%, #143766 100%)',
    trashHoverBg: '#FEF2F2',
    secondaryBtnBorder: '1px solid #E5E7EB',
    secondaryBtnText: '#64748B',
    secondaryBtnHover: '#F8FAFC',
    amountPrimary: '#0F172A',
  };
}

function useTokens(): Tokens {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

import { bankAccounts } from '../utils/bankAccounts';

type TxType = 'deposit' | 'investment' | 'return' | 'withdrawal' | 'fee';
type TxStatus = 'completed' | 'processing' | 'pending';
type TxGroup = 'today' | 'yesterday' | 'earlier';

interface Transaction {
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
  group: TxGroup;
}

const transactions: Transaction[] = [
  // ── Today ──────────────────────────────────
  {
    type: 'deposit',
    title: 'إيداع من حساب بنكي',
    titleEn: 'Bank Deposit',
    detail: 'البنك الأهلي •••• ١٢٣٤',
    detailEn: 'Al Ahli •••• 1234',
    amount: 100000,
    date: '٦ أبريل ٢٠٢٦',
    dateEn: 'Apr 6, 2026',
    time: '٣:٤٥م',
    timeEn: '3:45 PM',
    status: 'completed',
    group: 'today',
  },
  {
    type: 'investment',
    title: 'استثمار في مشروع عقاري',
    titleEn: 'Real Estate Investment',
    detail: 'تمويل مشروع سكني - الدمام',
    detailEn: 'Residential Project — Dammam',
    amount: -50000,
    date: '٦ أبريل ٢٠٢٦',
    dateEn: 'Apr 6, 2026',
    time: '١٠:٣٠ص',
    timeEn: '10:30 AM',
    status: 'completed',
    group: 'today',
  },

  // ── Yesterday ──────────────────────────────
  {
    type: 'return',
    title: 'عائد استثماري',
    titleEn: 'Investment Return',
    detail: 'صندوق التجزئة الإلكترونية',
    detailEn: 'E-Commerce Fund',
    amount: 8500,
    date: '٥ أبريل ٢٠٢٦',
    dateEn: 'Apr 5, 2026',
    time: '٩:١٥ص',
    timeEn: '9:15 AM',
    status: 'completed',
    group: 'yesterday',
  },

  // ── Earlier ────────────────────────────────
  {
    type: 'withdrawal',
    title: 'سحب إلى حساب بنكي',
    titleEn: 'Bank Withdrawal',
    detail: 'بنك الراجحي •••• ٥٦٧٨',
    detailEn: 'Al Rajhi •••• 5678',
    amount: -25000,
    date: '٣ أبريل ٢٠٢٦',
    dateEn: 'Apr 3, 2026',
    time: '٢:٢٠م',
    timeEn: '2:20 PM',
    status: 'processing',
    group: 'earlier',
  },
  {
    type: 'return',
    title: 'عائد استثماري',
    titleEn: 'Investment Return',
    detail: 'مشروع صناعي - جدة',
    detailEn: 'Industrial — Jeddah',
    amount: 6800,
    date: '٢ أبريل ٢٠٢٦',
    dateEn: 'Apr 2, 2026',
    time: '١١:٠٠ص',
    timeEn: '11:00 AM',
    status: 'completed',
    group: 'earlier',
  },
  {
    type: 'fee',
    title: 'رسوم المنصة',
    titleEn: 'Platform Fee',
    detail: 'رسوم شهرية',
    detailEn: 'Monthly fee',
    amount: -150,
    date: '١ أبريل ٢٠٢٦',
    dateEn: 'Apr 1, 2026',
    time: '١٢:٠٠ص',
    timeEn: '12:00 AM',
    status: 'completed',
    group: 'earlier',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function txIcon(type: string, t: Tokens) {
  switch (type) {
    case 'deposit': return { Icon: ArrowDownRight, bg: t.depositBg, color: t.depositColor };
    case 'return': return { Icon: TrendingUp, bg: t.returnBg, color: t.returnColor };
    case 'investment': return { Icon: Briefcase, bg: t.investmentBg, color: t.investmentColor };
    case 'withdrawal': return { Icon: ArrowUpRight, bg: t.withdrawalBg, color: t.withdrawalColor };
    case 'fee': return { Icon: Clock, bg: t.feeBg, color: t.feeColor };
    default: return { Icon: Wallet, bg: t.feeBg, color: t.textSecondary };
  }
}

function txAmountColor(type: string, t: Tokens) {
  switch (type) {
    case 'deposit': case 'return': return t.depositColor;
    case 'investment': return t.investmentColor;
    case 'withdrawal': return t.withdrawalColor;
    case 'fee': return t.textMuted;
    default: return t.amountPrimary;
  }
}

function statusChip(status: string, isAr: boolean, t: Tokens) {
  if (status === 'completed') return { label: isAr ? 'مكتمل' : 'Completed', bg: t.completedBg, color: t.completedColor };
  if (status === 'processing') return { label: isAr ? 'قيد المعالجة' : 'Processing', bg: t.processingBg, color: t.processingColor };
  return { label: status, bg: t.feeBg, color: t.textSecondary };
}

// ─── Add Bank Account Modal ──────────────────────────────────────────────────

function AddBankModal({ open, onClose, isAr }: { open: boolean; onClose: () => void; isAr: boolean }) {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [iban, setIban] = useState('SA');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setStep('form'); setIban('SA'); setTimeout(() => inputRef.current?.focus(), 150); }
  }, [open]);

  const formatIban = (raw: string) => raw.replace(/(.{4})/g, '$1 ').trim();
  const handleChange = (val: string) => {
    const clean = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 24);
    // Ensure SA prefix is always present
    if (!clean.startsWith('SA')) {
      setIban('SA' + clean.replace(/^S?A?/, ''));
      return;
    }
    setIban(clean);
  };

  const isValid = iban.length === 24 && iban.startsWith('SA');
  const progress = Math.min((iban.length / 24) * 100, 100);

  const handleSubmit = () => { setStep('loading'); setTimeout(() => setStep('success'), 2000); };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && step !== 'loading') onClose(); }}
    >
      <div className="bg-white w-full max-w-[480px] rounded-[20px] overflow-hidden" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }} dir={isAr ? 'rtl' : 'ltr'}>

        {/* ── Form ── */}
        {step === 'form' && (
          <div>
            {/* Branded header illustration */}
            <div className="relative h-[140px] overflow-hidden" style={{ background: 'linear-gradient(155deg, #0F2A44 0%, #1D4ED8 100%)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
                  <defs><pattern id="bankDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#bankDots)" />
                </svg>
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full opacity-[0.08]" style={{ backgroundColor: '#fff' }} />
                <div className="absolute bottom-[-20px] right-[-10px] w-40 h-40 rounded-full opacity-[0.05]" style={{ backgroundColor: '#fff' }} />
                <svg className="absolute bottom-0 left-0 w-full h-10 opacity-[0.06]" viewBox="0 0 480 40" fill="none">
                  <path d="M0 30 Q120 10 240 20 T480 15" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                  <Building2 className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <div className="text-[16px] text-white" style={{ fontWeight: 700 }}>{isAr ? 'ربط حساب بنكي' : 'Link Bank Account'}</div>
                <div className="text-[12px] text-white/60 mt-0.5">{isAr ? 'أدخل رقم الآيبان الخاص بك' : 'Enter your IBAN number'}</div>
              </div>
              {/* Close button */}
              <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <X className="w-4 h-4 text-white/70" strokeWidth={1.5} />
              </button>
            </div>

            {/* IBAN input area */}
            <div className="px-6 pt-6 pb-2">
              <div
                className="rounded-[16px] p-5 transition-all duration-300"
                style={{
                  border: focused ? '2px solid #1D4ED8' : isValid ? '2px solid #16A34A' : '1px solid #E5E7EB',
                  boxShadow: focused ? '0 0 0 4px rgba(29,78,216,0.06)' : isValid ? '0 0 0 4px rgba(22,163,74,0.06)' : 'none',
                }}
              >
                {/* Label row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] transition-colors duration-200" style={{ fontWeight: 500, color: focused ? '#1D4ED8' : '#94A3B8' }}>IBAN</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono" style={{ color: isValid ? '#16A34A' : '#CBD5E1' }}>{iban.length}/24</span>
                    {iban.length > 0 && (
                      <div className="transition-all duration-200">
                        {isValid
                          ? <CheckCircle className="w-4 h-4 text-[#16A34A]" strokeWidth={1.5} />
                          : <AlertCircle className="w-4 h-4 text-[#CBD5E1]" strokeWidth={1.5} />
                        }
                      </div>
                    )}
                  </div>
                </div>

                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={formatIban(iban)}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="SA00 0000 0000 0000 0000 00"
                  className="w-full text-[20px] text-[#0F172A] outline-none bg-transparent font-mono tracking-[0.12em] placeholder:text-[#E2E8F0] placeholder:tracking-[0.08em]"
                  style={{ fontWeight: 700 }}
                  dir="ltr"
                />

                {/* Progress bar */}
                <div className="mt-4 h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: '#F1F5F9' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: isValid ? '#16A34A' : '#1D4ED8',
                    }}
                  />
                </div>
              </div>

              {/* Helper text */}
              <div className="text-[11px] text-[#CBD5E1] text-center mt-3 mb-4" style={{ fontWeight: 500 }}>
                {isAr ? 'يبدأ بـ SA ويتكون من ٢٤ حرفاً ورقماً' : 'Starts with SA, 24 alphanumeric characters'}
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-4 py-3 rounded-[10px] mb-2" style={{ backgroundColor: '#F8FAFC' }}>
                <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  <Shield className="w-3 h-3" strokeWidth={1.5} />
                  {isAr ? 'اتصال آمن' : 'Secure'}
                </span>
                <span className="w-px h-3" style={{ backgroundColor: '#E5E7EB' }} />
                <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  <CheckCircle className="w-3 h-3" strokeWidth={1.5} />
                  {isAr ? 'تحقق تلقائي' : 'Auto-verified'}
                </span>
                <span className="w-px h-3" style={{ backgroundColor: '#E5E7EB' }} />
                <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  <Shield className="w-3 h-3" strokeWidth={1.5} />
                  {isAr ? 'بدون رسوم' : 'No charges'}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-6 py-5 border-t" style={{ borderColor: '#F1F5F9' }}>
              <button onClick={onClose} className="flex-1 h-11 rounded-[12px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontWeight: 600, border: '1px solid #E5E7EB' }}>
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex-1 h-11 rounded-[12px] text-[13px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{ backgroundColor: isValid ? '#1D4ED8' : '#CBD5E1', fontWeight: 600, cursor: isValid ? 'pointer' : 'not-allowed' }}
              >
                {isAr ? 'ربط الحساب' : 'Link Account'}
              </button>
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {step === 'loading' && (
          <div className="px-6 py-16 text-center">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#EFF6FF' }} />
              <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#1D4ED8' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#1D4ED8]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-[16px] text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>
              {isAr ? 'جارٍ التحقق...' : 'Verifying...'}
            </div>
            <div className="text-[12px] text-[#94A3B8]">
              {isAr ? 'نتحقق من رقم الآيبان الخاص بك' : 'Checking your IBAN number'}
            </div>
          </div>
        )}

        {/* ── Success ── */}
        {step === 'success' && (
          <div className="px-6 py-10 text-center">
            <div className="w-18 h-18 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: '#F0FDF4' }}>
              <CheckCircle className="w-9 h-9 text-[#16A34A]" strokeWidth={1.5} />
            </div>
            <div className="text-[20px] text-[#0F172A] mb-2" style={{ fontWeight: 700 }}>
              {isAr ? 'تم ربط الحساب!' : 'Account Linked!'}
            </div>
            <p className="text-[13px] text-[#64748B] mb-6">{isAr ? 'حسابك البنكي جاهز للاستخدام' : 'Your bank account is ready to use'}</p>

            {/* Preview card */}
            <div className="flex items-center gap-3 p-4 rounded-[14px] mx-2 mb-8" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E5E7EB' }}>
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                <Building2 className="w-5 h-5 text-[#1D4ED8]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-right">
                <div className="text-[13px] text-[#0F172A] font-mono tracking-wider" dir="ltr" style={{ fontWeight: 600 }}>
                  {iban.slice(0, 4)} •••• •••• {iban.slice(-4)}
                </div>
                <div className="text-[10px] text-[#16A34A] mt-0.5" style={{ fontWeight: 500 }}>
                  {isAr ? 'تم التحقق' : 'Verified'}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full h-12 rounded-[12px] text-[14px] text-white active:scale-[0.98] transition-all"
              style={{ backgroundColor: '#1D4ED8', fontWeight: 600 }}
            >
              {isAr ? 'تم' : 'Done'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Component ───────────────────────────────────────────────────────────────

export function WalletPage() {
  const { t, lang } = useI18n();
  const isAr = lang === 'ar';
  const { persona } = usePersona();
  const tk = useTokens();
  const wallet = {
    available: persona.wallet.available,
    pending: persona.wallet.pending,
    total: persona.wallet.total,
    lastTransaction: persona.wallet.lastTransactionAr,
    lastTransactionEn: persona.wallet.lastTransactionEn,
  };
  const [filter, setFilter] = useState('all');
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const groups = [
    { key: 'today', label: isAr ? 'اليوم' : 'Today' },
    { key: 'yesterday', label: isAr ? 'أمس' : 'Yesterday' },
    { key: 'earlier', label: isAr ? 'سابقاً' : 'Earlier' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      {/* ═══ 1. WALLET OVERVIEW — Hero (matches overview wallet) ═══ */}
      <section
        className="relative rounded-[20px] overflow-hidden mb-8"
        style={{ background: tk.heroGradient, border: tk.isVIP ? tk.cardBorder : undefined }}
      >
        {/* Decorative circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        />

        <div className="relative flex flex-col items-start gap-4 p-6 lg:p-8">
          {/* Wallet Icon + Label */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
            >
              <Wallet className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[14px] text-white/80" style={{ fontWeight: 500 }}>
              {isAr ? 'المحفظة' : 'Wallet'}
            </span>
          </div>

          {/* Balance */}
          <div
            className="text-[56px] lg:text-[64px] leading-none text-white"
            dir="ltr"
            style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            {formatSAR(wallet.available)}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-1">
            <button
              onClick={() => setAddFundsOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
              }}
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span>{isAr ? 'إضافة أموال' : 'Add Funds'}</span>
            </button>

            <button
              onClick={() => setWithdrawOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              <ArrowDownToLine className="w-4 h-4" strokeWidth={2.5} />
              <span>{isAr ? 'سحب' : 'Withdraw'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. BANK ACCOUNTS ═══ */}
      <section className="mb-8">
        <div className="rounded-[16px] overflow-hidden" style={{ background: tk.cardBg, border: tk.cardBorder }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: tk.sectionDivider }}>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{isAr ? 'الحسابات البنكية' : 'Bank Accounts'}</h2>
              <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: tk.countPillBg, color: tk.countPillColor, fontWeight: 500 }}>{bankAccounts.length}</span>
            </div>
            <button
              onClick={() => setAddBankOpen(true)}
              className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11px] transition-colors"
              style={{ fontWeight: 600, border: tk.primarySoftBorder, color: tk.primaryText }}
              onMouseEnter={e => (e.currentTarget.style.background = tk.primarySoft)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Plus className="w-3 h-3" strokeWidth={2} />
              {isAr ? 'إضافة' : 'Add'}
            </button>
          </div>

          {/* Account rows */}
          {bankAccounts.map((acc, i) => (
            <div
              key={acc.id}
              className="flex items-center gap-3 px-5 h-[60px] transition-colors"
              style={{ borderBottom: i < bankAccounts.length - 1 ? `1px solid ${tk.rowDivider}` : 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = tk.rowHover)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: acc.primary ? tk.bankPrimaryBg : tk.bankSecondaryBg }}>
                <Building2 className="w-4 h-4" style={{ color: acc.primary ? tk.bankPrimaryIcon : tk.bankSecondaryIcon }} strokeWidth={1.5} />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] truncate" style={{ fontWeight: 600, color: tk.textPrimary }}>{isAr ? acc.bank : acc.bankEn}</span>
                  {acc.primary && (
                    <span className="text-[9px] px-1.5 py-px rounded-full flex-shrink-0" style={{ backgroundColor: tk.primarySoft, color: tk.primaryText, fontWeight: 600 }}>
                      {isAr ? 'أساسي' : 'Primary'}
                    </span>
                  )}
                </div>
                <div className="text-[11px] mt-px font-mono" style={{ color: tk.textFaint }}>{acc.iban}</div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {!acc.primary && (
                  <button
                    className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                    title={isAr ? 'تعيين كأساسي' : 'Set primary'}
                    onMouseEnter={e => (e.currentTarget.style.background = tk.innerSurface)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Star className="w-3 h-3" strokeWidth={1.5} style={{ color: tk.textFaint }} />
                  </button>
                )}
                <button
                  className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                  title={isAr ? 'حذف' : 'Remove'}
                  onMouseEnter={e => (e.currentTarget.style.background = tk.trashHoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Trash2 className="w-3 h-3" strokeWidth={1.5} style={{ color: tk.textFaint }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. TRANSACTION HISTORY ═══ */}
      <section className="rounded-[16px] overflow-hidden" style={{ background: tk.cardBg, border: tk.cardBorder }}>

        {/* Header */}
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px]" style={{ fontWeight: 700, color: tk.textPrimary }}>
              {isAr ? 'سجل العمليات' : 'Transaction History'}
            </h2>
            <button
              className="h-7 px-3 rounded-md flex items-center gap-1.5 text-[11px] transition-colors"
              style={{ fontWeight: 500, border: tk.secondaryBtnBorder, color: tk.secondaryBtnText }}
              onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Download className="w-3 h-3" strokeWidth={1.5} />
              {isAr ? 'تصدير' : 'Export'}
            </button>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-1.5">
            {[
              { key: 'all', label: isAr ? 'الكل' : 'All' },
              { key: 'deposit', label: isAr ? 'إيداع' : 'Deposits' },
              { key: 'investment', label: isAr ? 'استثمار' : 'Investments' },
              { key: 'return', label: isAr ? 'عوائد' : 'Returns' },
              { key: 'withdrawal', label: isAr ? 'سحب' : 'Withdrawals' },
              { key: 'fee', label: isAr ? 'رسوم' : 'Fees' },
            ].map((chip) => {
              const isActive = filter === chip.key;
              return (
                <button
                  key={chip.key}
                  onClick={() => setFilter(chip.key)}
                  className="h-7 px-3 rounded-full text-[11px] transition-all"
                  style={{
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive ? tk.filterActiveBg : 'transparent',
                    color: isActive ? tk.filterActiveColor : tk.filterInactiveColor,
                    border: isActive ? 'none' : tk.filterInactiveBorder,
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ backgroundColor: tk.sectionDivider }} />

        {/* Grouped transactions */}
        {groups.map((group) => {
          const items = transactions.filter((tx) =>
            tx.group === group.key && (filter === 'all' || tx.type === filter)
          );
          if (items.length === 0) return null;

          return (
            <div key={group.key}>
              {/* Date group header */}
              <div className="h-8 flex items-center px-6 text-[10px] uppercase tracking-wider" style={{ fontWeight: 600, color: tk.groupHeaderColor }}>
                {group.label}
              </div>

              {/* Transaction rows — compact */}
              {items.map((tx, i) => {
                const { Icon, bg, color } = txIcon(tx.type, tk);
                const sc = statusChip(tx.status, isAr, tk);
                const isIncoming = tx.amount > 0;

                return (
                  <div
                    key={`${group.key}-${i}`}
                    className="flex items-center gap-3 px-6 h-[60px] transition-colors cursor-pointer"
                    style={{ borderBottom: `1px solid ${tk.rowDivider}` }}
                    onMouseEnter={e => (e.currentTarget.style.background = tk.rowHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon className="w-[15px] h-[15px]" style={{ color }} strokeWidth={1.5} />
                    </div>

                    {/* Title + detail + date */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] truncate" style={{ fontWeight: 600, color: tk.textPrimary }}>
                          {isAr ? tx.title : tx.titleEn}
                        </span>
                        {tx.status !== 'completed' && (
                          <span
                            className="text-[9px] px-1.5 py-px rounded-full flex-shrink-0"
                            style={{ backgroundColor: sc.bg, color: sc.color, fontWeight: 600 }}
                          >
                            {sc.label}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] mt-px truncate" style={{ color: tk.textFaint }}>
                        {isAr ? tx.detail : tx.detailEn}
                        <span className="hidden sm:inline"> · {isAr ? tx.time : tx.timeEn}</span>
                      </div>
                    </div>

                    {/* Amount — largest element */}
                    <div className="flex-shrink-0 text-left">
                      <span
                        className="text-[16px] tabular-nums"
                        style={{ fontWeight: 700, color: txAmountColor(tx.type, tk) }}
                      >
                        {isIncoming ? '+' : '-'}
                        <span className="text-[16px]">{formatSAR(Math.abs(tx.amount), { decimals: 0, showCurrency: false })}</span>
                        <span className="text-[11px] mr-0.5 opacity-60" style={{ fontWeight: 500 }}> ﷼</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty state */}
        {transactions.filter(tx => filter === 'all' || tx.type === filter).length === 0 && (
          <div className="py-16 text-center">
            <Wallet className="w-8 h-8 mx-auto mb-2" strokeWidth={1.5} style={{ color: tk.textFaint }} />
            <div className="text-[12px]" style={{ fontWeight: 500, color: tk.textFaint }}>
              {isAr ? 'لا توجد عمليات' : 'No transactions found'}
            </div>
          </div>
        )}
      </section>

      {/* Add Bank Account Modal */}
      <AddBankModal open={addBankOpen} onClose={() => setAddBankOpen(false)} isAr={isAr} />
      <AddFundsModal open={addFundsOpen} onClose={() => setAddFundsOpen(false)} isAr={isAr} />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        availableBalance={wallet.available}
        bankAccounts={bankAccounts}
      />
    </div>
  );
}