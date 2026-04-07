// FundMe Abstract Illustration System
// Fintech-inspired, data-driven, minimal compositions
// Monochromatic blue palette only
// No literal objects - pure abstract elements

interface IllustrationProps {
  className?: string;
  size?: number;
}

// Portfolio Growth - Upward trend with nodes and rings
export function InvestmentGrowthIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background concentric rings - portfolio scope */}
      <circle cx="100" cy="100" r="85" stroke="#002E83" strokeWidth="1" opacity="0.06" fill="none" />
      <circle cx="100" cy="100" r="70" stroke="#0D82F9" strokeWidth="1" opacity="0.08" fill="none" />
      <circle cx="100" cy="100" r="55" stroke="#002E83" strokeWidth="1" opacity="0.1" fill="none" />
      
      {/* Upward trend line - capital growth */}
      <path
        d="M 45 145 Q 70 125, 85 130 T 115 105 T 145 75"
        stroke="#0D82F9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      
      {/* Subtle arrow indicating direction */}
      <path
        d="M 145 75 L 138 78 L 142 83"
        stroke="#0D82F9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      
      {/* Investment nodes */}
      <circle cx="45" cy="145" r="3.5" fill="#002E83" opacity="0.3" />
      <circle cx="85" cy="130" r="3.5" fill="#0D82F9" opacity="0.4" />
      <circle cx="115" cy="105" r="4" fill="#0D82F9" opacity="0.5" />
      <circle cx="145" cy="75" r="5" fill="#002E83" opacity="0.6" />
      
      {/* Subtle glow on final node */}
      <circle cx="145" cy="75" r="12" fill="#0D82F9" opacity="0.08" />
      <circle cx="145" cy="75" r="18" fill="#0D82F9" opacity="0.04" />
    </svg>
  );
}

// Investment Flow - Circular motion with connecting nodes
export function OpportunityIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring - investment scope */}
      <circle cx="100" cy="100" r="75" stroke="#002E83" strokeWidth="1" opacity="0.08" fill="none" />
      
      {/* Circular flow path */}
      <path
        d="M 100 35 A 65 65 0 1 1 99.9 35"
        stroke="#0D82F9"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
        strokeDasharray="8 6"
      />
      
      {/* Capital flow arc with subtle arrow */}
      <path
        d="M 145 55 A 65 65 0 0 1 165 100"
        stroke="#002E83"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 165 100 L 161 93 L 158 100"
        stroke="#002E83"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Investment nodes positioned around circle */}
      <circle cx="100" cy="35" r="4" fill="#0D82F9" opacity="0.4" />
      <circle cx="145" cy="55" r="4" fill="#002E83" opacity="0.5" />
      <circle cx="165" cy="100" r="5" fill="#0D82F9" opacity="0.6" />
      <circle cx="145" cy="145" r="4" fill="#002E83" opacity="0.4" />
      
      {/* Center focal point */}
      <circle cx="100" cy="100" r="8" fill="#002E83" opacity="0.15" />
      <circle cx="100" cy="100" r="3" fill="#002E83" opacity="0.5" />
      
      {/* Subtle gradient glow */}
      <circle cx="100" cy="100" r="25" fill="url(#centerGlow)" opacity="0.1" />
      
      <defs>
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor="#0D82F9" />
          <stop offset="100%" stopColor="#0D82F9" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Capital Transfer - Abstract flow between nodes
export function TransferIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background ring */}
      <circle cx="100" cy="100" r="70" stroke="#002E83" strokeWidth="1" opacity="0.06" fill="none" />
      
      {/* Left node - source */}
      <circle cx="55" cy="100" r="18" fill="#0D82F9" opacity="0.08" />
      <circle cx="55" cy="100" r="10" stroke="#002E83" strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx="55" cy="100" r="4" fill="#002E83" opacity="0.5" />
      
      {/* Right node - destination */}
      <circle cx="145" cy="100" r="18" fill="#0D82F9" opacity="0.08" />
      <circle cx="145" cy="100" r="10" stroke="#002E83" strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx="145" cy="100" r="4" fill="#002E83" opacity="0.5" />
      
      {/* Capital flow line with curve */}
      <path
        d="M 65 100 Q 100 85, 135 100"
        stroke="#0D82F9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Subtle directional arrow */}
      <path
        d="M 130 98 L 135 100 L 130 102"
        stroke="#0D82F9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Flow indicator nodes */}
      <circle cx="85" cy="95" r="2" fill="#0D82F9" opacity="0.4" />
      <circle cx="100" cy="92" r="2.5" fill="#0D82F9" opacity="0.6" />
      <circle cx="115" cy="95" r="2" fill="#0D82F9" opacity="0.4" />
    </svg>
  );
}

