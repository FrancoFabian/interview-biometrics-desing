"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ImageItem } from "../../types/form-types"
import { useIsMobile } from "../../hooks/use-mobile"
import "../../styles/image-carousel.css"

interface ImageGridProps {
  images: ImageItem[]
}

export function ImageGrid({ images }: ImageGridProps) {
  const isMobile = useIsMobile()

  const [index, setIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const startX = useRef<number | null>(null)
  const deltaX = useRef(0)

  useEffect(() => {
    const clampedIndex = Math.min(index, Math.max(0, images.length - 1))
    if (clampedIndex !== index) {
      queueMicrotask(() => setIndex(clampedIndex))
    }
  }, [images.length, index])

  const goTo = useCallback((next: number) => {
    const clamped = (next + images.length) % images.length
    setIsLoaded(false)
    setTimeout(() => {
      setIndex(clamped)
      setIsLoaded(true)
    }, 100)
  }, [images.length])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") next()
    if (e.key === "ArrowLeft") prev()
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX
    deltaX.current = 0
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX.current == null) return
    deltaX.current = e.touches[0].clientX - startX.current
  }
  const onTouchEnd = () => {
    const threshold = 40
    if (deltaX.current > threshold) prev()
    else if (deltaX.current < -threshold) next()
    startX.current = null
    deltaX.current = 0
  }

  if (!isMobile) {
    return (
      <div className="image-grid-3">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            {image.src ? (
              <img src={image.src || "/placeholder.svg"} alt={image.label} />
            ) : (
              <div className="image-placeholder" aria-label="Sin imagen">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
            <span className="image-card-label">{image.label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="image-carousel"
      role="region"
      aria-label="Carrusel de imágenes"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((image) => (
            <div key={image.id} className={`carousel-slide ${isLoaded ? "loaded" : ""}`}>
              {image.src ? (
                <img src={image.src || "/placeholder.svg"} alt={image.label} />
              ) : (
                <div className="image-placeholder" aria-label="Sin imagen">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <div className="image-label-overlay">{image.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" aria-label="Imagen anterior" onClick={prev}>
          <ChevronLeft size={18} />
        </button>
        <button className="carousel-btn" aria-label="Imagen siguiente" onClick={next}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="carousel-indicators" role="tablist" aria-label="Paginación de carrusel">
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
