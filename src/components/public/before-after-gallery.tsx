'use client'

import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SliderComparison } from './slider-comparison'
import { cn } from '@/lib/utils'

export interface BeforeAfterItem {
  id: string
  title: string
  description?: string
  before_image_url?: string | null
  after_image_url?: string | null
  service_slug?: string
  service_name?: string
}

interface BeforeAfterGalleryProps {
  items?: BeforeAfterItem[]
  title?: string
  subtitle?: string
  description?: string
  disclaimer?: string
  showCategoryFilter?: boolean
  categories?: { slug: string; name: string }[]
  className?: string
}

// Placeholder data
const defaultItems: BeforeAfterItem[] = [
  { id: '1', title: 'Tri nam da', description: 'Sau 5 buoi dieu tri', service_slug: 'tri-nam', service_name: 'Tri nam' },
  { id: '2', title: 'Tai tao da PRP', description: 'Sau 3 buoi dieu tri', service_slug: 'tai-tao', service_name: 'Tai tao da' },
  { id: '3', title: 'Giam mo bung', description: 'Sau 7 buoi dieu tri', service_slug: 'giam-mo', service_name: 'Giam mo' },
  { id: '4', title: 'Nang co da', description: 'Sau 4 buoi dieu tri', service_slug: 'nang-co', service_name: 'Nang co da' },
  { id: '5', title: 'Tri nam nan', description: 'Sau 6 buoi dieu tri', service_slug: 'tri-nam', service_name: 'Tri nam' },
  { id: '6', title: 'Tai tao da RF', description: 'Sau 5 buoi dieu tri', service_slug: 'tai-tao', service_name: 'Tai tao da' },
  { id: '7', title: 'Giam mo bung', description: 'Sau 10 buoi dieu tri', service_slug: 'giam-mo', service_name: 'Giam mo' },
  { id: '8', title: 'Cham soc da', description: 'Sau 2 buoi dieu tri', service_slug: 'cham-soc', service_name: 'Cham soc da' },
]

const defaultCategories = [
  { slug: 'all', name: 'Tat ca' },
  { slug: 'tri-nam', name: 'Tri nam' },
  { slug: 'tai-tao', name: 'Tai tao da' },
  { slug: 'giam-mo', name: 'Giam mo' },
  { slug: 'nang-co', name: 'Nang co da' },
  { slug: 'cham-soc', name: 'Cham soc da' },
]

export function BeforeAfterGallery({
  items = defaultItems,
  title = 'Ket qua truoc - sau',
  subtitle = 'Ket qua',
  description = 'Nhung ket qua dieu tri that tu khach hang cua chung toi',
  disclaimer = '*Ket qua co the khac nhau tuy vao tinh trang va co the tung nguoi',
  showCategoryFilter = true,
  categories = defaultCategories,
  className,
}: BeforeAfterGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxItem, setLightboxItem] = useState<BeforeAfterItem | null>(null)

  const filteredItems = showCategoryFilter
    ? activeCategory === 'all'
      ? items
      : items.filter((item) => item.service_slug === activeCategory)
    : items

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-2">{subtitle}</Badge>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{description}</p>
        </div>

        {/* Category Filter */}
        {showCategoryFilter && categories.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.slug)}
                className="rounded-full"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative">
              <SliderComparison
                beforeImage={item.before_image_url}
                afterImage={item.after_image_url}
                title={item.title}
                description={item.description}
              />
              {/* Lightbox Trigger */}
              <button
                onClick={() => setLightboxItem(item)}
                className="absolute right-2 top-2 z-20 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                aria-label="Xem chi tiet"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {disclaimer && (
          <p className="mt-6 text-center text-sm text-muted-foreground">{disclaimer}</p>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxItem} onOpenChange={() => setLightboxItem(null)}>
        <DialogContent className="max-w-3xl">
          {lightboxItem && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{lightboxItem.title}</h3>
                  {lightboxItem.service_name && (
                    <Badge variant="secondary" className="mt-1">{lightboxItem.service_name}</Badge>
                  )}
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="rounded-full p-1 hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SliderComparison
                beforeImage={lightboxItem.before_image_url}
                afterImage={lightboxItem.after_image_url}
                className="aspect-video"
              />
              {lightboxItem.description && (
                <p className="text-muted-foreground">{lightboxItem.description}</p>
              )}
              <p className="text-xs text-muted-foreground">{disclaimer}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
