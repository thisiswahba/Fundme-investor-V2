import { TransferIllustration } from '../illustrations';

export function EmptyTransactionsSection() {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[18px] text-[#0B1A3A]" style={{ fontWeight: 600 }}>
          المعاملات الأخيرة
        </h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-12">
        {/* Illustration */}
        <div className="mb-6">
          <TransferIllustration size={140} />
        </div>

        {/* Message */}
        <h4 className="text-[16px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 600 }}>
          لا توجد معاملات
        </h4>
        <p className="text-[13px] text-[#6B7280] text-center" style={{ maxWidth: '300px' }}>
          ستظهر هنا جميع معاملاتك من إيداعات واستثمارات وسحوبات
        </p>
      </div>
    </div>
  );
}
