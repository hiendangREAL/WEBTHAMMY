# Code Standards

**Project**: Tham My Studio | **Last Updated**: 2026-02-23

---

## 1. File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `product-card.tsx`, `lead-utils.ts` |
| Pages | lowercase | `page.tsx`, `layout.tsx` |
| Types | lowercase | `database.ts`, `index.ts` |
| Utilities | kebab-case | `lead-utils.ts`, `follow-up-reminder.ts` |
| Directories | kebab-case | `san-pham/`, `khach-hang/` |

**Rules**:
- Descriptive names over short names
- Files under 200 lines preferred; split if larger
- One component per file

---

## 2. TypeScript

### 2.1 Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

### 2.2 Type Definitions

```typescript
// Prefer interface for object shapes
interface ProductCardProps {
  product: Product
  showPrice?: boolean
}

// Use type for unions, utilities
type UserRole = 'admin' | 'sales' | 'viewer'
type Status = AppointmentStatus | OrderStatus

// Explicit return types for public functions
export function formatPrice(price: number | null): string {
  if (price == null) return 'Lien he'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}
```

### 2.3 Runtime Validation

Use Zod for form validation and API inputs:

```typescript
import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().min(2, 'Vui long nhap ho ten'),
  phone: z.string().min(10, 'So dien thoai khong hop le'),
  email: z.string().email().optional().or(z.literal('')),
})

export type LeadData = z.infer<typeof leadSchema>
```

---

## 3. React/Next.js

### 3.1 Server vs Client Components

**Default**: Server Components

**Use `'use client'` only when**:
- Using `useState`, `useEffect`, `useRef`
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Third-party client libraries

```typescript
// ❌ Unnecessary client component
'use client'
export function StaticHeader({ title }: { title: string }) {
  return <h1>{title}</h1>
}

// ✅ Server component (default)
export function StaticHeader({ title }: { title: string }) {
  return <h1>{title}</h1>
}
```

### 3.2 Component Structure

```typescript
// 1. Imports (grouped)
import { type FC } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import type { Product } from '@/types'

// 2. Types/Interfaces
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
}

// 3. Component
export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  // Hooks at top
  const [isExpanded, setIsExpanded] = useState(false)

  // Early returns
  if (!product.is_active) return null

  // Render
  return (
    <Card>
      <CardHeader>{product.name}</CardHeader>
      <CardContent>{/* ... */}</CardContent>
    </Card>
  )
}
```

### 3.3 Props Patterns

```typescript
// Optional with defaults
interface Props {
  title: string
  size?: 'sm' | 'md' | 'lg'
}

// Callbacks
interface FormProps {
  onSubmit: (data: FormData) => void
  onError?: (error: Error) => void
}

// Children
interface LayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
}
```

---

## 4. Styling

### 4.1 Tailwind Usage

```typescript
// Use cn() for conditional classes
import { cn } from '@/lib/utils'

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        {
          'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
          'border border-primary text-primary hover:bg-primary/10': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}
```

### 4.2 Design Tokens

Use CSS variables from `globals.css`:

```css
/* Available tokens */
--primary: #A78B71;      /* Mocha Brown */
--accent: #B76E79;       /* Rose Gold */
--background: #FFFCF9;
--radius-lg: 1rem;
```

### 4.3 Responsive Design

```typescript
// Mobile-first approach
<div className="
  flex flex-col        /* Mobile: column */
  md:flex-row          /* Tablet+: row */
  lg:gap-8             /* Desktop: larger gap */
">
  {/* ... */}
</div>
```

### 4.4 Shadcn/UI Components

- Located in `src/components/ui/`
- Do NOT modify Shadcn components directly
- Extend via wrapper components if needed

---

## 5. Code Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # Public route group
│   └── admin/              # Admin routes
├── components/
│   ├── ui/                 # Shadcn components (don't modify)
│   ├── shared/             # Header, Footer, etc.
│   ├── public/             # Public page components
│   └── admin/              # Admin components
├── lib/
│   ├── supabase/           # Database clients
│   ├── crm/                # CRM utilities
│   ├── utils.ts            # General utilities
│   └── sanitize.ts         # XSS protection
└── types/
    ├── database.ts         # Supabase types
    └── index.ts            # App types
```

---

## 6. Data Fetching

### 6.1 Server Components

```typescript
// app/(public)/san-pham/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProductsPage() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, category:product_categories(*)')
    .eq('is_active', true)

  return <ProductGrid products={products ?? []} />
}
```

### 6.2 Client Components

```typescript
'use client'
import { createBrowserClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const supabase = createBrowserClient()

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .then(({ data }) => setProducts(data ?? []))
  }, [])

  return <div>{/* render */}</div>
}
```

---

## 7. Error Handling

### 7.1 API Responses

```typescript
interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Usage
async function submitLead(data: LeadData): Promise<ApiResponse<Lead>> {
  try {
    const lead = await createLead(data)
    return { data: lead, error: null, success: true }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }
  }
}
```

### 7.2 User-Facing Messages

```typescript
// Vietnamese error messages
export const LEAD_MESSAGES = {
  successTitle: 'Dang ky thanh cong!',
  successMessage: 'Chung toi se lien he voi ban trong thoi gian som nhat.',
  errorTitle: 'Co loi xay ra',
  errorMessage: 'Vui long thu lai hoac lien he truc tiep.',
}
```

---

## 8. Security

### 8.1 Input Sanitization

```typescript
import { sanitizeHtml, sanitizeText } from '@/lib/sanitize'

// Before rendering user HTML
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />

// For plain text fields
const cleanName = sanitizeText(userInput)
```

### 8.2 Environment Variables

```bash
# .env.local (never commit)
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx  # Server-only, no NEXT_PUBLIC_
```

---

## 9. Git Conventions

### 9.1 Commit Messages

```
feat: add product comparison feature
fix: resolve image loading issue on mobile
docs: update API documentation
style: format code with prettier
refactor: extract utility function
test: add unit tests for utils
chore: update dependencies
```

### 9.2 Branch Names

```
feature/lead-capture-form
fix/mobile-nav-z-index
refactor/supabase-client
docs/api-documentation
```

---

## 10. Vietnamese Content

### 10.1 Rules

- UI labels, content, placeholders: Vietnamese
- Code, comments, docs: English
- No Unicode in code strings (use ASCII-safe Vietnamese)

### 10.2 Examples

```typescript
// ✅ Correct - ASCII Vietnamese
const labels = {
  submit: 'Dang ky tu van',
  phone: 'So dien thoai',
  error: 'Vui long nhap day du',
}

// ❌ Avoid - Unicode in code
const labels = {
  submit: 'Đăng ký tư vấn',
}
```

---

## 11. Testing (Future)

```typescript
// Unit tests with Vitest
describe('formatPrice', () => {
  it('formats VND currency correctly', () => {
    expect(formatPrice(1000000)).toBe('1.000.000 ₫')
  })

  it('returns contact message for null', () => {
    expect(formatPrice(null)).toBe('Lien he')
  })
})
```

---

## 12. Performance Guidelines

- Lazy load images with `next/image`
- Use loading skeletons (`loading.tsx`)
- Implement error boundaries (`error.tsx`)
- Prefer Server Components for data fetching
- Debounce search inputs
- Paginate large lists
