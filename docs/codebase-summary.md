# Codebase Summary

**Generated**: 2026-02-23 | **Version**: 1.0.0

## Project Overview

| Property | Value |
|----------|-------|
| **Project** | Tham My Studio - Beauty/Spa Website |
| **Type** | Vietnamese beauty equipment & spa services website |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **LOC** | ~12,248 lines |

---

## File Statistics

### By Type

| Type | Count | Location |
|------|-------|----------|
| TypeScript/TSX | 87 | `src/**/*.ts,src/**/*.tsx` |
| Styles (CSS) | 1 | `src/app/globals.css` |
| Config Files | 5 | Root level |

### By Category

| Category | Files | Description |
|----------|-------|-------------|
| Pages (App Router) | 30 | Route handlers & layouts |
| Components | 43 | UI building blocks |
| Libraries | 8 | Utility functions |
| Types | 2 | TypeScript definitions |

---

## Directory Structure

```
src/
├── app/                          # Next.js App Router (30 files)
│   ├── (public)/                 # Public route group
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Public layout
│   │   ├── san-pham/             # Products (/san-pham, /san-pham/[slug])
│   │   ├── dich-vu/              # Services (/dich-vu, /dich-vu/[slug])
│   │   ├── tin-tuc/              # News/Blog (/tin-tuc, /tin-tuc/[slug])
│   │   ├── khuyen-mai/           # Promotions
│   │   ├── truoc-sau/            # Before/After gallery
│   │   ├── lien-he/              # Contact page
│   │   ├── ve-chung-toi/         # About us
│   │   └── bao-hanh/             # Warranty policy
│   ├── admin/                    # Admin dashboard (10 files)
│   │   ├── page.tsx              # Dashboard home
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── san-pham/             # Product management
│   │   ├── dich-vu/              # Service management
│   │   ├── khach-hang/           # Customer CRM
│   │   └── nguoi-dung/           # User management
│   ├── layout.tsx                # Root layout
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Global styles + design tokens
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt config
│
├── components/                   # React components (43 files)
│   ├── ui/                       # Shadcn/UI primitives (18)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── data-table.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── loading.tsx
│   │   ├── empty-state.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   └── sonner.tsx            # Toast notifications
│   ├── shared/                   # Shared components (6)
│   │   ├── header.tsx            # Site header with nav
│   │   ├── footer.tsx            # Site footer
│   │   ├── mobile-nav.tsx        # Mobile navigation
│   │   ├── hero-section.tsx      # Hero banner
│   │   ├── zalo-button.tsx       # Zalo chat widget
│   │   └── contact-form.tsx      # Contact form
│   ├── public/                   # Public page components (11)
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── service-card.tsx
│   │   ├── before-after-card.tsx
│   │   ├── before-after-gallery.tsx
│   │   ├── slider-comparison.tsx # Before/after slider
│   │   ├── testimonial-card.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── lead-capture-form.tsx # Lead generation
│   │   ├── newsletter-signup.tsx
│   │   └── cta-section.tsx
│   └── admin/                    # Admin components (8)
│       ├── sidebar.tsx           # Admin navigation
│       ├── page-header.tsx
│       ├── stats-card.tsx        # Dashboard stats
│       ├── product-form.tsx
│       ├── service-form.tsx
│       ├── customer-form.tsx
│       ├── user-form.tsx
│       └── interaction-list.tsx  # CRM interactions
│
├── lib/                          # Utilities (8 files)
│   ├── utils.ts                  # cn(), formatPrice()
│   ├── sanitize.ts               # XSS protection
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   └── server.ts             # Server client
│   └── crm/
│       ├── index.ts              # CRM exports
│       ├── lead-utils.ts         # Lead capture utilities
│       └── follow-up-reminder.ts # Follow-up scheduling
│
└── types/                        # TypeScript definitions (2 files)
    ├── database.ts               # Supabase schema (460 lines)
    └── index.ts                  # App types & constants
```

---

## Routes

### Public Routes (12 pages)

| Route | File | Description |
|-------|------|-------------|
| `/` | `(public)/page.tsx` | Homepage |
| `/san-pham` | `(public)/san-pham/page.tsx` | Product listing |
| `/san-pham/[slug]` | `(public)/san-pham/[slug]/page.tsx` | Product detail |
| `/dich-vu` | `(public)/dich-vu/page.tsx` | Service listing |
| `/dich-vu/[slug]` | `(public)/dich-vu/[slug]/page.tsx` | Service detail |
| `/tin-tuc` | `(public)/tin-tuc/page.tsx` | News/Blog listing |
| `/tin-tuc/[slug]` | `(public)/tin-tuc/[slug]/page.tsx` | Blog post |
| `/khuyen-mai` | `(public)/khuyen-mai/page.tsx` | Promotions |
| `/truoc-sau` | `(public)/truoc-sau/page.tsx` | Before/After gallery |
| `/lien-he` | `(public)/lien-he/page.tsx` | Contact page |
| `/ve-chung-toi` | `(public)/ve-chung-toi/page.tsx` | About us |
| `/bao-hanh` | `(public)/bao-hanh/page.tsx` | Warranty policy |

