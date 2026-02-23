# System Architecture

## Overview
Beauty/Spa equipment website with public pages and admin dashboard.

## Architecture

```
NEXT.JS APP ROUTER
├── PUBLIC PAGES (/(public)/)
│   ├── Homepage
│   ├── Products catalog
│   ├── Services listing
│   ├── Warranty info
│   ├── Contact form
│   └── Blog/News
├── ADMIN DASHBOARD (/admin/)
│   ├── Dashboard (stats)
│   ├── Products CRUD
│   ├── Services CRUD
│   ├── Customer management
│   └── User management (RBAC)
└── API ROUTES (/api/)
    
SUPABASE BACKEND
├── AUTH (Email/Phone/OAuth)
├── DATABASE (PostgreSQL)
│   ├── users, customers
│   ├── products, services
│   ├── appointments, orders
│   └── customer_interactions
└── STORAGE (images)
```

## User Roles

| Role | Products | Services | Customers | Users |
|------|----------|----------|-----------|-------|
| super_admin | CRUD | CRUD | CRUD | CRUD |
| admin | CRUD | CRUD | CRUD | Read |
| sales | Read | Read | CRUD | None |
| viewer | Read | Read | Read | None |

## Deployment
- Vercel (recommended)
- Environment: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
