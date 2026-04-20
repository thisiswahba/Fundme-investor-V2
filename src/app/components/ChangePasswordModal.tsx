import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Lock, ArrowLeft, ArrowRight, Loader2, ShieldCheck, Check,
  Eye, EyeOff, Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Tokens
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      overlay: 'rgba(2,8,20,0.72)',
      modalBg: colors.dark.card,
      modalBorder: `1px solid ${colors.dark.border}`,
      modalShadow: '0 24px 80px rgba(0,0,0,0.6)',
      divider: colors.dark.border,
      sectionBg: colors.dark.elevated,
      labelColor: colors.textOnDark.tertiary,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      iconBg: colors.dark.hover,
      iconColor: colors.textOnDark.tertiary,
      brandInk: '#60A5FA',
      brandSoft: 'rgba(37,99,235,0.18)',
      brandSoftBorder: 'rgba(96,165,250,0.32)',
      inputBg: colors.dark.elevated,
      inputBorder: colors.dark.border,
      inputFocusBorder: '#60A5FA',
      inputFocusRing: '0 0 0 3px rgba(96,165,250,0.18)',
      otpFilledBg: 'rgba(37,99,235,0.14)',
      otpFilledBorder: '#60A5FA',
      successText: '#34D399',
      successSoft: 'rgba(43,182,115,0.15)',
      dangerText: '#F87171',
      dangerSoft: 'rgba(220,38,38,0.14)',
      warningText: '#FBBF24',
      warningSoft: 'rgba(251,191,36,0.14)',
      closeBtnBg: colors.dark.hover,
      closeBtnIcon: colors.textOnDark.tertiary,
      ctaBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      ctaShadow: '0 6px 18px rgba(37,99,235,0.35)',
      ctaDisabledBg: colors.dark.hover,
      ctaDisabledColor: colors.textOnDark.muted,
    };
  }
  return {
    isVIP: false,
    overlay: 'rgba(15,23,42,0.45)',
    modalBg: '#FFFFFF',
    modalBorder: '1px solid #EEF1F5',
    modalShadow: '0 24px 60px rgba(15,23,42,0.18)',
    divider: '#F1F5F9',
    sectionBg: '#F8FAFC',
    labelColor: '#94A3B8',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    brandInk: '#1D4ED8',
    brandSoft: '#EFF6FF',
    brandSoftBorder: '#BFDBFE',
    inputBg: '#FFFFFF',
    inputBorder: '#E5E7EB',
    inputFocusBorder: '#1D4ED8',
    inputFocusRing: '0 0 0 3px rgba(29,78,216,0.12)',
    otpFilledBg: '#EFF6FF',
    otpFilledBorder: '#1D4ED8',
    successText: '#047857',
    successSoft: '#ECFDF5',
    dangerText: '#B91C1C',
    dangerSoft: '#FEF2F2',
    warningText: '#B45309',
    warningSoft: '#FFFBEB',
    closeBtnBg: '#F1F5F9',
    closeBtnIcon: '#64748B',
    ctaBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    ctaShadow: '0 6px 18px rgba(37,99,235,0.32)',
    ctaDisabledBg: '#E5E7EB',
    ctaDisabledColor: '#94A3B8',
  };
}

type Tokens = ReturnType<typeof buildTokens>;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Modal
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  phone?: string;
}

type Step = 'identity' | 'otp' | 'newPassword';

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;
const DEFAULT_PHONE = '+966 50 123 4567';

