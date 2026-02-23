'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error('Admin Error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        {/* Message */}
        <h2 className="font-heading text-xl font-bold">Da xay ra loi</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Khong the tai du lieu. Vui long thu lai hoac lien he quan tri vien.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded-lg bg-muted p-4 text-left">
            <p className="text-sm font-medium text-destructive">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Tai lai
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/admin">
              <Home className="h-4 w-4" />
              Ve Tong quan
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
