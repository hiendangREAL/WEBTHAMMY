/**
 * Follow-up Reminder Helpers
 * Utilities for managing customer follow-up reminders and scheduling
 */

// Reminder types
export type ReminderType =
  | 'initial_contact'
  | 'follow_up'
  | 'appointment_reminder'
  | 'post_service'
  | 'birthday'
  | 'promotion'
  | 're_engagement'

// Reminder status
export type ReminderStatus = 'pending' | 'completed' | 'cancelled' | 'snoozed'

// Reminder interface
export interface FollowUpReminder {
  id: string
  customer_id: string
  customer_name: string
  customer_phone: string
  type: ReminderType
  status: ReminderStatus
  scheduled_at: string
  notes?: string
  created_at: string
  completed_at?: string
  snoozed_until?: string
  snooze_count: number
}

// Reminder templates for different types
export const REMINDER_TEMPLATES: Record<ReminderType, { title: string; message: string }> = {
  initial_contact: {
    title: 'Lien he lan dau',
    message: 'Go lien he voi khach hang de tu van dich vu',
  },
  follow_up: {
    title: 'Theo doi khach hang',
    message: 'Go lai khach hang da tu van truoc do',
  },
  appointment_reminder: {
    title: 'Nhac lich hen',
    message: 'Nhac khach hang ve lich hen sap toi',
  },
  post_service: {
    title: 'Cham soc sau dieu tri',
    message: 'Hoi thong khach hang sau khi su dung dich vu',
  },
  birthday: {
    title: 'Chuc mung sinh nhat',
    message: 'Gui loi chuc va uu dai cho khach hang',
  },
  promotion: {
    title: 'Thong bao khuyen mai',
    message: 'Thong bao chuong trinh khuyen mai moi',
  },
  re_engagement: {
    title: 'Kich hoat lai',
    message: 'Lien he khach hang da lau khong quay lai',
  },
}

// Follow-up intervals (in hours)
export const FOLLOW_UP_INTERVALS: Record<ReminderType, number> = {
  initial_contact: 1, // 1 hour after lead capture
  follow_up: 24, // 24 hours after last contact
  appointment_reminder: 24, // 24 hours before appointment
  post_service: 72, // 3 days after service
  birthday: 8760, // 1 year (checked annually)
  promotion: 168, // 7 days
  re_engagement: 720, // 30 days
}

/**
 * Calculate next follow-up date based on type
 */
export function calculateNextFollowUp(type: ReminderType, fromDate: Date = new Date()): Date {
  const nextDate = new Date(fromDate)
  const hours = FOLLOW_UP_INTERVALS[type] || 24
  nextDate.setHours(nextDate.getHours() + hours)
  return nextDate
}

/**
 * Check if a reminder is overdue
 */
export function isReminderOverdue(reminder: FollowUpReminder): boolean {
  if (reminder.status !== 'pending') return false
  return new Date(reminder.scheduled_at) < new Date()
}

/**
 * Get reminder priority level
 */
export function getReminderPriority(reminder: FollowUpReminder): 'low' | 'medium' | 'high' | 'urgent' {
  if (reminder.status !== 'pending') return 'low'

  const scheduledTime = new Date(reminder.scheduled_at).getTime()
  const now = Date.now()
  const hoursDiff = (scheduledTime - now) / (1000 * 60 * 60)

  if (hoursDiff < -24) return 'urgent' // Overdue by more than 24 hours
  if (hoursDiff < 0) return 'high' // Overdue
  if (hoursDiff < 2) return 'high' // Due within 2 hours
  if (hoursDiff < 24) return 'medium' // Due within 24 hours
  return 'low'
}

/**
 * Create a new reminder
 */
