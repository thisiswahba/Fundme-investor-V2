import { useState } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useI18n } from "../../../i18n";

export function StepPhone() {
  const { data, updateData, next, back } = useOnboarding();
  const [phone, setPhone] = useState(data.phone);
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const NextArrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const isValid = /^5\d{8}$/.test(phone);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    updateData({ phone });
    next();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-[#0F2A44] mb-2">{isAr ? 'رقم الجوال' : 'Mobile Number'}</h2>
      <p className="text-sm text-gray-500 mb-6">{isAr ? 'أدخل رقم جوالك لإرسال رمز التحقق' : 'Enter your mobile number to receive a verification code'}</p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-[#0F2A44] mb-2">{isAr ? 'رقم الجوال' : 'Mobile Number'}</label>
        <div className="flex items-center gap-2" dir="ltr">
          {/* Country code */}
          <div className="h-12 px-4 rounded-lg border border-gray-200 bg-[#F9FAFB] flex items-center gap-2 shrink-0">
            <span className="text-lg">🇸🇦</span>
            <span className="text-sm font-medium text-[#0F2A44]">966+</span>
          </div>
          {/* Phone input */}
          <div className="relative flex-1">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
              placeholder="5XXXXXXXX"
              className="w-full h-12 rounded-lg border border-gray-200 bg-[#F9FAFB] pr-10 pl-4 text-base font-medium text-[#0F2A44] outline-none focus:border-[#315FDB] focus:shadow-[0_0_0_3px_rgba(49,95,219,0.12)] transition-all placeholder:text-gray-300"
              autoFocus
            />
          </div>
        </div>
        {phone.length > 0 && !isValid && (
          <p className="text-xs text-red-500 mt-2">
            {isAr ? 'يجب أن يبدأ الرقم بـ 5 ويتكون من 9 أرقام' : 'Number must start with 5 and contain 9 digits'}
          </p>
        )}
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
          disabled={!isValid}
          className="flex-1 h-12 rounded-lg font-bold text-[#0F2A44] bg-[#7BFF00] hover:bg-[#6de600] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(123,255,0,0.3)] cursor-pointer"
        >
          <span>{isAr ? 'إرسال رمز التحقق' : 'Send verification code'}</span>
          <NextArrow className="size-4" />
        </button>
      </div>
    </form>
  );
}
