import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router';
import { Bell, User, ChevronDown, Settings, LogOut, UserCircle, Globe } from 'lucide-react';
import fundmeLogo from '../../assets/6b8eb299ed24c5060e85849675d69a160839c7b3.png';
import { useI18n } from '../i18n';

export function Layout() {
  const { lang, setLang, t, dir } = useI18n();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navItems = [
    { to: '/app', label: t('nav.overview') },
    { to: '/app/opportunities', label: t('nav.opportunities') },
    { to: '/app/portfolio', label: t('nav.portfolio') },
    { to: '/app/wallet', label: t('nav.wallet') },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC]" dir={dir}>
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={fundmeLogo} alt="FundMe" className="h-12 w-auto" />
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/app'}
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
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                style={{ fontWeight: 500, border: '1px solid #E5E7EB' }}
              >
                <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-[#F1F4F9] rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-[#6B7280]" strokeWidth={1.5} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16A34A] rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 hover:bg-[#F1F4F9] rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="hidden lg:block text-[14px] text-[#0B1A3A]" style={{ fontWeight: 500 }}>
                    {t('user.name')}
                  </span>
                  <ChevronDown
                    className={`hidden lg:block w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div
                    className="absolute top-full mt-2 w-56 bg-white rounded-xl overflow-hidden z-50"
                    style={{
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      border: '1px solid #E5E7EB',
                      ...(dir === 'rtl' ? { right: 0 } : { left: 0 }),
                    }}
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b" style={{ borderColor: '#F1F5F9' }}>
                      <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{t('user.name')}</div>
                      <div className="text-[11px] text-[#94A3B8]">ahmed@example.com</div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <UserCircle className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.5} />
                        {t('user.profile')}
                      </button>
                      <button
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <Settings className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.5} />
                        {t('user.settings')}
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t py-1" style={{ borderColor: '#F1F5F9' }}>
                      <button
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <LogOut className="w-4 h-4" strokeWidth={1.5} />
                        {t('user.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
              end={item.to === '/app'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                  isActive ? 'bg-[#0B1A3A] text-white' : 'text-[#6B7280]'
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
