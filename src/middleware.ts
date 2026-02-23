import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware to protect admin routes and refresh auth sessions
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* routes (excluding /admin/login)
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isAuthCallback = pathname.startsWith('/auth/')

  // Skip middleware for non-admin routes and auth callback
  if (!isAdminRoute || isAuthCallback) {
    return NextResponse.next()
  }

  // Create response object to potentially modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Set cookies on request for server client
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Update response with new cookies
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session and get user
  const { data: { user } } = await supabase.auth.getUser()

  // If on login page and already authenticated, redirect to admin
  if (isLoginPage && user) {
    const redirectUrl = new URL('/admin', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If not on login page and not authenticated, redirect to login
  if (!isLoginPage && !user) {
    const redirectUrl = new URL('/admin/login', request.url)
    // Preserve the intended destination
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
