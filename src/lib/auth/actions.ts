'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Logout action - signs out user and redirects to login page
 */
export async function logout() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/admin/login')
}

/**
 * Login action with email/password
 */
export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Vui long nhap day du thong tin' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': 'Email hoac mat khau khong dung',
      'Email not confirmed': 'Vui long xac nhan email truoc khi dang nhap',
      'Too many requests': 'Qua nhieu lan thu. Vui long doi mot lat',
    }
    return { error: errorMessages[error.message] || 'Dang nhap that bai' }
  }

  redirect('/admin')
}
