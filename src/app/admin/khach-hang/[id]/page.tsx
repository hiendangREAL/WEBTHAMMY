'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, MessageCircle, Bell, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/admin/page-header'
import { InteractionList } from '@/components/admin/interaction-list'
import { toast } from 'sonner'
import type { Customer, CustomerInteraction, Appointment, Order } from '@/types'

// Placeholder data
const getCustomer = async (id: string): Promise<Customer | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (id === '1') {
    return {
      id: '1',
      name: 'Nguyen Thi Lan',
      phone: '0901234567',
      email: 'lan.nguyen@email.com',
      zalo_id: '0901234567',
      dob: '1990-05-15',
      address: '123 Nguyen Van Linh, Q.7, HCM',
      skin_type: 'combination',
      notes: 'Khach VIP, thich dung san pham tu nhien',
      source: 'zalo',
      tags: ['VIP', 'new'],
      is_active: true,
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    }
  }
  return null
}

const getInteractions = async (customerId: string): Promise<CustomerInteraction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [
    {
      id: '1',
      customer_id: customerId,
      user_id: '1',
      type: 'call',
      content: 'Da goi dien nho lich hen',
      next_follow_up: '2024-01-20',
      created_at: '2024-01-15T10:00:00',
    },
    {
      id: '2',
      customer_id: customerId,
      user_id: '1',
      type: 'zalo',
      content: 'Gui thong tin khuyen mai moi',
      next_follow_up: null,
      created_at: '2024-01-14T15:30:00',
    },
    {
      id: '3',
      customer_id: customerId,
      user_id: null,
      type: 'visit',
      content: 'Khach den lam dich vu cham soc da',
      next_follow_up: null,
      created_at: '2024-01-10T09:00:00',
    },
  ]
}

const getAppointments = async (customerId: string): Promise<Appointment[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [
    {
      id: '1',
      customer_id: customerId,
      service_id: '1',
      staff_id: '1',
      scheduled_at: '2024-01-20T09:00:00',
      status: 'confirmed',
      notes: 'Lich hen cham soc da mat',
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    },
  ]
}

const getOrders = async (customerId: string): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [
    {
      id: '1',
      customer_id: customerId,
      subtotal: 800000,
      discount: 50000,
      total: 750000,
      paid: 750000,
      status: 'completed',
      notes: '',
      created_at: '2024-01-10',
      updated_at: '2024-01-10',
    },
  ]
}

const skinTypeLabels: Record<string, string> = {
  oily: 'Da dau',
  dry: 'Da kho',
  combination: 'Da hon hop',
  sensitive: 'Da nhay cam',
  normal: 'Da thuong',
}

const sourceLabels: Record<string, string> = {
  zalo: 'Zalo',
  facebook: 'Facebook',
  website: 'Website',
  referral: 'Gioi thieu',
  'walk-in': 'Vang lai',
}

const tagColors: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  VIP: 'default',
  new: 'secondary',
  'follow-up': 'outline',
  wholesale: 'secondary',
  birthday: 'destructive',
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Chua cap nhat'
  return new Date(dateStr).toLocaleDateString('vi-VN')
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [interactions, setInteractions] = useState<CustomerInteraction[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [customerData, interactionsData, appointmentsData, ordersData] = await Promise.all([
          getCustomer(customerId),
          getInteractions(customerId),
          getAppointments(customerId),
          getOrders(customerId),
        ])

        if (!customerData) {
          toast.error('Khong tim thay khach hang')
          router.push('/admin/khach-hang')
          return
        }

        setCustomer(customerData)
        setInteractions(interactionsData)
        setAppointments(appointmentsData)
        setOrders(ordersData)
      } catch (error) {
        console.error('Error loading customer:', error)
        toast.error('Khong the tai thong tin khach hang')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [customerId, router])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Chi tiet khach hang" />
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Dang tai...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!customer) return null

  return (
    <div className="space-y-6">
      <PageHeader
        title={customer.name}
        description={`Khach hang tu ${sourceLabels[customer.source || ''] || 'Chua xac dinh'}`}
        actions={[
          {
            label: 'Quay lai',
            href: '/admin/khach-hang',
            icon: ArrowLeft,
            variant: 'outline',
          },
          {
            label: 'Chinh sua',
            href: `/admin/khach-hang/${customer.id}/edit`,
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Thong tin ca nhan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tags */}
            {customer.tags && customer.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant={tagColors[tag] || 'secondary'}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${customer.phone}`} className="text-primary hover:underline">
                  {customer.phone}
                </a>
              </div>

              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
                    {customer.email}
                  </a>
                </div>
              )}

              {customer.zalo_id && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Zalo: {customer.zalo_id}</span>
                </div>
              )}

              {customer.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{customer.address}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Ngay sinh: {formatDate(customer.dob)}</span>
              </div>
            </div>

            {/* Skin Type */}
            {customer.skin_type && (
              <div>
                <p className="text-sm text-muted-foreground">Loai da</p>
                <p className="font-medium">{skinTypeLabels[customer.skin_type]}</p>
              </div>
            )}

            {/* Notes */}
            {customer.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Ghi chu</p>
                <p className="text-sm">{customer.notes}</p>
              </div>
            )}

            {/* Created Date */}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Nhap: {formatDate(customer.created_at)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* History Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Follow-up Reminder */}
          {interactions.some(i => i.next_follow_up) && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-primary">Nhac nho theo doi</p>
                    {interactions
                      .filter(i => i.next_follow_up)
                      .sort((a, b) => new Date(a.next_follow_up!).getTime() - new Date(b.next_follow_up!).getTime())
                      .slice(0, 1)
                      .map((interaction) => {
                        const followUpDate = new Date(interaction.next_follow_up!)
                        const today = new Date()
                        const isOverdue = followUpDate < today
                        const isToday = followUpDate.toDateString() === today.toDateString()

                        return (
                          <div key={interaction.id} className="mt-2">
                            <div className="flex items-center gap-2">
                              {isOverdue ? (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              ) : isToday ? (
                                <Clock className="h-4 w-4 text-accent" />
                              ) : (
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className={isOverdue ? 'text-destructive font-medium' : isToday ? 'text-accent font-medium' : ''}>
                                {isOverdue ? 'Qua han: ' : isToday ? 'Hom nay: ' : ''}
                                {formatDate(interaction.next_follow_up!)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {interaction.content}
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" asChild>
                                <a href={`tel:${customer.phone}`}>
                                  <Phone className="mr-2 h-4 w-4" />
                                  Goi dien
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => toast.info('Tinh nang dang phat trien')}>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Gui Zalo
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">Tong chi tieu</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.total, 0))}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">Don hang</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">Lich hen</p>
                <p className="text-2xl font-bold">{appointments.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactions */}
          <InteractionList
            interactions={interactions}
            onAddInteraction={() => toast.info('Tinh nang dang phat trien')}
          />
        </div>
      </div>
    </div>
  )
}
