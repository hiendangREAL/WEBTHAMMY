'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2, Eye, Briefcase, Clock } from 'lucide-react'
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
import type { Service } from '@/types'

// Placeholder data
const placeholderServices: (Service & { category_name: string })[] = [
  {
    id: '1',
    name: 'Cham soc da mat co ban',
    slug: 'cham-soc-da-mat-co-ban',
    description: 'Cham soc da mat co ban trong 60 phut',
    price: 300000,
    duration_minutes: 60,
    category_id: '1',
    category_name: 'Cham soc da mat',
    images: [],
    is_active: true,
    is_featured: true,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    name: 'Triet long nao',
    slug: 'triet-long-nao',
    description: 'Triet long vung nao',
    price: 150000,
    duration_minutes: 30,
    category_id: '2',
    category_name: 'Triet long',
    images: [],
    is_active: true,
    is_featured: false,
    created_at: '2024-01-14',
    updated_at: '2024-01-14',
  },
  {
    id: '3',
    name: 'Massage body',
    slug: 'massage-body',
    description: 'Massage toan than tham my',
    price: 500000,
    duration_minutes: 90,
    category_id: '3',
    category_name: 'Massage',
    images: [],
    is_active: true,
    is_featured: true,
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
  },
  {
    id: '4',
    name: 'Goi dau thuoc bac',
    slug: 'goi-dau-thuoc-bac',
    description: 'Goi dau voi thuoc bac',
    price: 250000,
    duration_minutes: 45,
    category_id: '4',
    category_name: 'Goi dau',
    images: [],
    is_active: true,
    is_featured: false,
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
  },
  {
    id: '5',
    name: 'Triet long chan',
    slug: 'triet-long-chan',
    description: 'Triet long chan',
    price: 100000,
    duration_minutes: 20,
    category_id: '2',
    category_name: 'Triet long',
    images: [],
    is_active: false,
    is_featured: false,
    created_at: '2024-01-11',
    updated_at: '2024-01-11',
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} phut`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}p` : `${hours}h`
}

const columns: ColumnDef<Service & { category_name: string }>[] = [
  {
    accessorKey: 'name',
    header: 'Ten dich vu',
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
    accessorKey: 'duration_minutes',
    header: 'Thoi luong',
    cell: ({ row }) => {
      const duration = row.getValue('duration_minutes') as number
      return (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {formatDuration(duration)}
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: 'Gia',
    cell: ({ row }) => formatCurrency(row.getValue('price')),
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
    accessorKey: 'is_featured',
    header: 'Noi bat',
    cell: ({ row }) => {
      const isFeatured = row.getValue('is_featured') as boolean
      return isFeatured ? <Badge variant="outline">Noi bat</Badge> : null
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const service = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/dich-vu/${service.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Xem chi tiet
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/dich-vu/${service.id}/edit`}>
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

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dich vu"
        description="Quan ly danh sach dich vu"
        actions={[
          {
            label: 'Them dich vu',
            href: '/admin/dich-vu/new',
            icon: Briefcase,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={placeholderServices}
        searchKey="name"
        searchPlaceholder="Tim kiem dich vu..."
      />
    </div>
  )
}
