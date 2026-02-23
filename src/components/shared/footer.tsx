import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react'

const footerLinks = {
  products: {
    title: 'San pham',
    links: [
      { href: '/san-pham?cat=may-tham-my', label: 'May tham my' },
      { href: '/san-pham?cat=my-pham', label: 'My pham' },
      { href: '/san-pham?cat=phu-kien', label: 'Phu kien' },
      { href: '/san-pham', label: 'Xem tat ca' },
    ],
  },
  company: {
    title: 'Cong ty',
    links: [
      { href: '/ve-chung-toi', label: 'Ve chung toi' },
      { href: '/lien-he', label: 'Lien he' },
      { href: '/bao-hanh', label: 'Bao hanh' },
    ],
  },
}

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://zalo.me', icon: MessageCircle, label: 'Zalo' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-semibold text-primary">
                Thẩm Mỹ Studio
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Chuyen cung cap thiet bi tham my, may tham my, my pham chinh hang.
              Bao hanh uy tin - Giao hang toan quoc.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:0329555534" className="hover:text-primary">
                  0329.555.534
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@thammy.vn" className="hover:text-primary">
                  info@thammy.vn
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-heading text-sm font-semibold">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Thẩm Mỹ Studio. Đã đăng ký bản
              quyền.
            </p>
            <div className="flex gap-4">
              <Link
                href="/chinh-sach-bao-mat"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/dieu-khoan-su-dung"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
