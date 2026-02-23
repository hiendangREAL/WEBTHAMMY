'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Tag, ArrowRight, Gift, Percent, Sparkles, Phone, MessageCircle, CheckCircle } from 'lucide-react'
import { LeadCaptureForm } from '@/components/public/lead-capture-form'
import { cn } from '@/lib/utils'

interface Promotion {
  id: string
  title: string
  description: string
  discount: string
  code?: string
  valid_until: string
  terms: string[]
  category: 'service' | 'product' | 'bundle'
  is_hot?: boolean
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Giam 30% dich vu tri nam',
    description: 'Uu dai dac biet cho khach hang moi. Ap dung cho goi 5 buoi tri nam Laser IPL.',
    discount: '30%',
    code: 'TRINAM30',
    valid_until: '2026-03-31',
    terms: ['Ap dung cho khach hang moi', 'Toi da 1 lan su dung', 'Khong ket hop voi khuyen mai khac'],
    category: 'service',
    is_hot: true,
  },
  {
    id: '2',
    title: 'Mua 1 tang 1 Serum tri nam',
    description: 'Mua 1 chai Serum tri nam thien nhien, tang ngay 1 chai tuong tu.',
    discount: 'Mua 1 tang 1',
    valid_until: '2026-02-28',
    terms: ['So luong co han', 'Ap dung tai cua hang va online'],
    category: 'product',
    is_hot: true,
  },
  {
    id: '3',
    title: 'Goi cham soc da tron goi',
    description: 'Combo 5 dich vu cham soc da chi voi 2.500.000d (gia tri 4.000.000d).',
    discount: '37%',
    code: 'COMBO37',
    valid_until: '2026-04-30',
    terms: ['Ap dung cho tat ca khach hang', 'Su dung trong vong 60 ngay', 'Dat lich truoc 24h'],
    category: 'bundle',
  },
  {
    id: '4',
    title: 'Giam 20% may tham my',
    description: 'Giam 20% cho cac loai may tham my khi mua tai cua hang hoac online.',
    discount: '20%',
    code: 'MAY20',
    valid_until: '2026-03-31',
    terms: ['Ap dung cho tat ca may tham my', 'Ho tro tra gop 0%', 'Bao hanh chinh hang 24 thang'],
    category: 'product',
  },
  {
    id: '5',
    title: 'Gio Vang - Giam 50%',
    description: 'Moi thu 5 hang tuan, giam 50% tat ca dich vu cham soc da tu 14h-17h.',
    discount: '50%',
    valid_until: '2026-06-30',
    terms: ['Chi ap dung thu 5 hang tuan', 'Khung gio 14h-17h', 'Dat lich truoc 1 ngay'],
    category: 'service',
    is_hot: true,
  },
]

// Countdown Timer
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      if (distance < 0) return clearInterval(timer)
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { value: timeLeft.days, label: 'Ngay' },
    { value: timeLeft.hours, label: 'Gio' },
    { value: timeLeft.minutes, label: 'Phut' },
    { value: timeLeft.seconds, label: 'Giay' },
  ]

  return (
    <div className="flex justify-center gap-2 md:gap-4">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-2xl font-bold text-white md:h-16 md:w-16 md:text-3xl">
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{u.label}</div>
        </div>
      ))}
    </div>
  )
}

const categoryIcons = { service: Gift, product: Tag, bundle: Sparkles }
const categoryLabels = { service: 'Dich vu', product: 'San pham', bundle: 'Combo' }
const categoryColors = { service: 'bg-blue-500', product: 'bg-green-500', bundle: 'bg-purple-500' }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function PromotionCard({ promotion, isHot }: { promotion: Promotion; isHot?: boolean }) {
  const CategoryIcon = categoryIcons[promotion.category]
  return (
    <Card className={cn('relative overflow-hidden', isHot && 'border-destructive/50')}>
      {isHot && (
        <div className="absolute right-0 top-0">
          <Badge className="rounded-bl-lg rounded-tr-lg bg-destructive">HOT</Badge>
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg text-white', categoryColors[promotion.category])}>
            <CategoryIcon className="h-4 w-4" />
          </span>
          <Badge variant="outline">{categoryLabels[promotion.category]}</Badge>
        </div>
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-lg font-bold text-accent">
            Giam {promotion.discount}
          </span>
        </div>
        <h3 className="font-heading text-lg font-semibold">{promotion.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{promotion.description}</p>
        {promotion.code && (
          <div className="mt-4 rounded-lg border border-dashed border-primary bg-primary/5 p-3">
            <p className="text-center text-xs text-muted-foreground">Ma uu dai</p>
            <p className="text-center font-mono text-lg font-bold text-primary">{promotion.code}</p>
          </div>
        )}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Den: {formatDate(promotion.valid_until)}</span>
        </div>
        <div className="mt-4 space-y-1">
          {promotion.terms.slice(0, 2).map((term, idx) => (
            <p key={idx} className="text-xs text-muted-foreground">- {term}</p>
          ))}
        </div>
        <Button className="mt-4 w-full bg-accent hover:bg-accent-dark" asChild>
          <Link href="/lien-he">Su dung ngay<ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function PromotionsPage() {
  const hotPromotions = promotions.filter((p) => p.is_hot)
  const regularPromotions = promotions.filter((p) => !p.is_hot)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  return (
    <div className="min-h-screen">
      {/* Hero with Countdown */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/80 py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 border-primary-foreground/30 text-primary-foreground">
              <Gift className="mr-1 h-3 w-3" />Uu dai dac biet
            </Badge>
            <h1 className="font-heading text-3xl font-bold md:text-5xl">KHUYEN MAI LON</h1>
            <p className="mt-2 text-xl opacity-90 md:text-2xl">Giam den 50% cac dich vu tham my</p>
          </div>
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-center gap-2 text-primary-foreground/80">
              <Clock className="h-5 w-5" /><span>Ket thuc sau:</span>
            </div>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b bg-secondary/30 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: Gift, title: 'Uu dai doc quyen', desc: 'Chi ap dung thoi gian co han' },
              { icon: CheckCircle, title: 'Cam ket ket qua', desc: 'Hoan tien neu khong hai long' },
              { icon: Clock, title: 'Dat lich de dang', desc: 'Goi dien hoac dat online 24/7' },
              { icon: Phone, title: 'Ho tro tan tam', desc: 'Tu van mien phi 24/7' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {hotPromotions.length > 0 && (
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-white">
                  <Percent className="h-4 w-4" />
                </span>
                <h2 className="font-heading text-xl font-bold">Khuyen mai HOT</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hotPromotions.map((promo) => (
                  <PromotionCard key={promo.id} promotion={promo} isHot />
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="mb-6 font-heading text-xl font-bold">Tat ca khuyen mai</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularPromotions.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl">
            <LeadCaptureForm
              title="Dang ky nhan uu dai"
              description="De lai thong tin de nhan ma giam gia 10% cho khach hang moi"
            />
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="border-t py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <span className="text-muted-foreground">Can tu van ngay?</span>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" asChild>
                <a href="tel:19001234"><Phone className="h-4 w-4" />1900 1234</a>
              </Button>
              <Button className="gap-2 bg-[#0068FF] hover:bg-[#0068FF]/90" asChild>
                <a href="https://zalo.me/84901234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />Chat Zalo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
