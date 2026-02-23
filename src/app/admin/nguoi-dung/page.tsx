'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, UserPlus, Shield, Eye, EyeOff } from 'lucide-react'
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
import type { User } from '@/types'

// Placeholder data
const placeholderUsers: User[] = [
  {
    id: '1',
    email: 'admin@thammy.vn',
    password: '',
    role: 'super_admin',
    full_name: 'Nguyen Van Admin',
    phone: '0901234567',
    avatar_url: null,
    is_active: true,
    last_login: '2024-01-15T10:00:00',
    created_at: '2023-01-01',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    email: 'sales@thammy.vn',
    password: '',
    role: 'admin',
    full_name: 'Tran Thi Manager',
    phone: '0912345678',
    avatar_url: null,
    is_active: true,
    last_login: '2024-01-14T15:30:00',
    created_at: '2023-06-15',
    updated_at: '2024-01-14',
  },
  {
    id: '3',
    email: 'staff1@thammy.vn',
    password: '',
    role: 'sales',
    full_name: 'Le Van Sales',
    phone: '0923456789',
    avatar_url: null,
    is_active: true,
    last_login: '2024-01-15T08:00:00',
    created_at: '2023-09-01',
    updated_at: '2024-01-15',
  },
  {
    id: '4',
    email: 'viewer@thammy.vn',
    password: '',
    role: 'viewer',
    full_name: 'Pham Thi Viewer',
    phone: '0934567890',
    avatar_url: null,
    is_active: false,
    last_login: '2023-12-01T10:00:00',
    created_at: '2023-11-01',
    updated_at: '2024-01-01',
  },
]

const roleColors: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  super_admin: 'destructive',
  admin: 'default',
  sales: 'secondary',
  viewer: 'outline',
}

const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  sales: 'Sales',
  viewer: 'Viewer',
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Chua co'
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'full_name',
    header: 'Ho ten',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue('full_name')}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Dien thoai',
    cell: ({ row }) => row.getValue('phone') || '-',
  },
  {
    accessorKey: 'role',
    header: 'Vai tro',
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <Badge variant={roleColors[role] || 'secondary'}>
            {roleLabels[role] || role}
          </Badge>
        </div>
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
          {isActive ? 'Hoat dong' : 'Khoa'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'last_login',
    header: 'Dang nhap cuoi',
    cell: ({ row }) => {
      const lastLogin = row.getValue('last_login') as string | null
      return (
        <span className="text-sm text-muted-foreground">
          {formatDate(lastLogin)}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiet
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Chinh sua
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {user.is_active ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Khoa tai khoan
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Mo khoa
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function UsersPage() {
  // TODO: Get current user role for permission checks
  const currentUserRole: string = 'admin'

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nguoi dung"
        description="Quan ly tai khoan nguoi dung he thong"
        actions={[
          {
            label: 'Them nguoi dung',
            icon: UserPlus,
            onClick: () => console.log('Add user'),
            // Disable for non-admin users
            disabled: currentUserRole === 'viewer' || currentUserRole === 'sales',
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={placeholderUsers}
        searchKey="full_name"
        searchPlaceholder="Tim kiem nguoi dung..."
      />
    </div>
  )
}
