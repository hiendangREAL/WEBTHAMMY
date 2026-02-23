# Code Standards

## Project Overview
Beauty/Spa equipment website built with Next.js 14+, Supabase, Tailwind CSS, and Shadcn/UI.

## Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth with RBAC

## File Naming Conventions
- Use kebab-case for file names: `product-card.tsx`, `customer-form.tsx`
- Page files: `page.tsx`
- Layout files: `layout.tsx`
- API routes: `route.ts`

## Coding Guidelines

### TypeScript
- Use strict mode
- Define types in `src/types/`
- Use `interface` for object shapes
- Use `type` for unions, intersections

### React Components
- Use Server Components by default
- Use Client Components only when needed
- Keep components under 200 lines

### Styling
- Use Tailwind utility classes
- Follow design tokens in `globals.css`
- Use `cn()` for conditional class merging

### Forms
- Use react-hook-form with Zod validation
- Use Shadcn Form components

## Vietnamese Content
- All UI labels in Vietnamese
- Meta descriptions in Vietnamese

## Git Commits
- Use conventional commits format
