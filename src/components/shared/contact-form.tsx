'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, 'Vui long nhap ho ten'),
  phone: z.string().min(10, 'So dien thoai khong hop le'),
  email: z.string().email('Email khong hop le').optional().or(z.literal('')),
  service_interest: z.string().optional(),
  message: z.string().min(10, 'Noi dung phai co it nhat 10 ky tu'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  onSuccess?: () => void
  showEmail?: boolean
  showServiceSelect?: boolean
  source?: string
}

const services = [
  { value: 'cham-soc-da', label: 'Cham soc da' },
  { value: 'tri-nam', label: 'Tri nam' },
  { value: 'tai-tao-da', label: 'Tai tao da' },
  { value: 'giam-mo', label: 'Giam mo' },
  { value: 'phun-xam', label: 'Phun xam tham my' },
  { value: 'mua-san-pham', label: 'Mua san pham' },
  { value: 'khac', label: 'Khac' },
]

export function ContactForm({ onSuccess, showEmail = true, showServiceSelect = false, source = 'website' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Prepare customer data
      const customerData = {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        source: source,
        notes: `Dich vu quan tam: ${data.service_interest || 'Khong xac dinh'}\nNoi dung: ${data.message}`,
        tags: ['new', 'lead'],
      }

      // TODO: Implement actual form submission with Supabase
      // 1. Check if customer exists by phone
      // 2. Create or update customer record
      // 3. Create customer interaction record
      console.log('Customer data to save:', customerData)
      console.log('Form data:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Gui tin nhan thanh cong! Chung toi se lien he trong vong 24h.')
      reset()
      onSuccess?.()
    } catch {
      toast.error('Co loi xay ra. Vui long thu lai.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Ho ten <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Nguyen Van A"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          So dien thoai <span className="text-destructive">*</span>
        </label>
        <Input
          id="phone"
          {...register('phone')}
          placeholder="0901 234 567"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {showEmail && (
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="email@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      )}

      {showServiceSelect && (
        <div>
          <label
            htmlFor="service_interest"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Dich vu quan tam
          </label>
          <Select onValueChange={(value) => setValue('service_interest', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chon dich vu" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Noi dung <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Noi dung ban muon tu van..."
          rows={4}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Dang gui...' : 'Gui tin nhan'}
      </Button>
    </form>
  )
}
