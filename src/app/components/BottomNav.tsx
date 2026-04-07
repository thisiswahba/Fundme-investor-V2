import { Home, BarChart3, Wallet, FileBarChart, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'الرئيسية', active: true },
  { icon: BarChart3, label: 'الاستثمارات', active: false },
  { icon: Wallet, label: 'المحفظة', active: false },
  { icon: FileBarChart, label: 'التقارير', active: false },
  { icon: User, label: 'حسابي', active: false },
];

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8ECF2] pb-5 pt-2 lg:hidden">
      <div className="max-w-[390px] mx-auto flex items-center justify-around px-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1 py-2 px-3 relative hover:bg-[#F5F7FA] rounded-lg transition-colors"
          >
            {/* Active Indicator */}
            {item.active && (
              <div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-0.5 rounded-full bg-[#80FF00]"
              ></div>
            )}
            
            <item.icon
              className={`w-5 h-5 ${item.active ? 'text-[#002E83]' : 'text-[#8896AD]'}`}
              strokeWidth={2}
              fill={item.active ? '#002E83' : 'none'}
            />
            <span
              className={`text-[10px] ${item.active ? 'text-[#002E83]' : 'text-[#8896AD]'}`}
              style={{ fontWeight: item.active ? 500 : 400 }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}