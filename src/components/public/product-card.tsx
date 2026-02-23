import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

export interface ProductCardData {
  id: string
  slug: string
  name: string
  short_description?: string
  price: number
  sale_price?: number | null
  image_url?: string | null
  category?: {
    name: string
    slug: string
  }
  is_featured?: boolean
  is_new?: boolean
}

interface ProductCardProps {
  product: ProductCardData
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.sale_price && product.sale_price < product.price

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.is_new && (
              <Badge className="bg-primary text-primary-foreground">Moi</Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-destructive text-white">
                -{Math.round((1 - (product.sale_price! / product.price)) * 100)}%
              </Badge>
            )}
            {product.is_featured && !product.is_new && !hasDiscount && (
              <Badge className="bg-accent text-accent-foreground">Noi bat</Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        {product.category && (
          <Link
            href={`/san-pham?cat=${product.category.slug}`}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            {product.category.name}
          </Link>
        )}

        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="mt-1 font-heading font-semibold text-foreground line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.short_description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.short_description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-primary">
              {formatPrice(product.sale_price || product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        <Button size="sm" className="mt-3 w-full bg-accent hover:bg-accent-dark" asChild>
          <a href="tel:0329555534">
            Lien he mua hang
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
