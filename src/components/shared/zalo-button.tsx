'use client'

import { MessageCircle } from 'lucide-react'

interface ZaloButtonProps {
  phoneNumber?: string
  message?: string
}

export function ZaloButton({
  phoneNumber = '84901234567',
  message = 'Xin chao, toi muon tu van',
}: ZaloButtonProps) {
  const zaloUrl = `https://zalo.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Chat qua Zalo"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  )
}
