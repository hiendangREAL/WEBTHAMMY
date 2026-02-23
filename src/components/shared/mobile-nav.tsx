'use client'

import Link from 'next/link'
import { X, Phone, Home, Briefcase, ShoppingBag, Users, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/dich-vu', label: 'Dịch vụ', icon: Briefcase },
  { href: '/san-pham', label: 'Sản phẩm', icon: ShoppingBag },
  { href: '/ve-chung-toi', label: 'Về chúng tôi', icon: Users },
  { href: '/lien-he', label: 'Liên hệ', icon: Mail },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background shadow-xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <span className="font-heading text-lg font-semibold text-primary">
              Thẩm Mỹ Studio
            </span>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="border-t border-border p-4">
            <a
              href="tel:0392666334"
              className="mb-3 flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              <span>Gọi ngay: 0392.666.634</span>
            </a>
            <Button className="w-full bg-accent py-3 hover:bg-accent-dark">
              Đặt lịch hẹn
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
