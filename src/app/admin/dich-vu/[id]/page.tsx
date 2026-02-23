'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ServiceForm } from '@/components/admin/service-form'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'
import type { Service } from '@/types'

// Placeholder service data
const getService = async (id: string): Promise<Service | null> => {
  // TODO: Replace with actual Supabase query
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (id === '1') {
    return {
      id: '1',
      name: 'Cham soc da mat co ban',
      slug: 'cham-soc-da-mat-co-ban',
      description: 'Cham soc da mat co ban trong 60 phut, bao gom rua mat, toning, mat na',
      price: 300000,
      duration_minutes: 60,
      category_id: '1',
      images: [],
      is_active: true,
      is_featured: true,
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    }
  }
  return null
}

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadService = async () => {
      setIsLoading(true)
      try {
        const data = await getService(serviceId)
        if (!data) {
          toast.error('Khong tim thay dich vu')
          router.push('/admin/dich-vu')
          return
        }
        setService(data)
      } catch (error) {
        console.error('Error loading service:', error)
        toast.error('Khong the tai thong tin dich vu')
      } finally {
        setIsLoading(false)
      }
    }
    loadService()
  }, [serviceId, router])

  const handleSubmit = async (data: unknown) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual service update with Supabase
      console.log('Updating service:', serviceId, data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Cap nhat dich vu thanh cong')
      router.push('/admin/dich-vu')
    } catch (error) {
      console.error('Error updating service:', error)
      toast.error('Khong the cap nhat dich vu')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Chinh sua dich vu" />
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Dang tai...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chinh sua dich vu"
        description={service?.name}
      />

      <Card>
        <CardHeader>
          <CardTitle>Thong tin dich vu</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceForm
            service={service}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  )
}
