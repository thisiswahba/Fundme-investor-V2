import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { useI18n } from '../../i18n';
import { AutoInvestModal } from '../AutoInvestModal';

function GraphIllustration({ active }: { active: boolean }) {
  const base = active ? '#059669' : '#2563EB';
  const accent = active ? '#34D399' : '#60A5FA';
  const node = '#FFFFFF';
  const id = active ? 'aiwLA' : 'aiwLI';

  return (
    <svg viewBox="0 0 280 130" fill="none" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={base} stopOpacity="0.18" />
          <stop offset="100%" stopColor={base} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Dot grid */}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 14 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="0.8" fill={base} opacity="0.08" />
        ))
      )}

      {/* Area fill under graph */}
      <polygon points="40,100 70,90 100,76 135,58 165,48 200,32 240,22 240,118 40,118" fill={`url(#${id}-fill)`} opacity="0.85" />

      {/* Dashed flow path — animated */}
      <path
        d="M30 95 Q70 95 90 70 T140 55 T200 75"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="5 4"
        fill="none"
        opacity="0.45"
        style={{ animation: 'aiwDash 3s linear infinite' }}
      />

      {/* Main rising trend line */}
      <polyline
        points="40,100 70,90 100,76 135,58 165,48 200,32 240,22"
        stroke={base}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* End nodes */}
      <circle cx="70" cy="90" r="5" fill={node} stroke={base} strokeWidth="1.8" />
      <circle cx="200" cy="32" r="5" fill={node} stroke={accent} strokeWidth="1.8" />

      {/* Center node with play */}
      <circle cx="135" cy="58" r="11" fill={base} fillOpacity="0.12" stroke={base} strokeWidth="1" opacity="0.7" />
      <circle cx="135" cy="58" r="6" fill={node} stroke={base} strokeWidth="2" />
      <polygon points="133,55 133,61 138,58" fill={base} />

      {/* Pulse rings on the latest node — active only */}
      {active && (
        <>
          <circle cx="200" cy="32" r="9" stroke={accent} strokeWidth="1" fill="none" style={{ animation: 'aiwPulse 2s ease-out infinite' }} />
          <circle cx="200" cy="32" r="13" stroke={accent} strokeWidth="0.7" fill="none" style={{ animation: 'aiwPulse 2s ease-out infinite', animationDelay: '0.5s' }} />
        </>
      )}
    </svg>
  );
}

export function AutoInvestWidget() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const [active, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverCta, setHoverCta] = useState(false);

  const accent = active ? '#059669' : '#2563EB';
  const accentSoft = active ? '#ECFDF5' : '#EFF6FF';
  const accentBorder = active ? '#BBF7D0' : '#DBEAFE';

  return (
    <>
      <style>{`
        @keyframes aiwDash{to{stroke-dashoffset:-32}}
        @keyframes aiwPulse{0%{r:9;opacity:0.45}100%{r:20;opacity:0}}
        @keyframes aiwFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: '#FFFFFF',
          border: `1px solid ${accentBorder}`,
          boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(37,99,235,0.08)',
          animation: 'aiwFadeIn 0.5s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Soft brand glow corners */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: active
              ? 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 65%)',
            filter: 'blur(28px)',
          }}
        />

        {/* Active pill — only shown when active */}
        {active && (
          <div className="relative px-5 pt-5 flex items-start justify-end">
            <span
              className="inline-flex items-center gap-1 h-6 px-2 rounded-md text-[10px] tracking-wide shrink-0"
              style={{
                fontWeight: 700,
                background: '#ECFDF5',
                color: '#059669',
                border: '1px solid #BBF7D0',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              {isAr ? 'مفعّل' : 'ACTIVE'}
            </span>
          </div>
        )}

        {/* Title block */}
        <div className={`relative px-5 ${active ? 'pt-3' : 'pt-5'}`}>
          <h3 className="text-[18px] mb-1.5" style={{ fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>
            {isAr ? 'الاستثمار التلقائي' : 'Auto-Invest'}
          </h3>
          {active ? (
            <p className="text-[12.5px] leading-relaxed" style={{ color: '#64748B' }}>
              {isAr
                ? 'النظام يستثمر تلقائيًا في الفرص المناسبة لمعاييرك'
                : 'The system is auto-investing in opportunities that match your criteria'}
            </p>
          ) : (
            <>
              <p className="text-[12.5px] leading-relaxed mb-2.5" style={{ color: '#64748B' }}>
                {isAr
                  ? 'حدد معاييرك ودع النظام يستثمر تلقائيًا في الفرص المناسبة لك'
                  : 'Set your criteria and let the system auto-invest in matching opportunities'}
              </p>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: '#94A3B8' }}>
                <span>{isAr ? 'بدون رسوم إضافية' : 'No extra fees'}</span>
                <span className="w-[3px] h-[3px] rounded-full" style={{ background: '#CBD5E1' }} />
                <span>{isAr ? 'تحكم كامل' : 'Full control'}</span>
              </div>
            </>
          )}
        </div>

        {/* Illustration — fills middle */}
        <div className="relative flex-1 min-h-[120px] flex items-center justify-center px-5 my-3">
          <GraphIllustration active={active} />
        </div>

        {/* Active stats row */}
        {active && (
          <div className="relative px-5 mb-3">
            <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #EEF1F5' }}>
              <div>
                <div className="text-[10px] uppercase mb-0.5" style={{ fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em' }}>
                  {isAr ? 'تنفيذات' : 'Runs'}
                </div>
                <div className="text-[15px] font-mono tabular-nums" style={{ fontWeight: 700, color: '#059669' }}>12</div>
              </div>
              <div className="w-px h-8" style={{ background: '#EEF1F5' }} />
              <div className="text-right">
                <div className="text-[10px] uppercase mb-0.5" style={{ fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em' }}>
                  {isAr ? 'آخر تنفيذ' : 'Last run'}
                </div>
                <div className="text-[12px]" style={{ fontWeight: 600, color: '#0F172A' }}>{isAr ? 'قبل 3 ساعات' : '3h ago'}</div>
              </div>
            </div>
          </div>
        )}

        {/* CTA pinned to bottom */}
        <div className="relative px-5 pb-5">
          {active ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalOpen(true)}
                onMouseEnter={() => setHoverCta(true)}
                onMouseLeave={() => setHoverCta(false)}
                className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-[13px] cursor-pointer transition-all"
                style={{
                  fontWeight: 700,
                  color: accent,
                  background: hoverCta ? '#D1FAE5' : accentSoft,
                  border: `1px solid ${accentBorder}`,
                }}
              >
                <Settings2 className="w-4 h-4" strokeWidth={2} />
                {isAr ? 'تعديل الإعدادات' : 'Edit Settings'}
              </button>
              <button
                onClick={() => setActive(false)}
                className="h-11 px-3 rounded-xl text-[12px] cursor-pointer transition-colors"
                style={{ fontWeight: 500, color: '#94A3B8', background: 'transparent' }}
              >
                {isAr ? 'إيقاف' : 'Pause'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setActive(true); setModalOpen(true); }}
              onMouseEnter={() => setHoverCta(true)}
              onMouseLeave={() => setHoverCta(false)}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-[14px] cursor-pointer transition-all"
              style={{
                fontWeight: 600,
                color: '#1D4ED8',
                background: hoverCta ? '#EFF6FF' : '#FFFFFF',
                border: '1px solid #DBEAFE',
              }}
            >
              {isAr ? 'تفعيل الاستثمار التلقائي' : 'Activate Auto-Invest'}
            </button>
          )}
        </div>
      </div>

      <AutoInvestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
