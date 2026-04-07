import { Link } from 'react-router';
import { Wallet, TrendingUp, PieChart, CheckCircle2, Check } from 'lucide-react';

const completedSteps = 1;
const progressPercent = 65;

const upcomingHints: Record<number, string> = {
  2: 'سيتم تفعيل هذه الخطوة بعد أول استثمار',
};

export function WelcomeGuideCard() {
  const steps = [
    {
      icon: Wallet,
      title: 'أضف رصيد',
      description: 'قم بإيداع الأموال في محفظتك للبدء',
      action: 'إيداع الآن',
      link: '/wallet',
      color: '#0D82F9',
      bgColor: 'rgba(13, 130, 249, 0.1)',
    },
    {
      icon: TrendingUp,
      title: 'استكشف الفرص',
      description: 'تصفح الفرص الاستثمارية المتاحة',
      action: 'عرض الفرص',
      link: '/opportunities',
      color: '#002E83',
      bgColor: 'rgba(0, 46, 131, 0.1)',
    },
    {
      icon: PieChart,
      title: 'نوّع محفظتك',
      description: 'استثمر في عدة فرص لتقليل المخاطر',
      action: 'تعرف على المزيد',
      link: '/opportunities',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl p-6 h-full"
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(13, 130, 249, 0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)' }}
        >
          <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            ابدأ رحلتك الاستثمارية
          </h3>
          <p className="text-[13px] text-[#6B7280] mt-1">
            اتبع هذه الخطوات البسيطة لبدء الاستثمار
          </p>
        </div>
      </div>

      {/* Progress — inline bar + percentage */}
      <div className="flex items-center gap-3 mt-4 mb-6">
        <div className="flex-1 h-[9px] rounded-full bg-[#EDF0F7] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #002E83 0%, #0D82F9 60%, #10B981 100%)',
            }}
          />
        </div>
        <span className="text-[13px] text-[#0B1A3A] flex-shrink-0" style={{ fontWeight: 700 }}>
          %{progressPercent}
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < completedSteps;
          const isCurrent = index === completedSteps;
          const isUpcoming = index > completedSteps;

          return (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl transition-all"
              style={{
                background: isCurrent ? '#EBF2FF' : '#F9FAFB',
                border: isCurrent
                  ? '1.5px solid rgba(13, 130, 249, 0.3)'
                  : '1px solid transparent',
                boxShadow: isCurrent
                  ? '0 2px 8px rgba(13, 130, 249, 0.1)'
                  : 'none',
                opacity: isUpcoming ? 0.5 : 1,
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: isCompleted
                    ? 'rgba(16, 185, 129, 0.12)'
                    : isCurrent
                      ? 'rgba(13, 130, 249, 0.15)'
                      : step.bgColor,
                }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-[#10B981]" strokeWidth={2.5} />
                ) : (
                  <Icon
                    className="w-5 h-5"
                    style={{ color: step.color }}
                    strokeWidth={2}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4
                  className="text-[14px] mb-0.5"
                  style={{
                    fontWeight: 600,
                    color: '#0B1A3A',
                  }}
                >
                  {isCompleted && (
                    <span className="text-[#10B981] ml-1">✓</span>
                  )}
                  {step.title}
                </h4>
                <p className="text-[12px] text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
                {isCurrent && (
                  <Link
                    to={step.link}
                    className="inline-flex items-center gap-1 text-[12px] hover:underline mt-2"
                    style={{ color: '#0D82F9', fontWeight: 700 }}
                  >
                    {step.action} ←
                  </Link>
                )}
                {isUpcoming && upcomingHints[index] && (
                  <p className="text-[11px] text-[#9CA3AF] mt-1.5" style={{ fontStyle: 'italic' }}>
                    {upcomingHints[index]}
                  </p>
                )}
              </div>

              {/* Step indicator */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{
                  background: isCompleted
                    ? 'rgba(16, 185, 129, 0.12)'
                    : isCurrent
                      ? 'rgba(13, 130, 249, 0.12)'
                      : step.bgColor,
                  color: isCompleted
                    ? '#10B981'
                    : isCurrent
                      ? '#0D82F9'
                      : step.color,
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
