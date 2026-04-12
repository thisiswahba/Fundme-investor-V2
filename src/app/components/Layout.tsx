import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Bell, User, LogOut } from 'lucide-react';
import fundmeLogo from '../../assets/6b8eb299ed24c5060e85849675d69a160839c7b3.png';

export function Layout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navItems = [
    { to: '/', label: 'نظرة عامة' },
    { to: '/opportunities', label: 'الفرص' },
    { to: '/portfolio', label: 'المحفظة' },
    { to: '/wallet', label: 'المحفظة المالية' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]" dir="rtl">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
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
                    `px-4 py-2 rounded-[10px] text-[14px] transition-all ${
                      isActive
                        ? 'bg-[#0F172A] text-white'
                        : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
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
              <button className="relative p-2 hover:bg-[#F1F5F9] rounded-[10px] transition-colors">
                <Bell className="w-5 h-5 text-[#475569]" strokeWidth={2} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full" />
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 hover:bg-[#F1F5F9] rounded-[10px] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <span className="hidden lg:block text-[14px] text-[#0F172A]" style={{ fontWeight: 500 }}>
                    أحمد المالكي
                  </span>
                </button>
                {menuOpen && (
                  <div className="absolute left-0 top-full mt-1 w-44 bg-white border border-[#E2E8F0] rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/onboarding");
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#475569] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] pb-20 md:pb-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href="#" className="text-[13px] text-[#475569] hover:text-[#0F172A] transition-colors" style={{ fontWeight: 500 }}>
                عن فندمي
              </a>
              <a href="#" className="text-[13px] text-[#475569] hover:text-[#0F172A] transition-colors" style={{ fontWeight: 500 }}>
                المساعدة
              </a>
              <a href="#" className="text-[13px] text-[#475569] hover:text-[#0F172A] transition-colors" style={{ fontWeight: 500 }}>
                الشروط والأحكام
              </a>
            </div>
            <div className="text-[12px] text-[#94A3B8]">
              © 2026 FundMe. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-[10px] transition-all ${
                  isActive
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#475569]'
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
