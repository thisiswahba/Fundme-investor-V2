import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Check, Briefcase, GraduationCap, TrendingUp, Banknote,
  Wallet, ShieldCheck, Loader2, ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Tokens — light + VIP dark
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      overlay: 'rgba(2,8,20,0.72)',
      modalBg: colors.dark.card,
      modalBorder: `1px solid ${colors.dark.border}`,
      modalShadow: '0 24px 80px rgba(0,0,0,0.6)',
      headerBg: colors.dark.elevated,
      divider: colors.dark.border,
      sectionBg: 'transparent',
      labelColor: colors.textOnDark.tertiary,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      iconBg: colors.dark.hover,
      iconColor: colors.textOnDark.tertiary,
      brandInk: '#60A5FA',
      brandSoft: 'rgba(37,99,235,0.18)',
      brandSoftBorder: 'rgba(96,165,250,0.32)',
      optionIdleBg: colors.dark.elevated,
      optionIdleBorder: colors.dark.border,
      optionHoverBg: colors.dark.hover,
      optionActiveBg: 'rgba(37,99,235,0.16)',
      optionActiveBorder: '#60A5FA',
      successText: '#34D399',
      successSoft: 'rgba(43,182,115,0.15)',
      successBorder: 'rgba(43,182,115,0.32)',
      dangerText: '#F87171',
      dangerSoft: 'rgba(220,38,38,0.14)',
      dangerBorder: 'rgba(248,113,113,0.32)',
      closeBtnBg: colors.dark.hover,
      closeBtnIcon: colors.textOnDark.tertiary,
      footerBg: colors.dark.card,
      cancelBtnBg: 'transparent',
      cancelBtnBorder: `1px solid ${colors.dark.border}`,
      cancelBtnText: colors.textOnDark.secondary,
      saveBtnBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      saveBtnShadow: '0 6px 18px rgba(37,99,235,0.35)',
    };
  }
  return {
    isVIP: false,
    overlay: 'rgba(15,23,42,0.45)',
    modalBg: '#FFFFFF',
    modalBorder: '1px solid #EEF1F5',
    modalShadow: '0 24px 60px rgba(15,23,42,0.18)',
    headerBg: '#FFFFFF',
    divider: '#F1F5F9',
    sectionBg: '#FBFCFD',
    labelColor: '#94A3B8',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    brandInk: '#1D4ED8',
    brandSoft: '#EFF6FF',
    brandSoftBorder: '#BFDBFE',
    optionIdleBg: '#FFFFFF',
    optionIdleBorder: '#E5E7EB',
    optionHoverBg: '#F8FAFC',
    optionActiveBg: '#EFF6FF',
    optionActiveBorder: '#1D4ED8',
    successText: '#047857',
    successSoft: '#ECFDF5',
    successBorder: '#A7F3D0',
    dangerText: '#B91C1C',
    dangerSoft: '#FEF2F2',
    dangerBorder: '#FECACA',
    closeBtnBg: '#F1F5F9',
    closeBtnIcon: '#64748B',
    footerBg: '#FBFCFD',
    cancelBtnBg: 'transparent',
    cancelBtnBorder: '1px solid #E5E7EB',
    cancelBtnText: '#475569',
    saveBtnBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    saveBtnShadow: '0 6px 18px rgba(37,99,235,0.32)',
  };
}

type Tokens = ReturnType<typeof buildTokens>;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Question definitions
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type QuestionId =
  | 'education'
  | 'employment'
  | 'experience'
  | 'income'
  | 'netWorth'
  | 'incomeSource';

