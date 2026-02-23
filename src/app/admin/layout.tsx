'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Package,
  Briefcase,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { logout } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/client'
import type { AuthUser } from '@/lib/auth'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: string
  avatar_url: string | null
}

const sidebarLinks = [
  { href: '/admin', label: 'Tong quan', icon: Home },
  { href: '/admin/san-pham', label: 'San pham', icon: Package },
  { href: '/admin/dich-vu', label: 'Dich vu', icon: Briefcase },
  { href: '/admin/dat-lich', label: 'Dat lich', icon: Calendar },
  { href: '/admin/khach-hang', label: 'Khach hang', icon: Users },
  { href: '/admin/cai-dat', label: 'Cai dat', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get current user on mount
    const fetchUser = async () => {
      const supabase = createClient()

      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        // Get user profile
        const { data: profile } = await supabase
          .from('users')
          .select('id, email, full_name, role, avatar_url')
          .eq('id', authUser.id)
          .maybeSingle<UserProfile>()

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            role: profile.role,
            avatarUrl: profile.avatar_url,
          })
        } else {
          // Fallback to auth metadata
          setUser({
            id: authUser.id,
            email: authUser.email ?? '',
            fullName: (authUser.user_metadata?.full_name as string | null) ?? null,
            role: (authUser.user_metadata?.role as string) ?? 'viewer',
            avatarUrl: (authUser.user_metadata?.avatar_url as string | null) ?? null,
          })
        }
      }

      setIsLoading(false)
    }

    fetchUser()

    // Listen for auth changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not logged in, middleware should handle redirect
  // This is just a fallback
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Dang chuyen huong...</p>
      </div>
    )
  }

  const displayName = user.fullName ?? user.email.split('@')[0]
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-md lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-background transition-transform duration-300 lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Link href="/admin" className="font-heading text-lg font-semibold text-primary">
              Tham My Studio
            </Link>
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
                      onClick={() => setIsSidebarOpen(false)}
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

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-6">
          <div className="lg:hidden" /> {/* Spacer for mobile menu toggle */}

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl ?? undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium md:inline-block">
                    {displayName}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div>{displayName}</div>
                  <div className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Thong tin ca nhan
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Cai dat
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Dang xuat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
