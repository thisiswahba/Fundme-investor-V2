import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowRight, Building2, TrendingUp, Clock, Shield, CheckCircle,
  FileText, Users, Banknote, MapPin, Factory, Calendar,
  DollarSign, Repeat, CircleDot, AlertTriangle, Download,
  X, Info, Loader2, ArrowLeft, ShieldCheck,
} from 'lucide-react';
import { formatSAR, formatPercentage } from '../utils/currency';
import confetti from 'canvas-confetti';
import { useI18n } from '../i18n';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

/*
  Figma: OpportunityDetailPage
  Layout: 2-column — main (924px) + sidebar (380px), 24px gap
  Hero: gradient card #001D5A → #0D82F9
  "Why" cards: colored backgrounds (blue, green, amber)
  Returns: green/blue/gray cards
  Schedule: 12 monthly rows with timeline dots
  Risk: credit rating bar + pie chart
  Sidebar: sticky investment card with amount input + quick-select
*/

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

function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-md px-3 py-2 shadow-md border text-[11px]" style={{ borderColor: '#E5E7EB' }}>
      <div className="text-[#64748B]">{label}</div>
      <div className="text-[#0F172A] font-semibold">{formatSAR(payload[0].value)}</div>
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
    const colors = ['#1D4ED8', '#16A34A', '#F59E0B', '#ffffff'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
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

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
    >
      <div
        className="bg-white w-full max-w-[540px] rounded-[16px] overflow-hidden"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#F1F5F9' }}>
          <h2 className="text-[18px] text-[#0F172A]" style={{ fontWeight: 700 }}>
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
                      backgroundColor: s <= step ? '#1D4ED8' : '#E5E7EB',
                    }}
                  />
                ))}
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors">
                <X className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">

          {/* ═══ STEP 1 — Breakdown ═══ */}
          {step === 1 && (
            <div>
              {/* Investment amount highlight */}
              <div className="rounded-[12px] p-4 mb-5 text-center" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="text-[12px] text-[#94A3B8] mb-1" style={{ fontWeight: 500 }}>مبلغ الاستثمار</div>
                <div className="text-[28px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(amount, { decimals: 0 })}</div>
              </div>

              {/* Line items */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(profit, { decimals: 0 })}</span>
                  <span className="text-[13px] text-[#64748B]">الأرباح المتوقعة</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-[#DC2626]" style={{ fontWeight: 600 }}>-{formatSAR(fee, { decimals: 0 })}</span>
                    <button className="group relative">
                      <Info className="w-3.5 h-3.5 text-[#CBD5E1] hover:text-[#94A3B8]" strokeWidth={1.5} />
                    </button>
                  </div>
                  <span className="text-[13px] text-[#64748B]">رسوم المنصة (2%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-[#DC2626]" style={{ fontWeight: 600 }}>-{formatSAR(vat, { decimals: 0 })}</span>
                    <button className="group relative">
                      <Info className="w-3.5 h-3.5 text-[#CBD5E1] hover:text-[#94A3B8]" strokeWidth={1.5} />
                    </button>
                  </div>
                  <span className="text-[13px] text-[#64748B]">ضريبة القيمة المضافة (15%)</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t my-4" style={{ borderColor: '#F1F5F9' }} />

              {/* Net return */}
              <div className="flex items-center justify-between">
                <span className="text-[18px] text-[#16A34A]" style={{ fontWeight: 700 }}>{formatSAR(netReturn, { decimals: 0 })}</span>
                <span className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>صافي العائد</span>
              </div>
            </div>
          )}

          {/* ═══ STEP 2 — Summary ═══ */}
          {step === 2 && (
            <div>
              {/* Amount centered */}
              <div className="text-center mb-5">
                <div className="text-[12px] text-[#94A3B8] mb-1" style={{ fontWeight: 500 }}>مبلغ الاستثمار</div>
                <div className="text-[36px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(amount, { decimals: 0 })}</div>
              </div>

              {/* Two cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-[12px] p-4 text-center" style={{ backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                  <div className="text-[11px] text-[#64748B] mb-1" style={{ fontWeight: 500 }}>صافي العائد</div>
                  <div className="text-[20px] text-[#16A34A]" style={{ fontWeight: 700 }}>{formatSAR(netReturn, { decimals: 0 })}</div>
                </div>
                <div className="rounded-[12px] p-4 text-center" style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                  <div className="text-[11px] text-[#64748B] mb-1" style={{ fontWeight: 500 }}>إجمالي المبلغ</div>
                  <div className="text-[20px] text-[#1D4ED8]" style={{ fontWeight: 700 }}>{formatSAR(totalPayout, { decimals: 0 })}</div>
                </div>
              </div>

              {/* Breakdown rows */}
              <div className="rounded-[12px] p-4 mb-5 space-y-2.5" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(amount, { decimals: 0 })}</span>
                  <span className="text-[#94A3B8]">رأس المال</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#16A34A]" style={{ fontWeight: 600 }}>{formatSAR(netReturn, { decimals: 0 })}</span>
                  <span className="text-[#94A3B8]">صافي الأرباح</span>
                </div>
                <div className="border-t pt-2.5" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(totalPayout, { decimals: 0 })}</span>
                    <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>إجمالي المبلغ عند الاستحقاق</span>
                  </div>
                </div>
              </div>

              {/* Effective rate */}
              <div className="text-center mb-5">
                <span className="text-[12px] text-[#94A3B8]">العائد الفعلي: </span>
                <span className="text-[13px] text-[#1D4ED8]" style={{ fontWeight: 700 }}>{effectiveRate}%</span>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#1D4ED8] cursor-pointer"
                />
                <span className="text-[12px] text-[#64748B] leading-relaxed">
                  أقر بأنني قرأت وفهمت المخاطر المرتبطة بهذا الاستثمار وأوافق على الشروط والأحكام
                </span>
              </label>
            </div>
          )}

          {/* ═══ STEP 3 — OTP Verification ═══ */}
          {step === 3 && !loading && !success && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                <ShieldCheck className="w-7 h-7 text-[#1D4ED8]" strokeWidth={1.5} />
              </div>
              <div className="text-[14px] text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>أدخل رمز التحقق</div>
              <div className="text-[12px] text-[#94A3B8] mb-6">
                تم إرسال رمز التحقق إلى <span className="text-[#0F172A]" style={{ fontWeight: 500 }}>٠٥٥•••••٨٩</span>
              </div>

              {/* OTP inputs */}
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
                    className="w-14 h-14 text-center text-[24px] text-[#0F172A] rounded-[12px] outline-none transition-all duration-200"
                    style={{
                      fontWeight: 700,
                      border: digit ? '2px solid #1D4ED8' : '1px solid #E5E7EB',
                      boxShadow: digit ? '0 0 0 3px rgba(29,78,216,0.08)' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Countdown + resend */}
              <div className="text-[12px] text-[#94A3B8]">
                {countdown > 0 ? (
                  <span>إعادة الإرسال خلال <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{countdown} ثانية</span></span>
                ) : (
                  <button
                    onClick={() => setCountdown(60)}
                    className="text-[#1D4ED8] hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    إعادة إرسال الرمز
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ═══ Loading state ═══ */}
          {loading && !success && (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                <Loader2 className="w-7 h-7 text-[#1D4ED8] animate-spin" strokeWidth={1.5} />
              </div>
              <div className="text-[16px] text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>جارٍ تنفيذ الاستثمار...</div>
              <div className="text-[13px] text-[#94A3B8]">يرجى الانتظار لحظات</div>
            </div>
          )}

          {/* ═══ Success state ═══ */}
          {success && (
            <div className="text-center py-8">
              {/* Large success icon */}
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                <CheckCircle className="w-10 h-10 text-[#16A34A]" strokeWidth={1.5} />
              </div>

              <div className="text-[24px] text-[#0F172A] mb-3" style={{ fontWeight: 700 }}>تم الاستثمار بنجاح!</div>
              <p className="text-[15px] text-[#64748B] leading-relaxed mb-8">
                تم استثمار <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(amount, { decimals: 0 })}</span> في
                <br />
                تمويل مشروع سكني - الدمام
              </p>

              {/* Divider */}
              <div className="border-t mx-8 mb-6" style={{ borderColor: '#F1F5F9' }} />

              {/* Two metric blocks */}
              <div className="grid grid-cols-2 gap-6 mb-6 px-4">
                <div>
                  <div className="text-[12px] text-[#94A3B8] mb-1.5" style={{ fontWeight: 500 }}>الأرباح المتوقعة</div>
                  <div className="text-[24px] text-[#16A34A]" style={{ fontWeight: 700 }}>{formatSAR(netReturn, { decimals: 0 })}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#94A3B8] mb-1.5" style={{ fontWeight: 500 }}>إجمالي الاستحقاق</div>
                  <div className="text-[24px] text-[#1D4ED8]" style={{ fontWeight: 700 }}>{formatSAR(totalPayout, { decimals: 0 })}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t mx-8 mb-6" style={{ borderColor: '#F1F5F9' }} />

              {/* Email note */}
              <div className="text-[13px] text-[#94A3B8] mb-8">
                سيتم إرسال التفاصيل إلى بريدك الإلكتروني
              </div>

              {/* CTA */}
              <button
                onClick={handleDone}
                className="w-full h-12 rounded-[12px] text-[15px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{ backgroundColor: '#1D4ED8', fontWeight: 600 }}
              >
                الذهاب إلى استثماراتي
              </button>
            </div>
          )}
        </div>

        {/* Footer — CTAs */}
        {!loading && !success && (
          <div className="flex items-center gap-3 px-6 py-5 border-t" style={{ borderColor: '#F1F5F9' }}>
            {/* Secondary */}
            <button
              onClick={() => { step === 1 ? onClose() : setStep(step - 1); }}
              className="flex-1 h-12 rounded-[12px] text-[14px] text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
              style={{ fontWeight: 600, border: '1px solid #E5E7EB' }}
            >
              {step === 1 ? 'إلغاء' : 'رجوع'}
            </button>
            {/* Primary */}
            <button
              onClick={() => {
                if (step === 1) setStep(2);
                else if (step === 2) setStep(3);
                else handleSubmit();
              }}
              disabled={step === 2 && !agreed || step === 3 && otp.some((d) => !d)}
              className="flex-1 h-12 rounded-[12px] text-[14px] text-white transition-all duration-200 active:scale-[0.98]"
              style={{
                backgroundColor: (step === 2 && !agreed) || (step === 3 && otp.some((d) => !d)) ? '#CBD5E1' : '#1D4ED8',
                fontWeight: 600,
                cursor: (step === 2 && !agreed) || (step === 3 && otp.some((d) => !d)) ? 'not-allowed' : 'pointer',
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
  const [amount, setAmount] = useState(5000);
  const [chartTab, setChartTab] = useState<'returns' | 'growth'>('returns');
  const [sectionTab, setSectionTab] = useState<'overview' | 'returns' | 'risk' | 'borrower'>('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [invested, setInvested] = useState(false);
  const [investedAmount, setInvestedAmount] = useState(0);

  const expectedReturn = Math.round(amount * (opp.roi / 100) * (opp.duration / 12));

  // Risk grades
  const grades = ['E', 'D', 'C', 'B', 'A'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      {/* Back button */}
      <button
        onClick={() => navigate('/app/opportunities')}
        className="flex items-center gap-1.5 text-[14px] text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors"
        style={{ fontWeight: 500 }}
      >
        <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        العودة إلى الفرص
      </button>

      {/* ═══ 2-COLUMN LAYOUT ═══ */}
      <div className="flex gap-6">

        {/* ─── MAIN COLUMN (right in RTL) ─── */}
        <div className="flex-1 min-w-0">

          {/* HERO CARD — gradient with pattern art */}
          <div className="relative rounded-2xl overflow-hidden p-8" style={{ background: 'linear-gradient(155deg, #001D5A 0%, #0D82F9 100%)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Soft glowing circles */}
              <div className="absolute w-[300px] h-[300px] rounded-full top-[-50px] left-[674px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
              <div className="absolute w-[400px] h-[400px] rounded-full top-[124px] left-[-100px]" style={{ background: 'radial-gradient(circle, rgba(13,130,249,0.3) 0%, transparent 70%)' }} />
              <div className="absolute w-[200px] h-[200px] rounded-full bottom-[-60px] right-[200px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

              {/* Dot grid pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.07]">
                <defs>
                  <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGrid)" />
              </svg>

              {/* Abstract growth line art */}
              <svg className="absolute bottom-0 left-0 w-full h-[140px] opacity-[0.08]" viewBox="0 0 900 140" fill="none" preserveAspectRatio="none">
                <path d="M0 120 Q150 80 300 90 T600 50 T900 30" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M0 130 Q200 100 400 105 T700 70 T900 55" stroke="white" strokeWidth="1" fill="none" />
                <path d="M0 138 Q250 120 500 118 T900 90" stroke="white" strokeWidth="0.5" fill="none" />
              </svg>

              {/* Geometric accents — top-right corner */}
              <svg className="absolute top-[20px] left-[30px] opacity-[0.06]" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="10" y="10" width="40" height="40" rx="8" stroke="white" strokeWidth="1" />
                <rect x="30" y="30" width="40" height="40" rx="8" stroke="white" strokeWidth="1" />
                <rect x="50" y="50" width="40" height="40" rx="8" stroke="white" strokeWidth="0.5" />
              </svg>

              {/* Concentric arcs — bottom-left */}
              <svg className="absolute bottom-[10px] right-[-20px] opacity-[0.05]" width="160" height="160" viewBox="0 0 160 160" fill="none">
                <circle cx="80" cy="80" r="30" stroke="white" strokeWidth="1" />
                <circle cx="80" cy="80" r="50" stroke="white" strokeWidth="0.8" />
                <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="relative">
              {/* Title */}
              <h1 className="text-[32px] text-white text-right mb-2" style={{ fontWeight: 700 }}>{opp.title}</h1>
              <p className="text-[16px] text-white/90 mb-8">{opp.pitch}</p>

              {/* Key metrics row */}
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

              {/* Funding progress */}
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
                {/* Progress bar */}
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

          {/* ═══ SECTION TABS ═══ */}
          <div className="flex items-center gap-1 mt-6 mb-6 border-b" style={{ borderColor: '#E8ECF2' }}>
            {([
              { key: 'overview' as const, label: 'نظرة عامة', labelEn: 'Overview' },
              { key: 'returns' as const, label: 'العوائد والدفعات', labelEn: 'Returns & Payments' },
              { key: 'risk' as const, label: 'المخاطر', labelEn: 'Risk Assessment' },
              { key: 'borrower' as const, label: 'المقترض والمستندات', labelEn: 'Borrower & Docs' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setSectionTab(tab.key)}
                className={`px-4 py-3 text-[13px] border-b-2 -mb-px transition-all ${
                  sectionTab === tab.key
                    ? 'border-[#3B82F6] text-[#0F172A]'
                    : 'border-transparent text-[#94A3B8] hover:text-[#64748B]'
                }`}
                style={{ fontWeight: sectionTab === tab.key ? 600 : 500 }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ═══ TAB CONTENT ═══ */}
          <div className="space-y-6">

          {/* ── OVERVIEW TAB ── */}
          {sectionTab === 'overview' && (
          <>
          {/* WHY THIS OPPORTUNITY — 3 colored cards */}
          <div>
            <h2 className="text-[18px] text-[#0F172A] mb-6" style={{ fontWeight: 700 }}>{t('opp.whyThis')}</h2>
            <div className="grid grid-cols-3 gap-5">
              {[
                { icon: DollarSign, title: 'استخدام الأموال', desc: opp.whyCards[0].text },
                { icon: Building2, title: 'ملخص المشروع', desc: opp.whyCards[1].text },
                { icon: MapPin, title: 'الموقع والقطاع', desc: 'الدمام، المملكة العربية السعودية — قطاع التطوير العقاري' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[14px] p-6 transition-all duration-200 hover:shadow-md cursor-default"
                  style={{ border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#BFDBFE'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
                >
                  <div className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4" style={{ backgroundColor: '#EFF6FF' }}>
                    <card.icon className="w-5 h-5 text-[#1D4ED8]" strokeWidth={1.5} />
                  </div>
                  <div className="text-[14px] text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>{card.title}</div>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT DETAILS — inline metrics strip */}
          <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            <h2 className="text-[18px] text-[#0F172A] mb-5" style={{ fontWeight: 700 }}>{t('opp.projectDetails')}</h2>
            <div className="flex items-center">
              {[
                { label: 'إجمالي التمويل', value: '500,000 ﷼', icon: Banknote },
                { label: 'عدد المستثمرين', value: '42 مستثمر', icon: Users },
                { label: 'تكرار السداد', value: 'شهري', icon: Repeat },
                { label: 'الحد الأدنى', value: '5,000 ﷼', icon: DollarSign },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#94A3B8] flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <div className="text-[16px] text-[#0F172A] leading-tight" style={{ fontWeight: 700 }}>{item.value}</div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5" style={{ fontWeight: 500 }}>{item.label}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-8 mx-auto" style={{ backgroundColor: '#F1F5F9' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          </>
          )}

          {/* ── RETURNS TAB ── */}
          {sectionTab === 'returns' && (
          <>
          {/* EXPECTED RETURNS & PAYMENTS SUMMARY */}
          <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            <h2 className="text-[18px] text-[#0F172A] mb-6" style={{ fontWeight: 700 }}>{t('opp.expectedReturns')}</h2>

            {/* 1. Total Returns — primary highlight */}
            <div className="rounded-[12px] p-5 mb-6" style={{ backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7' }}>
              <div className="text-[12px] text-[#64748B] mb-3" style={{ fontWeight: 500 }}>إجمالي العوائد المتوقعة</div>
              <div className="text-[32px] text-[#16A34A] leading-none" style={{ fontWeight: 700 }}>
                {formatSAR(opp.totalReturns, { decimals: 0 })}
              </div>
            </div>

            {/* 2. Next Payment — secondary highlight */}
            <div className="rounded-[12px] p-5 mb-6" style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[12px] text-[#64748B] mb-3" style={{ fontWeight: 500 }}>الدفعة القادمة</div>
                  <div className="text-[24px] text-[#1D4ED8] leading-none" style={{ fontWeight: 700 }}>
                    {formatSAR(opp.nextPaymentAmount, { decimals: 0 })}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#64748B] mt-1" style={{ fontWeight: 500 }}>
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ١٥ يونيو ٢٠٢٦
                </div>
              </div>
            </div>

            {/* 3. Payments Summary — compact, minimal */}
            <div className="flex items-center gap-6">
              <div className="flex-1 flex items-center justify-between py-3 px-4 rounded-[10px]" style={{ backgroundColor: '#F8FAFC' }}>
                <span className="text-[12px] text-[#64748B]" style={{ fontWeight: 500 }}>عدد الدفعات</span>
                <span className="text-[16px] text-[#0F172A]" style={{ fontWeight: 700 }}>{opp.paymentCount}</span>
              </div>
              <div className="flex-1 flex items-center justify-between py-3 px-4 rounded-[10px]" style={{ backgroundColor: '#F8FAFC' }}>
                <span className="text-[12px] text-[#64748B]" style={{ fontWeight: 500 }}>متوسط الدفعة</span>
                <span className="text-[16px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(opp.avgPayment, { decimals: 0 })}</span>
              </div>
            </div>
          </div>

          {/* INVESTMENT INSIGHTS — Title → Tabs → Chart */}
          <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            {/* Title + Filter */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] text-[#0F172A]" style={{ fontWeight: 700 }}>{t('opp.insights')}</h2>
              <select
                className="h-8 px-3 rounded-lg text-[12px] text-[#64748B] bg-[#F8FAFC] outline-none cursor-pointer appearance-none pr-8"
                style={{ fontWeight: 500, border: '1px solid #E5E7EB', backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 10px center' }}
              >
                <option>٦ أشهر</option>
                <option>٣ أشهر</option>
                <option>سنة</option>
                <option>الكل</option>
              </select>
            </div>

            {/* Tabs — underline style */}
            <div className="flex items-center gap-5 mb-6 border-b" style={{ borderColor: '#F1F5F9' }}>
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
                    color: chartTab === tab.key ? '#0F172A' : '#94A3B8',
                  }}
                >
                  {tab.label}
                  {chartTab === tab.key && (
                    <div className="absolute bottom-0 right-0 left-0 h-[2px] rounded-full" style={{ backgroundColor: '#1D4ED8' }} />
                  )}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
                  <Tooltip content={<ChartTip />} cursor={{ stroke: '#E5E7EB', strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="value" stroke="#1D4ED8" strokeWidth={1.5} fill="url(#chartFill)" dot={false} activeDot={{ r: 3, fill: '#1D4ED8', strokeWidth: 1.5, stroke: '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MONTHLY REPAYMENT SCHEDULE */}
          <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            <h2 className="text-[18px] text-[#0F172A] mb-5" style={{ fontWeight: 700 }}>{t('opp.schedule')}</h2>

            {/* ── Next Payment highlight ── */}
            <div className="rounded-[12px] p-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <div>
                <div className="text-[12px] text-[#64748B] mb-1" style={{ fontWeight: 500 }}>الدفعة القادمة</div>
                <div className="text-[28px] text-[#1D4ED8] leading-none" style={{ fontWeight: 700 }}>
                  {formatSAR(opp.nextPaymentAmount, { decimals: 0 })}
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-[12px] text-[#1D4ED8] mb-1" style={{ fontWeight: 600 }}>
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ١٥ يونيو ٢٠٢٦
                </div>
                <div className="text-[11px] text-[#64748B]" style={{ fontWeight: 500 }}>خلال ٥ أيام</div>
              </div>
            </div>

            {/* ── Timeline: Upcoming group ── */}
            {(() => {
              const upcoming = opp.schedule.filter(r => r.status === 'upcoming');
              const current = opp.schedule.filter(r => r.status === 'current');
              const future = opp.schedule.filter(r => r.status === 'future');
              const paidCount = upcoming.length;
              const remainingCount = current.length + future.length;
              const remainingAmount = [...current, ...future].reduce((s, r) => s + r.amount, 0);

              function statusLabel(s: string, month: string) {
                if (s === 'current') return 'خلال ٥ أيام';
                if (s === 'upcoming') return 'تم السداد';
                return 'مستقبلي';
              }
              function statusStyle(s: string) {
                if (s === 'current') return { bg: '#EFF6FF', text: '#1D4ED8' };
                if (s === 'upcoming') return { bg: '#F0FDF4', text: '#16A34A' };
                return { bg: '#F8FAFC', text: '#94A3B8' };
              }

              const renderRow = (row: typeof opp.schedule[0], i: number, isLast: boolean, isCurrent: boolean) => {
                const st = statusStyle(row.status);
                return (
                  <div key={`${row.date}-${i}`} className="flex items-stretch gap-4">
                    {/* Timeline column */}
                    <div className="flex flex-col items-center w-8 flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isCurrent ? 'ring-4 ring-[#DBEAFE]' : ''}`} style={{
                        backgroundColor: row.status === 'upcoming' ? '#16A34A' : isCurrent ? '#1D4ED8' : '#E5E7EB',
                      }} />
                      {!isLast && (
                        <div className="w-px flex-1 min-h-[40px]" style={{ backgroundColor: row.status === 'upcoming' ? '#D1FAE5' : '#F1F5F9' }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`flex-1 flex items-center justify-between pb-5 ${isCurrent ? 'rounded-[10px] -mt-2 -mr-3 p-3 mb-2' : ''}`} style={isCurrent ? { backgroundColor: '#FAFBFE' } : {}}>
                      <div>
                        <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{row.month}</div>
                        <div className="text-[11px] text-[#94A3B8] mt-0.5">{row.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(row.amount, { decimals: 0 })}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.text, fontWeight: 500 }}>
                          {statusLabel(row.status, row.month)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <div>
                  {/* Paid group */}
                  {upcoming.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[11px] text-[#16A34A] mb-3 mr-12" style={{ fontWeight: 600 }}>تم السداد ({upcoming.length})</div>
                      {upcoming.map((row, i) => renderRow(row, i, false, false))}
                    </div>
                  )}

                  {/* Current */}
                  {current.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[11px] text-[#1D4ED8] mb-3 mr-12" style={{ fontWeight: 600 }}>الدفعة الحالية</div>
                      {current.map((row, i) => renderRow(row, i, false, true))}
                    </div>
                  )}

                  {/* Future group */}
                  {future.length > 0 && (
                    <div>
                      <div className="text-[11px] text-[#94A3B8] mb-3 mr-12" style={{ fontWeight: 600 }}>قادمة ({future.length})</div>
                      {future.map((row, i) => renderRow(row, i, i === future.length - 1, false))}
                    </div>
                  )}

                  {/* ── Summary footer ── */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: '#F1F5F9' }}>
                    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-[8px]" style={{ backgroundColor: '#F8FAFC' }}>
                      <span className="text-[11px] text-[#94A3B8]" style={{ fontWeight: 500 }}>إجمالي الدفعات</span>
                      <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 700 }}>{opp.paymentCount}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-[8px]" style={{ backgroundColor: '#F8FAFC' }}>
                      <span className="text-[11px] text-[#94A3B8]" style={{ fontWeight: 500 }}>المتبقية</span>
                      <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 700 }}>{remainingCount}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-[8px]" style={{ backgroundColor: '#F8FAFC' }}>
                      <span className="text-[11px] text-[#94A3B8]" style={{ fontWeight: 500 }}>المبلغ المتبقي</span>
                      <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(remainingAmount, { decimals: 0 })}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          </>
          )}

          {/* ── RISK TAB ── */}
          {sectionTab === 'risk' && (
          <>
          {/* RISK ASSESSMENT */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 className="text-[20px] text-[#0F172A] mb-6" style={{ fontWeight: 700 }}>{t('opp.riskAssessment')}</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Credit rating */}
              <div>
                <div className="text-[14px] text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>التصنيف الائتماني</div>
                <div className="flex items-center gap-1 mb-4">
                  {grades.map((g) => (
                    <div
                      key={g}
                      className={`flex-1 h-10 rounded-lg flex items-center justify-center text-[14px] transition-all ${
                        g === opp.risk
                          ? 'bg-[#1D4ED8] text-white'
                          : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                      style={{ fontWeight: g === opp.risk ? 700 : 500 }}
                    >
                      {g}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-[#64748B] mb-4 leading-relaxed">
                  التصنيف الائتماني B يعكس مستوى مخاطر متوسط مع ضمانات كافية.
                </p>
                <div className="text-[13px] text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>عوامل المخاطرة:</div>
                <ul className="space-y-1.5">
                  {opp.riskFactors.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] text-[#64748B]">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" strokeWidth={1.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Guarantees + risk distribution */}
              <div>
                <div className="text-[14px] text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>الضمانات</div>
                <div className="flex items-start gap-2 mb-6 p-3 rounded-xl" style={{ backgroundColor: '#F0FDF4', border: '1px solid #D1FAE5' }}>
                  <Shield className="w-4 h-4 text-[#16A34A] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#166534]">{opp.guarantee}</span>
                </div>
                <div className="text-[14px] text-[#0F172A] mb-3" style={{ fontWeight: 600 }}>توزيع المخاطر</div>
                <div className="space-y-2">
                  {[
                    { label: 'منخفض', pct: 20, color: '#16A34A' },
                    { label: 'متوسط', pct: 50, color: '#F59E0B' },
                    { label: 'مرتفع', pct: 30, color: '#DC2626' },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex items-center justify-between text-[12px] mb-1">
                        <span className="text-[#64748B]">{r.label}</span>
                        <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{r.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
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

          {/* ── BORROWER TAB ── */}
          {sectionTab === 'borrower' && (
          <>
          {/* BORROWER INFO */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 className="text-[20px] text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>{t('opp.borrowerInfo')}</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-[12px] text-[#64748B]" style={{ fontWeight: 500 }}>اسم الشركة</div>
                <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>{opp.borrower.name}</div>
              </div>
              <div>
                <div className="text-[12px] text-[#64748B]" style={{ fontWeight: 500 }}>سنوات الخبرة</div>
                <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>{opp.borrower.experience} سنة</div>
              </div>
              <div>
                <div className="text-[12px] text-[#64748B]" style={{ fontWeight: 500 }}>القطاع</div>
                <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>{opp.borrower.sector}</div>
              </div>
            </div>
            <p className="text-[14px] text-[#64748B] leading-relaxed">{opp.borrower.bio}</p>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 className="text-[20px] text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>{t('opp.documents')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {opp.documents.map((doc, i) => (
                <button key={i} className="flex items-center gap-3 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors text-right" style={{ border: '1px solid #E5E7EB' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                    <FileText className="w-5 h-5 text-[#1D4ED8]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>{doc.name}</div>
                    <div className="text-[12px] text-[#64748B]">{doc.size}</div>
                  </div>
                  <Download className="w-4 h-4 text-[#64748B]" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>
          </>
          )}

          </div>{/* end tab content space-y-6 */}
        </div>

        {/* ─── SIDEBAR ─── */}
        <div className="hidden lg:block w-[380px] flex-shrink-0">
          <div className="bg-white rounded-2xl p-8 sticky top-20" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

          {invested ? (
            /* ═══ INVESTED STATE ═══ */
            <div>
              {/* Success badge */}
              <div className="flex items-center justify-center mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                  <CheckCircle className="w-7 h-7 text-[#16A34A]" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-[20px] text-[#0F172A] text-center mb-1" style={{ fontWeight: 700 }}>{t('opp.invested')}</div>
              <div className="text-[13px] text-[#64748B] text-center mb-6">أنت مستثمر في هذه الفرصة</div>

              {/* Investment summary */}
              <div className="rounded-[12px] p-4 mb-4 text-center" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="text-[12px] text-[#94A3B8] mb-1" style={{ fontWeight: 500 }}>مبلغ استثمارك</div>
                <div className="text-[28px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(investedAmount, { decimals: 0 })}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-[12px] p-3 text-center" style={{ backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                  <div className="text-[10px] text-[#64748B] mb-0.5" style={{ fontWeight: 500 }}>صافي العائد</div>
                  <div className="text-[16px] text-[#16A34A]" style={{ fontWeight: 700 }}>
                    {formatSAR(Math.round(investedAmount * (opp.roi / 100) * (opp.duration / 12) - investedAmount * 0.02 - investedAmount * 0.02 * 0.15), { decimals: 0 })}
                  </div>
                </div>
                <div className="rounded-[12px] p-3 text-center" style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                  <div className="text-[10px] text-[#64748B] mb-0.5" style={{ fontWeight: 500 }}>الدفعة القادمة</div>
                  <div className="text-[16px] text-[#1D4ED8]" style={{ fontWeight: 700 }}>١٥ يونيو</div>
                </div>
              </div>

              {/* Status timeline mini */}
              <div className="border-t pt-4 mb-5" style={{ borderColor: '#F1F5F9' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <div className="flex-1">
                    <div className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>تم تأكيد الاستثمار</div>
                    <div className="text-[11px] text-[#94A3B8]">اليوم</div>
                  </div>
                </div>
                <div className="w-px h-3 mr-[3.5px] my-1" style={{ backgroundColor: '#E5E7EB' }} />
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ border: '1.5px solid #E5E7EB' }} />
                  <div className="flex-1">
                    <div className="text-[12px] text-[#64748B]">أول دفعة متوقعة</div>
                    <div className="text-[11px] text-[#94A3B8]">١٥ يونيو ٢٠٢٦</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/portfolio')}
                className="w-full h-12 rounded-[12px] text-[14px] text-white transition-all duration-200 active:scale-[0.98] mb-2"
                style={{ backgroundColor: '#1D4ED8', fontWeight: 600 }}
              >
                عرض استثماراتي
              </button>
              <button
                onClick={() => navigate('/app/opportunities')}
                className="w-full h-10 rounded-[12px] text-[13px] text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
                style={{ fontWeight: 500, border: '1px solid #E5E7EB' }}
              >
                تصفح فرص أخرى
              </button>
            </div>
          ) : (
            /* ═══ INVEST FORM ═══ */
            <div>
            {/* Centered header */}
            <h3 className="text-[22px] text-[#0F172A] text-center mb-1" style={{ fontWeight: 700 }}>{t('opp.startInvesting')}</h3>
            <p className="text-[14px] text-[#64748B] text-center mb-6">أدخل المبلغ الذي ترغب باستثماره</p>

            {/* Amount input — interactive, free text */}
            <div className="mb-6">
              <div
                className="group rounded-2xl p-5 text-center transition-all duration-300"
                style={{
                  border: `2px solid ${amount > 0 ? '#1D4ED8' : '#E5E7EB'}`,
                  boxShadow: amount > 0 ? '0 0 0 4px rgba(29, 78, 216, 0.08)' : 'none',
                }}
              >
                <div
                  className="text-[13px] mb-3 transition-colors duration-200"
                  style={{ fontWeight: 500, color: amount > 0 ? '#1D4ED8' : '#94A3B8' }}
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
                  className="w-full text-center text-[42px] text-[#1D4ED8] outline-none bg-transparent placeholder:text-[#CBD5E1] placeholder:text-[28px] transition-all duration-200"
                  style={{ fontWeight: 700 }}
                />
                {amount > 0 && (
                  <div
                    className="text-[12px] text-[#1D4ED8] mt-2 transition-opacity duration-300"
                    style={{ fontWeight: 500, opacity: 0.7 }}
                  >
                    {amount.toLocaleString('en-US')} ﷼
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[12px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  الحد الأدنى: {formatSAR(opp.minInvestment, { decimals: 0 })}
                </span>
                {amount > 0 && amount < opp.minInvestment && (
                  <span className="text-[11px] text-[#DC2626] transition-opacity duration-200" style={{ fontWeight: 500 }}>
                    — أقل من الحد الأدنى
                  </span>
                )}
              </div>
            </div>

            {/* Quick select — pill buttons */}
            <div className="mb-6">
              <div className="text-[13px] text-[#94A3B8] text-center mb-3" style={{ fontWeight: 500 }}>أو اختر مبلغاً سريعاً</div>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 25000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className="h-12 rounded-full text-[16px] transition-all duration-200 active:scale-95"
                    style={{
                      fontWeight: 600,
                      border: amount === v ? '2px solid #1D4ED8' : '1px solid #E5E7EB',
                      color: amount === v ? '#1D4ED8' : '#64748B',
                      backgroundColor: amount === v ? 'rgba(29, 78, 216, 0.04)' : 'transparent',
                      boxShadow: amount === v ? '0 0 0 3px rgba(29, 78, 216, 0.06)' : 'none',
                    }}
                  >
                    {(v / 1000).toFixed(0)}K
                  </button>
                ))}
              </div>
            </div>

            {/* Expected return — animated */}
            <div className="text-center mb-6">
              <div className="text-[13px] text-[#94A3B8] mb-2" style={{ fontWeight: 500 }}>العائد المتوقع ({opp.duration} شهر)</div>
              <div
                className="transition-all duration-300"
                style={{
                  fontSize: amount >= opp.minInvestment ? 36 : 28,
                  fontWeight: 700,
                  color: amount >= opp.minInvestment ? '#16A34A' : '#CBD5E1',
                  transform: amount >= opp.minInvestment ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                {amount >= opp.minInvestment ? formatSAR(expectedReturn, { decimals: 0 }) : '—'}
              </div>
            </div>

            {/* Wallet balance */}
            {(() => {
              const walletBalance = 45000;
              const insufficient = amount > walletBalance;
              const valid = amount >= opp.minInvestment;
              return (
                <div className="flex items-center justify-between mb-4 text-[12px]">
                  <span className="text-[#94A3B8]" style={{ fontWeight: 400 }}>
                    رصيدك المتاح: <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(walletBalance, { decimals: 0 })}</span>
                  </span>
                  {insufficient && valid ? (
                    <span className="text-[#DC2626] transition-opacity duration-200" style={{ fontWeight: 500 }}>الرصيد غير كافي</span>
                  ) : (
                    <button className="text-[#1D4ED8] hover:underline" style={{ fontWeight: 500 }}>+ إضافة رصيد</button>
                  )}
                </div>
              );
            })()}

            {/* Separator */}
            <div className="border-t mb-5" style={{ borderColor: '#F1F5F9' }} />

            {/* CTA — pill shape, animated */}
            {(() => {
              const walletBalance = 45000;
              const canInvest = amount >= opp.minInvestment && amount <= walletBalance;
              return (
                <button
                  className="w-full h-14 rounded-full text-[18px] text-white transition-all duration-200 active:scale-[0.98]"
                  style={{
                    backgroundColor: canInvest ? '#1D4ED8' : '#CBD5E1',
                    fontWeight: 700,
                    cursor: canInvest ? 'pointer' : 'not-allowed',
                    boxShadow: canInvest ? '0 4px 16px rgba(29, 78, 216, 0.2)' : 'none',
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

      {/* Investment Modal */}
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