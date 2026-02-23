import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Auth callback route for Supabase OAuth and magic link redirects
 * Exchanges auth code for session and redirects to admin
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successful auth - redirect to admin or next URL
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        // Local development - redirect to localhost
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // Production with forwarded host (Vercel, etc.)
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        // Fallback
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Auth failed - redirect to login with error
  return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_error`)
}
