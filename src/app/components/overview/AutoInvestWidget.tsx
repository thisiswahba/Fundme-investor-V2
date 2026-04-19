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
        className="rounded-2xl overflow-hidden relative h-full flex flex-col"
        style={{ background: tk.cardBg, border: tk.cardBorder, boxShadow: tk.cardShadow }}
      >
        {/* Hero strip — compact */}
        <div
          className="relative px-5 py-4 overflow-hidden shrink-0"
          style={{
            background: active
              ? 'linear-gradient(135deg, #064E3B 0%, #0B3B2E 50%, #0F2A4D 100%)'
              : 'linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 50%, #2563EB 100%)',
          }}
        >
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: active
                ? 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] text-white truncate" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  {isAr ? 'الاستثمار التلقائي' : 'Auto-Invest'}
                </h3>
                <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {isAr ? 'استثمر نيابةً عنك' : 'Invest on your behalf'}
                </p>
              </div>
            </div>
            {active && (
              <span
                className="inline-flex items-center gap-1 h-5 px-1.5 rounded text-[9px] tracking-wide shrink-0"
                style={{
                  fontWeight: 700,
                  background: 'rgba(167,243,208,0.18)',
                  color: '#A7F3D0',
                  border: '1px solid rgba(167,243,208,0.35)',
                }}
              >
                <span className="w-1 h-1 rounded-full bg-[#34D399] animate-pulse" />
                {isAr ? 'مفعّل' : 'ON'}
              </span>
            )}
          </div>
        </div>

        {/* Body — flex-1 fills remaining space */}
        <div className="px-5 py-4 flex-1 flex flex-col">
          {/* Benefits list — compact, evenly distributed */}
          <ul className="space-y-2.5 flex-1">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: tk.accentSoft, border: tk.accentBorder }}
                >
                  <b.icon className="w-3 h-3" strokeWidth={2} style={{ color: tk.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] leading-tight" style={{ fontWeight: 600, color: tk.textPrimary }}>
                    {b.title}
                  </div>
                  <div className="text-[10.5px] mt-0.5 leading-snug" style={{ color: tk.textMuted }}>
                    {b.desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Stats row when active */}
          {active && (
            <div
              className="grid grid-cols-2 gap-2 mt-3 rounded-lg p-2.5"
              style={{ background: tk.innerBg, border: tk.innerBorder }}
            >
              <div>
                <div className="text-[9px] uppercase" style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}>
                  {isAr ? 'تنفيذ' : 'Runs'}
                </div>
                <div className="text-[15px] font-mono tabular-nums" style={{ fontWeight: 700, color: tk.textPrimary }}>0</div>
              </div>
              <div>
                <div className="text-[9px] uppercase" style={{ fontWeight: 600, color: tk.labelColor, letterSpacing: '0.08em' }}>
                  {isAr ? 'آخر تنفيذ' : 'Last run'}
                </div>
                <div className="text-[12px] mt-0.5" style={{ fontWeight: 600, color: tk.textPrimary }}>
                  {isAr ? 'لم يبدأ' : 'Not yet'}
                </div>
              </div>
            </div>
          )}

          {/* CTA — pinned bottom */}
          {active ? (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 h-10 rounded-lg flex items-center justify-center gap-1.5 text-[12px] transition-colors cursor-pointer"
                style={{
                  fontWeight: 600,
                  color: tk.activeAccent,
                  background: tk.activeSoft,
                  border: tk.activeBorder,
                }}
              >
                <Settings2 className="w-3.5 h-3.5" strokeWidth={2} />
                {isAr ? 'تعديل' : 'Edit'}
              </button>
              <button
                onClick={() => setActive(false)}
                className="h-10 px-3 rounded-lg flex items-center justify-center gap-1 text-[11px] transition-colors cursor-pointer"
                style={{ fontWeight: 500, color: tk.textMuted, background: 'transparent' }}
                title={isAr ? 'إيقاف' : 'Pause'}
              >
                <PauseCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
                {isAr ? 'إيقاف' : 'Pause'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setActive(true); setModalOpen(true); }}
              className="w-full h-10 rounded-lg flex items-center justify-center gap-1.5 text-[12px] text-white transition-all hover:scale-[1.02] cursor-pointer mt-4"
              style={{
                fontWeight: 700,
                background: tk.ctaBg,
                boxShadow: tk.ctaShadow,
              }}
            >
              <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
              {isAr ? 'تفعيل الآن' : 'Enable Now'}
              <Arrow className="w-3 h-3" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </section>

      <AutoInvestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
