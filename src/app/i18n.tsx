import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'ar' | 'en';

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
};

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.overview': { ar: 'نظرة عامة', en: 'Overview' },
  'nav.opportunities': { ar: 'الفرص', en: 'Opportunities' },
  'nav.portfolio': { ar: 'استثماراتي', en: 'My Investments' },
  'nav.wallet': { ar: 'المحفظة المالية', en: 'Wallet' },

  // User menu
  'user.settings': { ar: 'الإعدادات', en: 'Settings' },
  'user.profile': { ar: 'الملف الشخصي', en: 'Profile' },
  'user.logout': { ar: 'تسجيل الخروج', en: 'Log out' },
  'user.name': { ar: 'أحمد المالكي', en: 'Ahmed Al-Malki' },

  // Portfolio page
  'portfolio.title': { ar: 'استثماراتي', en: 'My Investments' },
  'portfolio.subtitle': { ar: 'إجمالي قيمة المحفظة', en: 'Total portfolio value' },
  'portfolio.thisMonth': { ar: 'هذا الشهر', en: 'this month' },
  'portfolio.totalInvested': { ar: 'إجمالي المستثمر', en: 'Total Invested' },
  'portfolio.returns': { ar: 'العوائد', en: 'Returns' },
  'portfolio.avgReturn': { ar: 'متوسط', en: 'average' },
  'portfolio.active': { ar: 'نشطة', en: 'Active' },
  'portfolio.outOf': { ar: 'من أصل', en: 'out of' },
  'portfolio.allInvestments': { ar: 'جميع الاستثمارات', en: 'All Investments' },
  'portfolio.opportunity': { ar: 'الفرصة', en: 'Opportunity' },
  'portfolio.amount': { ar: 'المبلغ', en: 'Amount' },
  'portfolio.return': { ar: 'العائد', en: 'Return' },
  'portfolio.status': { ar: 'الحالة', en: 'Status' },
  'portfolio.nextPayment': { ar: 'الدفعة القادمة', en: 'Next Payment' },
  'portfolio.growth': { ar: 'نمو المحفظة', en: 'Portfolio Growth' },
  'portfolio.invested': { ar: 'المستثمر', en: 'Invested' },
  'portfolio.returnsLabel': { ar: 'العوائد', en: 'Returns' },
  'portfolio.positive': { ar: 'أداء إيجابي', en: 'Positive Performance' },
  'portfolio.riskAlert': { ar: 'تنبيه مخاطر', en: 'Risk Alert' },
  'portfolio.opportunity2': { ar: 'فرصة', en: 'Opportunity' },
  'portfolio.investNow': { ar: 'استثمر الآن', en: 'Invest Now' },
  'portfolio.addFunds': { ar: 'إضافة رصيد', en: 'Add Funds' },
  'portfolio.autoInvest': { ar: 'الاستثمار التلقائي', en: 'Auto Invest' },
  'portfolio.overdue': { ar: 'متأخرة', en: 'Overdue' },
  'portfolio.upcoming': { ar: 'قادمة', en: 'Upcoming' },
  'portfolio.received': { ar: 'مستلمة', en: 'Received' },
  'portfolio.totalDue': { ar: 'إجمالي المستحق', en: 'Total due' },
  'portfolio.view': { ar: 'عرض', en: 'View' },

  // Opportunity page
  'opp.back': { ar: 'العودة إلى الفرص', en: 'Back to Opportunities' },
  'opp.annualReturn': { ar: 'العائد السنوي', en: 'Annual Return' },
  'opp.duration': { ar: 'المدة', en: 'Duration' },
  'opp.months': { ar: 'شهر', en: 'months' },
  'opp.rating': { ar: 'التصنيف', en: 'Rating' },
  'opp.financingType': { ar: 'نوع التمويل', en: 'Financing Type' },
  'opp.fundingCollected': { ar: 'التمويل المجموع', en: 'Funding Collected' },
  'opp.completed': { ar: 'مكتمل', en: 'Completed' },
  'opp.investors': { ar: 'مستثمر', en: 'investors' },
  'opp.totalOf': { ar: 'من إجمالي', en: 'of total' },
  'opp.whyThis': { ar: 'لماذا هذه الفرصة؟', en: 'Why This Opportunity?' },
  'opp.useOfFunds': { ar: 'استخدام الأموال', en: 'Use of Funds' },
  'opp.projectSummary': { ar: 'ملخص المشروع', en: 'Project Summary' },
  'opp.locationSector': { ar: 'الموقع والقطاع', en: 'Location & Sector' },
  'opp.projectDetails': { ar: 'تفاصيل المشروع', en: 'Project Details' },
  'opp.totalFinancing': { ar: 'إجمالي التمويل', en: 'Total Financing' },
  'opp.investorCount': { ar: 'عدد المستثمرين', en: 'Investors' },
  'opp.repaymentFreq': { ar: 'تكرار السداد', en: 'Repayment Freq.' },
  'opp.monthly': { ar: 'شهري', en: 'Monthly' },
  'opp.minInvestment': { ar: 'الحد الأدنى', en: 'Minimum' },
  'opp.expectedReturns': { ar: 'العوائد المتوقعة', en: 'Expected Returns' },
  'opp.totalExpectedReturns': { ar: 'إجمالي العوائد المتوقعة', en: 'Total Expected Returns' },
  'opp.nextPayment': { ar: 'الدفعة القادمة', en: 'Next Payment' },
  'opp.cashflowSummary': { ar: 'ملخص التدفقات', en: 'Cash Flow Summary' },
  'opp.paymentCount': { ar: 'عدد الدفعات', en: 'Payments' },
  'opp.avgPayment': { ar: 'متوسط الدفعة', en: 'Avg. Payment' },
  'opp.insights': { ar: 'رؤى الاستثمار', en: 'Investment Insights' },
  'opp.returnForecast': { ar: 'توقعات العائد', en: 'Return Forecast' },
  'opp.fundingGrowth': { ar: 'نمو التمويل', en: 'Funding Growth' },
  'opp.schedule': { ar: 'جدول السداد', en: 'Repayment Schedule' },
  'opp.nextPaymentLabel': { ar: 'الدفعة القادمة', en: 'Next Payment' },
  'opp.paid': { ar: 'تم السداد', en: 'Paid' },
  'opp.currentPayment': { ar: 'الدفعة الحالية', en: 'Current Payment' },
  'opp.futurePayments': { ar: 'قادمة', en: 'Upcoming' },
  'opp.totalPayments': { ar: 'إجمالي الدفعات', en: 'Total Payments' },
  'opp.remaining': { ar: 'المتبقية', en: 'Remaining' },
  'opp.remainingAmount': { ar: 'المبلغ المتبقي', en: 'Remaining Amount' },
  'opp.riskAssessment': { ar: 'تقييم المخاطر', en: 'Risk Assessment' },
  'opp.creditRating': { ar: 'التصنيف الائتماني', en: 'Credit Rating' },
  'opp.riskFactors': { ar: 'عوامل المخاطرة', en: 'Risk Factors' },
  'opp.guarantees': { ar: 'الضمانات', en: 'Guarantees' },
  'opp.riskDistribution': { ar: 'توزيع المخاطر', en: 'Risk Distribution' },
  'opp.low': { ar: 'منخفض', en: 'Low' },
  'opp.medium': { ar: 'متوسط', en: 'Medium' },
  'opp.high': { ar: 'مرتفع', en: 'High' },
  'opp.borrowerInfo': { ar: 'معلومات الجهة المقترضة', en: 'Borrower Information' },
  'opp.companyName': { ar: 'اسم الشركة', en: 'Company' },
  'opp.experience': { ar: 'سنوات الخبرة', en: 'Experience' },
  'opp.years': { ar: 'سنة', en: 'years' },
  'opp.sector': { ar: 'القطاع', en: 'Sector' },
  'opp.documents': { ar: 'المستندات', en: 'Documents' },
  'opp.startInvesting': { ar: 'ابدأ الاستثمار', en: 'Start Investing' },
  'opp.enterAmount': { ar: 'أدخل المبلغ الذي ترغب باستثماره', en: 'Enter your investment amount' },
  'opp.amountLabel': { ar: 'المبلغ (ريال)', en: 'Amount (SAR)' },
  'opp.amountPlaceholder': { ar: 'أدخل المبلغ', en: 'Enter amount' },
  'opp.minLabel': { ar: 'الحد الأدنى', en: 'Minimum' },
  'opp.belowMin': { ar: 'أقل من الحد الأدنى', en: 'Below minimum' },
  'opp.quickSelect': { ar: 'أو اختر مبلغاً سريعاً', en: 'Or choose a quick amount' },
  'opp.expectedReturn': { ar: 'العائد المتوقع', en: 'Expected Return' },
  'opp.walletBalance': { ar: 'رصيدك المتاح', en: 'Available balance' },
  'opp.insufficientBalance': { ar: 'الرصيد غير كافي', en: 'Insufficient balance' },
  'opp.addBalance': { ar: '+ إضافة رصيد', en: '+ Add funds' },
  'opp.investNow': { ar: 'استثمر الآن', en: 'Invest Now' },
  'opp.invested': { ar: 'تم الاستثمار', en: 'Invested' },
  'opp.investedSubtitle': { ar: 'أنت مستثمر في هذه الفرصة', en: 'You are invested in this opportunity' },
  'opp.yourInvestment': { ar: 'مبلغ استثمارك', en: 'Your Investment' },
  'opp.netReturn': { ar: 'صافي العائد', en: 'Net Return' },
  'opp.viewPortfolio': { ar: 'عرض استثماراتي', en: 'View My Investments' },
  'opp.browseMore': { ar: 'تصفح فرص أخرى', en: 'Browse More Opportunities' },

  // Modal
  'modal.breakdown': { ar: 'تفاصيل الاستثمار', en: 'Investment Breakdown' },
  'modal.summary': { ar: 'ملخص الاستثمار', en: 'Investment Summary' },
  'modal.verify': { ar: 'تأكيد الاستثمار', en: 'Verify Investment' },
  'modal.success': { ar: 'تم بنجاح', en: 'Success' },
  'modal.processing': { ar: 'جارٍ التنفيذ', en: 'Processing' },
  'modal.investAmount': { ar: 'مبلغ الاستثمار', en: 'Investment Amount' },
  'modal.expectedProfit': { ar: 'الأرباح المتوقعة', en: 'Expected Profit' },
  'modal.platformFee': { ar: 'رسوم المنصة (2%)', en: 'Platform Fee (2%)' },
  'modal.vat': { ar: 'ضريبة القيمة المضافة (15%)', en: 'VAT (15%)' },
  'modal.netReturn': { ar: 'صافي العائد', en: 'Net Return' },
  'modal.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'modal.back': { ar: 'رجوع', en: 'Back' },
  'modal.continue': { ar: 'متابعة', en: 'Continue' },
  'modal.confirmVerify': { ar: 'تأكيد والتحقق', en: 'Confirm & Verify' },
  'modal.verifyInvest': { ar: 'تحقق واستثمر', en: 'Verify & Invest' },
  'modal.principal': { ar: 'رأس المال', en: 'Principal' },
  'modal.netProfit': { ar: 'صافي الأرباح', en: 'Net Profit' },
  'modal.totalAtMaturity': { ar: 'إجمالي المبلغ عند الاستحقاق', en: 'Total at Maturity' },
  'modal.effectiveRate': { ar: 'العائد الفعلي', en: 'Effective Rate' },
  'modal.agreeRisk': { ar: 'أقر بأنني قرأت وفهمت المخاطر المرتبطة بهذا الاستثمار وأوافق على الشروط والأحكام', en: 'I acknowledge that I have read and understood the risks associated with this investment and agree to the terms and conditions' },
  'modal.enterOtp': { ar: 'أدخل رمز التحقق', en: 'Enter verification code' },
  'modal.otpSent': { ar: 'تم إرسال رمز التحقق إلى', en: 'Verification code sent to' },
  'modal.resendIn': { ar: 'إعادة الإرسال خلال', en: 'Resend in' },
  'modal.seconds': { ar: 'ثانية', en: 'seconds' },
  'modal.resend': { ar: 'إعادة إرسال الرمز', en: 'Resend code' },
  'modal.processingInvestment': { ar: 'جارٍ تنفيذ الاستثمار...', en: 'Processing your investment...' },
  'modal.pleaseWait': { ar: 'يرجى الانتظار لحظات', en: 'Please wait a moment' },
  'modal.successTitle': { ar: 'تم الاستثمار بنجاح!', en: 'Investment Successful!' },
  'modal.successDesc': { ar: 'تم استثمار', en: 'You invested' },
  'modal.successIn': { ar: 'في', en: 'in' },
  'modal.expectedProfitLabel': { ar: 'الأرباح المتوقعة', en: 'Expected Profit' },
  'modal.totalPayout': { ar: 'إجمالي الاستحقاق', en: 'Total Payout' },
  'modal.emailNote': { ar: 'سيتم إرسال التفاصيل إلى بريدك الإلكتروني', en: 'Details will be sent to your email' },
  'modal.goToPortfolio': { ar: 'الذهاب إلى استثماراتي', en: 'Go to My Investments' },

  // Status
  'status.active': { ar: 'نشط', en: 'Active' },
  'status.completed': { ar: 'مكتمل', en: 'Completed' },
  'status.late': { ar: 'متأخر', en: 'Late' },

  // Login
  'login.portal': { ar: 'بوابة المستثمر', en: 'Investor Portal' },
  'login.title': { ar: 'تسجيل الدخول إلى حسابك', en: 'Sign in to your account' },
  'login.subtitle': { ar: 'ادخل إلى لوحة استثماراتك بأمان.', en: 'Access your investment dashboard securely.' },
  'login.nationalId': { ar: 'رقم الهوية الوطنية', en: 'National ID' },
  'login.nationalIdPlaceholder': { ar: '1XXXXXXXXX', en: '1XXXXXXXXX' },
  'login.password': { ar: 'كلمة المرور', en: 'Password' },
  'login.passwordPlaceholder': { ar: 'أدخل كلمة المرور', en: 'Enter your password' },
  'login.forgot': { ar: 'نسيت كلمة المرور؟', en: 'Forgot password?' },
  'login.submit': { ar: 'تسجيل الدخول', en: 'Sign In' },
  'login.secure': { ar: 'وصول آمن إلى حسابك الاستثماري', en: 'Secure access to your investment account' },
  'login.noAccount': { ar: 'ليس لديك حساب؟', en: "Don't have an account?" },
  'login.createAccount': { ar: 'إنشاء حساب', en: 'Create one' },
  'login.privacy': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
  'login.terms': { ar: 'الشروط والأحكام', en: 'Terms of Service' },
  'login.support': { ar: 'الدعم', en: 'Support' },

  // Lang
  'lang.ar': { ar: 'العربية', en: 'العربية' },
  'lang.en': { ar: 'English', en: 'English' },
};

const I18nContext = createContext<I18nCtx>({
  lang: 'ar',
  setLang: () => {},
  t: (k) => k,
  dir: 'rtl',
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');

  const t = (key: string) => translations[key]?.[lang] || key;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
