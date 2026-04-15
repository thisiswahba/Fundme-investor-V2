import { useState } from 'react';
import { Wallet, ArrowRight, ArrowDownToLine, X, Building2, CreditCard, ArrowUpFromLine } from 'lucide-react';
import { Link } from 'react-router';
import Component48Px from '../../../imports/48Px';
import { usePersona } from '../../demoPersona';
import { useI18n } from '../../i18n';
import { formatSAR } from '../../utils/currency';

/* ── Withdraw Modal ─────────────────────────── */

function WithdrawModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[440px] mx-4 rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}
        onClick={e => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header — gradient */}
        <div
          className="relative p-6 pb-8 text-center"
          style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0F2A4D 50%, #143766 100%)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <ArrowUpFromLine className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-[18px] text-white" style={{ fontWeight: 700 }}>
            {isAr ? 'سحب من المحفظة' : 'Withdraw Funds'}
          </h2>
          <p className="text-[12px] text-white/50 mt-1">
            {isAr ? 'اختر طريقة السحب المناسبة' : 'Choose your preferred withdrawal method'}
          </p>
        </div>

        {/* Options */}
        <div className="bg-white p-5 space-y-3">
          {/* Bank Transfer */}
          <button
            className="w-full flex items-center gap-4 p-4 rounded-xl text-right hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
            style={{ border: '1px solid #E8ECF2' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#EFF6FF' }}>
              <Building2 className="w-5 h-5 text-[#3B82F6]" strokeWidth={1.6} />
            </div>
            <div className="flex-1">
              <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                {isAr ? 'تحويل بنكي' : 'Bank Transfer'}
              </div>
              <div className="text-[12px] text-[#94A3B8] mt-0.5">
                {isAr ? 'يصل خلال ١-٣ يوم عمل' : 'Arrives in 1-3 business days'}
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md shrink-0" style={{ background: '#F0FDF4', color: '#2BB673', fontWeight: 600 }}>
              {isAr ? 'مجاني' : 'Free'}
            </span>
          </button>

          {/* Instant / Card */}
          <button
            className="w-full flex items-center gap-4 p-4 rounded-xl text-right hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
            style={{ border: '1px solid #E8ECF2' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#EFF6FF' }}>
              <CreditCard className="w-5 h-5 text-[#3B82F6]" strokeWidth={1.6} />
            </div>
            <div className="flex-1">
              <div className="text-[14px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                {isAr ? 'سحب فوري' : 'Instant Withdrawal'}
              </div>
              <div className="text-[12px] text-[#94A3B8] mt-0.5">
                {isAr ? 'إلى بطاقة الخصم — فوري' : 'To debit card — Instant'}
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md shrink-0" style={{ background: '#EFF6FF', color: '#3B82F6', fontWeight: 600 }}>
              {isAr ? 'فوري' : 'Instant'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Hero Section ───────────────────────────── */

export function EmptyHeroSection() {
  const { persona } = usePersona();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const walletDisplay = persona.wallet.total > 0
    ? formatSAR(persona.wallet.total)
    : '0';

  return (
    <>
      <div
        className="relative rounded-[20px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1F3A 0%, #0F2A4D 50%, #143766 100%)',
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
              {walletDisplay}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mt-1">
            <Link
              to="/app/wallet"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 whitespace-nowrap shrink-0"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
              }}
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              <span>إيداع في المحفظة</span>
            </Link>

            <button
              onClick={() => setWithdrawOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              <ArrowDownToLine className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>سحب من المحفظة</span>
            </button>
          </div>
        </div>
      </div>

      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </>
  );
}