### Admin Routes (10 pages)

| Route | File | Description |
|-------|------|-------------|
| `/admin` | `admin/page.tsx` | Dashboard |
| `/admin/san-pham` | `admin/san-pham/page.tsx` | Product list |
| `/admin/san-pham/new` | `admin/san-pham/new/page.tsx` | Create product |
| `/admin/san-pham/[id]` | `admin/san-pham/[id]/page.tsx` | Edit product |
| `/admin/dich-vu` | `admin/dich-vu/page.tsx` | Service list |
| `/admin/dich-vu/new` | `admin/dich-vu/new/page.tsx` | Create service |
| `/admin/dich-vu/[id]` | `admin/dich-vu/[id]/page.tsx` | Edit service |
| `/admin/khach-hang` | `admin/khach-hang/page.tsx` | Customer list |
| `/admin/khach-hang/[id]` | `admin/khach-hang/[id]/page.tsx` | Customer detail |
| `/admin/nguoi-dung` | `admin/nguoi-dung/page.tsx` | User management |

---

## Database Schema (11 Tables)

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | Admin user accounts | email, role, full_name |
| `customers` | Customer profiles (CRM) | name, phone, email, source, tags |
| `customer_interactions` | CRM interaction history | customer_id, type, content |
| `products` | Equipment catalog | name, slug, price, category_id |
| `product_categories` | Product categorization | name, slug, sort_order |
| `services` | Spa services | name, slug, price, duration_minutes |
| `service_categories` | Service categorization | name, slug, sort_order |
| `appointments` | Booking records | customer_id, service_id, scheduled_at |
| `orders` | Purchase records | customer_id, total, status |
| `order_items` | Order line items | order_id, product_id, quantity |

### Enums

```typescript
type UserRole = 'super_admin' | 'admin' | 'sales' | 'viewer'
type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded'
```

---

## Key Utilities

### `lib/utils.ts`

```typescript
cn(...inputs: ClassValue[]): string     // Tailwind class merger
formatPrice(price: number): string      // VND currency formatter
```

### `lib/sanitize.ts`

```typescript
sanitizeHtml(dirty: string): string     // XSS protection for HTML
sanitizeText(text: string): string      // Strip HTML tags
```

### `lib/crm/lead-utils.ts`

```typescript
leadSchema                              // Zod validation schema
isValidVietnamesePhone(phone): boolean  // VN phone validator
formatPhoneNumber(phone): string        // Phone formatter
calculateLeadPriority(lead): LeadPriority
getLeadScore(lead): number              // 0-100 lead score
submitLead(data, source): Promise       // Submit to CRM
getZaloUrl(phone, message?): string     // Zalo contact link
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | #A78B71 | Mocha Brown - main brand color |
| `--accent` | #B76E79 | Rose Gold - CTAs, highlights |
| `--secondary` | #F5F0E8 | Cream - backgrounds |
| `--background` | #FFFCF9 | Off-white - page background |
| `--success` | #7CB9A8 | Confirmations |
| `--warning` | #D4A574 | Alerts |
| `--destructive` | #C4725A | Errors |

### Typography

| Token | Font |
|-------|------|
| `--font-heading` | Playfair Display, serif |
| `--font-body` | Be Vietnam Pro, sans-serif |

### Component Patterns

| Component | Style |
|-----------|-------|
| Buttons | Pill shape, rose gold primary |
| Cards | 16px radius, shadow-md, white bg |
| Forms | 48px input height, focus ring |
| Navigation | Sticky header, mobile hamburger |

---

## Dependencies

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.x | React framework |
| react | 19.x | UI library |
| typescript | 5.x | Type safety |
| tailwindcss | 4.x | Styling |

### UI

| Package | Purpose |
|---------|---------|
| @radix-ui/* | Headless UI primitives |
| shadcn/ui | Component library |
| lucide-react | Icons |
| next-themes | Dark mode |
| sonner | Toast notifications |

### Data

| Package | Purpose |
|---------|---------|
| @supabase/supabase-js | Database client |
| @supabase/ssr | Server-side auth |
| zod | Schema validation |

### Forms

| Package | Purpose |
|---------|---------|
| react-hook-form | Form management |
| @hookform/resolvers | Zod integration |

---

## Scripts

```bash
npm run dev        # Development server (localhost:3000)
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
npm run typecheck  # TypeScript check
npm run db:seed    # Seed sample data
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (server) |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for SEO |

---

## Notes

- Vietnamese language only (no i18n)
- Mobile-first responsive design
- Server Components by default
- Shadcn/UI components unmodified in `components/ui/`
- CRM functionality built-in with follow-up reminders
