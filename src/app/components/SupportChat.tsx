import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';
import { useI18n } from '../i18n';
import { usePersona } from '../demoPersona';
import { colors } from './fundme';

type Sender = 'agent' | 'user';
interface Message {
  id: string;
  sender: Sender;
  text: string;
  time: string;
}

type Tokens = ReturnType<typeof buildTokens>;

function buildTokens(isVIP: boolean) {
  if (isVIP) {
    return {
      isVIP: true,
      fabGradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      fabShadow: '0 8px 24px rgba(37,99,235,0.45), 0 2px 6px rgba(0,0,0,0.3)',
      badgeBg: '#F87171',
      badgeText: '#fff',
      panelBg: colors.dark.card,
      panelBorder: `1px solid ${colors.dark.border}`,
      panelShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      headerGradient: 'linear-gradient(135deg, #0F2A4D 0%, #1D4ED8 100%)',
      headerText: '#fff',
      headerSubText: 'rgba(255,255,255,0.65)',
      onlineDot: '#34D399',
      closeBtnBg: 'rgba(255,255,255,0.1)',
      closeBtnHover: 'rgba(255,255,255,0.18)',
      bodyBg: colors.dark.base,
      agentBubbleBg: colors.dark.elevated,
      agentBubbleBorder: `1px solid ${colors.dark.border}`,
      agentBubbleText: colors.textOnDark.primary,
      userBubbleBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      userBubbleText: '#fff',
      timestampColor: colors.textOnDark.muted,
      chipBg: colors.dark.elevated,
      chipBorder: `1px solid ${colors.dark.border}`,
      chipText: colors.textOnDark.secondary,
      chipHoverBg: 'rgba(37,99,235,0.15)',
      chipHoverBorder: '1px solid rgba(96,165,250,0.35)',
      chipHoverText: '#60A5FA',
      inputAreaBg: colors.dark.card,
      inputAreaBorder: `1px solid ${colors.dark.border}`,
      inputBg: colors.dark.elevated,
      inputBorder: `1px solid ${colors.dark.border}`,
      inputFocusBorder: '#60A5FA',
      inputFocusRing: '0 0 0 3px rgba(96,165,250,0.15)',
      inputText: colors.textOnDark.primary,
      inputPlaceholder: colors.textOnDark.muted,
      sendBtnBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
      sendBtnDisabledBg: colors.dark.hover,
      sendBtnDisabledIcon: colors.textOnDark.muted,
      typingDotBg: colors.textOnDark.tertiary,
      agentName: colors.textOnDark.primary,
    };
  }
  return {
    isVIP: false,
    fabGradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    fabShadow: '0 8px 24px rgba(37,99,235,0.35), 0 2px 6px rgba(0,0,0,0.12)',
    badgeBg: '#DC2626',
    badgeText: '#fff',
    panelBg: '#FFFFFF',
    panelBorder: '1px solid #E5E7EB',
    panelShadow: '0 24px 80px rgba(15,23,42,0.18)',
    headerGradient: 'linear-gradient(135deg, #0B1F3A 0%, #1D4ED8 100%)',
    headerText: '#fff',
    headerSubText: 'rgba(255,255,255,0.7)',
    onlineDot: '#22C55E',
    closeBtnBg: 'rgba(255,255,255,0.12)',
    closeBtnHover: 'rgba(255,255,255,0.2)',
    bodyBg: '#F8FAFC',
    agentBubbleBg: '#FFFFFF',
    agentBubbleBorder: '1px solid #E8ECF2',
    agentBubbleText: '#0F172A',
    userBubbleBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    userBubbleText: '#fff',
    timestampColor: '#94A3B8',
    chipBg: '#FFFFFF',
    chipBorder: '1px solid #E2E8F0',
    chipText: '#475569',
    chipHoverBg: '#EFF6FF',
    chipHoverBorder: '1px solid #BFDBFE',
    chipHoverText: '#1D4ED8',
    inputAreaBg: '#FFFFFF',
    inputAreaBorder: '1px solid #E5E7EB',
    inputBg: '#F8FAFC',
    inputBorder: '1px solid #E2E8F0',
    inputFocusBorder: '#3B82F6',
    inputFocusRing: '0 0 0 3px rgba(59,130,246,0.1)',
    inputText: '#0F172A',
    inputPlaceholder: '#94A3B8',
    sendBtnBg: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
    sendBtnDisabledBg: '#E2E8F0',
    sendBtnDisabledIcon: '#94A3B8',
    typingDotBg: '#94A3B8',
    agentName: '#0F172A',
  };
}

function useTokens(): Tokens {
  const { personaId } = usePersona();
  return buildTokens(personaId === 'vip');
}

const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

