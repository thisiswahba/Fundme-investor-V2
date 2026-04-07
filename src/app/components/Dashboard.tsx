import { Bell, Wallet, ArrowLeftRight, TrendingUp, FileText, Home, BarChart3, CreditCard, FileBarChart, User, ArrowDownToLine, Building2, Briefcase, Database } from 'lucide-react';
import { PortfolioCard } from './PortfolioCard';
import { QuickActions } from './QuickActions';
import { PerformanceChart } from './PerformanceChart';
import { InvestmentsList } from './InvestmentsList';
import { TransactionsList } from './TransactionsList';
import { SmartInsight } from './SmartInsight';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';
import fundmeLogo from 'figma:asset/6b8eb299ed24c5060e85849675d69a160839c7b3.png';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex" dir="rtl">
      {/* Side Navigation - Desktop Only */}
      <SideNav />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <nav className="bg-white border-b border-[#E8ECF2] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo - Mobile/Tablet Only */}
              <div className="flex lg:hidden items-center gap-3">
                <img 
                  src={fundmeLogo} 
                  alt="فند مي" 
                  className="h-8 w-auto"
                />
                <div className="text-[12px] text-[#8896AD] hidden sm:block">
                  نمو موثوق
                </div>
              </div>

              {/* Title - Desktop Only */}
              <div className="hidden lg:block text-[20px] text-[#002E83]" style={{ fontWeight: 600 }}>
                لوحة التحكم
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-1 text-[14px] text-[#002E83]" style={{ fontWeight: 500 }}>
                  مرحباً، أحمد 👋
                </div>
                <button className="relative p-2 hover:bg-[#EAF0FA] rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-[#002E83]" strokeWidth={2} />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#80FF00] rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Greeting Section - Mobile Only */}
          <div className="mb-6 md:hidden">
            <div className="text-[20px] text-[#002E83] mb-1" style={{ fontWeight: 600 }}>
              مرحباً، أحمد 👋
            </div>
            <div className="text-[14px] text-[#8896AD]">
              نظرة عامة على محفظتك
            </div>
          </div>

          {/* Hero Section: Portfolio Card */}
          <div className="mb-8">
            <PortfolioCard />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Performance Chart + Smart Insight */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            <div className="lg:col-span-1">
              <SmartInsight />
            </div>
          </div>

          {/* Bottom Section: Investments + Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Investments */}
            <div>
              <InvestmentsList />
            </div>

            {/* Recent Transactions */}
            <div>
              <TransactionsList />
            </div>
          </div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}