import { useState } from 'react';
import {
  User, Mail, Phone, Shield, Calendar, MapPin, Pencil, FileText, Download,
  Lock, Bell, GraduationCap, Briefcase, Banknote, TrendingUp, Wallet,
  Crown, ShieldCheck, ExternalLink, AlertTriangle, Sparkles, Check,
} from 'lucide-react';
import { usePersona } from '../demoPersona';
import { useI18n } from '../i18n';
import { colors } from '../components/fundme';
import { KycEditModal } from '../components/KycEditModal';
import { ChangePasswordModal } from '../components/ChangePasswordModal';
import { toast } from 'sonner';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Persona-aware tokens
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Tokens = ReturnType<typeof buildTokens>;

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      cardBg: colors.dark.card,
      cardBorder: `1px solid ${colors.dark.border}`,
      cardShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
      innerBg: colors.dark.elevated,
      innerBorder: `1px solid ${colors.dark.border}`,
      divider: colors.dark.borderSubtle,
      iconBg: colors.dark.hover,
      iconColor: colors.textOnDark.tertiary,
      labelColor: colors.textOnDark.tertiary,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      linkColor: '#60A5FA',
      linkHoverBg: 'rgba(37,99,235,0.12)',
      verifiedBg: 'rgba(43,182,115,0.15)',
      verifiedText: '#34D399',
      verifiedDot: '#34D399',
      pepBadgeBg: 'rgba(220,38,38,0.12)',
      pepBadgeText: '#F87171',
      pepCleanBg: 'rgba(43,182,115,0.12)',
      pepCleanText: '#34D399',
      dangerBg: 'rgba(220,38,38,0.06)',
      dangerBorder: '1px solid rgba(220,38,38,0.25)',
      dangerText: '#F87171',
      dangerBtn: '#DC2626',
    };
  }
  return {
    isVIP: false,
    cardBg: '#FFFFFF',
    cardBorder: '1px solid #EEF1F5',
    cardShadow: '0 1px 2px rgba(15,23,42,0.04)',
    innerBg: '#FBFCFD',
    innerBorder: '1px solid #EEF1F5',
    divider: '#F1F5F9',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    labelColor: '#94A3B8',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textFaint: '#CBD5E1',
    linkColor: '#1D4ED8',
    linkHoverBg: '#EFF6FF',
    verifiedBg: '#ECFDF5',
    verifiedText: '#059669',
    verifiedDot: '#10B981',
    pepBadgeBg: '#FEF2F2',
    pepBadgeText: '#DC2626',
    pepCleanBg: '#ECFDF5',
    pepCleanText: '#059669',
    dangerBg: '#FFF5F5',
    dangerBorder: '1px solid #FECACA',
    dangerText: '#B91C1C',
    dangerBtn: '#DC2626',
  };
}

function useTokens(): Tokens {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Section Card primitive
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionCard({
  icon: Icon,
  title,
  titleEn,
  rightSlot,
  children,
}: {
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  title: string;
  titleEn: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { lang } = useI18n();
  const tk = useTokens();
  return (
    <section
      className="rounded-2xl p-6 lg:p-7"
      style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
    >
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: tk.iconBg }}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} style={{ color: tk.iconColor }} />
          </div>
          <h2 className="text-[16px]" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>
            {lang === 'ar' ? title : titleEn}
          </h2>
        </div>
        {rightSlot}
      </header>
      {children}
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Field — labelled value cell (data ledger style)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Field({
  icon: Icon,
  label,
  labelEn,
  value,
  valueEn,
  mono,
  onEdit,
  editLabel,
  editLabelEn,
}: {
  icon?: React.FC<{ className?: string; strokeWidth?: number }>;
  label: string;
  labelEn: string;
  value: string;
  valueEn?: string;
  mono?: boolean;
  onEdit?: () => void;
  editLabel?: string;
  editLabelEn?: string;
}) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  return (
    <div
      className="group flex items-start gap-3 py-3.5"
      style={{ borderBottom: `1px solid ${tk.divider}` }}
    >
      {Icon && (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: tk.innerBg }}
        >
          <Icon className="w-[14px] h-[14px]" strokeWidth={1.6} style={{ color: tk.iconColor }} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] uppercase"
          style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}
        >
          {isAr ? label : labelEn}
        </div>
        <div
          className={`text-[14px] mt-1 ${mono ? 'font-mono tracking-wide' : ''}`}
          style={{ fontWeight: 600, color: tk.textPrimary }}
        >
          {mono ? (
            <span dir="ltr" className="inline-block">
              {isAr ? value : (valueEn || value)}
            </span>
          ) : (
            isAr ? value : (valueEn || value)
          )}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          aria-label={isAr ? editLabel || 'تعديل' : editLabelEn || 'Edit'}
          title={isAr ? editLabel || 'تعديل' : editLabelEn || 'Edit'}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: tk.iconColor, background: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tk.linkHoverBg;
            e.currentTarget.style.color = tk.linkColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = tk.iconColor;
          }}
        >
          <Pencil className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Verified pill
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function VerifiedPill() {
  const { lang } = useI18n();
  const tk = useTokens();
  return (
    <span
      className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-md text-[11px]"
      style={{ fontWeight: 600, background: tk.verifiedBg, color: tk.verifiedText }}
    >
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: tk.verifiedDot }} />
        <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: tk.verifiedDot }} />
      </span>
      {lang === 'ar' ? 'موثّق' : 'Verified'}
    </span>
  );
}

