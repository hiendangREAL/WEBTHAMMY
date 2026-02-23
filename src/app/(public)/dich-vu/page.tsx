import { Metadata } from 'next'
import Link from 'next/link'
import { ServiceCard, ServiceCardData } from '@/components/public/service-card'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'

// Placeholder data
const placeholderServices: ServiceCardData[] = [
  {
    id: '1',
    slug: 'cham-soc-da-co-ban',
    name: 'Cham soc da co ban',
    short_description: 'Lam sach, cap am, bao ve da hang ngay',
    price: 300000,
    duration_minutes: 60,
    image_url: null,
    category: { name: 'Cham soc da', slug: 'cham-soc-da' },
    is_featured: true,
  },
  {
    id: '2',
    slug: 'tri-nam-da',
    name: 'Tri nam da chuyen nghiep',
    short_description: 'Dieu tri nam da bang Laser IPL, ket hop my pham thien nhien',
    price: 1500000,
    duration_minutes: 90,
    image_url: null,
    category: { name: 'Dieu tri', slug: 'dieu-tri' },
    is_featured: true,
  },
  {
    id: '3',
    slug: 'tai-tao-da-prp',
    name: 'Tai tao da PRP',
    short_description: 'Chiết PRP tu mau tu than, tai tao da tuoi tre',
    price: 3000000,
    duration_minutes: 120,
    image_url: null,
    category: { name: 'Tai tao', slug: 'tai-tao' },
    is_featured: true,
  },
  {
    id: '4',
    slug: 'giam-mo-co-them',
    name: 'Giam mo co them',
    short_description: 'Giam mo cac vung nang cao bang cong nghe Cavitation',
    price: 2000000,
    duration_minutes: 90,
    image_url: null,
    category: { name: 'Giam mo', slug: 'giam-mo' },
  },
  {
    id: '5',
    slug: 'nang-co-da-hifu',
    name: 'Nang co da HIFU',
    short_description: 'Cong ngh HIFU nang co, se khiet da khong phau thuat',
    price: 5000000,
    duration_minutes: 60,
    image_url: null,
    category: { name: 'Tai tao', slug: 'tai-tao' },
  },
  {
    id: '6',
    slug: 'phun-xam-tham-my',
    name: 'Phun xam tham my',
    short_description: 'Phun xam chan may, moi, moi dep tu nhien',
    price: 2500000,
    duration_minutes: 120,
    image_url: null,
    category: { name: 'Phun xam', slug: 'phun-xam' },
  },
]

const categories = [
  { slug: 'cham-soc-da', name: 'Cham soc da', icon: '1' },
  { slug: 'dieu-tri', name: 'Dieu tri', icon: '2' },
  { slug: 'tai-tao', name: 'Tai tao da', icon: '3' },
  { slug: 'giam-mo', name: 'Giam mo', icon: '4' },
  { slug: 'phun-xam', name: 'Phun xam', icon: '5' },
]

export const metadata: Metadata = {
  title: 'Dich vu tham my & cham soc da - Tham My Studio',
  description: 'Cac dich vu cham soc da va tham my chuyen nghiep: Tri nam Laser, tai tao da PRP, giam mo Cavitation, phun xam tham my. Chuyen gia tai nang, ket qua cam ket.',
  keywords: ['dich vu tham my', 'tri nam da', 'tai tao da', 'giam mo', 'phun xam', 'cham soc da mat', 'spa tp hcm'],
  openGraph: {
    title: 'Dich vu tham my & cham soc da - Tham My Studio',
    description: 'Cac dich vu cham soc da va tham my chuyen nghiep voi ket qua cam ket.',
  },
}

interface ServicesPageProps {
  searchParams: Promise<{ cat?: string }>
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const resolvedSearchParams = await searchParams
  const selectedCategory = resolvedSearchParams.cat

  const filteredServices = selectedCategory
    ? placeholderServices.filter((s) => s.category?.slug === selectedCategory)
    : placeholderServices

  return (
    <>
      <HeroSection
        subtitle="Dich vu cua chung toi"
        title="Dich vu tham my chuyen nghiep"
        description="Cac dich vu cham soc da va tham my cao cap voi doi ngu chuyen gia tai nang va cong nghe hien dai"
        primaryCta={{ label: 'Dat lich hen', href: '/lien-he' }}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <Link
              href="/dich-vu"
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}
            >
              Tat ca
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/dich-vu?cat=${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Results count */}
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Hien thi <span className="font-medium text-foreground">{filteredServices.length}</span> dich vu
          </p>

          {/* Service Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center md:p-12">
            <h2 className="font-heading text-xl font-bold md:text-2xl">
              Chua tim thay dich vu phu hop?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Lien he ngay de duoc tu van mien phi tu chuyen gia cua chung toi
            </p>
            <Button size="lg" className="mt-6 bg-accent hover:bg-accent-dark" asChild>
              <Link href="/lien-he">Tu van mien phi</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
