'use client'

import { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Eye, Users, Phone, Mail, Calendar, X } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PageHeader } from '@/components/admin/page-header'
import type { Customer } from '@/types'

// Placeholder data
const placeholderCustomers: Customer[] = [
  {
    id: '1',
    name: 'Nguyen Thi Lan',
    phone: '0901234567',
    email: 'lan.nguyen@email.com',
    zalo_id: '0901234567',
    dob: '1990-05-15',
    address: '123 Nguyen Van Linh, Q.7, HCM',
    skin_type: 'combination',
    notes: 'Khach VIP, thich dung san pham tu nhien',
    source: 'zalo',
    tags: ['VIP', 'new'],
    is_active: true,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    name: 'Tran Van Minh',
    phone: '0912345678',
    email: 'minh.tran@email.com',
    zalo_id: null,
    dob: '1985-08-20',
    address: '456 Le Van Viet, Q.9, HCM',
    skin_type: 'oily',
    notes: '',
    source: 'facebook',
    tags: ['new'],
    is_active: true,
    created_at: '2024-01-14',
    updated_at: '2024-01-14',
  },
  {
    id: '3',
    name: 'Le Thi Hong',
    phone: '0923456789',
    email: null,
    zalo_id: '0923456789',
    dob: null,
    address: '789 Vo Van Ngan, Thu Duc, HCM',
    skin_type: null,
    notes: 'Can theo doi sau khi lam dich vu',
    source: 'website',
    tags: ['follow-up'],
    is_active: true,
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
  },
  {
    id: '4',
    name: 'Pham Van Duc',
    phone: '0934567890',
    email: 'duc.pham@email.com',
    zalo_id: null,
    dob: '1995-03-10',
    address: null,
    skin_type: 'dry',
    notes: '',
    source: 'referral',
    tags: [],
    is_active: true,
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
  },
  {
    id: '5',
    name: 'Hoang Thi Mai',
    phone: '0945678901',
    email: null,
    zalo_id: '0945678901',
    dob: '1988-11-25',
    address: '321 Nguyen Thi Minh Khai, Q.3, HCM',
    skin_type: 'sensitive',
    notes: 'Di ung voi my pham chua alcohol',
    source: 'walk-in',
    tags: ['VIP', 'birthday'],
    is_active: true,
    created_at: '2024-01-11',
    updated_at: '2024-01-11',
  },
]

const sourceLabels: Record<string, string> = {
  zalo: 'Zalo',
  facebook: 'Facebook',
  website: 'Website',
  referral: 'Gioi thieu',
  'walk-in': 'Vang lai',
  instagram: 'Instagram',
  google: 'Google',
}

const tagColors: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  VIP: 'default',
  new: 'secondary',
  'follow-up': 'outline',
  wholesale: 'secondary',
  birthday: 'destructive',
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('vi-VN')
}

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Khach hang',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue('name')}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="h-3 w-3" />
          {row.original.phone}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string | null
      return email ? (
        <div className="flex items-center gap-1">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{email}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
  {
    accessorKey: 'source',
    header: 'Nguon',
    cell: ({ row }) => {
      const source = row.getValue('source') as string | null
      return source ? (
        <Badge variant="outline">
          {sourceLabels[source] || source}
        </Badge>
      ) : null
    },
  },
  {
    accessorKey: 'tags',
    header: 'The',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[]
      if (!tags || tags.length === 0) return null
      return (
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant={tagColors[tag] || 'secondary'} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Ngay tao',
    cell: ({ row }) => formatDate(row.getValue('created_at')),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/khach-hang/${customer.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Xem chi tiet
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/khach-hang/${customer.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Chinh sua
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function CustomersPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags from customers
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    placeholderCustomers.forEach((customer) => {
      customer.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }, [])

  // Filter customers by tag
  const filteredCustomers = useMemo(() => {
    if (!selectedTag) return placeholderCustomers
    return placeholderCustomers.filter((customer) =>
      customer.tags?.includes(selectedTag)
    )
  }, [selectedTag])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Khach hang"
        description="Quan ly thong tin khach hang"
        actions={[
          {
            label: 'Them khach hang',
            href: '/admin/khach-hang/new',
            icon: Users,
          },
          {
            label: 'Dat lich',
            href: '/admin/dat-lich/new',
            icon: Calendar,
            variant: 'outline',
          },
        ]}
      />

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Loc theo the:</span>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
              {selectedTag === tag && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
          {selectedTag && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              Xoa bo loc
            </Button>
          )}
        </div>
      )}

      {/* Results count */}
      {selectedTag && (
        <p className="text-sm text-muted-foreground">
          Hien thi <span className="font-medium text-foreground">{filteredCustomers.length}</span> khach hang co the &quot;{selectedTag}&quot;
        </p>
      )}

      <DataTable
        columns={columns}
        data={filteredCustomers}
        searchKey="name"
        searchPlaceholder="Tim kiem khach hang..."
      />
    </div>
  )
}
