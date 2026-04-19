import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';
import { X, Check, CheckCircle, ArrowLeft, ArrowRight, Shield, Clock, Zap, Sparkles } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Types
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface AutoInvestModalProps {
  open: boolean;
  onClose: () => void;
}

const stepLabels = {
  ar: ['المبلغ', 'المخاطر', 'المدة', 'المراجعة', 'التحقق'],
  en: ['Amount', 'Risk', 'Duration', 'Review', 'Verify'],
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Tokens
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Tokens = ReturnType<typeof buildTokens>;

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      overlay: 'rgba(0,0,0,0.6)',
      modalBg: colors.dark.card,
      modalBorder: `1px solid ${colors.dark.border}`,
      modalShadow: '0 24px 80px rgba(0,0,0,0.6)',
      divider: colors.dark.border,
      innerBg: colors.dark.elevated,
      innerBorder: colors.dark.border,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textLabel: colors.textOnDark.secondary,
      inputBg: colors.dark.elevated,
      inputBorder: colors.dark.border,
      inputFocusBg: colors.dark.card,
      inputFocusBorder: '#60A5FA',
      inputFocusRing: '0 0 0 3px rgba(96,165,250,0.15)',
      primaryText: '#60A5FA',
      primarySoft: 'rgba(37,99,235,0.15)',
      successText: '#34D399',
      successSoft: 'rgba(43,182,115,0.15)',
      stepDone: colors.success,
      stepActive: colors.primary,
      stepActiveRing: '0 0 0 4px rgba(37,99,235,0.2)',
      stepIdleBg: colors.dark.hover,
      stepIdleText: colors.textOnDark.tertiary,
      stepConnectorDone: colors.success,
      stepConnectorIdle: colors.dark.border,
      selectedCardBg: 'rgba(37,99,235,0.12)',
      selectedCardBorder: '#60A5FA',
      unselectedCardBg: colors.dark.elevated,
      unselectedCardBorder: colors.dark.border,
      checkIdleBorder: colors.dark.border,
      closeBtnBg: colors.dark.hover,
      closeBtnIcon: colors.textOnDark.tertiary,
      secondaryBtnBg: 'transparent',
      secondaryBtnBorder: `1px solid ${colors.dark.border}`,
      secondaryBtnText: colors.textOnDark.secondary,
      primaryBtnBg: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
      primaryBtnShadow: '0 2px 8px rgba(37,99,235,0.4)',
      primaryBtnDisabledBg: colors.dark.hover,
      primaryBtnDisabledText: colors.textOnDark.muted,
      otpIdleBg: colors.dark.elevated,
      otpFilledBg: 'rgba(37,99,235,0.12)',
    };
  }
  return {
    isVIP: false,
    overlay: 'rgba(15,23,42,0.5)',
    modalBg: '#FFFFFF',
    modalBorder: 'none',
    modalShadow: '0 24px 80px rgba(0,0,0,0.15)',
    divider: '#F1F5F9',
    innerBg: '#F8FAFC',
    innerBorder: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textLabel: '#334155',
    inputBg: '#F8FAFC',
    inputBorder: '#E2E8F0',
    inputFocusBg: '#FFFFFF',
    inputFocusBorder: '#3B82F6',
    inputFocusRing: '0 0 0 3px rgba(59,130,246,0.1)',
    primaryText: '#3B82F6',
    primarySoft: '#EFF6FF',
    successText: '#2BB673',
    successSoft: '#F0FDF4',
    stepDone: '#2BB673',
    stepActive: '#3B82F6',
    stepActiveRing: '0 0 0 4px rgba(59,130,246,0.15)',
    stepIdleBg: '#F1F5F9',
    stepIdleText: '#94A3B8',
    stepConnectorDone: '#2BB673',
    stepConnectorIdle: '#F1F5F9',
    selectedCardBg: '#EFF6FF',
    selectedCardBorder: '#3B82F6',
    unselectedCardBg: '#FFFFFF',
    unselectedCardBorder: '#E8ECF2',
    checkIdleBorder: '#E2E8F0',
    closeBtnBg: '#F8FAFC',
    closeBtnIcon: '#94A3B8',
    secondaryBtnBg: '#FFFFFF',
    secondaryBtnBorder: '1px solid #E2E8F0',
    secondaryBtnText: '#64748B',
    primaryBtnBg: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
    primaryBtnShadow: '0 2px 8px rgba(37,99,235,0.25)',
    primaryBtnDisabledBg: '#E2E8F0',
    primaryBtnDisabledText: '#94A3B8',
    otpIdleBg: '#F8FAFC',
    otpFilledBg: '#EFF6FF',
  };
}