type Question = {
  id: QuestionId;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  labelAr: string;
  labelEn: string;
  options: { value: string; labelAr: string; labelEn: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: 'education',
    icon: GraduationCap,
    labelAr: 'المستوى التعليمي',
    labelEn: 'Education Level',
    options: [
      { value: 'high-school', labelAr: 'ثانوية عامة', labelEn: 'High School' },
      { value: 'diploma', labelAr: 'دبلوم', labelEn: 'Diploma' },
      { value: 'bachelor', labelAr: 'بكالوريوس', labelEn: "Bachelor's Degree" },
      { value: 'master', labelAr: 'ماجستير', labelEn: "Master's Degree" },
      { value: 'phd', labelAr: 'دكتوراه', labelEn: 'PhD' },
    ],
  },
  {
    id: 'employment',
    icon: Briefcase,
    labelAr: 'الحالة الوظيفية',
    labelEn: 'Employment Status',
    options: [
      { value: 'employed', labelAr: 'موظف', labelEn: 'Employed' },
      { value: 'self-employed', labelAr: 'يعمل لحسابه الخاص', labelEn: 'Self-Employed' },
      { value: 'business-owner', labelAr: 'صاحب عمل', labelEn: 'Business Owner' },
      { value: 'retired', labelAr: 'متقاعد', labelEn: 'Retired' },
      { value: 'student', labelAr: 'طالب', labelEn: 'Student' },
      { value: 'unemployed', labelAr: 'غير عامل', labelEn: 'Unemployed' },
    ],
  },
  {
    id: 'experience',
    icon: TrendingUp,
    labelAr: 'هل لديك خبرة في الاستثمار؟',
    labelEn: 'Do you have investment experience?',
    options: [
      { value: 'yes', labelAr: 'نعم', labelEn: 'Yes' },
      { value: 'no', labelAr: 'لا', labelEn: 'No' },
    ],
  },
  {
    id: 'income',
    icon: Banknote,
    labelAr: 'الدخل السنوي',
    labelEn: 'Annual Income',
    options: [
      { value: 'lt-100k',     labelAr: 'أقل من ١٠٠٬٠٠٠ ﷼',          labelEn: 'Less than SAR 100,000' },
      { value: '100k-200k',   labelAr: '١٠٠٬٠٠٠ – ٢٠٠٬٠٠٠ ﷼',       labelEn: 'SAR 100,000 – 200,000' },
      { value: '200k-500k',   labelAr: '٢٠٠٬٠٠٠ – ٥٠٠٬٠٠٠ ﷼',       labelEn: 'SAR 200,000 – 500,000' },
      { value: '500k-1m',     labelAr: '٥٠٠٬٠٠٠ – ١٬٠٠٠٬٠٠٠ ﷼',     labelEn: 'SAR 500,000 – 1M' },
      { value: 'gt-1m',       labelAr: 'أكثر من ١٬٠٠٠٬٠٠٠ ﷼',         labelEn: 'More than SAR 1M' },
    ],
  },
  {
    id: 'netWorth',
    icon: Wallet,
    labelAr: 'صافي الثروة',
    labelEn: 'Net Worth',
    options: [
      { value: 'lt-500k',     labelAr: 'أقل من ٥٠٠٬٠٠٠ ﷼',           labelEn: 'Less than SAR 500,000' },
      { value: '500k-1m',     labelAr: '٥٠٠٬٠٠٠ – ١٬٠٠٠٬٠٠٠ ﷼',     labelEn: 'SAR 500,000 – 1M' },
      { value: '1m-3m',       labelAr: '١٬٠٠٠٬٠٠٠ – ٣٬٠٠٠٬٠٠٠ ﷼',  labelEn: 'SAR 1M – 3M' },
      { value: '3m-10m',      labelAr: '٣٬٠٠٠٬٠٠٠ – ١٠٬٠٠٠٬٠٠٠ ﷼', labelEn: 'SAR 3M – 10M' },
      { value: 'gt-10m',      labelAr: 'أكثر من ١٠٬٠٠٠٬٠٠٠ ﷼',       labelEn: 'More than SAR 10M' },
    ],
  },
  {
    id: 'incomeSource',
    icon: Banknote,
    labelAr: 'مصدر الدخل',
    labelEn: 'Income Source',
    options: [
      { value: 'salary',      labelAr: 'راتب وظيفي',     labelEn: 'Employment Salary' },
      { value: 'business',    labelAr: 'دخل تجاري',      labelEn: 'Business Income' },
      { value: 'investments', labelAr: 'استثمارات',       labelEn: 'Investments' },
      { value: 'rental',      labelAr: 'عوائد إيجارية',  labelEn: 'Rental Income' },
      { value: 'inheritance', labelAr: 'إرث',             labelEn: 'Inheritance' },
      { value: 'other',       labelAr: 'أخرى',            labelEn: 'Other' },
    ],
  },
];

