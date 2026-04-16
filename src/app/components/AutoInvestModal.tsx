import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { X, Check, CheckCircle, ArrowLeft, ArrowRight, Shield, Clock, Zap, Sparkles } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Types
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Step = 1 | 2 | 3 | 4 | 5 | 6; // 6 = success

interface AutoInvestModalProps {
  open: boolean;
  onClose: () => void;
}

const stepLabels = {
  ar: ['المبلغ', 'المخاطر', 'المدة', 'المراجعة', 'التحقق'],
  en: ['Amount', 'Risk', 'Duration', 'Review', 'Verify'],
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Stepper
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Stepper({ current, labels }: { current: number; labels: string[] }) {
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
                  ? { background: '#2BB673', color: 'white' }
                  : active
                    ? { background: '#3B82F6', color: 'white', boxShadow: '0 0 0 4px rgba(59,130,246,0.15)' }
                    : { background: '#F1F5F9', color: '#94A3B8' }),
              }}>
                {done ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : step}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 500, color: active ? '#0F172A' : '#94A3B8', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 18, borderRadius: 1, background: done ? '#2BB673' : '#F1F5F9', transition: 'background 0.3s' }} />
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

function SelectCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '14px 16px', borderRadius: 14, textAlign: 'right', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        transition: 'all 0.2s',
        background: selected ? '#EFF6FF' : 'white',
        border: selected ? '2px solid #3B82F6' : '1px solid #E8ECF2',
      }}
    >
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
        ...(selected
          ? { background: '#3B82F6' }
          : { border: '2px solid #E2E8F0' }),
      }}>
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Step Components
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function StepAmount({ amount, setAmount, isAr }: { amount: string; setAmount: (v: string) => void; isAr: boolean }) {
  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'الاستثمار التلقائي' : 'Auto Invest'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
        {isAr ? 'حدد الحد الأقصى للمبلغ لكل فرصة' : 'Set the maximum amount to invest per opportunity'}
      </p>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
        {isAr ? 'المبلغ لكل فرصة' : 'Amount per opportunity'}
      </label>
      <div style={{ position: 'relative' }} dir="ltr">
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, fontWeight: 600, color: '#94A3B8' }}>SAR</div>
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={e => setAmount(e.target.value.replace(/[^0-9,]/g, ''))}
          placeholder="5,000"
          autoFocus
          style={{
            width: '100%', height: 52, borderRadius: 12, paddingLeft: 52, paddingRight: 16,
            fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', outline: 'none',
            border: '1px solid rgba(255,255,255,0.08)', background: '#0A1A30',
            transition: 'all 0.2s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; e.currentTarget.style.background = 'white'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F8FAFC'; }}
        />
      </div>
      <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>
        {isAr ? 'الحد الأدنى: 1,000 ر.س' : 'Minimum: SAR 1,000'}
      </p>
    </div>
  );
}

function StepRisk({ selected, setSelected, isAr }: { selected: string[]; setSelected: (v: string[]) => void; isAr: boolean }) {
  const grades = [
    { key: 'A', label: isAr ? 'منخفض جداً' : 'Very Low', color: '#2BB673' },
    { key: 'B', label: isAr ? 'منخفض' : 'Low', color: '#3B82F6' },
    { key: 'C', label: isAr ? 'متوسط' : 'Moderate', color: '#F59E0B' },
    { key: 'D', label: isAr ? 'مرتفع' : 'High', color: '#EF4444' },
  ];
  const toggle = (k: string) => setSelected(selected.includes(k) ? selected.filter(s => s !== k) : [...selected, k]);

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'مستوى المخاطر' : 'Risk Preference'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
        {isAr ? 'اختر مستويات المخاطر المناسبة لك' : 'Choose your preferred risk bands'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {grades.map(g => (
          <SelectCard key={g.key} selected={selected.includes(g.key)} onClick={() => toggle(g.key)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', background: g.color }}>
                {g.key}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.96)' }}>{isAr ? `تصنيف ${g.key}` : `Grade ${g.key}`}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{g.label}</div>
              </div>
            </div>
          </SelectCard>
        ))}
      </div>
    </div>
  );
}

function StepDuration({ selected, setSelected, isAr }: { selected: string[]; setSelected: (v: string[]) => void; isAr: boolean }) {
  const options = [
    { key: '<4', label: isAr ? 'أقل من 4 أشهر' : 'Less than 4 months', icon: <Zap className="w-4 h-4" strokeWidth={1.8} /> },
    { key: '5-9', label: isAr ? '5 – 9 أشهر' : '5 – 9 months', icon: <Clock className="w-4 h-4" strokeWidth={1.8} /> },
    { key: '10-12', label: isAr ? '10 – 12 شهر' : '10 – 12 months', icon: <Clock className="w-4 h-4" strokeWidth={1.8} /> },
    { key: '>12', label: isAr ? 'أكثر من 12 شهر' : 'More than 12 months', icon: <Shield className="w-4 h-4" strokeWidth={1.8} /> },
  ];
  const toggle = (k: string) => setSelected(selected.includes(k) ? selected.filter(s => s !== k) : [...selected, k]);

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'مدة الاستثمار' : 'Investment Duration'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
        {isAr ? 'اختر المدد المفضلة لديك' : 'Choose your preferred durations'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map(o => (
          <SelectCard key={o.key} selected={selected.includes(o.key)} onClick={() => toggle(o.key)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected.includes(o.key) ? '#3B82F6' : '#94A3B8', background: selected.includes(o.key) ? '#EFF6FF' : '#F8FAFC' }}>
                {o.icon}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.96)' }}>{o.label}</span>
            </div>
          </SelectCard>
        ))}
      </div>
    </div>
  );
}

