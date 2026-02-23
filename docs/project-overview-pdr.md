# Product Development Requirements (PDR)

## Project Overview

**Project Name**: Thẩm Mỹ Studio - Beauty Equipment & Spa Website
**Date**: 2026-02-23
**Target Market**: Vietnam
**Language**: Vietnamese only

---

## Business Requirements

### Primary Goals
1. Showcase beauty/spa equipment products
2. Display spa services and treatments
3. Provide warranty policy information
4. Enable customer contact via Zalo/Phone
5. Manage customer database (CRM-lite)

### Target Users
- **B2B Customers**: Spa/clinic owners looking for equipment
- **B2C Customers**: End users seeking spa treatments
- **Admin Staff**: Sales team, managers with role-based access

---

## Feature Requirements

### 1. Product Catalog (Thiết Bị Thẩm Mỹ)
- Product listing with categories
- Product detail pages (images, specs, price)
- Warranty information per product
- Related products

### 2. Spa Services (Dịch Vụ Spa)
- Service categories
- Service detail pages
- Pricing display
- Duration information

### 3. Warranty Policy (Chế Độ Bảo Hành)
- Warranty terms page
- Warranty lookup by product/serial
- Warranty claim process

### 4. Contact System (Liên Hệ)
- Zalo chat widget integration
- Click-to-call phone numbers
- Contact form
- Location map

### 5. Marketing Pages (Marketing)
- Landing pages for campaigns
- Testimonials/Reviews
- Before/After gallery
- Blog/Tips section

### 6. Customer Database (Quản Lý Khách Hàng)
- Customer profiles (name, phone, email, notes)
- Interaction history
- Appointment scheduling
- Follow-up reminders
- Role-based admin access

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn/UI |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth with RBAC |
| Storage | Supabase Storage |
| Deployment | Vercel |
| Contact | Zalo OA Widget |
| Payment | Bank transfer (primary), MoMo (optional) |

---

## User Roles

| Role | Permissions |
|------|-------------|
| **Super Admin** | Full access, manage admins |
| **Admin** | Products, services, content |
| **Sales Staff** | Customer CRUD, appointments |
| **Viewer** | Read-only dashboard access |

---

## Success Criteria

1. Page load < 3 seconds on mobile
2. Mobile-first responsive design
3. SEO optimized for Vietnamese keywords
4. Zalo chat working on all pages
5. Admin dashboard functional for customer management
6. 90+ Google PageSpeed score

---

## Out of Scope (Phase 1)

- Mobile app
- Online payment processing
- Multi-language support
- Advanced analytics dashboard
- Automated email campaigns
