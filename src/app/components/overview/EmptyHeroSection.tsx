import { Wallet, ArrowRight, ArrowDownToLine } from 'lucide-react';
import { AbstractHeroIllustration } from './AbstractHeroIllustration';
import { Link } from 'react-router';
import Component48Px from '../../../imports/48Px';

export function EmptyHeroSection() {
  return (
    <div
      className="relative rounded-[24px] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A2942 0%, #2D3E5F 50%, #1A2942 100%)',
        minHeight: '340px',
      }}
    >
      {/* Abstract Illustration - Background */}
      <AbstractHeroIllustration />

      {/* Large subtle circle outline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      />

      {/* Right-aligned content block — using items-start because parent is RTL (start = right) */}
      <div className="relative flex flex-col items-start gap-5 p-8 lg:p-10">
        {/* Wallet Icon + Label */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <Wallet className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <span className="text-[15px] text-white/90" style={{ fontWeight: 500 }}>
            المحفظة
          </span>
        </div>

        {/* Large Portfolio Value */}
        <div className="flex items-center gap-3 mt-2" dir="ltr">
          <div className="w-[48px] h-[48px] flex-shrink-0">
            <Component48Px />
          </div>
          <div
            className="text-[72px] lg:text-[88px] leading-none text-white"
            style={{
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textShadow: '0 2px 20px rgba(0,0,0,0.1)',
            }}
          >
            2.300
          </div>
        </div>

        {/* CTA Buttons — green on right (start in RTL) */}
        <div className="flex gap-3 mt-2">
          <Link
            to="/wallet"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[14px] transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #80FF00 0%, #65CC00 100%)',
              color: '#002E83',
              fontWeight: 600,
              fontSize: '15px',
              boxShadow: '0 12px 32px rgba(128, 255, 0, 0.35)',
            }}
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            <span>إيداع في المحفظة</span>
          </Link>

          <button
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[14px] transition-all hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            <ArrowDownToLine className="w-5 h-5" strokeWidth={2.5} />
            <span>سحب من المحفظة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
