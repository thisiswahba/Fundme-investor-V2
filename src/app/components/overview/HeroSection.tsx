import { TrendingUp, Wallet, PieChart, Target, Crown } from 'lucide-react';
import { formatSAR, formatPercentage } from '../../utils/currency';
import { usePersona } from '../../demoPersona';

interface HeroSectionProps {
  isVIP?: boolean;
}

export function HeroSection({ isVIP = false }: HeroSectionProps) {
  const { persona } = usePersona();
  const p = persona.portfolio;
  const data = {
    totalPortfolio: p.totalValue,
    monthlyGrowth: p.monthlyGrowth,
    totalInvested: p.totalInvested,
    realizedReturns: p.realizedReturns,
    averageReturn: p.averageReturn,
    activeInvestments: p.activeInvestments,
    remainingLimit: p.remainingLimit,
  };

  return (
    <div
      className="relative rounded-[20px] px-6 py-7 lg:px-10 lg:py-9 overflow-hidden"
      style={{
        background: isVIP
          ? 'linear-gradient(135deg, #1A1400 0%, #2E2200 50%, #1A1400 100%)'
          : 'linear-gradient(135deg, #0B1A3A 0%, #1E3A5F 50%, #0B1A3A 100%)',
      }}
    >
      {/* Decorative glows */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: isVIP
            ? 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)'
            : 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
      />

      {/* VIP badge */}
      {isVIP && (
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(255,215,0,0.1) 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          <Crown className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} strokeWidth={2} />
          <span className="text-[11px]" style={{ color: '#D4AF37', fontWeight: 700 }}>VIP</span>
        </div>
      )}

      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">

          {/* RIGHT ZONE - Primary Portfolio Value */}
          <div className="lg:flex-[0_0_40%] lg:text-right lg:order-3">
            <div className="flex items-center gap-2 lg:justify-end mb-2">
              <Wallet className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} strokeWidth={2} />
              <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                إجمالي قيمة المحفظة
              </div>
            </div>
            <div className="text-[44px] lg:text-[52px] leading-none text-white mb-3" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {formatSAR(data.totalPortfolio)}
            </div>

            {/* Growth Badge */}
            <div className="flex lg:justify-end">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                <span className="text-[13px] text-[#10B981]" style={{ fontWeight: 600 }}>
                  {formatPercentage(data.monthlyGrowth)} هذا الشهر
                </span>
              </div>
            </div>
          </div>

          {/* CENTER ZONE - Core Financial Metrics */}
          <div className="lg:flex-[0_0_30%] lg:order-2">
            <div className="flex flex-row lg:flex-col gap-6">
              <div>
                <div className="text-[11px] mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  إجمالي المستثمر
                </div>
                <div className="text-[22px] text-white leading-tight" style={{ fontWeight: 600 }}>
                  {formatSAR(data.totalInvested)}
                </div>
              </div>
              <div>
                <div className="text-[11px] mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  الأرباح المحققة
                </div>
                <div className="text-[22px] leading-tight" style={{ fontWeight: 600, color: '#10B981' }}>
                  {formatSAR(data.realizedReturns)}
                </div>
              </div>
              <div>
                <div className="text-[11px] mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  العائد السنوي
                </div>
                <div className="text-[22px] text-white leading-tight" style={{ fontWeight: 600 }}>
                  {formatPercentage(data.averageReturn)}
                </div>
              </div>
            </div>
          </div>

          {/* LEFT ZONE - Supporting Context */}
          <div className="lg:flex-[0_0_30%] lg:order-1">
            <div className="flex flex-row lg:flex-col gap-4">
              <div
                className="flex-1 p-4 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <PieChart className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.5)' }} strokeWidth={2} />
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                    الاستثمارات النشطة
                  </div>
                </div>
                <div className="text-[28px] text-white leading-none" style={{ fontWeight: 700 }}>
                  {data.activeInvestments}
                </div>
              </div>

              <div
                className="flex-1 p-4 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Target className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.5)' }} strokeWidth={2} />
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                    المتبقي من الحد
                  </div>
                </div>
                <div className="text-[18px] text-white leading-tight" style={{ fontWeight: 600 }}>
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