export function ChangePasswordModal({ open, onClose, phone = DEFAULT_PHONE }: ChangePasswordModalProps) {
  const { lang, dir } = useI18n();
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');
  const isAr = lang === 'ar';

  const [step, setStep] = useState<Step>('identity');
  const [busy, setBusy] = useState(false);

  // OTP state
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);

  // New password state
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Reset on re-open
  useEffect(() => {
    if (open) {
      setStep('identity');
      setBusy(false);
      setOtp(Array(OTP_LENGTH).fill(''));
      setResendIn(RESEND_SECONDS);
      setNewPwd('');
      setConfirmPwd('');
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Resend countdown
  useEffect(() => {
    if (step !== 'otp' || resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((n) => Math.max(0, n - 1)), 1000);
    return () => clearInterval(timer);
  }, [step, resendIn]);

  if (!open) return null;

  const subtitle =
    step === 'identity'
      ? (isAr ? 'تحقّق من هويتك للمتابعة' : 'Verify your identity to continue')
      : step === 'otp'
        ? (isAr ? 'أدخل رمز التحقق' : 'Enter the verification code')
        : (isAr ? 'اختر كلمة مرور جديدة قويّة' : 'Choose a strong new password');

  const sendCode = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setStep('otp');
      setResendIn(RESEND_SECONDS);
      toast.success(
        isAr ? `تم إرسال رمز التحقق إلى ${phone}` : `Code sent to ${phone}`,
        { duration: 2400 },
      );
    }, 700);
  };

  const resendCode = () => {
    if (resendIn > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setResendIn(RESEND_SECONDS);
    toast.success(
      isAr ? `أُرسل رمز جديد إلى ${phone}` : `New code sent to ${phone}`,
      { duration: 2400 },
    );
  };

  const verifyOtp = () => {
    if (otp.some((d) => !d)) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setStep('newPassword');
    }, 700);
  };

  const submitNewPassword = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast.success(
        isAr ? 'تم تحديث كلمة المرور بنجاح' : 'Password updated successfully',
        { duration: 2600 },
      );
      onClose();
    }, 800);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: tk.overlay, backdropFilter: 'blur(4px)' }}
      dir={dir}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[460px] rounded-2xl overflow-hidden"
        style={{ background: tk.modalBg, border: tk.modalBorder, boxShadow: tk.modalShadow }}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: tk.isVIP
                  ? 'linear-gradient(135deg, rgba(96,165,250,0.18) 0%, rgba(37,99,235,0.22) 100%)'
                  : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                border: `1px solid ${tk.brandSoftBorder}`,
              }}
            >
              <Lock className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.brandInk }} />
            </div>
            <div className="min-w-0">
              <h2
                className="text-[16px] truncate"
                style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}
              >
                {isAr ? 'تغيير كلمة المرور' : 'Change Password'}
              </h2>
              <p className="text-[11.5px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                {subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            style={{ background: tk.closeBtnBg }}
          >
            <X className="w-4 h-4" strokeWidth={1.8} style={{ color: tk.closeBtnIcon } as React.CSSProperties} />
          </button>
        </header>

        {/* Step indicator */}
        <StepIndicator tk={tk} step={step} />

        {/* Body */}
        <div className="px-5 pt-2 pb-5">
          {step === 'identity' && (
            <IdentityStep
              tk={tk}
              isAr={isAr}
              phone={phone}
              busy={busy}
              onContinue={sendCode}
            />
          )}
          {step === 'otp' && (
            <OtpStep
              tk={tk}
              isAr={isAr}
              dir={dir}
              phone={phone}
              otp={otp}
              setOtp={setOtp}
              busy={busy}
              resendIn={resendIn}
              onBack={() => setStep('identity')}
              onResend={resendCode}
              onVerify={verifyOtp}
            />
          )}
          {step === 'newPassword' && (
            <NewPasswordStep
              tk={tk}
              isAr={isAr}
              busy={busy}
              newPwd={newPwd}
              setNewPwd={setNewPwd}
              confirmPwd={confirmPwd}
              setConfirmPwd={setConfirmPwd}
              showNew={showNew}
              setShowNew={setShowNew}
              showConfirm={showConfirm}
              setShowConfirm={setShowConfirm}
              onBack={() => setStep('otp')}
              onSubmit={submitNewPassword}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Step indicator
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function StepIndicator({ tk, step }: { tk: Tokens; step: Step }) {
  const idx = step === 'identity' ? 0 : step === 'otp' ? 1 : 2;
  return (
    <div className="px-5 pb-4 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => {
        const isDone = i < idx;
        const isActive = i === idx;
        return (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full transition-colors"
            style={{
              background: isDone || isActive
                ? (tk.isVIP ? '#60A5FA' : '#1D4ED8')
                : tk.iconBg,
              opacity: isActive ? 1 : isDone ? 0.55 : 1,
            }}
          />
        );
      })}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Step 1 — Identity
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function IdentityStep({
  tk, isAr, phone, busy, onContinue,
}: {
  tk: Tokens; isAr: boolean; phone: string; busy: boolean; onContinue: () => void;
}) {
  return (
    <>
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: tk.sectionBg, border: `1px solid ${tk.divider}` }}
      >
        <p
          className="text-[11.5px] mb-2"
          style={{ color: tk.textMuted, fontWeight: 500, letterSpacing: '0.005em' }}
        >
          {isAr ? 'لحماية حسابك، سنرسل رمز تحقق إلى:' : "For security, we'll send a verification code to:"}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: tk.iconBg }}
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: tk.iconColor } as React.CSSProperties} />
          </div>
          <span
            className="text-[15px] tabular-nums"
            dir="ltr"
            style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.005em' }}
          >
            {phone}
          </span>
        </div>
      </div>

      <PrimaryCTA
        tk={tk}
        busy={busy}
        onClick={onContinue}
        label={isAr ? 'إرسال رمز التحقق' : 'Send Verification Code'}
        busyLabel={isAr ? 'جارٍ الإرسال' : 'Sending'}
      />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Step 2 — OTP
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function OtpStep({
  tk, isAr, dir, phone, otp, setOtp, busy, resendIn, onBack, onResend, onVerify,
}: {
  tk: Tokens; isAr: boolean; dir: 'rtl' | 'ltr'; phone: string;
  otp: string[]; setOtp: (v: string[]) => void;
  busy: boolean; resendIn: number;
  onBack: () => void; onResend: () => void; onVerify: () => void;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < OTP_LENGTH - 1) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) inputsRef.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    if (!text) return;
    const next = Array(OTP_LENGTH).fill('');
    for (let k = 0; k < text.length; k++) next[k] = text[k];
    setOtp(next);
    inputsRef.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  };

  const allFilled = otp.every((d) => d);

  return (
    <>
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 h-7 px-1 mb-3 text-[12px] cursor-pointer"
        style={{ color: tk.textMuted, fontWeight: 600 }}
      >
        {isAr ? <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} /> : <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />}
        {isAr ? 'رجوع' : 'Back'}
      </button>

      {/* Description */}
      <p className="text-[12.5px] mb-3 leading-relaxed" style={{ color: tk.textSecondary }}>
        {isAr ? 'أدخل الرمز المكوّن من 4 أرقام المُرسل إلى ' : 'Enter the 4-digit code sent to '}
        <span className="tabular-nums" dir="ltr" style={{ fontWeight: 700, color: tk.textPrimary }}>{phone}</span>
      </p>

      {/* OTP boxes — always LTR layout */}
      <div className="flex items-center justify-center gap-2.5 mb-4" dir="ltr">
        {otp.map((d, i) => {
          const filled = !!d;
          return (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-12 h-14 rounded-xl text-center text-[22px] tabular-nums outline-none transition-all"
              style={{
                fontWeight: 700,
                color: tk.textPrimary,
                background: filled ? tk.otpFilledBg : tk.inputBg,
                border: `1.5px solid ${filled ? tk.otpFilledBorder : tk.inputBorder}`,
                caretColor: tk.brandInk,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = tk.inputFocusBorder;
                e.currentTarget.style.boxShadow = tk.inputFocusRing;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = filled ? tk.otpFilledBorder : tk.inputBorder;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          );
        })}
      </div>

      <PrimaryCTA
        tk={tk}
        busy={busy}
        disabled={!allFilled}
        onClick={onVerify}
        label={isAr ? 'تحقّق من الرمز' : 'Verify Code'}
        busyLabel={isAr ? 'جارٍ التحقق' : 'Verifying'}
      />

      {/* Resend */}
      <div className="text-center mt-3">
        {resendIn > 0 ? (
          <span className="text-[12px]" style={{ color: tk.textMuted }}>
            {isAr ? `إعادة إرسال الرمز خلال ${resendIn} ثانية` : `Resend code in ${resendIn}s`}
          </span>
        ) : (
          <button
            onClick={onResend}
            className="text-[12px] cursor-pointer"
            style={{ color: tk.brandInk, fontWeight: 600 }}
          >
            {isAr ? 'إعادة إرسال الرمز' : 'Resend code'}
          </button>
        )}
      </div>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Step 3 — New password
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function NewPasswordStep({
  tk, isAr, busy, newPwd, setNewPwd, confirmPwd, setConfirmPwd,
  showNew, setShowNew, showConfirm, setShowConfirm,
  onBack, onSubmit,
}: {
  tk: Tokens; isAr: boolean; busy: boolean;
  newPwd: string; setNewPwd: (v: string) => void;
  confirmPwd: string; setConfirmPwd: (v: string) => void;
  showNew: boolean; setShowNew: (v: boolean) => void;
  showConfirm: boolean; setShowConfirm: (v: boolean) => void;
  onBack: () => void; onSubmit: () => void;
}) {
  const checks = useMemo(() => ({
    length: newPwd.length >= 8,
    upper: /[A-Z]/.test(newPwd),
    number: /[0-9]/.test(newPwd),
    symbol: /[^A-Za-z0-9]/.test(newPwd),
  }), [newPwd]);

  const score = Object.values(checks).filter(Boolean).length;
  const strength: 'weak' | 'fair' | 'strong' =
    score <= 1 ? 'weak' : score <= 3 ? 'fair' : 'strong';

  const strengthMeta = {
    weak:   { labelAr: 'ضعيفة', labelEn: 'Weak',   color: tk.dangerText,  soft: tk.dangerSoft,  bars: 1 },
    fair:   { labelAr: 'متوسطة', labelEn: 'Fair',   color: tk.warningText, soft: tk.warningSoft, bars: 2 },
    strong: { labelAr: 'قوية',  labelEn: 'Strong', color: tk.successText, soft: tk.successSoft, bars: 3 },
  }[strength];

  const matches = !!confirmPwd && newPwd === confirmPwd;
  const canSubmit = score === 4 && matches;

  return (
    <>
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 h-7 px-1 mb-3 text-[12px] cursor-pointer"
        style={{ color: tk.textMuted, fontWeight: 600 }}
      >
        {isAr ? <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} /> : <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />}
        {isAr ? 'رجوع' : 'Back'}
      </button>

      <PasswordField
        tk={tk}
        labelAr="كلمة المرور الجديدة"
        labelEn="New password"
        value={newPwd}
        onChange={setNewPwd}
        show={showNew}
        onToggleShow={() => setShowNew(!showNew)}
      />

      {/* Strength meter */}
      {newPwd.length > 0 && (
        <div className="mt-2.5 mb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10.5px] uppercase" style={{ color: tk.textMuted, fontWeight: 600, letterSpacing: '0.06em' }}>
              {isAr ? 'قوة كلمة المرور' : 'Password strength'}
            </span>
            <span
              className="text-[10.5px] uppercase px-1.5 h-4 inline-flex items-center rounded-md"
              style={{ color: strengthMeta.color, background: strengthMeta.soft, fontWeight: 700, letterSpacing: '0.04em' }}
            >
              {isAr ? strengthMeta.labelAr : strengthMeta.labelEn}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-colors"
                style={{
                  background: i < strengthMeta.bars ? strengthMeta.color : tk.iconBg,
                }}
              />
            ))}
          </div>

          {/* Requirements */}
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2.5">
            {[
              { ok: checks.length, ar: '٨ أحرف على الأقل',  en: 'At least 8 characters' },
              { ok: checks.upper,  ar: 'حرف كبير (A-Z)',     en: 'Uppercase letter' },
              { ok: checks.number, ar: 'رقم (0-9)',          en: 'A number' },
              { ok: checks.symbol, ar: 'رمز خاص (!@#$)',     en: 'A symbol (!@#$)' },
            ].map((r, i) => (
              <li key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color: r.ok ? tk.successText : tk.textMuted }}>
                <Check className="w-3 h-3 shrink-0" strokeWidth={r.ok ? 3 : 1.6} />
                <span style={{ fontWeight: r.ok ? 600 : 500 }}>{isAr ? r.ar : r.en}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-1">
        <PasswordField
          tk={tk}
          labelAr="تأكيد كلمة المرور"
          labelEn="Confirm password"
          value={confirmPwd}
          onChange={setConfirmPwd}
          show={showConfirm}
          onToggleShow={() => setShowConfirm(!showConfirm)}
        />
        {confirmPwd.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px]" style={{ color: matches ? tk.successText : tk.dangerText }}>
            {matches ? <ShieldCheck className="w-3 h-3" strokeWidth={2} /> : <X className="w-3 h-3" strokeWidth={2} />}
            <span style={{ fontWeight: 600 }}>
              {matches
                ? (isAr ? 'تتطابق كلمتا المرور' : 'Passwords match')
                : (isAr ? 'كلمتا المرور غير متطابقتين' : "Passwords don't match")}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <PrimaryCTA
          tk={tk}
          busy={busy}
          disabled={!canSubmit}
          onClick={onSubmit}
          label={isAr ? 'تحديث كلمة المرور' : 'Update Password'}
          busyLabel={isAr ? 'جارٍ التحديث' : 'Updating'}
        />
      </div>
    </>
  );
}

function PasswordField({
  tk, labelAr, labelEn, value, onChange, show, onToggleShow,
}: {
  tk: Tokens;
  labelAr: string; labelEn: string;
  value: string; onChange: (v: string) => void;
  show: boolean; onToggleShow: () => void;
}) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div>
      <label className="text-[10.5px] uppercase mb-1.5 block" style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.06em' }}>
        {isAr ? labelAr : labelEn}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-11 ${isAr ? 'pe-10 ps-3' : 'ps-3 pe-10'} rounded-lg text-[14px] outline-none transition-all`}
          style={{
            fontWeight: 600,
            color: tk.textPrimary,
            background: tk.inputBg,
            border: `1px solid ${tk.inputBorder}`,
            letterSpacing: '0.02em',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = tk.inputFocusBorder;
            e.currentTarget.style.boxShadow = tk.inputFocusRing;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = tk.inputBorder;
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? (isAr ? 'إخفاء' : 'Hide') : (isAr ? 'عرض' : 'Show')}
          className={`absolute top-1/2 -translate-y-1/2 ${isAr ? 'left-2' : 'right-2'} w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors`}
          style={{ color: tk.iconColor }}
          onMouseEnter={(e) => (e.currentTarget.style.background = tk.iconBg)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {show ? <EyeOff className="w-4 h-4" strokeWidth={1.7} /> : <Eye className="w-4 h-4" strokeWidth={1.7} />}
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Primary CTA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function PrimaryCTA({
  tk, busy, disabled, onClick, label, busyLabel,
}: {
  tk: Tokens; busy: boolean; disabled?: boolean;
  onClick: () => void; label: string; busyLabel: string;
}) {
  const isDisabled = disabled || busy;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="w-full h-11 rounded-xl text-[13.5px] inline-flex items-center justify-center gap-2 transition-all hover:opacity-95 cursor-pointer disabled:cursor-not-allowed"
      style={{
        fontWeight: 700,
        color: isDisabled ? tk.ctaDisabledColor : '#FFFFFF',
        background: isDisabled ? tk.ctaDisabledBg : tk.ctaBg,
        boxShadow: isDisabled ? 'none' : tk.ctaShadow,
      }}
    >
      {busy ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
          {busyLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
