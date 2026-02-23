'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Package,
  Briefcase,
  Calendar,
  Users,
  Settings,
  UserCog,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  { href: '/admin', label: 'Tong quan', icon: Home },
  { href: '/admin/san-pham', label: 'San pham', icon: Package },
  { href: '/admin/dich-vu', label: 'Dich vu', icon: Briefcase },
  { href: '/admin/dat-lich', label: 'Dat lich', icon: Calendar },
  { href: '/admin/khach-hang', label: 'Khach hang', icon: Users },
  { href: '/admin/nguoi-dung', label: 'Nguoi dung', icon: UserCog },
  { href: '/admin/cai-dat', label: 'Cai dat', icon: Settings },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-background transition-transform duration-300 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/admin" className="font-heading text-lg font-semibold text-primary">
            Tham My Studio
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Xem trang chu
          </Link>
        </div>
      </div>
    </aside>
  )
}
