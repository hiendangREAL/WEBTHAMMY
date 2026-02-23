'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/ve-chung-toi', label: 'Về chúng tôi' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-semibold text-primary md:text-2xl">
            Thẩm Mỹ Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:1900xxxx"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            <span>1900 xxxx</span>
          </a>
          <Button className="bg-accent hover:bg-accent-dark">
            Đặt lịch hẹn
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'border-t border-border bg-background md:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="tel:1900xxxx"
              className="flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>1900 xxxx</span>
            </a>
            <Button className="w-full bg-accent hover:bg-accent-dark">
              Đặt lịch hẹn
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