function useTokens(): Tokens {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Stepper
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Stepper({ current, labels, tk }: { current: number; labels: string[]; tk: Tokens }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 4px' }}>
      {labels.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: '0 0 auto' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, transition: 'all 0.3s',
                ...(done
                  ? { background: tk.stepDone, color: 'white' }
                  : active
                    ? { background: tk.stepActive, color: 'white', boxShadow: tk.stepActiveRing }
                    : { background: tk.stepIdleBg, color: tk.stepIdleText }),
              }}>
                {done ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : step}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 500, color: active ? tk.textPrimary : tk.textMuted, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 18, borderRadius: 1, background: done ? tk.stepConnectorDone : tk.stepConnectorIdle, transition: 'background 0.3s' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Selectable Card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SelectCard({ selected, onClick, children, tk }: { selected: boolean; onClick: () => void; children: React.ReactNode; tk: Tokens }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '14px 16px', borderRadius: 14, textAlign: 'right', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        transition: 'all 0.2s',
        background: selected ? tk.selectedCardBg : tk.unselectedCardBg,
        border: selected ? `2px solid ${tk.selectedCardBorder}` : `1px solid ${tk.unselectedCardBorder}`,
      }}
    >
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
        ...(selected
          ? { background: tk.selectedCardBorder }
          : { border: `2px solid ${tk.checkIdleBorder}` }),
      }}>
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Step Components
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function StepAmount({ amount, setAmount, isAr, tk }: { amount: string; setAmount: (v: string) => void; isAr: boolean; tk: Tokens }) {
  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: tk.textPrimary, marginBottom: 6 }}>
        {isAr ? 'الاستثمار التلقائي' : 'Auto Invest'}
      </h3>
      <p style={{ fontSize: 13, color: tk.textSecondary, marginBottom: 24 }}>
        {isAr ? 'حدد الحد الأقصى للمبلغ لكل فرصة' : 'Set the maximum amount to invest per opportunity'}
      </p>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: tk.textLabel, marginBottom: 8 }}>
        {isAr ? 'المبلغ لكل فرصة' : 'Amount per opportunity'}
      </label>
      <div style={{ position: 'relative' }} dir="ltr">
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, fontWeight: 600, color: tk.textMuted }}>SAR</div>
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={e => setAmount(e.target.value.replace(/[^0-9,]/g, ''))}
          placeholder="5,000"
          autoFocus
          style={{
            width: '100%', height: 52, borderRadius: 12, paddingLeft: 52, paddingRight: 16,
            fontSize: 18, fontWeight: 700, color: tk.textPrimary, outline: 'none',
            border: `1px solid ${tk.inputBorder}`, background: tk.inputBg,
            transition: 'all 0.2s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = tk.inputFocusBorder; e.currentTarget.style.boxShadow = tk.inputFocusRing; e.currentTarget.style.background = tk.inputFocusBg; }}
          onBlur={e => { e.currentTarget.style.borderColor = tk.inputBorder; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = tk.inputBg; }}
        />
      </div>
      <p style={{ fontSize: 11, color: tk.textMuted, marginTop: 8 }}>
        {isAr ? 'الحد الأدنى: 1,000 ر.س' : 'Minimum: SAR 1,000'}
      </p>
    </div>
  );
}