const PEP_QUESTIONS: { id: 'pos' | 'org' | 'kin'; labelAr: string; labelEn: string }[] = [
  { id: 'pos', labelAr: 'هل تشغل أو شغلت منصباً حكومياً بارزاً؟',          labelEn: 'Do you hold or have you held a senior public position?' },
  { id: 'org', labelAr: 'هل تشغل منصباً في منظمة دولية؟',                  labelEn: 'Do you hold a position in an international organization?' },
  { id: 'kin', labelAr: 'هل لديك صلة قرابة بشخص مكشوف سياسياً (PEP)؟',  labelEn: 'Are you related to a Politically Exposed Person (PEP)?' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Modal
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface KycEditModalProps {
  open: boolean;
  onClose: () => void;
  initialAnswers?: Partial<Record<QuestionId, string>>;
  initialPep?: Partial<Record<'pos' | 'org' | 'kin', boolean>>;
  onSave?: (answers: Record<QuestionId, string>, pep: Record<'pos' | 'org' | 'kin', boolean>) => void;
}

const DEFAULT_ANSWERS: Record<QuestionId, string> = {
  education: 'bachelor',
  employment: 'employed',
  experience: 'yes',
  income: '200k-500k',
  netWorth: '1m-3m',
  incomeSource: 'salary',
};

const DEFAULT_PEP: Record<'pos' | 'org' | 'kin', boolean> = {
  pos: false, org: false, kin: false,
};

export function KycEditModal({ open, onClose, initialAnswers, initialPep, onSave }: KycEditModalProps) {
  const { lang, dir } = useI18n();
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');
  const isAr = lang === 'ar';

  const [answers, setAnswers] = useState<Record<QuestionId, string>>({ ...DEFAULT_ANSWERS, ...initialAnswers });
  const [pep, setPep] = useState<Record<'pos' | 'org' | 'kin', boolean>>({ ...DEFAULT_PEP, ...initialPep });
  const [saving, setSaving] = useState(false);

  // Reset when re-opened
  useEffect(() => {
    if (open) {
      setAnswers({ ...DEFAULT_ANSWERS, ...initialAnswers });
      setPep({ ...DEFAULT_PEP, ...initialPep });
      setSaving(false);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll while open
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

  if (!open) return null;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave?.(answers, pep);
      toast.success(
        isAr ? 'تم تحديث معلومات اعرف عميلك' : 'KYC information updated',
        { duration: 2400 },
      );
      onClose();
    }, 700);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: tk.overlay, backdropFilter: 'blur(4px)' }}
      dir={dir}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[680px] max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: tk.modalBg, border: tk.modalBorder, boxShadow: tk.modalShadow }}
      >
        {/* Header */}
        <header
          className="flex items-center justify-between gap-3 px-5 py-4 shrink-0"
          style={{ background: tk.headerBg, borderBottom: `1px solid ${tk.divider}` }}
        >
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
              <Briefcase className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.brandInk }} />
            </div>
            <div className="min-w-0">
              <h2
                className="text-[16px] truncate"
                style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}
              >
                {isAr ? 'تعديل اعرف عميلك (KYC)' : 'Edit KYC Information'}
              </h2>
              <p className="text-[11.5px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                {isAr
                  ? 'حدّث إجاباتك للحفاظ على ملفك المالي الدقيق'
                  : 'Update your answers to keep your financial profile accurate'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            style={{ background: tk.closeBtnBg }}
          >
            <X className="w-4 h-4" strokeWidth={1.8} style={{ color: tk.closeBtnIcon }} />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {/* KYC Questions */}
          <section>
            <SectionHeader
              tk={tk}
              indexLabel="01"
              titleAr="معلومات الملف المالي"
              titleEn="Financial Profile"
            />
            <div className="space-y-3.5">
              {QUESTIONS.map((q) => (
                <QuestionRow
                  key={q.id}
                  tk={tk}
                  isAr={isAr}
                  question={q}
                  value={answers[q.id]}
                  onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
                />
              ))}
            </div>
          </section>

          {/* PEP Section */}
          <section>
            <SectionHeader
              tk={tk}
              indexLabel="02"
              titleAr="حالة الشخص المكشوف سياسياً (PEP)"
              titleEn="Politically Exposed Person (PEP) Status"
            />
            <div className="space-y-2.5">
              {PEP_QUESTIONS.map((q) => (
                <PepRow
                  key={q.id}
                  tk={tk}
                  isAr={isAr}
                  labelAr={q.labelAr}
                  labelEn={q.labelEn}
                  value={pep[q.id]}
                  onChange={(v) => setPep((prev) => ({ ...prev, [q.id]: v }))}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer
          className="flex items-center justify-end gap-2.5 px-5 py-3.5 shrink-0"
          style={{ background: tk.footerBg, borderTop: `1px solid ${tk.divider}` }}
        >
          <button
            onClick={onClose}
            disabled={saving}
            className="h-10 px-5 rounded-lg text-[13px] transition-colors cursor-pointer"
            style={{
              fontWeight: 600,
              background: tk.cancelBtnBg,
              border: tk.cancelBtnBorder,
              color: tk.cancelBtnText,
            }}
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="h-10 px-5 rounded-lg text-[13px] text-white inline-flex items-center gap-2 transition-all hover:opacity-95 cursor-pointer disabled:opacity-70"
            style={{
              fontWeight: 600,
              background: tk.saveBtnBg,
              boxShadow: tk.saveBtnShadow,
            }}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                {isAr ? 'جارٍ الحفظ' : 'Saving'}
              </>
            ) : (
              <>
                <Check className="w-4 h-4" strokeWidth={2.5} />
                {isAr ? 'حفظ التغييرات' : 'Save changes'}
              </>
            )}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Internal pieces
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionHeader({ tk, indexLabel, titleAr, titleEn }: { tk: Tokens; indexLabel: string; titleAr: string; titleEn: string }) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="text-[10px] tabular-nums"
        dir="ltr"
        style={{ fontWeight: 700, color: tk.brandInk, letterSpacing: '0.1em' }}
      >
        {indexLabel}
      </span>
      <span className="w-1 h-1 rounded-full" style={{ background: tk.textMuted, opacity: 0.5 }} />
      <h3
        className="text-[12px] uppercase"
        style={{ fontWeight: 700, color: tk.textSecondary, letterSpacing: '0.06em' }}
      >
        {isAr ? titleAr : titleEn}
      </h3>
    </div>
  );
}

