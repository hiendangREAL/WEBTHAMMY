'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Phone, Calendar } from 'lucide-react'

export interface CTASectionProps {
  title: string
  description?: string
  primaryCta?: {
    label: string
    href: string
    icon?: 'arrow' | 'calendar'
  }
  secondaryCta?: {
    label: string
    href?: string
    phone?: string
  }
  variant?: 'primary' | 'accent' | 'outline'
  className?: string
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'primary',
  className,
}: CTASectionProps) {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-white',
    outline: 'border-2 border-primary bg-transparent text-primary',
  }

  const buttonStyles = {
    primary: {
      primary: 'bg-background text-primary hover:bg-background/90',
      outline: 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10',
    },
    accent: {
      primary: 'bg-white text-accent hover:bg-white/90',
      outline: 'border-white/30 text-white hover:bg-white/10',
    },
    outline: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border-primary text-primary hover:bg-primary/10',
    },
  }

  return (
    <section className={cn('py-12 md:py-16', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          'mx-auto max-w-3xl rounded-2xl p-8 text-center md:p-12',
          variantStyles[variant]
        )}>
          <h2 className="font-heading text-xl font-bold md:text-2xl">
            {title}
          </h2>
          {description && (
            <p className={cn(
              'mt-3',
              variant === 'outline' ? 'text-muted-foreground' : 'opacity-90'
            )}>
              {description}
            </p>
          )}

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primaryCta && (
              <Button
                size="lg"
                className={cn(
                  'gap-2',
                  buttonStyles[variant].primary
                )}
                asChild
              >
                <Link href={primaryCta.href}>
                  {primaryCta.icon === 'calendar' && <Calendar className="h-4 w-4" />}
                  {primaryCta.label}
                  {primaryCta.icon === 'arrow' && <ArrowRight className="h-4 w-4" />}
                </Link>
              </Button>
            )}

            {secondaryCta && (
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  'gap-2',
                  buttonStyles[variant].outline
                )}
                asChild
              >
                {secondaryCta.phone ? (
                  <a href={`tel:${secondaryCta.phone}`}>
                    <Phone className="h-4 w-4" />
                    {secondaryCta.label}
                  </a>
                ) : (
                  <Link href={secondaryCta.href || '#'}>
                    {secondaryCta.label}
                  </Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
