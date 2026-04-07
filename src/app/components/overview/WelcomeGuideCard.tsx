import { Link } from 'react-router';
import { Wallet, TrendingUp, PieChart, CheckCircle2 } from 'lucide-react';

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
      className="bg-white rounded-2xl p-6 lg:p-8" 
      style={{ 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(13, 130, 249, 0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)' }}
        >
          <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-[20px] text-[#0B1A3A] mb-1" style={{ fontWeight: 700 }}>
            ابدأ رحلتك الاستثمارية
          </h3>
          <p className="text-[14px] text-[#6B7280]">
            اتبع هذه الخطوات البسيطة لبدء الاستثمار
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl transition-all hover:shadow-md"
              style={{ background: '#F9FAFB' }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: step.bgColor }}
              >
                <Icon className="w-5 h-5" style={{ color: step.color }} strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-[15px] text-[#0B1A3A] mb-1" style={{ fontWeight: 600 }}>
                  {step.title}
                </h4>
                <p className="text-[13px] text-[#6B7280] mb-3">
                  {step.description}
                </p>
                <Link
                  to={step.link}
                  className="inline-block text-[13px] hover:underline"
                  style={{ 
                    color: step.color,
                    fontWeight: 600,
                  }}
                >
                  {step.action} ←
                </Link>
              </div>

              {/* Step Number */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  background: step.bgColor,
                  color: step.color,
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
