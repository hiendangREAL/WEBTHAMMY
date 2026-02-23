'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import type { User, UserRole } from '@/types'

const userSchema = z.object({
  email: z.string().email('Email khong hop le'),
  full_name: z.string().min(1, 'Ho ten khong duoc de trong'),
  phone: z.string().optional().nullable().or(z.literal('')),
  role: z.enum(['super_admin', 'admin', 'sales', 'viewer']),
  is_active: z.boolean(),
  password: z.string().min(6, 'Mat khau toi thieu 6 ky tu').optional().or(z.literal('')),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormProps {
  user?: User | null
  onSubmit: (data: UserFormData) => Promise<void>
  isSubmitting?: boolean
  currentUserRole?: UserRole
}

const roleLabels: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  sales: 'Sales',
  viewer: 'Viewer',
}

const roleDescriptions: Record<UserRole, string> = {
  super_admin: 'Toan quyen truy cap va quan ly',
  admin: 'Quan ly noi dung va khach hang',
  sales: 'Quan ly ban hang va khach hang',
  viewer: 'Chi xem, khong the chinh sua',
}

export function UserForm({
  user,
  onSubmit,
  isSubmitting = false,
  currentUserRole = 'admin',
}: UserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user?.email ?? '',
      full_name: user?.full_name ?? '',
      phone: user?.phone ?? '',
      role: user?.role ?? 'viewer',
      is_active: user?.is_active ?? true,
      password: '',
    },
  })

  const handleSubmit = async (data: UserFormData) => {
    // Don't send empty password for updates
    if (user && !data.password) {
      const { password, ...rest } = data
      await onSubmit(rest as UserFormData)
    } else {
      await onSubmit(data)
    }
  }

  // Role hierarchy for permission checks
  const roleHierarchy: UserRole[] = ['viewer', 'sales', 'admin', 'super_admin']
  const canAssignRole = (targetRole: UserRole) => {
    const currentLevel = roleHierarchy.indexOf(currentUserRole)
    const targetLevel = roleHierarchy.indexOf(targetRole)
    return currentLevel >= targetLevel
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ho va ten</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhap ho va ten" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="email@example.com"
                    type="email"
                    autoComplete="email"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>So dien thoai</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="0901234567"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vai tro</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chon vai tro" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(['viewer', 'sales', 'admin', 'super_admin'] as UserRole[]).map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        disabled={!canAssignRole(role)}
                      >
                        <div className="flex flex-col">
                          <span>{roleLabels[role]}</span>
                          <span className="text-xs text-muted-foreground">
                            {roleDescriptions[role]}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mat khau {user && '(de trong neu khong doi)'}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Nhap mat khau"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="h-4 w-4"
              />
              <FormLabel className="!mt-0">Tai khoan hoat dong</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Huy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Dang luu...' : user ? 'Cap nhat' : 'Them moi'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
