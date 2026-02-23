import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductGrid } from '@/components/public/product-grid'
import { formatPrice } from '@/lib/utils'
import { sanitizeHtml } from '@/lib/sanitize'
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  Phone,
  CheckCircle,
} from 'lucide-react'

// Placeholder data
const placeholderProducts = [
  {
    id: '1',
    slug: 'may-tri-nam-laser-ipl',
    name: 'May tri nam Laser IPL cao cap',
    short_description: 'Cong nghe Laser IPL moi nhat, tri nam hieu qua, an toan cho moi loai da',
    description: `
      <p>May tri nam Laser IPL cao cap la thiet bi tham my chuyen nghiep su dung cong nghe Intense Pulsed Light (IPL) moi nhat.</p>

      <h3>Tinh nang noi bat:</h3>
      <ul>
        <li>Cong nghe IPL tien tien, an toan cho moi loai da</li>
        <li>Dieu chinh cuong do linh hoat theo tinh trang da</li>
        <li>Man hinh LCD tien theo doi qua trinh dieu tri</li>
        <li>He thong lam mat tu dong bao ve da</li>
        <li>Cam ket ket qua sau 3-5 buoi dieu tri</li>
      </ul>

      <h3>Thong so ky thuat:</h3>
      <ul>
        <li>Cong suat: 2000W</li>
        <li>Bo loc song: 530-1200nm</li>
        <li>Dien tich dau dieu tri: 10x40mm, 12x30mm</li>
        <li>Tan so xung: 1-5Hz</li>
        <li>Kich thuoc: 450x400x350mm</li>
        <li>Trong luong: 35kg</li>
      </ul>
    `,
    price: 85000000,
    sale_price: 75000000,
    image_url: null,
    images: [],
    category: { name: 'May tham my', slug: 'may-tham-my' },
    is_featured: true,
    is_new: true,
    warranty_months: 24,
    specifications: {
      'Cong suat': '2000W',
      'Bo loc song': '530-1200nm',
      'Dien tich dau': '10x40mm, 12x30mm',
      'Tan so xung': '1-5Hz',
      'Kich thuoc': '450x400x350mm',
      'Trong luong': '35kg',
    },
  },
  {
    id: '2',
    slug: 'may-tai-tao-da-rf',
    name: 'May tai tao da Radio Frequency',
    description: `
      <p>May tai tao da RF su dung cong nghe Radio Frequency de nang cot va lam co da tu nhien.</p>
      <h3>Tinh nang noi bat:</h3>
      <ul>
        <li>Cong nghe RF da cuc Polar</li>
        <li>Khong đau, khong can thoi gian nghi nguoi</li>
        <li>Hieu qua ngay sau buoi dieu tri dau tien</li>
      </ul>
    `,
    price: 120000000,
    sale_price: null,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
    warranty_months: 24,
    specifications: {
      'Cong suat': '3000W',
      'Tan so': '3MHz',
    },
  },
  {
    id: '3',
    slug: 'may-giam-mo-cavitation',
    name: 'May giam mo Cavitation 40kHz',
    description: `<p>May giam mo bang cong nghe Cavitation.</p>`,
    price: 95000000,
    sale_price: 85000000,
    image_url: null,
    category: { name: 'May tham my', slug: 'may-tham-my' },
    warranty_months: 18,
    specifications: {},
  },
]

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = placeholderProducts.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    return { title: 'Khong tim thay san pham' }
  }

  return {
    title: `${product.name} - Tham My Studio`,
    description: product.short_description || product.name,
  }
}

export async function generateStaticParams() {
  return placeholderProducts.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params
  const product = placeholderProducts.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price
  const relatedProducts = placeholderProducts
    .filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug)
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
            <Link href="/san-pham" className="hover:text-primary">
              San pham
            </Link>
            {product.category && (
              <>
                <span>/</span>
                <Link
                  href={`/san-pham?cat=${product.category.slug}`}
                  className="hover:text-primary"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.is_new && (
                    <Badge className="bg-primary text-primary-foreground">Moi</Badge>
                  )}
                  {hasDiscount && (
                    <Badge className="bg-destructive text-white">
                      -{Math.round((1 - (product.sale_price! / product.price)) * 100)}%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail placeholder */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="h-16 w-16 rounded-lg border border-border bg-muted"
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.category && (
                  <Link
                    href={`/san-pham?cat=${product.category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {product.category.name}
                  </Link>
                )}
                <h1 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.sale_price || product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Short description */}
              {product.short_description && (
                <p className="text-muted-foreground">{product.short_description}</p>
              )}

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Bao hanh {product.warranty_months} thang</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Giao hang toan quoc</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>Doi tra trong 7 ngay</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Chinh hang 100%</span>
                </div>
              </div>

              <Separator />

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="flex-1 bg-accent hover:bg-accent-dark" asChild>
                  <Link href="/lien-he">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Tu van mien phi
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <a href="tel:1900xxxx">
                    <Phone className="mr-2 h-5 w-5" />
                    Goi ngay
                  </a>
                </Button>
              </div>

              {/* Contact info */}
              <Card className="bg-primary/5">
                <CardContent className="p-4">
                  <p className="font-medium">Can tu van ve san pham?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Lien he ngay voi chuyen gia cua chung toi de duoc tu van mien phi.
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Hotline:</strong>{' '}
                    <a href="tel:1900xxxx" className="text-primary hover:underline">
                      1900 xxxx
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs: Description, Specifications */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b border-border bg-transparent p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Mo ta san pham
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Thong so ky thuat
                </TabsTrigger>
                <TabsTrigger
                  value="warranty"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Bao hanh
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description || '<p>Dang cap nhat</p>') }}
                />
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="max-w-md">
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key} className="border-b border-border">
                            <td className="py-3 font-medium">{key}</td>
                            <td className="py-3 text-muted-foreground">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Thong so dang cap nhat</p>
                )}
              </TabsContent>

              <TabsContent value="warranty" className="mt-6">
                <div className="max-w-2xl space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Chinh sach bao hanh:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Bao hanh chinh hang {product.warranty_months} thang</li>
                    <li>Ho tro ky thuat 24/7</li>
                    <li>Doi tra mien phi neu loi tu nha san xuat</li>
                    <li>Bao tri, bao duong dinh ky</li>
                  </ul>
                  <p className="mt-4">
                    <Link href="/bao-hanh" className="text-primary hover:underline">
                      Xem chi tiet chinh sach bao hanh
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-xl font-bold">San pham lien quan</h2>
              <div className="mt-6">
                <ProductGrid products={relatedProducts} columns={3} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
