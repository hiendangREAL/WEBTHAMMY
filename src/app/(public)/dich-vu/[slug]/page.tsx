import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ServiceCard } from '@/components/public/service-card'
import { ContactForm } from '@/components/shared/contact-form'
import { formatPrice } from '@/lib/utils'
import { sanitizeHtml } from '@/lib/sanitize'
import { Clock, Users, Award, CheckCircle, MessageCircle } from 'lucide-react'

// Placeholder data
const placeholderServices = [
  {
    id: '1',
    slug: 'cham-soc-da-co-ban',
    name: 'Cham soc da co ban',
    short_description: 'Lam sach, cap am, bao ve da hang ngay',
    description: `
      <p>Dich vu cham soc da co ban giup ban co bo da khoe dep, sang khoi moi ngay.</p>

      <h3>Quy trinh dieu tri:</h3>
      <ol>
        <li>Buoc 1: Tay trang, lam sach da</li>
        <li>Buoc 2: Xong hoi mo cong</li>
        <li>Buoc 3: Tay da chet</li>
        <li>Buoc 4: Massage mat</li>
        <li>Buoc 5: Ap mat na duong</li>
        <li>Buoc 6: Thoa serum va kem duong</li>
      </ol>

      <h3>Ket qua:</h3>
      <ul>
        <li>Da sach, khoang khao</li>
        <li>Cung cap am day du</li>
        <li>Da mem mai, sang khoi</li>
      </ul>
    `,
    price: 300000,
    duration_minutes: 60,
    image_url: null,
    images: [],
    category: { name: 'Cham soc da', slug: 'cham-soc-da' },
    is_featured: true,
    benefits: [
      'Lam sach da sau sac',
      'Cap am toan dien',
      'Massage tham my',
      'Mien phi tu van',
    ],
  },
  {
    id: '2',
    slug: 'tri-nam-da',
    name: 'Tri nam da chuyen nghiep',
    description: `<p>Dieu tri nam da bang Laser IPL ket hop my pham thien nhien.</p>`,
    price: 1500000,
    duration_minutes: 90,
    image_url: null,
    category: { name: 'Dieu tri', slug: 'dieu-tri' },
    benefits: ['Tri nam hieu qua', 'An toan cho da', 'Khong tro lai'],
  },
  {
    id: '3',
    slug: 'tai-tao-da-prp',
    name: 'Tai tao da PRP',
    description: `<p>Chiết PRP tu mau tu than, tai tao da tuoi tre.</p>`,
    price: 3000000,
    duration_minutes: 120,
    image_url: null,
    category: { name: 'Tai tao', slug: 'tai-tao' },
    benefits: ['Tai tao tu nhien', 'Hieu qua lau dai', 'An toan'],
  },
]

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const service = placeholderServices.find((s) => s.slug === resolvedParams.slug)

  if (!service) {
    return { title: 'Khong tim thay dich vu' }
  }

  return {
    title: `${service.name} - Tham My Studio`,
    description: service.short_description || service.name,
  }
}

export async function generateStaticParams() {
  return placeholderServices.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = await params
  const service = placeholderServices.find((s) => s.slug === resolvedParams.slug)

  if (!service) {
    notFound()
  }

  const relatedServices = placeholderServices
    .filter((s) => s.id !== service.id && s.category?.slug === service.category?.slug)
    .slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-3 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Trang chu
            </Link>
            <span>/</span>
            <Link href="/dich-vu" className="hover:text-primary">
              Dich vu
            </Link>
            {service.category && (
              <>
                <span>/</span>
                <Link
                  href={`/dich-vu?cat=${service.category.slug}`}
                  className="hover:text-primary"
                >
                  {service.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Service Detail */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
                {service.image_url ? (
                  <Image
                    src={service.image_url}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <svg
                      className="h-24 w-24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                )}

                {service.is_featured && (
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-accent text-accent-foreground">Noi bat</Badge>
                  </div>
                )}
              </div>

              {/* Title and basic info */}
              <div>
                {service.category && (
                  <Link
                    href={`/dich-vu?cat=${service.category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {service.category.name}
                  </Link>
                )}
                <h1 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
                  {service.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {service.duration_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.duration_minutes} phut
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Da phuc vu 1000+ khach
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    Chuyen gia tay nghe cao
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-heading text-lg font-semibold">Mo ta dich vu</h2>
                <div
                  className="prose prose-sm mt-4 max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description || '<p>Dang cap nhat</p>') }}
                />
              </div>

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold">Quyen loi</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold">Dich vu lien quan</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {relatedServices.map((s) => (
                      <ServiceCard key={s.id} service={s} variant="compact" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chi phi tu</p>
                    <p className="mt-1 text-3xl font-bold text-primary">
                      {formatPrice(service.price)}
                    </p>
                    {service.duration_minutes && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Thoi gian: {service.duration_minutes} phut
                      </p>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <Button className="w-full bg-accent hover:bg-accent-dark" asChild>
                      <Link href="/lien-he">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Dat lich ngay
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:1900xxxx">Goi 1900 xxxx</a>
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Quick benefits */}
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Tu van mien phi
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Khong phat sinh chi phi
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Cam ket ket qua
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold">Yeu cau tu van</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    De lai thong tin, chung toi se lien he ngay
                  </p>
                  <div className="mt-4">
                    <ContactForm showEmail={false} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
