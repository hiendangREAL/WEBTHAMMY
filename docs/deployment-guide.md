# Deployment Guide

Huong dan trieu khai website Tham My Studio len production.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase account (free tier works)
- Domain (optional, can use .vercel.app)

---

## 1. Supabase Setup

### Create Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Enter project name: `thammy-studio`
4. Set strong database password (save this!)
5. Select region: Singapore (closest to Vietnam)
6. Click "Create new project" (wait ~2 minutes)

### Get Credentials

1. Go to Settings > API
2. Note down:
   - Project URL
   - anon public key
   - service_role key (reveal)

### Setup Database

Option A: Use Supabase SQL Editor

1. Go to SQL Editor
2. Run your schema migrations
3. Enable Row Level Security (RLS)

Option B: Use Prisma (if configured)

```bash
npx prisma db push
npm run db:seed
```

### Configure Storage

1. Go to Storage
2. Create buckets:
   - `product-images` - public
   - `service-images` - public
   - `before-after` - public
3. Set public access policies

### Setup Auth

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Set site URL: `https://your-domain.com`

---

## 2. Vercel Deployment

### Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" > "Project"
3. Import from GitHub
4. Select your repository
5. Click "Import"

### Configure Project

Framework Preset: **Next.js** (auto-detected)

Root Directory: `./` (default)

Build Command: `npm run build` (default)

Output Directory: `.next` (default)

### Environment Variables

Add these in Vercel dashboard (Settings > Environment Variables):

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | your_supabase_url | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your_anon_key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | your_service_role_key | Production, Preview, Development |

### Deploy

1. Click "Deploy"
2. Wait for build (~2-3 minutes)
3. Get your URL: `your-project.vercel.app`

---

## 3. Custom Domain (Optional)

### Add Domain in Vercel

1. Go to Project > Settings > Domains
2. Enter your domain (e.g., `thammystudio.com`)
3. Choose:
   - Apex domain: `thammystudio.com`
   - Subdomain: `www.thammystudio.com`

### Configure DNS

In your domain registrar (GoDaddy, Namecheap, etc.):

**For apex domain (root):**
- Type: A
- Name: @
- Value: 76.76.21.21 (Vercel's IP)

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### Wait for SSL

- Vercel auto-provisions SSL
- Takes 1-5 minutes
- Check domain status in Vercel dashboard

---

## 4. Update Supabase Settings

After deployment with custom domain:

1. Go to Supabase > Authentication > URL Configuration
2. Set Site URL: `https://your-domain.com`
3. Add to Redirect URLs:
   - `https://your-domain.com/**`
   - `https://your-domain.vercel.app/**`

---

## 5. Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All public pages accessible
- [ ] Admin login works
- [ ] Database queries work
- [ ] Image uploads work (Storage)
- [ ] Contact form submits
- [ ] Zalo widget visible
- [ ] Mobile responsive
- [ ] PageSpeed score > 90

---

## 6. Monitoring

### Vercel Analytics (Free)

1. Go to Project > Analytics
2. Enable Web Analytics
3. Add script to layout if needed

### Error Tracking

Check Vercel Functions logs:
- Project > Logs > Functions

### Uptime Monitoring

Use free services:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)

---

## Troubleshooting

### Build Fails

```bash
# Check locally first
npm run build
npm run typecheck
```

Common issues:
- Missing env vars
- TypeScript errors
- Missing dependencies

### Database Connection Issues

- Verify env vars are correct
- Check Supabase project is not paused
- Verify IP allowlist (should be open by default)

### Images Not Loading

- Check Storage bucket policies
- Verify public access enabled
- Check image URLs in database

### Authentication Issues

- Check Site URL in Supabase
- Verify redirect URLs
- Check cookie settings

---

## Rollback

Vercel keeps deployment history:

1. Go to Project > Deployments
2. Find previous working deployment
3. Click "..." > "Promote to Production"

---

## Cost Estimate (Free Tier)

| Service | Free Tier |
|---------|-----------|
| Vercel | 100GB bandwidth, unlimited deployments |
| Supabase | 500MB database, 1GB storage, 50K MAU |
| Domain | ~$10-15/year (paid to registrar) |

Should handle small-medium traffic for free.
