# Project Roadmap

## Current Status: Phase 1 - MVP Complete

Target: Functional website with admin dashboard.

---

## Completed Features

### Public Website

| Feature | Status | Notes |
|---------|--------|-------|
| Homepage | Done | Hero, services, products preview |
| Product Catalog | Done | List, detail, categories |
| Service Listing | Done | List, detail pages |
| Warranty Page | Done | Static content |
| Contact Page | Done | Form with validation |
| Blog/News | Done | List, detail pages |
| About Us | Done | Company info |
| Before/After Gallery | Done | Image comparison slider |
| Promotions | Done | Landing page |
| Zalo Widget | Done | Floating chat button |
| SEO Setup | Done | Sitemap, robots, meta tags |
| Responsive Design | Done | Mobile-first |
| Loading States | Done | Skeleton components |
| Error Handling | Done | Error boundaries |

### Admin Dashboard

| Feature | Status | Notes |
|---------|--------|-------|
| Dashboard Stats | Done | Overview metrics cards |
| Product CRUD | Done | Create, read, update, delete |
| Service CRUD | Done | Create, read, update, delete |
| Customer Database | Done | CRM-lite functionality |
| Customer Detail | Done | Profile + interaction history |
| User Management | Done | List users |
| Data Tables | Done | Sort, filter with TanStack |

### Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| Supabase Setup | Done | Client + server clients |
| TypeScript Config | Done | Strict mode enabled |
| Tailwind + Shadcn | Done | UI component library |
| Forms + Validation | Done | React Hook Form + Zod |

---

## Phase 2: Supabase Integration

**Status**: In Progress
**Prerequisites**: Supabase project credentials

### Tasks

- [ ] Create Supabase project
- [ ] Apply database migrations
- [ ] Configure RLS policies
- [ ] Connect authentication
- [ ] Migrate placeholder data to real data
- [ ] Image upload for products/services

### Required Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

---

## Phase 3: Third-Party Integrations

**Status**: Pending
**Prerequisites**: Zalo OA, payment accounts

### Tasks

- [ ] Zalo OA chat widget (full integration)
- [ ] ZNS notification setup
- [ ] MoMo payment gateway (optional)
- [ ] Google Analytics 4
- [ ] Email notifications (Resend/SendGrid)

### Configuration Needed

| Service | Required Info |
|---------|---------------|
| Zalo OA | OA ID, App ID, Secret |
| MoMo | Partner Code, Access Key, Secret Key |
| Google Analytics | Measurement ID |
| Email | API Key (Resend/SendGrid) |

---

## Phase 4: SEO & Performance

**Status**: Pending

### Tasks

- [ ] Meta tags optimization
- [ ] Structured data (JSON-LD)
- [ ] Dynamic sitemap generation
- [ ] Image optimization (WebP, lazy load)
- [ ] Core Web Vitals optimization
- [ ] Vietnamese keyword research
- [ ] Open Graph tags
- [ ] Canonical URLs

---

## Phase 5: Advanced Features

**Status**: Future

### Potential Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| Online booking system | High | High |
| Customer loyalty program | Medium | Medium |
| Inventory management | Medium | High |
| Invoice generation | Medium | Medium |
| Multi-location support | Low | High |
| Staff scheduling | Low | High |
| Analytics dashboard | Medium | Medium |
| Marketing automation | Low | High |

---

## Known Limitations

### Technical

1. **No Authentication** - Admin routes not protected yet
2. **No Image Upload** - Images use placeholder/external URLs
3. **No Search** - Products/services not searchable
4. **No Pagination** - Lists show all items
5. **No Caching** - Data fetched fresh each request

### Business

1. **No Online Payment** - Bank transfer only
2. **No Booking System** - Contact form for appointments
3. **No SMS Notifications** - Zalo/phone only
4. **Vietnamese Only** - No multi-language support
5. **Single Location** - No branch management

### Performance

1. **No ISR/SSG** - All pages SSR
2. **No Image CDN** - Manual optimization needed
3. **No Edge Caching** - Depends on Vercel

---

## Technical Debt

| Item | Priority | Effort |
|------|----------|--------|
| Unit tests (Vitest) | High | Medium |
| E2E tests (Playwright) | Medium | High |
| Error logging (Sentry) | High | Low |
| Request validation | Medium | Medium |
| API documentation | Low | Low |
| Database migrations | High | Medium |
| CI/CD pipeline | Medium | Low |
| Rate limiting | Medium | Low |

---

## Deployment Checklist

### Pre-Launch

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies tested
- [ ] Admin users created
- [ ] Product/service data populated
- [ ] Contact forms tested
- [ ] Mobile responsiveness verified
- [ ] PageSpeed score 90+

### Launch

- [ ] Domain configured in Vercel
- [ ] SSL certificate active
- [ ] CDN caching enabled
- [ ] Error monitoring active
- [ ] Analytics tracking active

### Post-Launch

- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Content updates schedule
- [ ] Security updates

---

## Maintenance Schedule

### Weekly

- Check Vercel error logs
- Review analytics
- Update content as needed

### Monthly

- Security updates (npm audit)
- Dependency updates
- Performance review

### Quarterly

- Feature planning session
- User feedback review
- Roadmap adjustment

---

## Dependencies

### Current Stack

| Package | Version |
|---------|---------|
| Next.js | 16.x |
| React | 19.x |
| Supabase | 2.x |
| Tailwind CSS | 4.x |
| Shadcn/UI | latest |

### Planned Additions

| Package | Purpose |
|---------|---------|
| @tanstack/react-query | Data fetching |
| Uploadthing/Cloudinary | Image uploads |
| Resend | Email service |
| Recharts | Analytics charts |

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| PageSpeed Score | 90+ | TBD |
| LCP | < 2.5s | TBD |
| FID | < 100ms | TBD |
| CLS | < 0.1 | TBD |
| Mobile Responsive | 100% | Done |
| Uptime | 99.9% | TBD |

---

## Open Questions

1. Auth provider? (Supabase Auth vs NextAuth.js)
2. Image storage? (Supabase Storage vs Cloudinary)
3. Email service? (Resend vs SendGrid)
4. Payment priority? (MoMo vs VNPay vs Bank only)
5. Analytics? (Vercel Analytics vs Google Analytics 4)
