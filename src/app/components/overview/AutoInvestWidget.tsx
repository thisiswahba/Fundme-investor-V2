import { useState } from 'react';
import { Sparkles, Zap, Target, PieChart, Rocket, Settings2, PauseCircle } from 'lucide-react';
import { useI18n } from '../../i18n';
import { usePersona } from '../../demoPersona';
import { AutoInvestModal } from '../AutoInvestModal';

export function AutoInvestWidget() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const { personaId } = usePersona();
  const isVIP = personaId === 'vip';
  const [active, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: isAr ? 'تنفيذ تلقائي' : 'Hands-free execution',
      description: isAr ? 'استثمر دون تدخل يومي' : 'Invest without daily intervention',
      color: '#0D82F9',
      bgColor: 'rgba(13, 130, 249, 0.1)',
    },
    {
      icon: Target,
      title: isAr ? 'معايير مخصّصة' : 'Tailored criteria',
      description: isAr ? 'تحكّم بالمخاطرة والقطاع والمدّة' : 'Control risk, sector, and tenor',
      color: '#002E83',
      bgColor: 'rgba(0, 46, 131, 0.1)',
    },
    {
      icon: PieChart,
      title: isAr ? 'تنويع تلقائي' : 'Auto diversification',
      description: isAr ? 'يوزّع رأس المال على عدة فرص' : 'Spreads capital across deals',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
  ];

  // ── Active state ──
  if (active) {
    return (
      <>
        <div
          className="rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center"
          style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'rgba(16, 185, 129, 0.15)' }}
          >
            <Rocket className="w-7 h-7 text-[#10B981]" strokeWidth={2} />
          </div>
          <h3 className="text-[18px] text-[#0B1A3A] mb-2" style={{ fontWeight: 700 }}>
            {isAr ? 'الاستثمار التلقائي مفعّل' : 'Auto-Invest is active'}
          </h3>
          <p className="text-[13px] text-[#6B7280] mb-5 max-w-[260px] leading-relaxed">
            {isAr
              ? 'سيقوم النظام بالاستثمار نيابةً عنك حسب معاييرك'
              : "We'll invest on your behalf based on your criteria"}
          </p>
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Settings2 className="w-4 h-4" strokeWidth={2.5} />
              <span>{isAr ? 'تعديل الإعدادات' : 'Edit Settings'}</span>
            </button>
            <button
              onClick={() => setActive(false)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[12px] transition-colors"
              style={{ fontWeight: 500, color: '#6B7280', background: 'transparent' }}
            >
              <PauseCircle className="w-4 h-4" strokeWidth={1.8} />
              {isAr ? 'إيقاف' : 'Pause'}
            </button>
          </div>
        </div>
        <AutoInvestModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // ── Default state — same style as WelcomeGuideCard ──
  return (
    <>
      <div
        className="bg-white rounded-2xl p-6 h-full flex flex-col"
        style={{
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(13, 130, 249, 0.1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)' }}
          >
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-[17px] text-[#0B1A3A]" style={{ fontWeight: 700 }}>
              {isAr ? 'الاستثمار التلقائي' : 'Auto-Invest'}
            </h3>
            <p className="text-[12px] text-[#6B7280] mt-0.5">
              {isAr ? 'دع المنصّة تستثمر نيابةً عنك بذكاء' : 'Let the platform invest for you intelligently'}
            </p>
          </div>
        </div>

        {/* Tagline strip */}
        <div className="flex items-center gap-3 mt-4 mb-5">
          <div
            className="flex-1 h-[8px] rounded-full overflow-hidden"
            style={{ background: '#EDF0F7' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #002E83 0%, #0D82F9 60%, #10B981 100%)',
                opacity: 0.25,
              }}
            />
          </div>
          <span className="text-[11px] text-[#0D82F9] flex-shrink-0" style={{ fontWeight: 700 }}>
            {isAr ? 'موصى به' : 'Recommended'}
          </span>
        </div>

        {/* Features — styled like WelcomeGuide steps */}
        <div className="space-y-2.5 flex-1">
          {features.map((f, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl transition-all"
              style={{ background: '#F9FAFB', border: '1px solid transparent' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: f.bgColor }}
              >
                <f.icon className="w-4 h-4" style={{ color: f.color }} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] mb-0.5" style={{ fontWeight: 600, color: '#0B1A3A' }}>
                  {f.title}
                </h4>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => { setActive(true); setModalOpen(true); }}
          className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
          style={{
            background: isVIP
              ? 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)'
              : 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '0 8px 24px rgba(13, 130, 249, 0.3)',
          }}
        >
          <Sparkles className="w-4 h-4" strokeWidth={2.5} />
          <span>{isAr ? 'تفعيل الاستثمار التلقائي' : 'Enable Auto-Invest'}</span>
        </button>
      </div>

      <AutoInvestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
