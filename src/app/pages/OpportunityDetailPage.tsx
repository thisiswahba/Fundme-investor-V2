import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowRight, ArrowLeft, Building2, Shield, CheckCircle,
  FileText, Users, Banknote, MapPin, Calendar,
  DollarSign, Repeat, AlertTriangle, Download,
  X, Info, Loader2, ShieldCheck, Plus,
  ArrowUpRight, TrendingUp, Receipt, Landmark,
  CalendarRange, FileStack, ChartLine, Cpu, Sparkles,
  ClockArrowUp, BadgeCheck, Layers, ScrollText,
} from 'lucide-react';
import { formatSAR } from '../utils/currency';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from '../components/fundme';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

// ─── Tokens ─────────────────────────────────────────────────────────────────

type Tokens = ReturnType<typeof buildTokens>;

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      cardBg: colors.dark.card,
      cardBorder: `1px solid ${colors.dark.border}`,
      cardShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
      cardHoverBorder: 'rgba(96,165,250,0.35)',
      innerSurface: colors.dark.elevated,
      innerBorder: colors.dark.border,
      divider: colors.dark.border,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      successBg: 'rgba(43,182,115,0.12)',
      successBorder: 'rgba(43,182,115,0.3)',
      successText: '#34D399',
      successDeep: '#6EE7B7',
      infoBg: 'rgba(37,99,235,0.12)',
      infoBorder: 'rgba(37,99,235,0.3)',
      infoText: '#60A5FA',
      dangerText: '#F87171',
      dangerBg: 'rgba(220,38,38,0.12)',
      warningText: '#FBBF24',
      primary: colors.primary,
      primaryHover: colors.primaryHover,
      primaryDisabledBg: 'rgba(255,255,255,0.1)',
      primaryDisabledColor: colors.textOnDark.muted,
      primaryShadow: '0 4px 16px rgba(37,99,235,0.35)',
      secondaryBtnBorder: `1px solid ${colors.dark.border}`,
      secondaryBtnHover: colors.dark.hover,
      tabActiveText: colors.textOnDark.primary,
      tabInactiveText: colors.textOnDark.tertiary,
      tabHoverText: colors.textOnDark.secondary,
      tabActiveBorder: '#60A5FA',
      tabBorder: colors.dark.border,
      progressTrack: colors.dark.hover,
      gridStroke: colors.dark.border,
      axisTick: colors.textOnDark.tertiary,
      chartStroke: '#60A5FA',
      chartFillStart: '#60A5FA',
      chartFillAlpha: 0.15,
      gradeActiveBg: colors.primary,
      gradeActiveText: '#fff',
      gradeInactiveBg: colors.dark.elevated,
      gradeInactiveText: colors.textOnDark.secondary,
      scheduleFutureBg: colors.dark.hover,
      scheduleFutureColor: colors.textOnDark.tertiary,
      scheduleCurrentRowBg: 'rgba(37,99,235,0.06)',
      timelineDotRing: 'rgba(37,99,235,0.2)',
      timelineFutureLine: colors.dark.border,
      timelinePastLine: 'rgba(43,182,115,0.3)',
      otpInputBorder: `1px solid ${colors.dark.border}`,
      otpInputActive: '2px solid #60A5FA',
      otpInputGlow: '0 0 0 3px rgba(96,165,250,0.15)',
      focusRingColor: 'rgba(96,165,250,0.15)',
      selectBg: colors.dark.elevated,
    };
  }
  return {
    isVIP: false,
    cardBg: '#FFFFFF',
    cardBorder: '1px solid #E5E7EB',
    cardShadow: '0 1px 2px rgba(0,0,0,0.04)',
    cardHoverBorder: '#BFDBFE',
    innerSurface: '#F8FAFC',
    innerBorder: '#E5E7EB',
    divider: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textFaint: '#CBD5E1',
    successBg: '#F0FDF4',
    successBorder: '#DCFCE7',
    successText: '#16A34A',
    successDeep: '#166534',
    infoBg: '#EFF6FF',
    infoBorder: '#DBEAFE',
    infoText: '#1D4ED8',
    dangerText: '#DC2626',
    dangerBg: '#FEF2F2',
    warningText: '#F59E0B',
    primary: '#1D4ED8',
    primaryHover: '#2563EB',
    primaryDisabledBg: '#CBD5E1',
    primaryDisabledColor: '#94A3B8',
    primaryShadow: '0 4px 16px rgba(29,78,216,0.2)',
    secondaryBtnBorder: '1px solid #E5E7EB',
    secondaryBtnHover: '#F8FAFC',
    tabActiveText: '#0F172A',
    tabInactiveText: '#94A3B8',
    tabHoverText: '#64748B',
    tabActiveBorder: '#3B82F6',
    tabBorder: '#E8ECF2',
    progressTrack: '#F1F5F9',
    gridStroke: '#F1F5F9',
    axisTick: '#94A3B8',
    chartStroke: '#1D4ED8',
    chartFillStart: '#1D4ED8',
    chartFillAlpha: 0.08,
    gradeActiveBg: '#1D4ED8',
    gradeActiveText: '#fff',
    gradeInactiveBg: '#F1F5F9',
    gradeInactiveText: '#64748B',
    scheduleFutureBg: '#F8FAFC',
    scheduleFutureColor: '#94A3B8',
    scheduleCurrentRowBg: '#FAFBFE',
    timelineDotRing: '#DBEAFE',
    timelineFutureLine: '#F1F5F9',
    timelinePastLine: '#D1FAE5',
    otpInputBorder: '1px solid #E5E7EB',
    otpInputActive: '2px solid #1D4ED8',
    otpInputGlow: '0 0 0 3px rgba(29,78,216,0.08)',
    focusRingColor: 'rgba(29,78,216,0.08)',
    selectBg: '#F8FAFC',
  };
}

function useTokens(): Tokens {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

// ─── Data ────────────────────────────────────────────────────────────────────

const opp = {
  title: 'تمويل مشروع سكني - الدمام',
  pitch: 'مجمع سكني فاخر في موقع استراتيجي بعائد مضمون',
  roi: 11.5,
  risk: 'B' as const,
  duration: 18,
  type: 'مرابحة عقارية',
  fundingPct: 68,
  targetAmount: 500000,
  raisedAmount: 340000,
  minInvestment: 5000,
  investors: 42,
  totalReturns: 340000,
  nextPaymentAmount: 28333,
  nextPaymentDate: '2026-06-15',
  paymentCount: 12,
  avgPayment: 28333,
  borrower: {
    name: 'شركة النخيل العقارية',
    experience: 12,
    sector: 'التطوير العقاري',
    bio: 'شركة عقارية رائدة في المنطقة الشرقية، تأسست عام ٢٠١٢ ومتخصصة في تطوير المشاريع السكنية والتجارية الفاخرة. أنجزت أكثر من ١٢ مشروعًا بقيمة إجمالية تجاوزت ٢٠٠ مليون ريال.',
  },
  whyCards: [
    { title: 'استخدام الأموال', text: 'بناء وتطوير مجمع سكني متكامل يتضمن ٤٥ وحدة سكنية بمواصفات فاخرة في حي النخيل بالدمام.', color: 'blue' as const },
    { title: 'ملخص المشروع', text: 'المشروع يستهدف الطبقة المتوسطة العليا في المنطقة الشرقية، مع توفير وحدات سكنية عصرية ومرافق متكاملة.', color: 'green' as const },
    { title: 'الموقع والقطاع', location: 'الدمام، المملكة العربية السعودية', sector: 'التطوير العقاري', color: 'amber' as const },
  ],
  schedule: [
    { month: 'يناير', date: '2026-01-15', amount: 28333, status: 'upcoming' },
    { month: 'فبراير', date: '2026-02-15', amount: 28333, status: 'upcoming' },
    { month: 'مارس', date: '2026-03-15', amount: 28333, status: 'upcoming' },
    { month: 'أبريل', date: '2026-04-15', amount: 28333, status: 'upcoming' },
    { month: 'مايو', date: '2026-05-15', amount: 28333, status: 'upcoming' },
    { month: 'يونيو', date: '2026-06-15', amount: 28333, status: 'current' },
    { month: 'يوليو', date: '2026-07-15', amount: 28333, status: 'future' },
    { month: 'أغسطس', date: '2026-08-15', amount: 28333, status: 'future' },
    { month: 'سبتمبر', date: '2026-09-15', amount: 28333, status: 'future' },
    { month: 'أكتوبر', date: '2026-10-15', amount: 28333, status: 'future' },
    { month: 'نوفمبر', date: '2026-11-15', amount: 28333, status: 'future' },
    { month: 'ديسمبر', date: '2026-12-15', amount: 28337, status: 'future' },
  ],
  riskFactors: ['مخاطر السوق العقاري', 'تأخيرات محتملة في التنفيذ', 'تقلبات أسعار المواد الخام'],
  guarantee: 'ضمان بنكي بقيمة 30% من إجمالي التمويل',
  documents: [
    { name: 'عقد التمويل', size: 'PDF • 2.3 MB' },
    { name: 'دراسة الجدوى', size: 'PDF • 5.1 MB' },
    { name: 'التقرير المالي', size: 'PDF • 1.8 MB' },
    { name: 'رخصة البناء', size: 'PDF • 890 KB' },
  ],
};

const chartData = [
  { month: 'يناير', value: 28333 },
  { month: 'فبراير', value: 56666 },
  { month: 'مارس', value: 84999 },
  { month: 'أبريل', value: 113332 },
  { month: 'مايو', value: 141665 },
];

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function ChartTip({ active, payload, label, tk }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md px-3 py-2 shadow-md text-[11px]" style={{ background: tk.cardBg, border: tk.cardBorder }}>
      <div style={{ color: tk.textSecondary }}>{label}</div>
      <div style={{ color: tk.textPrimary, fontWeight: 600 }}>{formatSAR(payload[0].value)}</div>
    </div>
  );
}

