/**
 * Lead Capture Utilities
 * Helper functions for managing customer leads in CRM
 */

import { z } from 'zod'

// Lead data schema
export const leadSchema = z.object({
  name: z.string().min(2, 'Vui long nhap ho ten'),
  phone: z.string().min(10, 'So dien thoai khong hop le'),
  email: z.string().email().optional().or(z.literal('')),
  service_interest: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
})

export type LeadData = z.infer<typeof leadSchema>

// Lead status types
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

// Lead priority levels
export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent'

// Lead source types
export type LeadSource =
  | 'website'
  | 'landing_page'
  | 'popup'
  | 'phone'
  | 'zalo'
  | 'facebook'
  | 'referral'
  | 'walk_in'

// Extended lead with metadata
export interface Lead extends LeadData {
  id: string
  status: LeadStatus
  priority: LeadPriority
  source: LeadSource
  created_at: string
  updated_at: string
  assigned_to?: string
  last_contact_at?: string
  follow_up_at?: string
}

// Service options for lead capture
export const SERVICE_OPTIONS = [
  { slug: 'tri-nam', name: 'Tri nam da' },
  { slug: 'tai-tao', name: 'Tai tao da' },
  { slug: 'giam-mo', name: 'Giam mo' },
  { slug: 'nang-co', name: 'Nang co da' },
  { slug: 'cham-soc', name: 'Cham soc da' },
  { slug: 'tri-mun', name: 'Tri mun' },
  { slug: 'phun-xam', name: 'Phun xam' },
  { slug: 'khac', name: 'Dich vu khac' },
] as const

/**
 * Validate Vietnamese phone number
 */
export function isValidVietnamesePhone(phone: string): boolean {
  const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('84')) {
    return '+' + cleaned
  }
  if (cleaned.startsWith('0')) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }
  return phone
}

/**
 * Calculate lead priority based on data
 */
export function calculateLeadPriority(lead: LeadData): LeadPriority {
  // High priority if service interest specified
  if (lead.service_interest && lead.service_interest !== 'khac') {
    return 'high'
  }
  // Medium if phone is valid Vietnamese number
  if (isValidVietnamesePhone(lead.phone)) {
    return 'medium'
  }
  return 'low'
}

/**
 * Get lead score (0-100)
 */
export function getLeadScore(lead: LeadData): number {
  let score = 0

  // Phone validation (+20)
  if (isValidVietnamesePhone(lead.phone)) score += 20

  // Email provided (+15)
  if (lead.email && lead.email.length > 0) score += 15

  // Service interest specified (+25)
  if (lead.service_interest && lead.service_interest !== 'khac') score += 25

  // Name length indicates real person (+10)
  if (lead.name && lead.name.length >= 3) score += 10

  // Notes provided (+15)
  if (lead.notes && lead.notes.length >= 10) score += 15

  // Source quality bonus (+15)
  if (lead.source === 'referral') score += 15
  else if (lead.source === 'landing_page') score += 10
  else if (lead.source === 'website') score += 5

  return Math.min(100, score)
}

/**
 * Create lead submission payload
 */
export function createLeadPayload(data: LeadData, source: LeadSource = 'website') {
  return {
    ...data,
    source,
    status: 'new' as LeadStatus,
    priority: calculateLeadPriority(data),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

/**
 * Submit lead to CRM (placeholder - implement with actual API)
 */
export async function submitLead(data: LeadData, source: LeadSource = 'website'): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const payload = createLeadPayload(data, source)

    // TODO: Replace with actual API call
    // const response = await fetch('/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // })
    // return response.json()

    console.log('Lead submitted:', payload)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      leadId: `lead_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get Zalo contact URL
 */
export function getZaloUrl(phoneNumber: string, message?: string): string {
  const baseUrl = `https://zalo.me/${phoneNumber}`
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }
  return baseUrl
}

/**
 * Get SMS URL for mobile
 */
export function getSmsUrl(phoneNumber: string, message?: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '')
  if (message) {
    return `sms:${cleaned}?body=${encodeURIComponent(message)}`
  }
  return `sms:${cleaned}`
}

/**
 * Lead capture form default messages
 */
export const LEAD_MESSAGES = {
  successTitle: 'Dang ky thanh cong!',
  successMessage: 'Chung toi se lien he voi ban trong thoi gian som nhat.',
  errorTitle: 'Co loi xay ra',
  errorMessage: 'Vui long thu lai hoac lien he truc tiep qua so dien thoai.',
  submitButton: 'Dang ky tu van',
  submittingButton: 'Dang gui...',
}
