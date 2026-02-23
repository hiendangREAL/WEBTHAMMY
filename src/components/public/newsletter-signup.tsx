'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface NewsletterSignupProps {
  title?: string
  description?: string
  className?: string
  variant?: 'default' | 'compact'
}

export function NewsletterSignup({
  title = 'Dang ky nhan tin',
  description = 'Nhan thong tin khuyen mai va tu van cham soc da mien phi',
  className,
  variant = 'default',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      // TODO: Implement actual newsletter signup
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      toast.success('Dang ky thanh cong!')
      setEmail('')
    } catch {
      toast.error('Co loi xay ra. Vui long thu lai.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={className}>
        <p className="text-sm font-medium">{title}</p>
        {isSuccess ? (
          <div className="mt-2 flex items-center gap-2 text-sm text-primary">
            <CheckCircle className="h-4 w-4" />
            Da dang ky thanh cong!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
            <Input
              type="email"
              placeholder="Email cua ban"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-sm"
              required
            />
            <Button
              type="submit"
              size="sm"
              className="bg-accent hover:bg-accent-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : 'Dang ky'}
            </Button>
          </form>
        )}
      </div>
    )
  }

  return (
    <div className={`rounded-xl bg-primary/10 p-6 ${className || ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Mail className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>

          {isSuccess ? (
            <div className="mt-4 flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              <span>Cam on ban da dang ky! Chung toi se gui thong tin huu ich den email cua ban.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Nhap email cua ban"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-accent hover:bg-accent-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Dang xu ly...' : 'Dang ky'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
