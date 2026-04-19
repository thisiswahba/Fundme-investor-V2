import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router";
import { useI18n } from "../../../i18n";

function SuccessIllustration() {
  return (
    <div className="relative w-[260px] h-[200px] mx-auto">
      {/* Ambient glow behind */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <svg viewBox="0 0 260 200" fill="none" className="relative w-full h-full">
        <defs>
          {/* Gradients */}
          <linearGradient id="heroGrad" x1="130" y1="30" x2="130" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F2A44" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          <linearGradient id="glowLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F2A44" floodOpacity="0.2" />
          </filter>
          <clipPath id="cardClip">
            <rect x="50" y="35" width="160" height="120" rx="16" />
          </clipPath>
        </defs>

        {/* ── Main card ── */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <rect x="50" y="35" width="160" height="120" rx="16" fill="url(#heroGrad)" filter="url(#cardShadow)" />

          {/* Dot pattern overlay */}
          <g clipPath="url(#cardClip)" opacity="0.06">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 10 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={58 + col * 16} cy={43 + row * 16} r="1" fill="white" />
              ))
            )}
          </g>

          {/* Decorative circles inside card */}
          <circle cx="190" cy="45" r="30" fill="white" opacity="0.03" />
          <circle cx="60" cy="140" r="25" fill="white" opacity="0.02" />

          {/* Mini chart bars */}
          {[
            { x: 70, h: 20 },
            { x: 86, h: 32 },
            { x: 102, h: 26 },
            { x: 118, h: 42 },
            { x: 134, h: 36 },
            { x: 150, h: 50 },
            { x: 166, h: 44 },
            { x: 182, h: 56 },
          ].map((bar, i) => (
            <motion.rect
              key={i}
              x={bar.x}
              y={135 - bar.h}
              width="10"
              height={bar.h}
              rx="3"
              fill="url(#barFill)"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: `${bar.x + 5}px 135px` }}
            />
          ))}

          {/* Growth line */}
          <motion.path
            d="M70,125 Q90,118 110,120 T150,100 T192,75"
            stroke="url(#glowLine)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
          />

          {/* Glowing end dot */}
          <motion.circle
            cx="192" cy="75" r="3" fill="white"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 300 }}
          />
          <motion.circle
            cx="192" cy="75" r="7" fill="white" opacity={0.15}
            initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 2.3, duration: 0.6 }}
          />

          {/* Card header line */}
          <rect x="68" y="50" width="40" height="4" rx="2" fill="white" opacity="0.2" />
          <rect x="68" y="60" width="60" height="3" rx="1.5" fill="white" opacity="0.1" />
        </motion.g>

        {/* ── Shield checkmark badge ── */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
          style={{ transformOrigin: '130px 155px' }}
        >
          {/* White circle bg */}
          <circle cx="130" cy="155" r="26" fill="white" filter="url(#cardShadow)" />
          {/* Green circle */}
          <circle cx="130" cy="155" r="21" fill="url(#shieldGrad)" />
          {/* Checkmark */}
          <motion.path
            d="M120,155 L127,162 L141,148"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
          />
        </motion.g>

        {/* ── Floating accent elements ── */}
        {/* Blue diamond */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
          transition={{ delay: 2, duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <rect x="32" y="55" width="8" height="8" rx="2" fill="#1D4ED8" opacity="0.15" transform="rotate(45 36 59)" />
        </motion.g>

        {/* Green circle */}
        <motion.circle
          cx="225" cy="70" r="4" fill="#16A34A" opacity={0.12}
          initial={{ scale: 0 }} animate={{ scale: [0, 1, 0.8, 1] }}
          transition={{ delay: 2.2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Small dots */}
        <motion.circle
          cx="40" cy="120" r="2" fill="#1D4ED8" opacity={0.1}
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.15, 0] }}
          transition={{ delay: 1.5, duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="220" cy="140" r="2.5" fill="#16A34A" opacity={0.1}
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.12, 0] }}
          transition={{ delay: 2, duration: 3, repeat: Infinity }}
        />

        {/* Abstract arc */}
        <motion.path
          d="M 35 95 A 20 20 0 0 1 55 85"
          stroke="#1D4ED8" strokeWidth="1" strokeLinecap="round" fill="none" opacity={0.1}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        />
      </svg>
    </div>
  );
}

function FloatingSparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute text-[#1D4ED8]/20 text-sm pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], y: [0, -6, 0] }}
      transition={{ delay, duration: 3, repeat: Infinity, repeatDelay: 2 }}
    >
      ✦
    </motion.div>
  );
}

export function StepSuccess() {
  const navigate = useNavigate();
  const fired = useRef(false);
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const NextArrow = isAr ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // Multi-burst confetti
    const colors = ["#1D4ED8", "#16A34A", "#0F2A44", "#93C5FD"];
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 }, colors, gravity: 0.8 });
    setTimeout(() => {
      confetti({ particleCount: 30, spread: 40, origin: { x: 0.25, y: 0.6 }, colors, gravity: 0.9 });
      confetti({ particleCount: 30, spread: 40, origin: { x: 0.75, y: 0.6 }, colors, gravity: 0.9 });
    }, 300);
  }, []);

  return (
    <div className="text-center py-2 relative">
      {/* Floating sparkles */}
      <FloatingSparkle delay={1} x="8%" y="8%" />
      <FloatingSparkle delay={2.2} x="88%" y="12%" />
      <FloatingSparkle delay={1.6} x="80%" y="65%" />
      <FloatingSparkle delay={2.8} x="15%" y="55%" />

      {/* Premium illustration */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SuccessIllustration />
      </motion.div>

      {/* Status label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="inline-block text-xs font-semibold text-[#16A34A] bg-[#F0FDF4] px-3.5 py-1.5 rounded-full mb-3" style={{ border: '1px solid #DCFCE7' }}>
          {isAr ? 'تم التفعيل ✓' : 'Activated ✓'}
        </span>
      </motion.div>

      {/* Title & description */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-[22px] font-bold text-[#0F2A44] mb-2">
          {isAr ? 'حسابك الاستثماري جاهز الآن' : 'Your investment account is ready'}
        </h2>
        <p className="text-[13px] text-[#94A3B8] mb-2 leading-relaxed">
          {isAr ? (
            <>
              بناءً على ملفك الاستثماري، ننصحك بفرص ذات مخاطر متوسطة
              <br />
              لتحقيق نمو متوازن لمحفظتك.
            </>
          ) : (
            <>
              Based on your investor profile, we recommend medium-risk opportunities
              <br />
              for balanced portfolio growth.
            </>
          )}
        </p>
      </motion.div>

      {/* Risk profile tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full" style={{ border: '1px solid #DBEAFE' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
          {isAr ? 'ملف مخاطر: متوسط' : 'Risk profile: Medium'}
        </span>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="space-y-2.5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => navigate("/app/opportunities")}
          className="w-full h-[52px] rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #1D4ED8, #1E40AF)', boxShadow: '0 6px 20px rgba(29,78,216,0.25)' }}
        >
          <span>{isAr ? 'ابدأ الاستثمار الآن' : 'Start investing now'}</span>
          <NextArrow className="size-4" />
        </button>
        <button
          onClick={() => navigate("/app/portfolio")}
          className="w-full h-11 rounded-xl font-medium text-[#64748B] bg-transparent hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          style={{ border: '1px solid #E5E7EB' }}
        >
          <Eye className="size-4" />
          <span>{isAr ? 'عرض محفظتي' : 'View my portfolio'}</span>
        </button>
      </motion.div>
    </div>
  );
}
