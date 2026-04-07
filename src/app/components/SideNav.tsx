import { Home, BarChart3, Briefcase, Wallet, FileText, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import fundmeLogo from '../../assets/6b8eb299ed24c5060e85849675d69a160839c7b3.png';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon, label, active, collapsed }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active 
          ? 'bg-[#0D82F9] text-white' 
          : 'text-[#8896AD] hover:bg-[#EAF0FA] hover:text-[#002E83]'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <span className={`flex-shrink-0 ${active ? '' : ''}`}>
        {icon}
      </span>
      {!collapsed && (
        <span className="text-[14px]" style={{ fontWeight: 500 }}>
          {label}
        </span>
      )}
    </button>
  );
}

export function SideNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`hidden lg:flex flex-col bg-white border-l border-[#E8ECF2] transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      dir="rtl"
    >
      {/* Logo Section */}
      <div className={`flex items-center gap-3 p-6 border-b border-[#E8ECF2] ${collapsed ? 'justify-center' : ''}`}>
        <img 
          src={fundmeLogo} 
          alt="فند مي" 
          className="h-10 w-auto"
        />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem 
          icon={<Home className="w-5 h-5" strokeWidth={2} />}
          label="الرئيسية"
          active={true}
          collapsed={collapsed}
        />
        <NavItem 
          icon={<BarChart3 className="w-5 h-5" strokeWidth={2} />}
          label="الأداء"
          collapsed={collapsed}
        />
        <NavItem 
          icon={<Briefcase className="w-5 h-5" strokeWidth={2} />}
          label="الاستثمارات"
          collapsed={collapsed}
        />
        <NavItem 
          icon={<Wallet className="w-5 h-5" strokeWidth={2} />}
          label="المحفظة"
          collapsed={collapsed}
        />
        <NavItem 
          icon={<FileText className="w-5 h-5" strokeWidth={2} />}
          label="التقارير"
          collapsed={collapsed}
        />
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#E8ECF2] space-y-2">
        <NavItem 
          icon={<Settings className="w-5 h-5" strokeWidth={2} />}
          label="الإعدادات"
          collapsed={collapsed}
        />
        <NavItem 
          icon={<LogOut className="w-5 h-5" strokeWidth={2} />}
          label="تسجيل الخروج"
          collapsed={collapsed}
        />
        
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#8896AD] hover:bg-[#EAF0FA] hover:text-[#002E83] transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <ChevronLeft 
            className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} 
            strokeWidth={2} 
          />
          {!collapsed && (
            <span className="text-[14px]" style={{ fontWeight: 500 }}>
              طي القائمة
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}