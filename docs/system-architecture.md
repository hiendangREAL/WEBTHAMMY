# System Architecture

**Project**: Tham My Studio | **Last Updated**: 2026-02-23

---

## 1. Overview

Vietnamese beauty/spa equipment website with public pages and admin CRM dashboard.

### 1.1 Architecture Pattern

- **Frontend**: Next.js App Router with Server Components
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel Edge Network

### 1.2 High-Level Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                     VERCEL EDGE NETWORK                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    NEXT.JS 16 APP                         │  │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐│  │
│  │  │   PUBLIC (SSG)  │  │        ADMIN (SSR)              ││  │
│  │  │  /              │  │  /admin                         ││  │
│  │  │  /san-pham      │  │  /admin/san-pham                ││  │
│  │  │  /dich-vu       │  │  /admin/dich-vu                 ││  │
│  │  │  /lien-he       │  │  /admin/khach-hang              ││  │
│  │  │  ...            │  │  ...                            ││  │
│  │  └─────────────────┘  └─────────────────────────────────┘│  │
│  │                          │                                 │  │
│  │  ┌───────────────────────┴───────────────────────────────┐│  │
│  │  │                    COMPONENTS                          ││  │
│  │  │  ui/ │ shared/ │ public/ │ admin/                     ││  │
│  │  └───────────────────────────────────────────────────────┘│  │
│  │                          │                                 │  │
│  │  ┌───────────────────────┴───────────────────────────────┐│  │
│  │  │                    LIBRARIES                           ││  │
│  │  │  supabase/ │ crm/ │ utils.ts │ sanitize.ts            ││  │
│  │  └───────────────────────────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│                     SUPABASE BACKEND                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL  │  │   Storage    │  │    Auth (RBAC)       │  │
│  │  11 tables   │  │  images/     │  │  email/password      │  │
│  │  RLS enabled │  │  documents/  │  │  role-based access   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Zalo OA    │  │    Vercel    │  │  Google Analytics    │  │
│  │  Chat widget │  │     CDN      │  │  (optional)          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 | App Router, SSR/SSG, Server Components |
| Language | TypeScript 5 | Type safety |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| UI Library | Shadcn/UI | Pre-built accessible components |
| Forms | react-hook-form + zod | Form handling & validation |
| State | React Context | Client state management |
| Theme | next-themes | Dark mode support |

### 2.2 Backend

| Layer | Technology | Purpose |
|-------|------------|---------|
| Database | Supabase (PostgreSQL) | Primary data store |
| Auth | Supabase Auth | Authentication with RBAC |
| Storage | Supabase Storage | Image/document uploads |
| API | Next.js Server Actions | Form submissions |

### 2.3 Infrastructure

| Layer | Technology | Purpose |
|-------|------------|---------|
| Hosting | Vercel | Edge deployment, CDN |
| DNS | Vercel/Cloudflare | Domain management |
| Monitoring | Vercel Analytics | Performance metrics |

---

## 3. Route Architecture

### 3.1 Route Groups

```
src/app/
├── (public)/              # Public route group
│   ├── layout.tsx         # Header + Footer wrapper
│   ├── page.tsx           # Homepage
│   ├── san-pham/          # Products
│   ├── dich-vu/           # Services
│   ├── tin-tuc/           # News/Blog
│   ├── khuyen-mai/        # Promotions
│   ├── truoc-sau/         # Before/After gallery
│   ├── lien-he/           # Contact
│   ├── ve-chung-toi/      # About
│   └── bao-hanh/          # Warranty
│
├── admin/                 # Admin dashboard (protected)
│   ├── layout.tsx         # Sidebar wrapper
│   ├── page.tsx           # Dashboard
│   ├── san-pham/          # Product management
│   ├── dich-vu/           # Service management
│   ├── khach-hang/        # Customer CRM
│   └── nguoi-dung/        # User management
│
├── layout.tsx             # Root layout
├── globals.css            # Global styles
├── error.tsx              # Error boundary
├── not-found.tsx          # 404 page
├── sitemap.ts             # Dynamic sitemap
└── robots.ts              # Robots.txt
```