function StepRisk({ selected, setSelected, isAr, tk }: { selected: string[]; setSelected: (v: string[]) => void; isAr: boolean; tk: Tokens }) {
  const grades = [
    { key: 'A', label: isAr ? 'منخفض جداً' : 'Very Low', color: '#2BB673' },
    { key: 'B', label: isAr ? 'منخفض' : 'Low', color: '#3B82F6' },
    { key: 'C', label: isAr ? 'متوسط' : 'Moderate', color: '#F59E0B' },
    { key: 'D', label: isAr ? 'مرتفع' : 'High', color: '#EF4444' },
  ];
  const toggle = (k: string) => setSelected(selected.includes(k) ? selected.filter(s => s !== k) : [...selected, k]);

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: tk.textPrimary, marginBottom: 6 }}>
        {isAr ? 'مستوى المخاطر' : 'Risk Preference'}
      </h3>
      <p style={{ fontSize: 13, color: tk.textSecondary, marginBottom: 24 }}>
        {isAr ? 'اختر مستويات المخاطر المناسبة لك' : 'Choose your preferred risk bands'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {grades.map(g => (
          <SelectCard key={g.key} selected={selected.includes(g.key)} onClick={() => toggle(g.key)} tk={tk}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', background: g.color }}>
                {g.key}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: tk.textPrimary }}>{isAr ? `تصنيف ${g.key}` : `Grade ${g.key}`}</div>
                <div style={{ fontSize: 11, color: tk.textMuted, marginTop: 1 }}>{g.label}</div>
              </div>
            </div>
          </SelectCard>
        ))}
      </div>
    </div>
  );
}

function StepDuration({ selected, setSelected, isAr, tk }: { selected: string[]; setSelected: (v: string[]) => void; isAr: boolean; tk: Tokens }) {
  const options = [
    { key: '<4', label: isAr ? 'أقل من 4 أشهر' : 'Less than 4 months', icon: <Zap className="w-4 h-4" strokeWidth={1.8} /> },
    { key: '5-9', label: isAr ? '5 – 9 أشهر' : '5 – 9 months', icon: <Clock className="w-4 h-4" strokeWidth={1.8} /> },
    { key: '10-12', label: isAr ? '10 – 12 شهر' : '10 – 12 months', icon: <Clock className="w-4 h-4" strokeWidth={1.8} /> },
    { key: '>12', label: isAr ? 'أكثر من 12 شهر' : 'More than 12 months', icon: <Shield className="w-4 h-4" strokeWidth={1.8} /> },
  ];
  const toggle = (k: string) => setSelected(selected.includes(k) ? selected.filter(s => s !== k) : [...selected, k]);

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: tk.textPrimary, marginBottom: 6 }}>
        {isAr ? 'مدة الاستثمار' : 'Investment Duration'}
      </h3>
      <p style={{ fontSize: 13, color: tk.textSecondary, marginBottom: 24 }}>
        {isAr ? 'اختر المدد المفضلة لديك' : 'Choose your preferred durations'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map(o => {
          const isSelected = selected.includes(o.key);
          return (
            <SelectCard key={o.key} selected={isSelected} onClick={() => toggle(o.key)} tk={tk}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isSelected ? tk.primaryText : tk.textMuted,
                  background: isSelected ? tk.primarySoft : tk.innerBg,
                }}>
                  {o.icon}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: tk.textPrimary }}>{o.label}</span>
              </div>
            </SelectCard>
          );
        })}
      </div>
    </div>
  );
}

function StepReview({ amount, risks, durations, isAr, tk }: { amount: string; risks: string[]; durations: string[]; isAr: boolean; tk: Tokens }) {
  const durationLabels: Record<string, { ar: string; en: string }> = {
    '<4': { ar: 'أقل من 4 أشهر', en: '< 4 months' },
    '5-9': { ar: '5–9 أشهر', en: '5–9 months' },
    '10-12': { ar: '10–12 شهر', en: '10–12 months' },
    '>12': { ar: '> 12 شهر', en: '> 12 months' },
  };

  const rows = [
    { label: isAr ? 'المبلغ لكل فرصة' : 'Amount per opportunity', value: `SAR ${amount || '0'}` },
    { label: isAr ? 'مستوى المخاطر' : 'Risk bands', value: risks.length > 0 ? risks.join(' · ') : (isAr ? 'لم يتم التحديد' : 'None selected') },
    { label: isAr ? 'المدة' : 'Duration', value: durations.length > 0 ? durations.map(d => isAr ? durationLabels[d]?.ar : durationLabels[d]?.en).join(' · ') : (isAr ? 'لم يتم التحديد' : 'None selected') },
  ];

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: tk.textPrimary, marginBottom: 6 }}>
        {isAr ? 'مراجعة المعايير' : 'Review Criteria'}
      </h3>
      <p style={{ fontSize: 13, color: tk.textSecondary, marginBottom: 24 }}>
        {isAr ? 'تأكد من صحة معايير الاستثمار التلقائي' : 'Review your auto invest criteria'}
      </p>

      <div style={{ background: tk.innerBg, borderRadius: 14, padding: 20, border: `1px solid ${tk.innerBorder}` }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < rows.length - 1 ? `1px solid ${tk.divider}` : 'none' }}>
            <span style={{ fontSize: 12, color: tk.textMuted, fontWeight: 500 }}>{r.label}</span>
            <span style={{ fontSize: 14, color: tk.textPrimary, fontWeight: 700 }}>{r.value}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: tk.textMuted, marginTop: 16, lineHeight: 1.6 }}>
        {isAr
          ? 'بالمتابعة، أنت توافق على الاستثمار تلقائيًا عند توفر فرص مطابقة لمعاييرك.'
          : 'By proceeding, you agree to automatically invest when matching opportunities appear.'}
      </p>
    </div>
  );
}

