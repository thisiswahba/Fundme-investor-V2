interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ progress, showLabel = false, height = 'md' }: ProgressBarProps) {
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  }[height];

  return (
    <div className="w-full">
      <div className={`w-full bg-[#F1F4F9] rounded-full overflow-hidden ${heightClass}`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: progress >= 100 
              ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
          }}
        />
      </div>
      {showLabel && (
        <div className="mt-1.5 text-[11px] text-[#6B7280]" style={{ fontWeight: 500 }}>
          {progress.toFixed(0)}٪ مكتمل
        </div>
      )}
    </div>
  );
}
