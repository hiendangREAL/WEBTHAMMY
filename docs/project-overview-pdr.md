# Product Development Requirements (PDR)

**Project**: Tham My Studio - Beauty Equipment & Spa Website
**Version**: 1.0.0 | **Date**: 2026-02-23
**Market**: Vietnam | **Language**: Vietnamese

---

## 1. Executive Summary

### 1.1 Purpose

Build a professional website for a Vietnamese beauty/spa equipment business that:
- Showcases products and services to potential customers
- Captures leads through contact forms and Zalo integration
- Provides admin dashboard for customer relationship management (CRM)

### 1.2 Target Users

| User Type | Description | Needs |
|-----------|-------------|-------|
| **B2B Customers** | Spa/clinic owners | Equipment specs, pricing, warranty info |
| **B2C Customers** | End users seeking treatments | Service info, booking, pricing |
| **Admin Staff** | Sales team, managers | Customer management, content updates |
| **Super Admin** | Business owners | Full system control, user management |

---

## 2. Functional Requirements

### 2.1 Public Website Features

#### F1: Product Catalog (Thiet Bi Tham My)
- [x] Product listing with category filters
- [x] Product detail pages with images, specs, price
- [x] Warranty information per product
- [x] Related products suggestions
- [x] "Contact for price" for unlisted items

#### F2: Spa Services (Dich Vu Spa)
- [x] Service listing with categories
- [x] Service detail pages with pricing
- [x] Duration and what-to-expect info
- [x] Booking CTA integration

#### F3: Marketing Pages
- [x] Homepage with hero, services, products, testimonials
- [x] Before/After gallery (truoc-sau)
- [x] Promotions page (khuyen-mai)
- [x] News/Blog section (tin-tuc)
- [x] About page (ve-chung-toi)

#### F4: Contact System
- [x] Zalo chat widget (floating button)
- [x] Click-to-call phone numbers
- [x] Contact form with validation
- [x] Google Maps location embed

#### F5: Lead Capture
- [x] Lead capture forms throughout site
- [x] Vietnamese phone validation
- [x] Service interest selection
- [x] Lead scoring algorithm

#### F6: Warranty Information
- [x] Warranty policy page (bao-hanh)
- [x] Warranty terms by product category

### 2.2 Admin Dashboard Features

#### A1: Dashboard Home
- [x] Key metrics overview
- [x] Recent customers
- [x] Follow-up reminders
- [x] Quick actions

#### A2: Product Management
- [x] Product CRUD operations
- [x] Category management
- [x] Image upload (via Supabase Storage)
- [x] Featured product toggle

#### A3: Service Management
- [x] Service CRUD operations
- [x] Category management
- [x] Duration and pricing

#### A4: Customer CRM
- [x] Customer list with search/filter
- [x] Customer profile detail
- [x] Interaction history tracking
- [x] Tags and notes
- [x] Follow-up reminders

#### A5: User Management
- [x] User list (admin only)
- [x] Role-based access control

---

## 3. Non-Functional Requirements

### 3.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| FID (First Input Delay) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |
| Page Load (mobile 3G) | < 3s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |

### 3.2 SEO

- [x] Semantic HTML structure
- [x] Meta tags (title, description)
- [x] Open Graph tags for social sharing
- [x] Dynamic sitemap generation
- [x] Robots.txt configuration
- [x] Vietnamese keyword optimization
- [x] Image alt text

### 3.3 Accessibility

- [x] WCAG 2.1 AA compliance target
- [x] Keyboard navigation
- [x] Focus indicators
- [x] Color contrast ratios
- [x] Screen reader friendly

### 3.4 Security

- [x] XSS protection (DOMPurify)
- [x] Input validation (Zod schemas)
- [x] CSRF protection (Next.js built-in)
- [x] Environment variable security
- [x] Row Level Security (Supabase RLS)

### 3.5 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Safari | Last 2 versions |
| Firefox | Last 2 versions |
| Edge | Last 2 versions |
| Samsung Internet | Last 2 versions |

---

## 4. Technical Specifications

### 4.1 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | Shadcn/UI | Latest |
| Database | Supabase (PostgreSQL) | - |
| Forms | react-hook-form + zod | - |
| State | React Context | - |
| Deployment | Vercel | - |

### 4.2 Architecture

```
Client (Next.js) --> Supabase (PostgreSQL + Auth + Storage)
                    |
                    --> Zalo OA (Chat)
                    --> Vercel Edge (CDN)
```

### 4.3 Database Schema

See `src/types/database.ts` for full type definitions.

**Core Tables**: users, customers, customer_interactions, products, product_categories, services, service_categories, appointments, orders, order_items

---

## 5. User Roles & Permissions

### 5.1 Role Hierarchy

| Role | Level | Permissions |
|------|-------|-------------|
| `super_admin` | 4 | Full access, manage admins |
| `admin` | 3 | Products, services, content, users |
| `sales` | 2 | Customer CRUD, appointments, notes |
| `viewer` | 1 | Read-only dashboard access |

### 5.2 Permission Matrix

| Resource | Super Admin | Admin | Sales | Viewer |
|----------|:-----------:|:-----:|:-----:|:------:|
| Users | CRUD | R | - | - |
| Products | CRUD | CRUD | R | R |
| Services | CRUD | CRUD | R | R |
| Customers | CRUD | CRUD | CRUD | R |
| Appointments | CRUD | CRUD | CRUD | R |
| Orders | CRUD | CRUD | CRUD | R |
| Dashboard | Full | Full | Limited | Read |

---

## 6. Integration Requirements

### 6.1 Zalo OA Integration

- Floating chat button on all pages
- Pre-filled message support
- Mobile deep linking

### 6.2 Analytics (Optional)

- Google Analytics 4 integration
- Event tracking for conversions
- Lead source attribution

### 6.3 Payment (Future Phase)

- Bank transfer info display
- MoMo QR code (optional)

---

## 7. Success Metrics

### 7.1 Launch Criteria

- [ ] All public pages functional
- [ ] Admin dashboard operational
- [ ] Zalo integration working
- [ ] Mobile responsive verified
- [ ] Core Web Vitals passing
- [ ] SEO meta tags complete

### 7.2 KPIs (Post-Launch)

| Metric | Target |
|--------|--------|
| PageSpeed Score | 90+ |
| Mobile Traffic | 70%+ |
| Lead Conversion Rate | 5%+ |
| Average Session Duration | 2min+ |
| Bounce Rate | < 50% |

---

## 8. Out of Scope (Phase 1)

- Native mobile application
- Online payment processing
- Multi-language support
- Advanced analytics dashboard
- Automated email/SMS campaigns
- Inventory management
- Multi-location support

---

## 9. Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1 | Completed | Core website + Admin CRM |
| Phase 2 | TBD | Payment integration, Email notifications |
| Phase 3 | TBD | Mobile app consideration, Advanced analytics |

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase outage | High | Implement caching, fallback UI |
| Slow mobile networks | Medium | Image optimization, lazy loading |
| Spam leads | Low | Honeypot fields, rate limiting |
| Data loss | High | Regular backups, RLS policies |

---

## 11. Contact & Support

- **Technical Lead**: Development team
- **Business Owner**: Product decisions
- **Support**: Via project repository
