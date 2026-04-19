import { useState, useEffect } from 'react';
import { X, Building2, Clock, CheckCircle, ArrowDownToLine, Check } from 'lucide-react';
import { useI18n } from '../i18n';
import { formatSAR } from '../utils/currency';

interface BankAccount {
  id: number;
  bank: string;
  bankEn: string;
  iban: string;
  primary: boolean;
}

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  availableBalance: number;
  bankAccounts: BankAccount[];
}

export function WithdrawModal({ open, onClose, availableBalance, bankAccounts }: WithdrawModalProps) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';

  const primaryAccount = bankAccounts.find(a => a.primary) || bankAccounts[0];
  const [amount, setAmount] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<number>(primaryAccount?.id ?? 0);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount('');
      setSelectedAccountId(primaryAccount?.id ?? 0);
      setConfirmed(false);
      setSubmitting(false);
      setSuccess(false);
    }
  }, [open, primaryAccount?.id]);

  const parsedAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10) || 0;
  const selectedAccount = bankAccounts.find(a => a.id === selectedAccountId) || primaryAccount;
  const MIN = 100;
  const tooLow = parsedAmount > 0 && parsedAmount < MIN;
  const insufficient = parsedAmount > availableBalance;
  const valid = parsedAmount >= MIN && !insufficient && !!selectedAccount && confirmed;

  const quickAmounts = [500, 1000, 5000];

  const handleSubmit = () => {
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget && !submitting) onClose(); }}
    >
      <div
        className="bg-white w-full max-w-[500px] rounded-[20px] overflow-hidden"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
        dir={isAr ? 'rtl' : 'ltr'}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Dark Header (matches Add Funds) ── */}
        <div className="relative h-[100px] overflow-hidden shrink-0" style={{ background: 'linear-gradient(155deg, #0B1F3A 0%, #143766 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full opacity-[0.06]" style={{ backgroundColor: '#fff' }} />
            <div className="absolute bottom-[-15px] right-[-10px] w-32 h-32 rounded-full opacity-[0.04]" style={{ backgroundColor: '#fff' }} />
          </div>
          <div className="relative flex flex-col items-center justify-center h-full">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <ArrowDownToLine className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-[14px] text-white" style={{ fontWeight: 600 }}>
              {success
                ? (isAr ? 'تم تقديم الطلب' : 'Withdrawal Requested')
                : (isAr ? 'سحب الأموال' : 'Withdraw Funds')}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-4 h-4 text-white/70" strokeWidth={1.5} />
          </button>
        </div>

        {success ? (
          /* ── Success ── */
          <div className="px-6 py-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#F0FDF4' }}
            >
              <CheckCircle className="w-8 h-8 text-[#16A34A]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[20px] text-[#0F172A] mb-2" style={{ fontWeight: 700 }}>
              {isAr ? 'تم تقديم طلب السحب' : 'Withdrawal Requested'}
            </h3>
            <p className="text-[14px] text-[#64748B] leading-relaxed mb-6">
              {isAr
                ? 'تم تقديم طلب السحب بنجاح. سيتم تحويل المبلغ خلال ١-٣ أيام عمل.'
                : 'Your withdrawal request has been submitted. Funds will be transferred within 1-3 business days.'}
            </p>

            {/* Summary */}
            <div className="rounded-[14px] overflow-hidden mb-6" style={{ border: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #F8FAFC' }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F8FAFC' }}>
                  <ArrowDownToLine className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{isAr ? 'المبلغ' : 'Amount'}</div>
                  <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {formatSAR(parsedAmount, { decimals: 0 })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F8FAFC' }}>
                  <Building2 className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{isAr ? 'إلى' : 'To'}</div>
                  <div className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                    {isAr ? selectedAccount?.bank : selectedAccount?.bankEn}{' '}
                    <span className="text-[11px] text-[#94A3B8] font-mono" dir="ltr">•••• {selectedAccount?.iban.slice(-4)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full h-12 rounded-[12px] text-[14px] text-white active:scale-[0.98] transition-all"
              style={{ backgroundColor: '#1D4ED8', fontWeight: 600 }}
            >
              {isAr ? 'تم' : 'Done'}
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <div className="px-6 py-6 overflow-y-auto" style={{ flex: 1 }}>
              <p className="text-[12px] text-[#64748B] mb-4">
                {isAr ? 'أدخل المبلغ واختر الحساب البنكي للتحويل' : 'Enter the amount and choose a bank account to transfer to'}
              </p>

              {/* Available balance (top summary row) */}
              <div className="rounded-[14px] overflow-hidden mb-5" style={{ border: '1px solid #E5E7EB' }}>
                <div className="flex items-center gap-3 px-4 py-3.5" style={{ backgroundColor: '#F8FAFC' }}>
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EFF6FF' }}>
                    <ArrowDownToLine className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                      {isAr ? 'الرصيد المتاح' : 'Available Balance'}
                    </div>
                    <div className="text-[16px] text-[#0F172A]" style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                      {formatSAR(availableBalance)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <label className="text-[12px] text-[#64748B] mb-2 block" style={{ fontWeight: 500 }}>
                {isAr ? 'مبلغ السحب (ريال)' : 'Withdrawal Amount (SAR)'}
              </label>
              <div className="relative mb-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={isAr ? 'أدخل المبلغ' : 'Enter amount'}
                  className="w-full h-14 px-5 rounded-[14px] text-[22px] text-[#0F172A] outline-none transition-all duration-200 placeholder:text-[#E2E8F0] placeholder:text-[15px]"
                  style={{ fontWeight: 700, border: `1.5px solid ${insufficient || tooLow ? '#DC2626' : '#E5E7EB'}` }}
                  onFocus={e => {
                    if (!insufficient && !tooLow) {
                      e.currentTarget.style.borderColor = '#1D4ED8';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(29,78,216,0.06)';
                    }
                  }}
                  onBlur={e => {
                    if (!insufficient && !tooLow) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[13px] text-[#CBD5E1]" style={{ fontWeight: 500 }}>﷼</span>
              </div>

              {/* Quick chips */}
              <div className="flex items-center gap-1.5 mb-2">
                {quickAmounts.filter(q => q <= availableBalance).map(v => {
                  const active = parsedAmount === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setAmount(String(v))}
                      className="h-7 px-3 rounded-md text-[11px] transition-all active:scale-95"
                      style={{
                        fontWeight: 600,
                        backgroundColor: active ? '#0F172A' : '#F8FAFC',
                        color: active ? '#fff' : '#94A3B8',
                        border: active ? 'none' : '1px solid #F1F5F9',
                      }}
                    >
                      {v.toLocaleString()}
                    </button>
                  );
                })}
                <button
                  onClick={() => setAmount(String(availableBalance))}
                  className="h-7 px-3 rounded-md text-[11px] transition-all active:scale-95"
                  style={{
                    fontWeight: 600,
                    backgroundColor: parsedAmount === availableBalance ? '#0F172A' : '#F8FAFC',
                    color: parsedAmount === availableBalance ? '#fff' : '#94A3B8',
                    border: parsedAmount === availableBalance ? 'none' : '1px solid #F1F5F9',
                  }}
                >
                  {isAr ? 'الحد الأقصى' : 'Max'}
                </button>
              </div>

              {/* Helper / error */}
              <div className="mb-5 min-h-[16px] text-[11px]" style={{ fontWeight: 500 }}>
                {insufficient ? (
                  <span className="text-[#DC2626]">{isAr ? 'المبلغ يتجاوز الرصيد المتاح' : 'Amount exceeds available balance'}</span>
                ) : tooLow ? (
                  <span className="text-[#DC2626]">{isAr ? `الحد الأدنى ${MIN} ر.س` : `Minimum ${MIN} SAR`}</span>
                ) : (
                  <span className="text-[#CBD5E1]">{isAr ? `الحد الأدنى ١٠٠ ريال` : `Minimum 100 SAR`}</span>
                )}
              </div>

              {/* Bank account selector — styled like the deposit info list */}
              <label className="text-[12px] text-[#64748B] mb-2 block" style={{ fontWeight: 500 }}>
                {isAr ? 'تحويل إلى' : 'Transfer To'}
              </label>
              <div className="rounded-[14px] overflow-hidden mb-5" style={{ border: '1px solid #E5E7EB' }}>
                {bankAccounts.map((acc, i, arr) => {
                  const selected = selectedAccountId === acc.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => setSelectedAccountId(acc.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
                      style={{
                        borderBottom: i < arr.length - 1 ? '1px solid #F8FAFC' : 'none',
                        backgroundColor: selected ? '#EFF6FF' : '#fff',
                        textAlign: isAr ? 'right' : 'left',
                      }}
                      onMouseEnter={e => { if (!selected) e.currentTarget.style.backgroundColor = '#FAFBFC'; }}
                      onMouseLeave={e => { if (!selected) e.currentTarget.style.backgroundColor = '#fff'; }}
                    >
                      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: selected ? '#DBEAFE' : '#F8FAFC' }}>
                        <Building2 className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: selected ? '#1D4ED8' : '#64748B' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                            {isAr ? acc.bank : acc.bankEn}
                          </div>
                          {acc.primary && (
                            <span className="text-[9px] px-1.5 py-px rounded" style={{ backgroundColor: selected ? '#DBEAFE' : '#EFF6FF', color: '#1D4ED8', fontWeight: 700 }}>
                              {isAr ? 'أساسي' : 'Primary'}
                            </span>
                          )}
                        </div>
                        <div className="text-[13px] text-[#0F172A] font-mono tracking-wide" style={{ fontWeight: 600 }} dir="ltr">
                          {acc.iban}
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{
                        background: selected ? '#1D4ED8' : 'transparent',
                        border: selected ? 'none' : '2px solid #CBD5E1',
                      }}>
                        {selected && <div className="w-2 h-2 rounded-full" style={{ background: '#fff' }} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Info note (amber, matches the deposit warning style) */}
              <div className="flex items-start gap-2 p-3 rounded-[10px] mb-5" style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Clock className="w-4 h-4 text-[#1D4ED8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[11px] text-[#0F172A] leading-relaxed" style={{ fontWeight: 500 }}>
                  {isAr
                    ? 'عادةً ما تتم معالجة عمليات السحب خلال ١-٣ أيام عمل.'
                    : 'Withdrawals are typically processed within 1-3 business days.'}
                </p>
              </div>

              {/* Confirmation */}
              <button
                onClick={() => setConfirmed(c => !c)}
                className="w-full flex items-start gap-3 p-3 rounded-[10px] cursor-pointer transition-colors"
                style={{
                  backgroundColor: confirmed ? '#F0F9FF' : '#F8FAFC',
                  border: `1px solid ${confirmed ? '#DBEAFE' : '#F1F5F9'}`,
                  textAlign: isAr ? 'right' : 'left',
                }}
              >
                <div className="w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                  background: confirmed ? '#1D4ED8' : 'transparent',
                  border: confirmed ? 'none' : '2px solid #CBD5E1',
                }}>
                  {confirmed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[12px] text-[#64748B] leading-relaxed">
                  {isAr
                    ? 'أؤكد أن التفاصيل أعلاه صحيحة وأوافق على تنفيذ طلب السحب.'
                    : 'I confirm that the above details are correct and authorize the withdrawal request.'}
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-6 py-5 border-t shrink-0" style={{ borderColor: '#F1F5F9' }}>
              <button
                onClick={onClose}
                disabled={submitting}
                className="flex-1 h-11 rounded-[12px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                style={{ fontWeight: 600, border: '1px solid #E5E7EB', cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!valid || submitting}
                className="flex-1 h-11 rounded-[12px] text-[13px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{
                  backgroundColor: valid && !submitting ? '#1D4ED8' : '#CBD5E1',
                  fontWeight: 600,
                  cursor: valid && !submitting ? 'pointer' : 'not-allowed',
                  opacity: submitting ? 0.75 : 1,
                }}
              >
                {submitting
                  ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...')
                  : (isAr ? 'تقديم طلب السحب' : 'Submit Request')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
