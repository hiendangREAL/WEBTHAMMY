# System Architecture

## Overview

Beauty/Spa Equipment Website built with Next.js 14+ App Router, Supabase backend, and Shadcn/UI components.

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 14+ | App Router, SSR/SSG, Server Components |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS + Shadcn/UI | Rapid UI development |
| **Database** | Supabase (PostgreSQL) | Data storage, Auth, Storage |
| **Deployment** | Vercel | Edge deployment, CDN |

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                       │
├─────────────────────────────────────────────────────────────┤
│                     NEXT.JS 14 APP                           │
├──────────────┬──────────────┬───────────────────────────────┤
│   PUBLIC     │    ADMIN     │          SHARED               │
│   Route Group│  Protected   │                               │
├──────────────┼──────────────┼───────────────────────────────┤
│ /            │ /admin       │ Components:                   │
│ /san-pham    │ /admin/san-pham│ - ui/ (Shadcn)              │
│ /dich-vu     │ /admin/dich-vu│ - shared/ (Header, Footer)   │
│ /bao-hanh    │ /admin/khach-hang│ - public/ (Cards, Forms) │
│ /lien-he     │ /admin/nguoi-dung│ - admin/ (Forms, Tables) │
│ /tin-tuc     │              │                               │
│ /khuyen-mai  │              │ Lib:                          │
│ /ve-chung-toi│              │ - supabase/ (clients)         │
│ /truoc-sau   │              │ - crm/ (lead utils)           │
└──────────────┴──────────────┴───────────────────────────────┘
                              │
                              ▼
              ┌─────────────────────────────┐
              │      SUPABASE BACKEND       │
              ├──────────────┬──────────────┤
              │  PostgreSQL  │   Storage    │
              │  - products  │   - images   │
              │  - services  │   - documents│
              │  - customers │              │
              │  - users     │   Auth       │
              │  - orders    │   - RBAC     │
              └──────────────┴──────────────┘
```

## Route Structure

### Public Routes (`src/app/(public)/`)
| Route | Purpose | Type |
|-------|---------|------|
| `/` | Homepage | Static |
| `/san-pham` | Product listing | Dynamic |
| `/san-pham/[slug]` | Product detail | SSG |
| `/dich-vu` | Service listing | Dynamic |
| `/dich-vu/[slug]` | Service detail | SSG |
| `/bao-hanh` | Warranty policy | Static |
| `/lien-he` | Contact page | Static |
| `/tin-tuc` | Blog listing | Static |
| `/tin-tuc/[slug]` | Blog post | SSG |
| `/khuyen-mai` | Promotions | Static |
| `/ve-chung-toi` | About page | Static |
| `/truoc-sau` | Before/After gallery | Static |

### Admin Routes (`src/app/admin/`)
| Route | Purpose | Access |
|-------|---------|--------|
| `/admin` | Dashboard | All roles |
| `/admin/san-pham` | Products CRUD | Admin+ |
| `/admin/dich-vu` | Services CRUD | Admin+ |
| `/admin/khach-hang` | Customer CRM | Sales+ |
| `/admin/nguoi-dung` | User management | Super Admin |

## Database Schema

### Core Tables
- **users** - User accounts with role-based access
- **customers** - Customer profiles (CRM)
- **products** - Equipment catalog
- **product_categories** - Product categorization
- **services** - Spa services
- **service_categories** - Service categorization
- **appointments** - Booking records
- **orders** - Purchase records
- **order_items** - Order line items
- **customer_interactions** - CRM interaction history

### RLS Policies
Row Level Security ensures:
- Customers see only public data
- Sales staff manage customers only
- Admins manage products/services
- Super Admin has full access

## Security

1. **Authentication**: Supabase Auth with email/password
2. **Authorization**: RLS policies for role-based access
3. **CSRF**: Built into Next.js Server Actions
4. **Input Validation**: Zod schemas on all forms
5. **Environment Variables**: Secure credential storage

## Performance

- **SSG**: Pre-rendered static pages
- **ISR**: On-demand revalidation
- **Image Optimization**: Next/Image with Supabase transforms
- **Code Splitting**: Automatic by Next.js
- **Edge Caching**: Vercel CDN

## Third-Party Integrations

| Service | Purpose |
|---------|---------|
| Zalo OA | Customer chat widget |
| MoMo | Payment gateway (optional) |
| Google Analytics | Analytics |
| Resend | Transactional email |
