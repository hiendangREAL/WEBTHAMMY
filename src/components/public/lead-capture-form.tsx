'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, MessageCircle, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const leadSchema = z.object({
  name: z.string().min(2, 'Vui long nhap ho ten'),
  phone: z.string().min(10, 'So dien thoai khong hop le'),
  service: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadCaptureFormProps {
  variant?: 'inline' | 'popup'
  title?: string
  description?: string
  showServiceSelect?: boolean
  services?: { slug: string; name: string }[]
  phoneNumber?: string
  className?: string
  onSuccess?: () => void
}

const defaultServices = [
  { slug: 'tri-nam', name: 'Tri nam da' },
  { slug: 'tai-tao', name: 'Tai tao da' },
  { slug: 'giam-mo', name: 'Giam mo' },
  { slug: 'nang-co', name: 'Nang co da' },
  { slug: 'cham-soc', name: 'Cham soc da' },
  { slug: 'khac', name: 'Dich vu khac' },
]

export function LeadCaptureForm({
  variant = 'inline',
  title = 'Dang ky tu van mien phi',
  description = 'De lai so dien thoai, chuyen gia se goi lai trong 5 phut',
  showServiceSelect = true,
  services = defaultServices,
  phoneNumber = '84901234567',
  className,
  onSuccess,
}: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  // Popup auto-show after delay
  useEffect(() => {
    if (variant === 'popup') {
      const timer = setTimeout(() => {
        const hasSeenPopup = sessionStorage.getItem('lead-popup-shown')
        if (!hasSeenPopup) {
          setShowPopup(true)
        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [variant])

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Submit to backend
      console.log('Lead data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Dang ky thanh cong! Chung toi se lien he som.')
      reset()
      sessionStorage.setItem('lead-popup-shown', 'true')
      setShowPopup(false)
      onSuccess?.()
    } catch {
      toast.error('Co loi xay ra. Vui long thu lai.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const zaloUrl = `https://zalo.me/${phoneNumber}?text=${encodeURIComponent('Xin chao, toi muon duoc tu van')}`
  const telUrl = `tel:+${phoneNumber}`

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="lead-name">Ho ten *</Label>
        <Input
          id="lead-name"
          {...register('name')}
          placeholder="Nguyen Van A"
          className={cn(errors.name && 'border-destructive')}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="lead-phone">So dien thoai *</Label>
        <Input
          id="lead-phone"
          {...register('phone')}
          placeholder="0901 234 567"
          className={cn(errors.phone && 'border-destructive')}
        />
        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      {showServiceSelect && (
        <div>
          <Label htmlFor="lead-service">Dich vu quan tam</Label>
          <select
            id="lead-service"
            {...register('service')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">-- Chon dich vu --</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
      )}

      <Button type="submit" className="w-full bg-accent hover:bg-accent-dark" disabled={isSubmitting}>
        {isSubmitting ? 'Dang gui...' : 'Dang ky tu van'}
      </Button>

      {/* Quick Contact Buttons */}
      <div className="flex gap-2">
        <Button type="button" variant="outline" className="flex-1 gap-2" asChild>
          <a href={telUrl}>
            <Phone className="h-4 w-4" />
            Goi ngay
          </a>
        </Button>
        <Button type="button" variant="outline" className="flex-1 gap-2 bg-[#0068FF] text-white hover:bg-[#0068FF]/90" asChild>
          <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Chat Zalo
          </a>
        </Button>
      </div>
    </form>
  )

  if (variant === 'popup') {
    return (
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              {title}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{description}</p>
          {formContent}
        </DialogContent>
      </Dialog>
    )
  }

  // Inline variant
  return (
    <div className={cn('rounded-xl bg-primary p-6 text-primary-foreground md:p-8', className)}>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-6 text-sm opacity-90">{description}</p>
      <div className="rounded-lg bg-background p-4 text-foreground">
        {formContent}
      </div>
    </div>
  )
}

// Floating popup trigger button
export function LeadCaptureTrigger({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl',
          className
        )}
        aria-label="Dang ky tu van"
      >
        <Gift className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              Dang ky tu van mien phi
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">De lai so dien thoai, chuyen gia se goi lai trong 5 phut</p>
          <LeadCaptureForm variant="inline" onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