function getCannedReply(input: string, isAr: boolean): string {
  const q = input.toLowerCase();
  if (q.includes('سحب') || q.includes('withdraw')) {
    return isAr
      ? 'لسحب الأموال، اذهب إلى المحفظة واضغط على "سحب". يتم تحويل المبلغ خلال ١-٣ أيام عمل.'
      : 'To withdraw funds, go to Wallet and click "Withdraw". Transfers usually take 1–3 business days.';
  }
  if (q.includes('استثمار') || q.includes('invest') || q.includes('فرص')) {
    return isAr
      ? 'يمكنك تصفح الفرص المتاحة من تبويب "الفرص". كل فرصة تحتوي على تفاصيل العائد والمخاطر.'
      : 'You can browse available opportunities in the "Opportunities" tab. Each one shows expected return and risk.';
  }
  if (q.includes('vip') || q.includes('في آي بي') || q.includes('ترقية')) {
    return isAr
      ? 'مع باقة VIP تحصل على فرص حصرية، أولوية الوصول، وتحليلات متقدمة. هل ترغب بالترقية؟'
      : 'VIP gives you exclusive opportunities, priority access, and advanced analytics. Would you like to upgrade?';
  }
  if (q.includes('مشكلة') || q.includes('خطأ') || q.includes('bug') || q.includes('error') || q.includes('problem')) {
    return isAr
      ? 'آسف على الإزعاج! هل تقدر توصف المشكلة بتفاصيل أكثر؟ وأي صفحة كنت عليها؟'
      : 'Sorry about that! Could you describe the issue in more detail? Which page were you on?';
  }
  return isAr
    ? 'شكراً لتواصلك! سيتم الرد عليك خلال دقائق. إذا كان استفسارك عاجلاً، اتصل بنا على 920001234.'
    : 'Thanks for reaching out! We\'ll get back to you shortly. For urgent matters, call 920001234.';
}

