import { useState } from 'react';
import {
  User, Mail, Phone, Shield, ShieldCheck, CreditCard, Building2,
  Pencil, Plus, Trash2, FileText, Download, Lock, Smartphone,
  Monitor, Globe, Bell, ChevronDown, CheckCircle, AlertCircle, Clock,
  GraduationCap, Briefcase, Banknote, TrendingUp, Wallet, Crown,
  Eye, EyeOff, ExternalLink,
} from 'lucide-react';
import { usePersona } from '../demoPersona';
import { useI18n } from '../i18n';
import { VIPUpgradeModal } from '../components/VIPUpgradeModal';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Shared Primitives
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionCard({ title, titleEn, action, children }: {
  title: string;
  titleEn: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { lang } = useI18n();
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#0C1C34', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] text-[#0F172A]" style={{ fontWeight: 700 }}>
          {lang === 'ar' ? title : titleEn}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, labelEn, value, valueEn, icon: Icon, mono }: {
  label: string;
  labelEn: string;
  value: string;
  valueEn?: string;
  icon?: React.FC<{ className?: string; strokeWidth?: number }>;
  mono?: boolean;
}) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid #F8FAFC' }}>
      {Icon && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#F1F5F9' }}>
          <Icon className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.6} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-[#94A3B8] mb-0.5" style={{ fontWeight: 500 }}>
          {isAr ? label : labelEn}
        </div>
        <div
          className={`text-[14px] text-[#0F172A] ${mono ? 'font-mono' : ''}`}
          dir={mono ? 'ltr' : undefined}
          style={{ fontWeight: 600 }}
        >
          {isAr ? value : (valueEn || value)}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'verified' | 'pending' | 'unverified' }) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const config = {
    verified: { label: isAr ? 'موثق' : 'Verified', bg: '#F0FDF4', color: '#2BB673', Icon: CheckCircle },
    pending: { label: isAr ? 'قيد المراجعة' : 'Pending', bg: '#FFFBEB', color: '#D97706', Icon: Clock },
    unverified: { label: isAr ? 'غير موثق' : 'Unverified', bg: '#FEF2F2', color: '#DC2626', Icon: AlertCircle },
  };
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px]"
      style={{ background: c.bg, color: c.color, fontWeight: 600 }}
    >
      <c.Icon className="w-3 h-3" strokeWidth={2} />
      {c.label}
    </span>
  );
}