// ─── Investment Modal ────────────────────────────────────────────────────────

function InvestModal({
  open,
  onClose,
  onSuccess,
  amount,
  roi,
  duration,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  roi: number;
  duration: number;
}) {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tk = useTokens();
  const { t, dir, lang } = useI18n();
  const isAr = lang === 'ar';

  // Calculations
  const profit = Math.round(amount * (roi / 100) * (duration / 12));
  const fee = Math.round(amount * 0.02);
  const vat = Math.round(fee * 0.15);
  const netReturn = profit - fee - vat;
  const totalPayout = amount + netReturn;
  const effectiveRate = ((netReturn / amount) * (12 / duration) * 100).toFixed(1);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep(1);
      setAgreed(false);
      setOtp(['', '', '', '']);
      setLoading(false);
      setSuccess(false);
      setCountdown(60);
    }
  }, [open]);

  // Countdown timer for step 3
  useEffect(() => {
    if (step !== 3 || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  // Auto-focus first OTP input
  useEffect(() => {
    if (step === 3) inputRefs.current[3]?.focus();
  }, [step]);

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index > 0) inputRefs.current[index - 1]?.focus();
  }, [otp]);

  const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const [success, setSuccess] = useState(false);

  const fireConfetti = () => {
    const end = Date.now() + 1500;
    const confettiColors = ['#1D4ED8', '#16A34A', '#F59E0B', '#ffffff'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: confettiColors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: confettiColors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      fireConfetti();
    }, 2500);
  };

  const handleDone = () => {
    setSuccess(false);
    onClose();
    onSuccess();
  };

  if (!open) return null;

  const primaryDisabled = (step === 2 && !agreed) || (step === 3 && otp.some((d) => !d));

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: tk.isVIP ? 'rgba(0,0,0,0.6)' : 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
    >
      <div
        className="w-full max-w-[540px] rounded-[16px] overflow-hidden"
        style={{ background: tk.cardBg, border: tk.isVIP ? tk.cardBorder : undefined, boxShadow: tk.isVIP ? '0 24px 80px rgba(0,0,0,0.6)' : '0 24px 80px rgba(0,0,0,0.15)' }}
        dir={dir}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: tk.divider }}>
          <h2 className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary }}>
            {success ? t('modal.success') : loading ? t('modal.processing') : step === 1 ? t('modal.breakdown') : step === 2 ? t('modal.summary') : t('modal.verify')}
          </h2>
          {!loading && !success && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: s === step ? 20 : 8,
                      backgroundColor: s <= step ? tk.primary : (tk.isVIP ? tk.divider : '#E5E7EB'),
                    }}
                  />
                ))}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <X className="w-4 h-4" strokeWidth={1.5} style={{ color: tk.textMuted }} />
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">

          {/* STEP 1 — Breakdown */}
          {step === 1 && (
            <div>
              <div className="rounded-[12px] p-4 mb-5 text-center" style={{ backgroundColor: tk.innerSurface }}>
                <div className="text-[12px] mb-1" style={{ fontWeight: 500, color: tk.textMuted }}>{t('modal.investAmount')}</div>
                <div className="text-[28px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(profit, { decimals: 0 })}</span>
                  <span className="text-[13px]" style={{ color: tk.textSecondary }}>{t('modal.expectedProfit')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px]" style={{ fontWeight: 600, color: tk.dangerText }}>-{formatSAR(fee, { decimals: 0 })}</span>
                    <button className="group relative">
                      <Info className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: tk.textFaint }} />
                    </button>
                  </div>
                  <span className="text-[13px]" style={{ color: tk.textSecondary }}>{t('modal.platformFee')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px]" style={{ fontWeight: 600, color: tk.dangerText }}>-{formatSAR(vat, { decimals: 0 })}</span>
                    <button className="group relative">
                      <Info className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: tk.textFaint }} />
                    </button>
                  </div>
                  <span className="text-[13px]" style={{ color: tk.textSecondary }}>{t('modal.vat')}</span>
                </div>
              </div>

              <div className="border-t my-4" style={{ borderColor: tk.divider }} />

              <div className="flex items-center justify-between">
                <span className="text-[18px]" style={{ fontWeight: 700, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</span>
                <span className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{t('modal.netReturn')}</span>
              </div>
            </div>
          )}

          {/* STEP 2 — Summary */}
          {step === 2 && (
            <div>
              <div className="text-center mb-5">
                <div className="text-[12px] mb-1" style={{ fontWeight: 500, color: tk.textMuted }}>{t('modal.investAmount')}</div>
                <div className="text-[36px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-[12px] p-4 text-center" style={{ backgroundColor: tk.successBg, border: `1px solid ${tk.successBorder}` }}>
                  <div className="text-[11px] mb-1" style={{ fontWeight: 500, color: tk.textSecondary }}>{t('modal.netReturn')}</div>
                  <div className="text-[20px]" style={{ fontWeight: 700, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</div>
                </div>
                <div className="rounded-[12px] p-4 text-center" style={{ backgroundColor: tk.infoBg, border: `1px solid ${tk.infoBorder}` }}>
                  <div className="text-[11px] mb-1" style={{ fontWeight: 500, color: tk.textSecondary }}>{t('modal.totalPayout')}</div>
                  <div className="text-[20px]" style={{ fontWeight: 700, color: tk.infoText }}>{formatSAR(totalPayout, { decimals: 0 })}</div>
                </div>
              </div>

              <div className="rounded-[12px] p-4 mb-5 space-y-2.5" style={{ backgroundColor: tk.innerSurface }}>
                <div className="flex items-center justify-between text-[12px]">
                  <span style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</span>
                  <span style={{ color: tk.textMuted }}>{t('modal.principal')}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span style={{ fontWeight: 600, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</span>
                  <span style={{ color: tk.textMuted }}>{t('modal.netProfit')}</span>
                </div>
                <div className="border-t pt-2.5" style={{ borderColor: tk.divider }}>
                  <div className="flex items-center justify-between text-[13px]">
                    <span style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(totalPayout, { decimals: 0 })}</span>
                    <span style={{ fontWeight: 600, color: tk.textPrimary }}>{t('modal.totalAtMaturity')}</span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-5">
                <span className="text-[12px]" style={{ color: tk.textMuted }}>{t('modal.effectiveRate')}: </span>
                <span className="text-[13px]" style={{ fontWeight: 700, color: tk.infoText }}>{effectiveRate}%</span>
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: tk.primary }}
                />
                <span className="text-[12px] leading-relaxed" style={{ color: tk.textSecondary }}>
                  {t('modal.agreeRisk')}
                </span>
              </label>
            </div>
          )}

          {/* STEP 3 — OTP Verification */}
          {step === 3 && !loading && !success && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: tk.infoBg }}>
                <ShieldCheck className="w-7 h-7" strokeWidth={1.5} style={{ color: tk.infoText }} />
              </div>
              <div className="text-[14px] mb-1" style={{ fontWeight: 600, color: tk.textPrimary }}>{t('modal.enterOtp')}</div>
              <div className="text-[12px] mb-6" style={{ color: tk.textMuted }}>
                {t('modal.otpSent')} <span style={{ fontWeight: 500, color: tk.textPrimary }} dir="ltr">{isAr ? '٠٥٥•••••٨٩' : '055•••••89'}</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-5" dir="ltr">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-14 h-14 text-center text-[24px] rounded-[12px] outline-none transition-all duration-200"
                    style={{
                      color: tk.textPrimary,
                      background: tk.isVIP ? tk.innerSurface : 'transparent',
                      fontWeight: 700,
                      border: digit ? tk.otpInputActive : tk.otpInputBorder,
                      boxShadow: digit ? tk.otpInputGlow : 'none',
                    }}
                  />
                ))}
              </div>

              <div className="text-[12px]" style={{ color: tk.textMuted }}>
                {countdown > 0 ? (
                  <span>{t('modal.resendIn')} <span style={{ fontWeight: 600, color: tk.textPrimary }}>{countdown} {t('modal.seconds')}</span></span>
                ) : (
                  <button
                    onClick={() => setCountdown(60)}
                    className="hover:underline"
                    style={{ fontWeight: 500, color: tk.primary }}
                  >
                    {t('modal.resend')}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && !success && (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: tk.infoBg }}>
                <Loader2 className="w-7 h-7 animate-spin" strokeWidth={1.5} style={{ color: tk.infoText }} />
              </div>
              <div className="text-[16px] mb-1" style={{ fontWeight: 600, color: tk.textPrimary }}>{t('modal.processingInvestment')}</div>
              <div className="text-[13px]" style={{ color: tk.textMuted }}>{t('modal.pleaseWait')}</div>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: tk.successBg }}>
                <CheckCircle className="w-10 h-10" strokeWidth={1.5} style={{ color: tk.successText }} />
              </div>

              <div className="text-[24px] mb-3" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('modal.successTitle')}</div>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: tk.textSecondary }}>
                {t('modal.successDesc')} <span style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</span> {t('modal.successIn')}
                <br />
                {isAr ? 'تمويل مشروع سكني - الدمام' : 'Residential Project — Dammam'}
              </p>

              <div className="border-t mx-8 mb-6" style={{ borderColor: tk.divider }} />

              <div className="grid grid-cols-2 gap-6 mb-6 px-4">
                <div>
                  <div className="text-[12px] mb-1.5" style={{ fontWeight: 500, color: tk.textMuted }}>{t('modal.expectedProfitLabel')}</div>
                  <div className="text-[24px]" style={{ fontWeight: 700, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</div>
                </div>
                <div>
                  <div className="text-[12px] mb-1.5" style={{ fontWeight: 500, color: tk.textMuted }}>{t('modal.totalPayout')}</div>
                  <div className="text-[24px]" style={{ fontWeight: 700, color: tk.infoText }}>{formatSAR(totalPayout, { decimals: 0 })}</div>
                </div>
              </div>

              <div className="border-t mx-8 mb-6" style={{ borderColor: tk.divider }} />

              <div className="text-[13px] mb-8" style={{ color: tk.textMuted }}>
                {t('modal.emailNote')}
              </div>

              <button
                onClick={handleDone}
                className="w-full h-12 rounded-[12px] text-[15px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{ backgroundColor: tk.primary, fontWeight: 600 }}
              >
                {t('modal.goToPortfolio')}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !success && (
          <div className="flex items-center gap-3 px-6 py-5 border-t" style={{ borderColor: tk.divider }}>
            <button
              onClick={() => { step === 1 ? onClose() : setStep(step - 1); }}
              className="flex-1 h-12 rounded-[12px] text-[14px] transition-colors"
              style={{ fontWeight: 600, border: tk.secondaryBtnBorder, color: tk.textSecondary, background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {step === 1 ? t('modal.cancel') : t('modal.back')}
            </button>
            <button
              onClick={() => {
                if (step === 1) setStep(2);
                else if (step === 2) setStep(3);
                else handleSubmit();
              }}
              disabled={primaryDisabled}
              className="flex-1 h-12 rounded-[12px] text-[14px] text-white transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: primaryDisabled ? tk.primaryDisabledBg : tk.primary,
                color: primaryDisabled ? tk.primaryDisabledColor : '#fff',
                fontWeight: 600,
                cursor: primaryDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              {step === 1 && t('modal.continue')}
              {step === 2 && t('modal.confirmVerify')}
              {step === 3 && t('modal.verifyInvest')}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return overlay;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function OpportunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const isAr = lang === 'ar';
  const BackArrow = isAr ? ArrowRight : ArrowLeft;
  const tk = useTokens();
  const [amount, setAmount] = useState(5000);
  const [sectionTab, setSectionTab] = useState<'details' | 'repayments' | 'financials' | 'documents'>('details');
  const [financialsTab, setFinancialsTab] = useState<'income' | 'balance' | 'cashflow'>('income');
  const [modalOpen, setModalOpen] = useState(false);
  const [invested, setInvested] = useState(false);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [investmentCount, setInvestmentCount] = useState(0);
  const [reinvesting, setReinvesting] = useState(false);

  const expectedReturn = Math.round(amount * (opp.roi / 100) * (opp.duration / 12));

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      <button
        onClick={() => navigate('/app/opportunities')}
        className="flex items-center gap-1.5 text-[14px] mb-6 transition-colors"
        style={{ fontWeight: 500, color: tk.textSecondary }}
        onMouseEnter={e => (e.currentTarget.style.color = tk.textPrimary)}
        onMouseLeave={e => (e.currentTarget.style.color = tk.textSecondary)}
      >
        <BackArrow className="w-5 h-5" strokeWidth={1.5} />
        {t('opp.back')}
      </button>

      <div className="flex gap-6">

        {/* MAIN COLUMN */}
        <div className="flex-1 min-w-0">

          {/* HERO CARD — gradient (navy, same in both modes — already dark) */}
          <div className="relative rounded-2xl overflow-hidden p-5 sm:p-6 lg:p-8" style={{ background: 'linear-gradient(155deg, #001D5A 0%, #0D82F9 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute w-[300px] h-[300px] rounded-full top-[-50px] left-[674px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
              <div className="absolute w-[400px] h-[400px] rounded-full top-[124px] left-[-100px]" style={{ background: 'radial-gradient(circle, rgba(13,130,249,0.3) 0%, transparent 70%)' }} />
              <div className="absolute w-[200px] h-[200px] rounded-full bottom-[-60px] right-[200px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

              <svg className="absolute inset-0 w-full h-full opacity-[0.07]">
                <defs>
                  <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGrid)" />
              </svg>

              <svg className="absolute bottom-0 left-0 w-full h-[140px] opacity-[0.08]" viewBox="0 0 900 140" fill="none" preserveAspectRatio="none">
                <path d="M0 120 Q150 80 300 90 T600 50 T900 30" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M0 130 Q200 100 400 105 T700 70 T900 55" stroke="white" strokeWidth="1" fill="none" />
                <path d="M0 138 Q250 120 500 118 T900 90" stroke="white" strokeWidth="0.5" fill="none" />
              </svg>

              <svg className="absolute top-[20px] left-[30px] opacity-[0.06]" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="10" y="10" width="40" height="40" rx="8" stroke="white" strokeWidth="1" />
                <rect x="30" y="30" width="40" height="40" rx="8" stroke="white" strokeWidth="1" />
                <rect x="50" y="50" width="40" height="40" rx="8" stroke="white" strokeWidth="0.5" />
              </svg>

              <svg className="absolute bottom-[10px] right-[-20px] opacity-[0.05]" width="160" height="160" viewBox="0 0 160 160" fill="none">
                <circle cx="80" cy="80" r="30" stroke="white" strokeWidth="1" />
                <circle cx="80" cy="80" r="50" stroke="white" strokeWidth="0.8" />
                <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="relative">
              <h1 className="text-[22px] sm:text-[26px] lg:text-[32px] text-white text-start mb-2" style={{ fontWeight: 700, letterSpacing: '-0.015em' }}>{isAr ? opp.title : 'Residential Project Financing — Dammam'}</h1>
              <p className="text-[14px] lg:text-[16px] text-white/90 mb-6 lg:mb-8">{isAr ? opp.pitch : 'A premium residential complex in a prime location with secured returns'}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>{t('opp.annualReturn')}</div>
                  <div className="text-[28px] text-white" style={{ fontWeight: 700 }}>+{opp.roi}%</div>
                </div>
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>{t('opp.duration')}</div>
                  <div className="text-[20px] text-white" style={{ fontWeight: 700 }}>{opp.duration} {t('opp.months')}</div>
                </div>
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>{t('opp.rating')}</div>
                  <div className="text-[20px] text-[#F59E0B]" style={{ fontWeight: 700 }}>{opp.risk}</div>
                </div>
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>{t('opp.financingType')}</div>
                  <div className="text-[14px] text-white" style={{ fontWeight: 600 }}>{isAr ? opp.type : 'Real Estate Murabaha'}</div>
                </div>
              </div>

              <div className="rounded-[20px] p-5" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-[20px] px-4 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <div className="text-[28px] text-white text-center" style={{ fontWeight: 700 }}>{opp.fundingPct}%</div>
                    <div className="text-[11px] text-white/80 text-center" style={{ fontWeight: 500 }}>{t('opp.completed')}</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-white/80 mb-1" style={{ fontWeight: 500 }}>{t('opp.fundingCollected')}</div>
                    <div className="text-[24px] text-white" style={{ fontWeight: 700 }}>{formatSAR(opp.raisedAmount, { decimals: 0 })}</div>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: `${opp.fundingPct}%`, background: 'linear-gradient(90deg, white, #E0F2FE)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/90" style={{ fontWeight: 600 }}>{opp.investors} {t('opp.investors')}</span>
                  <span className="text-white/70" style={{ fontWeight: 500 }}>{t('opp.totalOf')} {formatSAR(opp.targetAmount, { decimals: 0 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION TABS — segmented with sliding active indicator */}
          <div
            className="flex items-center gap-1 mt-6 mb-5 p-1.5 rounded-[14px]"
            style={{
              background: tk.isVIP ? colors.dark.hover : '#F1F5F9',
              border: `1px solid ${tk.divider}`,
            }}
          >
            {([
              { key: 'details' as const, icon: ScrollText, labelAr: 'التفاصيل', labelEn: 'Details' },
              { key: 'repayments' as const, icon: CalendarRange, labelAr: 'جدول السداد', labelEn: 'Repayments' },
              { key: 'financials' as const, icon: ChartLine, labelAr: 'البيانات المالية', labelEn: 'Financials' },
              { key: 'documents' as const, icon: FileStack, labelAr: 'المستندات', labelEn: 'Documents', count: 5 },
            ]).map((tab) => {
              const active = sectionTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSectionTab(tab.key)}
                  className="relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-[10px] cursor-pointer"
                  style={{
                    background: active ? tk.cardBg : 'transparent',
                    color: active ? (tk.isVIP ? '#60A5FA' : '#1D4ED8') : tk.textMuted,
                    boxShadow: active
                      ? (tk.isVIP
                        ? '0 4px 14px -4px rgba(96,165,250,0.25), 0 0 0 1px rgba(96,165,250,0.18)'
                        : '0 4px 14px -4px rgba(37,99,235,0.18), 0 0 0 1px rgba(37,99,235,0.1)')
                      : 'none',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = tk.textPrimary; e.currentTarget.style.background = tk.isVIP ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)'; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = tk.textMuted; e.currentTarget.style.background = 'transparent'; } }}
                >
                  <tab.icon className="w-4 h-4 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
                  <span className="text-[13px]" style={{ fontWeight: active ? 700 : 500, letterSpacing: active ? '-0.01em' : '0' }}>
                    {isAr ? tab.labelAr : tab.labelEn}
                  </span>
                  {tab.count !== undefined && (
                    <span
                      className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10px] tabular-nums"
                      style={{
                        background: active
                          ? (tk.isVIP ? 'rgba(96,165,250,0.18)' : '#1D4ED8')
                          : (tk.isVIP ? colors.dark.elevated : '#E2E8F0'),
                        color: active ? (tk.isVIP ? '#A5B4FC' : '#FFFFFF') : tk.textMuted,
                        fontWeight: 700,
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          <div className="space-y-5">

          {/* ── DETAILS TAB ───────────────────────────────────────────── */}
          {sectionTab === 'details' && (
            <>
              {/* Financing Overview */}
              <section
                className="relative rounded-2xl overflow-hidden"
                style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
              >
                {/* Subtle brand accent strip */}
                <div
                  className="absolute top-0 inset-x-0 h-[3px] pointer-events-none"
                  style={{
                    background: tk.isVIP
                      ? 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.5) 50%, transparent 100%)'
                      : 'linear-gradient(90deg, transparent 0%, #2563EB 50%, transparent 100%)',
                  }}
                />
                <header className="px-7 pt-6 pb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: tk.isVIP
                          ? 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(37,99,235,0.18) 100%)'
                          : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                        border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`,
                      }}
                    >
                      <Banknote className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.isVIP ? '#60A5FA' : '#1D4ED8' }} />
                    </div>
                    <div>
                      <h2 className="text-[16px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                        {isAr ? 'نظرة عامة على التمويل' : 'Financing Overview'}
                      </h2>
                      <div className="text-[11px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                        {isAr ? 'الشروط الأساسية للتمويل' : 'Core financing terms'}
                      </div>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 h-6 px-2 rounded-md text-[10px]"
                    style={{
                      background: tk.successBg,
                      color: tk.successText,
                      border: `1px solid ${tk.successBorder}`,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    <BadgeCheck className="w-3 h-3" strokeWidth={2.2} />
                    {isAr ? 'متوافق مع الشريعة' : 'SHARIA-COMPLIANT'}
                  </span>
                </header>
                <div className="px-7 pb-6">
                  <p className="text-[13px] leading-relaxed mb-6" style={{ color: tk.textSecondary }}>
                    {isAr
                      ? 'تمويل معدات لمشروع توسعة البنية التحتية لتقنية المعلومات.'
                      : 'Equipment financing for IT infrastructure expansion project.'}
                  </p>
                  <div
                    className="rounded-xl overflow-hidden grid grid-cols-2 lg:grid-cols-4"
                    style={{ background: tk.innerSurface, border: `1px solid ${tk.innerBorder}` }}
                  >
                    {[
                      { icon: Layers, labelAr: 'النوع', labelEn: 'Type', valueAr: 'تمويل معدات', valueEn: 'Equipment Finance' },
                      { icon: Repeat, labelAr: 'السداد', labelEn: 'Repayment', valueAr: 'شهري', valueEn: 'Monthly' },
                      { icon: Landmark, labelAr: 'الهيكل', labelEn: 'Structure', valueAr: 'مرابحة', valueEn: 'Murabaha', info: true },
                      { icon: ShieldCheck, labelAr: 'الضمانات', labelEn: 'Guarantees', valueAr: 'المعدات الممولة', valueEn: 'Financed equipment' },
                    ].map((f, i, arr) => (
                      <div
                        key={i}
                        className="px-4 py-4"
                        style={{
                          borderInlineEnd: i < arr.length - 1 ? `1px solid ${tk.innerBorder}` : undefined,
                          borderBlockEnd: undefined,
                        }}
                      >
                        <f.icon className="w-3.5 h-3.5 mb-2" strokeWidth={1.8} style={{ color: tk.isVIP ? '#60A5FA' : '#2563EB' }} />
                        <div
                          className="text-[10px] uppercase mb-1.5 inline-flex items-center gap-1"
                          style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.08em' }}
                        >
                          {isAr ? f.labelAr : f.labelEn}
                          {f.info && <Info className="w-3 h-3 opacity-70" strokeWidth={1.8} />}
                        </div>
                        <div className="text-[14px] leading-snug" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>
                          {isAr ? f.valueAr : f.valueEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Company Profile */}
              <section
                className="rounded-2xl overflow-hidden"
                style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
              >
                <header className="px-7 pt-6 pb-5 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: tk.isVIP
                        ? 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(37,99,235,0.18) 100%)'
                        : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`,
                    }}
                  >
                    <Building2 className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.isVIP ? '#60A5FA' : '#1D4ED8' }} />
                  </div>
                  <div>
                    <h2 className="text-[16px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                      {isAr ? 'ملف الشركة' : 'Company Profile'}
                    </h2>
                    <div className="text-[11px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                      {isAr ? 'بيانات المقترض' : 'Borrower information'}
                    </div>
                  </div>
                </header>
                <div className="px-7 pb-6">
                  {/* Company hero row */}
                  <div
                    className="rounded-xl p-5 mb-4 flex items-center gap-4"
                    style={{
                      background: tk.isVIP
                        ? 'linear-gradient(135deg, rgba(11,31,58,0.6) 0%, rgba(15,42,77,0.4) 100%)'
                        : 'linear-gradient(135deg, #FAFBFD 0%, #F1F5F9 100%)',
                      border: `1px solid ${tk.innerBorder}`,
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: tk.isVIP
                          ? 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)'
                          : 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                        boxShadow: '0 6px 16px -4px rgba(37,99,235,0.35)',
                      }}
                    >
                      <Building2 className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[17px]" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                          {isAr ? 'الحلول التقنية السعودية' : 'Saudi Tech Solutions'}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 h-5 px-1.5 rounded-md text-[9px]"
                          style={{ background: tk.successBg, color: tk.successText, border: `1px solid ${tk.successBorder}`, fontWeight: 700, letterSpacing: '0.05em' }}
                        >
                          <CheckCircle className="w-2.5 h-2.5" strokeWidth={2.5} />
                          {isAr ? 'موثّقة' : 'VERIFIED'}
                        </span>
                      </div>
                      <div className="text-[12px] mt-1 flex items-center gap-1.5" style={{ color: tk.textMuted }}>
                        <Sparkles className="w-3 h-3" strokeWidth={1.8} style={{ color: tk.isVIP ? '#A5B4FC' : '#6366F1' }} />
                        <span>{isAr ? 'تأسست 2015' : 'Est. 2015'}</span>
                        <span style={{ color: tk.textFaint }}>·</span>
                        <span>{isAr ? 'مؤسسة متوسطة' : 'Medium Enterprise'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 stat tiles */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      { icon: Layers, labelAr: 'الحجم', labelEn: 'Size', valueAr: 'متوسط', valueEn: 'Medium', tint: '#A78BFA', tintBg: tk.isVIP ? 'rgba(167,139,250,0.12)' : '#F5F3FF' },
                      { icon: CalendarRange, labelAr: 'تاريخ التأسيس', labelEn: 'Founded', valueAr: '2015', valueEn: '2015', tint: tk.isVIP ? '#60A5FA' : '#2563EB', tintBg: tk.infoBg },
                      { icon: Users, labelAr: 'الموظفون', labelEn: 'Employees', valueAr: '50-100', valueEn: '50-100', tint: tk.successText, tintBg: tk.successBg },
                      { icon: Cpu, labelAr: 'القطاع', labelEn: 'Sector', valueAr: 'التقنية', valueEn: 'Technology', tint: '#F59E0B', tintBg: tk.isVIP ? 'rgba(245,158,11,0.12)' : '#FEF3C7' },
                    ].map((tile, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4 transition-all"
                        style={{ background: tk.cardBg, border: `1px solid ${tk.innerBorder}` }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = tk.cardHoverBorder; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = tk.innerBorder; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: tile.tintBg }}
                        >
                          <tile.icon className="w-4 h-4" strokeWidth={1.8} style={{ color: tile.tint }} />
                        </div>
                        <div className="text-[10px] uppercase mb-1" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.08em' }}>
                          {isAr ? tile.labelAr : tile.labelEn}
                        </div>
                        <div className="text-[15px]" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>
                          {isAr ? tile.valueAr : tile.valueEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── REPAYMENTS TAB ─────────────────────────────────────────── */}
          {sectionTab === 'repayments' && (
            <section
              className="rounded-2xl overflow-hidden"
              style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
            >
              <header className="px-7 pt-6 pb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: tk.isVIP
                        ? 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(37,99,235,0.18) 100%)'
                        : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`,
                    }}
                  >
                    <CalendarRange className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.isVIP ? '#60A5FA' : '#1D4ED8' }} />
                  </div>
                  <div>
                    <h2 className="text-[16px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                      {isAr ? 'جدول السداد' : 'Repayment Schedule'}
                    </h2>
                    <p className="text-[11px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                      {isAr ? 'الجدول الزمني المتوقع لسداد هذه الفرصة' : 'Expected repayment timeline for this opportunity'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-end">
                    <div className="text-[10px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.08em' }}>
                      {isAr ? 'إجمالي الدفعات' : 'Total Payments'}
                    </div>
                    <div className="text-[14px] font-mono tabular-nums" style={{ fontWeight: 700, color: tk.textPrimary }}>
                      {opp.schedule.length}
                    </div>
                  </div>
                  <div className="w-px h-8" style={{ background: tk.divider }} />
                  <div className="text-end">
                    <div className="text-[10px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.08em' }}>
                      {isAr ? 'الإجمالي' : 'Grand Total'}
                    </div>
                    <div className="text-[14px] font-mono tabular-nums" style={{ fontWeight: 700, color: tk.isVIP ? '#60A5FA' : '#1D4ED8' }}>
                      {formatSAR(opp.schedule.reduce((s, r) => s + r.amount, 0), { decimals: 0 })}
                    </div>
                  </div>
                </div>
              </header>
              <div className="px-7 pb-7">
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${tk.divider}` }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: tk.innerSurface, borderBottom: `1px solid ${tk.divider}` }}>
                          <th className="text-start px-4 py-3 text-[11px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em', width: 60 }}>#</th>
                          <th className="text-start px-4 py-3 text-[11px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em' }}>
                            {isAr ? 'تاريخ الاستحقاق' : 'Due Date'}
                          </th>
                          <th className="text-end px-4 py-3 text-[11px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em' }}>
                            {isAr ? 'الأصل' : 'Principal'}
                          </th>
                          <th className="text-end px-4 py-3 text-[11px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em' }}>
                            {isAr ? 'الربح' : 'Profit'}
                          </th>
                          <th className="text-end px-4 py-3 text-[11px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em' }}>
                            {isAr ? 'الإجمالي' : 'Total'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {opp.schedule.map((row, i) => {
                          const principal = Math.round(row.amount * 0.88);
                          const profit = row.amount - principal;
                          const isLast = i === opp.schedule.length - 1;
                          return (
                            <tr
                              key={`${row.date}-${i}`}
                              style={{
                                borderBottom: isLast ? 'none' : `1px solid ${tk.divider}`,
                                transition: 'background-color 0.15s',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tk.innerSurface; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <td className="px-4 py-3.5 text-[12px] font-mono tabular-nums" style={{ color: tk.textMuted, fontWeight: 500 }}>
                                {String(i + 1).padStart(2, '0')}
                              </td>
                              <td className="px-4 py-3.5 text-start text-[13px] font-mono" style={{ color: tk.textSecondary, fontWeight: 500 }}>
                                <span dir="ltr">{row.date}</span>
                              </td>
                              <td className="px-4 py-3.5 text-end text-[14px] tabular-nums" style={{ fontWeight: 600, color: tk.textPrimary }}>
                                {formatSAR(principal, { decimals: 0 })}
                              </td>
                              <td className="px-4 py-3.5 text-end text-[14px] tabular-nums" style={{ fontWeight: 600, color: tk.infoText }}>
                                {formatSAR(profit, { decimals: 0 })}
                              </td>
                              <td className="px-4 py-3.5 text-end text-[14px] tabular-nums" style={{ fontWeight: 700, color: tk.textPrimary }}>
                                {formatSAR(row.amount, { decimals: 0 })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── FINANCIALS TAB ─────────────────────────────────────────── */}
          {sectionTab === 'financials' && (
            <section
              className="rounded-2xl overflow-hidden"
              style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
            >
              <header className="px-7 pt-6 pb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: tk.isVIP
                        ? 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(37,99,235,0.18) 100%)'
                        : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`,
                    }}
                  >
                    <ChartLine className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.isVIP ? '#60A5FA' : '#1D4ED8' }} />
                  </div>
                  <div>
                    <h2 className="text-[16px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                      {isAr ? 'البيانات المالية' : 'Financial Statements'}
                    </h2>
                    <p className="text-[11px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                      {isAr ? 'آخر ثلاث سنوات (مدققة)' : 'Last three fiscal years (audited)'}
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-1 h-6 px-2 rounded-md text-[10px]"
                  style={{
                    background: tk.successBg,
                    color: tk.successText,
                    border: `1px solid ${tk.successBorder}`,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  <BadgeCheck className="w-3 h-3" strokeWidth={2.2} />
                  {isAr ? 'مدقّق' : 'AUDITED'}
                </span>
              </header>

              <div className="px-7 pb-7">
                {/* Sub-tab pill row */}
                <div
                  className="inline-flex items-center gap-1 p-1 rounded-xl mb-5"
                  style={{ background: tk.innerSurface, border: `1px solid ${tk.divider}` }}
                >
                  {([
                    { key: 'income' as const, labelAr: 'قائمة الدخل', labelEn: 'Income Statement' },
                    { key: 'balance' as const, labelAr: 'الميزانية', labelEn: 'Balance Sheet' },
                    { key: 'cashflow' as const, labelAr: 'التدفقات النقدية', labelEn: 'Cash Flow' },
                  ]).map((s) => {
                    const isActive = financialsTab === s.key;
                    return (
                      <button
                        key={s.key}
                        onClick={() => setFinancialsTab(s.key)}
                        className="px-3.5 py-1.5 rounded-lg text-[12px] transition-all cursor-pointer"
                        style={{
                          background: isActive ? tk.cardBg : 'transparent',
                          color: isActive ? tk.textPrimary : tk.textMuted,
                          boxShadow: isActive
                            ? (tk.isVIP
                              ? '0 1px 2px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)'
                              : '0 1px 2px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.04)')
                            : 'none',
                          fontWeight: isActive ? 600 : 500,
                        }}
                      >
                        {isAr ? s.labelAr : s.labelEn}
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  type StatementRow =
                    | { kind: 'group'; labelAr: string; labelEn: string }
                    | { kind: 'item'; labelAr: string; labelEn: string; values: [number, number, number]; negative?: boolean }
                    | { kind: 'total'; labelAr: string; labelEn: string; values: [number, number, number]; tone?: 'green' | 'red' | 'neutral'; showTrend?: boolean };

                  const incomeRows: StatementRow[] = [
                    { kind: 'item', labelAr: 'الإيرادات', labelEn: 'Revenue', values: [8500000, 7200000, 6100000] },
                    { kind: 'item', labelAr: 'تكلفة البضاعة المباعة', labelEn: 'Cost of Goods Sold', values: [5950000, 5040000, 4270000] },
                    { kind: 'item', labelAr: 'إجمالي الربح', labelEn: 'Gross Profit', values: [2550000, 2160000, 1830000] },
                    { kind: 'item', labelAr: 'المصروفات التشغيلية', labelEn: 'Operating Expenses', values: [1530000, 1350000, 1170000] },
                    { kind: 'item', labelAr: 'الربح التشغيلي', labelEn: 'Operating Income', values: [1020000, 810000, 660000] },
                    { kind: 'total', labelAr: 'صافي الربح', labelEn: 'Net Profit', values: [680000, 540000, 420000], tone: 'green', showTrend: true },
                  ];

                  const balanceRows: StatementRow[] = [
                    { kind: 'group', labelAr: 'الأصول', labelEn: 'ASSETS' },
                    { kind: 'item', labelAr: 'الأصول المتداولة', labelEn: 'Current Assets', values: [2800000, 2500000, 2100000] },
                    { kind: 'item', labelAr: 'الأصول غير المتداولة', labelEn: 'Non-Current Assets', values: [2400000, 2300000, 2100000] },
                    { kind: 'total', labelAr: 'إجمالي الأصول', labelEn: 'Total Assets', values: [5200000, 4800000, 4200000], tone: 'neutral', showTrend: true },
                    { kind: 'group', labelAr: 'الخصوم وحقوق الملكية', labelEn: 'LIABILITIES & EQUITY' },
                    { kind: 'item', labelAr: 'الخصوم المتداولة', labelEn: 'Current Liabilities', values: [1200000, 1100000, 950000] },
                    { kind: 'item', labelAr: 'الخصوم غير المتداولة', labelEn: 'Non-Current Liabilities', values: [900000, 900000, 850000] },
                    { kind: 'total', labelAr: 'إجمالي الخصوم', labelEn: 'Total Liabilities', values: [2100000, 2000000, 1800000], tone: 'neutral' },
                    { kind: 'total', labelAr: 'حقوق الملكية', labelEn: 'Equity', values: [3100000, 2800000, 2400000], tone: 'neutral' },
                  ];

                  const cashflowRows: StatementRow[] = [
                    { kind: 'group', labelAr: 'الأنشطة التشغيلية', labelEn: 'OPERATING ACTIVITIES' },
                    { kind: 'item', labelAr: 'صافي الدخل', labelEn: 'Net Income', values: [680000, 540000, 420000] },
                    { kind: 'item', labelAr: 'الإهلاك', labelEn: 'Depreciation', values: [120000, 110000, 100000] },
                    { kind: 'item', labelAr: 'التغيرات في رأس المال العامل', labelEn: 'Changes in Working Capital', values: [120000, 130000, 130000] },
                    { kind: 'total', labelAr: 'التدفق النقدي التشغيلي', labelEn: 'Operating Cash Flow', values: [920000, 780000, 650000], tone: 'green' },
                    { kind: 'group', labelAr: 'الأنشطة الاستثمارية', labelEn: 'INVESTING ACTIVITIES' },
                    { kind: 'item', labelAr: 'النفقات الرأسمالية', labelEn: 'Capital Expenditures', values: [-300000, -250000, -180000], negative: true },
                    { kind: 'item', labelAr: 'استثمارات أخرى', labelEn: 'Other Investments', values: [-50000, -30000, -20000], negative: true },
                    { kind: 'total', labelAr: 'التدفق النقدي الاستثماري', labelEn: 'Investing Cash Flow', values: [-350000, -280000, -200000], tone: 'red' },
                    { kind: 'group', labelAr: 'الأنشطة التمويلية', labelEn: 'FINANCING ACTIVITIES' },
                    { kind: 'item', labelAr: 'سداد الديون', labelEn: 'Debt Repayment', values: [-100000, -80000, -70000], negative: true },
                    { kind: 'item', labelAr: 'توزيعات الأرباح', labelEn: 'Dividends Paid', values: [-80000, -70000, -50000], negative: true },
                    { kind: 'total', labelAr: 'التدفق النقدي التمويلي', labelEn: 'Financing Cash Flow', values: [-180000, -150000, -120000], tone: 'red' },
                    { kind: 'total', labelAr: 'صافي التغير في النقد', labelEn: 'Net Change in Cash', values: [390000, 350000, 330000], tone: 'green' },
                  ];

                  const incomeMetrics = [
                    { labelAr: 'هامش الربح الإجمالي', labelEn: 'Gross Margin', value: '30%', accent: '#F59E0B' },
                    { labelAr: 'هامش الربح التشغيلي', labelEn: 'Operating Margin', value: '12%', accent: '#10B981' },
                    { labelAr: 'هامش الربح الصافي', labelEn: 'Net Margin', value: '8%', accent: '#10B981' },
                    { labelAr: 'النمو السنوي', labelEn: 'YoY Growth', value: '+18%', accent: '#10B981' },
                  ];

                  const balanceMetrics = [
                    { labelAr: 'النسبة الجارية', labelEn: 'Current Ratio', value: '2.33x', accent: '#10B981' },
                    { labelAr: 'الديون إلى حقوق الملكية', labelEn: 'Debt-to-Equity', value: '0.68x', accent: '#10B981' },
                    { labelAr: 'النسبة السريعة', labelEn: 'Quick Ratio', value: '1.85x', accent: '#10B981' },
                    { labelAr: 'دوران الأصول', labelEn: 'Asset Turnover', value: '1.63x', accent: '#F59E0B' },
                  ];

                  const cashflowMetrics = [
                    { labelAr: 'نسبة التدفق التشغيلي', labelEn: 'Operating Cash Ratio', value: '0.77x', accent: '#10B981' },
                    { labelAr: 'التدفق النقدي الحر', labelEn: 'Free Cash Flow', value: '620K', accent: '#10B981' },
                    { labelAr: 'تحويل النقد', labelEn: 'Cash Conversion', value: '135%', accent: '#10B981' },
                    { labelAr: 'الإنفاق الرأسمالي/الإيرادات', labelEn: 'CapEx to Revenue', value: '3.5%', accent: '#F59E0B' },
                  ];

                  const rows = financialsTab === 'income' ? incomeRows : financialsTab === 'balance' ? balanceRows : cashflowRows;
                  const metrics = financialsTab === 'income' ? incomeMetrics : financialsTab === 'balance' ? balanceMetrics : cashflowMetrics;
                  const negativeColor = tk.isVIP ? '#FCA5A5' : '#DC2626';
                  const totalTone = (tone?: 'green' | 'red' | 'neutral') =>
                    tone === 'green' ? tk.successText : tone === 'red' ? negativeColor : tk.textPrimary;

                  return (
                    <>
                      {/* Statement table */}
                      <div
                        className="rounded-xl overflow-hidden mb-5"
                        style={{ border: `1px solid ${tk.divider}` }}
                      >
                        <div className="overflow-x-auto">
                          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ background: tk.innerSurface, borderBottom: `1px solid ${tk.divider}` }}>
                                <th className="text-start px-4 py-3 text-[11px] uppercase" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em' }}>
                                  {isAr ? 'البند' : 'Item'}
                                </th>
                                {[2023, 2022, 2021].map((y) => (
                                  <th key={y} className="text-end px-4 py-3 text-[11px] tabular-nums" style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.06em' }}>
                                    {y}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, i) => {
                                const isLast = i === rows.length - 1;

                                if (row.kind === 'group') {
                                  return (
                                    <tr
                                      key={i}
                                      style={{
                                        background: tk.innerSurface,
                                        borderBottom: `1px solid ${tk.divider}`,
                                      }}
                                    >
                                      <td
                                        colSpan={4}
                                        className="px-4 py-2 text-[10.5px] uppercase"
                                        style={{ fontWeight: 700, color: tk.textMuted, letterSpacing: '0.08em' }}
                                      >
                                        {isAr ? row.labelAr : row.labelEn}
                                      </td>
                                    </tr>
                                  );
                                }

                                if (row.kind === 'total') {
                                  const tone = totalTone(row.tone);
                                  const isHighlight = row.tone === 'green';
                                  return (
                                    <tr
                                      key={i}
                                      style={{
                                        borderBottom: isLast ? 'none' : `1px solid ${tk.divider}`,
                                        background: isHighlight
                                          ? (tk.isVIP ? 'rgba(43,182,115,0.06)' : '#F0FDF4')
                                          : 'transparent',
                                      }}
                                    >
                                      <td className="px-4 py-3.5 text-[13px]" style={{ color: tone, fontWeight: 700 }}>
                                        {isAr ? row.labelAr : row.labelEn}
                                      </td>
                                      {row.values.map((v, j) => (
                                        <td
                                          key={j}
                                          className="px-4 py-3.5 text-end text-[13px] tabular-nums"
                                          style={{ fontWeight: 700, color: tone }}
                                        >
                                          <span className="inline-flex items-center gap-1" dir="ltr">
                                            {v < 0 ? '- ' : ''}{formatSAR(Math.abs(v), { decimals: 0 })}
                                            {row.showTrend && j === 0 && (
                                              <ArrowUpRight className="w-3 h-3 opacity-80" strokeWidth={2.2} style={{ color: tk.successText }} />
                                            )}
                                          </span>
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                }

                                const itemColor = row.negative ? negativeColor : tk.textPrimary;
                                return (
                                  <tr
                                    key={i}
                                    style={{
                                      borderBottom: isLast ? 'none' : `1px solid ${tk.divider}`,
                                      transition: 'background-color 0.15s',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = tk.innerSurface; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                  >
                                    <td
                                      className={`${isAr ? 'pe-4 ps-8' : 'ps-8 pe-4'} py-3 text-[13px]`}
                                      style={{ color: tk.textSecondary, fontWeight: 500 }}
                                    >
                                      {isAr ? row.labelAr : row.labelEn}
                                    </td>
                                    {row.values.map((v, j) => (
                                      <td
                                        key={j}
                                        className="px-4 py-3 text-end text-[13px] tabular-nums"
                                        style={{ fontWeight: 600, color: itemColor }}
                                      >
                                        <span dir="ltr">
                                          {v < 0 ? '- ' : ''}{formatSAR(Math.abs(v), { decimals: 0 })}
                                        </span>
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 4 metric cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                        {metrics.map((m, i) => (
                          <div
                            key={i}
                            className="rounded-xl overflow-hidden"
                            style={{ background: tk.cardBg, border: `1px solid ${tk.divider}` }}
                          >
                            <div className="p-4">
                              <div className="text-[11px] mb-1.5" style={{ fontWeight: 500, color: tk.textMuted }}>
                                {isAr ? m.labelAr : m.labelEn}
                              </div>
                              <div className="text-[22px] tabular-nums" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.02em' }}>
                                {m.value}
                              </div>
                            </div>
                            <div className="h-[2px]" style={{ background: m.accent }} />
                          </div>
                        ))}
                      </div>

                      {/* Disclaimer */}
                      <div
                        className="flex items-start gap-2.5 p-3 rounded-xl"
                        style={{ background: tk.innerSurface, border: `1px solid ${tk.divider}` }}
                      >
                        <Info className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.8} style={{ color: tk.textMuted }} />
                        <p className="text-[11.5px] leading-relaxed" style={{ color: tk.textSecondary }}>
                          <span style={{ fontWeight: 700, color: tk.textPrimary }}>
                            {isAr ? 'إخلاء مسؤولية:' : 'Disclaimer:'}
                          </span>{' '}
                          {isAr
                            ? 'البيانات المالية مبنية على قوائم مدققة. الأداء السابق لا يضمن النتائج المستقبلية.'
                            : "Financial information based on audited statements. Past performance doesn't guarantee future results."}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </section>
          )}

          {/* ── DOCUMENTS TAB ──────────────────────────────────────────── */}
          {sectionTab === 'documents' && (
            <section
              className="rounded-2xl overflow-hidden"
              style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
            >
              <header className="px-7 pt-6 pb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: tk.isVIP
                        ? 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(37,99,235,0.18) 100%)'
                        : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`,
                    }}
                  >
                    <FileStack className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.isVIP ? '#60A5FA' : '#1D4ED8' }} />
                  </div>
                  <div>
                    <h2 className="text-[16px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                      {isAr ? 'المستندات المتاحة' : 'Available Documents'}
                    </h2>
                    <p className="text-[11px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                      {isAr ? '5 مستندات مدققة جاهزة للتنزيل' : '5 audited documents ready to download'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toast.success(
                    isAr ? 'بدأ تنزيل جميع المستندات' : 'Downloading all documents',
                    { duration: 2400 },
                  )}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] cursor-pointer transition-colors"
                  style={{
                    fontWeight: 600,
                    color: tk.isVIP ? '#60A5FA' : '#1D4ED8',
                    border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.25)' : '#DBEAFE'}`,
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = tk.isVIP ? 'rgba(96,165,250,0.08)' : '#EFF6FF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  {isAr ? 'تنزيل الكل' : 'Download all'}
                </button>
              </header>
              <div className="px-7 pb-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {([
                    { nameAr: 'مذكرة المعلومات', nameEn: 'Information Memorandum', size: '2.4 MB', icon: ScrollText },
                    { nameAr: 'القوائم المالية المدققة', nameEn: 'Financial Statements (Audited)', size: '1.8 MB', icon: ChartLine },
                    { nameAr: 'نموذج عقد الاستثمار', nameEn: 'Investment Contract Template', size: '890 KB', icon: FileText },
                    { nameAr: 'سند إذني', nameEn: 'Promissory Note', size: '450 KB', icon: Receipt },
                    { nameAr: 'وثائق الضمانات', nameEn: 'Collateral Documentation', size: '1.2 MB', icon: ShieldCheck },
                  ]).map((doc, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.success(
                          isAr ? `بدأ تنزيل ${doc.nameAr}` : `Downloading ${doc.nameEn}`,
                          { duration: 2400 },
                        );
                      }}
                      className="relative flex items-center gap-3.5 p-4 rounded-xl transition-all group overflow-hidden cursor-pointer"
                      style={{ background: tk.cardBg, border: `1px solid ${tk.innerBorder}`, textDecoration: 'none' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = tk.cardHoverBorder;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = tk.isVIP ? '0 6px 20px -8px rgba(96,165,250,0.2)' : '0 6px 20px -8px rgba(37,99,235,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = tk.innerBorder;
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative"
                        style={{
                          background: tk.isVIP
                            ? 'linear-gradient(135deg, rgba(248,113,113,0.12) 0%, rgba(220,38,38,0.16) 100%)'
                            : 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                          border: `1px solid ${tk.isVIP ? 'rgba(248,113,113,0.22)' : '#FECACA'}`,
                        }}
                      >
                        <doc.icon className="w-[18px] h-[18px]" strokeWidth={1.7} style={{ color: tk.isVIP ? '#F87171' : '#DC2626' }} />
                        <span
                          className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-[14px] px-1 rounded text-[8px]"
                          style={{
                            background: tk.isVIP ? '#7F1D1D' : '#DC2626',
                            color: '#fff',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            boxShadow: '0 2px 4px rgba(220,38,38,0.4)',
                          }}
                        >
                          PDF
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13.5px] truncate" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>
                          {isAr ? doc.nameAr : doc.nameEn}
                        </div>
                        <div className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                          <span>{doc.size}</span>
                          <span style={{ color: tk.textFaint }}>·</span>
                          <span>{isAr ? 'محدّث' : 'Updated Jan 2026'}</span>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{
                          background: tk.innerSurface,
                          color: tk.textMuted,
                        }}
                      >
                        <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" strokeWidth={1.8} />
                      </div>
                    </a>
                  ))}
                </div>
                <div
                  className="flex items-center justify-between mt-5 pt-4 text-[11px]"
                  style={{ color: tk.textFaint, borderTop: `1px solid ${tk.divider}` }}
                >
                  <span className="flex items-center gap-1.5">
                    <ClockArrowUp className="w-3 h-3" strokeWidth={1.8} />
                    {isAr ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
                  </span>
                  <span style={{ color: tk.textMuted, fontWeight: 500 }}>
                    {isAr ? '5 ملفات · 6.7 ميجابايت إجمالي' : '5 files · 6.7 MB total'}
                  </span>
                </div>
              </div>
            </section>
          )}

          </div>
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block w-[380px] flex-shrink-0">
          <div className="rounded-2xl p-8 sticky top-20" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.isVIP ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)' }}>

          {invested && !reinvesting ? (
            <div>
              <div className="flex items-center justify-center mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: tk.successBg }}>
                  <CheckCircle className="w-7 h-7" strokeWidth={1.5} style={{ color: tk.successText }} />
                </div>
              </div>
              <div className="text-[20px] text-center mb-1" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.invested')}</div>
              <div className="text-[13px] text-center mb-6" style={{ color: tk.textSecondary }}>{t('opp.investedSubtitle')}</div>

              <div className="rounded-[12px] p-4 mb-4 text-center" style={{ backgroundColor: tk.innerSurface }}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[12px]" style={{ fontWeight: 500, color: tk.textMuted }}>
                    {investmentCount > 1 ? t('opp.totalInvested') : t('opp.yourInvestment')}
                  </span>
                  {investmentCount > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: tk.successBg, color: tk.successText, fontWeight: 600 }}>
                      {investmentCount}× {t('opp.investments')}
                    </span>
                  )}
                </div>
                <div className="text-[28px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(investedAmount, { decimals: 0 })}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-[12px] p-3 text-center" style={{ backgroundColor: tk.successBg, border: `1px solid ${tk.successBorder}` }}>
                  <div className="text-[10px] mb-0.5" style={{ fontWeight: 500, color: tk.textSecondary }}>{t('opp.netReturn')}</div>
                  <div className="text-[16px]" style={{ fontWeight: 700, color: tk.successText }}>
                    {formatSAR(Math.round(investedAmount * (opp.roi / 100) * (opp.duration / 12) - investedAmount * 0.02 - investedAmount * 0.02 * 0.15), { decimals: 0 })}
                  </div>
                </div>
                <div className="rounded-[12px] p-3 text-center" style={{ backgroundColor: tk.infoBg, border: `1px solid ${tk.infoBorder}` }}>
                  <div className="text-[10px] mb-0.5" style={{ fontWeight: 500, color: tk.textSecondary }}>{t('opp.nextPayment')}</div>
                  <div className="text-[16px]" style={{ fontWeight: 700, color: tk.infoText }}>{isAr ? '١٥ يونيو' : 'Jun 15'}</div>
                </div>
              </div>

              <div className="border-t pt-4 mb-5" style={{ borderColor: tk.divider }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: tk.successText }} />
                  <div className="flex-1">
                    <div className="text-[12px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{isAr ? 'تم تأكيد الاستثمار' : 'Investment confirmed'}</div>
                    <div className="text-[11px]" style={{ color: tk.textMuted }}>{isAr ? 'اليوم' : 'Today'}</div>
                  </div>
                </div>
                <div className="w-px h-3 mx-[3.5px] my-1" style={{ backgroundColor: tk.divider }} />
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ border: `1.5px solid ${tk.divider}` }} />
                  <div className="flex-1">
                    <div className="text-[12px]" style={{ color: tk.textSecondary }}>{isAr ? 'أول دفعة متوقعة' : 'First payment expected'}</div>
                    <div className="text-[11px]" style={{ color: tk.textMuted }}>{isAr ? '١٥ يونيو ٢٠٢٦' : 'Jun 15, 2026'}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setReinvesting(true); setAmount(opp.minInvestment); }}
                className="w-full h-12 rounded-[12px] text-[14px] text-white transition-all duration-200 active:scale-[0.98] mb-2 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${tk.primary} 0%, ${tk.primary} 100%)`,
                  fontWeight: 600,
                  boxShadow: tk.primaryShadow,
                }}
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                {t('opp.reinvest')}
              </button>
              <button
                onClick={() => navigate('/app/portfolio')}
                className="w-full h-11 rounded-[12px] text-[13px] transition-colors mb-2"
                style={{ fontWeight: 600, border: tk.secondaryBtnBorder, color: tk.textPrimary, background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {t('opp.viewPortfolio')}
              </button>
              <button
                onClick={() => navigate('/app/opportunities')}
                className="w-full h-10 rounded-[12px] text-[13px] transition-colors"
                style={{ fontWeight: 500, color: tk.textSecondary, background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {t('opp.browseMore')}
              </button>
            </div>
          ) : (
            <div>
            {reinvesting && (
              <button
                onClick={() => setReinvesting(false)}
                className="flex items-center gap-1.5 text-[12px] mb-4 transition-colors hover:opacity-80"
                style={{ color: tk.textSecondary, fontWeight: 500 }}
              >
                <BackArrow className="w-3.5 h-3.5" strokeWidth={2} />
                {isAr ? 'العودة للملخص' : 'Back to summary'}
              </button>
            )}
            <h3 className="text-[22px] text-center mb-1" style={{ fontWeight: 700, color: tk.textPrimary }}>
              {reinvesting ? (isAr ? 'استثمر مرة أخرى' : 'Invest Again') : t('opp.startInvesting')}
            </h3>
            <p className="text-[14px] text-center mb-6" style={{ color: tk.textSecondary }}>{t('opp.enterAmount')}</p>

            <div className="mb-6">
              <div
                className="group rounded-2xl p-5 text-center transition-all duration-300"
                style={{
                  background: tk.isVIP ? tk.innerSurface : 'transparent',
                  border: `2px solid ${amount > 0 ? tk.primary : tk.innerBorder}`,
                  boxShadow: amount > 0 ? `0 0 0 4px ${tk.focusRingColor}` : 'none',
                }}
              >
                <div
                  className="text-[13px] mb-3 transition-colors duration-200"
                  style={{ fontWeight: 500, color: amount > 0 ? (tk.isVIP ? tk.infoText : tk.primary) : tk.textMuted }}
                >
                  {t('opp.amountLabel')}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount || ''}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setAmount(raw ? parseInt(raw, 10) : 0);
                  }}
                  placeholder={t('opp.amountPlaceholder')}
                  className="w-full text-center text-[42px] outline-none bg-transparent transition-all duration-200"
                  style={{ fontWeight: 700, color: tk.isVIP ? tk.infoText : tk.primary }}
                />
                {amount > 0 && (
                  <div
                    className="text-[12px] mt-2 transition-opacity duration-300"
                    style={{ fontWeight: 500, opacity: 0.7, color: tk.isVIP ? tk.infoText : tk.primary }}
                  >
                    {amount.toLocaleString('en-US')} ﷼
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[12px]" style={{ fontWeight: 500, color: tk.textMuted }}>
                  {t('opp.minLabel')}: {formatSAR(opp.minInvestment, { decimals: 0 })}
                </span>
                {amount > 0 && amount < opp.minInvestment && (
                  <span className="text-[11px] transition-opacity duration-200" style={{ fontWeight: 500, color: tk.dangerText }}>
                    — {t('opp.belowMin')}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[13px] text-center mb-3" style={{ fontWeight: 500, color: tk.textMuted }}>{t('opp.quickSelect')}</div>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 25000].map((v) => {
                  const selected = amount === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setAmount(v)}
                      className="h-12 rounded-full text-[16px] transition-all duration-200 active:scale-95"
                      style={{
                        fontWeight: 600,
                        border: selected ? `2px solid ${tk.primary}` : `1px solid ${tk.innerBorder}`,
                        color: selected ? (tk.isVIP ? tk.infoText : tk.primary) : tk.textSecondary,
                        backgroundColor: selected ? (tk.isVIP ? 'rgba(37,99,235,0.12)' : 'rgba(29, 78, 216, 0.04)') : 'transparent',
                        boxShadow: selected ? `0 0 0 3px ${tk.focusRingColor}` : 'none',
                      }}
                    >
                      {(v / 1000).toFixed(0)}K
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-[13px] mb-2" style={{ fontWeight: 500, color: tk.textMuted }}>{t('opp.expectedReturn')} ({opp.duration} {t('opp.months')})</div>
              <div
                className="transition-all duration-300"
                style={{
                  fontSize: amount >= opp.minInvestment ? 36 : 28,
                  fontWeight: 700,
                  color: amount >= opp.minInvestment ? tk.successText : tk.textFaint,
                  transform: amount >= opp.minInvestment ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                {amount >= opp.minInvestment ? formatSAR(expectedReturn, { decimals: 0 }) : '—'}
              </div>
            </div>

            {(() => {
              const walletBalance = 45000;
              const insufficient = amount > walletBalance;
              const valid = amount >= opp.minInvestment;
              return (
                <div className="flex items-center justify-between mb-4 text-[12px]">
                  <span style={{ fontWeight: 400, color: tk.textMuted }}>
                    {t('opp.walletBalance')}: <span style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(walletBalance, { decimals: 0 })}</span>
                  </span>
                  {insufficient && valid ? (
                    <span className="transition-opacity duration-200" style={{ fontWeight: 500, color: tk.dangerText }}>{t('opp.insufficientBalance')}</span>
                  ) : (
                    <button className="hover:underline" style={{ fontWeight: 500, color: tk.isVIP ? tk.infoText : tk.primary }}>{t('opp.addBalance')}</button>
                  )}
                </div>
              );
            })()}

            <div className="border-t mb-5" style={{ borderColor: tk.divider }} />

            {(() => {
              const walletBalance = 45000;
              const canInvest = amount >= opp.minInvestment && amount <= walletBalance;
              return (
                <button
                  className="w-full h-14 rounded-full text-[18px] text-white transition-all duration-200 active:scale-[0.98]"
                  style={{
                    backgroundColor: canInvest ? tk.primary : tk.primaryDisabledBg,
                    color: canInvest ? '#fff' : tk.primaryDisabledColor,
                    fontWeight: 700,
                    cursor: canInvest ? 'pointer' : 'not-allowed',
                    boxShadow: canInvest ? tk.primaryShadow : 'none',
                  }}
                  disabled={!canInvest}
                  onClick={() => canInvest && setModalOpen(true)}
                >
                  {t('opp.investNow')}
                </button>
              );
            })()}
            </div>
          )}

          </div>
        </div>
      </div>

      <InvestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setInvested(true);
          setInvestedAmount((prev) => prev + amount);
          setInvestmentCount((prev) => prev + 1);
          setReinvesting(false);
        }}
        amount={amount}
        roi={opp.roi}
        duration={opp.duration}
      />
    </div>
  );
}
