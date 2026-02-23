# Tham My Studio

Vietnamese beauty/spa equipment and services website with admin CRM dashboard.

## Quick Start

```bash
# Install
npm install

# Configure
cp .env.example .env.local
# Add Supabase credentials

# Develop
npm run dev
# Open http://localhost:3000
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + Shadcn/UI |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── (public)/      # Public pages (12 routes)
│   └── admin/         # Admin dashboard (10 routes)
├── components/
│   ├── ui/            # Shadcn components
│   ├── shared/        # Header, Footer, Zalo
│   ├── public/        # ProductCard, LeadForm
│   └── admin/         # Admin forms, tables
├── lib/
│   ├── supabase/      # DB clients
│   ├── crm/           # Lead utilities
│   └── utils.ts       # Helpers
└── types/             # TypeScript definitions
```

## Routes

### Public

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/san-pham` | Products |
| `/san-pham/[slug]` | Product detail |
| `/dich-vu` | Services |
| `/dich-vu/[slug]` | Service detail |
| `/tin-tuc` | News/Blog |
| `/khuyen-mai` | Promotions |
| `/truoc-sau` | Before/After gallery |
| `/lien-he` | Contact |
| `/ve-chung-toi` | About |
| `/bao-hanh` | Warranty |

### Admin

| Route | Page |
|-------|------|
| `/admin` | Dashboard |
| `/admin/san-pham` | Products CRUD |
| `/admin/dich-vu` | Services CRUD |
| `/admin/khach-hang` | Customer CRM |
| `/admin/nguoi-dung` | Users |

## Database Tables

| Table | Purpose |
|-------|---------|
| users | Admin accounts |
| customers | Customer profiles |
| customer_interactions | CRM history |
| products | Equipment catalog |
| product_categories | Product groups |
| services | Spa services |
| service_categories | Service groups |
| appointments | Bookings |
| orders | Purchases |
| order_items | Order lines |

## Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Optional
NEXT_PUBLIC_SITE_URL=https://thammy.vn
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run db:seed` | Seed sample data |

## Design System

| Token | Value |
|-------|-------|
| Primary | #A78B71 (Mocha Brown) |
| Accent | #B76E79 (Rose Gold) |
| Heading | Playfair Display |
| Body | Be Vietnam Pro |

## Features

- Mobile-first responsive design
- Vietnamese language
- Zalo chat integration
- Lead capture forms
- Admin CRM dashboard
- Role-based access control
- SEO optimized

## Documentation

- [Project Overview & PDR](./docs/project-overview-pdr.md)
- [Codebase Summary](./docs/codebase-summary.md)
- [Code Standards](./docs/code-standards.md)
- [System Architecture](./docs/system-architecture.md)
- [Design Guidelines](./docs/design-guidelines.md)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm run start
```

## License

Private - All rights reserved.
