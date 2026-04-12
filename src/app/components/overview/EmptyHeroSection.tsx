import { Wallet, ArrowRight, ArrowDownToLine } from 'lucide-react';
import { Link } from 'react-router';
import Component48Px from '../../../imports/48Px';

export function EmptyHeroSection() {
  return (
    <div
      className="relative rounded-[20px] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A2942 0%, #2D3E5F 50%, #1A2942 100%)',
      }}
    >
      {/* Large subtle circle outline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      />

      <div className="relative flex flex-col items-start gap-4 p-6 lg:p-8">
        {/* Wallet Icon + Label */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Wallet className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-[14px] text-white/80" style={{ fontWeight: 500 }}>
            المحفظة
          </span>
        </div>

        {/* Portfolio Value */}
        <div className="flex items-center gap-2.5" dir="ltr">
          <div className="w-[40px] h-[40px] flex-shrink-0">
            <Component48Px />
          </div>
          <div
            className="text-[56px] lg:text-[64px] leading-none text-white"
            style={{
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            2.300
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-1">
          <Link
            to="/wallet"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #80FF00 0%, #65CC00 100%)',
              color: '#002E83',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 8px 24px rgba(128, 255, 0, 0.3)',
            }}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            <span>إيداع في المحفظة</span>
          </Link>

          <button
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            <ArrowDownToLine className="w-4 h-4" strokeWidth={2.5} />
            <span>سحب من المحفظة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
