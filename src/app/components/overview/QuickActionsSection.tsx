import { TrendingUp, Plus, ArrowDownToLine } from 'lucide-react';

export function QuickActionsSection() {
  const actions = [
    { icon: TrendingUp, label: 'استثمار جديد', isPrimary: true },
    { icon: Plus, label: 'إضافة أموال', isPrimary: false },
    { icon: ArrowDownToLine, label: 'سحب', isPrimary: false },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`group relative flex flex-col items-center justify-center rounded-2xl p-6 transition-all duration-300 ${
            action.isPrimary 
              ? 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] hover:shadow-2xl hover:scale-105' 
              : 'bg-white hover:bg-[#F9FAFB] hover:shadow-lg hover:-translate-y-1'
          }`}
          style={action.isPrimary ? {
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
          } : {
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          {action.isPrimary && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 50px rgba(37, 99, 235, 0.5)' }}
            />
          )}
          <action.icon 
            className={`w-6 h-6 mb-3 transition-transform group-hover:scale-110 ${
              action.isPrimary ? 'text-white' : 'text-[#0B1A3A]'
            }`} 
            strokeWidth={2} 
          />
          <span 
            className={`text-[13px] text-center ${
              action.isPrimary ? 'text-white' : 'text-[#0B1A3A]'
            }`} 
            style={{ fontWeight: 600 }}
          >
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}