### 3.2 Route Types

| Route | Render Strategy | Auth |
|-------|-----------------|------|
| `/` | SSG | None |
| `/san-pham` | SSG + ISR | None |
| `/san-pham/[slug]` | SSG | None |
| `/admin/*` | SSR | Required |
| `/api/*` | Edge (if needed) | Varies |

---

## 4. Database Architecture

### 4.1 Entity Relationship

```
┌─────────────┐       ┌─────────────────────┐
│   users     │       │     customers       │
│─────────────│       │─────────────────────│
│ id          │       │ id                  │
│ email       │       │ name                │
│ role        │       │ phone               │
│ full_name   │       │ email               │
└─────────────┘       │ source              │
                      │ tags[]              │
                      └──────────┬──────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ customer_       │   │  appointments   │   │     orders      │
│ interactions    │   │─────────────────│   │─────────────────│
│─────────────────│   │ customer_id     │   │ customer_id     │
│ customer_id     │   │ service_id      │   │ subtotal        │
│ user_id         │   │ scheduled_at    │   │ total           │
│ type            │   │ status          │   │ status          │
│ content         │   └─────────────────┘   └────────┬────────┘
└─────────────────┘                                   │
                                                      ▼
┌─────────────────┐       ┌─────────────────┐   ┌─────────────────┐
│ product_        │       │ service_        │   │   order_items   │
│ categories      │       │ categories      │   │─────────────────│
│─────────────────│       │─────────────────│   │ order_id        │
│ id              │       │ id              │   │ product_id      │
│ name            │       │ name            │   │ quantity        │
│ slug            │       │ slug            │   │ unit_price      │
└────────┬────────┘       └────────┬────────┘   └─────────────────┘
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│    products     │       │    services     │
│─────────────────│       │─────────────────│
│ id              │       │ id              │
│ name            │       │ name            │
│ slug            │       │ slug            │
│ price           │       │ price           │
│ category_id     │       │ duration_minutes│
│ warranty_months │       │ category_id     │
│ images[]        │       │ images[]        │
└─────────────────┘       └─────────────────┘
```

### 4.2 Tables Summary

| Table | Rows Est. | Purpose |
|-------|-----------|---------|
| `users` | < 20 | Admin accounts |
| `customers` | < 10,000 | Customer profiles |
| `customer_interactions` | < 50,000 | CRM history |
| `product_categories` | < 20 | Product groups |
| `products` | < 500 | Equipment catalog |
| `service_categories` | < 15 | Service groups |
| `services` | < 100 | Spa services |
| `appointments` | < 20,000 | Booking records |
| `orders` | < 10,000 | Purchase records |
| `order_items` | < 30,000 | Order line items |

### 4.3 Row Level Security

```sql
-- Example RLS policies
CREATE POLICY "Public products are viewable by all"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (is_admin());

CREATE POLICY "Sales can manage customers"
  ON customers FOR ALL
  USING (can_write());
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
RootLayout (app/layout.tsx)
├── ThemeProvider
├── Toaster
└── children

PublicLayout (app/(public)/layout.tsx)
├── Header
│   ├── Logo
│   ├── Navigation
│   └── MobileNav
├── children
└── Footer
    ├── FooterLinks
    ├── ContactInfo
    └── ZaloButton (floating)

AdminLayout (app/admin/layout.tsx)
├── Sidebar
│   ├── Logo
│   └── NavLinks
└── children
```

### 5.2 Component Categories

| Category | Location | Examples |
|----------|----------|----------|
| UI Primitives | `components/ui/` | Button, Card, Input, Dialog |
| Shared | `components/shared/` | Header, Footer, ZaloButton |
| Public | `components/public/` | ProductCard, ServiceCard, LeadForm |
| Admin | `components/admin/` | Sidebar, DataTable, Forms |

