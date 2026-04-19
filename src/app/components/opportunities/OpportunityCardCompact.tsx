import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatSAR, formatPercentage } from '../../utils/currency';
import { ArrowLeft, ArrowRight, Bell, CheckCircle, Mail, X, Sparkles } from 'lucide-react';
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

/* ── Animated digit cell ── */

function DigitCell({ value, label, color }: { value: number; label: string; color: string }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[38px] h-[42px] rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 -8px 12px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: -22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 22, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.6 }}
            className="absolute text-[20px] font-mono tabular-nums"
            style={{ fontWeight: 700, color, letterSpacing: '-0.02em' }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[8.5px] uppercase mt-1.5" style={{ fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </span>
    </div>
  );
}

function CountdownBlock({ targetIso, isAr, accent }: { targetIso?: string; isAr: boolean; accent: string }) {
  const { days, hours, minutes, seconds, done } = useCountdown(targetIso);
  const labels = isAr
    ? { d: 'يوم', h: 'ساعة', m: 'دقيقة', s: 'ثانية' }
    : { d: 'Days', h: 'Hrs', m: 'Min', s: 'Sec' };
  if (done) {
    return (
      <div className="text-center py-2 text-[14px]" style={{ fontWeight: 600, color: accent }}>
        {isAr ? 'تم الإطلاق' : 'Launched'}
      </div>
    );
  }
  return (
    <div className="flex items-start justify-between gap-1.5" dir="ltr">
      <DigitCell value={days} label={labels.d} color={accent} />
      <span className="text-[18px] mt-2.5 opacity-30" style={{ fontWeight: 700, color: accent }}>:</span>
      <DigitCell value={hours} label={labels.h} color={accent} />
      <span className="text-[18px] mt-2.5 opacity-30" style={{ fontWeight: 700, color: accent }}>:</span>
      <DigitCell value={minutes} label={labels.m} color={accent} />
      <span className="text-[18px] mt-2.5 opacity-30" style={{ fontWeight: 700, color: accent }}>:</span>
      <DigitCell value={seconds} label={labels.s} color={accent} />
    </div>
  );
}

/* ── Notify confirmation modal ── */

function NotifyConfirmModal({ open, onClose, borrowerName, launchAt, isAr }: {
  open: boolean;
  onClose: () => void;
  borrowerName: string;
  launchAt?: string;
  isAr: boolean;
}) {
  const { persona } = usePersona();
  if (!open) return null;

  const launchDateStr = launchAt
    ? new Date(launchAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative w-full max-w-[420px] bg-white rounded-[20px] overflow-hidden"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header with celebratory gradient */}
        <div
          className="relative px-6 pt-7 pb-6 text-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0B1F3A 0%, #1E3A8A 50%, #4338CA 100%)' }}
        >
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(165,180,252,0.35) 0%, transparent 70%)', filter: 'blur(10px)' }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="relative w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 100%)',
              boxShadow: '0 10px 30px rgba(129,140,248,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
          >
            <Bell className="w-7 h-7" strokeWidth={2} style={{ color: '#1E1B4B' }} />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4" strokeWidth={2.5} style={{ color: '#FCD34D' }} />
          </motion.div>
          <h3 className="text-[18px] text-white" style={{ fontWeight: 700 }}>
            {isAr ? 'تم تفعيل التنبيه!' : "You're subscribed!"}
          </h3>
          <p className="text-[12px] text-white/60 mt-1">
            {isAr ? 'سنخبرك فور إطلاق الفرصة' : "We'll notify you the moment it launches"}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3.5">
          {/* Opportunity name */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #EEF1F5' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#EEF2FF' }}>
              <Sparkles className="w-4 h-4" strokeWidth={2} style={{ color: '#6366F1' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase mb-0.5" style={{ fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em' }}>
                {isAr ? 'الفرصة' : 'Opportunity'}
              </div>
              <div className="text-[13px]" style={{ fontWeight: 600, color: '#0F172A' }}>{borrowerName}</div>
            </div>
          </div>

          {/* Launch date */}
          {launchDateStr && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #EEF1F5' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#FEF3C7' }}>
                <Bell className="w-4 h-4" strokeWidth={2} style={{ color: '#D97706' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase mb-0.5" style={{ fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em' }}>
                  {isAr ? 'يفتح في' : 'Launching on'}
                </div>
                <div className="text-[13px]" style={{ fontWeight: 600, color: '#0F172A' }}>{launchDateStr}</div>
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #EEF1F5' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#ECFDF5' }}>
              <Mail className="w-4 h-4" strokeWidth={2} style={{ color: '#059669' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase mb-0.5" style={{ fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em' }}>
                {isAr ? 'سنرسل التنبيه إلى' : 'Notification will reach'}
              </div>
              <div className="text-[13px] font-mono truncate" dir="ltr" style={{ fontWeight: 600, color: '#0F172A' }}>{persona.profile.email}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl text-[14px] text-white transition-all hover:scale-[1.02] mt-2 cursor-pointer"
            style={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
              boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
            }}
          >
            {isAr ? 'تم' : 'Got it'}
          </button>
        </div>
      </motion.div>
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
  launchLabel,
  patternIndex,
  onClick,
}: OpportunityCardCompactProps) {
  const returnValue = netReturn || roi || 0;
  const [notified, setNotified] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const { personaId } = usePersona();
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
                className="rounded-xl px-3.5 py-3 mb-3 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(140deg, #0B1220 0%, #1A1F3A 100%)',
                  border: '1px solid rgba(165,180,252,0.18)',
                }}
              >
                <div
                  className="absolute -top-12 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(165,180,252,0.18) 0%, transparent 70%)', filter: 'blur(8px)' }}
                />
                <div className="relative flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase" style={{ fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                    {isAr ? 'يفتح خلال' : 'Launches in'}
                  </span>
                  <span className="flex items-center gap-1 text-[9px]" style={{ color: '#A5B4FC', fontWeight: 600 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A5B4FC] animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="relative">
                  <CountdownBlock targetIso={launchAt} isAr={isAr} accent="#A5B4FC" />
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setNotified(true); setConfirmOpen(true); }}
                className="w-full h-10 rounded-xl text-[12px] flex items-center justify-center gap-1.5 transition-all"
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
              <NotifyConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                borrowerName={borrowerName}
                launchAt={launchAt}
                isAr={isAr}
              />
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
