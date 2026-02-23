'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Customer } from '@/types'
import { CUSTOMER_SOURCES, SKIN_TYPES } from '@/types'

const customerSchema = z.object({
  name: z.string().min(1, 'Ten khach hang khong duoc de trong'),
  phone: z.string().min(9, 'So dien thoai khong hop le'),
  email: z.string().email('Email khong hop le').optional().nullable().or(z.literal('')),
  zalo_id: z.string().optional().nullable().or(z.literal('')),
  dob: z.string().optional().nullable().or(z.literal('')),
  address: z.string().optional().nullable().or(z.literal('')),
  skin_type: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  notes: z.string().optional().nullable().or(z.literal('')),
})

type CustomerFormData = z.infer<typeof customerSchema>

interface CustomerFormProps {
  customer?: Customer | null
  onSubmit: (data: CustomerFormData) => Promise<void>
  isSubmitting?: boolean
}

const skinTypeLabels: Record<string, string> = {
  oily: 'Da dau',
  dry: 'Da kho',
  combination: 'Da hon hop',
  sensitive: 'Da nhay cam',
  normal: 'Da thuong',
}

const sourceLabels: Record<string, string> = {
  zalo: 'Zalo',
  website: 'Website',
  'walk-in': 'Khach vang lai',
  referral: 'Gioi thieu',
  facebook: 'Facebook',
  instagram: 'Instagram',
  google: 'Google',
}

export function CustomerForm({
  customer,
  onSubmit,
  isSubmitting = false,
}: CustomerFormProps) {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer?.name ?? '',
      phone: customer?.phone ?? '',
      email: customer?.email ?? '',
      zalo_id: customer?.zalo_id ?? '',
      dob: customer?.dob ?? '',
      address: customer?.address ?? '',
      skin_type: customer?.skin_type ?? '',
      source: customer?.source ?? '',
      notes: customer?.notes ?? '',
    },
  })

  const handleSubmit = async (data: CustomerFormData) => {
    await onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ho va ten *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhap ho va ten" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>So dien thoai *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0901234567" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="email@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zalo_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zalo ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Zalo phone number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngay sinh</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nguon khach hang</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chon nguon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CUSTOMER_SOURCES.map((src) => (
                      <SelectItem key={src} value={src}>
                        {sourceLabels[src]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="skin_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loai da</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chon loai da" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SKIN_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {skinTypeLabels[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia chi</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Dia chi khach hang"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chu</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Ghi chu ve khach hang"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Huy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Dang luu...' : customer ? 'Cap nhat' : 'Them moi'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