function StepReview({ amount, risks, durations, isAr }: { amount: string; risks: string[]; durations: string[]; isAr: boolean }) {
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
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'مراجعة المعايير' : 'Review Criteria'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
        {isAr ? 'تأكد من صحة معايير الاستثمار التلقائي' : 'Review your auto invest criteria'}
      </p>

      <div style={{ background: '#0A1A30', borderRadius: 14, padding: 20, border: '1px solid #F1F5F9' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < rows.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{r.label}</span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.96)', fontWeight: 700 }}>{r.value}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 16, lineHeight: 1.6 }}>
        {isAr
          ? 'بالمتابعة، أنت توافق على الاستثمار تلقائيًا عند توفر فرص مطابقة لمعاييرك.'
          : 'By proceeding, you agree to automatically invest when matching opportunities appear.'}
      </p>
    </div>
  );
}

function StepVerify({ otp, setOtp, isAr }: { otp: string[]; setOtp: (v: string[]) => void; isAr: boolean }) {
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
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'تحقق من هويتك' : 'Verify Your Identity'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 8 }}>
        {isAr ? 'أدخل رمز التحقق المرسل إلى جوالك' : 'Enter the OTP sent to your phone'}
      </p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.96)', fontWeight: 600, marginBottom: 28 }} dir="ltr">+966 5XX XXX XX8</p>

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
              border: d ? '2px solid #3B82F6' : '1px solid #E2E8F0',
              background: d ? '#EFF6FF' : '#F8FAFC', color: 'rgba(255,255,255,0.96)',
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: 12, color: '#94A3B8' }}>
        {countdown > 0 ? (
          <span>{isAr ? 'إعادة الإرسال خلال' : 'Resend in'} <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.96)' }}>{countdown}</span> {isAr ? 'ثانية' : 's'}</span>
        ) : (
          <button onClick={() => setCountdown(60)} style={{ color: '#3B82F6', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', fontSize: 12 }}>
            {isAr ? 'إعادة إرسال الرمز' : 'Resend code'}
          </button>
        )}
      </div>
    </div>
  );
}

function StepSuccess({ isAr, onClose }: { isAr: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <CheckCircle className="w-8 h-8 text-[#2BB673]" strokeWidth={1.5} />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 8 }}>
        {isAr ? 'تم تفعيل الاستثمار التلقائي' : 'Auto Invest Activated'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 32, lineHeight: 1.6 }}>
        {isAr ? 'سيتم الاستثمار تلقائيًا عند توفر الفرص المطابقة لمعاييرك' : 'You will automatically invest when matching opportunities appear'}
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => { onClose(); navigate('/app/opportunities'); }}
          style={{
            flex: 1, height: 46, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #1D4ED8, #2563EB)', color: 'white',
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
            background: '#0C1C34', color: '#64748B', border: '1px solid rgba(255,255,255,0.08)',
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
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget && !verifying) onClose(); }}
    >
      <div
        style={{ background: '#0C1C34', width: '100%', maxWidth: 480, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        dir={isAr ? 'rtl' : 'ltr'}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {step <= 5 && (
          <div style={{ padding: '20px 24px 0', borderBottom: step === 6 ? 'none' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap className="w-4 h-4 text-[#3B82F6]" strokeWidth={2} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.96)' }}>
                  {isAr ? 'الاستثمار التلقائي' : 'Auto Invest'}
                </span>
              </div>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: '#0A1A30', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.8} />
              </button>
            </div>
            <Stepper current={step} labels={labels} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {step === 1 && <StepAmount amount={amount} setAmount={setAmount} isAr={isAr} />}
          {step === 2 && <StepRisk selected={risks} setSelected={setRisks} isAr={isAr} />}
          {step === 3 && <StepDuration selected={durations} setSelected={setDurations} isAr={isAr} />}
          {step === 4 && <StepReview amount={amount} risks={risks} durations={durations} isAr={isAr} />}
          {step === 5 && <StepVerify otp={otp} setOtp={setOtp} isAr={isAr} />}
          {step === 6 && <StepSuccess isAr={isAr} onClose={onClose} />}
        </div>

        {/* Footer */}
        {step <= 5 && (
          <div style={{ padding: '16px 24px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            {step > 1 ? (
              <button
                onClick={handleBack}
                style={{ height: 44, padding: '0 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: '#0C1C34', color: '#64748B', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
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
                background: canNext ? 'linear-gradient(135deg, #1D4ED8, #2563EB)' : '#E2E8F0',
                color: canNext ? 'white' : '#94A3B8',
                fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: canNext ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
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
