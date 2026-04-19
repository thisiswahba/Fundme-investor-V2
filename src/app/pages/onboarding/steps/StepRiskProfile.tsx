import { useState, useMemo } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, GraduationCap, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Question {
  id: string;
  section: number;
  question: string;
  subtitle?: string;
  options: { label: string; icon?: string }[];
  conditional?: { questionId: string; answerIndex: number };
}

const SECTIONS = [
  { title: "الملف الاستثماري", icon: GraduationCap },
  { title: "نبذة عنك", icon: ShieldCheck },
];

const QUESTIONS: Question[] = [
  // Section 1 — Investor Profile
  {
    id: "education",
    section: 0,
    question: "ما هو أعلى مستوى تعليمي حصلت عليه؟",
    options: [
      { label: "ثانوي أو أقل" },
      { label: "دبلوم" },
      { label: "بكالوريوس" },
      { label: "دراسات عليا" },
    ],
  },
  {
    id: "employment",
    section: 0,
    question: "ما هي حالتك الوظيفية الحالية؟",
    options: [
      { label: "موظف" },
      { label: "صاحب عمل" },
      { label: "متقاعد" },
      { label: "غير موظف" },
    ],
  },
  {
    id: "has_experience",
    section: 0,
    question: "هل لديك خبرة أو معرفة في قطاع الاستثمار أو التمويل؟",
    options: [
      { label: "نعم" },
      { label: "لا" },
    ],
  },
  {
    id: "annual_income",
    section: 0,
    question: "ما هو دخلك السنوي التقريبي (بالريال السعودي)؟",
    options: [
      { label: "أقل من 200,000 ريال" },
      { label: "من 200,000 إلى 500,000 ريال" },
      { label: "من 500,000 إلى 1,000,000 ريال" },
      { label: "أكثر من 1,000,000 ريال" },
    ],
  },
  {
    id: "net_worth",
    section: 0,
    question: "ما هو صافي ثروتك التقريبي (بالريال السعودي)؟",
    options: [
      { label: "أقل من 1,000,000 ريال" },
      { label: "من 1,000,000 إلى 3,000,000 ريال" },
      { label: "من 3,000,000 إلى 5,000,000 ريال" },
      { label: "أكثر من 5,000,000 ريال" },
    ],
  },
  {
    id: "income_source",
    section: 0,
    question: "ما هو مصدر دخلك الرئيسي؟",
    options: [
      { label: "راتب" },
      { label: "دخل من أعمال تجارية" },
      { label: "عوائد استثمارية" },
      { label: "مصادر أخرى" },
    ],
  },
  // Section 2 — About You
  {
    id: "senior_position",
    section: 1,
    question: "هل تم تعيينك في أي منصب قيادي أو رفيع المستوى داخل أو خارج المملكة العربية السعودية؟",
    subtitle: "(مثل: وزير، سفير، عضو مجلس الشورى، أو منصب حكومي/تنفيذي رفيع)",
    options: [
      { label: "نعم" },
      { label: "لا" },
    ],
  },
  {
    id: "international_org",
    section: 1,
    question: "هل تشغل حالياً منصباً إدارياً رفيعاً في أي منظمة دولية؟",
    subtitle: "(مثل: الأمم المتحدة، البنك الدولي، صندوق النقد الدولي، أو منظمات مماثلة)",
    options: [
      { label: "نعم" },
      { label: "لا" },
    ],
  },
  {
    id: "family_relation",
    section: 1,
    question: "هل تربطك صلة قرابة أو علاقة زوجية (حتى الدرجة الثانية) بشخص يشغل منصباً حكومياً أو دولياً رفيع المستوى داخل أو خارج المملكة العربية السعودية؟",
    subtitle: "(مثل: والد، زوج، طفل، شقيق، أو قريب وثيق في منصب قيادي أو رفيع المستوى)",
    options: [
      { label: "نعم" },
      { label: "لا" },
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
            {SECTIONS[currentSection].title}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-300">
              {safeIndex + 1} من {visibleQuestions.length}
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
          <h3 className="text-base font-bold text-[#0F2A44] mb-1">{question.question}</h3>
          {question.subtitle && (
            <p className="text-xs text-gray-400 mb-4">{question.subtitle}</p>
          )}
          {!question.subtitle && <div className="mb-4" />}

          <div className="space-y-2 mb-6">
            {question.options.map((option, i) => {
              const selected = selectedAnswer === i;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAnswer(i)}
                  className={`w-full text-right p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
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
                      {option.label}
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
          <ArrowRight className="size-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={selectedAnswer === -1}
          className="flex-1 h-12 rounded-lg font-bold text-[#0F2A44] bg-[#7BFF00] hover:bg-[#6de600] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(123,255,0,0.3)] cursor-pointer"
        >
          <span>{isLast ? "إنهاء" : "التالي"}</span>
          <ArrowLeft className="size-4" />
        </button>
      </div>
    </div>
  );
}
