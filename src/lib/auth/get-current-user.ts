import { createClient } from '@/lib/supabase/server'

export interface AuthUser {
  id: string
  email: string
  fullName: string | null
  role: string
  avatarUrl: string | null
}

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: string
  avatar_url: string | null
}

/**
 * Get current authenticated user from Supabase Auth
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createClient()

    const { data: { user: authUser }, error } = await supabase.auth.getUser()

    if (error || !authUser) {
      return null
    }

    // Get user profile from users table
    const { data: userProfile } = await supabase
      .from('users')
      .select('id, email, full_name, role, avatar_url')
      .eq('id', authUser.id)
      .maybeSingle<UserProfile>()

    if (!userProfile) {
      // Return basic info from auth if no profile exists
      return {
        id: authUser.id,
        email: authUser.email ?? '',
        fullName: (authUser.user_metadata?.full_name as string | null) ?? null,
        role: (authUser.user_metadata?.role as string) ?? 'viewer',
        avatarUrl: (authUser.user_metadata?.avatar_url as string | null) ?? null,
      }
    }

    return {
      id: userProfile.id,
      email: userProfile.email,
      fullName: userProfile.full_name,
      role: userProfile.role,
      avatarUrl: userProfile.avatar_url,
    }
  } catch {
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Get current session from Supabase
 */
export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