function EditPillButton({ label, labelEn, onClick }: { label: string; labelEn: string; onClick?: () => void }) {
  const { lang } = useI18n();
  const tk = useTokens();
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] transition-colors cursor-pointer"
      style={{ fontWeight: 600, color: tk.linkColor, border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.2)' : '#DBEAFE'}` }}
      onMouseEnter={(e) => (e.currentTarget.style.background = tk.linkHoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <Pencil className="w-3 h-3" strokeWidth={2} />
      {lang === 'ar' ? label : labelEn}
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. Personal Information
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function PersonalInfo() {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const notifyEdit = (labelAr: string, labelEn: string) => {
    toast.success(
      isAr
        ? `سيتطلب تعديل ${labelAr} التحقق عبر رمز SMS`
        : `Editing ${labelEn} requires SMS verification`,
      { duration: 2400 },
    );
  };
  return (
    <SectionCard icon={User} title="المعلومات الشخصية" titleEn="Personal Information" rightSlot={<VerifiedPill />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Field icon={User} label="الاسم الكامل" labelEn="Full Name" value={persona.profile.nameAr} valueEn={persona.profile.nameEn} />
        <Field icon={Shield} label="رقم الهوية" labelEn="National ID" value="1098 •••• 7890" mono />
        <Field icon={Calendar} label="تاريخ الميلاد" labelEn="Date of Birth" value="١٥ مارس ١٩٩٠" valueEn="March 15, 1990" />
        <Field icon={MapPin} label="العنوان الوطني" labelEn="National Address" value="طريق الملك فهد، الرياض — ص.ب ١٢٣٤٥" valueEn="123 King Fahd Rd, Riyadh — P.O. Box 12345" />
        <Field icon={Mail} label="البريد الإلكتروني" labelEn="Email Address" value={persona.profile.email} mono onEdit={() => notifyEdit('البريد الإلكتروني', 'email address')} />
        <Field icon={Phone} label="رقم الجوال" labelEn="Phone Number" value="+966 50 123 4567" mono onEdit={() => notifyEdit('رقم الجوال', 'phone number')} />
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. KYC — Investor Profile + PEP Status
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function KycPepCell({ label, labelEn, clean }: { label: string; labelEn: string; clean: boolean }) {
  const { lang } = useI18n();
  const tk = useTokens();
  const isAr = lang === 'ar';
  return (
    <div className="rounded-xl p-3.5" style={{ background: tk.innerBg, border: tk.innerBorder }}>
      <div className="text-[10px] uppercase mb-1.5" style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}>
        {isAr ? label : labelEn}
      </div>
      <span
        className="inline-flex items-center gap-1 h-6 px-2 rounded-md text-[11px]"
        style={{
          fontWeight: 600,
          background: clean ? tk.pepCleanBg : tk.pepBadgeBg,
          color: clean ? tk.pepCleanText : tk.pepBadgeText,
        }}
      >
        {clean ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <AlertTriangle className="w-3 h-3" strokeWidth={2} />}
        {clean ? (isAr ? 'لا' : 'No') : (isAr ? 'نعم' : 'Yes')}
      </span>
    </div>
  );
}

function KYC() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  const [editOpen, setEditOpen] = useState(false);

  const [answers, setAnswers] = useState({
    education: 'bachelor',
    employment: 'employed',
    experience: 'yes',
    income: '200k-500k',
    netWorth: '1m-3m',
    incomeSource: 'salary',
  });
  const [pep, setPep] = useState({ pos: false, org: false, kin: false });

  const educationLabel    = { bachelor: { ar: 'بكالوريوس', en: "Bachelor's Degree" }, 'high-school': { ar: 'ثانوية عامة', en: 'High School' }, diploma: { ar: 'دبلوم', en: 'Diploma' }, master: { ar: 'ماجستير', en: "Master's Degree" }, phd: { ar: 'دكتوراه', en: 'PhD' } } as const;
  const employmentLabel   = { employed: { ar: 'موظف', en: 'Employed' }, 'self-employed': { ar: 'يعمل لحسابه الخاص', en: 'Self-Employed' }, 'business-owner': { ar: 'صاحب عمل', en: 'Business Owner' }, retired: { ar: 'متقاعد', en: 'Retired' }, student: { ar: 'طالب', en: 'Student' }, unemployed: { ar: 'غير عامل', en: 'Unemployed' } } as const;
  const yesNoLabel        = { yes: { ar: 'نعم', en: 'Yes' }, no: { ar: 'لا', en: 'No' } } as const;
  const incomeLabel       = { 'lt-100k': { ar: 'أقل من ١٠٠٬٠٠٠ ﷼', en: 'Less than SAR 100,000' }, '100k-200k': { ar: '١٠٠٬٠٠٠ – ٢٠٠٬٠٠٠ ﷼', en: 'SAR 100,000 – 200,000' }, '200k-500k': { ar: '٢٠٠٬٠٠٠ – ٥٠٠٬٠٠٠ ﷼', en: 'SAR 200,000 – 500,000' }, '500k-1m': { ar: '٥٠٠٬٠٠٠ – ١٬٠٠٠٬٠٠٠ ﷼', en: 'SAR 500,000 – 1M' }, 'gt-1m': { ar: 'أكثر من ١٬٠٠٠٬٠٠٠ ﷼', en: 'More than SAR 1M' } } as const;
  const netWorthLabel     = { 'lt-500k': { ar: 'أقل من ٥٠٠٬٠٠٠ ﷼', en: 'Less than SAR 500,000' }, '500k-1m': { ar: '٥٠٠٬٠٠٠ – ١٬٠٠٠٬٠٠٠ ﷼', en: 'SAR 500,000 – 1M' }, '1m-3m': { ar: '١٬٠٠٠٬٠٠٠ – ٣٬٠٠٠٬٠٠٠ ﷼', en: 'SAR 1M – 3M' }, '3m-10m': { ar: '٣٬٠٠٠٬٠٠٠ – ١٠٬٠٠٠٬٠٠٠ ﷼', en: 'SAR 3M – 10M' }, 'gt-10m': { ar: 'أكثر من ١٠٬٠٠٠٬٠٠٠ ﷼', en: 'More than SAR 10M' } } as const;
  const incomeSourceLabel = { salary: { ar: 'راتب وظيفي', en: 'Employment Salary' }, business: { ar: 'دخل تجاري', en: 'Business Income' }, investments: { ar: 'استثمارات', en: 'Investments' }, rental: { ar: 'عوائد إيجارية', en: 'Rental Income' }, inheritance: { ar: 'إرث', en: 'Inheritance' }, other: { ar: 'أخرى', en: 'Other' } } as const;

  return (
    <>
      <SectionCard
        icon={Briefcase}
        title="اعرف عميلك (KYC)"
        titleEn="KYC"
        rightSlot={<EditPillButton label="تعديل" labelEn="Edit" onClick={() => setEditOpen(true)} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Field icon={GraduationCap} label="المستوى التعليمي" labelEn="Education Level"         value={educationLabel[answers.education as keyof typeof educationLabel].ar}      valueEn={educationLabel[answers.education as keyof typeof educationLabel].en} />
          <Field icon={Briefcase}     label="الحالة الوظيفية"  labelEn="Employment Status"        value={employmentLabel[answers.employment as keyof typeof employmentLabel].ar} valueEn={employmentLabel[answers.employment as keyof typeof employmentLabel].en} />
          <Field icon={TrendingUp}    label="خبرة الاستثمار"   labelEn="Investment Experience"    value={yesNoLabel[answers.experience as keyof typeof yesNoLabel].ar}            valueEn={yesNoLabel[answers.experience as keyof typeof yesNoLabel].en} />
          <Field icon={Banknote}      label="الدخل السنوي"     labelEn="Annual Income"            value={incomeLabel[answers.income as keyof typeof incomeLabel].ar}              valueEn={incomeLabel[answers.income as keyof typeof incomeLabel].en} />
          <Field icon={Wallet}        label="صافي الثروة"      labelEn="Net Worth"                value={netWorthLabel[answers.netWorth as keyof typeof netWorthLabel].ar}        valueEn={netWorthLabel[answers.netWorth as keyof typeof netWorthLabel].en} />
          <Field icon={Banknote}      label="مصدر الدخل"       labelEn="Income Source"            value={incomeSourceLabel[answers.incomeSource as keyof typeof incomeSourceLabel].ar} valueEn={incomeSourceLabel[answers.incomeSource as keyof typeof incomeSourceLabel].en} />
        </div>

        {/* PEP Sub-section */}
        <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${tk.divider}` }}>
          <h3 className="text-[12px] mb-3" style={{ fontWeight: 700, color: tk.textPrimary }}>
            {isAr ? 'حالة الشخص المكشوف سياسياً (PEP)' : 'Politically Exposed Person (PEP) Status'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <KycPepCell label="منصب حكومي بارز"   labelEn="Senior Public Position"          clean={!pep.pos} />
            <KycPepCell label="منصب في منظمة دولية" labelEn="International Org Position"      clean={!pep.org} />
            <KycPepCell label="صلة قرابة بشخص PEP" labelEn="Family Relationship with PEP"     clean={!pep.kin} />
          </div>
        </div>
      </SectionCard>

      <KycEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialAnswers={answers}
        initialPep={pep}
        onSave={(a, p) => { setAnswers(a); setPep(p); }}
      />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. Security
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const tk = useTokens();
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0"
      style={{ background: on ? '#1D4ED8' : tk.isVIP ? 'rgba(255,255,255,0.1)' : '#E2E8F0' }}
      role="switch"
      aria-checked={on}
    >
      <span
        className="absolute top-[2px] w-5 h-5 rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? '22px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
      />
    </button>
  );
}

function Security() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  const [smsOn, setSmsOn] = useState(true);
  const [pwdModalOpen, setPwdModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <SectionCard icon={Shield} title="الأمان" titleEn="Security">
        <div className="space-y-3">
          {/* Password row */}
          <div
            className="flex items-center gap-4 rounded-xl p-4"
            style={{ background: tk.innerBg, border: tk.innerBorder }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: tk.cardBg }}>
              <Lock className="w-4 h-4" strokeWidth={1.6} style={{ color: tk.iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>
                {isAr ? 'كلمة المرور' : 'Password'}
              </div>
              <div className="text-[12px] mt-0.5" style={{ color: tk.textMuted }}>
                {isAr ? 'آخر تغيير قبل ٣٠ يوماً' : 'Last changed 30 days ago'}
              </div>
            </div>
            <button
              onClick={() => setPwdModalOpen(true)}
              className="h-9 px-4 rounded-lg text-[12px] transition-colors cursor-pointer"
              style={{ fontWeight: 600, color: tk.linkColor, border: `1px solid ${tk.isVIP ? 'rgba(96,165,250,0.2)' : '#DBEAFE'}` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = tk.linkHoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {isAr ? 'تغيير كلمة المرور' : 'Change password'}
            </button>
          </div>

          {/* SMS notifications */}
          <div
            className="flex items-center gap-4 rounded-xl p-4"
            style={{ background: tk.innerBg, border: tk.innerBorder }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: tk.cardBg }}>
              <Bell className="w-4 h-4" strokeWidth={1.6} style={{ color: tk.iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px]" style={{ fontWeight: 600, color: tk.textPrimary }}>
                {isAr ? 'إشعارات SMS والعروض' : 'SMS & Promotional Notifications'}
              </div>
              <div className="text-[12px] mt-0.5 leading-relaxed" style={{ color: tk.textMuted }}>
                {isAr
                  ? 'استقبل نصائح استثمارية وفرصاً جديدة وعروضاً حصرية عبر SMS'
                  : 'Receive investment tips, new opportunities, and exclusive offers via SMS'}
              </div>
            </div>
            <Toggle on={smsOn} onChange={setSmsOn} />
          </div>
        </div>
      </SectionCard>

      <DangerZone />

      <ChangePasswordModal open={pwdModalOpen} onClose={() => setPwdModalOpen(false)} />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. Right rail — Become Elite (or Elite Status)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function EliteUpgradeCard() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const used = 225_000;
  const cap = 250_000;
  const pct = Math.min(100, (used / cap) * 100);

  const benefits = isAr
    ? ['حد استثماري بدون قيود', 'وصول مبكر للفرص الحصرية', 'مدير حساب شخصي']
    : ['Unlimited investment limit', 'Priority access to exclusive deals', 'Dedicated account manager'];

  return (
    <section
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0B1220 0%, #131A2E 55%, #1A1F3A 100%)',
        boxShadow: '0 12px 40px rgba(11,18,32,0.35), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* Atmospheric gold glow */}
      <div
        className="absolute -top-20 -right-12 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,191,89,0.22) 0%, transparent 70%)', filter: 'blur(8px)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,191,89,0.10) 0%, transparent 70%)' }}
      />

      <div className="relative p-4">
        {/* Crown medallion */}
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F5BF59 0%, #E0A132 100%)',
              boxShadow: '0 6px 16px rgba(245,191,89,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <Crown className="w-5 h-5" strokeWidth={2} style={{ color: '#1A1404' }} />
          </div>
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: 'rgba(245,191,89,0.6)' }} />
        </div>

        {/* Title */}
        <h3
          className="text-[16px] mb-1"
          style={{ fontWeight: 700, color: '#F5BF59', letterSpacing: '-0.015em' }}
        >
          {isAr ? 'كن مستثمراً مؤهلاً' : 'Become Elite'}
        </h3>
        <p className="text-[11.5px] mb-3.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {isAr ? 'افتح مزايا حصرية وفرصاً متميزة' : 'Unlock exclusive benefits and premium opportunities'}
        </p>

        {/* Benefits */}
        <ul className="space-y-1.5 mb-3.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <Sparkles className="w-3 h-3 shrink-0 mt-0.5" strokeWidth={2} style={{ color: '#F5BF59' }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Usage meter */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between mb-1.5 text-[10.5px]">
            <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
              {isAr ? 'الحد المستخدم' : 'Limit used'}
            </span>
            <span className="font-mono" dir="ltr" style={{ color: '#F5BF59', fontWeight: 600 }}>
              {used.toLocaleString()} / {cap.toLocaleString()} ﷼
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #F5BF59 0%, #E0A132 100%)',
                boxShadow: '0 0 10px rgba(245,191,89,0.5)',
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full h-9 rounded-lg flex items-center justify-center gap-1.5 text-[12.5px] transition-all hover:scale-[1.02] cursor-pointer"
          style={{
            fontWeight: 700,
            color: '#1A1404',
            background: 'linear-gradient(135deg, #F5BF59 0%, #E0A132 100%)',
            boxShadow: '0 4px 14px rgba(245,191,89,0.32)',
          }}
        >
          <Crown className="w-3.5 h-3.5" strokeWidth={2.5} />
          {isAr ? 'الترقية الآن' : 'Upgrade Now'}
        </button>
      </div>
    </section>
  );
}

function EliteMemberCard() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <section
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0B1220 0%, #131A2E 55%, #1A1F3A 100%)',
        boxShadow: '0 12px 40px rgba(11,18,32,0.35), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="absolute -top-20 -right-12 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,191,89,0.22) 0%, transparent 70%)', filter: 'blur(8px)' }}
      />
      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F5BF59 0%, #E0A132 100%)',
              boxShadow: '0 6px 16px rgba(245,191,89,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <Crown className="w-5 h-5" strokeWidth={2} style={{ color: '#1A1404' }} />
          </div>
          <span
            className="inline-flex items-center gap-1 h-5 px-2 rounded-md text-[9.5px] tracking-wide"
            style={{ fontWeight: 700, background: 'rgba(245,191,89,0.15)', color: '#F5BF59', border: '1px solid rgba(245,191,89,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5BF59', boxShadow: '0 0 8px rgba(245,191,89,0.8)' }} />
            {isAr ? 'نشط' : 'ACTIVE'}
          </span>
        </div>

        <h3 className="text-[16px] mb-1" style={{ fontWeight: 700, color: '#F5BF59', letterSpacing: '-0.015em' }}>
          {isAr ? 'عضو مؤهل' : 'Elite Member'}
        </h3>
        <p className="text-[11.5px] mb-3.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {isAr ? 'تتمتع بكامل المزايا الحصرية' : 'Enjoying full premium privileges'}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-[9.5px] mb-0.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              {isAr ? 'الحد الاستثماري' : 'Investment Limit'}
            </div>
            <div className="text-[12.5px]" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              {isAr ? 'بلا حدود' : 'Unlimited'}
            </div>
          </div>
          <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-[9.5px] mb-0.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              {isAr ? 'مدير الحساب' : 'Account Manager'}
            </div>
            <div className="text-[12.5px]" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              {isAr ? 'مخصّص' : 'Dedicated'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. POA Agreement
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function POAAgreementCard() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  return (
    <section
      className="rounded-2xl p-4"
      style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: tk.isVIP ? 'rgba(96,165,250,0.1)' : '#EFF6FF' }}
        >
          <FileText className="w-[16px] h-[16px]" strokeWidth={1.7} style={{ color: tk.linkColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[13.5px] leading-tight" style={{ fontWeight: 700, color: tk.textPrimary }}>
            {isAr ? 'اتفاقية الوكالة' : 'POA Agreement'}
          </h3>
          <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: tk.textMuted }}>
            {isAr ? 'اتفاقية التوكيل الموقّعة' : 'Your signed POA document'}
          </p>
        </div>
      </div>
      <button
        onClick={() => toast.success(
          isAr ? 'بدأ تنزيل اتفاقية الوكالة' : 'POA agreement download started',
          { duration: 2400 },
        )}
        className="w-full h-9 rounded-lg flex items-center justify-center gap-1.5 text-[12.5px] text-white transition-all hover:opacity-95 cursor-pointer"
        style={{
          fontWeight: 600,
          background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
          boxShadow: '0 3px 10px rgba(37,99,235,0.22)',
        }}
      >
        <Download className="w-3.5 h-3.5" strokeWidth={2} />
        {isAr ? 'تحميل PDF' : 'Download PDF'}
      </button>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. Quick Links
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function QuickLinks() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();

  const links = [
    { icon: FileText, label: 'الشروط والأحكام', labelEn: 'Terms and Conditions' },
    { icon: ShieldCheck, label: 'سياسة الخصوصية', labelEn: 'Privacy Policy' },
    { icon: Shield, label: 'قواعد حماية العميل', labelEn: 'Customer Protection Rules' },
  ];

  return (
    <section
      className="rounded-2xl p-4"
      style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
    >
      <h3 className="text-[12px] uppercase mb-2.5 px-1" style={{ fontWeight: 700, color: tk.textMuted, letterSpacing: '0.06em' }}>
        {isAr ? 'روابط مهمة' : 'Quick Links'}
      </h3>
      <div className="space-y-0.5">
        {links.map((l, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.success(
                isAr ? `سيتم فتح ${l.label} في نافذة جديدة` : `${l.labelEn} opens in a new window`,
                { duration: 2200 },
              );
            }}
            className="flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors group cursor-pointer"
            style={{ color: tk.textPrimary }}
            onMouseEnter={(e) => (e.currentTarget.style.background = tk.innerBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <l.icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.7} style={{ color: tk.iconColor }} />
            <span className="flex-1 text-[12.5px]" style={{ fontWeight: 500 }}>
              {isAr ? l.label : l.labelEn}
            </span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.8} style={{ color: tk.textMuted }} />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. Danger Zone
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function DangerZone() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  return (
    <section
      className="rounded-2xl p-4"
      style={{ background: tk.dangerBg, border: tk.dangerBorder }}
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} style={{ color: tk.dangerText }} />
        <h3 className="text-[12.5px]" style={{ fontWeight: 700, color: tk.dangerText }}>
          {isAr ? 'منطقة الخطر' : 'Danger Zone'}
        </h3>
      </div>
      <p className="text-[11.5px] leading-relaxed mb-3" style={{ color: tk.textSecondary }}>
        {isAr
          ? 'إلغاء تنشيط حسابك يوقف جميع الخدمات المرتبطة به.'
          : 'Deactivate your account and suspend associated services.'}
      </p>
      <button
        onClick={() => {
          const confirmed = window.confirm(
            isAr
              ? 'هل أنت متأكد من إلغاء تنشيط حسابك؟ يمكنك التراجع لاحقاً عبر الدعم.'
              : 'Are you sure you want to deactivate your account? You can reverse this later via support.',
          );
          if (confirmed) {
            toast.success(
              isAr ? 'تم استلام طلب إلغاء التنشيط' : 'Deactivation request received',
              { duration: 2600 },
            );
          }
        }}
        className="w-full h-9 rounded-lg text-[12.5px] text-white transition-all hover:opacity-90 cursor-pointer"
        style={{ fontWeight: 600, background: tk.dangerBtn, boxShadow: '0 3px 10px rgba(220,38,38,0.22)' }}
      >
        {isAr ? 'إلغاء تنشيط الحساب' : 'Deactivate Account'}
      </button>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Page Composition
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function ProfilePage() {
  const { persona, personaId } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  const isVIP = personaId === 'vip';
  const name = isAr ? persona.profile.nameAr : persona.profile.nameEn;
  const initials = isAr ? persona.profile.avatarInitialsAr : persona.profile.avatarInitialsEn;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      {/* ─── Page header / breadcrumb ─── */}
      <div className="flex items-center gap-2 text-[12px] mb-5" style={{ color: tk.textMuted }}>
        <span style={{ fontWeight: 500 }}>{isAr ? 'الرئيسية' : 'Home'}</span>
        <span style={{ color: tk.textFaint }}>/</span>
        <span style={{ fontWeight: 600, color: tk.textSecondary }}>{isAr ? 'الملف الشخصي' : 'Profile'}</span>
      </div>

      {/* ─── Identity hero strip ─── */}
      <div
        className="rounded-2xl p-5 lg:p-6 mb-5 flex items-center gap-4"
        style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' }}
        >
          <span className="text-[18px] text-white" style={{ fontWeight: 700 }}>{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>{name}</h1>
            {isVIP && (
              <span className="inline-flex items-center gap-1 h-5 px-2 rounded-md text-[10px]" style={{ fontWeight: 700, background: 'rgba(245,191,89,0.15)', color: '#F5BF59', border: '1px solid rgba(245,191,89,0.25)' }}>
                <Crown className="w-2.5 h-2.5" strokeWidth={2.5} />
                {isAr ? 'مؤهل' : 'ELITE'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-[12px]" style={{ color: tk.textMuted }}>
            <Mail className="w-3 h-3" strokeWidth={1.8} />
            <span>{persona.profile.email}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: tk.textFaint }} />
            <span>{isAr ? 'مستثمر فردي' : 'Individual Investor'}</span>
          </div>
        </div>
        <VerifiedPill />
      </div>

      {/* ─── Two-column composition ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column — 2/3 (tabbed) */}
        <div className="lg:col-span-2">
          <MainColumnTabs />
        </div>

        {/* Right rail — 1/3 */}
        <div className="space-y-4">
          {isVIP ? <EliteMemberCard /> : <EliteUpgradeCard />}
          <POAAgreementCard />
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main column tabs
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type TabId = 'personal' | 'kyc' | 'security';

function MainColumnTabs() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  const [active, setActive] = useState<TabId>('personal');

  const tabs: {
    id: TabId;
    label: string;
    labelEn: string;
    icon: React.FC<{ className?: string; strokeWidth?: number }>;
    statusAr: string;
    statusEn: string;
    tone: 'success' | 'info';
  }[] = [
    { id: 'personal', label: 'المعلومات الشخصية', labelEn: 'Personal',  icon: User,      statusAr: 'موثّق',  statusEn: 'Verified', tone: 'success' },
    { id: 'kyc',      label: 'اعرف عميلك',         labelEn: 'KYC',       icon: Briefcase, statusAr: 'مكتمل',  statusEn: 'Complete', tone: 'success' },
    { id: 'security', label: 'الأمان',              labelEn: 'Security',  icon: Shield,    statusAr: 'قوي',    statusEn: 'Strong',   tone: 'info'    },
  ];

  const toneFor = (tone: 'success' | 'info') =>
    tone === 'success'
      ? { dot: tk.isVIP ? '#34D399' : '#10B981', text: tk.isVIP ? '#34D399' : '#047857' }
      : { dot: tk.isVIP ? '#60A5FA' : '#1D4ED8', text: tk.isVIP ? '#60A5FA' : '#1D4ED8' };

  const accentSoftBg = tk.isVIP
    ? 'linear-gradient(180deg, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.04) 100%)'
    : 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)';
  const accentBorder = tk.isVIP ? 'rgba(96,165,250,0.32)' : '#BFDBFE';
  const accentShadow = tk.isVIP
    ? '0 6px 18px rgba(37,99,235,0.22), 0 0 0 1px rgba(96,165,250,0.18)'
    : '0 6px 14px rgba(29,78,216,0.09), 0 1px 2px rgba(15,23,42,0.05)';
  const activeTileBg = tk.isVIP
    ? 'linear-gradient(135deg, rgba(96,165,250,0.22) 0%, rgba(37,99,235,0.28) 100%)'
    : 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)';
  const brandInk = tk.isVIP ? '#60A5FA' : '#1D4ED8';
  const accentBar = tk.isVIP
    ? 'linear-gradient(90deg, transparent 0%, #60A5FA 50%, transparent 100%)'
    : 'linear-gradient(90deg, transparent 0%, #1D4ED8 50%, transparent 100%)';

  return (
    <div className="space-y-4">
      {/* Chapter plate tab strip */}
      <div className="grid grid-cols-3 gap-2.5">
        {tabs.map((tab, idx) => {
          const isActive = active === tab.id;
          const tone = toneFor(tab.tone);

          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative rounded-2xl overflow-hidden cursor-pointer text-start"
              style={{
                background: isActive ? accentSoftBg : tk.cardBg,
                border: `1px solid ${isActive ? accentBorder : (tk.isVIP ? 'rgba(255,255,255,0.06)' : '#EEF1F5')}`,
                boxShadow: isActive ? accentShadow : tk.cardShadow,
                transition: 'transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.background = tk.isVIP ? 'rgba(255,255,255,0.03)' : '#FBFCFD';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = tk.cardBg;
                }
              }}
            >
              <div className="p-4">
                {/* Header row: icon tile · sequence numeral */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: isActive ? activeTileBg : tk.iconBg,
                      border: isActive ? `1px solid ${accentBorder}` : '1px solid transparent',
                      transition: 'background 160ms ease, border-color 160ms ease',
                    }}
                  >
                    <tab.icon
                      className="w-[16px] h-[16px]"
                      strokeWidth={isActive ? 2 : 1.7}
                      style={{ color: isActive ? brandInk : tk.iconColor } as React.CSSProperties}
                    />
                  </div>
                  <span
                    className="text-[10px] tabular-nums"
                    dir="ltr"
                    style={{
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: isActive ? brandInk : tk.textFaint,
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Label */}
                <div
                  className="text-[13px] truncate mb-1.5"
                  style={{
                    fontWeight: 700,
                    color: isActive ? tk.textPrimary : tk.textSecondary,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {isAr ? tab.label : tab.labelEn}
                </div>

                {/* Status meta */}
                <div className="inline-flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: tone.dot,
                      boxShadow: `0 0 0 2px ${tk.isVIP ? 'rgba(255,255,255,0.04)' : 'rgba(16,185,129,0.08)'}`,
                    }}
                  />
                  <span
                    className="text-[10.5px]"
                    style={{ color: tone.text, fontWeight: 600, letterSpacing: '0.01em' }}
                  >
                    {isAr ? tab.statusAr : tab.statusEn}
                  </span>
                </div>
              </div>

              {/* Active accent bar */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: accentBar }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div>
        {active === 'personal' && <PersonalInfo />}
        {active === 'kyc' && <KYC />}
        {active === 'security' && <Security />}
      </div>
    </div>
  );
}
