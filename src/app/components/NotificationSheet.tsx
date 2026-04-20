import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, CheckCheck, Bell, BellOff, CheckCircle2, Info, AlertTriangle,
  Briefcase, ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Tokens
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      surface: colors.dark.card,
      innerSurface: colors.dark.elevated,
      border: `1px solid ${colors.dark.border}`,
      divider: colors.dark.borderSubtle,
      textPrimary: colors.textOnDark.primary,
      textSecondary: colors.textOnDark.secondary,
      textMuted: colors.textOnDark.tertiary,
      textFaint: colors.textOnDark.muted,
      iconBg: colors.dark.hover,
      iconColor: colors.textOnDark.tertiary,
      brandInk: '#60A5FA',
      brandSoft: 'rgba(37,99,235,0.16)',
      brandSoftBorder: 'rgba(96,165,250,0.28)',
      unreadCardBg: 'rgba(37,99,235,0.06)',
      unreadCardBorder: 'rgba(96,165,250,0.18)',
      readCardBg: colors.dark.elevated,
      readCardBorder: colors.dark.border,
      successBg: 'rgba(43,182,115,0.16)', successColor: '#34D399',
      infoBg: 'rgba(37,99,235,0.16)',     infoColor: '#60A5FA',
      warningBg: 'rgba(245,158,11,0.18)', warningColor: '#FBBF24',
      dangerBg: 'rgba(220,38,38,0.16)',   dangerColor: '#F87171',
      filterPillBg: colors.dark.elevated,
      filterPillBorder: colors.dark.border,
      btnHover: colors.dark.hover,
    };
  }
  return {
    isVIP: false,
    surface: '#FFFFFF',
    innerSurface: '#F8FAFC',
    border: '1px solid #EEF1F5',
    divider: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    textFaint: '#CBD5E1',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    brandInk: '#1D4ED8',
    brandSoft: '#EFF6FF',
    brandSoftBorder: '#BFDBFE',
    unreadCardBg: '#F0F6FF',
    unreadCardBorder: '#DBEAFE',
    readCardBg: '#FFFFFF',
    readCardBorder: '#EEF1F5',
    successBg: '#ECFDF5', successColor: '#10B981',
    infoBg: '#EFF6FF',    infoColor: '#1D4ED8',
    warningBg: '#FEF3C7', warningColor: '#D97706',
    dangerBg: '#FEF2F2',  dangerColor: '#DC2626',
    filterPillBg: '#F8FAFC',
    filterPillBorder: '#EEF1F5',
    btnHover: '#F8FAFC',
  };
}

type Tokens = ReturnType<typeof buildTokens>;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Notification model
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type NotificationKind = 'success' | 'info' | 'warning' | 'danger';

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  /** Minutes ago — timestamp will be relative-formatted */
  minutesAgo: number;
  unread: boolean;
  ctaLabelAr?: string;
  ctaLabelEn?: string;
}

