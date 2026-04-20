import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Plus, Building2, CreditCard, Download, ArrowUpRight, Shield, Clock,
  Star, X, CheckCircle, AlertCircle,
} from 'lucide-react';
import { formatSAR } from '../utils/currency';
import { usePersona } from '../demoPersona';

const bankDetails = {
  name: { ar: 'شركة فندمي للتمويل', en: 'FundMe Finance Co.' },
  bank: { ar: 'البنك الأهلي السعودي', en: 'Saudi National Bank' },
  iban: 'SA44 2000 0001 2345 6789 0123',
  swift: 'NCBKSAJE',
  ref: 'FM-USR-00482',
};

export function AddFundsModal({ open, onClose, isAr }: { open: boolean; onClose: () => void; isAr: boolean }) {
  const { persona } = usePersona();
  const wallet = { available: persona.wallet.available };
  const [step, setStep] = useState<'method' | 'bank' | 'card' | 'cardProcessing' | 'success'>('bank');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    if (open) { setStep('bank'); setAmount(''); setCopied(''); setCardNumber(''); setCardExpiry(''); setCardCvv(''); }
  }, [open]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const parsedAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10) || 0;
  const cardValid = cardNumber.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3 && parsedAmount >= 100;

  const handleCardPay = () => { setStep('cardProcessing'); setTimeout(() => setStep('success'), 2200); };
  const formatCard = (v: string) => v.replace(/[^0-9]/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => { const c = v.replace(/[^0-9]/g, '').slice(0, 4); return c.length > 2 ? c.slice(0, 2) + '/' + c.slice(2) : c; };

  const CopyIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }} onClick={(e) => { if (e.target === e.currentTarget && step !== 'cardProcessing') onClose(); }}>
      <div className="bg-white w-full max-w-[500px] rounded-[20px] overflow-hidden" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }} dir={isAr ? 'rtl' : 'ltr'}>

        {(step === 'bank' || step === 'card') && (
          <div className="relative h-[100px] overflow-hidden" style={{ background: 'linear-gradient(155deg, #0B1F3A 0%, #143766 100%)' }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full opacity-[0.06]" style={{ backgroundColor: '#fff' }} />
              <div className="absolute bottom-[-15px] right-[-10px] w-32 h-32 rounded-full opacity-[0.04]" style={{ backgroundColor: '#fff' }} />
            </div>
            <div className="relative flex flex-col items-center justify-center h-full">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <Plus className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[14px] text-white" style={{ fontWeight: 600 }}>
                {isAr ? 'إضافة أموال' : 'Add Funds'}
              </div>
            </div>
            <button onClick={onClose} className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <X className="w-4 h-4 text-white/70" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {(step === 'bank' || step === 'card') && (
          <div className="flex border-b" style={{ borderColor: '#E8ECF2' }}>
            <button
              onClick={() => setStep('bank')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] border-b-2 -mb-px transition-all cursor-pointer ${step === 'bank' ? 'border-[#3B82F6] text-[#0F172A]' : 'border-transparent text-[#94A3B8] hover:text-[#64748B]'}`}
              style={{ fontWeight: step === 'bank' ? 600 : 500 }}
            >
              <Building2 className="w-4 h-4" strokeWidth={1.5} />
              {isAr ? 'تحويل بنكي' : 'Bank Transfer'}
              <span className="text-[9px] px-1.5 py-0.5 rounded-md" style={{ background: '#EFF6FF', color: '#3B82F6', fontWeight: 600 }}>
                {isAr ? 'مجاني' : 'Free'}
              </span>
            </button>
            <button
              onClick={() => setStep('card')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] border-b-2 -mb-px transition-all cursor-pointer ${step === 'card' ? 'border-[#3B82F6] text-[#0F172A]' : 'border-transparent text-[#94A3B8] hover:text-[#64748B]'}`}
              style={{ fontWeight: step === 'card' ? 600 : 500 }}
            >
              <CreditCard className="w-4 h-4" strokeWidth={1.5} />
              {isAr ? 'بطاقة ائتمان' : 'Credit Card'}
              <span className="text-[9px] px-1.5 py-0.5 rounded-md" style={{ background: '#F0FDF4', color: '#2BB673', fontWeight: 600 }}>
                {isAr ? 'فوري' : 'Instant'}
              </span>
            </button>
          </div>
        )}

        <div className="px-6 py-6">

          {step === 'bank' && (
            <div>
              <p className="text-[12px] text-[#64748B] mb-4">{isAr ? 'حوّل إلى الحساب التالي من تطبيق البنك' : 'Transfer to this account from your banking app'}</p>

              <div className="rounded-[14px] overflow-hidden mb-4" style={{ border: '1px solid #E5E7EB' }}>
                {[
                  { label: isAr ? 'اسم المستفيد' : 'Beneficiary', value: isAr ? bankDetails.name.ar : bankDetails.name.en, key: 'name', icon: <Building2 className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={1.5} /> },
                  { label: isAr ? 'البنك' : 'Bank', value: isAr ? bankDetails.bank.ar : bankDetails.bank.en, key: 'bank', icon: <Shield className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.5} /> },
                  { label: 'IBAN', value: bankDetails.iban, key: 'iban', mono: true, icon: <CreditCard className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.5} /> },
                  { label: 'SWIFT', value: bankDetails.swift, key: 'swift', mono: true, icon: <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={1.5} /> },
                  { label: isAr ? 'المرجع (مهم)' : 'Reference (important)', value: bankDetails.ref, key: 'ref', mono: true, highlight: true, icon: <Star className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.5} /> },
                ].map((row, i, arr) => (
                  <div key={row.key} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFBFC] transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F8FAFC' : 'none', backgroundColor: row.highlight ? '#FFFBEB' : undefined }}>
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: row.highlight ? '#FEF3C7' : '#F8FAFC' }}>
                      {row.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{row.label}</div>
                      <div className={`text-[13px] text-[#0F172A] ${row.mono ? 'font-mono tracking-wide' : ''}`} style={{ fontWeight: 600 }} dir={row.mono ? 'ltr' : undefined}>{row.value}</div>
                    </div>
                    <button onClick={() => copyToClipboard(row.value, row.key)} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-[#F1F5F9] transition-all flex-shrink-0">
                      {copied === row.key ? <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={1.5} /> : <CopyIcon />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 p-3 rounded-[10px] mb-5" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <AlertCircle className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[11px] text-[#92400E] leading-relaxed" style={{ fontWeight: 500 }}>
                  {isAr ? 'أضف رقم المرجع في ملاحظات التحويل لتسريع الإيداع' : 'Include the reference number to speed up processing'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { const all = `Beneficiary: ${bankDetails.name.en}\nBank: ${bankDetails.bank.en}\nIBAN: ${bankDetails.iban}\nSWIFT: ${bankDetails.swift}\nRef: ${bankDetails.ref}`; copyToClipboard(all, 'all'); }}
                  className="flex-1 h-11 rounded-[12px] flex items-center justify-center gap-2 text-[13px] transition-all hover:bg-[#F8FAFC]"
                  style={{ fontWeight: 600, border: '1px solid #E5E7EB', color: copied === 'all' ? '#16A34A' : '#64748B' }}
                >
                  {copied === 'all' ? <><CheckCircle className="w-4 h-4" strokeWidth={1.5} />{isAr ? 'تم النسخ!' : 'Copied!'}</> : <><CopyIcon />{isAr ? 'نسخ الكل' : 'Copy All'}</>}
                </button>
                <button
                  onClick={() => toast.success(
                    isAr ? 'بدأ تنزيل تفاصيل التحويل' : 'Transfer details download started',
                    { duration: 2400 },
                  )}
                  className="flex-1 h-11 rounded-[12px] flex items-center justify-center gap-2 text-[13px] text-[#1D4ED8] transition-all hover:bg-[#EFF6FF] cursor-pointer"
                  style={{ fontWeight: 600, border: '1px solid #DBEAFE' }}
                >
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  {isAr ? 'تحميل PDF' : 'Download PDF'}
                </button>
              </div>
            </div>
          )}

          {step === 'card' && (
            <div>
              <div className="mb-6">
                <label className="text-[12px] text-[#64748B] mb-2 block" style={{ fontWeight: 500 }}>{isAr ? 'المبلغ (ريال)' : 'Amount (SAR)'}</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder={isAr ? 'أدخل المبلغ' : 'Enter amount'}
                    className="w-full h-14 px-5 rounded-[14px] text-[22px] text-[#0F172A] outline-none transition-all duration-200 placeholder:text-[#E2E8F0] placeholder:text-[15px]"
                    style={{ fontWeight: 700, border: '1.5px solid #E5E7EB' }}
                    onFocus={(e) => { e.target.style.borderColor = '#1D4ED8'; e.target.style.boxShadow = '0 0 0 4px rgba(29,78,216,0.06)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
                  />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[13px] text-[#CBD5E1]" style={{ fontWeight: 500 }}>﷼</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-[#CBD5E1]" style={{ fontWeight: 500 }}>{isAr ? 'الحد الأدنى ١٠٠ ريال' : 'Min 100 SAR'}</span>
                  <div className="flex items-center gap-1.5">
                    {[500, 1000, 5000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(String(v))}
                        className="h-6 px-2.5 rounded-md text-[10px] transition-all active:scale-95"
                        style={{
                          fontWeight: 600,
                          backgroundColor: parsedAmount === v ? '#0F172A' : '#F8FAFC',
                          color: parsedAmount === v ? '#fff' : '#94A3B8',
                          border: parsedAmount === v ? 'none' : '1px solid #F1F5F9',
                        }}
                      >
                        {v.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-px mb-5" style={{ backgroundColor: '#F1F5F9' }} />

              <div className="mb-4">
                <label className="text-[12px] text-[#64748B] mb-2 block" style={{ fontWeight: 500 }}>{isAr ? 'رقم البطاقة' : 'Card Number'}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCard(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                    placeholder="0000 0000 0000 0000"
                    className="w-full h-12 pl-12 pr-4 rounded-[14px] text-[15px] text-[#0F172A] outline-none font-mono tracking-[0.15em] placeholder:text-[#E2E8F0] transition-all duration-200"
                    style={{ fontWeight: 600, border: '1.5px solid #E5E7EB' }}
                    dir="ltr"
                    onFocus={(e) => { e.target.style.borderColor = '#1D4ED8'; e.target.style.boxShadow = '0 0 0 4px rgba(29,78,216,0.06)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <CreditCard className="w-4 h-4 text-[#CBD5E1]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                  <label className="text-[12px] text-[#64748B] mb-2 block" style={{ fontWeight: 500 }}>{isAr ? 'تاريخ الانتهاء' : 'Expiry'}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="MM / YY"
                      className="w-full h-12 pl-10 pr-4 rounded-[14px] text-[15px] text-[#0F172A] outline-none font-mono tracking-wider placeholder:text-[#E2E8F0] transition-all duration-200"
                      style={{ fontWeight: 600, border: '1.5px solid #E5E7EB' }}
                      dir="ltr"
                      onFocus={(e) => { e.target.style.borderColor = '#1D4ED8'; e.target.style.boxShadow = '0 0 0 4px rgba(29,78,216,0.06)'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
                    />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1]" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] text-[#64748B] mb-2 block" style={{ fontWeight: 500 }}>CVV</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                      placeholder="•••"
                      className="w-full h-12 pl-10 pr-4 rounded-[14px] text-[15px] text-[#0F172A] outline-none font-mono tracking-[0.3em] placeholder:text-[#E2E8F0] transition-all duration-200"
                      style={{ fontWeight: 600, border: '1.5px solid #E5E7EB' }}
                      dir="ltr"
                      onFocus={(e) => { e.target.style.borderColor = '#1D4ED8'; e.target.style.boxShadow = '0 0 0 4px rgba(29,78,216,0.06)'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
                    />
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CBD5E1]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6 text-[10px] text-[#CBD5E1]" style={{ fontWeight: 500 }}>
                <span className="flex items-center gap-1">{isAr ? 'اتصال آمن' : 'Secure'}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#E2E8F0]" />
                <span className="flex items-center gap-1">{isAr ? 'مشفّر' : 'Encrypted'}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#E2E8F0]" />
                <span>PCI DSS</span>
              </div>

              <button
                onClick={handleCardPay}
                disabled={!cardValid}
                className="w-full h-[52px] rounded-[14px] text-[15px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: cardValid ? 'linear-gradient(135deg, #1D4ED8, #1E40AF)' : '#E2E8F0',
                  fontWeight: 700,
                  cursor: cardValid ? 'pointer' : 'not-allowed',
                  boxShadow: cardValid ? '0 6px 20px rgba(29,78,216,0.25)' : 'none',
                  color: cardValid ? '#fff' : '#94A3B8',
                }}
              >
                {parsedAmount >= 100 ? `${isAr ? 'ادفع' : 'Pay'} ${formatSAR(parsedAmount, { decimals: 0 })}` : (isAr ? 'ادفع' : 'Pay')}
              </button>
            </div>
          )}

          {step === 'cardProcessing' && (
            <div className="text-center py-12">
              <div className="relative w-16 h-16 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#EFF6FF' }} />
                <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#1D4ED8' }} />
                <div className="absolute inset-0 flex items-center justify-center"><CreditCard className="w-6 h-6 text-[#1D4ED8]" strokeWidth={1.5} /></div>
              </div>
              <div className="text-[16px] text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>{isAr ? 'جارٍ المعالجة...' : 'Processing...'}</div>
              <div className="text-[12px] text-[#94A3B8]">{isAr ? 'يرجى عدم إغلاق النافذة' : 'Please do not close this window'}</div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-18 h-18 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: '#F0FDF4' }}>
                <CheckCircle className="w-9 h-9 text-[#16A34A]" strokeWidth={1.5} />
              </div>
              <div className="text-[20px] text-[#0F172A] mb-2" style={{ fontWeight: 700 }}>{isAr ? 'تم الإيداع بنجاح!' : 'Deposit Successful!'}</div>
              <p className="text-[14px] text-[#64748B] mb-6">
                {isAr ? 'تم إضافة' : 'Added'} <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{formatSAR(parsedAmount, { decimals: 0 })}</span> {isAr ? 'إلى رصيدك' : 'to your balance'}
              </p>
              <div className="rounded-[14px] p-4 mx-2 mb-6" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{isAr ? 'المبلغ المضاف' : 'Amount Added'}</span>
                  <span className="text-[14px] text-[#16A34A]" style={{ fontWeight: 700 }}>+{formatSAR(parsedAmount, { decimals: 0 })}</span>
                </div>
                <div className="border-t pt-2" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#94A3B8]" style={{ fontWeight: 500 }}>{isAr ? 'الرصيد الجديد' : 'New Balance'}</span>
                    <span className="text-[16px] text-[#0F172A]" style={{ fontWeight: 700 }}>{formatSAR(wallet.available + parsedAmount)}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="w-full h-12 rounded-[12px] text-[14px] text-white active:scale-[0.98] transition-all" style={{ backgroundColor: '#1D4ED8', fontWeight: 600 }}>
                {isAr ? 'تم' : 'Done'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
