import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Headphones, X, Phone, Mail } from 'lucide-react';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';

const SUPPORT_PHONE = '+966 920 012 345';
const SUPPORT_EMAIL = 'support@fundme.sa';

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      overlay: 'rgba(2,8,20,0.72)',
      modalBg: colors.dark.card,
      modalBorder: `1px solid ${colors.dark.border}`,
      modalShadow: '0 24px 80px rgba(0,0,0,0.6)',
      divider: colors.dark.border,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      cardBg: colors.dark.elevated,
      cardBorder: colors.dark.border,
      cardHoverBorder: 'rgba(96,165,250,0.32)',
      cardHoverBg: colors.dark.hover,
      callTileBg: 'linear-gradient(135deg, rgba(96,165,250,0.18) 0%, rgba(37,99,235,0.22) 100%)',
      callTileBorder: 'rgba(96,165,250,0.32)',
      callTileColor: '#60A5FA',
      mailTileBg: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(43,182,115,0.22) 100%)',
      mailTileBorder: 'rgba(52,211,153,0.32)',
      mailTileColor: '#34D399',
      closeBtnBg: colors.dark.hover,
      closeBtnIcon: colors.textOnDark.tertiary,
      fabGradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      fabShadow: '0 8px 24px rgba(37,99,235,0.45), 0 2px 6px rgba(0,0,0,0.3)',
    };
  }
  return {
    isVIP: false,
    overlay: 'rgba(15,23,42,0.45)',
    modalBg: '#FFFFFF',
    modalBorder: '1px solid #EEF1F5',
    modalShadow: '0 24px 60px rgba(15,23,42,0.18)',
    divider: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    cardBg: '#FFFFFF',
    cardBorder: '#EEF1F5',
    cardHoverBorder: '#BFDBFE',
    cardHoverBg: '#F8FAFC',
    callTileBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    callTileBorder: '#BFDBFE',
    callTileColor: '#1D4ED8',
    mailTileBg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    mailTileBorder: '#A7F3D0',
    mailTileColor: '#059669',
    closeBtnBg: '#F1F5F9',
    closeBtnIcon: '#64748B',
    fabGradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    fabShadow: '0 8px 24px rgba(37,99,235,0.35), 0 2px 6px rgba(0,0,0,0.12)',
  };
}

type Tokens = ReturnType<typeof buildTokens>;

export function SupportChat() {
  const { lang, dir } = useI18n();
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');
  const isAr = lang === 'ar';
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // FAB position — opposite corner of persona switcher (which sits at dir-end)
  const positionStyle: React.CSSProperties = dir === 'rtl' ? { right: 24 } : { left: 24 };

  return (
    <>
      {/* Modal */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: tk.overlay, backdropFilter: 'blur(4px)' }}
          dir={dir}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="w-full max-w-[420px] rounded-2xl overflow-hidden relative"
            style={{
              background: tk.modalBg,
              border: tk.modalBorder,
              boxShadow: tk.modalShadow,
            }}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              className="absolute top-4 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors z-10"
              style={{
                background: tk.closeBtnBg,
                [isAr ? 'left' : 'right']: 16,
              } as React.CSSProperties}
            >
              <X className="w-4 h-4" strokeWidth={1.8} style={{ color: tk.closeBtnIcon } as React.CSSProperties} />
            </button>

            <div className="px-7 pt-9 pb-7">
              {/* Hero icon tile */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: tk.callTileBg,
                    border: `1px solid ${tk.callTileBorder}`,
                  }}
                >
                  <Headphones className="w-6 h-6" strokeWidth={1.7} style={{ color: tk.callTileColor } as React.CSSProperties} />
                </div>
              </div>

              {/* Title + subtitle */}
              <div className="text-center mb-6">
                <h2
                  className="text-[20px] leading-tight"
                  style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.02em' }}
                >
                  {isAr ? 'اتصل بالدعم' : 'Contact Support'}
                </h2>
                <p
                  className="text-[12.5px] mt-1.5"
                  style={{ color: tk.textMuted, fontWeight: 500 }}
                >
                  {isAr ? 'تواصل معنا في أي وقت' : 'Reach us anytime'}
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-2.5">
                <ContactCard
                  tk={tk}
                  href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
                  icon={Phone}
                  iconBg={tk.callTileBg}
                  iconBorder={tk.callTileBorder}
                  iconColor={tk.callTileColor}
                  primary={SUPPORT_PHONE}
                  secondary={isAr ? 'اتصل الآن' : 'Call now'}
                  primaryLtr
                />
                <ContactCard
                  tk={tk}
                  href={`mailto:${SUPPORT_EMAIL}`}
                  icon={Mail}
                  iconBg={tk.mailTileBg}
                  iconBorder={tk.mailTileBorder}
                  iconColor={tk.mailTileColor}
                  primary={SUPPORT_EMAIL}
                  secondary={isAr ? 'راسلنا' : 'Email us'}
                  primaryLtr
                />
              </div>

              {/* Hours / SLA hint */}
              <div
                className="mt-5 pt-4 text-[11px] text-center"
                style={{
                  borderTop: `1px solid ${tk.divider}`,
                  color: tk.textMuted,
                  fontWeight: 500,
                }}
              >
                {isAr
                  ? 'متوفّرون من الأحد إلى الخميس · ٩ صباحاً – ٦ مساءً'
                  : 'Sun – Thu · 9:00 AM – 6:00 PM'}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-6 z-[99] w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        style={{
          ...positionStyle,
          background: tk.fabGradient,
          boxShadow: tk.fabShadow,
          color: '#fff',
        }}
        aria-label={isAr ? 'الدعم' : 'Support'}
      >
        <Headphones className="w-6 h-6" strokeWidth={2} />
      </button>
    </>
  );
}

function ContactCard({
  tk, href, icon: Icon, iconBg, iconBorder, iconColor, primary, secondary, primaryLtr,
}: {
  tk: Tokens;
  href: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  primary: string;
  secondary: string;
  primaryLtr?: boolean;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer no-underline"
      style={{
        background: tk.cardBg,
        border: `1px solid ${tk.cardBorder}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = tk.cardHoverBg;
        e.currentTarget.style.borderColor = tk.cardHoverBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = tk.cardBg;
        e.currentTarget.style.borderColor = tk.cardBorder;
      }}
    >
      <div className="flex-1 min-w-0 text-start">
        <div
          className="text-[15px] truncate"
          dir={primaryLtr ? 'ltr' : undefined}
          style={{
            fontWeight: 700,
            color: tk.textPrimary,
            letterSpacing: '-0.005em',
            textAlign: 'start',
          }}
        >
          {primary}
        </div>
        <div
          className="text-[11.5px] mt-1"
          style={{ color: tk.textMuted, fontWeight: 500 }}
        >
          {secondary}
        </div>
      </div>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: iconBg,
          border: `1px solid ${iconBorder}`,
        }}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: iconColor } as React.CSSProperties} />
      </div>
    </a>
  );
}
