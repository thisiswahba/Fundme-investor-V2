import { useState } from 'react';
import { Wallet, ArrowRight, ArrowDownToLine } from 'lucide-react';
import Component48Px from '../../../imports/48Px';
import { usePersona } from '../../demoPersona';
import { useI18n } from '../../i18n';
import { formatSAR } from '../../utils/currency';
import { AddFundsModal } from '../AddFundsModal';
import { WithdrawModal } from '../WithdrawModal';
import { bankAccounts } from '../../utils/bankAccounts';

/* ── Hero Section ───────────────────────────── */

export function EmptyHeroSection() {
  const { persona } = usePersona();
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
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
              {isAr ? 'المحفظة' : 'Wallet'}
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
            <button
              onClick={() => setDepositOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
              }}
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              <span>{isAr ? 'إيداع في المحفظة' : 'Deposit to Wallet'}</span>
            </button>

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
              <span>{isAr ? 'سحب من المحفظة' : 'Withdraw from Wallet'}</span>
            </button>
          </div>
        </div>
      </div>

      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        availableBalance={persona.wallet.available}
        bankAccounts={bankAccounts}
      />
      <AddFundsModal open={depositOpen} onClose={() => setDepositOpen(false)} isAr={isAr} />
    </>
  );
}
