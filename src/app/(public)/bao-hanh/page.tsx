import { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ShieldCheck,
  Wrench,
  Phone,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chinh sach bao hanh - Tham My Studio',
  description: 'Chinh sach bao hanh san pham va dich vu tai Tham My Studio. Bao hanh chinh hang 12-24 thang, bao tri mien phi, ho tro ky thuat 24/7.',
  keywords: ['bao hanh', 'chinh sach bao hanh', 'ho tro ky thuat', 'bao tri may tham my'],
  openGraph: {
    title: 'Chinh sach bao hanh - Tham My Studio',
    description: 'Bao hanh chinh hang 12-24 thang, ho tro ky thuat 24/7.',
  },
}

const warrantyPolicies = [
  {
    icon: ShieldCheck,
    title: 'Bao hanh chinh hang',
    description: 'Tat ca san pham deu duoc bao hanh chinh hang tu 12-24 thang tuy loai.',
  },
  {
    icon: Wrench,
    title: 'Bao tri mien phi',
    description: 'Bao tri, bao duong dinh ky mien phi trong thoi gian bao hanh.',
  },
  {
    icon: Phone,
    title: 'Ho tro 24/7',
    description: 'Doi ngu ky thuat san sang ho tro 24/7 qua dien thoai va Zalo.',
  },
  {
    icon: Clock,
    title: 'Xu ly nhanh chong',
    description: 'Cam ket xu ly su co trong vong 24h tai co so hoac 72h tai tinh.',
  },
]

const warrantyCategories = [
  {
    category: 'May tham my',
    period: '24 thang',
    items: ['May Laser IPL', 'May RF', 'May Cavitation', 'May HIFU'],
  },
  {
    category: 'Thiet bi ho tro',
    period: '12 thang',
    items: ['Ghe tham my', 'Den dieu tri', 'May hut dau'],
  },
  {
    category: 'My pham',
    period: 'Khong bao hanh',
    items: ['Serum', 'Kem duong', 'Mat na'],
  },
]

export default function WarrantyPage() {
  return (
    <>
      <HeroSection
        subtitle="Chinh sach bao hanh"
        title="Cam ket chat luong, tam dam long tin"
        description="Chung toi cam ket bao hanh tat ca san pham chinh hang voi dich vu ho tro 24/7"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Warranty policies grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {warrantyPolicies.map((policy) => (
              <Card key={policy.title} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <policy.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold">{policy.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {policy.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Warranty details by category */}
          <div className="mt-16">
            <h2 className="font-heading text-center text-2xl font-bold">
              Thoi han bao hanh theo loai san pham
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Thoi han bao hanh duoc ap dung tu ngay mua hang
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {warrantyCategories.map((cat) => (
                <Card key={cat.category}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-semibold">{cat.category}</h3>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {cat.period}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed terms */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-10">
            <h2 className="font-heading text-xl font-bold">Dieu khoan bao hanh</h2>

            <div className="mt-6 space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">1. Dieu kien bao hanh</h3>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>San pham con trong thoi han bao hanh</li>
                  <li>Ca bao hanh con nguyen ven</li>
                  <li>Loi do nha san xuat hoac van hanh binh thuong</li>
                  <li>Co hoa don mua hang hoac phieu bao hanh</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">2. Khong bao hanh trong cac truong hop</h3>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>San pham het han bao hanh</li>
                  <li>Bi hong do su dung sai, tai nan, thien tai</li>
                  <li>Tu thay the, sua chua boi ben thu 3</li>
                  <li>Mat ca bao hanh, khong co hoa don</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">3. Quy trinh bao hanh</h3>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Lien he hotline hoac Zalo de dang ky bao hanh</li>
                  <li>Kiem tra va xac nhan tinh trang san pham</li>
                  <li>Sua chua hoac doi moi trong vong 3-7 ngay</li>
                  <li>Tra lai san pham va cap nhat thong tin bao hanh</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <h2 className="font-heading text-xl font-bold">Can ho tro bao hanh?</h2>
            <p className="mt-2 text-muted-foreground">
              Lien he ngay voi chung toi de duoc ho tro nhanh chong
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-accent hover:bg-accent-dark gap-2" asChild>
                <Link href="/lien-he">
                  Lien he ho tro
                  <ArrowRight className="h-4 w-4" />
                </Link>
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
