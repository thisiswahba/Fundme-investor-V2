import { Wallet, ArrowLeftRight, TrendingUp, FileText } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { icon: TrendingUp, label: 'استثمر', isPrimary: true },
    { icon: Wallet, label: 'إيداع', isPrimary: false },
    { icon: ArrowLeftRight, label: 'تحويل', isPrimary: false },
    { icon: FileText, label: 'كشف حساب', isPrimary: false },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#E8ECF2]">
      <div className="text-[16px] text-[#002E83] mb-5" style={{ fontWeight: 600 }}>
        إجراءات سريعة
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`group relative flex flex-col items-center justify-center rounded-2xl py-6 px-4 transition-all duration-300 ${
              action.isPrimary 
                ? 'bg-gradient-to-br from-[#0D82F9] to-[#002E83] hover:shadow-xl hover:scale-105' 
                : 'bg-[#F5F7FA] hover:bg-[#EAF0FA] hover:shadow-lg hover:-translate-y-1'
            }`}
            style={action.isPrimary ? {
              boxShadow: '0 8px 24px rgba(13, 130, 249, 0.25)'
            } : {}}
          >
            {action.isPrimary && (
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: '0 0 40px rgba(13, 130, 249, 0.4)' }}
              />
            )}
            <action.icon 
              className={`w-6 h-6 mb-2.5 transition-transform group-hover:scale-110 ${
                action.isPrimary ? 'text-white' : 'text-[#002E83]'
              }`} 
              strokeWidth={2} 
            />
            <span 
              className={`text-[12px] text-center ${
                action.isPrimary ? 'text-white' : 'text-[#002E83]'
              }`} 
              style={{ fontWeight: 600 }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}