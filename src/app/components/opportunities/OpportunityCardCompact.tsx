import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { formatSAR, formatPercentage } from '../../utils/currency';
import { ArrowLeft, ArrowRight, Bell, CheckCircle, Users, Calendar, Trophy } from 'lucide-react';
import { usePersona } from '../../demoPersona';
import { useI18n } from '../../i18n';
import { colors } from '../fundme';

interface OpportunityCardCompactProps {
  borrowerName: string;
  opportunityId: string;
  financingType: string;
  risk: 'A' | 'B' | 'C' | 'D' | 'E';
  netReturn?: number;
  roi?: number;
  tenor: string;
  fundingProgress: number;
  totalAmount: number;
  fundedAmount: number;
  categoryIcon?: 'invoice' | 'capital' | 'equipment' | 'expansion' | 'food' | 'innovation';
  gradientTone?: string;
  comingSoon?: boolean;
  /** ISO datetime string when the opportunity launches */
  launchAt?: string;
  launchLabel?: string;
  launchDate?: string;
  patternIndex?: number;
  /** Campaign has reached 100% funding */
  completed?: boolean;
  /** Date the campaign closed (ISO) */
  completedAt?: string;
  /** Number of investors who participated */
  investorCount?: number;
  onClick?: () => void;
}

/* ── Live countdown hook ── */

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function useCountdown(targetIso?: string): Countdown {
  const compute = (): Countdown => {
    if (!targetIso) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    const diff = new Date(targetIso).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, done: false };
  };

  const [state, setState] = useState<Countdown>(compute);

  useEffect(() => {
    if (!targetIso) return;
    setState(compute());
    const id = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  return state;
}

/* ── Animated time segment with full word suffix ── */

type Unit = 'd' | 'h' | 'm' | 's';

const UNIT_LABELS: Record<'ar' | 'en', Record<Unit, { one: string; two: string; few: string; many: string }>> = {
  ar: {
    d: { one: 'يوم', two: 'يومان', few: 'أيام', many: 'يوماً' },
    h: { one: 'ساعة', two: 'ساعتان', few: 'ساعات', many: 'ساعة' },
    m: { one: 'دقيقة', two: 'دقيقتان', few: 'دقائق', many: 'دقيقة' },
    s: { one: 'ثانية', two: 'ثانيتان', few: 'ثوانٍ', many: 'ثانية' },
  },
  en: {
    d: { one: 'day', two: 'days', few: 'days', many: 'days' },
    h: { one: 'hour', two: 'hours', few: 'hours', many: 'hours' },
    m: { one: 'minute', two: 'minutes', few: 'minutes', many: 'minutes' },
    s: { one: 'second', two: 'seconds', few: 'seconds', many: 'seconds' },
  },
};

function pluralize(n: number, unit: Unit, isAr: boolean): string {
  const set = UNIT_LABELS[isAr ? 'ar' : 'en'][unit];
  if (n === 1) return set.one;
  if (n === 2) return set.two;
  if (n >= 3 && n <= 10) return set.few;
  return set.many;
}

function TimeSegment({ value, unit, isAr, color, mutedColor }: {
  value: number;
  unit: Unit;
  isAr: boolean;
  color: string;
  mutedColor: string;
}) {
  const word = pluralize(value, unit, isAr);
  const display = String(value);
  return (
    <div className="flex flex-col items-center justify-center min-w-0 w-full">
      <div
        className="relative overflow-hidden tabular-nums text-center w-full"
        style={{ height: '20px' }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={display}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.45 }}
            className="absolute inset-0 text-[18px] flex items-center justify-center"
            style={{ fontWeight: 700, color, letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            {display}
          </motion.div>
        </AnimatePresence>
      </div>
      <span
        className="text-[9px] mt-0.5 truncate"
        style={{ fontWeight: 500, color: mutedColor, letterSpacing: '0.02em' }}
      >
        {word}
      </span>
    </div>
  );
}

function CountdownBlock({ targetIso, isAr, color, mutedColor }: {
  targetIso?: string;
  isAr: boolean;
  color: string;
  mutedColor: string;
}) {
  const { days, hours, minutes, seconds, done } = useCountdown(targetIso);

  if (done) {
    return (
      <span className="text-[12px]" style={{ fontWeight: 600, color }}>
        {isAr ? 'تم الإطلاق' : 'Launched'}
      </span>
    );
  }

  const segments: { unit: Unit; value: number }[] = [
    { unit: 'd', value: days },
    { unit: 'h', value: hours },
    { unit: 'm', value: minutes },
    { unit: 's', value: seconds },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-1 w-full"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {segments.map((s) => (
        <div key={s.unit} className="flex flex-col items-center justify-center">
          <TimeSegment value={s.value} unit={s.unit} isAr={isAr} color={color} mutedColor={mutedColor} />
        </div>
      ))}
    </div>
  );
}