### 5.3 Data Flow

```
Server Component
       │
       ▼ fetch data
   Supabase
       │
       ▼ pass as props
Client Component
       │
       ▼ user interaction
 Server Action
       │
       ▼ mutate data
   Supabase
       │
       ▼ revalidate
Server Component
```

---

## 6. Security Architecture

### 6.1 Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  Supabase   │────▶│  PostgreSQL │
│             │     │    Auth     │     │   (users)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │                   ▼
       │            ┌─────────────┐
       │            │    JWT      │
       │            │   Token     │
       │            └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────────────────────────┐
│         Server Component         │
│  - Verify session via cookie     │
│  - Check role via RLS            │
│  - Return authorized data        │
└─────────────────────────────────┘
```

### 6.2 Security Layers

| Layer | Protection |
|-------|------------|
| Transport | HTTPS (Vercel) |
| Authentication | Supabase Auth + JWT |
| Authorization | RLS policies |
| Input | Zod validation |
| Output | DOMPurify sanitization |
| CSRF | Next.js built-in |
| Headers | Security headers (Vercel) |

---

## 7. Performance Architecture

### 7.1 Caching Strategy

| Resource | Strategy | TTL |
|----------|----------|-----|
| Static pages | SSG | Build time |
| Product pages | ISR | 1 hour |
| Admin pages | SSR | No cache |
| API responses | Edge cache | 5 min |
| Images | CDN cache | 1 year |

### 7.2 Optimization Techniques

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT REQUEST                          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE (CDN)                         │
│  - Static page cache hit → Return immediately               │
│  - Dynamic request → Forward to server                      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER                            │
│  - Server Component rendering                               │
│  - Parallel data fetching                                   │
│  - Stream large responses                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE                                  │
│  - Connection pooling                                        │
│  - Indexed queries                                          │
│  - RLS policy evaluation                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Third-Party Integrations

### 8.1 Zalo OA

```typescript
// Floating widget component
export function ZaloButton() {
  return (
    <a
      href="https://zalo.me/{phone_number}"
      target="_blank"
      className="fixed bottom-6 right-6 z-50"
    >
      <ZaloIcon />
    </a>
  )
}
```

### 8.2 Image Handling

```
User Upload → Supabase Storage → Transform URL → Next/Image → CDN
```

---

## 9. Deployment Architecture

### 9.1 Environments

| Environment | Branch | URL |
|-------------|--------|-----|
| Production | main | thammy.vn |
| Preview | PRs | pr-xxx.vercel.app |

### 9.2 CI/CD Pipeline

```
Push to main
     │
     ▼
┌─────────────┐
│   Vercel    │
│   Build     │
│  - npm run  │
│    build    │
│  - Type     │
│    check    │
└─────────────┘
     │
     ▼
┌─────────────┐
│   Deploy    │
│  - Edge     │
│  - CDN      │
│  - Auto     │
└─────────────┘
```

---

## 10. Monitoring & Observability

### 10.1 Available Metrics

| Metric | Source |
|--------|--------|
| Page views | Vercel Analytics |
| Core Web Vitals | Vercel |
| Error rate | Vercel |
| Build times | Vercel |
| Database queries | Supabase Dashboard |

### 10.2 Logging

```typescript
// Server-side logging
console.log('[ProductPage]', 'Fetching products')

// Client-side (development only)
if (process.env.NODE_ENV === 'development') {
  console.log('Lead submitted:', data)
}
```

---

## 11. Scalability Considerations

### 11.1 Current Limits

| Resource | Limit | Mitigation |
|----------|-------|------------|
| Database | 500MB (free) | Upgrade tier |
| Bandwidth | 100GB/mo | CDN caching |
| Functions | 2M invocations | Optimize queries |

### 11.2 Growth Path

1. **Phase 1** (Current): Single region, serverless
2. **Phase 2**: Multi-region, edge functions
3. **Phase 3**: Dedicated database, caching layer
