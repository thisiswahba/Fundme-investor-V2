import { Lightbulb, ArrowLeft } from 'lucide-react';
import { formatSAR } from '../../utils/currency';

export function SmartInsightSection() {
  return (
    <div 
      className="bg-white rounded-2xl p-6 h-full flex flex-col"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Icon & Title */}
      <div className="flex items-start gap-3 mb-4">
        <div 
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.25)',
          }}
        >
          <Lightbulb className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="text-[16px] text-[#0B1A3A] mb-1" style={{ fontWeight: 600 }}>
            توصية ذكية
          </h3>
          <p className="text-[12px] text-[#6B7280]" style={{ fontWeight: 400 }}>
            بناءً على تحليل محفظتك
          </p>
        </div>
      </div>

      {/* Insight Content */}
      <div className="flex-1 mb-5">
        <p className="text-[14px] text-[#0B1A3A] leading-relaxed" style={{ fontWeight: 500 }}>
          لديك رصيد خامل بقيمة{' '}
          <span style={{ fontWeight: 700 }}>{formatSAR(45000)}</span>
          {'. '}
          استثمرها في الفرص ذات التصنيف A-B لتحقيق عائد متوقع{' '}
          <span className="text-[#10B981]" style={{ fontWeight: 700 }}>+12%</span>
          {' '}سنوياً.
        </p>
      </div>

      {/* Action Button */}
      <button 
        className="group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#F1F4F9] hover:bg-[#E5E9F0] text-[#0B1A3A] transition-all"
        style={{ fontWeight: 600 }}
      >
        <span className="text-[13px]">استكشف الفرص</span>
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
      </button>
    </div>
  );
}
