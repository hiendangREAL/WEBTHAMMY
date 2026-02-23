'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        {/* Message */}
        <h1 className="font-heading text-2xl font-bold md:text-3xl">
          Da xay ra loi
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Xin loi, da co loi xay ra trong qua trinh tai trang. Vui long thu lai
          hoac lien he voi chung toi neu loi tiep tuc xay ra.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 rounded-lg bg-muted p-4 text-left">
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
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Thu lai
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Ve trang chu
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href="tel:1900xxxx">
              <Phone className="h-4 w-4" />
              Ho tro
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
