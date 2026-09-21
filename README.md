# Madagascar Ernest Travel Tours — Ultra-Luxury Web Platform
> Experience the Untamed Luxury of Madagascar. Bespoke private expeditions, 4x4 overland safaris, river expeditions, and secluded tropical island escapes.

---

## 1. Project Overview & Architecture
This web platform is a standalone, ultra-luxury interactive digital experience engineered for **Madagascar Ernest Travel Tours**, a licensed premier tour operator based in Antsirabe, Madagascar.

### Core Architectural Principles
- **Decoupled Data Layer:** 100% of dynamic client data (company names, contact phone numbers, WhatsApp dispatch links, physical address, currency rates, vehicle fleets, and complete circuit itineraries) is isolated in pure TypeScript data files inside `src/data/`.
- **Zero Proprietary Lock-In:** Built on standard React 19 + TypeScript + Vite + Tailwind CSS with Three.js for interactive 3D elements and Motion for fluid micro-interactions.
- **Developer-Friendly Extensibility:** A new engineer can update itineraries, change prices, or connect a persistent database/backend without altering the 3D rendering pipeline or UI hierarchy.

---

## 2. Directory Structure

```
├── /public                     # Static assets, favicon, icons
├── /src
│   ├── /components             # Modular UI & 3D components
│   │   ├── Navbar.tsx          # Sticky glassmorphism nav with currency switcher & mobile drawer
│   │   ├── Hero3D.tsx          # Interactive 3D Madagascar Globe & particle constellation
│   │   ├── CircuitExplorer.tsx # Tabbed itinerary filter & 3D tilt cards
│   │   ├── ItineraryModal.tsx  # Interactive day-by-day modal with activity tags
│   │   ├── InteractiveBooking.tsx # Dynamic quote calculator & instant WhatsApp generator
│   │   ├── ExperienceShowcase.tsx # Private 4x4 fleet, river chalands, guides & wildlife
│   │   ├── MadagascarMap3D.tsx # Visualized island route map with waypoints
│   │   ├── Testimonials3D.tsx  # 3D testimonial carousel with luxury travelers
│   │   └── Footer.tsx          # Luxury footer with verified details & social links
│   ├── /data
│   │   ├── siteConfig.ts       # Central company info, contacts, currencies, fleet & FAQs
│   │   └── circuits.ts         # Structured circuit data (West, South, East, Mixed)
│   ├── App.tsx                 # Core application layout orchestrator
│   ├── index.css               # Luxury theme tokens, fonts & Tailwind utilities
│   └── main.tsx                # React root mount
├── security.md                 # Security architecture & hardening audit
├── metadata.json               # Platform metadata
└── package.json                # Project dependencies
```

---

## 3. How to Update Content (Client & Developer Guide)

### 3.1 Updating Company Contact Info & Address
Open `src/data/siteConfig.ts` and modify the `siteConfig` object:
```typescript
export const siteConfig = {
  companyName: "Madagascar Ernest Travel Tours",
  contacts: {
    email: "soa.ernest@gmail.com",
    whatsappNumber: "+261325700405",
    phoneDisplay: "+261 34 52 673 85 / +261 32 57 004 05",
    address: "Antsirabe vakinakaratra Madagascar, lot 20 B 205 MiaramasoandroVatofotsy",
  },
  // ...
};
```

### 3.2 Adding or Modifying Circuit Itineraries
Open `src/data/circuits.ts`. Each circuit follows this TypeScript contract:
```typescript
export interface Circuit {
  id: string;
  title: string;
  subtitle: string;
  region: 'west' | 'south' | 'east' | 'mixed';
  durationDays: number;
  durationNights: number;
  basePriceEUR: number;
  routeOverview: string[];
  heroImage: string;
  highlights: string[];
  included: string[];
  days: CircuitDay[];
}
```
Simply add a new circuit object or edit existing days; the UI automatically updates all filters, the interactive map, the quote calculator, and the booking generator.

---

## 4. Local Development & Build

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd madagascar-ernest-travel-tours

# Install dependencies
npm install

# Start the local development server (binds to port 3000)
npm run dev
```

### Production Build
```bash
npm run build
```
This bundles the optimized static assets into the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 5. Step-by-Step GitHub & Vercel Deployment Guide

### Deploying via GitHub to Vercel (Recommended):
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Madagascar Ernest Travel Tours complete platform"
   git branch -M main
   git remote add origin https://github.com/your-username/madagascar-ernest-tours.git
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** &rarr; **"Project"**.
   - Select your GitHub repository `madagascar-ernest-tours`.
3. **Configure Build Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Deploy**:
   - Click **"Deploy"**. Vercel will automatically build the site and provide you with a production URL with free global CDN caching and automatic SSL certificate.
   - Any future commits pushed to the `main` branch will automatically trigger instant zero-downtime redeployments!

### B. Deploy via Docker / Cloud Run
A sample lightweight `Dockerfile`:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 6. Future Backend Integrations
To extend this application with a database or payment gateway:
- **Supabase / PostgreSQL:** Use the data structures in `src/data/circuits.ts` as database seed schemas.
- **Stripe / Payment Gateway:** Create an Express or serverless `/api/checkout` endpoint without modifying client front-end components.
- **WhatsApp Webhook:** Integrate Twilio or Meta Business API to automatically log incoming quote requests into a CRM (e.g. HubSpot or Notion).
