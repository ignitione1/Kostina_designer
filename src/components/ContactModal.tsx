import { useCallback, useEffect, useMemo, useState } from "react"

import { createPortal } from "react-dom"

import { X, Send } from "lucide-react"



type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}



type FormData = {
  name: string
  contact: string
  message: string
}

type FormErrors = {
  name?: string
  contact?: string
  message?: string
}



export function ContactModal({ isOpen, onClose }: ContactModalProps) {

  const [closing, setClosing] = useState(false)

  const [formData, setFormData] = useState<FormData>({ name: "", contact: "", message: "" })

  const [errors, setErrors] = useState<FormErrors>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)



  const requestClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    window.setTimeout(() => {
      onClose()
      setClosing(false)
      setFormData({ name: "", contact: "", message: "" })
      setErrors({})
      setIsSubmitted(false)
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}



    if (!formData.name.trim()) {

      newErrors.name = "Пожалуйста, представьтесь"

    }



    if (!formData.contact.trim()) {

      newErrors.contact = "Укажите email или телефон"

    } else {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/

      if (!emailRegex.test(formData.contact) && !phoneRegex.test(formData.contact)) {

        newErrors.contact = "Укажите корректный email или телефон"

      }

    }



    if (!formData.message.trim()) {

      newErrors.message = "Расскажите немного о вашем проекте"

    } else if (formData.message.trim().length < 10) {

      newErrors.message = "Сообщение должно содержать минимум 10 символов"

    }



    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()



    if (!validateForm()) return



    setIsSubmitting(true)



    // Имитация отправки формы

    await new Promise((resolve) => setTimeout(resolve, 1000))



    setIsSubmitting(false)

    setIsSubmitted(true)



    // Закрытие модалки после успешной отправки

    setTimeout(() => {

      requestClose()

    }, 2000)

  }



  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData((prev) => ({ ...prev, [field]: e.target.value }))

    if (errors[field]) {

      setErrors((prev) => ({ ...prev, [field]: undefined }))

    }

  }



  if (!isOpen || !portalTarget) return null



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

          className={`w-full max-w-lg border border-border bg-background shadow-2xl transition-all duration-200 ${

            closing ? "opacity-0 translate-y-3 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"

          }`}

        >

          <div className="p-6 md:p-8">

            <div className="flex items-center justify-between mb-8">

              <div>

                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2">Связаться</p>

                <h3 className="text-2xl md:text-3xl font-medium tracking-tight">Обсудить проект</h3>

              </div>

              <button

                type="button"

                aria-label="Закрыть"

                onClick={requestClose}

                className="w-10 h-10 rounded-full bg-primary/10 border border-border flex items-center justify-center hover:bg-primary/20 transition-colors"

              >

                <X className="w-5 h-5" />

              </button>

            </div>



            {isSubmitted ? (

              <div className="text-center py-8">

                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">

                  <Send className="w-8 h-8 text-primary" />

                </div>

                <h4 className="text-xl font-medium mb-2">Сообщение отправлено!</h4>

                <p className="text-muted-foreground">Я свяжусь с вами в ближайшее время</p>

              </div>

            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>

                  <label htmlFor="name" className="block text-sm font-medium mb-2">

                    Ваше имя

                  </label>

                  <input

                    type="text"

                    id="name"

                    value={formData.name}

                    onChange={handleChange("name")}

                    className={`w-full px-4 py-3 border bg-background transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 ${

                      errors.name ? "border-destructive" : "border-border hover:border-primary/30"

                    }`}

                    placeholder="Как к вам обращаться?"

                  />

                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}

                </div>



                <div>

                  <label htmlFor="contact" className="block text-sm font-medium mb-2">

                    Как с вами связаться

                  </label>

                  <input

                    type="text"

                    id="contact"

                    value={formData.contact}

                    onChange={handleChange("contact")}

                    className={`w-full px-4 py-3 border bg-background transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 ${

                      errors.contact ? "border-destructive" : "border-border hover:border-primary/30"

                    }`}

                    placeholder="Email или телефон"

                  />

                  {errors.contact && <p className="text-destructive text-sm mt-1">{errors.contact}</p>}

                </div>



                <div>

                  <label htmlFor="message" className="block text-sm font-medium mb-2">

                    Расскажите о вашем проекте

                  </label>

                  <textarea

                    id="message"

                    value={formData.message}

                    onChange={handleChange("message")}

                    rows={4}

                    className={`w-full px-4 py-3 border bg-background transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${

                      errors.message ? "border-destructive" : "border-border hover:border-primary/30"

                    }`}

                    placeholder="Опишите ваше пространство, задачи или идеи..."

                  />

                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}

                </div>



                <button

                  type="submit"

                  disabled={isSubmitting}

                  className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/90 transition-colors duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"

                >

                  {isSubmitting ? (

                    "Отправка..."

                  ) : (

                    <>

                      Обсудить проект

                      <Send className="w-4 h-4" />

                    </>

                  )}

                </button>

              </form>

            )}

          </div>

        </div>

      </div>

    </div>,

    portalTarget,

  )

}

