'use client'

import { Users, Calendar, ShoppingBag, DollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/admin/stats-card'
import { PageHeader } from '@/components/admin/page-header'

// Placeholder data
const stats = {
  customersCount: 156,
  appointmentsToday: 8,
  ordersMonth: 42,
  revenueMonth: 125800000,
}

const recentCustomers = [
  { id: '1', name: 'Nguyen Thi Lan', phone: '0901234567', source: 'zalo', createdAt: '2024-01-15' },
  { id: '2', name: 'Tran Van Minh', phone: '0912345678', source: 'facebook', createdAt: '2024-01-14' },
  { id: '3', name: 'Le Thi Hong', phone: '0923456789', source: 'website', createdAt: '2024-01-13' },
  { id: '4', name: 'Pham Van Duc', phone: '0934567890', source: 'referral', createdAt: '2024-01-12' },
  { id: '5', name: 'Hoang Thi Mai', phone: '0945678901', source: 'walk-in', createdAt: '2024-01-11' },
]

const todayAppointments = [
  { id: '1', customer: 'Nguyen Thi Lan', service: 'Cham soc da mat', time: '09:00', status: 'confirmed' },
  { id: '2', customer: 'Tran Van Minh', service: 'Triet long', time: '10:30', status: 'confirmed' },
  { id: '3', customer: 'Le Thi Hong', service: 'Massage body', time: '14:00', status: 'pending' },
  { id: '4', customer: 'Pham Van Duc', service: 'Goi dau', time: '15:30', status: 'completed' },
]

const sourceLabels: Record<string, string> = {
  zalo: 'Zalo',
  facebook: 'Facebook',
  website: 'Website',
  referral: 'Gioi thieu',
  'walk-in': 'Vang lai',
}

const statusColors: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  confirmed: 'default',
  completed: 'outline',
  cancelled: 'destructive',
}

const statusLabels: Record<string, string> = {
  pending: 'Cho xac nhan',
  confirmed: 'Da xac nhan',
  completed: 'Hoan thanh',
  cancelled: 'Da huy',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tong quan"
        description="Chao mung ban quay tro lai!"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Khach hang"
          value={stats.customersCount}
          description="tong so"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Lich hen hom nay"
          value={stats.appointmentsToday}
          description="cuoc hen"
          icon={Calendar}
        />
        <StatsCard
          title="Don hang thang"
          value={stats.ordersMonth}
          description="don"
          icon={ShoppingBag}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Doanh thu thang"
          value={formatCurrency(stats.revenueMonth)}
          description="so voi thang truoc"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Lich hen hom nay</CardTitle>
            <Link href="/admin/dat-lich">
              <Button variant="ghost" size="sm">
                Xem tat ca
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {todayAppointments.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">
                Khong co lich hen nao hom nay
              </p>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{apt.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {apt.service} - {apt.time}
                      </p>
                    </div>
                    <Badge variant={statusColors[apt.status]}>
                      {statusLabels[apt.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Khach hang moi</CardTitle>
            <Link href="/admin/khach-hang">
              <Button variant="ghost" size="sm">
                Xem tat ca
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentCustomers.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">
                Chua co khach hang nao
              </p>
            ) : (
              <div className="space-y-3">
                {recentCustomers.map((customer) => (
                  <Link
                    key={customer.id}
                    href={`/admin/khach-hang/${customer.id}`}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.phone}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {sourceLabels[customer.source] || customer.source}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tac nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/khach-hang/new">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Them khach hang
              </Button>
            </Link>
            <Link href="/admin/dat-lich/new">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Tao lich hen
              </Button>
            </Link>
            <Link href="/admin/san-pham/new">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Them san pham
              </Button>
            </Link>
            <Link href="/admin/dich-vu/new">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Them dich vu
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
