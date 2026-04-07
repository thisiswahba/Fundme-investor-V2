import { Crown, Sparkles, Zap } from 'lucide-react';

export function VIPUpgradeWidget() {
  return (
    <div
      className="relative overflow-hidden rounded-[20px]"
      style={{
        background: 'linear-gradient(167.66deg, rgb(0, 26, 77) 0%, rgb(0, 46, 131) 50%, rgb(0, 58, 153) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Background effects */}
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(106, 88, 28, 0.2) 35%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(13, 130, 249, 0.5) 0%, rgba(7, 65, 125, 0.25) 35%, transparent 70%)',
        }}
      />
      {/* Subtle pattern circles */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
        <circle cx="85%" cy="50%" r="120" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="85%" cy="50%" r="80" stroke="white" strokeWidth="0.5" fill="none" />
      </svg>

      {/* 2-column RTL layout */}
      <div className="relative z-10 flex items-center gap-8 lg:gap-12 px-8 py-8 lg:px-10 lg:py-9">

        {/* RIGHT: Content — first in DOM = right in RTL */}
        <div className="flex-1 flex items-center gap-6">
          {/* Crown — integrated next to text, not floating */}
          <div className="flex-shrink-0 hidden sm:block">
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 223, 127, 0.08) 100%)',
                border: '1.5px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <Crown className="w-9 h-9" strokeWidth={1.5} style={{ color: '#D4AF37' }} />
            </div>
          </div>

          <div>
            {/* Title */}
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-5 h-5" strokeWidth={2} style={{ color: '#D4AF37' }} />
              <h3 className="text-[22px] lg:text-[26px] leading-tight font-bold text-white tracking-[-0.26px]">
                كن مستثمر VIP
              </h3>
            </div>

            {/* Subtitle */}
            <p className="text-[13px] text-white/60 mb-3">
              امتيازات حصرية لنخبة المستثمرين
            </p>

            {/* Benefits — short, compact */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {['فرص حصرية', 'عوائد أعلى', 'أولوية الوصول'].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#D4AF37]" />
                  <span className="text-[13px] text-white/90" style={{ fontWeight: 500 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEFT: CTA — last in DOM = left in RTL */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 h-[48px] px-7 rounded-[12px] transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(158.33deg, rgb(212, 175, 55) 0%, rgb(255, 215, 0) 100%)',
              color: '#002E83',
              fontWeight: 700,
              fontSize: '14px',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
            }}
          >
            <span>ترقية الآن</span>
            <Zap className="w-4 h-4" strokeWidth={2.5} fill="currentColor" />
          </button>
          <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>
            يستغرق أقل من دقيقة
          </span>
        </div>
      </div>
    </div>
  );
}
