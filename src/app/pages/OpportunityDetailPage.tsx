import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowRight, Building2, Shield, CheckCircle,
  FileText, Users, Banknote, MapPin, Calendar,
  DollarSign, Repeat, AlertTriangle, Download,
  X, Info, Loader2, ShieldCheck,
} from 'lucide-react';
import { formatSAR } from '../utils/currency';
import confetti from 'canvas-confetti';
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
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: tk.divider }}>
          <h2 className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary }}>
            {success ? 'تم بنجاح' : loading ? 'جارٍ التنفيذ' : step === 1 ? 'تفاصيل الاستثمار' : step === 2 ? 'ملخص الاستثمار' : 'تأكيد الاستثمار'}
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
                <div className="text-[12px] mb-1" style={{ fontWeight: 500, color: tk.textMuted }}>مبلغ الاستثمار</div>
                <div className="text-[28px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(profit, { decimals: 0 })}</span>
                  <span className="text-[13px]" style={{ color: tk.textSecondary }}>الأرباح المتوقعة</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px]" style={{ fontWeight: 600, color: tk.dangerText }}>-{formatSAR(fee, { decimals: 0 })}</span>
                    <button className="group relative">
                      <Info className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: tk.textFaint }} />
                    </button>
                  </div>
                  <span className="text-[13px]" style={{ color: tk.textSecondary }}>رسوم المنصة (2%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px]" style={{ fontWeight: 600, color: tk.dangerText }}>-{formatSAR(vat, { decimals: 0 })}</span>
                    <button className="group relative">
                      <Info className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: tk.textFaint }} />
                    </button>
                  </div>
                  <span className="text-[13px]" style={{ color: tk.textSecondary }}>ضريبة القيمة المضافة (15%)</span>
                </div>
              </div>

              <div className="border-t my-4" style={{ borderColor: tk.divider }} />

              <div className="flex items-center justify-between">
                <span className="text-[18px]" style={{ fontWeight: 700, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</span>
                <span className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>صافي العائد</span>
              </div>
            </div>
          )}

          {/* STEP 2 — Summary */}
          {step === 2 && (
            <div>
              <div className="text-center mb-5">
                <div className="text-[12px] mb-1" style={{ fontWeight: 500, color: tk.textMuted }}>مبلغ الاستثمار</div>
                <div className="text-[36px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-[12px] p-4 text-center" style={{ backgroundColor: tk.successBg, border: `1px solid ${tk.successBorder}` }}>
                  <div className="text-[11px] mb-1" style={{ fontWeight: 500, color: tk.textSecondary }}>صافي العائد</div>
                  <div className="text-[20px]" style={{ fontWeight: 700, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</div>
                </div>
                <div className="rounded-[12px] p-4 text-center" style={{ backgroundColor: tk.infoBg, border: `1px solid ${tk.infoBorder}` }}>
                  <div className="text-[11px] mb-1" style={{ fontWeight: 500, color: tk.textSecondary }}>إجمالي المبلغ</div>
                  <div className="text-[20px]" style={{ fontWeight: 700, color: tk.infoText }}>{formatSAR(totalPayout, { decimals: 0 })}</div>
                </div>
              </div>

              <div className="rounded-[12px] p-4 mb-5 space-y-2.5" style={{ backgroundColor: tk.innerSurface }}>
                <div className="flex items-center justify-between text-[12px]">
                  <span style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</span>
                  <span style={{ color: tk.textMuted }}>رأس المال</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span style={{ fontWeight: 600, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</span>
                  <span style={{ color: tk.textMuted }}>صافي الأرباح</span>
                </div>
                <div className="border-t pt-2.5" style={{ borderColor: tk.divider }}>
                  <div className="flex items-center justify-between text-[13px]">
                    <span style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(totalPayout, { decimals: 0 })}</span>
                    <span style={{ fontWeight: 600, color: tk.textPrimary }}>إجمالي المبلغ عند الاستحقاق</span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-5">
                <span className="text-[12px]" style={{ color: tk.textMuted }}>العائد الفعلي: </span>
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
                  أقر بأنني قرأت وفهمت المخاطر المرتبطة بهذا الاستثمار وأوافق على الشروط والأحكام
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
              <div className="text-[14px] mb-1" style={{ fontWeight: 600, color: tk.textPrimary }}>أدخل رمز التحقق</div>
              <div className="text-[12px] mb-6" style={{ color: tk.textMuted }}>
                تم إرسال رمز التحقق إلى <span style={{ fontWeight: 500, color: tk.textPrimary }}>٠٥٥•••••٨٩</span>
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
                  <span>إعادة الإرسال خلال <span style={{ fontWeight: 600, color: tk.textPrimary }}>{countdown} ثانية</span></span>
                ) : (
                  <button
                    onClick={() => setCountdown(60)}
                    className="hover:underline"
                    style={{ fontWeight: 500, color: tk.primary }}
                  >
                    إعادة إرسال الرمز
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
              <div className="text-[16px] mb-1" style={{ fontWeight: 600, color: tk.textPrimary }}>جارٍ تنفيذ الاستثمار...</div>
              <div className="text-[13px]" style={{ color: tk.textMuted }}>يرجى الانتظار لحظات</div>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: tk.successBg }}>
                <CheckCircle className="w-10 h-10" strokeWidth={1.5} style={{ color: tk.successText }} />
              </div>

              <div className="text-[24px] mb-3" style={{ fontWeight: 700, color: tk.textPrimary }}>تم الاستثمار بنجاح!</div>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: tk.textSecondary }}>
                تم استثمار <span style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(amount, { decimals: 0 })}</span> في
                <br />
                تمويل مشروع سكني - الدمام
              </p>

              <div className="border-t mx-8 mb-6" style={{ borderColor: tk.divider }} />

              <div className="grid grid-cols-2 gap-6 mb-6 px-4">
                <div>
                  <div className="text-[12px] mb-1.5" style={{ fontWeight: 500, color: tk.textMuted }}>الأرباح المتوقعة</div>
                  <div className="text-[24px]" style={{ fontWeight: 700, color: tk.successText }}>{formatSAR(netReturn, { decimals: 0 })}</div>
                </div>
                <div>
                  <div className="text-[12px] mb-1.5" style={{ fontWeight: 500, color: tk.textMuted }}>إجمالي الاستحقاق</div>
                  <div className="text-[24px]" style={{ fontWeight: 700, color: tk.infoText }}>{formatSAR(totalPayout, { decimals: 0 })}</div>
                </div>
              </div>

              <div className="border-t mx-8 mb-6" style={{ borderColor: tk.divider }} />

              <div className="text-[13px] mb-8" style={{ color: tk.textMuted }}>
                سيتم إرسال التفاصيل إلى بريدك الإلكتروني
              </div>

              <button
                onClick={handleDone}
                className="w-full h-12 rounded-[12px] text-[15px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{ backgroundColor: tk.primary, fontWeight: 600 }}
              >
                الذهاب إلى استثماراتي
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
              {step === 1 ? 'إلغاء' : 'رجوع'}
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
              {step === 1 && 'متابعة'}
              {step === 2 && 'تأكيد والتحقق'}
              {step === 3 && 'تحقق واستثمر'}
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
  const { t } = useI18n();
  const tk = useTokens();
  const [amount, setAmount] = useState(5000);
  const [chartTab, setChartTab] = useState<'returns' | 'growth'>('returns');
  const [sectionTab, setSectionTab] = useState<'overview' | 'returns' | 'risk' | 'borrower'>('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [invested, setInvested] = useState(false);
  const [investedAmount, setInvestedAmount] = useState(0);

  const expectedReturn = Math.round(amount * (opp.roi / 100) * (opp.duration / 12));
  const grades = ['E', 'D', 'C', 'B', 'A'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      <button
        onClick={() => navigate('/app/opportunities')}
        className="flex items-center gap-1.5 text-[14px] mb-6 transition-colors"
        style={{ fontWeight: 500, color: tk.textSecondary }}
        onMouseEnter={e => (e.currentTarget.style.color = tk.textPrimary)}
        onMouseLeave={e => (e.currentTarget.style.color = tk.textSecondary)}
      >
        <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        العودة إلى الفرص
      </button>

      <div className="flex gap-6">

        {/* MAIN COLUMN */}
        <div className="flex-1 min-w-0">

          {/* HERO CARD — gradient (navy, same in both modes — already dark) */}
          <div className="relative rounded-2xl overflow-hidden p-8" style={{ background: 'linear-gradient(155deg, #001D5A 0%, #0D82F9 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
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
              <h1 className="text-[32px] text-white text-right mb-2" style={{ fontWeight: 700 }}>{opp.title}</h1>
              <p className="text-[16px] text-white/90 mb-8">{opp.pitch}</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>العائد السنوي</div>
                  <div className="text-[28px] text-white" style={{ fontWeight: 700 }}>+{opp.roi}%</div>
                </div>
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>المدة</div>
                  <div className="text-[20px] text-white" style={{ fontWeight: 700 }}>{opp.duration} شهر</div>
                </div>
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>التصنيف</div>
                  <div className="text-[20px] text-[#F59E0B]" style={{ fontWeight: 700 }}>{opp.risk}</div>
                </div>
                <div>
                  <div className="text-[12px] text-white/70 mb-1.5" style={{ fontWeight: 500 }}>نوع التمويل</div>
                  <div className="text-[14px] text-white" style={{ fontWeight: 600 }}>{opp.type}</div>
                </div>
              </div>

              <div className="rounded-[20px] p-5" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-[20px] px-4 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <div className="text-[28px] text-white text-center" style={{ fontWeight: 700 }}>{opp.fundingPct}%</div>
                    <div className="text-[11px] text-white/80 text-center" style={{ fontWeight: 500 }}>مكتمل</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-white/80 mb-1" style={{ fontWeight: 500 }}>التمويل المجموع</div>
                    <div className="text-[24px] text-white" style={{ fontWeight: 700 }}>{formatSAR(opp.raisedAmount, { decimals: 0 })}</div>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: `${opp.fundingPct}%`, background: 'linear-gradient(90deg, white, #E0F2FE)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/90" style={{ fontWeight: 600 }}>{opp.investors} مستثمر</span>
                  <span className="text-white/70" style={{ fontWeight: 500 }}>من إجمالي {formatSAR(opp.targetAmount, { decimals: 0 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION TABS */}
          <div className="flex items-center gap-1 mt-6 mb-6 border-b" style={{ borderColor: tk.tabBorder }}>
            {([
              { key: 'overview' as const, label: 'نظرة عامة' },
              { key: 'returns' as const, label: 'العوائد والدفعات' },
              { key: 'risk' as const, label: 'المخاطر' },
              { key: 'borrower' as const, label: 'المقترض والمستندات' },
            ] as const).map(tab => {
              const active = sectionTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSectionTab(tab.key)}
                  className="px-4 py-3 text-[13px] border-b-2 -mb-px transition-all"
                  style={{
                    fontWeight: active ? 600 : 500,
                    borderColor: active ? tk.tabActiveBorder : 'transparent',
                    color: active ? tk.tabActiveText : tk.tabInactiveText,
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          <div className="space-y-6">

          {/* OVERVIEW TAB */}
          {sectionTab === 'overview' && (
          <>
          <div>
            <h2 className="text-[18px] mb-6" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.whyThis')}</h2>
            <div className="grid grid-cols-3 gap-5">
              {[
                { icon: DollarSign, title: 'استخدام الأموال', desc: opp.whyCards[0].text },
                { icon: Building2, title: 'ملخص المشروع', desc: opp.whyCards[1].text },
                { icon: MapPin, title: 'الموقع والقطاع', desc: 'الدمام، المملكة العربية السعودية — قطاع التطوير العقاري' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-[14px] p-6 transition-all duration-200 cursor-default"
                  style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = tk.cardHoverBorder; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = tk.isVIP ? 'rgba(255,255,255,0.06)' : '#E5E7EB'; }}
                >
                  <div className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4" style={{ backgroundColor: tk.infoBg }}>
                    <card.icon className="w-5 h-5" strokeWidth={1.5} style={{ color: tk.infoText }} />
                  </div>
                  <div className="text-[14px] mb-2" style={{ fontWeight: 600, color: tk.textPrimary }}>{card.title}</div>
                  <p className="text-[13px] leading-relaxed" style={{ color: tk.textSecondary }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <h2 className="text-[18px] mb-5" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.projectDetails')}</h2>
            <div className="flex items-center">
              {[
                { label: 'إجمالي التمويل', value: '500,000 ﷼', icon: Banknote },
                { label: 'عدد المستثمرين', value: '42 مستثمر', icon: Users },
                { label: 'تكرار السداد', value: 'شهري', icon: Repeat },
                { label: 'الحد الأدنى', value: '5,000 ﷼', icon: DollarSign },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} style={{ color: tk.textMuted }} />
                    <div>
                      <div className="text-[16px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary }}>{item.value}</div>
                      <div className="text-[11px] mt-0.5" style={{ fontWeight: 500, color: tk.textMuted }}>{item.label}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-8 mx-auto" style={{ backgroundColor: tk.divider }} />
                  )}
                </div>
              ))}
            </div>
          </div>
          </>
          )}

          {/* RETURNS TAB */}
          {sectionTab === 'returns' && (
          <>
          <div className="rounded-[16px] p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <h2 className="text-[18px] mb-6" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.expectedReturns')}</h2>

            <div className="rounded-[12px] p-5 mb-6" style={{ backgroundColor: tk.successBg, border: `1px solid ${tk.successBorder}` }}>
              <div className="text-[12px] mb-3" style={{ fontWeight: 500, color: tk.textSecondary }}>إجمالي العوائد المتوقعة</div>
              <div className="text-[32px] leading-none" style={{ fontWeight: 700, color: tk.successText }}>
                {formatSAR(opp.totalReturns, { decimals: 0 })}
              </div>
            </div>

            <div className="rounded-[12px] p-5 mb-6" style={{ backgroundColor: tk.infoBg, border: `1px solid ${tk.infoBorder}` }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[12px] mb-3" style={{ fontWeight: 500, color: tk.textSecondary }}>الدفعة القادمة</div>
                  <div className="text-[24px] leading-none" style={{ fontWeight: 700, color: tk.infoText }}>
                    {formatSAR(opp.nextPaymentAmount, { decimals: 0 })}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] mt-1" style={{ fontWeight: 500, color: tk.textSecondary }}>
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ١٥ يونيو ٢٠٢٦
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1 flex items-center justify-between py-3 px-4 rounded-[10px]" style={{ backgroundColor: tk.innerSurface }}>
                <span className="text-[12px]" style={{ fontWeight: 500, color: tk.textSecondary }}>عدد الدفعات</span>
                <span className="text-[16px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{opp.paymentCount}</span>
              </div>
              <div className="flex-1 flex items-center justify-between py-3 px-4 rounded-[10px]" style={{ backgroundColor: tk.innerSurface }}>
                <span className="text-[12px]" style={{ fontWeight: 500, color: tk.textSecondary }}>متوسط الدفعة</span>
                <span className="text-[16px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(opp.avgPayment, { decimals: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[16px] p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.insights')}</h2>
              <select
                className="h-8 px-3 rounded-lg text-[12px] outline-none cursor-pointer appearance-none pr-8"
                style={{
                  fontWeight: 500,
                  color: tk.textSecondary,
                  background: tk.selectBg,
                  border: `1px solid ${tk.innerBorder}`,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='${encodeURIComponent(tk.textMuted)}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left 10px center',
                }}
              >
                <option>٦ أشهر</option>
                <option>٣ أشهر</option>
                <option>سنة</option>
                <option>الكل</option>
              </select>
            </div>

            <div className="flex items-center gap-5 mb-6 border-b" style={{ borderColor: tk.divider }}>
              {([
                { key: 'returns', label: 'توقعات العائد' },
                { key: 'growth', label: 'نمو التمويل' },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setChartTab(tab.key)}
                  className="relative pb-3 text-[13px] transition-colors"
                  style={{
                    fontWeight: chartTab === tab.key ? 600 : 400,
                    color: chartTab === tab.key ? tk.textPrimary : tk.textMuted,
                  }}
                >
                  {tab.label}
                  {chartTab === tab.key && (
                    <div className="absolute bottom-0 right-0 left-0 h-[2px] rounded-full" style={{ backgroundColor: tk.primary }} />
                  )}
                </button>
              ))}
            </div>

            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={tk.chartFillStart} stopOpacity={tk.chartFillAlpha} />
                      <stop offset="100%" stopColor={tk.chartFillStart} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={tk.gridStroke} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: tk.axisTick, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: tk.axisTick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
                  <Tooltip content={<ChartTip tk={tk} />} cursor={{ stroke: tk.gridStroke, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="value" stroke={tk.chartStroke} strokeWidth={1.5} fill="url(#chartFill)" dot={false} activeDot={{ r: 3, fill: tk.chartStroke, strokeWidth: 1.5, stroke: tk.cardBg }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[16px] p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <h2 className="text-[18px] mb-5" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.schedule')}</h2>

            <div className="rounded-[12px] p-5 mb-6 flex items-center justify-between" style={{ backgroundColor: tk.infoBg, border: `1px solid ${tk.infoBorder}` }}>
              <div>
                <div className="text-[12px] mb-1" style={{ fontWeight: 500, color: tk.textSecondary }}>الدفعة القادمة</div>
                <div className="text-[28px] leading-none" style={{ fontWeight: 700, color: tk.infoText }}>
                  {formatSAR(opp.nextPaymentAmount, { decimals: 0 })}
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-[12px] mb-1" style={{ fontWeight: 600, color: tk.infoText }}>
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ١٥ يونيو ٢٠٢٦
                </div>
                <div className="text-[11px]" style={{ fontWeight: 500, color: tk.textSecondary }}>خلال ٥ أيام</div>
              </div>
            </div>

            {(() => {
              const upcoming = opp.schedule.filter(r => r.status === 'upcoming');
              const current = opp.schedule.filter(r => r.status === 'current');
              const future = opp.schedule.filter(r => r.status === 'future');
              const remainingCount = current.length + future.length;
              const remainingAmount = [...current, ...future].reduce((s, r) => s + r.amount, 0);

              function statusLabel(s: string) {
                if (s === 'current') return 'خلال ٥ أيام';
                if (s === 'upcoming') return 'تم السداد';
                return 'مستقبلي';
              }
              function statusStyle(s: string) {
                if (s === 'current') return { bg: tk.infoBg, text: tk.infoText };
                if (s === 'upcoming') return { bg: tk.successBg, text: tk.successText };
                return { bg: tk.scheduleFutureBg, text: tk.scheduleFutureColor };
              }

              const renderRow = (row: typeof opp.schedule[0], i: number, isLast: boolean, isCurrent: boolean) => {
                const st = statusStyle(row.status);
                return (
                  <div key={`${row.date}-${i}`} className="flex items-stretch gap-4">
                    <div className="flex flex-col items-center w-8 flex-shrink-0">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: row.status === 'upcoming' ? tk.successText : isCurrent ? tk.primary : (tk.isVIP ? tk.divider : '#E5E7EB'),
                          boxShadow: isCurrent ? `0 0 0 4px ${tk.timelineDotRing}` : 'none',
                        }}
                      />
                      {!isLast && (
                        <div className="w-px flex-1 min-h-[40px]" style={{ backgroundColor: row.status === 'upcoming' ? tk.timelinePastLine : tk.timelineFutureLine }} />
                      )}
                    </div>
                    <div
                      className={`flex-1 flex items-center justify-between pb-5 ${isCurrent ? 'rounded-[10px] -mt-2 -mr-3 p-3 mb-2' : ''}`}
                      style={isCurrent ? { backgroundColor: tk.scheduleCurrentRowBg } : {}}
                    >
                      <div>
                        <div className="text-[13px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{row.month}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: tk.textMuted }}>{row.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[15px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(row.amount, { decimals: 0 })}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.text, fontWeight: 500 }}>
                          {statusLabel(row.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <div>
                  {upcoming.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[11px] mb-3 mr-12" style={{ fontWeight: 600, color: tk.successText }}>تم السداد ({upcoming.length})</div>
                      {upcoming.map((row, i) => renderRow(row, i, false, false))}
                    </div>
                  )}

                  {current.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[11px] mb-3 mr-12" style={{ fontWeight: 600, color: tk.infoText }}>الدفعة الحالية</div>
                      {current.map((row, i) => renderRow(row, i, false, true))}
                    </div>
                  )}

                  {future.length > 0 && (
                    <div>
                      <div className="text-[11px] mb-3 mr-12" style={{ fontWeight: 600, color: tk.textMuted }}>قادمة ({future.length})</div>
                      {future.map((row, i) => renderRow(row, i, i === future.length - 1, false))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: tk.divider }}>
                    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-[8px]" style={{ backgroundColor: tk.innerSurface }}>
                      <span className="text-[11px]" style={{ fontWeight: 500, color: tk.textMuted }}>إجمالي الدفعات</span>
                      <span className="text-[13px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{opp.paymentCount}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-[8px]" style={{ backgroundColor: tk.innerSurface }}>
                      <span className="text-[11px]" style={{ fontWeight: 500, color: tk.textMuted }}>المتبقية</span>
                      <span className="text-[13px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{remainingCount}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-[8px]" style={{ backgroundColor: tk.innerSurface }}>
                      <span className="text-[11px]" style={{ fontWeight: 500, color: tk.textMuted }}>المبلغ المتبقي</span>
                      <span className="text-[13px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(remainingAmount, { decimals: 0 })}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          </>
          )}

          {/* RISK TAB */}
          {sectionTab === 'risk' && (
          <>
          <div className="rounded-2xl p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <h2 className="text-[20px] mb-6" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.riskAssessment')}</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[14px] mb-4" style={{ fontWeight: 600, color: tk.textPrimary }}>التصنيف الائتماني</div>
                <div className="flex items-center gap-1 mb-4">
                  {grades.map((g) => (
                    <div
                      key={g}
                      className="flex-1 h-10 rounded-lg flex items-center justify-center text-[14px] transition-all"
                      style={{
                        fontWeight: g === opp.risk ? 700 : 500,
                        background: g === opp.risk ? tk.gradeActiveBg : tk.gradeInactiveBg,
                        color: g === opp.risk ? tk.gradeActiveText : tk.gradeInactiveText,
                      }}
                    >
                      {g}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] mb-4 leading-relaxed" style={{ color: tk.textSecondary }}>
                  التصنيف الائتماني B يعكس مستوى مخاطر متوسط مع ضمانات كافية.
                </p>
                <div className="text-[13px] mb-2" style={{ fontWeight: 600, color: tk.textPrimary }}>عوامل المخاطرة:</div>
                <ul className="space-y-1.5">
                  {opp.riskFactors.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px]" style={{ color: tk.textSecondary }}>
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} style={{ color: tk.warningText }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[14px] mb-3" style={{ fontWeight: 600, color: tk.textPrimary }}>الضمانات</div>
                <div className="flex items-start gap-2 mb-6 p-3 rounded-xl" style={{ backgroundColor: tk.successBg, border: `1px solid ${tk.successBorder}` }}>
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} style={{ color: tk.successText }} />
                  <span className="text-[13px]" style={{ color: tk.successDeep }}>{opp.guarantee}</span>
                </div>
                <div className="text-[14px] mb-3" style={{ fontWeight: 600, color: tk.textPrimary }}>توزيع المخاطر</div>
                <div className="space-y-2">
                  {[
                    { label: 'منخفض', pct: 20, color: tk.successText },
                    { label: 'متوسط', pct: 50, color: tk.warningText },
                    { label: 'مرتفع', pct: 30, color: tk.dangerText },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex items-center justify-between text-[12px] mb-1">
                        <span style={{ color: tk.textSecondary }}>{r.label}</span>
                        <span style={{ fontWeight: 600, color: tk.textPrimary }}>{r.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: tk.progressTrack }}>
                        <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </>
          )}

          {/* BORROWER TAB */}
          {sectionTab === 'borrower' && (
          <>
          <div className="rounded-2xl p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <h2 className="text-[20px] mb-4" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.borrowerInfo')}</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-[12px]" style={{ fontWeight: 500, color: tk.textSecondary }}>اسم الشركة</div>
                <div className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{opp.borrower.name}</div>
              </div>
              <div>
                <div className="text-[12px]" style={{ fontWeight: 500, color: tk.textSecondary }}>سنوات الخبرة</div>
                <div className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{opp.borrower.experience} سنة</div>
              </div>
              <div>
                <div className="text-[12px]" style={{ fontWeight: 500, color: tk.textSecondary }}>القطاع</div>
                <div className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{opp.borrower.sector}</div>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: tk.textSecondary }}>{opp.borrower.bio}</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}>
            <h2 className="text-[20px] mb-4" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.documents')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {opp.documents.map((doc, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors text-right"
                  style={{ border: `1px solid ${tk.innerBorder}`, background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = tk.innerSurface)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: tk.infoBg }}>
                    <FileText className="w-5 h-5" strokeWidth={1.5} style={{ color: tk.infoText }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>{doc.name}</div>
                    <div className="text-[12px]" style={{ color: tk.textSecondary }}>{doc.size}</div>
                  </div>
                  <Download className="w-4 h-4" strokeWidth={1.5} style={{ color: tk.textSecondary }} />
                </button>
              ))}
            </div>
          </div>
          </>
          )}

          </div>
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block w-[380px] flex-shrink-0">
          <div className="rounded-2xl p-8 sticky top-20" style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.isVIP ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)' }}>

          {invested ? (
            <div>
              <div className="flex items-center justify-center mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: tk.successBg }}>
                  <CheckCircle className="w-7 h-7" strokeWidth={1.5} style={{ color: tk.successText }} />
                </div>
              </div>
              <div className="text-[20px] text-center mb-1" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.invested')}</div>
              <div className="text-[13px] text-center mb-6" style={{ color: tk.textSecondary }}>أنت مستثمر في هذه الفرصة</div>

              <div className="rounded-[12px] p-4 mb-4 text-center" style={{ backgroundColor: tk.innerSurface }}>
                <div className="text-[12px] mb-1" style={{ fontWeight: 500, color: tk.textMuted }}>مبلغ استثمارك</div>
                <div className="text-[28px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(investedAmount, { decimals: 0 })}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-[12px] p-3 text-center" style={{ backgroundColor: tk.successBg, border: `1px solid ${tk.successBorder}` }}>
                  <div className="text-[10px] mb-0.5" style={{ fontWeight: 500, color: tk.textSecondary }}>صافي العائد</div>
                  <div className="text-[16px]" style={{ fontWeight: 700, color: tk.successText }}>
                    {formatSAR(Math.round(investedAmount * (opp.roi / 100) * (opp.duration / 12) - investedAmount * 0.02 - investedAmount * 0.02 * 0.15), { decimals: 0 })}
                  </div>
                </div>
                <div className="rounded-[12px] p-3 text-center" style={{ backgroundColor: tk.infoBg, border: `1px solid ${tk.infoBorder}` }}>
                  <div className="text-[10px] mb-0.5" style={{ fontWeight: 500, color: tk.textSecondary }}>الدفعة القادمة</div>
                  <div className="text-[16px]" style={{ fontWeight: 700, color: tk.infoText }}>١٥ يونيو</div>
                </div>
              </div>

              <div className="border-t pt-4 mb-5" style={{ borderColor: tk.divider }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: tk.successText }} />
                  <div className="flex-1">
                    <div className="text-[12px]" style={{ fontWeight: 600, color: tk.textPrimary }}>تم تأكيد الاستثمار</div>
                    <div className="text-[11px]" style={{ color: tk.textMuted }}>اليوم</div>
                  </div>
                </div>
                <div className="w-px h-3 mr-[3.5px] my-1" style={{ backgroundColor: tk.divider }} />
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ border: `1.5px solid ${tk.divider}` }} />
                  <div className="flex-1">
                    <div className="text-[12px]" style={{ color: tk.textSecondary }}>أول دفعة متوقعة</div>
                    <div className="text-[11px]" style={{ color: tk.textMuted }}>١٥ يونيو ٢٠٢٦</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/portfolio')}
                className="w-full h-12 rounded-[12px] text-[14px] text-white transition-all duration-200 active:scale-[0.98] mb-2"
                style={{ backgroundColor: tk.primary, fontWeight: 600 }}
              >
                عرض استثماراتي
              </button>
              <button
                onClick={() => navigate('/app/opportunities')}
                className="w-full h-10 rounded-[12px] text-[13px] transition-colors"
                style={{ fontWeight: 500, border: tk.secondaryBtnBorder, color: tk.textSecondary, background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = tk.secondaryBtnHover)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                تصفح فرص أخرى
              </button>
            </div>
          ) : (
            <div>
            <h3 className="text-[22px] text-center mb-1" style={{ fontWeight: 700, color: tk.textPrimary }}>{t('opp.startInvesting')}</h3>
            <p className="text-[14px] text-center mb-6" style={{ color: tk.textSecondary }}>أدخل المبلغ الذي ترغب باستثماره</p>

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
                  المبلغ (ريال)
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount || ''}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setAmount(raw ? parseInt(raw, 10) : 0);
                  }}
                  placeholder="أدخل المبلغ"
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
                  الحد الأدنى: {formatSAR(opp.minInvestment, { decimals: 0 })}
                </span>
                {amount > 0 && amount < opp.minInvestment && (
                  <span className="text-[11px] transition-opacity duration-200" style={{ fontWeight: 500, color: tk.dangerText }}>
                    — أقل من الحد الأدنى
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[13px] text-center mb-3" style={{ fontWeight: 500, color: tk.textMuted }}>أو اختر مبلغاً سريعاً</div>
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
              <div className="text-[13px] mb-2" style={{ fontWeight: 500, color: tk.textMuted }}>العائد المتوقع ({opp.duration} شهر)</div>
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
                    رصيدك المتاح: <span style={{ fontWeight: 600, color: tk.textPrimary }}>{formatSAR(walletBalance, { decimals: 0 })}</span>
                  </span>
                  {insufficient && valid ? (
                    <span className="transition-opacity duration-200" style={{ fontWeight: 500, color: tk.dangerText }}>الرصيد غير كافي</span>
                  ) : (
                    <button className="hover:underline" style={{ fontWeight: 500, color: tk.isVIP ? tk.infoText : tk.primary }}>+ إضافة رصيد</button>
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
                  استثمر الآن
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
          setInvestedAmount(amount);
        }}
        amount={amount}
        roi={opp.roi}
        duration={opp.duration}
      />
    </div>
  );
}
