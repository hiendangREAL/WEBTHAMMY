'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '@/components/admin/product-form'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: unknown) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual product creation with Supabase
      console.log('Creating product:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Them san pham thanh cong')
      router.push('/admin/san-pham')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Khong the them san pham')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Them san pham moi"
        description="Nhap thong tin san pham"
      />

      <Card>
        <CardHeader>
          <CardTitle>Thong tin san pham</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  )
}
