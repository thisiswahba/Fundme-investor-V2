# FundMe Illustration Kit

A collection of monochromatic blue illustrations following FundMe's brand guidelines.

## Design Principles

- **Monochromatic Blue**: Uses only brand colors (#002E83, #0D82F9)
- **2px Stroke Weight**: Consistent with design system guidelines
- **Minimal & Geometric**: Simple shapes that scale well
- **SVG-Based**: Scalable and performant

## Available Illustrations

### 1. InvestmentGrowthIllustration
Represents portfolio growth with an upward trend line and data points.
**Use for**: Performance sections, success states, growth metrics

### 2. PortfolioDiversificationIllustration
Pie chart showing asset allocation and diversification.
**Use for**: Portfolio overview, diversification stats, investment breakdown

### 3. WalletIllustration
Wallet with card slot representing available funds.
**Use for**: Wallet sections, balance display, payment features

### 4. SuccessIllustration
Check mark in circular badge for completed actions.
**Use for**: Success messages, completed transactions, confirmations

### 5. EmptyStateIllustration
Document outline with dashed circle for empty states.
**Use for**: No data states, empty lists, placeholder content

### 6. OpportunityIllustration
Target/bullseye representing investment opportunities.
**Use for**: Opportunity cards, investment targets, goals

### 7. TransferIllustration
Two wallets with arrow showing money transfer.
**Use for**: Transfer features, transactions, payment flow

### 8. SecurityIllustration
Shield with check mark for security and trust.
**Use for**: Security features, verification, trust badges

## Usage

```tsx
import { 
  InvestmentGrowthIllustration,
  WalletIllustration,
  SuccessIllustration 
} from './components/illustrations';

// Default size (200px)
<InvestmentGrowthIllustration />

// Custom size
<WalletIllustration size={150} />

// With custom className
<SuccessIllustration className="mx-auto" size={180} />
```

## Customization

All illustrations accept:
- `size`: number (default: 200) - Sets width and height
- `className`: string - Tailwind classes for positioning/styling
