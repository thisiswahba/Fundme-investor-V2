import { Lightbulb, ArrowLeft } from 'lucide-react';
import { formatSAR } from '../utils/currency';

export function SmartInsight() {
  return (
    <div 
      className="relative rounded-[20px] p-6 overflow-hidden border border-[#E8ECF2]"
      style={{
        background: 'linear-gradient(135deg, #F5F7FA 0%, #EAF0FA 100%)',
      }}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-2xl" 
        style={{ background: 'radial-gradient(circle, #0D82F9 0%, transparent 70%)' }} 
      />

      <div className="relative">
        {/* Icon & Title */}
        <div className="flex items-start gap-3 mb-4">
          <div 
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ 
              background: 'linear-gradient(135deg, #0D82F9 0%, #002E83 100%)',
              boxShadow: '0 4px 16px rgba(13, 130, 249, 0.25)',
            }}
          >
            <Lightbulb className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <div className="text-[15px] text-[#002E83] mb-1" style={{ fontWeight: 600 }}>
              توصية ذكية
            </div>
            <div className="text-[12px] text-[#8896AD]" style={{ fontWeight: 400 }}>
              بناءً على تحليل محفظتك
            </div>
          </div>
        </div>

        {/* Insight Content */}
        <div className="mb-4">
          <div className="text-[13px] text-[#002E83] mb-2" style={{ fontWeight: 500, lineHeight: '1.6' }}>
            لديك رصيد خامل بقيمة <span style={{ fontWeight: 700 }}>{formatSAR(45000)}</span>. استثمرها في الصناديق المتوازنة لتحقيق عائد متوقع <span className="text-[#2D8A00]" style={{ fontWeight: 700 }}>+٩٪</span> سنوياً.
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="group flex items-center gap-2 text-[13px] text-[#0D82F9] hover:gap-3 transition-all"
          style={{ fontWeight: 600 }}
        >
          <span>استكشف الفرص</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
