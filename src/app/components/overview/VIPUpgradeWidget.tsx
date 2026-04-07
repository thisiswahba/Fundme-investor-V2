import { Crown, Sparkles, Zap } from 'lucide-react';

export function VIPUpgradeWidget() {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-10 lg:p-[40px]"
      style={{
        background: 'linear-gradient(167.659deg, rgb(0, 26, 77) 0%, rgb(0, 46, 131) 50%, rgb(0, 58, 153) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Subtle background glow effects */}
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(106, 88, 28, 0.2) 35%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(13, 130, 249, 0.5) 0%, rgba(10, 98, 187, 0.375) 17.5%, rgba(7, 65, 125, 0.25) 35%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex items-center gap-8 lg:gap-12">
        {/* LEFT: Golden CTA Button (RTL) */}
        <div className="flex-shrink-0 order-1">
          <button
            className="group inline-flex items-center justify-center gap-2.5 h-[53px] px-7 rounded-[14px] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(158.334deg, rgb(212, 175, 55) 0%, rgb(255, 215, 0) 100%)',
              color: '#002E83',
              fontWeight: 700,
              fontSize: '14px',
              boxShadow: '0 12px 32px rgba(212, 175, 55, 0.4)',
            }}
          >
            <span>ترقية الآن</span>
            <Zap
              className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
              strokeWidth={2.5}
              fill="currentColor"
            />
          </button>
        </div>

        {/* CENTER: Content (RTL) */}
        <div className="flex-1 order-2 text-right">
          {/* Title with sparkle icon */}
          <div className="flex items-center justify-end gap-2 mb-2.5">
            <h3
              className="text-[26px] leading-[32.5px]"
              style={{
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '-0.26px',
              }}
            >
              كن مستثمر VIP
            </h3>
            <Sparkles
              className="w-5 h-5 opacity-70"
              strokeWidth={2}
              style={{ color: '#D4AF37' }}
            />
          </div>

          {/* Description */}
          <p
            className="text-[14px] mb-5 opacity-90"
            style={{
              color: '#FFFFFF',
              fontWeight: 400,
              lineHeight: '22.4px',
            }}
          >
            انضم لنخبة المستثمرين واحصل على امتيازات حصرية
          </p>

          {/* Benefits - 3 bullets with 6px gold dots */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-end gap-[10px]">
              <span
                className="text-[14px] leading-[21px]"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 500,
                }}
              >
                فرص استثمارية حصرية
              </span>
              <div
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ backgroundColor: '#D4AF37' }}
              />
            </div>
            <div className="flex items-center justify-end gap-[10px]">
              <span
                className="text-[14px] leading-[21px]"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 500,
                }}
              >
                عوائد أعلى ومميزة
              </span>
              <div
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ backgroundColor: '#D4AF37' }}
              />
            </div>
            <div className="flex items-center justify-end gap-[10px]">
              <span
                className="text-[14px] leading-[21px]"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 500,
                }}
              >
                أولوية في الوصول للفرص
              </span>
              <div
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ backgroundColor: '#D4AF37' }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: VIP Crown Badge with Glow (RTL) */}
        <div className="flex-shrink-0 hidden sm:flex items-center justify-center order-3">
          <div className="relative w-[96px] h-[96px]">
            {/* Glow effect with blur */}
            <div
              className="absolute inset-0 rounded-full blur-[24px] opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, rgba(159, 131, 41, 0.45) 17.5%, rgba(106, 88, 28, 0.3) 35%, rgba(53, 44, 14, 0.15) 52.5%, transparent 70%)',
                transform: 'scale(1.3)',
              }}
            />
            {/* VIP Crown Badge */}
            <div
              className="relative w-[96px] h-[96px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(255, 223, 127, 0.1) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.25)',
              }}
            >
              <Crown
                className="w-12 h-12"
                strokeWidth={2}
                style={{ color: '#D4AF37' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}