interface RiskBadgeProps {
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  size?: 'sm' | 'md';
}

export function RiskBadge({ grade, size = 'sm' }: RiskBadgeProps) {
  const config = {
    A: { label: 'A - منخفض جداً', color: '#10B981', bg: '#ECFDF5' },
    B: { label: 'B - منخفض', color: '#34D399', bg: '#D1FAE5' },
    C: { label: 'C - متوسط', color: '#F59E0B', bg: '#FEF3C7' },
    D: { label: 'D - عالي', color: '#F97316', bg: '#FFEDD5' },
    E: { label: 'E - عالي جداً', color: '#EF4444', bg: '#FEE2E2' },
  };

  const { label, color, bg } = config[grade];
  const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5';
  const fontSize = size === 'sm' ? 'text-[11px]' : 'text-[12px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${padding} ${fontSize}`}
      style={{
        backgroundColor: bg,
        color: color,
        fontWeight: 600,
      }}
    >
      <span 
        className="w-1.5 h-1.5 rounded-full" 
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
