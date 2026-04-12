import { Building2, Briefcase, Database } from 'lucide-react';
import { formatSAR, formatPercentage } from '../utils/currency';

const investments = [
  {
    icon: Building2,
    title: 'صندوق العقارات التجارية',
    subtitle: 'عقارات · 6 أشهر متبقية',
    return: 8.2,
    amount: 50000,
  },
  {
    icon: Briefcase,
    title: 'تمويل شركة تقنية ناشئة',
    subtitle: 'شركات ناشئة · 24 شهر متبقية',
    return: 14.5,
    amount: 75000,
  },
  {
    icon: Database,
    title: 'صندوق النمو المتوازن',
    subtitle: 'صناديق · 3 أشهر متبقية',
    return: 6.8,
    amount: 120800,
  },
];

export function InvestmentsList() {
  return (
    <div 
      className="rounded-[20px] p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #001a4d 0%, #002E83 100%)',
      }}
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl" 
        style={{ background: 'radial-gradient(circle, #0D82F9 0%, transparent 70%)' }} 
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative">
        <div className="text-[18px] text-white" style={{ fontWeight: 600 }}>
          استثماراتك النشطة
        </div>
        <button className="text-[13px] text-[#80FF00] hover:underline" style={{ fontWeight: 500 }}>
          عرض الكل
        </button>
      </div>

      {/* Investment Cards */}
      <div className="space-y-3 relative">
        {investments.map((investment, index) => (
          <div
            key={index}
            className="group rounded-[16px] p-4 flex items-center gap-3 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Icon */}
            <div 
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <investment.icon className="w-5 h-5 text-white" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-white mb-0.5" style={{ fontWeight: 600 }}>
                {investment.title}
              </div>
              <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {investment.subtitle}
              </div>
            </div>

            {/* Stats with glow on positive */}
            <div className="flex-shrink-0 text-left">
              <div 
                className="text-[14px] mb-0.5 transition-all" 
                style={{ 
                  fontWeight: 600,
                  color: '#80FF00',
                  textShadow: '0 0 20px rgba(128, 255, 0, 0.5)',
                }}
              >
                {formatPercentage(investment.return)}
              </div>
              <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {formatSAR(investment.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}