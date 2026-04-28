import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { ImageCarousel } from "./ImageCarousel"
import { FullscreenGallery } from "./FullscreenGallery"

export type ProjectDetails = {
  id: number
  title: string
  category: string
  location: string
  year: string
  images: string[]
  description: string
}

type ProjectModalProps = {
  project: ProjectDetails
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [closing, setClosing] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const requestClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    window.setTimeout(() => {
      onClose()
    }, 220)
  }, [closing, onClose])

  const portalTarget = useMemo(() => {
    if (typeof document === "undefined") return null
    return document.body
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        requestClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [requestClose])

  if (!portalTarget) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={requestClose}
        className={`absolute inset-0 bg-primary/80 backdrop-blur-sm transition-opacity duration-200 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div
          role="dialog"
          aria-modal="true"
          className={`w-full max-w-4xl h-[92vh] md:h-[94vh] overflow-hidden border border-border bg-background shadow-2xl transition-all duration-200 flex flex-col min-h-0 ${
            closing ? "opacity-0 translate-y-3 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="relative shrink-0">
            <button
              type="button"
              aria-label="Закрыть"
              onClick={requestClose}
              className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-primary/60 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-3 md:p-4">
              <div className="mx-auto w-full max-w-2xl">
                <ImageCarousel
                  images={project.images}
                  alt={project.title}
                  onImageClick={(i) => {
                    setGalleryIndex(i)
                    setGalleryOpen(true)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border p-6 md:p-8 overflow-auto mk-scrollbar flex-1 min-h-0">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
              <div>
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2">
                  {project.category} · {project.location}
                </p>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{project.title}</h3>
              </div>
              <span className="text-muted-foreground/70 text-sm">{project.year}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.description}</p>

            <div className="mt-6">
              <a
                href="#contact"
                onClick={requestClose}
                className="inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide transition-colors duration-300 border border-foreground/20 hover:bg-foreground hover:text-primary-foreground rounded-md"
              >
                Обсудить похожий проект
              </a>
            </div>
          </div>

          {galleryOpen && (
            <FullscreenGallery
              images={project.images}
              alt={project.title}
              initialIndex={galleryIndex}
              onClose={() => setGalleryOpen(false)}
            />
          )}
        </div>
      </div>
    </div>,
    portalTarget,
  )
}