export function SupportChat() {
  const { lang, dir } = useI18n();
  const isAr = lang === 'ar';
  const tk = useTokens();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: isAr
        ? 'أهلاً! أنا فيصل من فريق دعم فندمي. كيف أقدر أساعدك اليوم؟'
        : 'Hi! I\'m Faisal from FundMe support. How can I help you today?',
      time: now(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const quickChips = [
    { key: 'invest', label: isAr ? 'استفسار عن فرصة' : 'Ask about an opportunity' },
    { key: 'withdraw', label: isAr ? 'طلب سحب' : 'Withdraw request' },
    { key: 'vip', label: isAr ? 'باقة VIP' : 'VIP tier' },
    { key: 'bug', label: isAr ? 'مشكلة فنية' : 'Report an issue' },
  ];

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text: trimmed, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply: Message = { id: `a-${Date.now()}`, sender: 'agent', text: getCannedReply(trimmed, isAr), time: now() };
      setMessages(prev => [...prev, reply]);
      setTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleChip = (key: string) => {
    const map: Record<string, string> = {
      invest: isAr ? 'أريد معرفة المزيد عن الفرص المتاحة' : 'I want to learn more about available opportunities',
      withdraw: isAr ? 'كيف أسحب أموالي؟' : 'How do I withdraw my money?',
      vip: isAr ? 'ما الفرق بين VIP والعادي؟' : 'What\'s the difference with VIP?',
      bug: isAr ? 'واجهت مشكلة في التطبيق' : 'I encountered an issue in the app',
    };
    sendMessage(map[key] || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Persona switcher is on dir-start (right in LTR, left in RTL)
  // Place support on dir-end (left in LTR, right in RTL)
  const positionStyle: React.CSSProperties = dir === 'rtl' ? { right: 24 } : { left: 24 };

  const hasOnlyWelcome = messages.length === 1;

  return (
    <>
      <style>{`
        @keyframes sc-pop { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes sc-bounce { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-3px); opacity: 1; } }
        @keyframes sc-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Floating panel */}
      {open && (
        <div
          className="fixed bottom-24 md:bottom-24 z-[99] flex flex-col"
          style={{
            ...positionStyle,
            width: 'min(calc(100vw - 48px), 380px)',
            height: 'min(calc(100vh - 140px), 560px)',
            borderRadius: 20,
            overflow: 'hidden',
            background: tk.panelBg,
            border: tk.panelBorder,
            boxShadow: tk.panelShadow,
            animation: 'sc-pop 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          dir={dir}
        >
          {/* Header */}
          <div style={{ background: tk.headerGradient, padding: '18px 20px', color: tk.headerText, flexShrink: 0 }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px]" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.15)', fontWeight: 700 }}>
                    {isAr ? 'ف' : 'F'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2" style={{ background: tk.onlineDot, boxShadow: '0 0 0 2px rgba(0,0,0,0.2)' }} />
                </div>
                <div>
                  <div className="text-[14px]" style={{ fontWeight: 700 }}>
                    {isAr ? 'فيصل الشمري' : 'Faisal Al-Shamri'}
                  </div>
                  <div className="text-[11px] flex items-center gap-1.5" style={{ color: tk.headerSubText }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: tk.onlineDot }} />
                    {isAr ? 'متصل الآن · دعم فندمي' : 'Online · FundMe Support'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: tk.closeBtnBg }}
                onMouseEnter={e => (e.currentTarget.style.background = tk.closeBtnHover)}
                onMouseLeave={e => (e.currentTarget.style.background = tk.closeBtnBg)}
                aria-label={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: 'auto', background: tk.bodyBg, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className="flex flex-col"
                style={{
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'sc-fade-in 0.25s ease-out',
                }}
              >
                <div
                  className="px-3.5 py-2.5 text-[13px] leading-relaxed"
                  style={{
                    maxWidth: '82%',
                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.sender === 'user' ? tk.userBubbleBg : tk.agentBubbleBg,
                    color: msg.sender === 'user' ? tk.userBubbleText : tk.agentBubbleText,
                    border: msg.sender === 'agent' ? tk.agentBubbleBorder : 'none',
                    boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
                  }}
                >
                  {msg.text}
                </div>
                <div className="text-[10px] mt-1 px-1" style={{ color: tk.timestampColor, fontWeight: 500 }}>
                  {msg.time}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex" style={{ alignItems: 'flex-start' }}>
                <div
                  className="px-4 py-3 flex items-center gap-1.5"
                  style={{
                    borderRadius: '16px 16px 16px 4px',
                    background: tk.agentBubbleBg,
                    border: tk.agentBubbleBorder,
                  }}
                >
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: tk.typingDotBg, animation: `sc-bounce 1s ${delay}ms infinite ease-in-out` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {hasOnlyWelcome && !typing && (
              <div className="mt-2">
                <div className="text-[11px] mb-2 px-1" style={{ color: tk.timestampColor, fontWeight: 500 }}>
                  {isAr ? 'أو اختر من المواضيع السريعة:' : 'Or pick a quick topic:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickChips.map(chip => (
                    <button
                      key={chip.key}
                      onClick={() => handleChip(chip.key)}
                      className="px-3 py-1.5 text-[11px] rounded-full transition-all"
                      style={{
                        fontWeight: 500,
                        background: tk.chipBg,
                        border: tk.chipBorder,
                        color: tk.chipText,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = tk.chipHoverBg;
                        e.currentTarget.style.border = tk.chipHoverBorder;
                        e.currentTarget.style.color = tk.chipHoverText;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = tk.chipBg;
                        e.currentTarget.style.border = tk.chipBorder;
                        e.currentTarget.style.color = tk.chipText;
                      }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ background: tk.inputAreaBg, borderTop: tk.inputAreaBorder, padding: '12px 14px', flexShrink: 0 }}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAr ? 'اكتب رسالتك...' : 'Type your message...'}
                className="flex-1 h-10 px-4 rounded-full text-[13px] outline-none transition-all"
                style={{
                  background: tk.inputBg,
                  border: tk.inputBorder,
                  color: tk.inputText,
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = tk.inputFocusBorder;
                  e.currentTarget.style.boxShadow = tk.inputFocusRing;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = tk.inputBorder.replace('1px solid ', '');
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0"
                style={{
                  background: input.trim() && !typing ? tk.sendBtnBg : tk.sendBtnDisabledBg,
                  color: input.trim() && !typing ? '#fff' : tk.sendBtnDisabledIcon,
                  cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
                  boxShadow: input.trim() && !typing ? '0 2px 8px rgba(37,99,235,0.35)' : 'none',
                }}
                aria-label={isAr ? 'إرسال' : 'Send'}
              >
                <Send className="w-4 h-4" strokeWidth={2} style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : undefined }} />
              </button>
            </div>
            <div className="text-[10px] text-center mt-2 flex items-center justify-center gap-1.5" style={{ color: tk.timestampColor, fontWeight: 500 }}>
              <HelpCircle className="w-3 h-3" strokeWidth={1.8} />
              {isAr ? 'عادة نرد خلال دقائق' : 'We usually reply within minutes'}
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-20 md:bottom-6 z-[99] w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{
          ...positionStyle,
          background: tk.fabGradient,
          boxShadow: tk.fabShadow,
          color: '#fff',
        }}
        aria-label={isAr ? 'الدعم' : 'Support'}
      >
        {open ? (
          <X className="w-5 h-5" strokeWidth={2.5} />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" strokeWidth={2} />
            {unread && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: tk.badgeBg, color: tk.badgeText, fontWeight: 700, border: '2px solid rgba(255,255,255,0.3)' }}
              >
                1
              </span>
            )}
          </>
        )}
      </button>
    </>
  );
}
