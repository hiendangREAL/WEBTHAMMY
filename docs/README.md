# Tham My Studio - Beauty & Spa Website

A modern Next.js website for a beauty/spa business in Vietnam.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run type check
npm run typecheck
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (public)/     # Public website pages
│   └── admin/        # Admin dashboard
├── components/       # React components
│   ├── ui/           # Shadcn/UI components
│   ├── shared/       # Shared components
│   ├── public/       # Public page components
│   └── admin/        # Admin components
├── lib/              # Utilities and clients
└── types/            # TypeScript types
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/san-pham` | Products catalog |
| `/dich-vu` | Services |
| `/bao-hanh` | Warranty policy |
| `/lien-he` | Contact |
| `/tin-tuc` | Blog |
| `/ve-chung-toi` | About us |
| `/admin` | Admin dashboard |

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase
- **Forms**: React Hook Form + Zod

## Documentation

- [Project Overview](./project-overview-pdr.md)
- [Design Guidelines](./design-guidelines.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript check |

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Features

### Public Website
- Product catalog with categories
- Service listings with pricing
- Contact form with validation
- Blog/tips section
- Zalo chat integration
- Mobile-responsive design
- SEO optimized

### Admin Dashboard
- Product management (CRUD)
- Service management (CRUD)
- Customer database
- User management
- Dashboard statistics

## Deployment

The site is designed to deploy on Vercel:

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

## License

Private project - All rights reserved.
