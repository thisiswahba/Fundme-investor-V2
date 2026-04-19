import { useOnboarding } from "./OnboardingContext";
import { AnimatePresence, motion } from "motion/react";
import { StepInvestorType } from "./steps/StepInvestorType";
import { StepPhone } from "./steps/StepPhone";
import { StepOTP } from "./steps/StepOTP";
import { StepAccountSetup } from "./steps/StepAccountSetup";
import { StepNafath } from "./steps/StepNafath";
import { StepRiskProfile } from "./steps/StepRiskProfile";
import { StepSuccess } from "./steps/StepSuccess";
import { Shield, CheckCircle } from "lucide-react";
import logoLight from "../../../assets/logo-light.png";
import logoDark from "../../../assets/logo-dark.png";
import { useI18n } from "../../i18n";

const LEFT_CONTENT: Record<number, { titleAr: string; descAr: string; titleEn: string; descEn: string }> = {
  1: {
    titleAr: "ابدأ رحلتك الاستثمارية",
    descAr: "اختر نوع حسابك وابدأ في بناء محفظتك الاستثمارية مع فرص متوافقة مع الشريعة",
    titleEn: "Start your investment journey",
    descEn: "Choose your account type and start building your portfolio with Sharia-compliant opportunities",
  },
  2: {
    titleAr: "تأمين حسابك",
    descAr: "نحتاج رقم جوالك للتحقق من هويتك وحماية حسابك",
    titleEn: "Secure your account",
    descEn: "We need your mobile number to verify your identity and protect your account",
  },
  3: {
    titleAr: "تحقق من رقمك",
    descAr: "أدخل رمز التحقق المرسل إلى جوالك",
    titleEn: "Verify your number",
    descEn: "Enter the verification code sent to your phone",
  },
  4: {
    titleAr: "إعداد الحساب",
    descAr: "أكمل بياناتك الأساسية لفتح حسابك الاستثماري",
    titleEn: "Set up your account",
    descEn: "Complete your basic details to open your investment account",
  },
  5: {
    titleAr: "التحقق عبر نفاذ",
    descAr: "نتحقق من هويتك الوطنية عبر منصة نفاذ الموحدة",
    titleEn: "Verify with Nafath",
    descEn: "We verify your national identity through the unified Nafath platform",
  },
  6: {
    titleAr: "تحديد ملف المخاطر",
    descAr: "نساعدك في تحديد الفرص الأنسب لأهدافك الاستثمارية",
    titleEn: "Build your risk profile",
    descEn: "We help you find the opportunities best suited to your investment goals",
  },
  7: {
    titleAr: "مبروك!",
    descAr: "حسابك جاهز للاستثمار",
    titleEn: "Congratulations!",
    descEn: "Your account is ready to invest",
  },
};

const STEPS: Record<number, React.FC> = {
  1: StepInvestorType,
  2: StepPhone,
  3: StepOTP,
  4: StepAccountSetup,
  5: StepNafath,
  6: StepRiskProfile,
  7: StepSuccess,
};

function AnimatedGraphLine() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute bottom-20 left-0 right-0 w-full opacity-20"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,180 Q50,170 80,150 T160,120 T240,80 T320,60 T400,20"
        fill="none"
        stroke="#7BFF00"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      />
      <motion.path
        d="M0,190 Q60,180 100,160 T200,130 T280,90 T360,70 T400,40"
        fill="none"
        stroke="#7BFF00"
        strokeWidth="1"
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      />
    </svg>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: React.FC<{ className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white/90">
      <Icon className="size-4 text-[#7BFF00]" />
      <span>{text}</span>
    </div>
  );
}

function StepIndicator() {
  const { step, totalSteps } = useOnboarding();
  if (step === 7) return null;

  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps - 1 }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`h-1.5 rounded-sm transition-all duration-500 ${
              i + 1 === step
                ? "w-8 bg-[#315FDB]"
                : i + 1 < step
                  ? "w-2 bg-[#A7D98B]"
                  : "w-2 bg-[#E3E8F1]"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      className="absolute top-4 right-4 z-20 flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
      style={{ fontWeight: 500, border: '1px solid #E5E7EB', color: '#64748B' }}
    >
      {lang === 'ar' ? 'EN' : 'ع'}
    </button>
  );
}

export function OnboardingLayout() {
  const { step } = useOnboarding();
  const { lang, dir } = useI18n();
  const isAr = lang === 'ar';
  const content = LEFT_CONTENT[step];
  const StepComponent = STEPS[step];

  return (
    <div dir={dir} className={`flex min-h-screen relative ${isAr ? 'font-[IBM_Plex_Sans_Arabic]' : ''}`}>
      <LangToggle />
      {/* LEFT SIDE - Gradient background */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(160deg, #0F2A44 0%, #1a4a6e 50%, #0F2A44 100%)" }}
      >
        {/* Logo */}
        <div className="relative z-10">
          <img src={logoLight} alt="FundMe" className="h-14 w-auto" />
        </div>

        {/* Dynamic content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {isAr ? content.titleAr : content.titleEn}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-md">
                {isAr ? content.descAr : content.descEn}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust indicators */}
        <div className="relative z-10 flex flex-wrap gap-3">
          <TrustBadge icon={Shield} text={isAr ? "مرخص من ساما" : "SAMA Licensed"} />
          <TrustBadge icon={CheckCircle} text={isAr ? "متوافق مع الشريعة" : "Sharia Compliant"} />
          <TrustBadge icon={Shield} text={isAr ? "حماية عالية" : "Bank-Grade Security"} />
        </div>

        {/* Animated graph */}
        <AnimatedGraphLine />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#7BFF00]/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        </div>
      </div>

      {/* RIGHT SIDE - Form card */}
      <div className="flex-1 flex items-center justify-center bg-[#F7F9FC] p-6 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <img src={logoDark} alt="FundMe" className="h-12 w-auto" />
          </div>

          <StepIndicator />

          {/* Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
