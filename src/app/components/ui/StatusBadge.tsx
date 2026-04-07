interface StatusBadgeProps {
  status: 'active' | 'completed' | 'late' | 'pending' | 'processing';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = {
    active: {
      label: 'نشط',
      bg: '#ECFDF5',
      text: '#059669',
    },
    completed: {
      label: 'مكتمل',
      bg: '#F0F9FF',
      text: '#0284C7',
    },
    late: {
      label: 'متأخر',
      bg: '#FEF2F2',
      text: '#DC2626',
    },
    pending: {
      label: 'قيد الانتظار',
      bg: '#FEF3C7',
      text: '#D97706',
    },
    processing: {
      label: 'قيد المعالجة',
      bg: '#F3F4F6',
      text: '#4B5563',
    },
  };

  const { label, bg, text } = config[status];
  const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5';
  const fontSize = size === 'sm' ? 'text-[11px]' : 'text-[12px]';

  return (
    <span
      className={`inline-flex items-center rounded-full ${padding} ${fontSize}`}
      style={{
        backgroundColor: bg,
        color: text,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}
