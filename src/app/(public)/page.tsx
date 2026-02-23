import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Star,
  Award,
  Clock,
  Heart,
  CheckCircle,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeroSection } from '@/components/shared/hero-section'
import { ProductCard, ProductCardData } from '@/components/public/product-card'
import { TestimonialsSection } from '@/components/public/testimonials-section'
import { BeforeAfterGallery, BeforeAfterItem } from '@/components/public/before-after-gallery'
import { LeadCaptureForm } from '@/components/public/lead-capture-form'

export const metadata: Metadata = {
  title: 'Tham My Studio - Dich vu tham my cao cap tai TP.HCM',
  description: 'Tham My Studio chuyen cung cap dich vu tham my cao cap: Tri nam, tai tao da, giam mo, phun xam. 10+ nam kinh nghiem, 5000+ khach hang hen long. Tu van mien phi!',
  keywords: ['tham my', 'tham my vien', 'tri nam', 'tai tao da', 'giam mo', 'phun xam', 'spa tp hcm', 'cham soc da'],
  openGraph: {
    title: 'Tham My Studio - Dich vu tham my cao cap',
    description: '10+ nam kinh nghiem, 5000+ khach hang hen long. Dich vu tham my cao cap.',
  },
}

const services = [
  {
    title: 'Cham soc da',
    description: 'Dieu tri da chuyen nghiep voi cong nghe hien dai',
    icon: Heart,
    href: '/dich-vu/cham-soc-da-co-ban',
  },
  {
    title: 'Tri nam',
    description: 'Giai phap tri nam hieu qua, an toan',
    icon: Star,
    href: '/dich-vu/tri-nam-da',
  },
  {
    title: 'Tai tao da',
    description: 'Phuc hoi lai la da tuoi tre, sang khoi',
    icon: Award,
    href: '/dich-vu/tai-tao-da-prp',
  },
  {
    title: 'Giam mo',
    description: 'Giam mo cac vung nang cao, noi cot',
    icon: Clock,
    href: '/dich-vu/giam-mo-co-them',
  },
]

const stats = [
  { value: '10+', label: 'Nam kinh nghiem' },
  { value: '5000+', label: 'Khach hang hen long' },
  { value: '50+', label: 'Dich vu da cung cap' },
  { value: '100%', label: 'Cam ket chat luong' },
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
]

// Before/After gallery sample data
const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: '1',
    title: 'Tri nam da',
    description: 'Sau 5 buoi dieu tri',
    before_image_url: null,
    after_image_url: null,
  },
  {
    id: '2',
    title: 'Tai tao da PRP',
    description: 'Sau 3 buoi dieu tri',
    before_image_url: null,
    after_image_url: null,
  },
  {
    id: '3',
    title: 'Giam mo bung',
    description: 'Sau 7 buoi dieu tri',
    before_image_url: null,
    after_image_url: null,
  },
  {
    id: '4',
    title: 'Nang co da',
    description: 'Sau 4 buoi dieu tri',
    before_image_url: null,
    after_image_url: null,
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
        subtitle="Chao mung den Tham My Studio"
        title="Sac dep cua ban la su nghiep cua chung toi"
        description="Chuyen cung cap dich vu cham soc da va tham my cao cap voi cong nghe hien dai, doi ngu chuyen gia tai nang."
        primaryCta={{ label: 'Dat lich hen', href: '/lien-he' }}
        secondaryCta={{ label: 'Xem dich vu', href: '/dich-vu' }}
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

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-2">Dich vu</Badge>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Dich vu noi bat
            </h2>
            <p className="mt-3 text-muted-foreground">
              Kham pha cac dich vu tham my cao cap cua chung toi
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <Card className="group h-full border-border transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/dich-vu">
                Xem tat ca dich vu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Highlight Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-2">San pham</Badge>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              San pham noi bat
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cac san pham va thiet bi tham my chat luong cao
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-accent hover:bg-accent-dark gap-2">
              <Link href="/san-pham">
                Xem tat ca san pham
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Before/After Gallery Section */}
      <BeforeAfterGallery
        items={beforeAfterItems}
        className="py-16 md:py-24"
      />

      {/* Testimonials Section - uses default testimonials */}
      <TestimonialsSection />

      {/* About Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Users className="h-24 w-24" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary p-4 text-primary-foreground shadow-lg">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-sm">Nam kinh nghiem</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-2 w-fit">Ve chung toi</Badge>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Kien tao sac dep - Tan tam cham soc
              </h2>
              <p className="mt-4 text-muted-foreground">
                Hon 10 nam kinh nghiem trong nganh tham my, chung toi cam ket
                mang den dich vu tot nhat cho khach hang voi doi ngu chuyen gia
                tai nang va trang thiet bi hien dai.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Doi ngu chuyen gia tay nghe cao',
                  'Trang thiet bi hien dai, chinh hang',
                  'Cam ket ket qua, bao hanh tan tam',
                  'Dich vu cham soc khach hang 24/7',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-fit gap-2" asChild>
                <Link href="/ve-chung-toi">
                  Tim hieu them
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* CTA Card */}
            <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                San sang tro nen xinh dep hon?
              </h2>
              <p className="mt-4 opacity-90">
                Dat lich hen ngay de duoc tu van mien phi tu chuyen gia cua chung toi
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Tu van mien phi 24/7',
                  'Chuyen gia tren 10 nam kinh nghiem',
                  'Cam ket ket qua, hoan tien neu khong hai long',
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
                  <Link href="/lien-he">Dat lich tu van</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href="tel:19001234">Goi 1900 1234</a>
                </Button>
              </div>
            </div>

            {/* Lead Capture Form */}
            <LeadCaptureForm
              title="Dang ky tu van mien phi"
              description="De lai so dien thoai, chuyen gia se goi lai trong 5 phut"
              showServiceSelect={true}
            />
          </div>
        </div>
      </section>
    </>
  )
}
