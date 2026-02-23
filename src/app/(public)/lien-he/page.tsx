import { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/shared/hero-section'
import { ContactForm } from '@/components/shared/contact-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lien he & Tu van mien phi - Tham My Studio',
  description: 'Lien he voi Tham My Studio de duoc tu van mien phi. Hotline: 0329.555.534, Zalo, Facebook hoac truc tiep tai 123 Duong ABC, Quan 1, TP.HCM.',
  keywords: ['lien he', 'tu van mien phi', 'hotline tham my', 'dia chi spa'],
  openGraph: {
    title: 'Lien he & Tu van mien phi - Tham My Studio',
    description: 'Lien he de duoc tu van mien phi tu chuyen gia.',
  },
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Dia chi',
    content: '123 Duong ABC, Phuong XYZ, Quan 1, TP.HCM',
    link: 'https://maps.google.com',
    linkText: 'Xem ban do',
  },
  {
    icon: Phone,
    title: 'Hotline',
    content: '0329.555.534',
    link: 'tel:0329555534',
    linkText: 'Goi ngay',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@thammy.vn',
    link: 'mailto:info@thammy.vn',
    linkText: 'Gui email',
  },
  {
    icon: Clock,
    title: 'Gio lam viec',
    content: 'Thu 2 - Chu nhat: 8:00 - 20:00',
    link: null,
  },
]

const socialLinks = [
  {
    name: 'Zalo',
    icon: MessageCircle,
    href: 'https://zalo.me',
    color: 'bg-blue-500',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com',
    color: 'bg-blue-600',
  },
]

export default function ContactPage() {
  return (
    <>
      <HeroSection
        subtitle="Lien he voi chung toi"
        title="Chung moi duoc giai dap"
        description="Lien he ngay de duoc tu van mien phi tu doi ngu chuyen gia cua chung toi"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-heading text-xl font-bold">Gui yeu cau tu van</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Dien thong tin duoi day, chung toi se lien he trong vong 24h
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((info) => (
                  <Card key={info.title}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{info.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {info.content}
                          </p>
                          {info.link && (
                            <a
                              href={info.link}
                              className="mt-1 inline-block text-sm text-primary hover:underline"
                              target={info.link.startsWith('http') ? '_blank' : undefined}
                              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {info.linkText}
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social links */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium">Ket noi voi chung toi</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Theo doi chung toi tren mang xa hoi
                  </p>
                  <div className="mt-4 flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${social.color} text-white transition-opacity hover:opacity-80`}
                        aria-label={social.name}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="mx-auto h-12 w-12 mb-2" />
                      <p className="text-sm">Ban do Google Maps</p>
                      <p className="text-xs">(Tich hop sau)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick CTA */}
              <div className="rounded-xl bg-primary p-6 text-primary-foreground">
                <h3 className="font-heading font-semibold">Goiv ngay de duoc ho tro</h3>
                <p className="mt-2 text-sm opacity-90">
                  Doi ngu tu van vien san sang ho tro ban 24/7
                </p>
                <Button
                  size="lg"
                  className="mt-4 bg-background text-primary hover:bg-background/90"
                  asChild
                >
                  <a href="tel:0329555534">
                    <Phone className="mr-2 h-4 w-4" />
                    0329.555.534
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="font-heading text-center text-2xl font-bold">
              Cau hoi thuong gap
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  q: 'Lam sao de dat lich hen?',
                  a: 'Ban co the dat lich qua hotline, Zalo hoac dien form tren website. Chung toi se lien he xac nhan trong vong 1h.',
                },
                {
                  q: 'Co mien phi tu van khong?',
                  a: 'Co, chung toi mien phi tu van cho tat ca khach hang. Ban chi tra phi khi su dung dich vu.',
                },
                {
                  q: 'Thoi gian hoat dong?',
                  a: 'Chung toi mo cua tu 8:00 - 20:00 tat ca cac ngay trong tuan, ca cuoi tuan va ngay le.',
                },
                {
                  q: 'Co ho tro tra gop khong?',
                  a: 'Co, chung toi ho tro tra gop 0% cho cac san pham may tham my voi ho so don gian.',
                },
              ].map((faq, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{faq.q}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
