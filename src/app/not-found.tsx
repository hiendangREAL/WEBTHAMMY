import Link from 'next/link'
import { Home, Search, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="font-heading text-9xl font-bold text-primary/10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-24 w-24 text-primary/40" />
          </div>
        </div>

        {/* Message */}
        <h2 className="mt-8 font-heading text-2xl font-bold md:text-3xl">
          Khong tim thay trang
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Xin loi, trang ban dang tim kiem khong ton tai hoac da duoc di chuyen.
          Vui long kiem tra lai duong dan hoac quay ve trang chu.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Ve trang chu
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/san-pham">
              <Search className="h-4 w-4" />
              Xem san pham
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href="tel:1900xxxx">
              <Phone className="h-4 w-4" />
              Lien he ho tro
            </a>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            Co the ban dang tim kiem:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              { label: 'San pham', href: '/san-pham' },
              { label: 'Dich vu', href: '/dich-vu' },
              { label: 'Lien he', href: '/lien-he' },
              { label: 'Bao hanh', href: '/bao-hanh' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
