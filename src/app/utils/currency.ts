/**
 * Saudi Riyal Currency Formatting Utilities
 * Following SAMA (Saudi Central Bank) Guidelines
 * Uses Western Arabic numerals (0-9) for consistency with Borrower platform
 */

/**
 * Format number with standard separators
 * Comma for thousands, period for decimals
 */
function formatWithSeparators(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format amount in Saudi Riyal (SAR)
 * Returns format: 50,000.00 ﷼
 */
export function formatSAR(
  amount: number,
  options: {
    decimals?: number;
    showCurrency?: boolean;
    compact?: boolean;
  } = {}
): string {
  const {
    decimals = 2,
    compact = false,
  } = options;

  let value = Math.abs(amount);
  let suffix = '';

  if (compact) {
    if (value >= 1_000_000) {
      value = value / 1_000_000;
      suffix = ' م';
    } else if (value >= 1_000) {
      value = value / 1_000;
      suffix = ' ألف';
    }
  }

  const formatted = formatWithSeparators(value, compact ? 1 : decimals);
  const sign = amount < 0 ? '-' : '';

  return `${sign}${formatted}${suffix}`;
}

/**
 * Format percentage
 * Returns format: +12.5%
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  const formatted = formatWithSeparators(Math.abs(value), decimals);
  const sign = value < 0 ? '-' : '+';
  return `${sign}${formatted}%`;
}

/**
 * Format compact number for charts
 */
export function formatChartValue(value: number): string {
  return formatSAR(value, { showCurrency: false, compact: true });
}
