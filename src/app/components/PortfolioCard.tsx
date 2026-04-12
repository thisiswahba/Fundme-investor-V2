import { formatSAR, formatPercentage } from '../utils/currency';
import { TrendingUp } from 'lucide-react';

export function PortfolioCard() {
  // Mock data - replace with real data
  const portfolioData = {
    totalValue: 245800,
    monthlyChange: 12.4,
    earnings: 23400,
    deals: 8,
    returns: 12.4,
  };

  return (
    <div 
      className="relative w-full rounded-[24px] p-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #002E83 0%, #0D47A1 50%, #1A4A9E 100%)',
        boxShadow: '0 20px 60px rgba(0, 46, 131, 0.3), 0 0 80px rgba(13, 130, 249, 0.15)',
      }}
    >
      {/* Soft glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" 
        style={{ background: 'radial-gradient(circle, #0D82F9 0%, transparent 70%)' }} 
      />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" 
        style={{ background: 'radial-gradient(circle, #80FF00 0%, transparent 70%)' }} 
      />

      {/* Content */}
      <div className="relative">
        {/* Label with icon */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
            إجمالي المحفظة
          </div>
        </div>

        {/* Main Value - Emphasized */}
        <div className="mb-6">
          <div className="text-[48px] leading-none text-white mb-2" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            {formatSAR(portfolioData.totalValue)}
          </div>
          
          {/* Change Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#80FF00] text-[#002E83] text-[13px] px-4 py-2 rounded-full" style={{ fontWeight: 600 }}>
            <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            {formatPercentage(portfolioData.monthlyChange)} هذا الشهر
          </div>
        </div>

        {/* Inline Stats - Horizontal */}
        <div className="flex items-center gap-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {/* Earnings */}
          <div className="flex-1">
            <div className="text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              الأرباح
            </div>
            <div className="text-[18px] text-white" style={{ fontWeight: 600 }}>
              {formatSAR(portfolioData.earnings)}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* Deals */}
          <div className="flex-1">
            <div className="text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              الاستثمارات
            </div>
            <div className="text-[18px] text-white" style={{ fontWeight: 600 }}>
              8 صفقات نشطة
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* Returns */}
          <div className="flex-1">
            <div className="text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              معدل العائد
            </div>
            <div className="text-[18px] text-white" style={{ fontWeight: 600 }}>
              {formatPercentage(portfolioData.returns)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}