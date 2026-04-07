/**
 * Saudi Riyal Currency Formatting Utilities
 * Following SAMA (Saudi Central Bank) Guidelines
 * https://www.sama.gov.sa/ar-sa/Currency/SRS/Documents/Guidelines.pdf
 */

// Arabic-Indic numerals mapping
const arabicNumerals: { [key: string]: string } = {
  '0': '٠',
  '1': '٢',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
};

/**
 * Convert Western Arabic numerals to Arabic-Indic numerals
 */
function toArabicNumerals(num: string): string {
  return num.replace(/[0-9]/g, (digit) => arabicNumerals[digit] || digit);
}

/**
 * Format number with Arabic separators
 * Comma (٬) for thousands, Period (٫) for decimals
 */
function formatWithArabicSeparators(num: number, decimals: number = 2): string {
  const parts = num.toFixed(decimals).split('.');
  
  // Add thousands separator
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Join with period and convert to Arabic numerals
  const formatted = parts.join('.');
  const arabicFormatted = toArabicNumerals(formatted);
  
  // Replace Western separators with Arabic ones
  return arabicFormatted.replace(/,/g, '٬').replace(/\./g, '٫');
}

/**
 * Format amount in Saudi Riyal (SAR) following SAMA guidelines
 * Returns format: ٥٠٬٠٠٠٫٠٠ ر.س
 * 
 * @param amount - The amount to format
 * @param options - Formatting options
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
    showCurrency = true,
    compact = false,
  } = options;

  let value = Math.abs(amount);
  let suffix = '';

  // Compact format for large numbers
  if (compact) {
    if (value >= 1_000_000) {
      value = value / 1_000_000;
      suffix = ' م'; // million in Arabic
    } else if (value >= 1_000) {
      value = value / 1_000;
      suffix = ' ألف'; // thousand in Arabic
    }
  }

  const formatted = formatWithArabicSeparators(value, compact ? 1 : decimals);
  const currency = showCurrency ? ' ﷼' : '';
  const sign = amount < 0 ? '-' : '';

  return `${sign}${formatted}${suffix}${currency}`;
}

/**
 * Format percentage in Arabic
 * Returns format: ٪١٢٫٥
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  const formatted = formatWithArabicSeparators(Math.abs(value), decimals);
  const sign = value < 0 ? '-' : '+';
  return `${sign}${formatted}٪`;
}

/**
 * Format compact number for charts
 * Returns format without currency symbol
 */
export function formatChartValue(value: number): string {
  return formatSAR(value, { showCurrency: false, compact: true });
}