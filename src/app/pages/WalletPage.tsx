import { useState, useRef, useEffect } from 'react';
import { formatSAR } from '../utils/currency';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import {
  Wallet, Plus, ArrowDownToLine, Building2, CreditCard, Download,
  ArrowUpRight, ArrowDownRight, Briefcase, TrendingUp, MoreHorizontal,
  Shield, Clock, Filter, ChevronDown, Trash2, Star, X, CheckCircle,
  AlertCircle, Loader2,
} from 'lucide-react';

const bankAccounts = [
  { id: 1, bank: 'البنك الأهلي', bankEn: 'Al Ahli Bank', iban: 'SA•••• •••• •••• ١٢٣٤', primary: true },
  { id: 2, bank: 'بنك الراجحي', bankEn: 'Al Rajhi Bank', iban: 'SA•••• •••• •••• ٥٦٧٨', primary: false },
  { id: 3, bank: 'بنك الرياض', bankEn: 'Riyad Bank', iban: 'SA•••• •••• •••• ٩٠١٢', primary: false },
  { id: 4, bank: 'البنك السعودي الفرنسي', bankEn: 'Banque Saudi Fransi', iban: 'SA•••• •••• •••• ٣٤٥٦', primary: false },
];

type TxType = 'deposit' | 'investment' | 'return' | 'withdrawal' | 'fee';
type TxStatus = 'completed' | 'processing' | 'pending';
type TxGroup = 'today' | 'yesterday' | 'earlier';

interface Transaction {
  type: TxType;
  title: string;
  titleEn: string;
  detail: string;
  detailEn: string;
  amount: number;
  date: string;
  dateEn: string;
  time: string;
  timeEn: string;
  status: TxStatus;
  group: TxGroup;
}

