'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ServiceForm } from '@/components/admin/service-form'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'

export default function NewServicePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: unknown) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual service creation with Supabase
      console.log('Creating service:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Them dich vu thanh cong')
      router.push('/admin/dich-vu')
    } catch (error) {
      console.error('Error creating service:', error)
      toast.error('Khong the them dich vu')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Them dich vu moi"
        description="Nhap thong tin dich vu"
      />

      <Card>
        <CardHeader>
          <CardTitle>Thong tin dich vu</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  )
}
