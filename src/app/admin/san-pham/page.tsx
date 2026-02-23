'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2, Eye, Package } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PageHeader } from '@/components/admin/page-header'
import type { Product } from '@/types'

// Placeholder data
const placeholderProducts: (Product & { category_name: string })[] = [
  {
    id: '1',
    name: 'Kem duong da cao cap',
    slug: 'kem-duong-da-cao-cap',
    description: 'Kem duong da cao cap',
    price: 350000,
    compare_price: 450000,
    warranty_months: null,
    category_id: '1',
    category_name: 'Cham soc da',
    images: [],
    specifications: null,
    stock_quantity: 50,
    is_active: true,
    is_featured: true,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    name: 'Son moi HD',
    slug: 'son-moi-hd',
    description: 'Son moi long lay',
    price: 250000,
    compare_price: null,
    warranty_months: null,
    category_id: '2',
    category_name: 'Trang diem',
    images: [],
    specifications: null,
    stock_quantity: 100,
    is_active: true,
    is_featured: false,
    created_at: '2024-01-14',
    updated_at: '2024-01-14',
  },
  {
    id: '3',
    name: 'Serum Vitamin C',
    slug: 'serum-vitamin-c',
    description: 'Serum lam sach da',
    price: 550000,
    compare_price: 650000,
    warranty_months: 12,
    category_id: '1',
    category_name: 'Cham soc da',
    images: [],
    specifications: null,
    stock_quantity: 25,
    is_active: true,
    is_featured: true,
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
  },
  {
    id: '4',
    name: 'Khuon mat na',
    slug: 'khuon-mat-na',
    description: 'Khuon mat na det',
    price: 180000,
    compare_price: null,
    warranty_months: null,
    category_id: '1',
    category_name: 'Cham soc da',
    images: [],
    specifications: null,
    stock_quantity: 0,
    is_active: false,
    is_featured: false,
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const columns: ColumnDef<Product & { category_name: string }>[] = [
  {
    accessorKey: 'name',
    header: 'Ten san pham',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue('name')}</p>
        <p className="text-xs text-muted-foreground">{row.original.slug}</p>
      </div>
    ),
  },
  {
    accessorKey: 'category_name',
    header: 'Danh muc',
  },
  {
    accessorKey: 'price',
    header: 'Gia',
    cell: ({ row }) => {
      const price = row.getValue('price') as number
      const comparePrice = row.original.compare_price
      return (
        <div>
          <p className="font-medium">{formatCurrency(price)}</p>
          {comparePrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(comparePrice)}
            </p>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'stock_quantity',
    header: 'Ton kho',
    cell: ({ row }) => {
      const quantity = row.getValue('stock_quantity') as number
      return (
        <Badge variant={quantity > 10 ? 'secondary' : quantity > 0 ? 'outline' : 'destructive'}>
          {quantity}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Trang thai',
    cell: ({ row }) => {
      const isActive = row.getValue('is_active') as boolean
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Hoat dong' : 'Tam dung'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/san-pham/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Xem chi tiet
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/san-pham/${product.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Chinh sua
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Xoa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="San pham"
        description="Quan ly danh sach san pham"
        actions={[
          {
            label: 'Them san pham',
            href: '/admin/san-pham/new',
            icon: Package,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={placeholderProducts}
        searchKey="name"
        searchPlaceholder="Tim kiem san pham..."
      />
    </div>
  )
}