const transactions: Transaction[] = [
  // ── Today ──────────────────────────────────
  {
    type: 'deposit',
    title: 'إيداع من حساب بنكي',
    titleEn: 'Bank Deposit',
    detail: 'البنك الأهلي •••• ١٢٣٤',
    detailEn: 'Al Ahli •••• 1234',
    amount: 100000,
    date: '٦ أبريل ٢٠٢٦',
    dateEn: 'Apr 6, 2026',
    time: '٣:٤٥م',
    timeEn: '3:45 PM',
    status: 'completed',
    group: 'today',
  },
  {
    type: 'investment',
    title: 'استثمار في مشروع عقاري',
    titleEn: 'Real Estate Investment',
    detail: 'تمويل مشروع سكني - الدمام',
    detailEn: 'Residential Project — Dammam',
    amount: -50000,
    date: '٦ أبريل ٢٠٢٦',
    dateEn: 'Apr 6, 2026',
    time: '١٠:٣٠ص',
    timeEn: '10:30 AM',
    status: 'completed',
    group: 'today',
  },

  // ── Yesterday ──────────────────────────────
  {
    type: 'return',
    title: 'عائد استثماري',
    titleEn: 'Investment Return',
    detail: 'صندوق التجزئة الإلكترونية',
    detailEn: 'E-Commerce Fund',
    amount: 8500,
    date: '٥ أبريل ٢٠٢٦',
    dateEn: 'Apr 5, 2026',
    time: '٩:١٥ص',
    timeEn: '9:15 AM',
    status: 'completed',
    group: 'yesterday',
  },

  // ── Earlier ────────────────────────────────
  {
    type: 'withdrawal',
    title: 'سحب إلى حساب بنكي',
    titleEn: 'Bank Withdrawal',
    detail: 'بنك الراجحي •••• ٥٦٧٨',
    detailEn: 'Al Rajhi •••• 5678',
    amount: -25000,
    date: '٣ أبريل ٢٠٢٦',
    dateEn: 'Apr 3, 2026',
    time: '٢:٢٠م',
    timeEn: '2:20 PM',
    status: 'processing',
    group: 'earlier',
  },
  {
    type: 'return',
    title: 'عائد استثماري',
    titleEn: 'Investment Return',
    detail: 'مشروع صناعي - جدة',
    detailEn: 'Industrial — Jeddah',
    amount: 6800,
    date: '٢ أبريل ٢٠٢٦',
    dateEn: 'Apr 2, 2026',
    time: '١١:٠٠ص',
    timeEn: '11:00 AM',
    status: 'completed',
    group: 'earlier',
  },
  {
    type: 'fee',
    title: 'رسوم المنصة',
    titleEn: 'Platform Fee',
    detail: 'رسوم شهرية',
    detailEn: 'Monthly fee',
    amount: -150,
    date: '١ أبريل ٢٠٢٦',
    dateEn: 'Apr 1, 2026',
    time: '١٢:٠٠ص',
    timeEn: '12:00 AM',
    status: 'completed',
    group: 'earlier',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function txIcon(type: string) {
  switch (type) {
    case 'deposit': return { Icon: ArrowDownRight, bg: '#F0FDF4', color: '#16A34A' };
    case 'return': return { Icon: TrendingUp, bg: '#F0FDF4', color: '#16A34A' };
    case 'investment': return { Icon: Briefcase, bg: '#EFF6FF', color: '#1D4ED8' };
    case 'withdrawal': return { Icon: ArrowUpRight, bg: '#FEF2F2', color: '#DC2626' };
    case 'fee': return { Icon: Clock, bg: '#F8FAFC', color: '#94A3B8' };
    default: return { Icon: Wallet, bg: '#F8FAFC', color: '#64748B' };
  }
}

function txAmountColor(type: string) {
  switch (type) {
    case 'deposit': case 'return': return '#16A34A';
    case 'investment': return '#1D4ED8';
    case 'withdrawal': return '#DC2626';
    case 'fee': return '#94A3B8';
    default: return '#0F172A';
  }
}

function statusChip(status: string, isAr: boolean) {
  if (status === 'completed') return { label: isAr ? 'مكتمل' : 'Completed', bg: '#F0FDF4', color: '#16A34A' };
  if (status === 'processing') return { label: isAr ? 'قيد المعالجة' : 'Processing', bg: '#FEF3C7', color: '#D97706' };
  return { label: status, bg: '#F8FAFC', color: '#64748B' };
}

// ─── Add Bank Account Modal ──────────────────────────────────────────────────

function AddBankModal({ open, onClose, isAr }: { open: boolean; onClose: () => void; isAr: boolean }) {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [iban, setIban] = useState('SA');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setStep('form'); setIban('SA'); setTimeout(() => inputRef.current?.focus(), 150); }
  }, [open]);

  const formatIban = (raw: string) => raw.replace(/(.{4})/g, '$1 ').trim();
  const handleChange = (val: string) => {
    const clean = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 24);
    // Ensure SA prefix is always present
    if (!clean.startsWith('SA')) {
      setIban('SA' + clean.replace(/^S?A?/, ''));
      return;
    }
    setIban(clean);
  };

  const isValid = iban.length === 24 && iban.startsWith('SA');
  const progress = Math.min((iban.length / 24) * 100, 100);

  const handleSubmit = () => { setStep('loading'); setTimeout(() => setStep('success'), 2000); };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && step !== 'loading') onClose(); }}
    >
      <div className="bg-[#0C1C34] w-full max-w-[480px] rounded-[20px] overflow-hidden" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }} dir={isAr ? 'rtl' : 'ltr'}>

        {/* ── Form ── */}
        {step === 'form' && (
          <div>
            {/* Branded header illustration */}
            <div className="relative h-[140px] overflow-hidden" style={{ background: 'linear-gradient(155deg, #0F2A44 0%, #1D4ED8 100%)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
                  <defs><pattern id="bankDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#bankDots)" />
                </svg>
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full opacity-[0.08]" style={{ backgroundColor: '#fff' }} />
                <div className="absolute bottom-[-20px] right-[-10px] w-40 h-40 rounded-full opacity-[0.05]" style={{ backgroundColor: '#fff' }} />
                <svg className="absolute bottom-0 left-0 w-full h-10 opacity-[0.06]" viewBox="0 0 480 40" fill="none">
                  <path d="M0 30 Q120 10 240 20 T480 15" stroke="white" strokeWidth="1" />
                </svg>
              </div>
              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                  <Building2 className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <div className="text-[16px] text-white" style={{ fontWeight: 700 }}>{isAr ? 'ربط حساب بنكي' : 'Link Bank Account'}</div>
                <div className="text-[12px] text-white/60 mt-0.5">{isAr ? 'أدخل رقم الآيبان الخاص بك' : 'Enter your IBAN number'}</div>
              </div>
              {/* Close button */}
              <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <X className="w-4 h-4 text-white/70" strokeWidth={1.5} />
              </button>
            </div>

            {/* IBAN input area */}
            <div className="px-6 pt-6 pb-2">
              <div
                className="rounded-[16px] p-5 transition-all duration-300"
                style={{
                  border: focused ? '2px solid #1D4ED8' : isValid ? '2px solid #16A34A' : '1px solid #E5E7EB',
                  boxShadow: focused ? '0 0 0 4px rgba(29,78,216,0.06)' : isValid ? '0 0 0 4px rgba(22,163,74,0.06)' : 'none',
                }}
              >
                {/* Label row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] transition-colors duration-200" style={{ fontWeight: 500, color: focused ? '#1D4ED8' : '#94A3B8' }}>IBAN</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono" style={{ color: isValid ? '#16A34A' : '#CBD5E1' }}>{iban.length}/24</span>
                    {iban.length > 0 && (
                      <div className="transition-all duration-200">
                        {isValid
                          ? <CheckCircle className="w-4 h-4 text-[#16A34A]" strokeWidth={1.5} />
                          : <AlertCircle className="w-4 h-4 text-[#CBD5E1]" strokeWidth={1.5} />
                        }
                      </div>
                    )}
                  </div>
                </div>

                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={formatIban(iban)}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="SA00 0000 0000 0000 0000 00"
                  className="w-full text-[20px] text-[#0F172A] outline-none bg-transparent font-mono tracking-[0.12em] placeholder:text-[#E2E8F0] placeholder:tracking-[0.08em]"
                  style={{ fontWeight: 700 }}
                  dir="ltr"
                />

                {/* Progress bar */}
                <div className="mt-4 h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: '#F1F5F9' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: isValid ? '#16A34A' : '#1D4ED8',
                    }}
                  />
                </div>
              </div>

              {/* Helper text */}
              <div className="text-[11px] text-[#CBD5E1] text-center mt-3 mb-4" style={{ fontWeight: 500 }}>
                {isAr ? 'يبدأ بـ SA ويتكون من ٢٤ حرفاً ورقماً' : 'Starts with SA, 24 alphanumeric characters'}
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-4 py-3 rounded-[10px] mb-2" style={{ backgroundColor: '#F8FAFC' }}>
                <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  <Shield className="w-3 h-3" strokeWidth={1.5} />
                  {isAr ? 'اتصال آمن' : 'Secure'}
                </span>
                <span className="w-px h-3" style={{ backgroundColor: '#E5E7EB' }} />
                <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  <CheckCircle className="w-3 h-3" strokeWidth={1.5} />
                  {isAr ? 'تحقق تلقائي' : 'Auto-verified'}
                </span>
                <span className="w-px h-3" style={{ backgroundColor: '#E5E7EB' }} />
                <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]" style={{ fontWeight: 500 }}>
                  <Shield className="w-3 h-3" strokeWidth={1.5} />
                  {isAr ? 'بدون رسوم' : 'No charges'}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-6 py-5 border-t" style={{ borderColor: '#F1F5F9' }}>
              <button onClick={onClose} className="flex-1 h-11 rounded-[12px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontWeight: 600, border: '1px solid #E5E7EB' }}>
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex-1 h-11 rounded-[12px] text-[13px] text-white transition-all duration-200 active:scale-[0.98]"
                style={{ backgroundColor: isValid ? '#1D4ED8' : '#CBD5E1', fontWeight: 600, cursor: isValid ? 'pointer' : 'not-allowed' }}
              >
                {isAr ? 'ربط الحساب' : 'Link Account'}
              </button>
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {step === 'loading' && (
          <div className="px-6 py-16 text-center">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#EFF6FF' }} />
              <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#1D4ED8' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#1D4ED8]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-[16px] text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>
              {isAr ? 'جارٍ التحقق...' : 'Verifying...'}
            </div>
            <div className="text-[12px] text-[#94A3B8]">
              {isAr ? 'نتحقق من رقم الآيبان الخاص بك' : 'Checking your IBAN number'}
            </div>
          </div>
        )}

        {/* ── Success ── */}
        {step === 'success' && (
          <div className="px-6 py-10 text-center">
            <div className="w-18 h-18 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: '#F0FDF4' }}>
              <CheckCircle className="w-9 h-9 text-[#16A34A]" strokeWidth={1.5} />
            </div>
            <div className="text-[20px] text-[#0F172A] mb-2" style={{ fontWeight: 700 }}>
              {isAr ? 'تم ربط الحساب!' : 'Account Linked!'}
            </div>
            <p className="text-[13px] text-[#64748B] mb-6">{isAr ? 'حسابك البنكي جاهز للاستخدام' : 'Your bank account is ready to use'}</p>

            {/* Preview card */}
            <div className="flex items-center gap-3 p-4 rounded-[14px] mx-2 mb-8" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E5E7EB' }}>
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                <Building2 className="w-5 h-5 text-[#1D4ED8]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-right">
                <div className="text-[13px] text-[#0F172A] font-mono tracking-wider" dir="ltr" style={{ fontWeight: 600 }}>
                  {iban.slice(0, 4)} •••• •••• {iban.slice(-4)}
                </div>
                <div className="text-[10px] text-[#16A34A] mt-0.5" style={{ fontWeight: 500 }}>
                  {isAr ? 'تم التحقق' : 'Verified'}
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
        )}
      </div>
    </div>
  );
}