/* ── SVG Pattern Overlays ── */

function Pattern1() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="p1g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#22D3EE" /></linearGradient>
      </defs>
      <path d="M0 120 Q80 60 160 90 T320 50 T400 80" stroke="url(#p1g)" strokeWidth="1.2" />
      <path d="M0 140 Q100 100 200 110 T400 70" stroke="url(#p1g)" strokeWidth="0.8" />
      <rect x="280" y="20" width="36" height="24" rx="8" stroke="url(#p1g)" strokeWidth="0.8" />
      <rect x="320" y="35" width="28" height="18" rx="6" stroke="url(#p1g)" strokeWidth="0.6" />
      <circle cx="60" cy="30" r="2" fill="#60A5FA" opacity="0.6" /><circle cx="75" cy="25" r="1.5" fill="#60A5FA" opacity="0.4" /><circle cx="50" cy="40" r="1" fill="#22D3EE" opacity="0.5" />
      <circle cx="340" cy="90" r="18" stroke="url(#p1g)" strokeWidth="0.6" /><circle cx="340" cy="90" r="28" stroke="url(#p1g)" strokeWidth="0.4" />
    </svg>
  );
}

function Pattern2() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="p2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818CF8" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
      </defs>
      <circle cx="80" cy="60" r="35" stroke="url(#p2g)" strokeWidth="0.8" /><circle cx="100" cy="50" r="22" stroke="url(#p2g)" strokeWidth="0.6" /><circle cx="60" cy="80" r="15" stroke="url(#p2g)" strokeWidth="0.5" />
      <path d="M200 30 Q250 10 300 50 T400 30" stroke="url(#p2g)" strokeWidth="0.8" />
      <rect x="290" y="60" width="30" height="30" rx="4" stroke="url(#p2g)" strokeWidth="0.7" transform="rotate(45 305 75)" />
      <circle cx="180" cy="120" r="1.5" fill="#818CF8" opacity="0.5" /><circle cx="200" cy="110" r="1" fill="#3B82F6" opacity="0.4" /><circle cx="160" cy="130" r="2" fill="#818CF8" opacity="0.3" />
    </svg>
  );
}

function Pattern3() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="p3g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#34D399" /></linearGradient>
      </defs>
      {/* Dot grid */}
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 15 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={20 + c * 26} cy={15 + r * 18} r="0.8" fill="#22D3EE" opacity="0.35" />
        ))
      )}
      {/* Hexagons */}
      <polygon points="320,40 335,32 350,40 350,56 335,64 320,56" stroke="url(#p3g)" strokeWidth="0.7" />
      <polygon points="345,55 360,47 375,55 375,71 360,79 345,71" stroke="url(#p3g)" strokeWidth="0.5" />
      {/* Angular lines */}
      <path d="M40 130 L80 100 L130 120 L170 90" stroke="url(#p3g)" strokeWidth="0.8" />
      <rect x="60" y="30" width="16" height="16" rx="2" stroke="url(#p3g)" strokeWidth="0.6" transform="rotate(30 68 38)" />
    </svg>
  );
}

const patterns = [Pattern1, Pattern2, Pattern3];

/* ── Risk Config ── */

