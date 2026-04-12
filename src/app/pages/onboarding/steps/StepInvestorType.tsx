import { useOnboarding, type InvestorType } from "../OnboardingContext";
import { User, Building2, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const TYPES: {
  id: InvestorType;
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  benefit: string;
}[] = [
  {
    id: "individual",
    icon: User,
    title: "مستثمر فردي",
    description: "استثمر كشخص طبيعي في فرص تمويلية متنوعة",
    benefit: "حد أدنى 1,000 ريال",
  },
  {
    id: "institutional",
    icon: Building2,
    title: "مستثمر مؤسسي",
    description: "استثمر باسم شركتك أو مؤسستك مع مزايا إضافية",
    benefit: "مرونة أعلى في الحدود",
  },
];

export function StepInvestorType() {
  const { data, updateData, next } = useOnboarding();

  function handleSelect(type: InvestorType) {
    updateData({ investorType: type });
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#0F2A44] mb-2">اختر نوع الحساب</h2>
      <p className="text-sm text-gray-500 mb-6">حدد نوع حسابك الاستثماري للمتابعة</p>

      <div className="space-y-3 mb-8">
        {TYPES.map((type) => {
          const selected = data.investorType === type.id;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelect(type.id)}
              className={`w-full text-right p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selected
                  ? "border-[#7BFF00] bg-[#7BFF00]/5 shadow-[0_0_0_1px_#7BFF00]"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    selected ? "bg-[#7BFF00] text-[#0F2A44]" : "bg-[#F1F4F9] text-[#0F2A44]"
                  }`}
                >
                  <type.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0F2A44] mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{type.description}</p>
                  <span className="inline-block text-xs font-medium bg-[#F1F4F9] text-[#0F2A44] px-3 py-1 rounded-md">
                    {type.benefit}
                  </span>
                </div>
                {/* Radio circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    selected ? "border-[#7BFF00]" : "border-gray-300"
                  }`}
                >
                  {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#7BFF00]" />}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={next}
        disabled={!data.investorType}
        className="w-full h-12 rounded-lg font-bold text-[#0F2A44] bg-[#7BFF00] hover:bg-[#6de600] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(123,255,0,0.3)] cursor-pointer"
      >
        <span>متابعة</span>
        <ArrowLeft className="size-4" />
      </button>
    </div>
  );
}
