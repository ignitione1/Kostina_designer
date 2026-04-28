import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ImageCarouselProps = {
  images: string[]
  alt: string
  onImageClick?: (index: number) => void
  autoplayMs?: number
}

export function ImageCarousel({ images, alt, onImageClick, autoplayMs = 3200 }: ImageCarouselProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const slidesPerView = 3
  const loopedImages = useMemo(() => {
    if (safeImages.length === 0) return []
    const tail = safeImages.slice(0, Math.min(slidesPerView, safeImages.length))
    return [...safeImages, ...tail]
  }, [safeImages, slidesPerView])

  useEffect(() => {
    setIndex(0)
    setAnimating(false)
  }, [safeImages.join("|")])

  const goPrev = useCallback(() => {
    if (safeImages.length <= 1) return
    setAnimating(true)
    setIndex((prev) => {
      const next = prev - 1
      return next < 0 ? safeImages.length - 1 : next
    })
  }, [safeImages.length])

  const goNext = useCallback(() => {
    if (safeImages.length <= 1) return
    setAnimating(true)
    setIndex((prev) => prev + 1)
  }, [safeImages.length])

  useEffect(() => {
    if (safeImages.length <= 1) return
    if (paused) return
    if (autoplayMs <= 0) return

    intervalRef.current = window.setInterval(() => {
      goNext()
    }, autoplayMs)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [autoplayMs, goNext, paused, safeImages.length])

  useEffect(() => {
    if (!animating) return
    if (safeImages.length <= slidesPerView) return

    const handle = window.setTimeout(() => {
      if (index >= safeImages.length) {
        setAnimating(false)
        setIndex(0)
      }
    }, 950)

    return () => window.clearTimeout(handle)
  }, [animating, index, safeImages.length, slidesPerView])

  if (safeImages.length === 0) return null

  const currentTranslate = `translateX(-${(index * 100) / slidesPerView}%)`
  const realIndex = (i: number) => {
    if (safeImages.length === 0) return 0
    return i % safeImages.length
  }

  return (
    <div
      className="relative overflow-hidden bg-transparent"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={`flex w-full ${animating ? "transition-transform duration-2000 ease-in-out" : "transition-none"}`}
            style={{ transform: currentTranslate }}
          >
            {loopedImages.map((src, i) => (
              <div key={`${src}-${i}`} className="w-1/3 shrink-0 p-2">
                <button
                  type="button"
                  onClick={() => onImageClick?.(realIndex(i))}
                  aria-label="Открыть фото на весь экран"
                  className="w-full"
                >
                  <div className="relative w-full h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden bg-transparent border border-border">
                    <img
                      src={src}
                      alt={alt}
                      className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
                      draggable={false}
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Предыдущее фото"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/70 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-primary/85 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Следующее фото"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/70 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-primary/85 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}