function QuestionRow({
  tk, isAr, question, value, onChange,
}: {
  tk: Tokens;
  isAr: boolean;
  question: Question;
  value: string;
  onChange: (v: string) => void;
}) {
  const Icon = question.icon;
  const isYesNo = question.options.length === 2 && question.options[0].value === 'yes';

  return (
    <div
      className="rounded-xl p-3.5"
      style={{ background: tk.sectionBg, border: `1px solid ${tk.divider}` }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: tk.iconBg }}
        >
          <Icon className="w-[14px] h-[14px]" strokeWidth={1.7} style={{ color: tk.iconColor } as React.CSSProperties} />
        </div>
        <label
          className="text-[12.5px]"
          style={{ fontWeight: 600, color: tk.textPrimary, letterSpacing: '-0.005em' }}
        >
          {isAr ? question.labelAr : question.labelEn}
        </label>
      </div>

      {isYesNo ? (
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className="h-10 rounded-lg text-[13px] transition-all cursor-pointer"
                style={{
                  fontWeight: 600,
                  background: isSelected ? tk.optionActiveBg : tk.optionIdleBg,
                  border: `1px solid ${isSelected ? tk.optionActiveBorder : tk.optionIdleBorder}`,
                  color: isSelected ? tk.brandInk : tk.textSecondary,
                  boxShadow: isSelected ? `inset 0 0 0 1px ${tk.optionActiveBorder}` : 'none',
                }}
              >
                {isAr ? opt.labelAr : opt.labelEn}
              </button>
            );
          })}
        </div>
      ) : (
        <SelectField tk={tk} isAr={isAr} options={question.options} value={value} onChange={onChange} />
      )}
    </div>
  );
}

