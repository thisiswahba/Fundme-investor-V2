import { formatSAR, formatPercentage } from '../../utils/currency';
import { TrendingUp, Target, Activity, ShieldCheck } from 'lucide-react';

export function KPISummary() {
  const kpis = [
    {
      icon: TrendingUp,
      label: 'إجمالي المستثمر',
      value: formatSAR(440000),
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
    },
    {
      icon: Target,
      label: 'إجمالي العوائد',
      value: formatSAR(45000),
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
    },
    {
      icon: Activity,
      label: 'الاستثمارات النشطة',
      value: '12 صفقة',
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
    },
    {
      icon: ShieldCheck,
      label: 'الحد المتبقي',
      value: formatSAR(60000),
      iconBg: '#F3E8FF',
      iconColor: '#8B5CF6',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: kpi.iconBg }}
            >
              <kpi.icon 
                className="w-5 h-5" 
                style={{ color: kpi.iconColor }} 
                strokeWidth={2} 
              />
            </div>
          </div>
          <div className="text-[13px] text-[#6B7280] mb-1.5" style={{ fontWeight: 500 }}>
            {kpi.label}
          </div>
          <div className="text-[20px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
            {kpi.value}
          </div>
        </div>
      ))}
    </div>
  );
}
