import { useState, useEffect } from 'react';
import { formatSAR, formatPercentage } from '../../utils/currency';
import { ArrowLeft, Bell, CheckCircle, Clock } from 'lucide-react';

interface OpportunityCardCompactProps {
  borrowerName: string;
  opportunityId: string;
  financingType: string;
  risk: 'A' | 'B' | 'C' | 'D' | 'E';
  netReturn?: number;
  roi?: number;
  tenor: string;
  fundingProgress: number;
  totalAmount: number;
  fundedAmount: number;
  categoryIcon?: 'invoice' | 'capital' | 'equipment' | 'expansion' | 'food' | 'innovation';
  gradientTone?: string;
  comingSoon?: boolean;
  launchLabel?: string;
  launchDate?: string;
  patternIndex?: number;
  onClick?: () => void;
}

/* ── SVG Pattern Overlays ── */

function Pattern1() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="p1g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#22D3EE" /></linearGradient>
      </defs>
      <path d="M0 120 Q80 60 160 90 T320 50 T400 80" stroke="url(#p1g)" strokeWidth="1.2" />
      <path d="M0 140 Q100 100 200 110 T400 70" stroke="url(#p1g)" strokeWidth="0.8" />
      <rect x="280" y="20" width="36" height="24" rx="8" stroke="url(#p1g)" strokeWidth="0.8" />
      <rect x="320" y="35" width="28" height="18" rx="6" stroke="url(#p1g)" strokeWidth="0.6" />
      <circle cx="60" cy="30" r="2" fill="#60A5FA" opacity="0.6" /><circle cx="75" cy="25" r="1.5" fill="#60A5FA" opacity="0.4" /><circle cx="50" cy="40" r="1" fill="#22D3EE" opacity="0.5" />
      <circle cx="340" cy="90" r="18" stroke="url(#p1g)" strokeWidth="0.6" /><circle cx="340" cy="90" r="28" stroke="url(#p1g)" strokeWidth="0.4" />
    </svg>
  );
}

function Pattern2() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="p2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818CF8" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
      </defs>
      <circle cx="80" cy="60" r="35" stroke="url(#p2g)" strokeWidth="0.8" /><circle cx="100" cy="50" r="22" stroke="url(#p2g)" strokeWidth="0.6" /><circle cx="60" cy="80" r="15" stroke="url(#p2g)" strokeWidth="0.5" />
      <path d="M200 30 Q250 10 300 50 T400 30" stroke="url(#p2g)" strokeWidth="0.8" />
      <rect x="290" y="60" width="30" height="30" rx="4" stroke="url(#p2g)" strokeWidth="0.7" transform="rotate(45 305 75)" />
      <circle cx="180" cy="120" r="1.5" fill="#818CF8" opacity="0.5" /><circle cx="200" cy="110" r="1" fill="#3B82F6" opacity="0.4" /><circle cx="160" cy="130" r="2" fill="#818CF8" opacity="0.3" />
    </svg>
  );
}

function Pattern3() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }} viewBox="0 0 400 160" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="p3g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#34D399" /></linearGradient>
      </defs>
      {/* Dot grid */}
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 15 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={20 + c * 26} cy={15 + r * 18} r="0.8" fill="#22D3EE" opacity="0.35" />
        ))
      )}
      {/* Hexagons */}
      <polygon points="320,40 335,32 350,40 350,56 335,64 320,56" stroke="url(#p3g)" strokeWidth="0.7" />
      <polygon points="345,55 360,47 375,55 375,71 360,79 345,71" stroke="url(#p3g)" strokeWidth="0.5" />
      {/* Angular lines */}
      <path d="M40 130 L80 100 L130 120 L170 90" stroke="url(#p3g)" strokeWidth="0.8" />
      <rect x="60" y="30" width="16" height="16" rx="2" stroke="url(#p3g)" strokeWidth="0.6" transform="rotate(30 68 38)" />
    </svg>
  );
}

const patterns = [Pattern1, Pattern2, Pattern3];

/* ── Risk Config ── */

const riskConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  A: { label: 'A · منخفض جداً', color: '#2BB673', bg: '#F0FDF4', border: '#BBF7D0' },
  B: { label: 'B · منخفض', color: '#2BB673', bg: '#F0FDF4', border: '#BBF7D0' },
  C: { label: 'C · متوسط', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  D: { label: 'D · مرتفع', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
  E: { label: 'E · مرتفع جداً', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
};

/* ── Card Component ── */

export function OpportunityCardCompact({
  borrowerName,
  opportunityId,
  financingType,
  risk,
  netReturn,
  roi,
  tenor,
  fundingProgress,
  totalAmount,
  fundedAmount,
  comingSoon = false,
  launchLabel,
  launchDate,
  patternIndex,
  onClick,
}: OpportunityCardCompactProps) {
  const returnValue = netReturn || roi || 0;
  const [notified, setNotified] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const rk = riskConfig[risk] || riskConfig.B;

  // Pick pattern by index or hash from ID
  const pIdx = patternIndex ?? (opportunityId.charCodeAt(opportunityId.length - 1) % 3);
  const PatternSVG = patterns[pIdx];

  // Animate progress bar on mount
  useEffect(() => {
    if (!comingSoon) {
      const timer = setTimeout(() => setAnimatedProgress(fundingProgress), 100);
      return () => clearTimeout(timer);
    }
  }, [fundingProgress, comingSoon]);

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        border: '1px solid #E8ECF2',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)'; }}
    >
      {/* ── Cover Area (160px) ── */}
      <div className="relative h-[160px] overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3F73 50%, #2563EB 100%)' }}>
        <PatternSVG />

        <div className="relative z-10 flex flex-col justify-between h-full p-4">
          {/* Top: Return + Badge */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[32px] text-white leading-none" style={{ fontWeight: 700 }}>
                {formatPercentage(returnValue)}
              </div>
              <div className="text-[10px] text-white/50 mt-1" style={{ fontWeight: 500 }}>صافي العائد</div>
            </div>
            {comingSoon ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 600, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                قريباً
              </div>
            ) : (
              <span className="text-[10px] text-white/30 font-mono" style={{ fontWeight: 500 }}>{opportunityId}</span>
            )}
          </div>

          {/* Bottom: Company name + ID */}
          <div>
            <div className="text-[15px] text-white leading-snug" style={{ fontWeight: 700 }}>{borrowerName}</div>
            <div className="text-[9px] text-white/30 mt-0.5 font-mono">{opportunityId}</div>
          </div>
        </div>
      </div>

      {/* ── White Body ── */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Pills row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]"
            style={{ background: rk.bg, color: rk.color, border: `1px solid ${rk.border}`, fontWeight: 600 }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: rk.color }} />
            {rk.label}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] text-[#64748B]" style={{ background: '#F8FAFC', border: '1px solid #E8ECF2', fontWeight: 500 }}>
            {financingType}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] text-[#64748B]" style={{ background: '#F8FAFC', border: '1px solid #E8ECF2', fontWeight: 500 }}>
            {tenor}
          </span>
        </div>

        {/* Bottom section */}
        <div className="mt-auto">
          {comingSoon ? (
            /* ── Coming Soon ── */
            <>
              <div className="rounded-xl p-3 mb-3" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B]" style={{ fontWeight: 500 }}>يفتح خلال</span>
                  <span className="text-[20px] text-[#0F172A]" style={{ fontWeight: 700 }}>
                    {launchLabel?.replace('يفتح خلال ', '') || '5 أيام'}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setNotified(true); }}
                className="w-full h-10 rounded-xl text-[12px] flex items-center justify-center gap-1.5 transition-all"
                style={{
                  fontWeight: 600,
                  ...(notified
                    ? { background: '#F0FDF4', color: '#2BB673', border: '1px solid #BBF7D0' }
                    : { background: 'transparent', color: '#6366F1', border: '1px solid #C7D2FE' }),
                }}
                disabled={notified}
              >
                {notified ? (
                  <><CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />تم تفعيل التنبيه</>
                ) : (
                  <><Bell className="w-3.5 h-3.5" strokeWidth={2} />أشعرني عند الإطلاق</>
                )}
              </button>
            </>
          ) : (
            /* ── Active Funding ── */
            <>
              {/* Funded + percentage */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-[11px] text-[#94A3B8]">
                  <span className="text-[18px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(fundedAmount, { decimals: 0 })}</span>
                  <span className="mx-1">/</span>
                  {formatSAR(totalAmount, { decimals: 0 })} ر.س
                </div>
                <span className="text-[14px] text-[#14B8A6] font-mono" style={{ fontWeight: 600 }}>{fundingProgress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[7px] rounded-full overflow-hidden mb-3" style={{ background: '#F1F5F9' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${animatedProgress}%`,
                    background: 'linear-gradient(90deg, #1A3F73, #0891b2)',
                    transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>

              {/* CTA */}
              <button
                className="w-full h-10 rounded-xl text-[12px] text-white flex items-center justify-center gap-1.5 transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3F73 100%)',
                  fontWeight: 600,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                عرض التفاصيل
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
