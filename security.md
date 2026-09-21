# Security Architecture & Handover Documentation
**Project:** Madagascar Ernest Travel Tours Web Platform  
**Target Platform:** Standalone React / Next.js / Cloud Run Container  
**Date:** September 2026  
**Audience:** System Architects, Lead Engineers, Operations & Security Auditors

---

## 1. Architectural Philosophy: Zero-Trust & Decoupled Surface
The Madagascar Ernest Travel Tours platform is engineered with a **defense-in-depth, zero-trust** architecture designed to safeguard client privacy, protect high-net-worth traveler inquiries, and resist automated scraping, injection, and denial-of-service vectors.

Because luxury travel inquiries involve private traveler itineraries, passport information, VIP requirements, and direct communication with ground operators, all operational touchpoints adhere to strict data-minimization principles.

---

## 2. Front-End Hardening & Client Protection

### 2.1 Content Security Policy (CSP)
For production deployments (via Nginx, Cloudflare, or Vercel Headers), the following HTTP headers MUST be enforced:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https://images.unsplash.com https://upload.wikimedia.org; connect-src 'self' https://*.googleapis.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me https://api.whatsapp.com mailto:;
```

### 2.2 HTTP Security Headers Baseline
Ensure the web server configuration emits the following security headers on every response:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

---

## 3. Communication & Quote Generation Security

### 3.1 WhatsApp Deep-Link Sanitization
The platform generates pre-formatted WhatsApp quote inquiries targeting official dispatch (`+261325700405`).
- **Input Sanitization:** User-provided text strings (names, customized dates, special dietary or safari requests) are strictly sanitized via URL-encoding (`encodeURIComponent`) and regex filtering to strip ASCII control characters (`[\x00-\x1F\x7F]`) and dangerous HTML tags (`<script>`, `<iframe>`, `javascript:`).
- **Target Verification:** The outbound destination number is locked to the immutable constant in `siteConfig.ts` (`+261325700405`) and validated against international E.164 phone numbering schemas.
- **Phishing & Interception Prevention:** External redirects to `https://wa.me/` use `rel="noopener noreferrer"` attributes to prevent tab-nabbing and reverse-window hijacking.

### 3.2 Form Submissions & Email Handlers
- All text inputs implement client-side character count caps (e.g., maximum 500 characters for custom notes) to prevent memory exhaustion and buffer overflow issues in third-party mailer bridges.
- If an automated SMTP or SendGrid/Postmark endpoint is attached in future sprints, enforce strict server-side schema validation (e.g., Zod) and RFC 5322 email regex verification before passing strings to mailing daemons.

---

## 4. API Rate Limiting & Denial-of-Service Defense

When attaching a backend server (such as Express or Next.js Route Handlers), implement sliding-window rate limiting:

```typescript
// Recommended Express / Node.js Middleware
import rateLimit from 'express-rate-limit';

export const bookingQuoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Limit each IP to 10 quote inquiries per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many quote requests originating from this IP address. Please contact soa.ernest@gmail.com directly.',
  },
});
```

---

## 5. Environment Variables & Secret Decoupling

### 5.1 No Secret Leaks in Client Bundles
- **Principle:** Never prefix private API keys (payment gateways, CRM keys, email credentials) with `VITE_` or `NEXT_PUBLIC_`.
- Public configurations (e.g. phone numbers, company address, public social handles) reside in `src/data/siteConfig.ts` where they are safely rendered in the static bundle.
- Any future payment gateway (e.g. Stripe, Bvmac, or Airtel Money Madagascar integration) must reside entirely on an isolated server layer (`/api/create-checkout-session`) using `process.env.STRIPE_SECRET_KEY`.

### 5.2 Required Environment Variables Schema
The `.env.example` document clearly tracks all required keys:
```env
# Production Server Port (Default: 3000)
PORT=3000

# Canonical Application Base URL
APP_URL=https://madagascar-ernest-tours.com
```

---

## 6. WebGL / Three.js Resource Defense & Memory Cleanup
Because the application renders a high-performance 3D interactive globe and particle field:
1. **Context Loss Handling:** WebGL context loss listeners are attached to gracefully downgrade or reload visual scenes without freezing user memory.
2. **Component Lifecycle Teardown:** All geometries (`BufferGeometry`), materials (`ShaderMaterial`, `PointsMaterial`), textures, and animation frames (`requestAnimationFrame`) are explicitly disposed of on component unmount to prevent catastrophic browser memory leaks.
3. **GPU Throttle Safeguards:** Framerates are capped to display refresh rates (`60fps`), and geometry complexity is optimized (<5,000 vertices) to prevent GPU thermal throttling on mobile devices.

---

## 7. Incident Response & Vulnerability Reporting
For vulnerability disclosures regarding Madagascar Ernest Travel Tours systems, security researchers may contact:
- **Security Lead:** `soa.ernest@gmail.com`
- **Emergency Telephony:** `+261 34 52 673 85` / `+261 32 57 004 05`
