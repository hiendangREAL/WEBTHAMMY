import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  CheckCircle,
  ShieldCheck,
  Users,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HeroSection } from '@/components/shared/hero-section'
import { ProductCard, ProductCardData } from '@/components/public/product-card'
import { TestimonialsSection } from '@/components/public/testimonials-section'
import { LeadCaptureForm } from '@/components/public/lead-capture-form'

export const metadata: Metadata = {
  title: 'Tham My Studio - Thiet bi tham my chuyen nghiep',
  description: 'Tham My Studio chuyen cung cap thiet bi tham my, may tham my, my pham chinh hang. Bao hanh chinh hang, giao hang toan quoc. Tu van mien phi!',
  keywords: ['thiet bi tham my', 'may tham my', 'my pham', 'thiet bi spa', 'trang thiet bi tham my'],
  openGraph: {
    title: 'Tham My Studio - Thiet bi tham my chuyen nghiep',
    description: 'Thiet bi tham my chinh hang, bao hanh uy tin. Giao hang toan quoc.',
  },
}

const stats = [
  { value: '500+', label: 'San pham' },
  { value: '2000+', label: 'Khach hang' },
  { value: '10+', label: 'Nam kinh nghiem' },
  { value: '100%', label: 'Chinh hang' },
]

// Featured products placeholder
const featuredProducts: ProductCardData[] = [
  {
    id: '1',
    slug: 'may-tri-nam-laser-ipl',
    name: 'May tri nam Laser IPL cao cap',
    short_description: 'Cong nghe Laser IPL moi nhat, tri nam hieu qua',
    price: 85000000,
    sale_price: 75000000,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
    is_featured: true,
    is_new: true,
  },
  {
    id: '2',
    slug: 'may-tai-tao-da-rf',
    name: 'May tai tao da Radio Frequency',
    short_description: 'Cong nghe RF nang cot, lam co da',
    price: 120000000,
    sale_price: null,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
    is_featured: true,
  },
  {
    id: '3',
    slug: 'serum-tri-nam-thien-nhien',
    name: 'Serum tri nam thien nhien',
    short_description: 'Chiết xuat tu thao moc, an toan hieu qua',
    price: 890000,
    sale_price: null,
    image_url: null,
    category: { name: 'My pham', slug: 'my-pham' },
    is_new: true,
  },
  {
    id: '4',
    slug: 'may-giam-mo-cryolipolysis',
    name: 'May giam mo Cryolipolysis',
    short_description: 'Cong nghe lanh diet mo hien dai',
    price: 250000000,
    sale_price: 220000000,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
    is_featured: true,
  },
  {
    id: '5',
    slug: 'may-pha-lieu-hifu',
    name: 'May pha lieu HIFO cao cap',
    short_description: 'Cong nghe sieu am tap trung, nang co da',
    price: 180000000,
    sale_price: null,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
  },
  {
    id: '6',
    slug: 'bo-my-pham-cham-soc-da',
    name: 'Bo my pham cham soc da chuyen nghiep',
    short_description: 'Day du buoc chong cham soc',
    price: 2500000,
    sale_price: 1990000,
    image_url: null,
    category: { name: 'My pham', slug: 'my-pham' },
    is_new: true,
  },
]

// Trust badges
const trustBadges = [
  { icon: ShieldCheck, label: 'Bao hanh chinh hang' },
  { icon: Award, label: 'Chung nhan bo Y te' },
  { icon: Users, label: '5000+ khach hang' },
  { icon: CheckCircle, label: 'Cam ket ket qua' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="Chuyen cung cap thiet bi tham my"
        title="Thiet bi tham my chinh hang - Gia tot nhat"
        description="Cung cap may tham my, my pham, phu kien spa chinh hang voi gia sieu tot. Bao hanh uy tin, giao hang toan quoc."
        primaryCta={{ label: 'Xem tat ca san pham', href: '/san-pham' }}
        secondaryCta={{ label: 'Lien he tu van', href: '/lien-he' }}
      />

      {/* Trust Badges */}
      <section className="border-b border-border bg-secondary/30 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm">
                <badge.icon className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-primary py-8 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-2">San pham noi bat</Badge>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Thiet bi & My pham cao cap
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cac san pham ban chay nhat, duoc tin dung nhieu nhat
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-accent hover:bg-accent-dark gap-2" size="lg">
              <Link href="/san-pham">
                Xem tat ca san pham
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-2">Uu diem</Badge>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Vi sao chon chung toi?
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Chinh hang 100%', desc: 'Cam ket hang chinh hang, co tem bao hanh' },
              { icon: Award, title: 'Gia canh tranh', desc: 'Gia tot nhat thi truong, nhieu uu dai' },
              { icon: Users, title: 'Tu van tan tam', desc: 'Doi ngu tu van vien chuyen nghiep' },
              { icon: CheckCircle, title: 'Bao hanh uy tin', desc: 'Bao hanh chinh hang, ho tro 24/7' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* CTA Card */}
            <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Can tu van mua hang?
              </h2>
              <p className="mt-4 opacity-90">
                Lien he ngay de duoc tu van mien phi va nhan bao gia tot nhat
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Tu van mien phi 24/7',
                  'Bao gia nhanh chong trong 5 phut',
                  'Giao hang toan quoc, kiem tra truoc nhan',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 opacity-90">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                  asChild
                >
                  <a href="tel:0329555534">
                    <Phone className="mr-2 h-4 w-4" />
                    0329.555.534
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/lien-he">Lien he tu van</Link>
                </Button>
              </div>
            </div>

            {/* Lead Capture Form */}
            <LeadCaptureForm
              title="Dang ky nhan bao gia"
              description="De lai thong tin, chung toi se lien he trong 5 phut"
              showServiceSelect={false}
            />
          </div>
        </div>
      </section>
    </>
  )
}
