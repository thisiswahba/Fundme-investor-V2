import { useState } from 'react';
import {
  User, Mail, Phone, Shield, Calendar, MapPin, Pencil, FileText, Download,
  Lock, Bell, GraduationCap, Briefcase, Banknote, TrendingUp, Wallet,
  Crown, ShieldCheck, ExternalLink, AlertTriangle, Sparkles, Check,
} from 'lucide-react';
import { usePersona } from '../demoPersona';
import { useI18n } from '../i18n';
import { colors } from '../components/fundme';

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
    <div className="flex items-start gap-3 py-3.5" style={{ borderBottom: `1px solid ${tk.divider}` }}>
      {Icon && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: tk.innerBg }}>
          <Icon className="w-[14px] h-[14px]" strokeWidth={1.6} style={{ color: tk.iconColor }} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-[10px] uppercase"
            style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}
          >
            {isAr ? label : labelEn}
          </span>
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 h-6 px-2 rounded-md text-[10px] transition-colors cursor-pointer"
              style={{ fontWeight: 600, color: tk.linkColor }}
              onMouseEnter={(e) => (e.currentTarget.style.background = tk.linkHoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <Pencil className="w-3 h-3" strokeWidth={2} />
              {isAr ? editLabel || 'تعديل' : editLabelEn || 'Edit'}
            </button>
          )}
        </div>
        <div
          className={`text-[14px] mt-0.5 ${mono ? 'font-mono tracking-wide' : ''}`}
          dir={mono ? 'ltr' : undefined}
          style={{ fontWeight: 600, color: tk.textPrimary }}
        >
          {isAr ? value : (valueEn || value)}
        </div>
      </div>
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
  return (
    <SectionCard icon={User} title="المعلومات الشخصية" titleEn="Personal Information" rightSlot={<VerifiedPill />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Field icon={User} label="الاسم الكامل" labelEn="Full Name" value={persona.profile.nameAr} valueEn={persona.profile.nameEn} />
        <Field icon={Shield} label="رقم الهوية" labelEn="National ID" value="1098 •••• 7890" mono />
        <Field icon={Calendar} label="تاريخ الميلاد" labelEn="Date of Birth" value="١٥ مارس ١٩٩٠" valueEn="March 15, 1990" />
        <Field icon={MapPin} label="العنوان الوطني" labelEn="National Address" value="طريق الملك فهد، الرياض — ص.ب ١٢٣٤٥" valueEn="123 King Fahd Rd, Riyadh — P.O. Box 12345" />
        <Field icon={Mail} label="البريد الإلكتروني" labelEn="Email Address" value={persona.profile.email} mono onEdit={() => {}} />
        <Field icon={Phone} label="رقم الجوال" labelEn="Phone Number" value="+966 50 123 4567" mono onEdit={() => {}} />
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
  return (
    <SectionCard
      icon={Briefcase}
      title="اعرف عميلك (KYC)"
      titleEn="KYC"
      rightSlot={<EditPillButton label="تعديل" labelEn="Edit" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Field icon={GraduationCap} label="المستوى التعليمي" labelEn="Education Level" value="بكالوريوس" valueEn="Bachelor's Degree" />
        <Field icon={Briefcase} label="الحالة الوظيفية" labelEn="Employment Status" value="موظف" valueEn="Employed" />
        <Field icon={TrendingUp} label="خبرة الاستثمار" labelEn="Investment Experience" value="نعم" valueEn="Yes" />
        <Field icon={Banknote} label="الدخل السنوي" labelEn="Annual Income" value="٢٠٠٬٠٠٠ – ٥٠٠٬٠٠٠ ﷼" valueEn="SAR 200,000 – 500,000" />
        <Field icon={Wallet} label="صافي الثروة" labelEn="Net Worth" value="١٬٠٠٠٬٠٠٠ – ٣٬٠٠٠٬٠٠٠ ﷼" valueEn="SAR 1M – 3M" />
        <Field icon={Banknote} label="مصدر الدخل" labelEn="Income Source" value="راتب وظيفي" valueEn="Employment Salary" />
      </div>

      {/* PEP Sub-section */}
      <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${tk.divider}` }}>
        <h3 className="text-[12px] mb-3" style={{ fontWeight: 700, color: tk.textPrimary }}>
          {isAr ? 'حالة الشخص المكشوف سياسياً (PEP)' : 'Politically Exposed Person (PEP) Status'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <KycPepCell label="منصب حكومي بارز" labelEn="Senior Public Position" clean />
          <KycPepCell label="منصب في منظمة دولية" labelEn="International Org Position" clean />
          <KycPepCell label="صلة قرابة بشخص PEP" labelEn="Family Relationship with PEP" clean />
        </div>
      </div>
    </SectionCard>
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

  return (
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

      <div className="relative p-6">
        {/* Crown medallion */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F5BF59 0%, #E0A132 100%)',
              boxShadow: '0 8px 24px rgba(245,191,89,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <Crown className="w-7 h-7" strokeWidth={2} style={{ color: '#1A1404' }} />
          </div>
          <Sparkles className="w-4 h-4" strokeWidth={1.5} style={{ color: 'rgba(245,191,89,0.6)' }} />
        </div>

        {/* Title */}
        <h3
          className="text-[22px] mb-1.5"
          style={{ fontWeight: 700, color: '#F5BF59', letterSpacing: '-0.02em' }}
        >
          {isAr ? 'كن مستثمراً مؤهلاً' : 'Become Elite'}
        </h3>
        <p className="text-[12px] mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {isAr
            ? 'افتح مزايا حصرية وفرصاً متميزة'
            : 'Unlock exclusive benefits and premium opportunities'}
        </p>

        {/* Benefits */}
        <ul className="space-y-2.5 mb-6">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={2} style={{ color: '#F5BF59' }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Usage meter */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2 text-[11px]">
            <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
              {isAr ? 'الحد المستخدم' : 'Limit used'}
            </span>
            <span className="font-mono" dir="ltr" style={{ color: '#F5BF59', fontWeight: 600 }}>
              {used.toLocaleString()} / {cap.toLocaleString()} ﷼
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #F5BF59 0%, #E0A132 100%)',
                boxShadow: '0 0 12px rgba(245,191,89,0.5)',
              }}
            />
          </div>
          <div className="text-[10px] mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {isAr ? '٢٥٬٠٠٠ ﷼ متبقّي' : '25,000 SAR remaining'}
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-[14px] transition-all hover:scale-[1.02] cursor-pointer"
          style={{
            fontWeight: 700,
            color: '#1A1404',
            background: 'linear-gradient(135deg, #F5BF59 0%, #E0A132 100%)',
            boxShadow: '0 6px 20px rgba(245,191,89,0.35)',
          }}
        >
          <Crown className="w-4 h-4" strokeWidth={2.5} />
          {isAr ? 'الترقية الآن' : 'Upgrade Now'}
        </button>

        {/* Member since */}
        <div className="mt-4 pt-4 text-center text-[11px]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
          {isAr ? 'عضو منذ ١٥ يناير ٢٠٢٤' : 'Member since January 15, 2024'}
        </div>
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
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F5BF59 0%, #E0A132 100%)',
              boxShadow: '0 8px 24px rgba(245,191,89,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <Crown className="w-7 h-7" strokeWidth={2} style={{ color: '#1A1404' }} />
          </div>
          <span
            className="inline-flex items-center gap-1 h-6 px-2.5 rounded-md text-[10px] tracking-wide"
            style={{ fontWeight: 700, background: 'rgba(245,191,89,0.15)', color: '#F5BF59', border: '1px solid rgba(245,191,89,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5BF59', boxShadow: '0 0 8px rgba(245,191,89,0.8)' }} />
            {isAr ? 'نشط' : 'ACTIVE'}
          </span>
        </div>

        <h3 className="text-[22px] mb-1" style={{ fontWeight: 700, color: '#F5BF59', letterSpacing: '-0.02em' }}>
          {isAr ? 'عضو مؤهل' : 'Elite Member'}
        </h3>
        <p className="text-[12px] mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {isAr ? 'تتمتع بكامل المزايا الحصرية' : 'Enjoying full premium privileges'}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              {isAr ? 'الحد الاستثماري' : 'Investment Limit'}
            </div>
            <div className="text-[14px]" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              {isAr ? 'بلا حدود' : 'Unlimited'}
            </div>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              {isAr ? 'مدير الحساب' : 'Account Manager'}
            </div>
            <div className="text-[14px]" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              {isAr ? 'مخصّص' : 'Dedicated'}
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
          {isAr ? 'عضو منذ ١٥ يناير ٢٠٢٤' : 'Member since January 15, 2024'}
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
      className="rounded-2xl p-6 text-center"
      style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
    >
      <div
        className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: tk.isVIP ? 'rgba(96,165,250,0.1)' : '#EFF6FF' }}
      >
        <FileText className="w-6 h-6" strokeWidth={1.6} style={{ color: tk.linkColor }} />
      </div>
      <h3 className="text-[15px] mb-1.5" style={{ fontWeight: 700, color: tk.textPrimary }}>
        {isAr ? 'اتفاقية الوكالة' : 'POA Agreement'}
      </h3>
      <p className="text-[12px] mb-5 leading-relaxed" style={{ color: tk.textMuted }}>
        {isAr ? 'حمّل اتفاقية التوكيل الموقّعة الخاصة بك' : 'Download your signed Power of Attorney agreement'}
      </p>
      <button
        className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-[13px] text-white transition-all hover:scale-[1.02] cursor-pointer"
        style={{
          fontWeight: 600,
          background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
          boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
        }}
      >
        <Download className="w-4 h-4" strokeWidth={2} />
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
      className="rounded-2xl p-6"
      style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
    >
      <h3 className="text-[14px] mb-4" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.01em' }}>
        {isAr ? 'روابط مهمة' : 'Quick Links'}
      </h3>
      <div className="space-y-1">
        {links.map((l, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
            style={{ color: tk.textPrimary }}
            onMouseEnter={(e) => (e.currentTarget.style.background = tk.innerBg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: tk.innerBg }}>
              <l.icon className="w-4 h-4" strokeWidth={1.6} style={{ color: tk.iconColor }} />
            </div>
            <span className="flex-1 text-[13px]" style={{ fontWeight: 500 }}>
              {isAr ? l.label : l.labelEn}
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.8} style={{ color: tk.textMuted }} />
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
      className="rounded-2xl p-6"
      style={{ background: tk.dangerBg, border: tk.dangerBorder }}
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4" strokeWidth={2} style={{ color: tk.dangerText }} />
        <h3 className="text-[14px]" style={{ fontWeight: 700, color: tk.dangerText }}>
          {isAr ? 'منطقة الخطر' : 'Danger Zone'}
        </h3>
      </div>
      <p className="text-[12px] leading-relaxed mb-4" style={{ color: tk.textSecondary }}>
        {isAr
          ? 'إلغاء تنشيط حسابك يوقف مؤقتاً جميع الخدمات المرتبطة به.'
          : 'Deactivate your account and temporarily suspend all associated services.'}
      </p>
      <button
        className="w-full h-11 rounded-xl text-[13px] text-white transition-all hover:opacity-90 cursor-pointer"
        style={{ fontWeight: 600, background: tk.dangerBtn, boxShadow: '0 4px 14px rgba(220,38,38,0.25)' }}
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
        <div className="space-y-5">
          {isVIP ? <EliteMemberCard /> : <EliteUpgradeCard />}
          <POAAgreementCard />
          <QuickLinks />
          <DangerZone />
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

  const tabs: { id: TabId; label: string; labelEn: string; icon: React.FC<{ className?: string; strokeWidth?: number }> }[] = [
    { id: 'personal', label: 'المعلومات الشخصية', labelEn: 'Personal', icon: User },
    { id: 'kyc', label: 'اعرف عميلك', labelEn: 'KYC', icon: Briefcase },
    { id: 'security', label: 'الأمان', labelEn: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-4">
      {/* Tab strip */}
      <div
        className="rounded-2xl p-1.5 flex items-center gap-1"
        style={{
          background: tk.cardBg,
          border: tk.cardBorder,
          boxShadow: tk.cardShadow,
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all cursor-pointer"
              style={{
                background: isActive
                  ? tk.isVIP
                    ? 'rgba(96,165,250,0.12)'
                    : '#EFF6FF'
                  : 'transparent',
                color: isActive ? tk.linkColor : tk.textMuted,
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = tk.isVIP ? 'rgba(255,255,255,0.03)' : '#FBFCFD'; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <tab.icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[12px] truncate" style={{ fontWeight: isActive ? 700 : 500 }}>
                {isAr ? tab.label : tab.labelEn}
              </span>
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