const riskLabel = (k: string, isAr: boolean) => {
  const map: Record<string, { ar: string; en: string }> = {
    A: { ar: 'A · منخفض جداً', en: 'A · Very Low' },
    B: { ar: 'B · منخفض', en: 'B · Low' },
    C: { ar: 'C · متوسط', en: 'C · Moderate' },
    D: { ar: 'D · مرتفع', en: 'D · High' },
    E: { ar: 'E · مرتفع جداً', en: 'E · Very High' },
  };
  return (map[k] || map.B)[isAr ? 'ar' : 'en'];
};

const riskConfigLight: Record<string, { color: string; bg: string; border: string }> = {
  A: { color: '#2BB673', bg: '#F0FDF4', border: '#BBF7D0' },
  B: { color: '#2BB673', bg: '#F0FDF4', border: '#BBF7D0' },
  C: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  D: { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
  E: { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
};

const riskConfigDark: Record<string, { color: string; bg: string; border: string }> = {
  A: { color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
  B: { color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
  C: { color: '#FBBF24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  D: { color: '#F87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
  E: { color: '#F87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
};

function buildCardTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      cardBg: colors.dark.card,
      cardBorder: `1px solid ${colors.dark.border}`,
      shadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
      shadowHover: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      pillBg: colors.dark.elevated,
      pillBorder: `1px solid ${colors.dark.border}`,
      pillColor: colors.textOnDark.secondary,
      innerCardBg: colors.dark.elevated,
      innerCardBorder: '1px solid rgba(255,255,255,0.06)',
      progressTrackBg: colors.dark.hover,
      progressGradient: 'linear-gradient(90deg, #60A5FA, #22D3EE)',
      ctaBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      fundedPctColor: '#34D399',
      notifyBorder: '1px solid rgba(165,180,252,0.3)',
      notifyColor: '#A5B4FC',
      notifiedBorder: '1px solid rgba(52,211,153,0.3)',
      notifiedBg: 'rgba(52,211,153,0.12)',
      notifiedColor: '#34D399',
      completedColor: '#34D399',
      completedGradient: 'linear-gradient(90deg, #34D399, #10B981)',
      completedSoftBg: 'rgba(52,211,153,0.10)',
      completedBorder: '1px solid rgba(52,211,153,0.28)',
      riskConfig: riskConfigDark,
    };
  }
  return {
    isVIP: false,
    cardBg: '#FFFFFF',
    cardBorder: '1px solid #E8ECF2',
    shadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
    shadowHover: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    pillBg: '#F8FAFC',
    pillBorder: '1px solid #E8ECF2',
    pillColor: '#64748B',
    innerCardBg: '#F8FAFC',
    innerCardBorder: '1px solid #F1F5F9',
    progressTrackBg: '#F1F5F9',
    progressGradient: 'linear-gradient(90deg, #1A3F73, #0891b2)',
    ctaBg: 'linear-gradient(135deg, #0B1F3A 0%, #1A3F73 100%)',
    fundedPctColor: '#14B8A6',
    notifyBorder: '1px solid #C7D2FE',
    notifyColor: '#6366F1',
    notifiedBorder: '1px solid #BBF7D0',
    notifiedBg: '#F0FDF4',
    notifiedColor: '#2BB673',
    completedColor: '#059669',
    completedGradient: 'linear-gradient(90deg, #10B981, #059669)',
    completedSoftBg: '#ECFDF5',
    completedBorder: '1px solid #BBF7D0',
    riskConfig: riskConfigLight,
  };
}

/* ── Card Component ── */

export function OpportunityCardCompact({
  borrowerName,
  opportunityId,
  financingType,
  risk,
  netReturn,
  roi,
  tenor,
  fundingProgress,
  totalAmount,
  fundedAmount,
  comingSoon = false,
  launchAt,
  patternIndex,
  completed = false,
  completedAt,
  investorCount,
  onClick,
}: OpportunityCardCompactProps) {
  const returnValue = netReturn || roi || 0;
  const [notified, setNotified] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const { persona, personaId } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const tk = buildCardTokens(personaId === 'vip');
  const rk = tk.riskConfig[risk] || tk.riskConfig.B;
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Pick pattern by index or hash from ID
  const pIdx = patternIndex ?? (opportunityId.charCodeAt(opportunityId.length - 1) % 3);
  const PatternSVG = patterns[pIdx];

  // Animate progress bar on mount
  useEffect(() => {
    if (!comingSoon) {
      const timer = setTimeout(() => setAnimatedProgress(fundingProgress), 100);
      return () => clearTimeout(timer);
    }
  }, [fundingProgress, comingSoon]);

  return (
    <div
      onClick={onClick}
      className="group rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
      style={{
        background: tk.cardBg,
        boxShadow: tk.shadow,
        border: tk.cardBorder,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = tk.shadowHover; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = tk.shadow; }}
    >
      {/* ── Cover Area (160px) ── */}
      <div className="relative h-[160px] overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3F73 50%, #2563EB 100%)' }}>
        <PatternSVG />

        <div className="relative z-10 flex flex-col justify-between h-full p-4">
          {/* Top: Return + Badge */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[32px] text-white leading-none" style={{ fontWeight: 700 }}>
                {formatPercentage(returnValue)}
              </div>
              <div className="text-[10px] text-white/50 mt-1" style={{ fontWeight: 500 }}>{isAr ? 'صافي العائد' : 'Net Return'}</div>
            </div>
            {comingSoon ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 600, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                {isAr ? 'قريباً' : 'Soon'}
              </div>
            ) : completed ? (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px]"
                style={{
                  background: 'rgba(34,197,94,0.18)',
                  color: '#A7F3D0',
                  fontWeight: 700,
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(167,243,208,0.35)',
                  letterSpacing: '0.04em',
                }}
              >
                <CheckCircle className="w-3 h-3" strokeWidth={2.5} />
                {isAr ? 'تم التمويل' : 'Fully Funded'}
              </div>
            ) : (
              <span className="text-[10px] text-white/30 font-mono" style={{ fontWeight: 500 }}>{opportunityId}</span>
            )}
          </div>

          {/* Bottom: Company name + ID */}
          <div>
            <div className="text-[15px] text-white leading-snug" style={{ fontWeight: 700 }}>{borrowerName}</div>
            <div className="text-[9px] text-white/30 mt-0.5 font-mono">{opportunityId}</div>
          </div>
        </div>
      </div>

      {/* ── White Body ── */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Pills row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]"
            style={{ background: rk.bg, color: rk.color, border: `1px solid ${rk.border}`, fontWeight: 600 }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: rk.color }} />
            {riskLabel(risk, isAr)}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px]" style={{ background: tk.pillBg, border: tk.pillBorder, color: tk.pillColor, fontWeight: 500 }}>
            {financingType}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px]" style={{ background: tk.pillBg, border: tk.pillBorder, color: tk.pillColor, fontWeight: 500 }}>
            {tenor}
          </span>
        </div>

        {/* Bottom section */}
        <div className="mt-auto">
          {comingSoon ? (
            /* ── Coming Soon ── */
            <>
              <div
                className="rounded-xl px-3 py-2.5 mb-3"
                style={{ background: tk.innerCardBg, border: tk.innerCardBorder }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: tk.notifyColor }}
                    />
                    <span
                      className="text-[10px] uppercase"
                      style={{ fontWeight: 600, color: tk.textMuted, letterSpacing: '0.08em' }}
                    >
                      {isAr ? 'يفتح خلال' : 'Opens in'}
                    </span>
                  </div>
                </div>
                <CountdownBlock
                  targetIso={launchAt}
                  isAr={isAr}
                  color={tk.textPrimary}
                  mutedColor={tk.textMuted}
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (notified) return;
                  setNotified(true);
                  const launchDateStr = launchAt
                    ? new Date(launchAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'short' })
                    : '';
                  toast.success(
                    isAr ? `سنخبرك عند إطلاق ${borrowerName}` : `We'll notify you when ${borrowerName} launches`,
                    {
                      description: isAr
                        ? `سيصلك تنبيه على ${persona.profile.email}${launchDateStr ? ` يوم ${launchDateStr}` : ''}`
                        : `You'll get an email at ${persona.profile.email}${launchDateStr ? ` on ${launchDateStr}` : ''}`,
                      icon: <Bell className="w-4 h-4" strokeWidth={2} />,
                      duration: 4000,
                    }
                  );
                }}
                className="w-full h-10 rounded-xl text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                style={{
                  fontWeight: 600,
                  ...(notified
                    ? { background: tk.notifiedBg, color: tk.notifiedColor, border: tk.notifiedBorder }
                    : { background: 'transparent', color: tk.notifyColor, border: tk.notifyBorder }),
                }}
              >
                {notified ? (
                  <><CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />{isAr ? 'تم تفعيل التنبيه' : 'Notification on'}</>
                ) : (
                  <><Bell className="w-3.5 h-3.5" strokeWidth={2} />{isAr ? 'أشعرني عند الإطلاق' : 'Notify me at launch'}</>
                )}
              </button>
            </>
          ) : completed ? (
            /* ── Completed / Fully Funded ── */
            <>
              {/* Total raised + 100% */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-[11px]" style={{ color: tk.textMuted }}>
                  <span className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(totalAmount, { decimals: 0 })}</span>
                  <span className="mx-1 opacity-60">·</span>
                  {isAr ? 'تم جمعه' : 'raised'}
                </div>
                <span
                  className="inline-flex items-center gap-1 text-[12px]"
                  style={{ fontWeight: 700, color: tk.completedColor }}
                >
                  <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                  100%
                </span>
              </div>

              {/* Filled progress bar in success color */}
              <div className="w-full h-[7px] rounded-full overflow-hidden mb-3" style={{ background: tk.progressTrackBg }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '100%',
                    background: tk.completedGradient,
                    transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>

              {/* Completion stats row */}
              <div
                className="rounded-lg px-3 py-2 mb-3 flex items-center justify-between gap-3"
                style={{ background: tk.innerCardBg, border: tk.innerCardBorder }}
              >
                {investorCount !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: tk.textMuted }} />
                    <span className="text-[11px]" style={{ color: tk.textSecondary }}>
                      <span style={{ fontWeight: 700, color: tk.textPrimary }}>{investorCount}</span>
                      <span className="mx-1">{isAr ? 'مستثمر' : investorCount === 1 ? 'investor' : 'investors'}</span>
                    </span>
                  </div>
                )}
                {completedAt && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: tk.textMuted }} />
                    <span className="text-[11px]" style={{ color: tk.textSecondary, fontWeight: 500 }}>
                      {new Date(completedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA — outline style, not primary */}
              <button
                className="w-full h-10 rounded-xl text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                style={{
                  fontWeight: 600,
                  color: tk.completedColor,
                  background: tk.completedSoftBg,
                  border: tk.completedBorder,
                }}
              >
                <Trophy className="w-3.5 h-3.5" strokeWidth={2} />
                {isAr ? 'عرض النتائج' : 'View Results'}
              </button>
            </>
          ) : (
            /* ── Active Funding ── */
            <>
              {/* Funded + percentage */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-[11px]" style={{ color: tk.textMuted }}>
                  <span className="text-[18px]" style={{ fontWeight: 700, color: tk.textPrimary }}>{formatSAR(fundedAmount, { decimals: 0 })}</span>
                  <span className="mx-1">/</span>
                  {formatSAR(totalAmount, { decimals: 0 })} {isAr ? 'ر.س' : 'SAR'}
                </div>
                <span className="text-[14px] font-mono" style={{ fontWeight: 600, color: tk.fundedPctColor }}>{fundingProgress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[7px] rounded-full overflow-hidden mb-3" style={{ background: tk.progressTrackBg }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${animatedProgress}%`,
                    background: tk.progressGradient,
                    transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>

              {/* CTA */}
              <button
                className="w-full h-10 rounded-xl text-[12px] text-white flex items-center justify-center gap-1.5 transition-all hover:shadow-lg"
                style={{
                  background: tk.ctaBg,
                  fontWeight: 600,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {isAr ? 'عرض التفاصيل' : 'View Details'}
                <Arrow className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
