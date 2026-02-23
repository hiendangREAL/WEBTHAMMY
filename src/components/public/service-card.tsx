import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight } from 'lucide-react'

export interface ServiceCardData {
  id: string
  slug: string
  name: string
  short_description?: string
  price?: number | null
  duration_minutes?: number | null
  image_url?: string | null
  category?: {
    name: string
    slug: string
  }
  is_featured?: boolean
}

interface ServiceCardProps {
  service: ServiceCardData
  variant?: 'default' | 'compact'
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/dich-vu/${service.slug}`}
        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          {service.image_url ? (
            <Image
              src={service.image_url}
              alt={service.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground group-hover:text-primary line-clamp-1">
            {service.name}
          </h3>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            {service.duration_minutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {service.duration_minutes} phut
              </span>
            )}
          </div>
        </div>

        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </Link>
    )
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/dich-vu/${service.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {service.image_url ? (
            <Image
              src={service.image_url}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          )}

          {service.is_featured && (
            <div className="absolute left-2 top-2">
              <Badge className="bg-accent text-accent-foreground">Noi bat</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        {service.category && (
          <Link
            href={`/dich-vu?cat=${service.category.slug}`}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            {service.category.name}
          </Link>
        )}

        <Link href={`/dich-vu/${service.slug}`}>
          <h3 className="mt-1 font-heading font-semibold text-foreground line-clamp-2 hover:text-primary">
            {service.name}
          </h3>
        </Link>

        {service.short_description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {service.short_description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {service.duration_minutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {service.duration_minutes} phut
              </span>
            )}
          </div>

          <span className="text-sm font-medium text-primary group-hover:underline">
            Xem chi tiet
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
