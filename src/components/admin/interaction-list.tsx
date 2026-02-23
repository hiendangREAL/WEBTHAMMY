'use client'

import { Phone, MessageCircle, Calendar, Bell, FileText, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { CustomerInteraction } from '@/types'

const interactionIcons = {
  call: Phone,
  zalo: MessageCircle,
  visit: Calendar,
  follow_up: Bell,
  note: FileText,
}

const interactionLabels: Record<string, string> = {
  call: 'Cuoc goi',
  zalo: 'Zalo',
  visit: 'Khach den tiem',
  follow_up: 'Nhac nho',
  note: 'Ghi chu',
}

const interactionColors: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  call: 'default',
  zalo: 'secondary',
  visit: 'default',
  follow_up: 'outline',
  note: 'secondary',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

interface InteractionListProps {
  interactions: CustomerInteraction[]
  onAddInteraction?: () => void
}

export function InteractionList({ interactions, onAddInteraction }: InteractionListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Lich su tuong tac</CardTitle>
        {onAddInteraction && (
          <Button size="sm" onClick={onAddInteraction}>
            Them tuong tac
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {interactions.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">
            Chua co tuong tac nao
          </p>
        ) : (
          <div className="space-y-4">
            {interactions.map((interaction) => {
              const Icon = interactionIcons[interaction.type as keyof typeof interactionIcons] || FileText
              return (
                <div
                  key={interaction.id}
                  className="flex gap-3 rounded-lg border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={interactionColors[interaction.type] || 'secondary'}>
                        {interactionLabels[interaction.type] || interaction.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(interaction.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{interaction.content}</p>
                    {interaction.next_follow_up && (
                      <p className="mt-1 text-xs text-primary">
                        Nhac nho: {formatDateShort(interaction.next_follow_up)}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