// Portfolio Distribution - Abstract geometric blocks
export function PortfolioDiversificationIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle frame */}
      <circle cx="100" cy="100" r="75" stroke="#002E83" strokeWidth="1" opacity="0.08" fill="none" />
      
      {/* Abstract geometric blocks - representing portfolio segments */}
      {/* Block 1 - Top */}
      <rect
        x="80"
        y="40"
        width="40"
        height="30"
        rx="4"
        fill="#0D82F9"
        opacity="0.12"
        stroke="#002E83"
        strokeWidth="1"
      />
      
      {/* Block 2 - Right */}
      <rect
        x="130"
        y="85"
        width="35"
        height="35"
        rx="4"
        fill="#002E83"
        opacity="0.08"
        stroke="#002E83"
        strokeWidth="1"
      />
      
      {/* Block 3 - Bottom */}
      <rect
        x="75"
        y="130"
        width="50"
        height="28"
        rx="4"
        fill="#0D82F9"
        opacity="0.15"
        stroke="#002E83"
        strokeWidth="1"
      />
      
      {/* Block 4 - Left */}
      <rect
        x="35"
        y="80"
        width="32"
        height="38"
        rx="4"
        fill="#002E83"
        opacity="0.1"
        stroke="#002E83"
        strokeWidth="1"
      />
      
      {/* Connecting nodes - showing relationships */}
      <circle cx="100" cy="100" r="15" fill="#0D82F9" opacity="0.08" />
      <circle cx="100" cy="100" r="6" fill="#002E83" opacity="0.4" />
      
      {/* Subtle connection lines */}
      <line x1="100" y1="100" x2="100" y2="70" stroke="#0D82F9" strokeWidth="1" opacity="0.15" />
      <line x1="100" y1="100" x2="130" y2="102" stroke="#0D82F9" strokeWidth="1" opacity="0.15" />
      <line x1="100" y1="100" x2="100" y2="130" stroke="#0D82F9" strokeWidth="1" opacity="0.15" />
      <line x1="100" y1="100" x2="67" y2="99" stroke="#0D82F9" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

// Wallet - Abstract capital container
export function WalletIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background ring */}
      <circle cx="100" cy="100" r="70" stroke="#002E83" strokeWidth="1" opacity="0.06" fill="none" />
      
      {/* Abstract container shape */}
      <rect
        x="55"
        y="70"
        width="90"
        height="60"
        rx="8"
        fill="#0D82F9"
        opacity="0.08"
        stroke="#002E83"
        strokeWidth="2"
      />
      
      {/* Inner data representation lines */}
      <line x1="70" y1="90" x2="110" y2="90" stroke="#002E83" strokeWidth="1.5" opacity="0.2" />
      <line x1="70" y1="100" x2="130" y2="100" stroke="#0D82F9" strokeWidth="2" opacity="0.25" />
      <line x1="70" y1="110" x2="120" y2="110" stroke="#002E83" strokeWidth="1.5" opacity="0.2" />
      
      {/* Value indicator node */}
      <circle cx="130" cy="100" r="6" fill="#002E83" opacity="0.4" />
      <circle cx="130" cy="100" r="10" fill="#0D82F9" opacity="0.1" />
    </svg>
  );
}

// Success State - Completion indicator
export function SuccessIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Concentric rings - radiating success */}
      <circle cx="100" cy="100" r="80" stroke="#002E83" strokeWidth="1" opacity="0.05" fill="none" />
      <circle cx="100" cy="100" r="65" stroke="#0D82F9" strokeWidth="1" opacity="0.08" fill="none" />
      <circle cx="100" cy="100" r="50" stroke="#002E83" strokeWidth="1.5" opacity="0.12" fill="none" />
      
      {/* Center circle with glow */}
      <circle cx="100" cy="100" r="35" fill="#0D82F9" opacity="0.08" />
      <circle cx="100" cy="100" r="35" stroke="#002E83" strokeWidth="2" fill="none" opacity="0.3" />
      
      {/* Check mark - minimal */}
      <path
        d="M 82 100 L 95 113 L 118 87"
        stroke="#002E83"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

// Empty State - No data indicator
export function EmptyStateIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dashed circle - indicating empty state */}
      <circle
        cx="100"
        cy="100"
        r="65"
        stroke="#002E83"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        opacity="0.15"
        fill="none"
      />
      
      {/* Inner dashed circle */}
      <circle
        cx="100"
        cy="100"
        r="45"
        stroke="#0D82F9"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.1"
        fill="none"
      />
      
      {/* Center placeholder nodes */}
      <circle cx="85" cy="100" r="3" fill="#002E83" opacity="0.15" />
      <circle cx="100" cy="100" r="3" fill="#0D82F9" opacity="0.2" />
      <circle cx="115" cy="100" r="3" fill="#002E83" opacity="0.15" />
      
      {/* Subtle vertical lines indicating no data */}
      <line x1="85" y1="90" x2="85" y2="110" stroke="#002E83" strokeWidth="1" opacity="0.1" />
      <line x1="100" y1="85" x2="100" y2="115" stroke="#0D82F9" strokeWidth="1" opacity="0.12" />
      <line x1="115" y1="90" x2="115" y2="110" stroke="#002E83" strokeWidth="1" opacity="0.1" />
    </svg>
  );
}

// Security - Protected data nodes
export function SecurityIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background ring */}
      <circle cx="100" cy="100" r="70" stroke="#002E83" strokeWidth="1" opacity="0.06" fill="none" />
      
      {/* Abstract shield representation - geometric */}
      <path
        d="M 100 55 L 75 70 L 75 105 Q 75 125 100 140 Q 125 125 125 105 L 125 70 Z"
        fill="#0D82F9"
        opacity="0.08"
        stroke="#002E83"
        strokeWidth="2"
      />
      
      {/* Security nodes inside */}
      <circle cx="88" cy="95" r="3" fill="#002E83" opacity="0.4" />
      <circle cx="100" cy="100" r="4" fill="#0D82F9" opacity="0.5" />
      <circle cx="112" cy="95" r="3" fill="#002E83" opacity="0.4" />
      
      {/* Connecting lines - secure network */}
      <line x1="88" y1="95" x2="100" y2="100" stroke="#0D82F9" strokeWidth="1" opacity="0.2" />
      <line x1="100" y1="100" x2="112" y2="95" stroke="#0D82F9" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
