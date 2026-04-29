import { HighlightedText } from "../components/HighlightedText"

const packages = [
  {
    id: 1,
    name: "Концепция",
    price: "от 35 000 ₽",
    description: "Идеально для тех, кто хочет понять направление и получить чёткое видение будущего интерьера.",
    features: [
      "Замер помещения",
      "Планировочное решение (3 варианта)",
      "Концептуальный коллаж",
      "Цветовая палитра и материалы",
      "Подборка мебели и декора",
    ],
    highlight: false,
  },
  {
    id: 2,
    name: "Дизайн-проект",
    price: "от 90 000 ₽",
    description: "Полноценный дизайн-проект с детальными чертежами для строителей и отделочников.",
    features: [
      "Всё из пакета «Концепция»",
      "3D-визуализация всех помещений",
      "Рабочая документация для ремонта",
      "Спецификации материалов и мебели",
      "Сопровождение на этапе закупок",
      "2 корректировки проекта",
    ],
    highlight: true,
  },
  {
    id: 3,
    name: "Авторский надзор",
    price: "от 15 000 ₽/мес",
    description: "Контроль реализации проекта на строительной площадке — для тех, кто хочет результат точно по проекту.",
    features: [
      "Выезды на объект (2 раза в месяц)",
      "Контроль качества работ",
      "Согласование с подрядчиками",
      "Оперативные консультации",
      "Фотоотчёты с объекта",
    ],
    highlight: false,
  },
]

const additionalServices = [
  { name: "Консультация (1 час)", price: "3 000 ₽" },
  { name: "Перепланировка — согласование", price: "от 20 000 ₽" },
  { name: "Подбор подрядчиков", price: "от 10 000 ₽" },
  { name: "3D-визуализация одного помещения", price: "от 8 000 ₽" },
  { name: "Дизайн одного помещения (кухня, ванная)", price: "от 25 000 ₽" },
  { name: "Расстановка мебели (онлайн)", price: "5 000 ₽" },
]

type PricingSectionProps = {
  withTopPadding?: boolean
}

export function PricingSection({ withTopPadding = false }: PricingSectionProps) {
  const leftServices = additionalServices.filter((_, index) => index % 2 === 0)
  const rightServices = additionalServices.filter((_, index) => index % 2 === 1)

  return (
    <section id="pricing" className={withTopPadding ? "pt-40" : "pt-32"}>
      <div className="pt-24 pb-24 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Стоимость услуг</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-8">
            Прозрачные
            <br />
            <HighlightedText>цены</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Выберите подходящий формат работы. Стоимость зависит от площади и сложности объекта — финальная цена согласуется на консультации.
          </p>
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <ol className="max-w-5xl mx-auto space-y-10">
            {packages.map((pkg, index) => (
              <li key={pkg.id} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
                <div className="relative flex md:flex-col md:items-start items-center justify-between md:justify-start gap-4">
                  {index !== packages.length - 1 && (
                    <span className="absolute left-5 top-12 hidden md:block h-[calc(100%+40px)] w-px bg-border/60" />
                  )}

                  <div className="flex items-center gap-4">
                    <span
                      className={
                        "relative inline-flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium bg-background/70 backdrop-blur-sm " +
                        (pkg.highlight
                          ? "border-orange-300/50 text-orange-200 shadow-[0_0_0_6px_rgba(251,146,60,0.08)]"
                          : "border-border text-muted-foreground shadow-[0_0_0_6px_rgba(255,255,255,0.03)]")
                      }
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Этап</p>
                      <h3 className="text-lg font-medium tracking-tight">{pkg.name}</h3>
                    </div>
                  </div>

                  <p className="text-base md:text-lg font-medium text-foreground whitespace-nowrap">{pkg.price}</p>
                </div>

                <div
                  className={
                    "relative border rounded-2xl p-7 md:p-8 bg-background/70 backdrop-blur-sm overflow-hidden " +
                    (pkg.highlight
                      ? "border-foreground/15 ring-1 ring-orange-300/20"
                      : "border-border ring-1 ring-white/5")
                  }
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/40 via-transparent to-transparent" />
                  <div className="relative">
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{pkg.description}</p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-3">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="py-24 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Дополнительно</p>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Отдельные услуги</h3>
          </div>

          <div className="relative border rounded-2xl bg-background/70 backdrop-blur-sm overflow-hidden ring-1 ring-white/5">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/40 via-transparent to-transparent" />
            <div className="relative grid md:grid-cols-2">
              <div className="flex flex-col divide-y divide-border/60">
                {leftServices.map((service) => (
                  <div key={service.name} className="flex items-center justify-between gap-6 px-6 md:px-8 py-5">
                    <span className="text-sm text-foreground/90">{service.name}</span>
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{service.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col divide-y divide-border/60 md:border-l md:border-border/60">
                {rightServices.map((service) => (
                  <div key={service.name} className="flex items-center justify-between gap-6 px-6 md:px-8 py-5">
                    <span className="text-sm text-foreground/90">{service.name}</span>
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
