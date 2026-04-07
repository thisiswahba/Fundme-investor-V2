import { TrendingUp, PieChart, Calendar } from 'lucide-react';
import { formatSAR, formatPercentage } from '../../utils/currency';

export function EmptyKPISummary() {
  const kpis = [
    {
      label: 'إجمالي العوائد',
      value: formatSAR(0),
      icon: TrendingUp,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      label: 'عدد الاستثمارات',
      value: '0',
      icon: PieChart,
      color: '#0D82F9',
      bgColor: 'rgba(13, 130, 249, 0.1)',
    },
    {
      label: 'متوسط العائد',
      value: formatPercentage(0),
      icon: Calendar,
      color: '#002E83',
      bgColor: 'rgba(0, 46, 131, 0.1)',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                {kpi.label}
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: kpi.bgColor }}
              >
                <Icon className="w-4 h-4" style={{ color: kpi.color }} strokeWidth={2} />
              </div>
            </div>
            <div className="text-[28px] text-[#0B1A3A]" style={{ fontWeight: 700, letterSpacing: '-0.01em', opacity: 0.5 }}>
              {kpi.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
