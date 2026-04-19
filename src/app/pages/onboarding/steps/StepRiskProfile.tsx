import { useState, useMemo } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, GraduationCap, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useI18n } from "../../../i18n";

interface Question {
  id: string;
  section: number;
  questionAr: string;
  questionEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  options: { ar: string; en: string }[];
  conditional?: { questionId: string; answerIndex: number };
}

const SECTIONS = [
  { titleAr: "الملف الاستثماري", titleEn: "Investor Profile", icon: GraduationCap },
  { titleAr: "نبذة عنك", titleEn: "About You", icon: ShieldCheck },
];

const QUESTIONS: Question[] = [
  // Section 1 — Investor Profile
  {
    id: "education",
    section: 0,
    questionAr: "ما هو أعلى مستوى تعليمي حصلت عليه؟",
    questionEn: "What is the highest level of education you've completed?",
    options: [
      { ar: "ثانوي أو أقل", en: "High school or less" },
      { ar: "دبلوم", en: "Diploma" },
      { ar: "بكالوريوس", en: "Bachelor's degree" },
      { ar: "دراسات عليا", en: "Postgraduate" },
    ],
  },
  {
    id: "employment",
    section: 0,
    questionAr: "ما هي حالتك الوظيفية الحالية؟",
    questionEn: "What is your current employment status?",
    options: [
      { ar: "موظف", en: "Employed" },
      { ar: "صاحب عمل", en: "Business owner" },
      { ar: "متقاعد", en: "Retired" },
      { ar: "غير موظف", en: "Unemployed" },
    ],
  },
  {
    id: "has_experience",
    section: 0,
    questionAr: "هل لديك خبرة أو معرفة في قطاع الاستثمار أو التمويل؟",
    questionEn: "Do you have experience or knowledge in investing or finance?",
    options: [
      { ar: "نعم", en: "Yes" },
      { ar: "لا", en: "No" },
    ],
  },
  {
    id: "annual_income",
    section: 0,
    questionAr: "ما هو دخلك السنوي التقريبي (بالريال السعودي)؟",
    questionEn: "What is your approximate annual income (in SAR)?",
    options: [
      { ar: "أقل من 200,000 ريال", en: "Less than 200,000 SAR" },
      { ar: "من 200,000 إلى 500,000 ريال", en: "200,000 to 500,000 SAR" },
      { ar: "من 500,000 إلى 1,000,000 ريال", en: "500,000 to 1,000,000 SAR" },
      { ar: "أكثر من 1,000,000 ريال", en: "More than 1,000,000 SAR" },
    ],
  },
  {
    id: "net_worth",
    section: 0,
    questionAr: "ما هو صافي ثروتك التقريبي (بالريال السعودي)؟",
    questionEn: "What is your approximate net worth (in SAR)?",
    options: [
      { ar: "أقل من 1,000,000 ريال", en: "Less than 1,000,000 SAR" },
      { ar: "من 1,000,000 إلى 3,000,000 ريال", en: "1,000,000 to 3,000,000 SAR" },
      { ar: "من 3,000,000 إلى 5,000,000 ريال", en: "3,000,000 to 5,000,000 SAR" },
      { ar: "أكثر من 5,000,000 ريال", en: "More than 5,000,000 SAR" },
    ],
  },
  {
    id: "income_source",
    section: 0,
    questionAr: "ما هو مصدر دخلك الرئيسي؟",
    questionEn: "What is your main source of income?",
    options: [
      { ar: "راتب", en: "Salary" },
      { ar: "دخل من أعمال تجارية", en: "Business income" },
      { ar: "عوائد استثمارية", en: "Investment returns" },
      { ar: "مصادر أخرى", en: "Other sources" },
    ],
  },
  // Section 2 — About You
  {
    id: "senior_position",
    section: 1,
    questionAr: "هل تم تعيينك في أي منصب قيادي أو رفيع المستوى داخل أو خارج المملكة العربية السعودية؟",
    questionEn: "Have you held any senior or high-level government position in or outside Saudi Arabia?",
    subtitleAr: "(مثل: وزير، سفير، عضو مجلس الشورى، أو منصب حكومي/تنفيذي رفيع)",
    subtitleEn: "(e.g. minister, ambassador, Shura Council member, or senior government/executive role)",
    options: [
      { ar: "نعم", en: "Yes" },
      { ar: "لا", en: "No" },
    ],
  },
  {
    id: "international_org",
    section: 1,
    questionAr: "هل تشغل حالياً منصباً إدارياً رفيعاً في أي منظمة دولية؟",
    questionEn: "Do you currently hold a senior administrative role in any international organization?",
    subtitleAr: "(مثل: الأمم المتحدة، البنك الدولي، صندوق النقد الدولي، أو منظمات مماثلة)",
    subtitleEn: "(e.g. UN, World Bank, IMF, or similar organizations)",
    options: [
      { ar: "نعم", en: "Yes" },
      { ar: "لا", en: "No" },
    ],
  },
  {
    id: "family_relation",
    section: 1,
    questionAr: "هل تربطك صلة قرابة أو علاقة زوجية (حتى الدرجة الثانية) بشخص يشغل منصباً حكومياً أو دولياً رفيع المستوى داخل أو خارج المملكة العربية السعودية؟",
    questionEn: "Are you related (up to second degree) or married to anyone holding a senior government or international role in or outside Saudi Arabia?",
    subtitleAr: "(مثل: والد، زوج، طفل، شقيق، أو قريب وثيق في منصب قيادي أو رفيع المستوى)",
    subtitleEn: "(e.g. parent, spouse, child, sibling, or close relative in a senior leadership role)",
    options: [
      { ar: "نعم", en: "Yes" },
      { ar: "لا", en: "No" },
    ],
  },
];

