import { TrendingUp, PieChart, Calendar } from 'lucide-react';

export function EmptyKPISummary() {
  const kpis = [
    {
      label: 'إجمالي العوائد',
      value: '0',
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
      value: '+0%',
      icon: Calendar,
      color: '#002E83',
      bgColor: 'rgba(0, 46, 131, 0.1)',
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl flex"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const isLast = index === kpis.length - 1;
        return (
          <div
            key={index}
            className="flex-1 p-5"
            style={!isLast ? { borderLeft: '1px solid #E5E7EB' } : undefined}
          >
            {/* Icon + Label row — RTL: icon first = right, label follows */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: kpi.bgColor }}
              >
                <Icon className="w-4 h-4" style={{ color: kpi.color }} strokeWidth={2} />
              </div>
              <span className="text-[13px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                {kpi.label}
              </span>
            </div>
            {/* Value — right-aligned */}
            <div
              className="text-[28px] text-[#0B1A3A]"
              style={{ fontWeight: 700, letterSpacing: '-0.01em', opacity: 0.5 }}
            >
              {kpi.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