function EditButton({ label, labelEn }: { label: string; labelEn: string }) {
  const { lang } = useI18n();
  return (
    <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
      <Pencil className="w-3 h-3" strokeWidth={2} />
      {lang === 'ar' ? label : labelEn}
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. Profile Header
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ProfileHeader({ onUpgrade }: { onUpgrade?: () => void }) {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const name = isAr ? persona.profile.nameAr : persona.profile.nameEn;
  const initials = isAr ? persona.profile.avatarInitialsAr : persona.profile.avatarInitialsEn;

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#0C1C34', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
    >
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' }}
        >
          <span className="text-[20px] text-white" style={{ fontWeight: 700 }}>{initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>{name}</h1>
            {persona.profile.isVIP && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px]" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', fontWeight: 700 }}>
                <Crown className="w-2.5 h-2.5" strokeWidth={2.5} />
                VIP
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[13px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
              {persona.profile.email}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
            <span>{isAr ? 'مستثمر فردي' : 'Individual Investor'}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <StatusBadge status="verified" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <EditButton label="تعديل الملف" labelEn="Edit Profile" />
          {!persona.profile.isVIP && onUpgrade && (
            <button
              onClick={onUpgrade}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] transition-all hover:brightness-110 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)', color: 'white', fontWeight: 600, boxShadow: '0 2px 8px rgba(99,102,241,0.25)' }}
            >
              <Crown className="w-3 h-3" strokeWidth={2} />
              {isAr ? 'ترقية VIP' : 'Upgrade to VIP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. Personal Information
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function PersonalInfo() {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const name = isAr ? persona.profile.nameAr : persona.profile.nameEn;

  return (
    <SectionCard title="المعلومات الشخصية" titleEn="Personal Information" action={<EditButton label="تعديل" labelEn="Edit" />}>
      <div className="space-y-0">
        <InfoRow icon={User} label="الاسم الكامل" labelEn="Full Name" value={persona.profile.nameAr} valueEn={persona.profile.nameEn} />
        <InfoRow icon={Shield} label="رقم الهوية" labelEn="National ID" value="1098XXXXXX" mono />
        <InfoRow icon={FileText} label="تاريخ الميلاد" labelEn="Date of Birth" value="١٥ / ٠٣ / ١٩٩٠" valueEn="Mar 15, 1990" />
        <InfoRow icon={Phone} label="رقم الجوال" labelEn="Phone" value="+966 5XX XXX XX8" mono />
        <InfoRow icon={Mail} label="البريد الإلكتروني" labelEn="Email" value={persona.profile.email} mono />
        <InfoRow icon={Globe} label="الجنسية" labelEn="Nationality" value="سعودي" valueEn="Saudi" />
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. Investor Profile
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function InvestorProfile() {
  return (
    <SectionCard title="الملف الاستثماري" titleEn="Investor Profile" action={<EditButton label="تعديل" labelEn="Edit" />}>
      <div className="space-y-0">
        <InfoRow icon={GraduationCap} label="المستوى التعليمي" labelEn="Education" value="بكالوريوس" valueEn="Bachelor's Degree" />
        <InfoRow icon={Briefcase} label="الحالة الوظيفية" labelEn="Employment" value="موظف — قطاع خاص" valueEn="Employed — Private Sector" />
        <InfoRow icon={Banknote} label="الدخل السنوي" labelEn="Annual Income" value="300,000 – 600,000 ريال" valueEn="SAR 300K – 600K" />
        <InfoRow icon={Wallet} label="صافي الثروة" labelEn="Net Worth" value="1,000,000 – 5,000,000 ريال" valueEn="SAR 1M – 5M" />
        <InfoRow icon={TrendingUp} label="خبرة الاستثمار" labelEn="Experience" value="3 – 5 سنوات" valueEn="3 – 5 years" />
        <InfoRow icon={CreditCard} label="مصدر الدخل" labelEn="Income Source" value="راتب شهري" valueEn="Salary" />
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. Bank Details
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const bankAccounts = [
  { bank: 'البنك الأهلي', bankEn: 'Al Ahli Bank', iban: 'SA80 •••• •••• •••• 1234', primary: true },
  { bank: 'بنك الراجحي', bankEn: 'Al Rajhi Bank', iban: 'SA42 •••• •••• •••• 5678', primary: false },
];

function BankDetails() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  return (
    <SectionCard
      title="الحسابات البنكية"
      titleEn="Bank Accounts"
      action={
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
          <Plus className="w-3 h-3" strokeWidth={2.5} />
          {isAr ? 'إضافة حساب' : 'Add Account'}
        </button>
      }
    >
      <div className="space-y-3">
        {bankAccounts.map((acc, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3.5 rounded-xl"
            style={{ background: '#F8FAFC', border: acc.primary ? '1px solid #DBEAFE' : '1px solid #F1F5F9' }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#E2E8F0' }}>
              <Building2 className="w-4 h-4 text-[#64748B]" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                  {isAr ? acc.bank : acc.bankEn}
                </span>
                {acc.primary && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded text-[#2563EB]" style={{ background: '#EFF6FF', fontWeight: 700 }}>
                    {isAr ? 'أساسي' : 'Primary'}
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[#94A3B8] font-mono mt-0.5" dir="ltr">{acc.iban}</div>
            </div>
            <button className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" strokeWidth={1.8} />
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. Documents & Verification
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const documents = [
  { name: 'التحقق عبر نفاذ', nameEn: 'Nafath Verification', status: 'verified' as const, date: '2026-01-15' },
  { name: 'اتفاقية المستخدم', nameEn: 'User Agreement', status: 'verified' as const, date: '2026-01-15' },
  { name: 'ملف المخاطر', nameEn: 'Risk Profile', status: 'verified' as const, date: '2026-01-20' },
  { name: 'إقرار الشريعة', nameEn: 'Shariah Declaration', status: 'pending' as const, date: '' },
];

function DocumentsSection() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  return (
    <SectionCard title="المستندات والتوثيق" titleEn="Documents & Verification">
      <div className="space-y-2">
        {documents.map((doc, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F1F5F9' }}>
              <FileText className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                {isAr ? doc.name : doc.nameEn}
              </div>
              {doc.date && (
                <div className="text-[11px] text-[#94A3B8] mt-0.5">{doc.date}</div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={doc.status} />
              {doc.status === 'verified' && (
                <button className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5" strokeWidth={1.8} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. Security
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SecuritySection() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  const items = [
    {
      icon: Lock,
      title: isAr ? 'كلمة المرور' : 'Password',
      desc: isAr ? 'آخر تحديث: قبل 30 يوم' : 'Last changed: 30 days ago',
      action: isAr ? 'تغيير' : 'Change',
    },
    {
      icon: Smartphone,
      title: isAr ? 'التحقق بخطوتين (OTP)' : 'Two-Factor Auth (OTP)',
      desc: isAr ? 'مفعّل عبر رسالة SMS' : 'Enabled via SMS',
      action: isAr ? 'إدارة' : 'Manage',
      badge: 'verified' as const,
    },
    {
      icon: Monitor,
      title: isAr ? 'الأجهزة الموثوقة' : 'Trusted Devices',
      desc: isAr ? '2 جهاز نشط' : '2 active devices',
      action: isAr ? 'عرض' : 'View',
    },
  ];

  return (
    <SectionCard title="الأمان" titleEn="Security">
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F1F5F9' }}>
              <item.icon className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{item.title}</span>
                {item.badge && <StatusBadge status={item.badge} />}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">{item.desc}</div>
            </div>
            <button className="h-8 px-3 rounded-lg text-[12px] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. Preferences
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function PreferencesSection() {
  const { lang, setLang } = useI18n();
  const isAr = lang === 'ar';

  const prefs = [
    {
      icon: Globe,
      title: isAr ? 'اللغة' : 'Language',
      value: isAr ? 'العربية' : 'English',
      action: (
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="h-8 px-3 rounded-lg text-[12px] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer"
          style={{ fontWeight: 600 }}
        >
          {isAr ? 'تغيير' : 'Change'}
        </button>
      ),
    },
    {
      icon: Bell,
      title: isAr ? 'الإشعارات' : 'Notifications',
      value: isAr ? 'البريد + SMS' : 'Email + SMS',
      action: (
        <button className="h-8 px-3 rounded-lg text-[12px] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
          {isAr ? 'إدارة' : 'Manage'}
        </button>
      ),
    },
    {
      icon: Mail,
      title: isAr ? 'تفضيلات التواصل' : 'Communication',
      value: isAr ? 'التقارير الشهرية مفعّلة' : 'Monthly reports enabled',
      action: (
        <button className="h-8 px-3 rounded-lg text-[12px] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer" style={{ fontWeight: 600 }}>
          {isAr ? 'تعديل' : 'Edit'}
        </button>
      ),
    },
  ];

  return (
    <SectionCard title="التفضيلات" titleEn="Preferences">
      <div className="space-y-2">
        {prefs.map((pref, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F1F5F9' }}>
              <pref.icon className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{pref.title}</div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">{pref.value}</div>
            </div>
            {pref.action}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Page Composition
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function ProfilePage() {
  const [vipModalOpen, setVipModalOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <ProfileHeader onUpgrade={() => setVipModalOpen(true)} />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column */}
        <div className="space-y-5">
          <PersonalInfo />
          <InvestorProfile />
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <BankDetails />
          <DocumentsSection />
          <SecuritySection />
          <PreferencesSection />
        </div>
      </div>

      <VIPUpgradeModal open={vipModalOpen} onClose={() => setVipModalOpen(false)} />
    </div>
  );
}
