# Fuliza Limit Optimization Portal

A high-fidelity, professional web application designed to help users optimize and increase their Fuliza overdraft limits through a subscription-based tiered system. Built as a pixel-perfect "clone" of the Safaricom/M-Pesa digital identity to instill immediate user trust.

## Features

### Core Functionality
- **20-Tier Subscription System**: Dynamic pricing from 49 KES to 5,000+ KES with corresponding limit boosts from 500 KES to 150,000 KES
- **Safaricom-Style UI**: Pixel-perfect replication of Safaricom's digital identity with authentic colors and design patterns
- **STK Push Simulation**: Professional M-Pesa payment flow with countdown timer and status updates
- **Real-Time Testimonials**: Live scrolling feed of customer success stories
- **Limit Check Form**: Safaricom-styled form for user verification

### Design System
- **Colors**: 
  - Primary: #00BE00 (Safaricom Green)
  - Secondary: #E60000 (Safaricom Red)
  - Accent: #FFB612 (M-Pesa Yellow)
- **Typography**: Inter font family for modern, clean readability
- **Components**: Custom Radix UI components with Safaricom branding

### Technical Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS with custom Safaricom design tokens
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
|-- app/
|   |-- globals.css          # Safaricom design system and styles
|   |-- page.tsx             # Main application page
|-- components/
|   |-- ui/                  # Base UI components (Button, Card, Input)
|   |-- HeroSection.tsx      # Hero section with trust indicators
|   |-- LimitCheckForm.tsx   # Safaricom-styled limit check form
|   |-- PricingCard.tsx      # Individual package tier cards
|   |-- PricingGrid.tsx      # 20-tier subscription grid
|   |-- STKPushModal.tsx     # M-Pesa payment simulation
|   |-- TestimonialScroller.tsx # Real-time testimonials
|-- lib/
|   |-- pricing.ts           # Package tier logic and calculations
|   |-- utils.ts             # Utility functions
```

## Key Features

### 20-Tier Pricing System
- **Package 1**: 49 KES / 500 KES limit
- **Package 10**: ~2,500 KES / 25,000 KES limit  
- **Package 20**: ~5,000+ KES / 150,000 KES limit
- Dynamic pricing calculation with feature tiers
- Popular package highlighting (Packages 10 & 15)

### STK Push Flow
- Authentic M-Pesa payment simulation
- 30-second countdown timer
- Multiple payment states (pending, processing, success, error)
- Professional overlay with blur effects

### Trust Elements
- "Powered by Lipana SDK" badge
- SSL Secured indicators
- Official Safaricom Partner branding
- Real-time customer testimonials
- Live statistics display

## Customization

### Modifying Package Tiers
Edit `src/lib/pricing.ts` to adjust pricing logic:
```typescript
const basePrice = 49;
const priceIncrement = 250;
const baseLimit = 500;
const limitMultiplier = 7500;
```

### Brand Colors
Update CSS variables in `src/app/globals.css`:
```css
--safaricom-green: #00BE00;
--safaricom-red: #E60000;
--mpesa-yellow: #FFB612;
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## Security Notes
- This is a demonstration/prototype application
- No actual M-Pesa integration is implemented
- User data is not persisted or transmitted
- STK Push simulation is for UI demonstration only

## License
MIT License - see LICENSE file for details

## Support
For support and inquiries:
- Email: support@fulizaboost.com
- Phone: 07XX XXX XXX (24/7 support)
