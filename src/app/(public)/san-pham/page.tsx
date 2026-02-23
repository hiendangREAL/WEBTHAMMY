import { Metadata } from 'next'
import Link from 'next/link'
import { ProductGrid } from '@/components/public/product-grid'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'
import { ProductCardData } from '@/components/public/product-card'

// Placeholder data - will be replaced with Supabase data
const placeholderProducts: ProductCardData[] = [
  {
    id: '1',
    slug: 'may-tri-nam-laser-ipl',
    name: 'May tri nam Laser IPL cao cap',
    short_description: 'Cong nghe Laser IPL moi nhat, tri nam hieu qua, an toan cho moi loai da',
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
    short_description: 'Cong nghe RF nang cot, lam co da, ghep nang tu nhien',
    price: 120000000,
    sale_price: null,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
    is_featured: true,
  },
  {
    id: '3',
    slug: 'may-giam-mo-cavitation',
    name: 'May giam mo Cavitation 40kHz',
    short_description: 'Giam mo khong phau thuat, tan mo bang song am',
    price: 95000000,
    sale_price: 85000000,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
  },
  {
    id: '4',
    slug: 'serum-tri-nam-thien-nhien',
    name: 'Serum tri nam thien nhien',
    short_description: 'Chiết xuất từ thảo moc thien nhien, an toan, hieu qua',
    price: 890000,
    sale_price: null,
    image_url: null,
    category: { name: 'My pham', slug: 'my-pham' },
    is_new: true,
  },
  {
    id: '5',
    slug: 'bo-my-pham-cham-soc-da',
    name: 'Bo my pham cham soc da chuyen nghiep',
    short_description: 'Day du cac buoc cham soc da, phu hop moi loai da',
    price: 2500000,
    sale_price: 2200000,
    image_url: null,
    category: { name: 'My pham', slug: 'my-pham' },
  },
  {
    id: '6',
    slug: 'dau-massage-da-dau',
    name: 'Dau massage da dau cao cap',
    short_description: 'Tinh dau thien nhien, giup thu gian, cham soc da',
    price: 450000,
    sale_price: null,
    image_url: null,
    category: { name: 'My pham', slug: 'my-pham' },
  },
]

const categories = [
  { slug: 'may-tham-my', name: 'May tham my', count: 15 },
  { slug: 'my-pham', name: 'My pham', count: 42 },
  { slug: 'phu-kien', name: 'Phu kien', count: 28 },
]

export const metadata: Metadata = {
  title: 'San pham & Thiet bi tham my - Tham My Studio',
  description: 'Kham pha cac san pham va thiet bi tham my cao cap. May tri nam Laser, may RF tai tao da, my pham cham soc da chuyen nghiep. Bao hanh chinh hang 24 thang.',
  keywords: ['may tham my', 'thiet bi spa', 'may tri nam', 'may RF', 'my pham spa', 'serum tri nam'],
  openGraph: {
    title: 'San pham & Thiet bi tham my - Tham My Studio',
    description: 'Kham pha cac san pham va thiet bi tham my cao cap voi bao hanh chinh hang.',
  },
}

interface ProductsPageProps {
  searchParams: Promise<{ cat?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams
  const selectedCategory = resolvedSearchParams.cat

  // Filter products by category if selected
  const filteredProducts = selectedCategory
    ? placeholderProducts.filter((p) => p.category?.slug === selectedCategory)
    : placeholderProducts

  return (
    <>
      <HeroSection
        subtitle="Cua hang cua chung toi"
        title="San pham & Thiet bi"
        description="Kham pha cac san pham va thiet bi tham my chat luong cao, duoc chon loc ky tu cac thuong hieu hang dau"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar - Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
                <h3 className="font-heading font-semibold">Danh muc</h3>
                <nav className="mt-4 space-y-1">
                  <Link
                    href="/san-pham"
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      !selectedCategory
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    Tat ca san pham
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/san-pham?cat=${cat.slug}`}
                      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs">({cat.count})</span>
                    </Link>
                  ))}
                </nav>

                {/* Contact CTA */}
                <div className="mt-6 rounded-lg bg-primary/10 p-4">
                  <p className="text-sm font-medium text-foreground">
                    Can tu van?
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Lien he ngay de duoc ho tro
                  </p>
                  <Button size="sm" className="mt-3 w-full bg-accent hover:bg-accent-dark" asChild>
                    <Link href="/lien-he">Lien he ngay</Link>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results header */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Hien thi <span className="font-medium text-foreground">{filteredProducts.length}</span> san pham
                  {selectedCategory && (
                    <span>
                      {' '}trong{' '}
                      <span className="font-medium text-foreground">
                        {categories.find((c) => c.slug === selectedCategory)?.name}
                      </span>
                    </span>
                  )}
                </p>
              </div>

              {/* Product Grid */}
              <ProductGrid products={filteredProducts} columns={3} />
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center md:p-12">
            <h2 className="font-heading text-xl font-bold md:text-2xl">
              Can tu van chon san pham phu hop?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Lien he ngay de duoc chuyen gia tu van mien phi va ho tro tra gop 0%
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-accent hover:bg-accent-dark" asChild>
                <Link href="/lien-he">Tu van mien phi</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1900xxxx">Goi 1900 xxxx</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