const SEED: NotificationItem[] = [
  {
    id: 'n1',
    kind: 'success',
    titleAr: 'تم تأكيد الاستثمار',
    titleEn: 'Investment Confirmed',
    bodyAr: 'تم تأكيد استثمارك بقيمة ٥٬٠٠٠ ﷼ في فرصة الراجحي.',
    bodyEn: 'Your investment of SAR 5,000 in Al-Rajhi Opportunity has been confirmed.',
    minutesAgo: 5 * 60,
    unread: true,
    ctaLabelAr: 'عرض الاستثمار',
    ctaLabelEn: 'View investment',
  },
  {
    id: 'n2',
    kind: 'success',
    titleAr: 'تم استلام الدفعة',
    titleEn: 'Payment Received',
    bodyAr: 'تم إيداع دفعة أرباح بقيمة ٢٥٠ ﷼ في محفظتك.',
    bodyEn: 'Profit payment of SAR 250 has been credited to your wallet.',
    minutesAgo: 24 * 60,
    unread: true,
    ctaLabelAr: 'فتح المحفظة',
    ctaLabelEn: 'Open wallet',
  },
  {
    id: 'n3',
    kind: 'info',
    titleAr: 'فرصة استثمار جديدة',
    titleEn: 'New Opportunity Available',
    bodyAr: 'فرصة استثمار جديدة تطابق تفضيلاتك متاحة الآن.',
    bodyEn: 'A new investment opportunity matching your preferences is now available.',
    minutesAgo: 2 * 24 * 60,
    unread: false,
    ctaLabelAr: 'استعراض الفرص',
    ctaLabelEn: 'Browse opportunities',
  },
  {
    id: 'n4',
    kind: 'warning',
    titleAr: 'مستند مطلوب',
    titleEn: 'Document Required',
    bodyAr: 'يرجى رفع نسخة محدّثة من وثيقة الهوية للمتابعة.',
    bodyEn: 'Please upload your updated ID document to continue.',
    minutesAgo: 3 * 24 * 60,
    unread: false,
    ctaLabelAr: 'رفع المستند',
    ctaLabelEn: 'Upload document',
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Time formatting (relative)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function formatRelative(minutesAgo: number, isAr: boolean): string {
  if (minutesAgo < 1) return isAr ? 'الآن' : 'Just now';
  if (minutesAgo < 60) {
    const m = Math.floor(minutesAgo);
    return isAr
      ? `قبل ${m} ${m === 1 ? 'دقيقة' : m === 2 ? 'دقيقتين' : m <= 10 ? 'دقائق' : 'دقيقة'}`
      : `${m} min ago`;
  }
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) {
    if (isAr) {
      const word = hours === 1 ? 'ساعة' : hours === 2 ? 'ساعتين' : hours <= 10 ? 'ساعات' : 'ساعة';
      return `قبل ${hours} ${word}`;
    }
    return `about ${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    if (isAr) {
      const word = days === 1 ? 'يوم' : days === 2 ? 'يومين' : days <= 10 ? 'أيام' : 'يوم';
      return `قبل ${days} ${word}`;
    }
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  const weeks = Math.floor(days / 7);
  return isAr ? `قبل ${weeks} أسابيع` : `${weeks} week${weeks === 1 ? '' : 's'} ago`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Sheet
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface NotificationSheetProps {
  open: boolean;
  onClose: () => void;
}

type Filter = 'all' | 'unread';

export function NotificationSheet({ open, onClose }: NotificationSheetProps) {
  const { lang, dir } = useI18n();
  const { personaId } = usePersona();
  const tk = buildTokens(personaId === 'vip');
  const isAr = lang === 'ar';

  const [items, setItems] = useState<NotificationItem[]>(SEED);
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => filter === 'unread' ? items.filter((n) => n.unread) : items,
    [items, filter],
  );
  const unreadCount = items.filter((n) => n.unread).length;

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const sheetSide = dir === 'rtl' ? 'left-0' : 'right-0';
  const slideFrom = dir === 'rtl' ? -100 : 100;

  const markOneRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const markAllRead = () => {
    if (unreadCount === 0) return;
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success(
      isAr ? 'تم تعليم كل الإشعارات كمقروءة' : 'All notifications marked as read',
      { duration: 2200 },
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150]"
            style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.aside
            initial={{ x: `${slideFrom}%` }}
            animate={{ x: 0 }}
            exit={{ x: `${slideFrom}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className={`fixed top-0 ${sheetSide} h-full w-full max-w-[440px] z-[151] flex flex-col`}
            style={{
              background: tk.surface,
              borderInlineStart: tk.border,
              boxShadow: '-20px 0 60px rgba(15,23,42,0.18)',
            }}
            dir={dir}
          >
            {/* Header */}
            <header
              className="flex items-center justify-between gap-3 px-5 py-4 shrink-0"
              style={{ borderBottom: `1px solid ${tk.divider}` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: tk.isVIP
                      ? 'linear-gradient(135deg, rgba(96,165,250,0.18) 0%, rgba(37,99,235,0.22) 100%)'
                      : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                    border: `1px solid ${tk.brandSoftBorder}`,
                  }}
                >
                  <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} style={{ color: tk.brandInk } as React.CSSProperties} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[16px] truncate" style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.015em' }}>
                    {isAr ? 'الإشعارات' : 'Notifications'}
                  </h2>
                  <p className="text-[11px] mt-0.5" style={{ color: tk.textMuted, fontWeight: 500 }}>
                    {unreadCount > 0
                      ? (isAr ? `${unreadCount} غير مقروء` : `${unreadCount} unread`)
                      : (isAr ? 'كل الإشعارات مقروءة' : 'All caught up')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label={isAr ? 'إغلاق' : 'Close'}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                style={{ color: tk.textMuted, background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = tk.btnHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </header>

            {/* Filter + actions row */}
            <div
              className="flex items-center justify-between gap-3 px-5 py-3 shrink-0"
              style={{ borderBottom: `1px solid ${tk.divider}` }}
            >
              <div
                className="inline-flex items-center gap-1 p-1 rounded-lg"
                style={{ background: tk.filterPillBg, border: `1px solid ${tk.filterPillBorder}` }}
              >
                {([
                  { key: 'all' as const,    labelAr: 'الكل',         labelEn: 'All' },
                  { key: 'unread' as const, labelAr: 'غير المقروءة', labelEn: 'Unread' },
                ]).map((f) => {
                  const isActive = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className="h-7 px-3 rounded-md text-[12px] transition-all cursor-pointer"
                      style={{
                        background: isActive ? tk.surface : 'transparent',
                        color: isActive ? tk.textPrimary : tk.textMuted,
                        fontWeight: isActive ? 700 : 500,
                        boxShadow: isActive
                          ? (tk.isVIP
                            ? '0 1px 2px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)'
                            : '0 1px 2px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.04)')
                          : 'none',
                      }}
                    >
                      {isAr ? f.labelAr : f.labelEn}
                      {f.key === 'unread' && unreadCount > 0 && (
                        <span
                          className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 ms-1.5 rounded-full text-[9.5px] tabular-nums"
                          style={{
                            background: isActive ? tk.brandInk : tk.iconBg,
                            color: isActive ? '#FFFFFF' : tk.textMuted,
                            fontWeight: 700,
                          }}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-[11.5px] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ color: tk.brandInk, fontWeight: 600 }}
                onMouseEnter={(e) => { if (unreadCount > 0) e.currentTarget.style.background = tk.brandSoft; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <CheckCheck className="w-3.5 h-3.5" strokeWidth={2} />
                {isAr ? 'تعليم الكل كمقروء' : 'Mark all read'}
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {visible.length === 0 ? (
                <EmptyState tk={tk} isAr={isAr} />
              ) : (
                <ul className="space-y-2.5">
                  {visible.map((n) => (
                    <li key={n.id}>
                      <NotificationCard
                        tk={tk}
                        isAr={isAr}
                        item={n}
                        onClick={() => markOneRead(n.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function kindStyles(kind: NotificationKind, tk: Tokens) {
  switch (kind) {
    case 'success': return { Icon: CheckCircle2,  bg: tk.successBg, color: tk.successColor };
    case 'info':    return { Icon: Info,          bg: tk.infoBg,    color: tk.infoColor };
    case 'warning': return { Icon: AlertTriangle, bg: tk.warningBg, color: tk.warningColor };
    case 'danger':  return { Icon: AlertTriangle, bg: tk.dangerBg,  color: tk.dangerColor };
  }
}

function NotificationCard({
  tk, isAr, item, onClick,
}: {
  tk: Tokens; isAr: boolean; item: NotificationItem; onClick: () => void;
}) {
  const { Icon, bg, color } = kindStyles(item.kind, tk);
  return (
    <button
      onClick={onClick}
      className="w-full text-start rounded-xl p-3.5 transition-all cursor-pointer"
      style={{
        background: item.unread ? tk.unreadCardBg : tk.readCardBg,
        border: `1px solid ${item.unread ? tk.unreadCardBorder : tk.readCardBorder}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = tk.isVIP
          ? '0 4px 14px rgba(0,0,0,0.3)'
          : '0 4px 10px rgba(15,23,42,0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: bg }}
        >
          <Icon className="w-[16px] h-[16px]" strokeWidth={2} style={{ color } as React.CSSProperties} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="text-[13.5px] truncate"
              style={{ fontWeight: 700, color: tk.textPrimary, letterSpacing: '-0.005em' }}
            >
              {isAr ? item.titleAr : item.titleEn}
            </h3>
            {item.unread && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: tk.brandInk, boxShadow: `0 0 0 3px ${tk.brandSoft}` }}
              />
            )}
          </div>
          <p
            className="text-[12.5px] mt-1 leading-relaxed"
            style={{ color: tk.textSecondary }}
          >
            {isAr ? item.bodyAr : item.bodyEn}
          </p>
          <div className="flex items-center justify-between gap-3 mt-2.5">
            <span className="text-[11px]" style={{ color: tk.textMuted, fontWeight: 500 }}>
              {formatRelative(item.minutesAgo, isAr)}
            </span>
            {(item.ctaLabelAr || item.ctaLabelEn) && (
              <span
                className="inline-flex items-center gap-1 text-[11.5px]"
                style={{ color: tk.brandInk, fontWeight: 600 }}
              >
                {isAr ? item.ctaLabelAr : item.ctaLabelEn}
                <ExternalLink className="w-3 h-3" strokeWidth={2} />
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function EmptyState({ tk, isAr }: { tk: Tokens; isAr: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: tk.iconBg }}
      >
        <BellOff className="w-6 h-6" strokeWidth={1.5} style={{ color: tk.textMuted } as React.CSSProperties} />
      </div>
      <h3 className="text-[14px]" style={{ fontWeight: 700, color: tk.textPrimary }}>
        {isAr ? 'لا توجد إشعارات' : 'No notifications'}
      </h3>
      <p className="text-[12px] mt-1.5 max-w-[260px]" style={{ color: tk.textMuted }}>
        {isAr ? 'ستظهر الإشعارات الجديدة هنا فور توفّرها' : 'New notifications will appear here as they arrive'}
      </p>
    </div>
  );
}
