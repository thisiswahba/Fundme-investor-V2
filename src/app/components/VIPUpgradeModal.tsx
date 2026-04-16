import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import {
  X, Check, CheckCircle, ArrowLeft, ArrowRight, Shield, Briefcase,
  GraduationCap, Banknote, Upload, FileText, Trash2, Clock, Crown,
  AlertCircle, Sparkles,
} from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Types
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Step = 1 | 2 | 3 | 4;
type QualId = 'assets' | 'experience' | 'certificate' | 'income';
type UpgradeStatus = 'idle' | 'pending' | 'approved' | 'rejected';

interface Qualification {
  id: QualId;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  requirementAr: string;
  requirementEn: string;
}

const qualifications: Qualification[] = [
  { id: 'assets', icon: Shield, titleAr: 'صافي الأصول', titleEn: 'Net Assets', descAr: 'إثبات أن صافي أصولك لا يقل عن 3,000,000 ريال', descEn: 'Prove net assets of at least SAR 3,000,000', requirementAr: 'كشف حساب بنكي أو تقييم أصول معتمد', requirementEn: 'Bank statement or certified asset valuation' },
  { id: 'experience', icon: Briefcase, titleAr: 'الخبرة المهنية', titleEn: 'Professional Experience', descAr: '3 سنوات على الأقل في قطاع مالي أو استثماري', descEn: 'At least 3 years in financial or investment sector', requirementAr: 'شهادة خبرة أو عقد عمل', requirementEn: 'Experience certificate or employment contract' },
  { id: 'certificate', icon: GraduationCap, titleAr: 'الشهادة المهنية', titleEn: 'Professional Certificate', descAr: 'شهادة مهنية معترف بها في المجال المالي', descEn: 'Recognized professional certificate in finance', requirementAr: 'نسخة من الشهادة المهنية', requirementEn: 'Copy of professional certificate' },
  { id: 'income', icon: Banknote, titleAr: 'الدخل السنوي', titleEn: 'Annual Income', descAr: 'دخل أو أرباح لا تقل عن 600,000 ريال خلال آخر سنتين', descEn: 'Income of at least SAR 600,000 in the last 2 years', requirementAr: 'إثبات دخل رسمي أو إقرار ضريبي', requirementEn: 'Official income proof or tax return' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Stepper
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Stepper({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 4px' }}>
      {labels.map((label, i) => {
        const s = i + 1;
        const done = s < current;
        const act = s === current;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, transition: 'all 0.3s',
                ...(done ? { background: '#2BB673', color: 'white' } : act ? { background: '#6366F1', color: 'white', boxShadow: '0 0 0 4px rgba(99,102,241,0.15)' } : { background: '#F1F5F9', color: '#94A3B8' }),
              }}>
                {done ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : s}
              </div>
              <span style={{ fontSize: 10, fontWeight: act ? 600 : 500, color: act ? '#0F172A' : '#94A3B8', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
            {i < labels.length - 1 && <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 18, borderRadius: 1, background: done ? '#2BB673' : '#F1F5F9', transition: 'background 0.3s' }} />}
          </div>
        );
      })}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Steps
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function StepIntro({ selected, setSelected, isAr }: { selected: QualId[]; setSelected: (v: QualId[]) => void; isAr: boolean }) {
  const toggle = (id: QualId) => setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'الترقية إلى مستثمر VIP' : 'Upgrade to VIP Investor'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24, lineHeight: 1.6 }}>
        {isAr ? 'أكمل شرطًا واحدًا على الأقل من الشروط التالية وارفع المستندات المطلوبة لتقديم طلب الترقية' : 'Complete at least one qualification and upload supporting documents to submit your upgrade request'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {qualifications.map(q => {
          const sel = selected.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => toggle(q.id)}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: 14, textAlign: 'right', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s',
                background: sel ? '#F5F3FF' : 'white', border: sel ? '2px solid #6366F1' : '1px solid #E8ECF2',
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: sel ? '#EDE9FE' : '#F8FAFC', flexShrink: 0 }}>
                <q.icon className="w-4 h-4" style={{ color: sel ? '#6366F1' : '#94A3B8' }} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.96)' }}>{isAr ? q.titleAr : q.titleEn}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{isAr ? q.descAr : q.descEn}</div>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...(sel ? { background: '#6366F1' } : { border: '2px solid #E2E8F0' }),
              }}>
                {sel && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepUpload({ selected, files, setFiles, isAr }: { selected: QualId[]; files: Record<QualId, File | null>; setFiles: (f: Record<QualId, File | null>) => void; isAr: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeUpload, setActiveUpload] = useState<QualId | null>(null);

  const handleFile = (id: QualId, file: File | null) => setFiles({ ...files, [id]: file });

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'رفع المستندات' : 'Upload Documents'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
        {isAr ? 'ارفع المستندات المطلوبة لكل شرط اخترته' : 'Upload required documents for each selected qualification'}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        style={{ display: 'none' }}
        onChange={e => { if (activeUpload && e.target.files?.[0]) { handleFile(activeUpload, e.target.files[0]); setActiveUpload(null); } e.target.value = ''; }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {selected.map(id => {
          const q = qualifications.find(x => x.id === id)!;
          const file = files[id];
          return (
            <div key={id} style={{ padding: 16, borderRadius: 14, background: '#0A1A30', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <q.icon className="w-4 h-4 text-[#6366F1]" strokeWidth={1.8} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.96)' }}>{isAr ? q.titleAr : q.titleEn}</span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>{isAr ? q.requirementAr : q.requirementEn}</p>

              {file ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#0C1C34', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <FileText className="w-4 h-4 text-[#6366F1]" strokeWidth={1.6} />
                  <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.96)', fontWeight: 500 }}>{file.name}</span>
                  <span style={{ fontSize: 10, color: '#94A3B8' }}>{(file.size / 1024).toFixed(0)} KB</span>
                  <button onClick={() => handleFile(id, null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                    <Trash2 className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#EF4444]" strokeWidth={1.8} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setActiveUpload(id); inputRef.current?.click(); }}
                  style={{
                    width: '100%', padding: '16px 0', borderRadius: 10, cursor: 'pointer',
                    border: '2px dashed rgba(255,255,255,0.12)', background: '#0C1C34', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    transition: 'all 0.2s',
                  }}
                >
                  <Upload className="w-5 h-5 text-[#94A3B8]" strokeWidth={1.6} />
                  <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{isAr ? 'اضغط لرفع الملف' : 'Click to upload'}</span>
                  <span style={{ fontSize: 10, color: '#CBD5E1' }}>JPG, PNG, PDF — {isAr ? 'حد أقصى 5 ميغابايت' : 'Max 5MB'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepReview({ selected, files, isAr }: { selected: QualId[]; files: Record<QualId, File | null>; isAr: boolean }) {
  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 6 }}>
        {isAr ? 'مراجعة الطلب' : 'Review Request'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
        {isAr ? 'تأكد من صحة المعلومات قبل إرسال طلب الترقية' : 'Verify your information before submitting'}
      </p>

      <div style={{ background: '#0A1A30', borderRadius: 14, padding: 20, border: '1px solid #F1F5F9', marginBottom: 16 }}>
        {selected.map((id, i) => {
          const q = qualifications.find(x => x.id === id)!;
          const file = files[id];
          return (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < selected.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.96)', fontWeight: 600 }}>{isAr ? q.titleAr : q.titleEn}</div>
                {file && <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{file.name}</div>}
              </div>
              {file ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#F0FDF4', color: '#2BB673', border: '1px solid #BBF7D0' }}>
                  <CheckCircle className="w-3 h-3" strokeWidth={2} />
                  {isAr ? 'تم الرفع' : 'Uploaded'}
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA' }}>
                  <AlertCircle className="w-3 h-3" strokeWidth={2} />
                  {isAr ? 'مطلوب' : 'Required'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '12px 16px', borderRadius: 12, background: '#FFFBEB', border: '1px solid #FDE68A', marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#92400E', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
          {isAr ? 'المراجعة يدوية وقد تستغرق 1–3 أيام عمل' : 'Manual review, may take 1–3 business days'}
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.6 }}>
        {isAr ? 'بإرسال الطلب، أنت توافق على مشاركة المستندات المرفقة مع فريق المراجعة للتحقق من أهليتك لحالة VIP.' : 'By submitting, you agree to share uploaded documents with the review team to verify your VIP eligibility.'}
      </p>
    </div>
  );
}

function StepPending({ isAr, onClose }: { isAr: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <Clock className="w-7 h-7 text-[#6366F1]" strokeWidth={1.5} />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.96)', marginBottom: 8 }}>
        {isAr ? 'تم إرسال طلب الترقية' : 'Upgrade Request Submitted'}
      </h3>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16, lineHeight: 1.6 }}>
        {isAr ? 'طلبك قيد المراجعة الآن. سيتم إشعارك عند تفعيل حالة VIP أو إذا احتجنا إلى مستندات إضافية.' : 'Your request is being reviewed. You will be notified when VIP status is activated or if additional documents are needed.'}
      </p>

      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', marginBottom: 28 }}>
        <Clock className="w-3.5 h-3.5" strokeWidth={2} />
        {isAr ? 'قيد المراجعة' : 'Under Review'}
      </span>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button
          onClick={() => { onClose(); navigate('/app/profile'); }}
          style={{
            flex: 1, height: 46, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #6366F1, #7C3AED)', color: 'white',
            fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Crown className="w-4 h-4" strokeWidth={2} />
          {isAr ? 'عرض حالة الطلب' : 'View Status'}
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 1, height: 46, borderRadius: 14, cursor: 'pointer',
            background: '#0C1C34', color: '#64748B', border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 14, fontWeight: 600,
          }}
        >
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Modal
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function VIPUpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<QualId[]>([]);
  const [files, setFiles] = useState<Record<QualId, File | null>>({ assets: null, experience: null, certificate: null, income: null });
  const [submitting, setSubmitting] = useState(false);

  const allUploaded = selected.length > 0 && selected.every(id => files[id] !== null);

  const canNext = (() => {
    if (step === 1) return selected.length > 0;
    if (step === 2) return allUploaded;
    if (step === 3) return allUploaded;
    return true;
  })();

  const handleNext = () => {
    if (step === 3) {
      setSubmitting(true);
      setTimeout(() => { setSubmitting(false); setStep(4); }, 1800);
      return;
    }
    if (step < 3) setStep((step + 1) as Step);
  };

  if (!open) return null;

  const stepLabels = isAr ? ['الشروط', 'المستندات', 'المراجعة'] : ['Qualify', 'Upload', 'Review'];

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget && !submitting) onClose(); }}
    >
      <div
        style={{ background: '#0C1C34', width: '100%', maxWidth: 520, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        dir={isAr ? 'rtl' : 'ltr'}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {step <= 3 && (
          <div style={{ padding: '20px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown className="w-4 h-4 text-[#6366F1]" strokeWidth={2} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.96)' }}>
                  {isAr ? 'ترقية VIP' : 'VIP Upgrade'}
                </span>
              </div>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: '#0A1A30', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.8} />
              </button>
            </div>
            <Stepper current={step} labels={stepLabels} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {step === 1 && <StepIntro selected={selected} setSelected={setSelected} isAr={isAr} />}
          {step === 2 && <StepUpload selected={selected} files={files} setFiles={setFiles} isAr={isAr} />}
          {step === 3 && <StepReview selected={selected} files={files} isAr={isAr} />}
          {step === 4 && <StepPending isAr={isAr} onClose={onClose} />}
        </div>

        {/* Footer */}
        {step <= 3 && (
          <div style={{ padding: '16px 24px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as Step)}
                style={{ height: 44, padding: '0 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: '#0C1C34', color: '#64748B', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                {isAr ? 'رجوع' : 'Back'}
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              disabled={!canNext || submitting}
              style={{
                height: 44, padding: '0 24px', borderRadius: 12, border: 'none',
                cursor: canNext && !submitting ? 'pointer' : 'not-allowed',
                background: canNext ? 'linear-gradient(135deg, #6366F1, #7C3AED)' : '#E2E8F0',
                color: canNext ? 'white' : '#94A3B8',
                fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                boxShadow: canNext ? '0 2px 8px rgba(99,102,241,0.25)' : 'none',
                opacity: submitting ? 0.7 : 1, transition: 'all 0.2s',
              }}
            >
              {step === 3
                ? (submitting ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...') : (isAr ? 'إرسال طلب الترقية' : 'Submit Request'))
                : (isAr ? 'التالي' : 'Next')}
              {step < 3 && <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
