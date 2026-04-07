import { Wallet, ArrowRight, ArrowDownToLine } from 'lucide-react';
import { formatSAR } from '../../utils/currency';
import { AbstractHeroIllustration } from './AbstractHeroIllustration';
import { Link } from 'react-router';
import Component48Px from '../../../imports/48Px';

export function EmptyHeroSection() {
  return (
    <div 
      className="relative rounded-[24px] px-8 py-10 lg:px-16 lg:py-14 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A2942 0%, #2D3E5F 50%, #1A2942 100%)',
        minHeight: '420px',
      }}
    >
      {/* Abstract Illustration - Background */}
      <AbstractHeroIllustration />

      {/* Large subtle circle outline */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full" 
        style={{ 
          border: '1px solid rgba(255,255,255,0.08)',
        }} 
      />

      <div className="relative flex flex-col justify-between h-full" style={{ minHeight: '320px' }}>
        
        {/* Top Left: Wallet Icon + Label */}
        <div className="flex justify-start">
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <Wallet className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="text-[15px] text-white" style={{ fontWeight: 500, opacity: 0.9 }}>
                المحفظة
              </div>
            </div>
          </div>
        </div>

        {/* Center: Large Portfolio Value - Left Aligned */}
        <div className="flex items-center justify-start -mt-6">
          <div className="text-left flex items-center gap-4">
            <div 
              className="text-[80px] lg:text-[96px] leading-none text-white" 
              style={{ 
                fontWeight: 700, 
                letterSpacing: '-0.03em',
                textShadow: '0 2px 20px rgba(0,0,0,0.1)',
              }}
            >
              {(125000).toLocaleString('en-US')}
            </div>
            <div className="w-[48px] h-[48px] flex-shrink-0">
              <Component48Px />
            </div>
          </div>
        </div>

        {/* Bottom: CTA Buttons - Left Aligned */}
        <div className="flex justify-start gap-3">
          <Link
            to="/wallet"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[16px] transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #80FF00 0%, #65CC00 100%)',
              color: '#002E83',
              fontWeight: 600,
              fontSize: '16px',
              boxShadow: '0 12px 32px rgba(128, 255, 0, 0.35)',
            }}
          >
            <span>إيداع في المحفظة</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>

          <button
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[16px] transition-all hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            <span>سحب من المحفظة</span>
            <ArrowDownToLine className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}