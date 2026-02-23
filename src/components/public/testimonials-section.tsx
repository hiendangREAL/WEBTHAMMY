'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  location?: string
  avatar_url?: string | null
  service?: string
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  title?: string
  subtitle?: string
  description?: string
  layout?: 'grid' | 'carousel'
  className?: string
}

// Placeholder testimonials for beauty/spa
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Nguyen Thi Hoa',
    content: 'Sau 5 buoi tri nam tai Tham My Studio, da mat minh da tro nen sang dep hon nhieu. Cam on doi ngu chuyen gia tan tinh!',
    rating: 5,
    location: 'TP.HCM',
    service: 'Tri nam da',
  },
  {
    id: '2',
    name: 'Tran Thi Lan',
    content: 'Dich vu cham soc khach hang rat tan tam. Minh da gioi thieu nhieu ban be den day va ai cung hai long. Se quay lai lan sau!',
    rating: 5,
    location: 'Binh Duong',
    service: 'Tai tao da',
  },
  {
    id: '3',
    name: 'Le Thi Mai',
    content: 'May tham my chat luong tot, bao hanh tan tam. Minh da lap day cho spa cua minh va rat hai long voi hieu qua.',
    rating: 5,
    location: 'Dong Nai',
    service: 'Giam mo',
  },
  {
    id: '4',
    name: 'Pham Thi Ngoc',
    content: 'Nhan vien tu van rat nhiet tinh, giup minh chon duoc phuong phap phu hop. Ket qua vuot qua mong doi!',
    rating: 5,
    location: 'TP.HCM',
    service: 'Nang co da',
  },
  {
    id: '5',
    name: 'Vu Thi Hong',
    content: 'Khong gian spa sach se, yen tinh. Chuyen gia co kinh nghiem, tien phuc vu than thien. Recommend cho moi nguoi!',
    rating: 5,
    location: 'Long An',
    service: 'Cham soc da',
  },
  {
    id: '6',
    name: 'Dang Thi Bich',
    content: 'Da di nhieu noi nhung Tham My Studio van la lua chon tot nhat. Gia ca hop ly, chat luong dam bao.',
    rating: 4,
    location: 'TP.HCM',
    service: 'Tri nam da',
  },
]

export function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = 'Khach hang noi gi ve chung toi',
  subtitle = 'Danh gia',
  description = 'Hang ngan khach hang da tin tuong va hen long',
  layout = 'grid',
  className,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  )

  const renderCard = (t: Testimonial) => (
    <Card key={t.id} className="relative h-full">
      <CardContent className="flex h-full flex-col p-6">
        <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/20" />
        <div className="mb-3">{renderStars(t.rating)}</div>
        <p className="flex-1 text-muted-foreground">{t.content}</p>
        <div className="mt-4 flex items-center gap-3">
          {t.avatar_url ? (
            <img src={t.avatar_url} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {t.name.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <p className="font-medium">{t.name}</p>
            <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              {t.location && <span>{t.location}</span>}
              {t.location && t.service && <span className="text-muted-foreground/50">-</span>}
              {t.service && <Badge variant="secondary" className="text-xs">{t.service}</Badge>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (layout === 'carousel') {
    return (
      <section className={cn('py-16 md:py-24', className)}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-2">{subtitle}</Badge>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
            {description && <p className="mt-3 text-muted-foreground">{description}</p>}
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t.id} className="w-full flex-shrink-0 md:w-1/2 lg:w-1/3">
                    {renderCard(t)}
                  </div>
                ))}
              </div>
            </div>
            {testimonials.length > itemsPerView && (
              <>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-background p-2 shadow-md transition-all hover:bg-secondary disabled:opacity-50"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-background p-2 shadow-md transition-all hover:bg-secondary disabled:opacity-50"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          {testimonials.length > itemsPerView && (
            <div className="mt-6 flex justify-center gap-2">
              {[...Array(maxIndex + 1)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === currentIndex ? 'w-4 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={cn('bg-secondary/30 py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-2">{subtitle}</Badge>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
          {description && <p className="mt-3 text-muted-foreground">{description}</p>}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(renderCard)}
        </div>
      </div>
    </section>
  )
}
