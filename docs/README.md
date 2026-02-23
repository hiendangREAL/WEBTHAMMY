# Thẩm Mỹ Studio - Website Thiết Bị Spa & Thẩm Mỹ

Website modern cho kinh doanh thiết bị thẩm mỹ và spa tại Việt Nam.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Routes

### Public Website

| Route | Description |
|-------|-------------|
| `/` | Homepage - Hero, services, products |
| `/san-pham` | Product catalog (Thiết bị thẩm mỹ) |
| `/san-pham/[slug]` | Product detail page |
| `/dich-vu` | Services listing (Dịch vụ spa) |
| `/dich-vu/[slug]` | Service detail page |
| `/bao-hanh` | Warranty policy (Chế độ bảo hành) |
| `/lien-he` | Contact page with form |
| `/tin-tuc` | Blog/News (Tin tức) |
| `/tin-tuc/[slug]` | Blog article page |
| `/ve-chung-toi` | About us |
| `/truoc-sau` | Before/After gallery |
| `/khuyen-mai` | Promotions/Landing pages |

### Admin Dashboard

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard overview with stats |
| `/admin/san-pham` | Product management (CRUD) |
| `/admin/san-pham/new` | Create new product |
| `/admin/san-pham/[id]` | Edit product |
| `/admin/dich-vu` | Service management (CRUD) |
| `/admin/dich-vu/new` | Create new service |
| `/admin/dich-vu/[id]` | Edit service |
| `/admin/khach-hang` | Customer database (CRM) |
| `/admin/khach-hang/[id]` | Customer detail + interactions |
| `/admin/nguoi-dung` | User management |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + Shadcn/UI |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth with RBAC |
| Storage | Supabase Storage |
| Forms | React Hook Form + Zod |
| Tables | TanStack React Table |
| Icons | Lucide React |
| Toast | Sonner |

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   │   ├── page.tsx       # Homepage
│   │   ├── san-pham/      # Products
│   │   ├── dich-vu/       # Services
│   │   ├── bao-hanh/      # Warranty
│   │   ├── lien-he/       # Contact
│   │   ├── tin-tuc/       # Blog
│   │   ├── ve-chung-toi/  # About
│   │   ├── truoc-sau/     # Before/After
│   │   └── khuyen-mai/    # Promotions
│   ├── admin/             # Admin dashboard
│   │   ├── page.tsx       # Dashboard
│   │   ├── san-pham/      # Product CRUD
│   │   ├── dich-vu/       # Service CRUD
│   │   ├── khach-hang/    # Customer CRM
│   │   └── nguoi-dung/    # User management
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots
├── components/
│   ├── ui/                # Shadcn/UI components
│   ├── shared/            # Header, Footer, Zalo
│   ├── public/            # Public page components
│   └── admin/             # Admin components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── crm/               # CRM utilities
│   └── utils.ts           # Helper functions
└── types/
    ├── index.ts           # App types
    └── database.ts        # DB types (generated)
```

## Environment Setup

Create `.env.local` in project root:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create new project or select existing
3. Navigate to Settings > API
4. Copy Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
5. Copy anon public key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Copy service_role key -> `SUPABASE_SERVICE_ROLE_KEY`

## Features

### Public Website
- Product catalog with categories and search
- Service listings with pricing
- Warranty information page
- Contact form with validation
- Blog/tips section
- Before/After treatment gallery
- Zalo chat widget integration
- Click-to-call phone numbers
- SEO optimized (sitemap, robots, meta tags)
- Mobile-responsive design
- Loading states and error handling

### Admin Dashboard
- Dashboard with key statistics
- Product management (CRUD)
- Service management (CRUD)
- Customer database (CRM-lite)
- Interaction history tracking
- Follow-up reminders
- User management with RBAC
- Data tables with sorting/filtering

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript check |
| `npm run db:seed` | Seed database |

## Documentation

- [Project Overview & PDR](./project-overview-pdr.md)
- [Design Guidelines](./design-guidelines.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)
- [Deployment Guide](./deployment-guide.md)
- [Project Roadmap](./project-roadmap.md)

## License

Private project - All rights reserved.
