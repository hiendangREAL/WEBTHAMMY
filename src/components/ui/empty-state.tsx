import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FileQuestion, Inbox, Search, AlertCircle } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  variant?: 'default' | 'search' | 'error' | 'inbox'
}

const variantIcons = {
  default: <FileQuestion className="h-12 w-12 text-muted-foreground" />,
  search: <Search className="h-12 w-12 text-muted-foreground" />,
  error: <AlertCircle className="h-12 w-12 text-destructive" />,
  inbox: <Inbox className="h-12 w-12 text-muted-foreground" />,
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  variant = 'default',
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center px-4 py-12 text-center',
        className
      )}
    >
      <div className="mb-4">{icon ?? variantIcons[variant]}</div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  )
}

// Pre-built empty state variants for common use cases
export function EmptySearchResults({ query }: { query?: string }) {
  return (
    <EmptyState
      variant="search"
      title="Khong tim thay ket qua"
      description={
        query
          ? `Khong co ket quả nao cho "${query}". Thu tim kiem voi tu khoa khac.`
          : 'Thu tim kiem voi tu khoa khac.'
      }
    />
  )
}

export function EmptyDataState({
  entityName = 'du lieu',
  onAdd,
}: {
  entityName?: string
  onAdd?: () => void
}) {
  return (
    <EmptyState
      variant="inbox"
      title={`Chua co ${entityName}`}
      description={`Bat dau bang cach them ${entityName} moi.`}
      action={onAdd ? { label: `Them ${entityName}`, onClick: onAdd } : undefined}
    />
  )
}

export function ErrorState({
  message = 'Da xay ra loi',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <EmptyState
      variant="error"
      title="Co loi xay ra"
      description={message}
      action={onRetry ? { label: 'Thu lai', onClick: onRetry } : undefined}
    />
  )
}
