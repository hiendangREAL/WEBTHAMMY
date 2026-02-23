import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: {
    label: string
    href?: string
    onClick?: () => void
    icon?: LucideIcon
    variant?: 'default' | 'outline' | 'secondary' | 'destructive'
    disabled?: boolean
  }[]
  className?: string
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div>
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && actions.length > 0 && (
        <div className="mt-2 flex gap-2 sm:mt-0">
          {actions.map((action, index) => {
            const Icon = action.icon
            const button = (
              <Button
                variant={action.variant || 'default'}
                onClick={action.onClick}
                disabled={action.disabled}
                asChild={!!action.href}
              >
                {action.href ? (
                  <Link href={action.href}>
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {action.label}
                  </Link>
                ) : (
                  <>
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {action.label}
                  </>
                )}
              </Button>
            )
            return <span key={index}>{button}</span>
          })}
        </div>
      )}
    </div>
  )
}
