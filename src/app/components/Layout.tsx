import { Outlet, NavLink } from 'react-router';
import { Bell, User } from 'lucide-react';
import fundmeLogo from 'figma:asset/6b8eb299ed24c5060e85849675d69a160839c7b3.png';

export function Layout() {
  const navItems = [
    { to: '/', label: 'نظرة عامة' },
    { to: '/opportunities', label: 'الفرص' },
    { to: '/portfolio', label: 'المحفظة' },
    { to: '/wallet', label: 'المحفظة المالية' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC]" dir="rtl">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src={fundmeLogo} 
                alt="FundMe" 
                className="h-12 w-auto"
              />
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-[14px] transition-all ${
                      isActive
                        ? 'bg-[#0B1A3A] text-white'
                        : 'text-[#6B7280] hover:bg-[#F1F4F9] hover:text-[#0B1A3A]'
                    }`
                  }
                  style={{ fontWeight: 500 }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-[#F1F4F9] rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-[#6B7280]" strokeWidth={2} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full" />
              </button>

              {/* User Avatar */}
              <button className="flex items-center gap-2 p-1.5 pr-3 hover:bg-[#F1F4F9] rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <span className="hidden lg:block text-[14px] text-[#0B1A3A]" style={{ fontWeight: 500 }}>
                  أحمد المالكي
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#0B1A3A] text-white'
                    : 'text-[#6B7280]'
                }`
              }
            >
              <span className="text-[11px]" style={{ fontWeight: 500 }}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}