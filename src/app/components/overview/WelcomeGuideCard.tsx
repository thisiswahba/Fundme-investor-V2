import { Link } from 'react-router';
import { Wallet, TrendingUp, PieChart, CheckCircle2, Check, Rocket } from 'lucide-react';
import { useI18n } from '../../i18n';

interface WelcomeGuideCardProps {
  completedSteps?: number;
}

export function WelcomeGuideCard({ completedSteps = 1 }: WelcomeGuideCardProps) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const totalSteps = 3;
  const isAllComplete = completedSteps >= totalSteps;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const upcomingHints: Record<number, string> = {
    2: isAr ? 'سيتم تفعيل هذه الخطوة بعد أول استثمار' : 'This step unlocks after your first investment',
  };

  const steps = [
    {
      icon: Wallet,
      title: isAr ? 'أضف رصيد' : 'Add Funds',
      description: isAr ? 'قم بإيداع الأموال في محفظتك للبدء' : 'Deposit funds into your wallet to get started',
      action: isAr ? 'إيداع الآن' : 'Deposit now',
      link: '/wallet',
      color: '#0D82F9',
      bgColor: 'rgba(13, 130, 249, 0.1)',
    },
    {
      icon: TrendingUp,
      title: isAr ? 'استكشف الفرص' : 'Explore Opportunities',
      description: isAr ? 'تصفح الفرص الاستثمارية المتاحة' : 'Browse available investment opportunities',
      action: isAr ? 'عرض الفرص' : 'View opportunities',
      link: '/app/opportunities',
      color: '#002E83',
      bgColor: 'rgba(0, 46, 131, 0.1)',
    },
    {
      icon: PieChart,
      title: isAr ? 'نوّع محفظتك' : 'Diversify Your Portfolio',
      description: isAr ? 'استثمر في عدة فرص لتقليل المخاطر' : 'Invest across multiple opportunities to reduce risk',
      action: isAr ? 'تعرف على المزيد' : 'Learn more',
      link: '/app/opportunities',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
  ];

  // Completed state
  if (isAllComplete) {
    return (
      <div
        className="rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center"
        style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(16, 185, 129, 0.15)' }}
        >
          <Rocket className="w-7 h-7 text-[#10B981]" strokeWidth={2} />
        </div>
        <h3 className="text-[18px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
          {isAr ? 'أنت جاهز للاستثمار!' : 'You\'re ready to invest!'}
        </h3>
        <p className="text-[13px] text-[#6B7280] mb-5 max-w-[260px] leading-relaxed">
          {isAr ? 'أكملت جميع الخطوات بنجاح. ابدأ باستكشاف الفرص المتاحة' : 'You\'ve completed all the steps. Start exploring available opportunities'}
        </p>
        <Link
          to="/app/opportunities"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)',
          }}
        >
          <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
          <span>{isAr ? 'استكشف الفرص' : 'Explore Opportunities'}</span>
        </Link>
      </div>
    );
  }

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
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)' }}
        >
          <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-[17px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            {isAr ? 'ابدأ رحلتك الاستثمارية' : 'Start your investment journey'}
          </h3>
          <p className="text-[12px] text-[#6B7280] mt-0.5">
            {isAr ? 'اتبع هذه الخطوات البسيطة لبدء الاستثمار' : 'Follow these simple steps to start investing'}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mt-4 mb-5">
        <div className="flex-1 h-[8px] rounded-full bg-[#EDF0F7] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #002E83 0%, #0D82F9 60%, #10B981 100%)',
            }}
          />
        </div>
        <span className="text-[12px] text-[#0B1A3A] flex-shrink-0" style={{ fontWeight: 700 }}>
          {progressPercent}%
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < completedSteps;
          const isCurrent = index === completedSteps;
          const isUpcoming = index > completedSteps;

          return (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl transition-all"
              style={{
                background: isCurrent ? '#EBF2FF' : '#F9FAFB',
                border: isCurrent
                  ? '1.5px solid rgba(13, 130, 249, 0.3)'
                  : '1px solid transparent',
                opacity: isUpcoming ? 0.5 : 1,
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: isCompleted
                    ? 'rgba(16, 185, 129, 0.12)'
                    : isCurrent
                      ? 'rgba(13, 130, 249, 0.15)'
                      : step.bgColor,
                }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
                ) : (
                  <Icon className="w-4 h-4" style={{ color: step.color }} strokeWidth={2} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] mb-0.5" style={{ fontWeight: 600, color: '#0B1A3A' }}>
                  {isCompleted && <span className="text-[#10B981] mx-1">✓</span>}
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
                {isCurrent && (
                  <Link
                    to={step.link}
                    className="inline-flex items-center gap-1 text-[11px] hover:underline mt-1.5"
                    style={{ color: '#0D82F9', fontWeight: 700 }}
                  >
                    {step.action} {isAr ? '←' : '→'}
                  </Link>
                )}
                {isUpcoming && upcomingHints[index] && (
                  <p className="text-[10px] text-[#9CA3AF] mt-1" style={{ fontStyle: 'italic' }}>
                    {upcomingHints[index]}
                  </p>
                )}
              </div>

              {/* Step indicator */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: isCompleted
                    ? 'rgba(16, 185, 129, 0.12)'
                    : isCurrent
                      ? 'rgba(13, 130, 249, 0.12)'
                      : step.bgColor,
                  color: isCompleted ? '#10B981' : isCurrent ? '#0D82F9' : step.color,
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" strokeWidth={3} />
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
