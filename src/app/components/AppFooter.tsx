import { ShieldCheck, FileText, Shield, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';

export function AppFooter() {
  const { lang } = useI18n();
  const { personaId } = usePersona();
  const isAr = lang === 'ar';
  const isVIP = personaId === 'vip';

  type FooterLink = {
    icon: React.FC<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
    labelAr: string;
    labelEn: string;
    href: string;
    external?: boolean;
  };

  const links: FooterLink[] = [
    { icon: FileText,    labelAr: 'الشروط والأحكام',      labelEn: 'Terms of Service',      href: '#terms' },
    { icon: ShieldCheck, labelAr: 'سياسة الخصوصية',       labelEn: 'Privacy Policy',        href: '#privacy' },
    { icon: Shield,      labelAr: 'قواعد حماية العميل',    labelEn: 'Customer Protection',   href: '#protection' },
    { icon: Mail,        labelAr: 'تواصل معنا',            labelEn: 'Contact',               href: 'mailto:support@fundme.sa', external: true },
  ];

  const handleClick = (e: React.MouseEvent, l: FooterLink) => {
    if (l.external) return;
    e.preventDefault();
    toast.success(
      isAr ? `سيتم فتح ${l.labelAr} في نافذة جديدة` : `${l.labelEn} opens in a new window`,
      { duration: 2200 },
    );
  };

  return (
    <footer
      className="mt-8 pb-20 md:pb-0"
      style={{
        background: isVIP ? '#08162A' : '#FFFFFF',
        borderTop: `1px solid ${isVIP ? 'rgba(255,255,255,0.06)' : '#EEF1F5'}`,
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Copyright */}
          <span
            className="text-[11.5px]"
            style={{
              color: isVIP ? 'rgba(255,255,255,0.4)' : '#94A3B8',
              fontWeight: 500,
            }}
          >
            {isAr
              ? '© ٢٠٢٦ فند مي. جميع الحقوق محفوظة.'
              : '© 2026 FundMe. All rights reserved.'}
          </span>

          {/* Links */}
          <nav className="flex items-center flex-wrap gap-x-1 gap-y-1">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                onClick={(e) => handleClick(e, l)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11.5px] transition-colors cursor-pointer no-underline"
                style={{
                  color: isVIP ? 'rgba(255,255,255,0.55)' : '#475569',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isVIP ? '#60A5FA' : '#1D4ED8';
                  e.currentTarget.style.background = isVIP ? 'rgba(96,165,250,0.08)' : '#EFF6FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isVIP ? 'rgba(255,255,255,0.55)' : '#475569';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <l.icon
                  className="w-3 h-3"
                  strokeWidth={1.8}
                  style={{ opacity: 0.7 }}
                />
                {isAr ? l.labelAr : l.labelEn}
              </a>
            ))}
          </nav>
        </div>

        {/* Compliance line */}
        <div
          className="mt-4 pt-4 text-[10.5px] leading-relaxed"
          style={{
            borderTop: `1px solid ${isVIP ? 'rgba(255,255,255,0.04)' : '#F1F5F9'}`,
            color: isVIP ? 'rgba(255,255,255,0.32)' : '#94A3B8',
            fontWeight: 500,
          }}
        >
          {isAr
            ? 'فند مي شركة سعودية مرخّصة من البنك المركزي السعودي (ساما). الاستثمار في الفرص ينطوي على مخاطر، يرجى قراءة شروط كل فرصة بعناية.'
            : 'FundMe is a Saudi company licensed by the Saudi Central Bank (SAMA). Investing in opportunities involves risk; please review each opportunity\'s terms carefully.'}
        </div>
      </div>
    </footer>
  );
}
