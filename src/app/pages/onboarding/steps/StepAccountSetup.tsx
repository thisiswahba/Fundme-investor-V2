import { useState } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check, X } from "lucide-react";
import { useI18n } from "../../../i18n";

const PASSWORD_RULES: { test: (p: string) => boolean; ar: string; en: string }[] = [
  { test: (p: string) => p.length >= 8, ar: "8 أحرف على الأقل", en: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), ar: "حرف كبير واحد على الأقل", en: "At least one uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), ar: "حرف صغير واحد على الأقل", en: "At least one lowercase letter" },
  { test: (p: string) => /\d/.test(p), ar: "رقم واحد على الأقل", en: "At least one number" },
  { test: (p: string) => /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(p), ar: "رمز خاص واحد على الأقل", en: "At least one special character" },
];

export function StepAccountSetup() {
  const { updateData, next, back } = useOnboarding();
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const NextArrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const allRulesPass = PASSWORD_RULES.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const idValid = /^[12]\d{9}$/.test(nationalId);
  const canSubmit = idValid && allRulesPass && passwordsMatch;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    updateData({ nationalId, password });
    next();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-[#0F2A44] mb-2">{isAr ? 'إعداد الحساب' : 'Account Setup'}</h2>
      <p className="text-sm text-gray-500 mb-6">{isAr ? 'الخطوة الأخيرة قبل بدء الاستثمار' : 'The final step before you start investing'}</p>

      <div className="space-y-4 mb-6">
        {/* National ID */}
        <div>
          <label className="block text-sm font-medium text-[#0F2A44] mb-1.5">{isAr ? 'رقم الهوية الوطنية' : 'National ID'}</label>
          <input
            type="text"
            inputMode="numeric"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="1XXXXXXXXX"
            dir="ltr"
            className="w-full h-12 rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 text-base font-medium text-[#0F2A44] outline-none focus:border-[#315FDB] focus:shadow-[0_0_0_3px_rgba(49,95,219,0.12)] transition-all placeholder:text-gray-300"
          />
          {nationalId.length > 0 && !idValid && (
            <p className="text-xs text-red-500 mt-1">
              {isAr ? 'يجب أن يبدأ بـ 1 أو 2 ويتكون من 10 أرقام' : 'Must start with 1 or 2 and contain 10 digits'}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#0F2A44] mb-1.5">{isAr ? 'كلمة المرور' : 'Password'}</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isAr ? 'أدخل كلمة المرور' : 'Enter your password'}
              className={`w-full h-12 rounded-lg border border-gray-200 bg-[#F9FAFB] ${isAr ? 'pr-4 pl-12 text-right' : 'pl-4 pr-12 text-left'} text-base font-medium text-[#0F2A44] outline-none focus:border-[#315FDB] focus:shadow-[0_0_0_3px_rgba(49,95,219,0.12)] transition-all placeholder:text-gray-300`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer`}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* Password rules checklist */}
          {password.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {PASSWORD_RULES.map((rule) => {
                const passes = rule.test(password);
                const label = isAr ? rule.ar : rule.en;
                return (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    {passes ? (
                      <Check className="size-3.5 text-[#8FCF7A]" />
                    ) : (
                      <X className="size-3.5 text-gray-300" />
                    )}
                    <span className={passes ? "text-gray-600" : "text-gray-400"}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-[#0F2A44] mb-1.5">{isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={isAr ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
              className={`w-full h-12 rounded-lg border border-gray-200 bg-[#F9FAFB] ${isAr ? 'pr-4 pl-12 text-right' : 'pl-4 pr-12 text-left'} text-base font-medium text-[#0F2A44] outline-none focus:border-[#315FDB] focus:shadow-[0_0_0_3px_rgba(49,95,219,0.12)] transition-all placeholder:text-gray-300`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className={`absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer`}
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">
              {isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={back}
          className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
        >
          <BackArrow className="size-4" />
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex-1 h-12 rounded-lg font-bold text-[#0F2A44] bg-[#7BFF00] hover:bg-[#6de600] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(123,255,0,0.3)] cursor-pointer"
        >
          <span>{isAr ? 'متابعة' : 'Continue'}</span>
          <NextArrow className="size-4" />
        </button>
      </div>
    </form>
  );
}