export function createReminder(
  customerId: string,
  customerName: string,
  customerPhone: string,
  type: ReminderType,
  scheduledAt: Date,
  notes?: string
): FollowUpReminder {
  return {
    id: `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    customer_id: customerId,
    customer_name: customerName,
    customer_phone: customerPhone,
    type,
    status: 'pending',
    scheduled_at: scheduledAt.toISOString(),
    notes,
    created_at: new Date().toISOString(),
    snooze_count: 0,
  }
}

/**
 * Snooze a reminder
 */
export function snoozeReminder(reminder: FollowUpReminder, hours: number = 24): FollowUpReminder {
  const snoozedUntil = new Date()
  snoozedUntil.setHours(snoozedUntil.getHours() + hours)

  return {
    ...reminder,
    status: 'snoozed',
    snoozed_until: snoozedUntil.toISOString(),
    snooze_count: reminder.snooze_count + 1,
  }
}

/**
 * Complete a reminder
 */
export function completeReminder(reminder: FollowUpReminder): FollowUpReminder {
  return {
    ...reminder,
    status: 'completed',
    completed_at: new Date().toISOString(),
  }
}

/**
 * Get upcoming reminders count
 */
export function getUpcomingRemindersCount(reminders: FollowUpReminder[], hours: number = 24): number {
  const now = new Date()
  const threshold = new Date(now.getTime() + hours * 60 * 60 * 1000)

  return reminders.filter((r) => {
    if (r.status !== 'pending') return false
    const scheduledTime = new Date(r.scheduled_at)
    return scheduledTime >= now && scheduledTime <= threshold
  }).length
}

/**
 * Get overdue reminders
 */
export function getOverdueReminders(reminders: FollowUpReminder[]): FollowUpReminder[] {
  return reminders.filter(isReminderOverdue).sort((a, b) =>
    new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  )
}

/**
 * Format reminder time for display
 */
export function formatReminderTime(scheduledAt: string): string {
  const date = new Date(scheduledAt)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffMins = Math.round(diffMs / 60000)
  const diffHours = Math.round(diffMs / 3600000)
  const diffDays = Math.round(diffMs / 86400000)

  if (diffMs < 0) {
    const absMins = Math.abs(diffMins)
    const absHours = Math.abs(diffHours)
    const absDays = Math.abs(diffDays)

    if (absMins < 60) return `Qua han ${absMins} phut`
    if (absHours < 24) return `Qua han ${absHours} gio`
    return `Qua han ${absDays} ngay`
  }

  if (diffMins < 60) return `Sau ${diffMins} phut`
  if (diffHours < 24) return `Sau ${diffHours} gio`
  if (diffDays === 1) return 'Ngay mai'
  return `${diffDays} ngay nua`
}

/**
 * Generate follow-up schedule for new lead
 */
export function generateFollowUpSchedule(
  customerId: string,
  customerName: string,
  customerPhone: string
): FollowUpReminder[] {
  const now = new Date()
  const reminders: FollowUpReminder[] = []

  // Initial contact - 1 hour
  reminders.push(
    createReminder(
      customerId,
      customerName,
      customerPhone,
      'initial_contact',
      calculateNextFollowUp('initial_contact', now),
      'Lien he lan dau voi khach hang moi'
    )
  )

  // Follow up - 24 hours if no response
  reminders.push(
    createReminder(
      customerId,
      customerName,
      customerPhone,
      'follow_up',
      calculateNextFollowUp('follow_up', now),
      'Theo doi neu khach chua phan hoi'
    )
  )

  // Re-engagement - 30 days
  reminders.push(
    createReminder(
      customerId,
      customerName,
      customerPhone,
      're_engagement',
      calculateNextFollowUp('re_engagement', now),
      'Kich hoat lai neu khong chuyen doi'
    )
  )

  return reminders
}

/**
 * SMS/Templates for follow-up
 */
export const FOLLOW_UP_MESSAGES = {
  initial_contact: 'Chao {name}, cam on ban da quan tam den Tham My Studio. Chuyen gia cua chung toi se goi lai trong 5 phut.',
  appointment_reminder: 'Chao {name}, nho ban co lich hen tai Tham My Studio vao {time}. Vui long xac nhan hoac go 1900xxxx de doi lich.',
  post_service: 'Chao {name}, Tham My Studio mong ban dang co nhung ket qua tot. Neu can ho tro, vui long lien he 1900xxxx.',
  promotion: 'Chao {name}, Tham My Studio co uu dai dac biet {promotion}. Ap dung den {date}. Chi tiet: 1900xxxx',
  birthday: 'Chuc mung sinh nhat {name}! Tham My Studio tang ban ma giam 20% dich vu. Ap dung trong thang nay. LH: 1900xxxx',
}
