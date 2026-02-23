'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export interface BeforeAfterCardData {
  id: string
  title: string
  description?: string
  before_image_url?: string | null
  after_image_url?: string | null
  service_slug?: string
  service_name?: string
}

interface BeforeAfterCardProps {
  item: BeforeAfterCardData
  showSlider?: boolean
  className?: string
}

export function BeforeAfterCard({ item, showSlider = true, className }: BeforeAfterCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      updateSliderPosition(e.clientX)
    },
    [isDragging, updateSliderPosition]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return
      updateSliderPosition(e.touches[0].clientX)
    },
    [isDragging, updateSliderPosition]
  )

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('touchend', handleGlobalMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('touchend', handleGlobalMouseUp)
    }
  }, [])

  return (
    <div className={cn('group relative overflow-hidden rounded-xl', className)}>
      {/* Container */}
      <div
        ref={containerRef}
        className={cn(
          'relative aspect-square bg-muted',
          showSlider && 'cursor-ew-resize select-none'
        )}
        onMouseMove={showSlider ? handleMouseMove : undefined}
        onMouseDown={showSlider ? handleMouseDown : undefined}
        onMouseUp={showSlider ? handleMouseUp : undefined}
        onTouchStart={showSlider ? handleMouseDown : undefined}
        onTouchMove={showSlider ? handleTouchMove : undefined}
        onTouchEnd={showSlider ? handleMouseUp : undefined}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          {item.after_image_url ? (
            <img
              src={item.after_image_url}
              alt="Sau"
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <PlaceholderImage label="Sau" />
          )}
        </div>

        {/* Before Image (Clipped) */}
        {showSlider && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {item.before_image_url ? (
              <img
                src={item.before_image_url}
                alt="Truoc"
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <PlaceholderImage label="Truoc" />
            )}
          </div>
        )}

        {/* Slider Line */}
        {showSlider && (
          <div
            className="absolute top-0 bottom-0 z-10 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Slider Handle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Labels */}
        <div className="absolute left-2 top-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
          Truoc
        </div>
        <div className="absolute right-2 top-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
          Sau
        </div>
      </div>

      {/* Hover Info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="font-semibold text-white">{item.title}</p>
        {item.description && <p className="text-sm text-white/80">{item.description}</p>}
        {item.service_slug && item.service_name && (
          <Link
            href={`/dich-vu/${item.service_slug}`}
            className="mt-2 inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            <Badge variant="secondary" className="text-xs">
              {item.service_name}
            </Badge>
          </Link>
        )}
      </div>
    </div>
  )
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-border">
      <div className="text-center text-muted-foreground">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="mt-1 text-xs">{label}</span>
      </div>
    </div>
  )
}
