import { TransferIllustration } from '../illustrations';
import { useI18n } from '../../i18n';

export function EmptyTransactionsSection() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  return (
    <div
      className="bg-white rounded-2xl pt-8 px-8"
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Title */}
      <h3 className="text-[18px] text-[#0B1A3A] mb-6" style={{ fontWeight: 700 }}>
        {isAr ? 'المعاملات الأخيرة' : 'Recent Transactions'}
      </h3>

      {/* Empty State */}
      <div className="flex flex-col items-center pb-8" style={{ minHeight: '311px', justifyContent: 'center' }}>
        <div className="mb-8">
          <TransferIllustration size={140} />
        </div>
        <h4 className="text-[16px] text-[#0B1A3A] mb-2 text-center" style={{ fontWeight: 700 }}>
          {isAr ? 'لا توجد معاملات' : 'No transactions yet'}
        </h4>
        <p className="text-[13px] text-[#6B7280] text-center">
          {isAr
            ? 'ستظهر هنا جميع معاملاتك من إيداعات واستثمارات وسحوبات'
            : 'All your deposits, investments, and withdrawals will appear here'}
        </p>
      </div>
    </div>
  );
}
