// Minimal Abstract Hero Background - Premium Fintech Aesthetic
// Single capital flow line with strategic nodes and subtle glows
export function AbstractHeroIllustration() {
  return (
    <svg 
      className="absolute left-0 top-0 w-full h-full"
      viewBox="0 0 800 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin slice"
    >
      {/* Large background circle - portfolio scope (very subtle) */}
      <g opacity="0.05">
        <circle 
          cx="200" 
          cy="200" 
          r="280" 
          stroke="white" 
          strokeWidth="1" 
          fill="none"
        />
      </g>

      {/* Secondary circle - nested layer */}
      <g opacity="0.08">
        <circle 
          cx="200" 
          cy="200" 
          r="180" 
          stroke="white" 
          strokeWidth="1" 
          fill="none"
        />
      </g>

      {/* Main capital flow curve - single clean path */}
      <g opacity="0.18">
        <path 
          d="M 100 240 Q 280 180, 480 220 T 720 260" 
          stroke="white" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Strongest glow - near portfolio value area (left side) */}
      <g style={{ filter: 'blur(80px)' }}>
        <circle 
          cx="180" 
          cy="200" 
          r="160" 
          fill="url(#portfolioGlow)"
          opacity="0.25"
        />
      </g>

      {/* Investment nodes with focused glows - only 3 nodes */}
      
      {/* Node 1 - Start (left) - strongest emphasis */}
      <g style={{ filter: 'blur(4px)' }}>
        <circle cx="100" cy="240" r="18" fill="white" opacity="0.12" />
        <circle cx="100" cy="240" r="10" fill="white" opacity="0.2" />
      </g>
      <circle cx="100" cy="240" r="5" fill="white" opacity="0.4" />
      
      {/* Node 2 - Mid point */}
      <g style={{ filter: 'blur(4px)' }}>
        <circle cx="480" cy="220" r="16" fill="#0D82F9" opacity="0.15" />
        <circle cx="480" cy="220" r="8" fill="#0D82F9" opacity="0.25" />
      </g>
      <circle cx="480" cy="220" r="4" fill="white" opacity="0.35" />
      
      {/* Node 3 - End point (right) */}
      <g style={{ filter: 'blur(3px)' }}>
        <circle cx="720" cy="260" r="14" fill="white" opacity="0.1" />
        <circle cx="720" cy="260" r="7" fill="white" opacity="0.2" />
      </g>
      <circle cx="720" cy="260" r="4" fill="white" opacity="0.3" />

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="portfolioGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0D82F9" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#2563EB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0D82F9" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
