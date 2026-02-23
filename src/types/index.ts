// Re-export database types
export type {
  Json,
  Database,
  UserRole,
  AppointmentStatus,
  OrderStatus,
  Tables,
  InsertTables,
  UpdateTables,
  User,
  Customer,
  CustomerInteraction,
  ProductCategory,
  Product,
  ServiceCategory,
  Service,
  Appointment,
  Order,
  OrderItem,
} from './database'

// Import types for use in this file
import type { AppointmentStatus, OrderStatus } from './database'

// Additional application types

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Customer sources - Nguon khach hang
export const CUSTOMER_SOURCES = [
  'zalo',
  'website',
  'walk-in',
  'referral',
  'facebook',
  'instagram',
  'google',
] as const

export type CustomerSource = (typeof CUSTOMER_SOURCES)[number]

// Skin types - Loai da
export const SKIN_TYPES = [
  'oily',      // Da dau
  'dry',       // Da kho
  'combination', // Da hon hop
  'sensitive', // Da nhay cam
  'normal',    // Da thuong
] as const

export type SkinType = (typeof SKIN_TYPES)[number]

// Interaction types - Loai tuong tac
export const INTERACTION_TYPES = [
  'call',       // Cuoc goi
  'zalo',       // Nhan tin Zalo
  'visit',      // Khach den tiem
  'follow_up',  // Nhac nho
  'note',       // Ghi chu
] as const

export type InteractionType = (typeof INTERACTION_TYPES)[number]

// Customer tags - The khach hang
export const CUSTOMER_TAGS = [
  'VIP',        // Khach VIP
  'new',        // Khach moi
  'follow-up',  // Can theo doi
  'wholesale',  // Khach si
  'birthday',   // Sap sinh nhat
] as const

export type CustomerTag = (typeof CUSTOMER_TAGS)[number]

// Form types
export interface CustomerFormData {
  name: string
  phone: string
  email?: string
  zalo_id?: string
  dob?: string
  address?: string
  skin_type?: SkinType
  notes?: string
  source?: CustomerSource
  tags?: string[]
}

export interface AppointmentFormData {
  customer_id: string
  service_id: string
  staff_id?: string
  scheduled_at: string
  notes?: string
}

export interface OrderFormData {
  customer_id: string
  items: OrderItemInput[]
  discount?: number
  notes?: string
}

export interface OrderItemInput {
  product_id: string
  quantity: number
}

// Filter types
export interface CustomerFilters {
  search?: string
  source?: CustomerSource
  tags?: string[]
  date_from?: string
  date_to?: string
}

export interface AppointmentFilters {
  status?: AppointmentStatus
  staff_id?: string
  date_from?: string
  date_to?: string
}

export interface OrderFilters {
  status?: OrderStatus
  customer_id?: string
  date_from?: string
  date_to?: string
}