export function StepRiskProfile() {
  const { updateData, next, back, data } = useOnboarding();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(
    () => {
      const map: Record<string, number> = {};
      data.riskAnswers.forEach((a) => {
        const q = QUESTIONS[a.question];
        if (q) map[q.id] = a.answer;
      });
      return map;
    },
  );
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const NextArrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  // Filter out conditional questions whose condition isn't met
  const visibleQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (!q.conditional) return true;
      return answers[q.conditional.questionId] === q.conditional.answerIndex;
    });
  }, [answers]);

  const safeIndex = Math.min(currentQ, visibleQuestions.length - 1);
  const question = visibleQuestions[safeIndex];
  const selectedAnswer = answers[question.id] ?? -1;
  const isLast = safeIndex === visibleQuestions.length - 1;
  const currentSection = question.section;
  const SectionIcon = SECTIONS[currentSection].icon;

  function selectAnswer(optionIndex: number) {
    setAnswers({ ...answers, [question.id]: optionIndex });
  }

  function handleNext() {
    if (isLast) {
      updateData({
        riskAnswers: visibleQuestions.map((q, i) => ({
          question: i,
          answer: answers[q.id] ?? 0,
        })),
      });
      next();
    } else {
      setCurrentQ(safeIndex + 1);
    }
  }

  function handleBack() {
    if (safeIndex === 0) {
      back();
    } else {
      setCurrentQ(safeIndex - 1);
    }
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#F1F4F9] flex items-center justify-center">
          <SectionIcon className="size-4 text-[#315FDB]" />
        </div>
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
            {isAr ? SECTIONS[currentSection].titleAr : SECTIONS[currentSection].titleEn}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-300">
              {isAr ? `${safeIndex + 1} من ${visibleQuestions.length}` : `${safeIndex + 1} of ${visibleQuestions.length}`}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-base font-bold text-[#0F2A44] mb-1">{isAr ? question.questionAr : question.questionEn}</h3>
          {(isAr ? question.subtitleAr : question.subtitleEn) && (
            <p className="text-xs text-gray-400 mb-4">{isAr ? question.subtitleAr : question.subtitleEn}</p>
          )}
          {!(isAr ? question.subtitleAr : question.subtitleEn) && <div className="mb-4" />}

          <div className="space-y-2 mb-6">
            {question.options.map((option, i) => {
              const selected = selectedAnswer === i;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAnswer(i)}
                  className={`w-full text-start p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    selected
                      ? "border-[#315FDB] bg-[#315FDB]/5"
                      : "border-[#E3E8F1] bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                        selected ? "border-[#315FDB]" : "border-gray-300"
                      }`}
                    >
                      {selected && <div className="w-2 h-2 rounded-full bg-[#315FDB]" />}
                    </div>
                    <span className={`text-sm ${selected ? "text-[#0F2A44] font-medium" : "text-gray-600"}`}>
                      {isAr ? option.ar : option.en}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
        >
          <BackArrow className="size-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={selectedAnswer === -1}
          className="flex-1 h-12 rounded-lg font-bold text-[#0F2A44] bg-[#7BFF00] hover:bg-[#6de600] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(123,255,0,0.3)] cursor-pointer"
        >
          <span>{isLast ? (isAr ? 'إنهاء' : 'Finish') : (isAr ? 'التالي' : 'Next')}</span>
          <NextArrow className="size-4" />
        </button>
      </div>
    </div>
  );
}
