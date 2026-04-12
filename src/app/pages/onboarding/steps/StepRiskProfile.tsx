import { useState, useMemo } from "react";
import { useOnboarding } from "../OnboardingContext";
import { ArrowLeft, ArrowRight, GraduationCap, Briefcase, TrendingUp, Wallet, ShieldCheck } from "lucide-react";
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
  { title: "المعلومات الأساسية", icon: GraduationCap },
  { title: "الخبرة الاستثمارية", icon: TrendingUp },
  { title: "القدرة المالية", icon: Wallet },
  { title: "مصدر الدخل", icon: Briefcase },
  { title: "أسئلة الامتثال", icon: ShieldCheck },
];

const QUESTIONS: Question[] = [
  // Section 1 — Basic Info
  {
    id: "education",
    section: 0,
    question: "ما هو مستواك التعليمي؟",
    options: [
      { label: "ثانوي أو أقل" },
      { label: "بكالوريوس" },
      { label: "ماجستير" },
      { label: "دكتوراه" },
    ],
  },
  {
    id: "employment",
    section: 0,
    question: "ما هي حالتك الوظيفية؟",
    options: [
      { label: "موظف حكومي" },
      { label: "موظف قطاع خاص" },
      { label: "صاحب عمل" },
      { label: "متقاعد" },
      { label: "غير موظف" },
    ],
  },
  // Section 2 — Investment Experience
  {
    id: "has_experience",
    section: 1,
    question: "هل لديك خبرة سابقة في الاستثمار؟",
    options: [
      { label: "نعم" },
      { label: "لا" },
    ],
  },
  {
    id: "experience_type",
    section: 1,
    question: "ما نوع الاستثمارات التي لديك خبرة فيها؟",
    subtitle: "اختر الأقرب لخبرتك",
    conditional: { questionId: "has_experience", answerIndex: 0 },
    options: [
      { label: "أسهم وصناديق استثمارية" },
      { label: "عقارات" },
      { label: "تمويل جماعي" },
      { label: "تداول عملات أو سلع" },
    ],
  },
  {
    id: "experience_years",
    section: 1,
    question: "كم سنة من الخبرة الاستثمارية لديك؟",
    conditional: { questionId: "has_experience", answerIndex: 0 },
    options: [
      { label: "أقل من سنة" },
      { label: "من 1 إلى 3 سنوات" },
      { label: "من 3 إلى 5 سنوات" },
      { label: "أكثر من 5 سنوات" },
    ],
  },
  // Section 3 — Financial Capacity
  {
    id: "annual_income",
    section: 2,
    question: "ما هو دخلك السنوي التقريبي؟",
    options: [
      { label: "أقل من 100,000 ريال" },
      { label: "100,000 - 300,000 ريال" },
      { label: "300,000 - 600,000 ريال" },
      { label: "أكثر من 600,000 ريال" },
    ],
  },
  {
    id: "net_worth",
    section: 2,
    question: "ما هو صافي ثروتك التقريبي؟",
    subtitle: "بدون احتساب مسكنك الأساسي",
    options: [
      { label: "أقل من 200,000 ريال" },
      { label: "200,000 - 1,000,000 ريال" },
      { label: "1,000,000 - 5,000,000 ريال" },
      { label: "أكثر من 5,000,000 ريال" },
    ],
  },
  // Section 4 — Source of Income
  {
    id: "income_source",
    section: 3,
    question: "ما هو مصدر دخلك الرئيسي؟",
    options: [
      { label: "راتب شهري" },
      { label: "أعمال تجارية" },
      { label: "عوائد استثمارية" },
      { label: "إيرادات عقارية" },
      { label: "مصادر أخرى" },
    ],
  },
  // Section 5 — Compliance
  {
    id: "pep",
    section: 4,
    question: "هل أنت شخص مكشوف سياسياً؟",
    subtitle: "شخص يشغل أو شغل منصباً عاماً بارزاً",
    options: [
      { label: "نعم" },
      { label: "لا" },
    ],
  },
  {
    id: "senior_position",
    section: 4,
    question: "هل تشغل منصباً قيادياً في جهة حكومية أو شركة مدرجة؟",
    options: [
      { label: "نعم" },
      { label: "لا" },
    ],
  },
  {
    id: "family_relation",
    section: 4,
    question: "هل لديك صلة قرابة بشخص يشغل منصباً حكومياً بارزاً؟",
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
    const newAnswers = { ...answers, [question.id]: optionIndex };

    // Clear conditional follow-ups if the parent answer changes
    if (question.id === "has_experience" && optionIndex !== 0) {
      delete newAnswers["experience_type"];
      delete newAnswers["experience_years"];
    }

    setAnswers(newAnswers);
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
      <div className="flex items-center gap-2.5 mb-1">
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

      {/* Section dots */}
      <div className="flex gap-1 mb-6 mt-3">
        {SECTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-sm transition-all duration-500 ${
              i < currentSection
                ? "bg-[#A7D98B]"
                : i === currentSection
                  ? "bg-[#315FDB]"
                  : "bg-[#E3E8F1]"
            }`}
          />
        ))}
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
