import clsx from "clsx"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ImageItem } from "../../../types/form-types"
import { useIsMobile } from "../../../hooks/use-mobile"
import styles from "./ImageGrid.module.css"

interface ImageGridProps {
    images: ImageItem[]
    onUpload?: (id: string, file: File) => void
}

export function ImageGrid({ images, onUpload }: ImageGridProps) {
    const isMobile = useIsMobile()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const handleClick = (id: string) => {
        if (onUpload) {
            setSelectedId(id)
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && selectedId && onUpload) {
            onUpload(selectedId, file)
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const [index, setIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const startX = useRef<number | null>(null)
    const deltaX = useRef(0)

    // Reset index when images change (e.g., tab switch)
    useEffect(() => {
        setIndex(0)
    }, [images])

    // Clamp index to valid range
    const safeIndex = Math.max(0, Math.min(index, images.length - 1))

    const goTo = useCallback((nextArg: number) => {
        const clamped = (nextArg + images.length) % images.length
        setIndex(clamped)
    }, [images.length])

    const next = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex])
    const prev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex])

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
            <>
                <div className={styles.grid3}>
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className={styles.card}
                            onClick={() => handleClick(image.id)}
                            style={{ cursor: onUpload ? 'pointer' : 'default' }}
                            role={onUpload ? "button" : undefined}
                            tabIndex={onUpload ? 0 : undefined}
                            aria-label={`Cambiar imagen ${image.label}`}
                        >
                            {image.src ? (
                                <img src={image.src || "/placeholder.svg"} alt={image.label} />
                            ) : (
                                <div className={styles.placeholder} aria-label="Sin imagen">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </div>
                            )}
                            <span className={styles.cardLabel}>{image.label}</span>
                        </div>
                    ))}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".webp"
                    onChange={handleFileChange}
                />
            </>
        )
    }

    return (
        <div
            ref={containerRef}
            className={styles.carousel}
            role="region"
            aria-label="Carrusel de imágenes"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className={styles.carouselViewport}>
                <div className={styles.carouselTrack} style={{ transform: `translateX(-${safeIndex * 100}%)` }}>
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className={styles.carouselSlide}
                            onClick={() => handleClick(image.id)}
                        >
                            {image.src ? (
                                <img src={image.src || "/placeholder.svg"} alt={image.label} />
                            ) : (
                                <div className={styles.placeholder} aria-label="Sin imagen">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </div>
                            )}
                            <div className={styles.labelOverlay}>{image.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.carouselControls}>
                <button className={styles.carouselBtn} aria-label="Imagen anterior" onClick={(e) => { e.stopPropagation(); prev(); }}>
                    <ChevronLeft size={18} />
                </button>
                <button className={styles.carouselBtn} aria-label="Imagen siguiente" onClick={(e) => { e.stopPropagation(); next(); }}>
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className={styles.carouselIndicators} role="tablist" aria-label="Paginación de carrusel">
                {images.map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === safeIndex}
                        className={clsx(styles.indicator, i === safeIndex && styles.active)}
                        onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    />
                ))}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".webp"
                onChange={handleFileChange}
            />
        </div>
    )
}