function StepVerify({ otp, setOtp, isAr, tk }: { otp: string[]; setOtp: (v: string[]) => void; isAr: boolean; tk: Tokens }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < 3) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: tk.textPrimary, marginBottom: 6 }}>
        {isAr ? 'تحقق من هويتك' : 'Verify Your Identity'}
      </h3>
      <p style={{ fontSize: 13, color: tk.textSecondary, marginBottom: 8 }}>
        {isAr ? 'أدخل رمز التحقق المرسل إلى جوالك' : 'Enter the OTP sent to your phone'}
      </p>
      <p style={{ fontSize: 12, color: tk.textPrimary, fontWeight: 600, marginBottom: 28 }} dir="ltr">+966 5XX XXX XX8</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }} dir="ltr">
        {otp.map((d, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)}
            style={{
              width: 56, height: 56, borderRadius: 14, textAlign: 'center', fontSize: 22, fontWeight: 700,
              outline: 'none', transition: 'all 0.2s',
              border: d ? `2px solid ${tk.inputFocusBorder}` : `1px solid ${tk.inputBorder}`,
              background: d ? tk.otpFilledBg : tk.otpIdleBg,
              color: tk.textPrimary,
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: 12, color: tk.textMuted }}>
        {countdown > 0 ? (
          <span>{isAr ? 'إعادة الإرسال خلال' : 'Resend in'} <span style={{ fontWeight: 700, color: tk.textPrimary }}>{countdown}</span> {isAr ? 'ثانية' : 's'}</span>
        ) : (
          <button onClick={() => setCountdown(60)} style={{ color: tk.primaryText, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', fontSize: 12 }}>
            {isAr ? 'إعادة إرسال الرمز' : 'Resend code'}
          </button>
        )}
      </div>
    </div>
  );
}

function StepSuccess({ isAr, onClose, tk }: { isAr: boolean; onClose: () => void; tk: Tokens }) {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: tk.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <CheckCircle className="w-8 h-8" strokeWidth={1.5} style={{ color: tk.successText }} />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: tk.textPrimary, marginBottom: 8 }}>
        {isAr ? 'تم تفعيل الاستثمار التلقائي' : 'Auto Invest Activated'}
      </h3>
      <p style={{ fontSize: 13, color: tk.textSecondary, marginBottom: 32, lineHeight: 1.6 }}>
        {isAr ? 'سيتم الاستثمار تلقائيًا عند توفر الفرص المطابقة لمعاييرك' : 'You will automatically invest when matching opportunities appear'}
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => { onClose(); navigate('/app/opportunities'); }}
          style={{
            flex: 1, height: 46, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: tk.primaryBtnBg, color: 'white',
            fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Sparkles className="w-4 h-4" strokeWidth={2} />
          {isAr ? 'عرض الفرص' : 'View Opportunities'}
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 1, height: 46, borderRadius: 14, cursor: 'pointer',
            background: tk.secondaryBtnBg, color: tk.secondaryBtnText, border: tk.secondaryBtnBorder,
            fontSize: 14, fontWeight: 600,
          }}
        >
          {isAr ? 'العودة' : 'Back'}
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Modal
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function AutoInvestModal({ open, onClose }: AutoInvestModalProps) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState('5,000');
  const [risks, setRisks] = useState<string[]>(['A', 'B']);
  const [durations, setDurations] = useState<string[]>(['5-9', '10-12']);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (open) { setStep(1); setAmount('5,000'); setRisks(['A', 'B']); setDurations(['5-9', '10-12']); setOtp(['', '', '', '']); setVerifying(false); }
  }, [open]);

  const canNext = (() => {
    if (step === 1) return amount.replace(/[^0-9]/g, '').length > 0 && parseInt(amount.replace(/[^0-9]/g, '')) >= 1000;
    if (step === 2) return risks.length > 0;
    if (step === 3) return durations.length > 0;
    if (step === 5) return otp.every(d => d !== '');
    return true;
  })();

  const handleNext = () => {
    if (step === 5) {
      setVerifying(true);
      setTimeout(() => { setVerifying(false); setStep(6); }, 1500);
      return;
    }
    if (step < 5) setStep((step + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1 && step <= 5) setStep((step - 1) as Step);
  };

  if (!open) return null;

  const labels = isAr ? stepLabels.ar : stepLabels.en;

  const nextLabel = (() => {
    if (step === 4) return isAr ? 'متابعة للتحقق' : 'Proceed to Verify';
    if (step === 5) return verifying ? (isAr ? 'جارٍ التحقق...' : 'Verifying...') : (isAr ? 'تحقق وتفعيل' : 'Verify & Activate');
    return isAr ? 'التالي' : 'Next';
  })();

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: tk.overlay, backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget && !verifying) onClose(); }}
    >
      <div
        style={{ background: tk.modalBg, border: tk.modalBorder, width: '100%', maxWidth: 480, borderRadius: 24, overflow: 'hidden', boxShadow: tk.modalShadow, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        dir={isAr ? 'rtl' : 'ltr'}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {step <= 5 && (
          <div style={{ padding: '20px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: tk.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap className="w-4 h-4" strokeWidth={2} style={{ color: tk.primaryText }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: tk.textPrimary }}>
                  {isAr ? 'الاستثمار التلقائي' : 'Auto Invest'}
                </span>
              </div>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: tk.closeBtnBg, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X className="w-4 h-4" strokeWidth={1.8} style={{ color: tk.closeBtnIcon }} />
              </button>
            </div>
            <Stepper current={step} labels={labels} tk={tk} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {step === 1 && <StepAmount amount={amount} setAmount={setAmount} isAr={isAr} tk={tk} />}
          {step === 2 && <StepRisk selected={risks} setSelected={setRisks} isAr={isAr} tk={tk} />}
          {step === 3 && <StepDuration selected={durations} setSelected={setDurations} isAr={isAr} tk={tk} />}
          {step === 4 && <StepReview amount={amount} risks={risks} durations={durations} isAr={isAr} tk={tk} />}
          {step === 5 && <StepVerify otp={otp} setOtp={setOtp} isAr={isAr} tk={tk} />}
          {step === 6 && <StepSuccess isAr={isAr} onClose={onClose} tk={tk} />}
        </div>

        {/* Footer */}
        {step <= 5 && (
          <div style={{ padding: '16px 24px 20px', borderTop: `1px solid ${tk.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            {step > 1 ? (
              <button
                onClick={handleBack}
                style={{ height: 44, padding: '0 20px', borderRadius: 12, border: tk.secondaryBtnBorder, background: tk.secondaryBtnBg, color: tk.secondaryBtnText, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                {isAr ? 'رجوع' : 'Back'}
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              disabled={!canNext || verifying}
              style={{
                height: 44, padding: '0 24px', borderRadius: 12, border: 'none', cursor: canNext && !verifying ? 'pointer' : 'not-allowed',
                background: canNext ? tk.primaryBtnBg : tk.primaryBtnDisabledBg,
                color: canNext ? 'white' : tk.primaryBtnDisabledText,
                fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: canNext ? tk.primaryBtnShadow : 'none',
                opacity: verifying ? 0.7 : 1, transition: 'all 0.2s',
              }}
            >
              {nextLabel}
              {step < 5 && <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
