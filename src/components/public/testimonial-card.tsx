import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface TestimonialCardData {
  id: string
  name: string
  content: string
  rating: number
  location?: string
  avatar_url?: string | null
  service?: string
}

interface TestimonialCardProps {
  testimonial: TestimonialCardData
  variant?: 'default' | 'compact'
}

export function TestimonialCard({ testimonial, variant = 'default' }: TestimonialCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={testimonial.avatar_url || undefined} alt={testimonial.name} />
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
            {testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{testimonial.name}</p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < testimonial.rating ? 'fill-accent text-accent' : 'text-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {testimonial.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card className="relative">
      <CardContent className="p-6">
        <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/20" />

        {/* Rating stars */}
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating ? 'fill-accent text-accent' : 'text-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-muted-foreground">{testimonial.content}</p>

        {/* Author info */}
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.avatar_url || undefined} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            {testimonial.location && (
              <p className="text-sm text-muted-foreground">
                {testimonial.location}
              </p>
            )}
          </div>
        </div>

        {/* Service tag */}
        {testimonial.service && (
          <div className="mt-3">
            <Badge variant="secondary" className="text-xs">
              {testimonial.service}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
