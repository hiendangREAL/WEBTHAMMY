import { redirect } from 'next/navigation'
import { getCurrentUser, type AuthUser } from './get-current-user'

/**
 * Require authentication - redirects to login if not authenticated
 * Use in server components and server actions
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}

/**
 * Require specific role - redirects to login if not authenticated
 * or returns null if authenticated but wrong role
 */
export async function requireRole(allowedRoles: string[]): Promise<AuthUser> {
  const user = await requireAuth()

  if (!allowedRoles.includes(user.role)) {
    redirect('/admin/unauthorized')
  }

  return user
}

/**
 * Check if user has admin access (admin or super_admin)
 */
export async function requireAdmin(): Promise<AuthUser> {
  return requireRole(['admin', 'super_admin'])
}

/**
 * Check if user can write (admin, super_admin, or sales)
 */
export async function requireWriteAccess(): Promise<AuthUser> {
  return requireRole(['admin', 'super_admin', 'sales'])
}
