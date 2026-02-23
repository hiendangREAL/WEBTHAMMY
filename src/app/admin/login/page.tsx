'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClient()

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        // Map common errors to Vietnamese messages
        const errorMessages: Record<string, string> = {
          'Invalid login credentials': 'Email hoac mat khau khong dung',
          'Email not confirmed': 'Vui long xac nhan email truoc khi dang nhap',
          'Too many requests': 'Qua nhieu lan thu. Vui long doi mot lat',
        }
        setError(errorMessages[loginError.message] || 'Dang nhap that bai. Vui long thu lai')
        setIsLoading(false)
        return
      }

      // Success - redirect to admin
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Co loi xay ra. Vui long thu lai')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="font-heading text-2xl font-semibold text-primary">
              Tham My Studio
            </span>
          </Link>
          <CardTitle className="text-xl">Dang nhap quan tri</CardTitle>
          <CardDescription>
            Nhap thong tin dang nhap de truy cap trang quan tri
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@thammy.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mat khau</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Dang nhap...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Dang nhap
                </>
              )}
            </Button>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Quay ve trang chu
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
