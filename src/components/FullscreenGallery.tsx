import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type FullscreenGalleryProps = {
  images: string[]
  alt: string
  initialIndex: number
  onClose: () => void
}

export function FullscreenGallery({ images, alt, initialIndex, onClose }: FullscreenGalleryProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(Math.max(0, Math.min(initialIndex, safeImages.length - 1)))

  useEffect(() => {
    setIndex(Math.max(0, Math.min(initialIndex, safeImages.length - 1)))
  }, [initialIndex, safeImages.length])

  const portalTarget = useMemo(() => {
    if (typeof document === "undefined") return null
    return document.body
  }, [])

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length)
  }, [safeImages.length])

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % safeImages.length)
  }, [safeImages.length])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrev()
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        goNext()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goNext, goPrev, onClose])

  if (!portalTarget) return null
  if (safeImages.length === 0) return null

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Закрыть просмотр"
        onClick={onClose}
        className="absolute inset-0 bg-primary/95 backdrop-blur-md"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full max-w-6xl max-h-[92vh]">
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-primary/60 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Предыдущее фото"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary/60 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Следующее фото"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary/60 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={safeImages[index]}
              alt={alt}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
          </div>

          {safeImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Перейти к фото ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white/70"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    portalTarget,
  )
}
