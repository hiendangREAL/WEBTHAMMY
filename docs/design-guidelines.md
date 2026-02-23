# Design Guidelines - Thẩm Mỹ Studio

## Brand Identity

**Style**: Luxury + Medical Professionalism
**Target Audience**: Vietnamese women 25-45, spa/clinic owners
**Mood**: Premium, trustworthy, calming

---

## Color Palette

### Primary Colors
```css
--primary: #A78B71;           /* Mocha Brown - luxury, warmth */
--primary-dark: #8B7355;      /* Darker shade for hover */
--secondary: #F5F0E8;         /* Cream - backgrounds */
--accent: #B76E79;            /* Rose Gold - CTAs, highlights */
```

### Neutral Colors
```css
--background: #FFFCF9;        /* Off-white */
--surface: #FFFFFF;           /* Cards, modals */
--text: #2D2D2D;              /* Body text */
--text-muted: #6B6B6B;        /* Secondary text */
--border: #E8E4DE;            /* Borders, dividers */
```

### Semantic Colors
```css
--success: #7CB9A8;           /* Confirmation */
--warning: #D4A574;           /* Alerts */
--error: #C4725A;             /* Errors */
```

---

## Typography

### Font Families
```css
/* Headlines */
--font-heading: 'Playfair Display', 'Noto Serif', serif;

/* Body */
--font-body: 'Be Vietnam Pro', 'Noto Sans', sans-serif;
```

### Font Sizes
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 2rem;       /* 32px */
--text-4xl: 2.5rem;     /* 40px */
--text-5xl: 3rem;       /* 48px */
```

### Line Heights
- Headings: 1.2
- Body: 1.6
- Captions: 1.4

---

## Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

---

## Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - small elements */
--radius-md: 0.5rem;    /* 8px - buttons, inputs */
--radius-lg: 1rem;      /* 16px - cards */
--radius-xl: 1.5rem;    /* 24px - large cards */
--radius-full: 9999px;  /* Pill buttons */
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
--shadow-xl: 0 16px 48px rgba(0,0,0,0.16);
```

---

## Component Styles

### Buttons
- **Primary**: Rose Gold background, white text, pill shape
- **Secondary**: Outline, primary color text
- **Size**: padding 12px 24px (md), 16px 32px (lg)
- **Hover**: Slight darkening, subtle lift

### Cards
- White background with shadow-md
- Border radius: 16px
- Padding: 24px
- Hover: shadow-lg, slight translateY(-2px)

### Forms
- Input height: 48px
- Border: 1px solid --border
- Focus: 2px ring in primary color
- Labels above inputs, 14px, medium weight

### Navigation
- Sticky header on scroll
- Logo left, nav center, CTA right
- Mobile: Hamburger menu, full-height drawer

---

## Page Structure

### Homepage
1. **Hero**: Full-width, high-quality image, value proposition, CTA
2. **Services Overview**: 3-4 key services in card grid
3. **Products Highlight**: Featured equipment carousel
4. **About/Trust**: Certifications, years in business, stats
5. **Testimonials**: Customer quotes with photos
6. **Before/After**: Treatment results gallery
7. **CTA Section**: Book consultation / Contact
8. **Footer**: Links, contact info, Zalo widget

### Product Page
1. Product images gallery
2. Product name, price, warranty info
3. Specifications tabbed section
4. Related products
5. Contact CTA

### Service Page
1. Service description
2. Pricing tiers
3. Duration, what to expect
4. Booking CTA

---

## Mobile-First Principles

- Base styles for mobile (320px+)
- Breakpoints: sm(640), md(768), lg(1024), xl(1280)
- Touch targets: minimum 44px
- Bottom navigation on mobile
- Full-width CTAs on mobile

---

## Performance Targets

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Images: WebP format, lazy load
- Fonts: Preload critical fonts

---

## Assets Needed

1. **Logo**: SVG format, dark + light versions
2. **Hero Images**: 3-5 high-quality spa/equipment photos
3. **Product Photos**: Clean white background, consistent lighting
4. **Service Icons**: Outlined style, 24px, primary color
5. **Team Photos**: Professional headshots
6. **Before/After Images**: Treatment results (with consent)
7. **Trust Badges**: Certifications, awards logos
