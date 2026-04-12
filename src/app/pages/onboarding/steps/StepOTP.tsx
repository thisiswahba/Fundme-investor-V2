import { useState, useRef, useEffect, useCallback } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function StepOTP() {
  const { data, updateData, next, back } = useOnboarding();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = useCallback(() => {
    setVerified(true);
    updateData({ otp: otp.join("") });
    setTimeout(() => next(), 1200);
  }, [otp, updateData, next]);

  useEffect(() => {
    const code = otp.join("");
    if (code.length === 4 && otp.every((d) => d !== "")) {
      handleVerify();
    }
  }, [otp, handleVerify]);

  function handleChange(index: number, value: string) {
    if (verified) return;
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setOtp(pasted.split(""));
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#0F2A44] mb-2">رمز التحقق</h2>
      <p className="text-sm text-gray-500 mb-1">أدخل الرمز المرسل إلى</p>
      <p className="text-sm font-bold text-[#0F2A44] mb-8" dir="ltr">+966 {data.phone}</p>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3 mb-6" dir="ltr">
        {otp.map((digit, i) => (
          <motion.div
            key={i}
            animate={verified ? { scale: [1, 1.1, 1], borderColor: "#7BFF00" } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={verified}
              className={`w-14 h-14 rounded-lg border-2 text-center text-xl font-bold outline-none transition-all duration-200 ${
                verified
                  ? "border-[#7BFF00] bg-[#7BFF00]/5 text-[#0F2A44]"
                  : digit
                    ? "border-[#0F2A44] bg-white text-[#0F2A44]"
                    : "border-gray-200 bg-[#F9FAFB] text-[#0F2A44]"
              } focus:border-[#315FDB] focus:shadow-[0_0_0_3px_rgba(49,95,219,0.12)]`}
            />
          </motion.div>
        ))}
      </div>

      {/* Success feedback */}
      {verified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 text-green-600 mb-6"
        >
          <CheckCircle2 className="size-5" />
          <span className="text-sm font-medium">تم التحقق بنجاح</span>
        </motion.div>
      )}

      {/* Resend */}
      {!verified && (
        <div className="text-center mb-8">
          {countdown > 0 ? (
            <p className="text-sm text-gray-400">
              إعادة الإرسال بعد <span className="font-bold text-[#0F2A44]">{countdown}</span> ثانية
            </p>
          ) : (
            <button
              onClick={() => setCountdown(60)}
              className="text-sm font-medium text-[#0F2A44] hover:text-[#7BFF00] transition-colors cursor-pointer"
            >
              إعادة إرسال الرمز
            </button>
          )}
        </div>
      )}

      {!verified && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={back}
            className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
          >
            <ArrowRight className="size-4" />
          </button>
          <button
            disabled
            className="flex-1 h-12 rounded-lg font-bold text-[#0F2A44] bg-[#7BFF00] opacity-40 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>تحقق</span>
            <ArrowLeft className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
