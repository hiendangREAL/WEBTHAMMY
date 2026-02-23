// Supabase Database Types for Tham My Studio
// Auto-generated types matching the schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'super_admin' | 'admin' | 'sales' | 'viewer'
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded'

export interface Database {
  public: {
    Tables: {
      // ==================== USERS ====================
      users: {
        Row: {
          id: string
          email: string
          password: string
          role: UserRole
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          role?: UserRole
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          role?: UserRole
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ==================== CUSTOMERS ====================
      customers: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          zalo_id: string | null
          dob: string | null
          address: string | null
          skin_type: string | null
          notes: string | null
          source: string | null
          tags: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          zalo_id?: string | null
          dob?: string | null
          address?: string | null
          skin_type?: string | null
          notes?: string | null
          source?: string | null
          tags?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          zalo_id?: string | null
          dob?: string | null
          address?: string | null
          skin_type?: string | null
          notes?: string | null
          source?: string | null
          tags?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // ==================== CUSTOMER_INTERACTIONS ====================
      customer_interactions: {
        Row: {
          id: string
          customer_id: string
          user_id: string | null
          type: string
          content: string
          next_follow_up: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          user_id?: string | null
          type: string
          content: string
          next_follow_up?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          user_id?: string | null
          type?: string
          content?: string
          next_follow_up?: string | null
          created_at?: string
        }
      }

      // ==================== PRODUCT_CATEGORIES ====================
      product_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }

      // ==================== PRODUCTS ====================
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          compare_price: number | null
          warranty_months: number | null
          category_id: string
          images: string[]
          specifications: Json | null
          stock_quantity: number
          is_active: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          compare_price?: number | null
          warranty_months?: number | null
          category_id: string
          images?: string[]
          specifications?: Json | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          compare_price?: number | null
          warranty_months?: number | null
          category_id?: string
          images?: string[]
          specifications?: Json | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // ==================== SERVICE_CATEGORIES ====================
      service_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }

      // ==================== SERVICES ====================
      services: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          duration_minutes: number
          category_id: string
          images: string[]
          is_active: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          duration_minutes: number
          category_id: string
          images?: string[]
          is_active?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          duration_minutes?: number
          category_id?: string
          images?: string[]
          is_active?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // ==================== APPOINTMENTS ====================
      appointments: {
        Row: {
          id: string
          customer_id: string
          service_id: string
          staff_id: string | null
          scheduled_at: string
          status: AppointmentStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          service_id: string
          staff_id?: string | null
          scheduled_at: string
          status?: AppointmentStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          service_id?: string
          staff_id?: string | null
          scheduled_at?: string
          status?: AppointmentStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ==================== ORDERS ====================
      orders: {
        Row: {
          id: string
          customer_id: string
          subtotal: number
          discount: number
          total: number
          paid: number
          status: OrderStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          subtotal: number
          discount?: number
          total: number
          paid?: number
          status?: OrderStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          subtotal?: number
          discount?: number
          total?: number
          paid?: number
          status?: OrderStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ==================== ORDER_ITEMS ====================
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_role: {
        Args: Record<string, never>
        Returns: string
      }
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      can_write: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: UserRole
      appointment_status: AppointmentStatus
      order_status: OrderStatus
    }
  }
}

// Convenience type exports
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types
export type User = Tables<'users'>
export type Customer = Tables<'customers'>
export type CustomerInteraction = Tables<'customer_interactions'>
export type ProductCategory = Tables<'product_categories'>
export type Product = Tables<'products'>
export type ServiceCategory = Tables<'service_categories'>
export type Service = Tables<'services'>
export type Appointment = Tables<'appointments'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
