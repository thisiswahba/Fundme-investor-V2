import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Lock,
  IdCard,
  ShieldCheck,
  Globe,
} from "lucide-react";
import logoDark from "../../assets/logo-dark.png";
import { useI18n } from "../i18n";

/* ──────────────────────────────────────────────
   Background
   ────────────────────────────────────────────── */

function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #F0F4FA 0%, #F7F9FC 35%, #FAFBFD 60%, #F3F6FB 100%)",
        }}
      />

      {/* Radial glow behind card area */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.04) 0%, rgba(59,130,246,0.015) 40%, transparent 70%)",
        }}
      />

      {/* Very faint secondary warmth */}
      <div
        className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.025) 0%, transparent 60%)",
        }}
      />

      {/* Subtle dot grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.3]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="login-dots"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.5" fill="#CBD5E1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#login-dots)" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Login Form
   ────────────────────────────────────────────── */

function LoginForm() {
  const navigate = useNavigate();
  const { t, dir } = useI18n();
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const idValid = /^\d{10}$/.test(nationalId);
  const canSubmit = idValid && password.length >= 6;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    navigate("/app");
  }

  const isRtl = dir === "rtl";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* National ID */}
      <div>
        <label className="block text-[13px] font-semibold text-[#1E293B] mb-2.5">
          {t("login.nationalId")}
        </label>
        <div className="relative" dir="ltr">
          <IdCard
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] pointer-events-none transition-colors duration-200"
            strokeWidth={1.6}
          />
          <input
            type="text"
            inputMode="numeric"
            value={nationalId}
            onChange={(e) =>
              setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder={t("login.nationalIdPlaceholder")}
            autoComplete="username"
            autoFocus
            className="w-full h-[52px] rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] pl-11 pr-4 text-[15px] font-medium text-[#0F172A] outline-none transition-all duration-200 placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div
          className="flex items-center justify-between mb-2.5"
          style={{ direction: dir }}
        >
          <label className="text-[13px] font-semibold text-[#1E293B]">
            {t("login.password")}
          </label>
          <button
            type="button"
            className="text-[12px] font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors cursor-pointer"
          >
            {t("login.forgot")}
          </button>
        </div>
        <div className="relative" dir="ltr">
          <Lock
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] pointer-events-none transition-colors duration-200"
            strokeWidth={1.6}
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("login.passwordPlaceholder")}
            autoComplete="current-password"
            className="w-full h-[52px] rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] pl-11 pr-12 text-[15px] font-medium text-[#0F172A] outline-none transition-all duration-200 placeholder:text-[#CBD5E1] focus:border-[#3B82F6] focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] transition-all duration-150 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.6} />
            ) : (
              <Eye className="w-[18px] h-[18px]" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={!canSubmit}
          className="group relative w-full h-[52px] rounded-[12px] font-bold text-[15px] text-white transition-all duration-300 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed overflow-hidden"
          style={{
            background: canSubmit
              ? "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)"
              : "#C1CCDB",
            boxShadow: canSubmit
              ? "0 1px 2px rgba(0,0,0,0.05), 0 4px 16px rgba(37,99,235,0.25)"
              : "none",
          }}
        >
          <span className="relative z-10">{t("login.submit")}</span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
            }}
          />
        </button>
      </div>

      {/* Security badge */}
      <div className={`flex items-center justify-center gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-[#A0AEC0]" strokeWidth={1.8} />
        <span className="text-[11.5px] text-[#A0AEC0] font-medium tracking-wide">
          {t("login.secure")}
        </span>
      </div>
    </form>
  );
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */

export function LoginPage() {
  const navigate = useNavigate();
  const { lang, setLang, t, dir } = useI18n();

  return (
    <div className="min-h-screen flex flex-col font-[IBM_Plex_Sans_Arabic]" dir={dir}>
      <BackgroundLayer />

      {/* Language toggle — top corner */}
      <div className="absolute top-5 right-5 z-10" style={dir === "rtl" ? { right: "auto", left: 20 } : {}}>
        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[12px] font-medium text-[#64748B] bg-white/70 backdrop-blur-sm hover:bg-white hover:text-[#334155] transition-all duration-200 cursor-pointer"
          style={{
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Globe className="w-3.5 h-3.5" strokeWidth={1.6} />
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:px-8">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-10"
        >
          <img src={logoDark} alt="FundMe" className="h-11 w-auto mb-3.5" />
          <span className="text-[11.5px] font-semibold text-[#94A3B8] tracking-[0.12em] uppercase">
            {t("login.portal")}
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[440px]"
        >
          <div
            className="rounded-[20px] p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.05)",
              border: "1px solid rgba(226,232,240,0.6)",
            }}
          >
            {/* Card header */}
            <div className="mb-8">
              <h1 className="text-[24px] font-bold text-[#0F172A] leading-snug mb-2">
                {t("login.title")}
              </h1>
              <p className="text-[14px] text-[#64748B] leading-relaxed">
                {t("login.subtitle")}
              </p>
            </div>

            <LoginForm />
          </div>
        </motion.div>

        {/* Register link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center text-[13.5px] text-[#64748B] mt-7"
        >
          {t("login.noAccount")}{" "}
          <button
            onClick={() => navigate("/")}
            className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
          >
            {t("login.createAccount")}
          </button>
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="px-6 pb-7 flex items-center justify-center gap-4 text-[11px] text-[#A0AEC0] font-medium"
      >
        <span className="hover:text-[#64748B] transition-colors cursor-pointer">
          {t("login.privacy")}
        </span>
        <span className="w-0.5 h-0.5 rounded-full bg-[#CBD5E1]" />
        <span className="hover:text-[#64748B] transition-colors cursor-pointer">
          {t("login.terms")}
        </span>
        <span className="w-0.5 h-0.5 rounded-full bg-[#CBD5E1]" />
        <span className="hover:text-[#64748B] transition-colors cursor-pointer">
          {t("login.support")}
        </span>
      </motion.div>
    </div>
  );
}
