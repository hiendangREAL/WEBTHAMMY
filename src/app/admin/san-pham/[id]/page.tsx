'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '@/components/admin/product-form'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'
import type { Product } from '@/types'

// Placeholder product data
const getProduct = async (id: string): Promise<Product | null> => {
  // TODO: Replace with actual Supabase query
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (id === '1') {
    return {
      id: '1',
      name: 'Kem duong da cao cap',
      slug: 'kem-duong-da-cao-cap',
      description: 'Kem duong da cao cap voi thanh phan tu nhien',
      price: 350000,
      compare_price: 450000,
      warranty_months: 12,
      category_id: '1',
      images: [],
      specifications: null,
      stock_quantity: 50,
      is_active: true,
      is_featured: true,
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    }
  }
  return null
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        const data = await getProduct(productId)
        if (!data) {
          toast.error('Khong tim thay san pham')
          router.push('/admin/san-pham')
          return
        }
        setProduct(data)
      } catch (error) {
        console.error('Error loading product:', error)
        toast.error('Khong the tai thong tin san pham')
      } finally {
        setIsLoading(false)
      }
    }
    loadProduct()
  }, [productId, router])

  const handleSubmit = async (data: unknown) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual product update with Supabase
      console.log('Updating product:', productId, data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Cap nhat san pham thanh cong')
      router.push('/admin/san-pham')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Khong the cap nhat san pham')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Chinh sua san pham" />
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
        title="Chinh sua san pham"
        description={product?.name}
      />

      <Card>
        <CardHeader>
          <CardTitle>Thong tin san pham</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  )
}
