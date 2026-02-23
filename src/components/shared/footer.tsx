import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  services: {
    title: 'Dịch vụ',
    links: [
      { href: '/dich-vu/cham-soc-da', label: 'Chăm sóc da' },
      { href: '/dich-vu/tri-nam', label: 'Trị nám' },
      { href: '/dich-vu/tai-tao-da', label: 'Tái tạo da' },
      { href: '/dich-vu/giam-mo', label: 'Giảm mỡ' },
    ],
  },
  products: {
    title: 'Sản phẩm',
    links: [
      { href: '/san-pham?cat=may-tham-my', label: 'Máy thẩm mỹ' },
      { href: '/san-pham?cat=my-pham', label: 'Mỹ phẩm' },
      { href: '/san-pham?cat=phu-kien', label: 'Phụ kiện' },
    ],
  },
  company: {
    title: 'Công ty',
    links: [
      { href: '/ve-chung-toi', label: 'Về chúng tôi' },
      { href: '/lien-he', label: 'Liên hệ' },
      { href: '/tuyen-dung', label: 'Tuyển dụng' },
    ],
  },
}

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://zalo.me', icon: MessageCircle, label: 'Zalo' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
]

// Import MessageCircle separately
import { MessageCircle } from 'lucide-react'

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
              Chuyên cung cấp dịch vụ thẩm mỹ cao cấp và thiết bị chuyên nghiệp.
              Uy tín - Chất lượng - Hiệu quả.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:0392666334" className="hover:text-primary">
                  0392.666.634
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
