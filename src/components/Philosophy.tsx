import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Пространство под вас, а не под тренды",
    description:
      "Каждый интерьер создаётся под конкретного человека. Я разбираюсь в вашем образе жизни, привычках и сценариях дня — чтобы пространство действительно подходило вам, а не выглядело просто красиво.",
  },
  {
    title: "Красиво — значит удобно",
    description:
      "Дизайн без удобства начинает быстро раздражать.Я проектирую интерьеры, где всё продумано: от хранения до логики передвижения. Чтобы вам было легко жить, а не подстраиваться под пространство.",
  },
  {
    title: "Свет, который меняет всё",
    description:
      "Свет — один из главных инструментов в интерьере.Я выстраиваю освещение так, чтобы пространство выглядело объёмно, уютно и “дорого” — в любое время суток.",
  },
  {
    title: "Детали решают всё",
    description: "Именно детали создают ощущение уровня.Стыки материалов, текстуры, пропорции — я довожу интерьер до состояния, где всё выглядит цельно и аккуратно. Без компромиссов.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Моя философия</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Дизайн с
              <br />
              <HighlightedText>душой</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/Kostina_designer/images/mixboard-image.png"
                alt="Интерьер в исполнении Maria Kostina"
                className="opacity-90 relative z-10 w-auto"
              />
              <img src="/Kostina_designer/images/logo_2.png" alt="Maria Kostina" width={120} height={32} className="w-auto h-32" />
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Интерьер — это не про красивую картинку. Это про ощущение дома, в который хочется возвращаться. Про пространство, где вам спокойно, удобно и по-настоящему комфортно. Я создаю именно такие пространства.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
