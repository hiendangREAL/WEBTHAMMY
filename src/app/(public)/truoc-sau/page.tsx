import { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/shared/hero-section'
import { BeforeAfterCard, BeforeAfterCardData } from '@/components/public/before-after-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Ket qua truoc sau - Tham My Studio',
  description: 'Xem ket qua dieu tri that tu khach hang cua Tham My Studio. Hinh anh truoc va sau khi dieu tri cac dich vu cham soc da, tham my.',
}

// Placeholder data
const beforeAfterItems: BeforeAfterCardData[] = [
  {
    id: '1',
    title: 'Tri nam da mat',
    description: 'Sau 5 buoi dieu tri Laser IPL',
    service_slug: 'tri-nam-da',
    service_name: 'Tri nam da',
  },
  {
    id: '2',
    title: 'Tai tao da PRP',
    description: 'Sau 3 buoi dieu tri',
    service_slug: 'tai-tao-da-prp',
    service_name: 'Tai tao da PRP',
  },
  {
    id: '3',
    title: 'Giam mo bung',
    description: 'Sau 7 buoi dieu tri Cavitation',
    service_slug: 'giam-mo-co-them',
    service_name: 'Giam mo co them',
  },
  {
    id: '4',
    title: 'Nang co da mat',
    description: 'Sau 4 buoi dieu tri HIFU',
    service_slug: 'nang-co-da-hifu',
    service_name: 'Nang co da HIFU',
  },
  {
    id: '5',
    title: 'Tri mun thuong',
    description: 'Sau 8 buoi dieu tri ket hop',
    service_slug: 'cham-soc-da-co-ban',
    service_name: 'Cham soc da',
  },
  {
    id: '6',
    title: 'Se khiet lo cham',
    description: 'Sau 3 buoi dieu tri',
    service_slug: 'cham-soc-da-co-ban',
    service_name: 'Cham soc da',
  },
  {
    id: '7',
    title: 'Phun may 3D',
    description: 'Ket qua ngay sau khi phun',
    service_slug: 'phun-xam-tham-my',
    service_name: 'Phun xam tham my',
  },
  {
    id: '8',
    title: 'Tri nam sau sinh',
    description: 'Sau 6 buoi dieu tri',
    service_slug: 'tri-nam-da',
    service_name: 'Tri nam da',
  },
]

const categories = [
  { slug: 'cham-soc-da', name: 'Cham soc da', count: 12 },
  { slug: 'dieu-tri', name: 'Dieu tri', count: 18 },
  { slug: 'tai-tao', name: 'Tai tao da', count: 8 },
  { slug: 'giam-mo', name: 'Giam mo', count: 6 },
  { slug: 'phun-xam', name: 'Phun xam', count: 4 },
]

export default function BeforeAfterPage() {
  return (
    <>
      <HeroSection
        subtitle="Ket qua thuc te"
        title="Hinh anh truoc - sau"
        description="Kham pha nhung ket qua dieu tri that tu khach hang cua chung toi. Ket qua co the khac nhau tuy vao tinh trang va co the tung nguoi."
        primaryCta={{ label: 'Dat lich tu van', href: '/lien-he' }}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
              Tat ca
            </span>
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 cursor-pointer transition-colors"
              >
                {cat.name} ({cat.count})
              </span>
            ))}
          </div>

          {/* Results info */}
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Hien thi <span className="font-medium text-foreground">{beforeAfterItems.length}</span> ket qua
          </p>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beforeAfterItems.map((item) => (
              <BeforeAfterCard key={item.id} item={item} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            *Ket qua co the khac nhau tuy vao tinh trang va co the tung nguoi. Vui long tu van truc tiep de biet them chi tiet.
          </p>

          {/* CTA Section */}
          <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center md:p-12">
            <Badge variant="outline" className="mb-2">Tu van mien phi</Badge>
            <h2 className="font-heading text-xl font-bold md:text-2xl">
              Ban muon dat ket qua tuong tu?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Lien he ngay de duoc chuyen gia cua chung toi tu van phuong an phu hop nhat cho ban
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-accent hover:bg-accent-dark" asChild>
                <Link href="/lien-he">Dat lich tu van</Link>
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
