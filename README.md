# Tham My Studio - Beauty/Spa Website

A modern, responsive beauty and spa services website built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Public Pages**: Homepage, Products, Services, News, Promotions, Before/After Gallery, Contact, About, Warranty
- **Admin Dashboard**: Product, Service, Customer, and User management
- **Responsive Design**: Mobile-first approach with dark mode support
- **SEO Optimized**: Meta tags, sitemap, robots.txt, Open Graph
- **Vietnamese Language**: Full Vietnamese content and SEO metadata

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Theme**: next-themes (dark mode)
- **Forms**: react-hook-form + zod
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Be Vietnam Pro, Playfair Display

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ck
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://thammy.vn
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:seed` | Seed database with sample data |

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── page.tsx        # Homepage
│   │   ├── san-pham/       # Products
│   │   ├── dich-vu/        # Services
│   │   ├── tin-tuc/        # News/Blog
│   │   ├── khuyen-mai/     # Promotions
│   │   ├── truoc-sau/      # Before/After gallery
│   │   ├── lien-he/        # Contact
│   │   ├── ve-chung-toi/   # About
│   │   └── bao-hanh/       # Warranty
│   ├── admin/              # Admin dashboard
│   │   ├── san-pham/       # Product management
│   │   ├── dich-vu/        # Service management
│   │   ├── khach-hang/     # Customer management
│   │   └── nguoi-dung/     # User management
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Sitemap generation
│   └── robots.ts           # Robots.txt
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── shared/             # Shared components
│   ├── public/             # Public page components
│   └── admin/              # Admin components
├── lib/
│   ├── utils.ts            # Utility functions
│   └── supabase/           # Supabase client
├── types/
│   └── index.ts            # TypeScript types
└── prisma/
    └── schema.prisma       # Database schema
```

## Pages

### Public Pages (22 pages)
- Homepage
- Products listing & detail
- Services listing & detail
- News/Blog listing & detail
- Promotions
- Before/After gallery
- Contact
- About Us
- Warranty

### Admin Pages (9 pages)
- Dashboard
- Products (list, create, edit)
- Services (list, create, edit)
- Customers (list, detail)
- Users (list)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## License

Private project - All rights reserved.
