# Code Standards

## File Naming
- **kebab-case** for all files (e.g., `product-card.tsx`, `lead-utils.ts`)
- Descriptive names preferred over short names
- Files under 200 lines, split if larger

## TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface over type for objects
- Zod for runtime validation

## React/Next.js
- Server Components by default
- Client Components only when needed (useEffect, useState, event handlers)
- `'use client'` directive at top of client files
- Props interface defined above component

## Styling
- Tailwind utility classes
- Shadcn/UI components
- CSS variables for design tokens
- Mobile-first responsive design

## Code Organization
```
src/
├── app/           # Next.js App Router pages
├── components/
│   ├── ui/        # Shadcn components (don't modify)
│   ├── shared/    # Shared components (header, footer)
│   ├── public/    # Public page components
│   └── admin/     # Admin dashboard components
├── lib/
│   ├── supabase/  # Supabase clients
│   ├── crm/       # CRM utilities
│   └── utils.ts   # General utilities
├── types/         # TypeScript types
└── hooks/         # Custom React hooks
```

## Commit Conventions
```
feat: add product comparison feature
fix: resolve image loading issue
docs: update API documentation
style: format code with prettier
refactor: extract utility function
test: add unit tests for utils
chore: update dependencies
```

## Vietnamese Content
- Use Vietnamese for labels, content, placeholder text
- ASCII characters only in code (avoid Unicode in strings)
- Comments in English for code clarity
