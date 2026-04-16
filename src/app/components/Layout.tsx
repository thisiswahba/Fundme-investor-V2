import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Bell, User, ChevronDown, Settings, LogOut, UserCircle, Globe, Users, FlaskConical } from 'lucide-react';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';
import { useI18n } from '../i18n';
import { usePersona, type PersonaId } from '../demoPersona';

export function Layout() {
  const { lang, setLang, t, dir } = useI18n();
  const { persona, personaId, setPersonaId } = usePersona();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [personaSwitcherOpen, setPersonaSwitcherOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);

  const isAr = lang === 'ar';
  const userName = isAr ? persona.profile.nameAr : persona.profile.nameEn;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (personaRef.current && !personaRef.current.contains(e.target as Node)) {
        setPersonaSwitcherOpen(false);
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
    <div className="min-h-screen bg-[#06111F] fundme-dark" dir={dir}>
      {/* Top Navigation */}
      <nav className="border-b sticky top-0 z-50" style={{ background: '#08162A', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logoLight} alt="FundMe" className="h-14 w-auto" />
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
                        ? 'bg-white/10 text-white'
                        : 'text-white/40 hover:bg-white/[0.06] hover:text-white/70'
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
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] text-white/40 hover:bg-white/[0.06] transition-colors"
                style={{ fontWeight: 500, border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg transition-colors hover:bg-white/[0.06]">
                <Bell className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16A34A] rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-lg transition-colors hover:bg-white/[0.06]"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF]">
                    <User className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="hidden lg:block text-[14px] text-white/80" style={{ fontWeight: 500 }}>
                    {userName}
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
                      <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>{userName}</div>
                      <div className="text-[11px] text-[#94A3B8]">{persona.profile.email}</div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button
                        onClick={() => { setUserMenuOpen(false); navigate('/app/profile'); }}
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-2 py-2 z-50" style={{ background: '#08162A', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/40'
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

      {/* ─── Demo Persona Switcher (floating) ─── */}
      <div
        ref={personaRef}
        className="fixed bottom-6 z-[100] md:bottom-6"
        style={dir === 'rtl' ? { left: 24 } : { right: 24 }}
      >
        {/* Expanded panel */}
        {personaSwitcherOpen && (
          <div
            className="absolute bottom-14 w-[280px] rounded-2xl overflow-hidden mb-2"
            style={{
              background: 'white',
              boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #E5E7EB',
              ...(dir === 'rtl' ? { left: 0 } : { right: 0 }),
            }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: '#F1F5F9', background: '#F8FAFC' }}>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-3.5 h-3.5 text-[#6366F1]" strokeWidth={2} />
                <span className="text-[12px] text-[#334155]" style={{ fontWeight: 700 }}>
                  Demo Personas
                </span>
              </div>
            </div>
            <div className="p-2">
              {([
                { id: 'vip' as PersonaId, label: 'VIP Investor', labelAr: 'مستثمر VIP', desc: 'Premium dashboard, high-value portfolio, exclusive access', descAr: 'لوحة متميزة، محفظة عالية القيمة، وصول حصري', color: '#6366F1' },
                { id: 'completed' as PersonaId, label: 'Regular Investor', labelAr: 'مستثمر عادي', desc: 'Active portfolio, funded wallet, full data', descAr: 'محفظة نشطة، رصيد متوفر، بيانات كاملة', color: '#16A34A' },
                { id: 'new' as PersonaId, label: 'New Investor', labelAr: 'مستثمر جديد', desc: 'First login, empty state, guided onboarding', descAr: 'أول دخول، حالة فارغة، إعداد موجّه', color: '#3B82F6' },
              ]).map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPersonaId(p.id); setPersonaSwitcherOpen(false); }}
                  className="w-full flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer text-left"
                  style={{
                    background: personaId === p.id ? `${p.color}0D` : 'transparent',
                    border: personaId === p.id ? `1.5px solid ${p.color}30` : '1.5px solid transparent',
                  }}
                  dir={dir}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${p.color}15` }}
                  >
                    <Users className="w-4 h-4" style={{ color: p.color }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                      {isAr ? p.labelAr : p.label}
                    </div>
                    <div className="text-[11px] text-[#94A3B8] leading-relaxed mt-0.5">
                      {isAr ? p.descAr : p.desc}
                    </div>
                  </div>
                  {personaId === p.id && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ background: p.color }}
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setPersonaSwitcherOpen(!personaSwitcherOpen)}
          className="flex items-center gap-2 h-11 px-4 rounded-full transition-all hover:scale-105 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35), 0 2px 4px rgba(0,0,0,0.1)',
            color: 'white',
          }}
        >
          <FlaskConical className="w-4 h-4" strokeWidth={2} />
          <span className="text-[12px]" style={{ fontWeight: 600 }}>
            {personaId === 'vip' ? 'VIP' : personaId === 'completed' ? (isAr ? 'عادي' : 'Regular') : (isAr ? 'جديد' : 'New')}
          </span>
        </button>
      </div>
    </div>
  );
}