// ─── Add Funds Modal ─────────────────────────────────────────────────────────

const bankDetails = {
  name: { ar: 'شركة فندمي للتمويل', en: 'FundMe Finance Co.' },
  bank: { ar: 'البنك الأهلي السعودي', en: 'Saudi National Bank' },
  iban: 'SA44 2000 0001 2345 6789 0123',
  swift: 'NCBKSAJE',
  ref: 'FM-USR-00482',
};

function AddFundsModal({ open, onClose, isAr }: { open: boolean; onClose: () => void; isAr: boolean }) {
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

  // Copy icon SVG
  const CopyIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }} onClick={(e) => { if (e.target === e.currentTarget && step !== 'cardProcessing') onClose(); }}>
      <div className="bg-[#0C1C34] w-full max-w-[500px] rounded-[20px] overflow-hidden" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }} dir={isAr ? 'rtl' : 'ltr'}>

        {/* ── Header — always visible ── */}
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

        {/* ── Tabs ── */}
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

          {/* ── Bank Transfer ── */}
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

              {/* Warning */}
              <div className="flex items-start gap-2 p-3 rounded-[10px] mb-5" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <AlertCircle className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[11px] text-[#92400E] leading-relaxed" style={{ fontWeight: 500 }}>
                  {isAr ? 'أضف رقم المرجع في ملاحظات التحويل لتسريع الإيداع' : 'Include the reference number to speed up processing'}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { const all = `Beneficiary: ${bankDetails.name.en}\nBank: ${bankDetails.bank.en}\nIBAN: ${bankDetails.iban}\nSWIFT: ${bankDetails.swift}\nRef: ${bankDetails.ref}`; copyToClipboard(all, 'all'); }}
                  className="flex-1 h-11 rounded-[12px] flex items-center justify-center gap-2 text-[13px] transition-all hover:bg-[#F8FAFC]"
                  style={{ fontWeight: 600, border: '1px solid #E5E7EB', color: copied === 'all' ? '#16A34A' : '#64748B' }}
                >
                  {copied === 'all' ? <><CheckCircle className="w-4 h-4" strokeWidth={1.5} />{isAr ? 'تم النسخ!' : 'Copied!'}</> : <><CopyIcon />{isAr ? 'نسخ الكل' : 'Copy All'}</>}
                </button>
                <button className="flex-1 h-11 rounded-[12px] flex items-center justify-center gap-2 text-[13px] text-[#1D4ED8] transition-all hover:bg-[#EFF6FF]" style={{ fontWeight: 600, border: '1px solid #DBEAFE' }}>
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  {isAr ? 'تحميل PDF' : 'Download PDF'}
                </button>
              </div>
            </div>
          )}

          {/* ── Card Payment ── */}
          {step === 'card' && (
            <div>
              {/* Amount input + quick chips */}
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
                  {/* Quick chips */}
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

              {/* Divider */}
              <div className="h-px mb-5" style={{ backgroundColor: '#F1F5F9' }} />

              {/* Card number */}
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

              {/* Expiry + CVV — 2 column */}
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

              {/* Trust indicators — muted, inline */}
              <div className="flex items-center justify-center gap-3 mb-6 text-[10px] text-[#CBD5E1]" style={{ fontWeight: 500 }}>
                <span className="flex items-center gap-1">{isAr ? 'اتصال آمن' : 'Secure'}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#E2E8F0]" />
                <span className="flex items-center gap-1">{isAr ? 'مشفّر' : 'Encrypted'}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-[#E2E8F0]" />
                <span>PCI DSS</span>
              </div>

              {/* CTA */}
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

          {/* ── Processing ── */}
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

          {/* ── Success ── */}
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

// ─── Component ───────────────────────────────────────────────────────────────

export function WalletPage() {
  const { t, lang } = useI18n();
  const isAr = lang === 'ar';
  const { persona, personaId } = usePersona();
  const isVIP = personaId === 'vip';

  // Dark mode token helpers
  const dk = {
    card: isVIP ? '#0F1728' : 'white',
    cardBorder: isVIP ? 'rgba(255,255,255,0.08)' : '#E5E7EB',
    rowBorder: isVIP ? 'rgba(255,255,255,0.04)' : '#F8FAFC',
    rowHover: isVIP ? 'rgba(255,255,255,0.03)' : '#FAFBFC',
    sectionBorder: isVIP ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
    title: isVIP ? '#FFFFFF' : '#0F172A',
    body: isVIP ? 'rgba(255,255,255,0.7)' : '#0F172A',
    sub: isVIP ? 'rgba(255,255,255,0.4)' : '#94A3B8',
    dim: isVIP ? 'rgba(255,255,255,0.2)' : '#CBD5E1',
    muted: isVIP ? 'rgba(255,255,255,0.5)' : '#64748B',
    iconBg: isVIP ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
    iconBgBlue: isVIP ? 'rgba(59,130,246,0.12)' : '#EFF6FF',
    chipBg: isVIP ? 'rgba(255,255,255,0.08)' : 'transparent',
    chipActiveBg: isVIP ? '#3B82F6' : '#0F172A',
    chipBorder: isVIP ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
    btnOutline: isVIP ? 'rgba(96,165,250,0.2)' : '#DBEAFE',
    btnOutlineText: isVIP ? '#93C5FD' : '#1D4ED8',
    green: isVIP ? '#34D399' : '#16A34A',
    greenBg: isVIP ? 'rgba(52,211,153,0.1)' : '#F0FDF4',
    red: isVIP ? '#F87171' : '#DC2626',
    redBg: isVIP ? 'rgba(248,113,113,0.1)' : '#FEF2F2',
    blue: isVIP ? '#60A5FA' : '#1D4ED8',
    blueBg: isVIP ? 'rgba(59,130,246,0.1)' : '#EFF6FF',
    badgeBg: isVIP ? 'rgba(255,255,255,0.04)' : '#F8FAFC',
  };
  const wallet = {
    available: persona.wallet.available,
    pending: persona.wallet.pending,
    total: persona.wallet.total,
    lastTransaction: persona.wallet.lastTransactionAr,
    lastTransactionEn: persona.wallet.lastTransactionEn,
  };
  const [filter, setFilter] = useState('all');
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [addFundsOpen, setAddFundsOpen] = useState(false);

  const groups = [
    { key: 'today', label: isAr ? 'اليوم' : 'Today' },
    { key: 'yesterday', label: isAr ? 'أمس' : 'Yesterday' },
    { key: 'earlier', label: isAr ? 'سابقاً' : 'Earlier' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">

      {/* ═══ 1. WALLET OVERVIEW — Hero (matches overview wallet) ═══ */}
      <section
        className="relative rounded-[20px] overflow-hidden mb-8"
        style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0F2A4D 50%, #143766 100%)' }}
      >
        {/* Decorative circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        />

        <div className="relative flex flex-col items-start gap-4 p-6 lg:p-8">
          {/* Wallet Icon + Label */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
            >
              <Wallet className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[14px] text-white/80" style={{ fontWeight: 500 }}>
              {isAr ? 'المحفظة' : 'Wallet'}
            </span>
          </div>

          {/* Balance */}
          <div
            className="text-[56px] lg:text-[64px] leading-none text-white"
            dir="ltr"
            style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            {formatSAR(wallet.available)}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-1">
            <button
              onClick={() => setAddFundsOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
              }}
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span>{isAr ? 'إضافة أموال' : 'Add Funds'}</span>
            </button>

            <button
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              <ArrowDownToLine className="w-4 h-4" strokeWidth={2.5} />
              <span>{isAr ? 'سحب' : 'Withdraw'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. BANK ACCOUNTS ═══ */}
      <section className="mb-8">
        <div className="rounded-[16px] overflow-hidden" style={{ background: dk.card, border: `1px solid ${dk.cardBorder}` }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: dk.sectionBorder }}>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px]" style={{ fontWeight: 700, color: dk.title }}>{isAr ? 'الحسابات البنكية' : 'Bank Accounts'}</h2>
              <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: dk.badgeBg, color: dk.sub, fontWeight: 500 }}>{bankAccounts.length}</span>
            </div>
            <button
              onClick={() => setAddBankOpen(true)}
              className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11px] transition-colors"
              style={{ fontWeight: 600, border: `1px solid ${dk.btnOutline}`, color: dk.btnOutlineText }}
            >
              <Plus className="w-3 h-3" strokeWidth={2} />
              {isAr ? 'إضافة' : 'Add'}
            </button>
          </div>

          {bankAccounts.map((acc, i) => (
            <div
              key={acc.id}
              className="flex items-center gap-3 px-5 h-[60px] transition-colors"
              style={{ borderBottom: i < bankAccounts.length - 1 ? `1px solid ${dk.rowBorder}` : 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = dk.rowHover)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: acc.primary ? dk.iconBgBlue : dk.iconBg }}>
                <Building2 className="w-4 h-4" style={{ color: acc.primary ? dk.blue : dk.sub }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] truncate" style={{ fontWeight: 600, color: dk.body }}>{isAr ? acc.bank : acc.bankEn}</span>
                  {acc.primary && (
                    <span className="text-[9px] px-1.5 py-px rounded-full flex-shrink-0" style={{ backgroundColor: dk.iconBgBlue, color: dk.blue, fontWeight: 600 }}>
                      {isAr ? 'أساسي' : 'Primary'}
                    </span>
                  )}
                </div>
                <div className="text-[11px] mt-px font-mono" style={{ color: dk.dim }}>{acc.iban}</div>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {!acc.primary && (
                  <button className="w-7 h-7 rounded-md flex items-center justify-center transition-colors" style={{ color: dk.dim }}>
                    <Star className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                )}
                <button className="w-7 h-7 rounded-md flex items-center justify-center transition-colors" style={{ color: dk.dim }}>
                  <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. TRANSACTION HISTORY ═══ */}
      <section className="rounded-[16px] overflow-hidden" style={{ background: dk.card, border: `1px solid ${dk.cardBorder}` }}>

        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px]" style={{ fontWeight: 700, color: dk.title }}>
              {isAr ? 'سجل العمليات' : 'Transaction History'}
            </h2>
            <button className="h-7 px-3 rounded-md flex items-center gap-1.5 text-[11px] transition-colors" style={{ fontWeight: 500, border: `1px solid ${dk.cardBorder}`, color: dk.muted }}>
              <Download className="w-3 h-3" strokeWidth={1.5} />
              {isAr ? 'تصدير' : 'Export'}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { key: 'all', label: isAr ? 'الكل' : 'All' },
              { key: 'deposit', label: isAr ? 'إيداع' : 'Deposits' },
              { key: 'investment', label: isAr ? 'استثمار' : 'Investments' },
              { key: 'return', label: isAr ? 'عوائد' : 'Returns' },
              { key: 'withdrawal', label: isAr ? 'سحب' : 'Withdrawals' },
              { key: 'fee', label: isAr ? 'رسوم' : 'Fees' },
            ].map((chip) => (
              <button
                key={chip.key}
                onClick={() => setFilter(chip.key)}
                className="h-7 px-3 rounded-full text-[11px] transition-all"
                style={{
                  fontWeight: filter === chip.key ? 600 : 400,
                  backgroundColor: filter === chip.key ? dk.chipActiveBg : dk.chipBg,
                  color: filter === chip.key ? '#fff' : dk.sub,
                  border: filter === chip.key ? 'none' : `1px solid ${dk.chipBorder}`,
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px" style={{ backgroundColor: dk.sectionBorder }} />

        {/* Grouped transactions */}
        {groups.map((group) => {
          const items = transactions.filter((tx) =>
            tx.group === group.key && (filter === 'all' || tx.type === filter)
          );
          if (items.length === 0) return null;

          return (
            <div key={group.key}>
              <div className="h-8 flex items-center px-6 text-[10px] uppercase tracking-wider" style={{ fontWeight: 600, color: dk.dim }}>
                {group.label}
              </div>

              {items.map((tx, i) => {
                const { Icon, bg, color } = txIcon(tx.type);
                const sc = statusChip(tx.status, isAr);
                const isIncoming = tx.amount > 0;

                // VIP-aware icon colors
                const iconBg = isVIP
                  ? (tx.type === 'deposit' || tx.type === 'return' ? dk.greenBg : tx.type === 'investment' ? dk.blueBg : dk.iconBg)
                  : bg;
                const iconColor = isVIP
                  ? (tx.type === 'deposit' || tx.type === 'return' ? dk.green : tx.type === 'investment' ? dk.blue : dk.sub)
                  : color;
                const amountColor = isVIP
                  ? (isIncoming ? dk.green : tx.type === 'withdrawal' ? dk.red : dk.blue)
                  : txAmountColor(tx.type);

                return (
                  <div
                    key={`${group.key}-${i}`}
                    className="flex items-center gap-3 px-6 h-[60px] transition-colors cursor-pointer"
                    style={{ borderBottom: `1px solid ${dk.rowBorder}` }}
                    onMouseEnter={e => (e.currentTarget.style.background = dk.rowHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
                      <Icon className="w-[15px] h-[15px]" style={{ color: iconColor }} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] truncate" style={{ fontWeight: 600, color: dk.body }}>
                          {isAr ? tx.title : tx.titleEn}
                        </span>
                        {tx.status !== 'completed' && (
                          <span className="text-[9px] px-1.5 py-px rounded-full flex-shrink-0" style={{ backgroundColor: isVIP ? 'rgba(245,158,11,0.1)' : sc.bg, color: isVIP ? '#FBBF24' : sc.color, fontWeight: 600 }}>
                            {sc.label}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] mt-px truncate" style={{ color: dk.dim }}>
                        {isAr ? tx.detail : tx.detailEn}
                        <span className="hidden sm:inline"> · {isAr ? tx.time : tx.timeEn}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-left">
                      <span className="text-[16px] tabular-nums" style={{ fontWeight: 700, color: amountColor }}>
                        {isIncoming ? '+' : '-'}
                        <span className="text-[16px]">{formatSAR(Math.abs(tx.amount), { decimals: 0, showCurrency: false })}</span>
                        <span className="text-[11px] mr-0.5 opacity-60" style={{ fontWeight: 500 }}> ﷼</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty state */}
        {transactions.filter(tx => filter === 'all' || tx.type === filter).length === 0 && (
          <div className="py-16 text-center">
            <Wallet className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" strokeWidth={1.5} />
            <div className="text-[12px] text-[#CBD5E1]" style={{ fontWeight: 500 }}>
              {isAr ? 'لا توجد عمليات' : 'No transactions found'}
            </div>
          </div>
        )}
      </section>

      {/* Add Bank Account Modal */}
      <AddBankModal open={addBankOpen} onClose={() => setAddBankOpen(false)} isAr={isAr} />
      <AddFundsModal open={addFundsOpen} onClose={() => setAddFundsOpen(false)} isAr={isAr} />
    </div>
  );
}