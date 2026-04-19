import { useState } from 'react';
import { Sparkles, Zap, Target, Settings2, ArrowRight, ArrowLeft, CheckCircle, PauseCircle } from 'lucide-react';
import { useI18n } from '../../i18n';
import { usePersona } from '../../demoPersona';
import { AutoInvestModal } from '../AutoInvestModal';
import { colors } from '../fundme';

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      cardBg: colors.dark.card,
      cardBorder: `1px solid ${colors.dark.border}`,
      cardShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
      innerBg: colors.dark.elevated,
      innerBorder: `1px solid ${colors.dark.border}`,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      labelColor: colors.textOnDark.tertiary,
      iconBg: colors.dark.hover,
      iconColor: colors.textOnDark.tertiary,
      accent: '#60A5FA',
      accentSoft: 'rgba(96,165,250,0.12)',
      accentBorder: '1px solid rgba(96,165,250,0.25)',
      activeAccent: '#34D399',
      activeSoft: 'rgba(52,211,153,0.12)',
      activeBorder: '1px solid rgba(52,211,153,0.3)',
      ctaBg: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      ctaShadow: '0 6px 20px rgba(37,99,235,0.35)',
    };
  }
  return {
    cardBg: '#FFFFFF',
    cardBorder: '1px solid #EEF1F5',
    cardShadow: '0 1px 2px rgba(15,23,42,0.04)',
    innerBg: '#FBFCFD',
    innerBorder: '1px solid #EEF1F5',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    labelColor: '#94A3B8',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    accent: '#1D4ED8',
    accentSoft: '#EFF6FF',
    accentBorder: '1px solid #DBEAFE',
    activeAccent: '#059669',
    activeSoft: '#ECFDF5',
    activeBorder: '1px solid #BBF7D0',
    ctaBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    ctaShadow: '0 6px 20px rgba(37,99,235,0.25)',
  };
}

export function AutoInvestWidget() {
  const { lang, dir } = useI18n();
  const isAr = lang === 'ar';
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');
  const [active, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const benefits = [
    {
      icon: Zap,
      title: isAr ? 'تنفيذ تلقائي' : 'Hands-free execution',
      desc: isAr ? 'يستثمر بالنيابة عنك حسب معاييرك' : 'Invests on your behalf as opportunities match',
    },
    {
      icon: Target,
      title: isAr ? 'معايير مخصّصة' : 'Tailored criteria',
      desc: isAr ? 'تحكّم بمستوى المخاطرة، القطاع، والمدّة' : 'Control risk grade, sector, and tenor',
    },
    {
      icon: Sparkles,
      title: isAr ? 'تنويع تلقائي' : 'Auto diversification',
      desc: isAr ? 'يوزّع رأس المال على عدة فرص لتقليل المخاطر' : 'Spreads capital across multiple deals',
    },
  ];

  return (
    <>
      <section
        className="rounded-2xl overflow-hidden relative"
        style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
      >
        {/* Hero strip */}
        <div
          className="relative px-6 pt-6 pb-5 overflow-hidden"
          style={{
            background: active
              ? 'linear-gradient(135deg, #064E3B 0%, #0B3B2E 50%, #0F2A4D 100%)'
              : 'linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 50%, #2563EB 100%)',
          }}
        >
          {/* atmospheric glow */}
          <div
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: active
                ? 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[16px] text-white" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  {isAr ? 'الاستثمار التلقائي' : 'Auto-Invest'}
                </h3>
                <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {isAr
                    ? 'حدّد معاييرك ودع المنصّة تستثمر نيابةً عنك'
                    : 'Set your criteria once — we invest for you'}
                </p>
              </div>
            </div>
            {active && (
              <span
                className="inline-flex items-center gap-1 h-6 px-2 rounded-md text-[10px] tracking-wide shrink-0"
                style={{
                  fontWeight: 700,
                  background: 'rgba(167,243,208,0.18)',
                  color: '#A7F3D0',
                  border: '1px solid rgba(167,243,208,0.35)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                {isAr ? 'مفعّل' : 'ACTIVE'}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Benefits list */}
          <ul className="space-y-3 mb-5">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: tk.accentSoft, border: tk.accentBorder }}
                >
                  <b.icon className="w-3.5 h-3.5" strokeWidth={2} style={{ color: tk.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] leading-snug" style={{ fontWeight: 600, color: tk.textPrimary }}>
                    {b.title}
                  </div>
                  <div className="text-[11px] mt-0.5 leading-relaxed" style={{ color: tk.textMuted }}>
                    {b.desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Stats row when active */}
          {active && (
            <div
              className="grid grid-cols-2 gap-3 mb-5 rounded-xl p-3"
              style={{ background: tk.innerBg, border: tk.innerBorder }}
            >
              <div>
                <div className="text-[10px] uppercase mb-1" style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}>
                  {isAr ? 'استثمارات تلقائية' : 'Auto investments'}
                </div>
                <div className="text-[18px] font-mono tabular-nums" style={{ fontWeight: 700, color: tk.textPrimary }}>0</div>
              </div>
              <div>
                <div className="text-[10px] uppercase mb-1" style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}>
                  {isAr ? 'آخر تنفيذ' : 'Last run'}
                </div>
                <div className="text-[13px]" style={{ fontWeight: 600, color: tk.textPrimary }}>
                  {isAr ? 'لم يبدأ بعد' : 'Not yet'}
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          {active ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-[13px] transition-colors cursor-pointer"
                style={{
                  fontWeight: 600,
                  color: tk.activeAccent,
                  background: tk.activeSoft,
                  border: tk.activeBorder,
                }}
              >
                <Settings2 className="w-4 h-4" strokeWidth={2} />
                {isAr ? 'تعديل الإعدادات' : 'Edit settings'}
              </button>
              <button
                onClick={() => setActive(false)}
                className="h-11 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[12px] transition-colors cursor-pointer"
                style={{ fontWeight: 500, color: tk.textMuted, background: 'transparent' }}
                title={isAr ? 'إيقاف' : 'Pause'}
              >
                <PauseCircle className="w-4 h-4" strokeWidth={1.8} />
                <span className="hidden sm:inline">{isAr ? 'إيقاف' : 'Pause'}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setActive(true); setModalOpen(true); }}
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-[13px] text-white transition-all hover:scale-[1.02] cursor-pointer"
              style={{
                fontWeight: 700,
                background: tk.ctaBg,
                boxShadow: tk.ctaShadow,
              }}
            >
              <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
              {isAr ? 'تفعيل الاستثمار التلقائي' : 'Enable Auto-Invest'}
              <Arrow className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </section>

      <AutoInvestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
