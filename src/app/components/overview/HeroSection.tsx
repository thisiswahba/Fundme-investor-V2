import { TrendingUp, Wallet, PieChart, DollarSign, Target } from 'lucide-react';
import { formatSAR, formatPercentage } from '../../utils/currency';
import { AbstractHeroIllustration } from './AbstractHeroIllustration';

export function HeroSection() {
  const data = {
    totalPortfolio: 485000,
    monthlyGrowth: 8.4,
    totalInvested: 440000,
    realizedReturns: 45000,
    averageReturn: 12.3,
    activeInvestments: 12,
    remainingLimit: 560000,
  };

  return (
    <div 
      className="relative rounded-[20px] px-8 py-10 lg:px-12 lg:py-14 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1A3A 0%, #1E3A5F 50%, #0B1A3A 100%)',
      }}
    >
      {/* Abstract Illustration - Background */}
      <AbstractHeroIllustration />

      {/* Decorative glows */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" 
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl" 
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} 
      />

      <div className="relative">
        {/* 3-Zone Layout: RIGHT (40%) | CENTER (30%) | LEFT (30%) */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
          
          {/* RIGHT ZONE - Primary Portfolio Value (40%) */}
          <div className="lg:flex-[0_0_40%] lg:text-right lg:order-3">
            <div className="text-[12px] mb-3" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.02em' }}>
              إجمالي قيمة المحفظة
            </div>
            <div className="text-[56px] lg:text-[64px] leading-none text-white mb-4" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {formatSAR(data.totalPortfolio)}
            </div>
            
            {/* Growth Badge */}
            <div className="flex lg:justify-end">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <TrendingUp className="w-4 h-4 text-[#10B981]" strokeWidth={2.5} />
                <span className="text-[14px] text-[#10B981]" style={{ fontWeight: 600 }}>
                  {formatPercentage(data.monthlyGrowth)} هذا الشهر
                </span>
              </div>
            </div>
          </div>

          {/* CENTER ZONE - Core Financial Metrics (30%) - Inline, No Boxes */}
          <div className="lg:flex-[0_0_30%] lg:order-2">
            <div className="flex flex-col gap-6">
              
              {/* Total Invested */}
              <div>
                <div className="text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  إجمالي المستثمر
                </div>
                <div className="text-[26px] text-white leading-tight" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {formatSAR(data.totalInvested)}
                </div>
              </div>

              {/* Realized Returns */}
              <div>
                <div className="text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  الأرباح المحققة
                </div>
                <div className="text-[26px] leading-tight" style={{ fontWeight: 600, letterSpacing: '-0.01em', color: '#10B981' }}>
                  {formatSAR(data.realizedReturns)}
                </div>
              </div>

              {/* Average Return % */}
              <div>
                <div className="text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  العائد السنوي
                </div>
                <div className="text-[26px] text-white leading-tight" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {formatPercentage(data.averageReturn)}
                </div>
              </div>

            </div>
          </div>

          {/* LEFT ZONE - Supporting Context (30%) */}
          <div className="lg:flex-[0_0_30%] lg:order-1">
            <div className="flex flex-col gap-6">
              
              {/* Active Investments */}
              <div 
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.6)' }} strokeWidth={2} />
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                    الاستثمارات النشطة
                  </div>
                </div>
                <div className="text-[36px] text-white leading-none" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {data.activeInvestments}
                </div>
              </div>

              {/* Remaining Investment Limit */}
              <div 
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.6)' }} strokeWidth={2} />
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                    المتبقي من الحد
                  </div>
                </div>
                <div className="text-[20px] text-white leading-tight" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {formatSAR(data.remainingLimit)}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}