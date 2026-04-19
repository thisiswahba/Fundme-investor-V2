import { useState, useEffect } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, Fingerprint } from "lucide-react";
import { motion } from "motion/react";
import { useI18n } from "../../../i18n";

type NafathStatus = "waiting" | "verifying" | "success";

export function StepNafath() {
  const { next, back } = useOnboarding();
  const [status, setStatus] = useState<NafathStatus>("waiting");
  const [countdown, setCountdown] = useState(120);
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  useEffect(() => {
    if (status !== "waiting" || countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [status, countdown]);

  // Simulate verification after 4 seconds
  useEffect(() => {
    if (status !== "waiting") return;
    const timer = setTimeout(() => {
      setStatus("verifying");
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => next(), 1500);
      }, 2000);
    }, 4000);
    return () => clearTimeout(timer);
  }, [status, next]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-[#0F2A44] mb-2">{isAr ? 'التحقق عبر نفاذ' : 'Verify with Nafath'}</h2>
      <p className="text-sm text-gray-500 mb-8">{isAr ? 'يرجى فتح تطبيق نفاذ والموافقة على الطلب' : 'Please open the Nafath app and approve the request'}</p>

      {/* Nafath icon with animation */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Pulse rings */}
          {status === "waiting" && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#0F2A44]/20"
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#0F2A44]/10"
                animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
            </>
          )}

          {/* Spinning ring for verifying */}
          {status === "verifying" && (
            <motion.div
              className="absolute inset-[-8px] rounded-full border-3 border-transparent border-t-[#7BFF00]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Success ring */}
          {status === "success" && (
            <motion.div
              className="absolute inset-[-8px] rounded-full border-3 border-[#7BFF00]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
          )}

          <motion.div
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-500 ${
              status === "success"
                ? "bg-[#7BFF00]/10"
                : status === "verifying"
                  ? "bg-[#0F2A44]/5"
                  : "bg-[#F1F4F9]"
            }`}
            animate={status === "waiting" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Fingerprint
              className={`size-10 transition-colors duration-500 ${
                status === "success"
                  ? "text-[#7BFF00]"
                  : "text-[#0F2A44]"
              }`}
            />
          </motion.div>
        </div>
      </div>

      {/* Status text */}
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {status === "waiting" && (
          <>
            <p className="text-base font-bold text-[#0F2A44] mb-2">
              {isAr ? 'افتح تطبيق نفاذ وقم بالموافقة' : 'Open the Nafath app and approve'}
            </p>
            <p className="text-sm text-gray-400 mb-1">{isAr ? 'في انتظار التحقق...' : 'Waiting for verification...'}</p>
            <p className="text-sm font-medium text-[#0F2A44]" dir="ltr">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </>
        )}
        {status === "verifying" && (
          <p className="text-base font-bold text-[#0F2A44]">{isAr ? 'جاري التحقق من الهوية...' : 'Verifying your identity...'}</p>
        )}
        {status === "success" && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <p className="text-base font-bold text-green-600">{isAr ? 'تم التحقق بنجاح!' : 'Verified successfully!'}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Back button (only when waiting) */}
      {status === "waiting" && (
        <div className="mt-8">
          <button
            type="button"
            onClick={back}
            className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer mx-auto"
          >
            <BackArrow className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
