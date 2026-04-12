import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Eye } from "lucide-react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router";

function SuccessIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[220px] mx-auto">
      {/* Background glow */}
      <defs>
        <linearGradient id="glow" x1="100" y1="0" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="180" height="140" rx="16" fill="url(#glow)" />

      {/* Chart bars */}
      {[
        { x: 35, h: 40 },
        { x: 60, h: 55 },
        { x: 85, h: 45 },
        { x: 110, h: 70 },
        { x: 135, h: 60 },
        { x: 160, h: 85 },
      ].map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x}
          y={130 - bar.h}
          width="14"
          height={bar.h}
          rx="4"
          fill="url(#barGrad)"
          opacity={0.15 + i * 0.12}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: `${bar.x + 7}px 130px` }}
        />
      ))}

      {/* Growth line */}
      <motion.path
        d="M35,110 Q60,95 85,100 T135,70 T170,45"
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
      />

      {/* End dot */}
      <motion.circle
        cx="170"
        cy="45"
        r="5"
        fill="#22C55E"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
      />
      <motion.circle
        cx="170"
        cy="45"
        r="10"
        fill="#22C55E"
        opacity={0.2}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ delay: 2.1, duration: 0.6 }}
      />

      {/* Checkmark circle */}
      <motion.circle
        cx="100"
        cy="50"
        r="20"
        fill="white"
        stroke="#22C55E"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
      />
      <motion.path
        d="M91,50 L97,56 L110,44"
        stroke="#22C55E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
      />
    </svg>
  );
}

function FloatingSparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute text-[#3B82F6]/30 text-lg pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], y: [0, -8, 0] }}
      transition={{ delay, duration: 3, repeat: Infinity, repeatDelay: 2 }}
    >
      ✦
    </motion.div>
  );
}

export function StepSuccess() {
  const navigate = useNavigate();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#3B82F6", "#22C55E", "#0F2A44", "#A7D98B"],
      gravity: 0.8,
    });
  }, []);

  return (
    <div className="text-center py-2 relative">
      {/* Floating sparkles */}
      <FloatingSparkle delay={1} x="10%" y="5%" />
      <FloatingSparkle delay={2} x="85%" y="15%" />
      <FloatingSparkle delay={1.5} x="75%" y="70%" />

      {/* Illustration */}
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
        <span className="inline-block text-xs font-medium text-[#22C55E] bg-[#22C55E]/8 px-3 py-1 rounded-md mb-3">
          تم التفعيل
        </span>
      </motion.div>

      {/* Title & description */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-bold text-[#0F2A44] mb-2">
          حسابك الاستثماري جاهز الآن
        </h2>
        <p className="text-sm text-gray-400 mb-2 leading-relaxed">
          بناءً على ملفك الاستثماري، ننصحك بفرص ذات مخاطر متوسطة
          <br />
          لتحقيق نمو متوازن لمحفظتك.
        </p>
      </motion.div>

      {/* Risk profile tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#315FDB] bg-[#315FDB]/8 px-3 py-1.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#315FDB]" />
          ملف مخاطر: متوسط
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
          onClick={() => navigate("/opportunities")}
          className="w-full h-12 rounded-lg font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_4px_16px_rgba(59,130,246,0.3)] cursor-pointer"
        >
          <span>ابدأ الاستثمار الآن</span>
          <ArrowLeft className="size-4" />
        </button>
        <button
          onClick={() => navigate("/portfolio")}
          className="w-full h-11 rounded-lg font-medium text-gray-500 bg-transparent hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Eye className="size-4" />
          <span>عرض محفظتي</span>
        </button>
      </motion.div>
    </div>
  );
}