function SelectField({
  tk, isAr, options, value, onChange,
}: {
  tk: Tokens;
  isAr: boolean;
  options: { value: string; labelAr: string; labelEn: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = options.find((o) => o.value === value);
  const display = selected ? (isAr ? selected.labelAr : selected.labelEn) : (isAr ? 'اختر…' : 'Select…');

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={display}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {isAr ? opt.labelAr : opt.labelEn}
          </option>
        ))}
      </select>
      <div
        className="h-10 px-3 rounded-lg flex items-center justify-between gap-2 pointer-events-none"
        style={{
          background: tk.optionIdleBg,
          border: `1px solid ${tk.optionIdleBorder}`,
        }}
      >
        <span
          className="text-[13px] truncate"
          style={{ fontWeight: 600, color: tk.textPrimary }}
        >
          {display}
        </span>
        <ChevronDown className="w-4 h-4 shrink-0" strokeWidth={1.8} style={{ color: tk.textMuted } as React.CSSProperties} />
      </div>
    </div>
  );
}

function PepRow({
  tk, isAr, labelAr, labelEn, value, onChange,
}: {
  tk: Tokens;
  isAr: boolean;
  labelAr: string;
  labelEn: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3.5"
      style={{ background: tk.sectionBg, border: `1px solid ${tk.divider}` }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: tk.iconBg }}
      >
        <ShieldCheck className="w-[14px] h-[14px]" strokeWidth={1.7} style={{ color: tk.iconColor } as React.CSSProperties} />
      </div>
      <div className="flex-1 min-w-0 text-[12.5px] leading-relaxed" style={{ color: tk.textSecondary, fontWeight: 500 }}>
        {isAr ? labelAr : labelEn}
      </div>
      <div className="inline-flex rounded-lg p-0.5 shrink-0" style={{ background: tk.iconBg }}>
        {[
          { v: false, labelAr: 'لا', labelEn: 'No', tone: 'success' as const },
          { v: true, labelAr: 'نعم', labelEn: 'Yes', tone: 'danger' as const },
        ].map((opt) => {
          const isSelected = value === opt.v;
          const sBg = opt.tone === 'success' ? tk.successSoft : tk.dangerSoft;
          const sFg = opt.tone === 'success' ? tk.successText : tk.dangerText;
          const sBorder = opt.tone === 'success' ? tk.successBorder : tk.dangerBorder;
          return (
            <button
              key={String(opt.v)}
              onClick={() => onChange(opt.v)}
              className="h-7 px-3 rounded-md text-[11.5px] transition-all cursor-pointer"
              style={{
                fontWeight: 700,
                background: isSelected ? sBg : 'transparent',
                color: isSelected ? sFg : tk.textMuted,
                border: `1px solid ${isSelected ? sBorder : 'transparent'}`,
              }}
            >
              {isAr ? opt.labelAr : opt.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
