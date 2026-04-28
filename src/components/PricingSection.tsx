import { HighlightedText } from "../components/HighlightedText"
import { Check } from "lucide-react"

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
  return (
    <section id="pricing" className={withTopPadding ? "pt-40" : "pt-24"}>
      <div className="pb-24 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Стоимость услуг</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
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
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-8 border flex flex-col ${
                  pkg.highlight ? "bg-foreground text-primary-foreground border-foreground" : "border-border bg-background"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-orange-400 text-white text-xs tracking-widest uppercase px-3 py-1">
                    Популярный
                  </span>
                )}
                <div className="mb-8">
                  <h3
                    className={`text-xs tracking-[0.3em] uppercase mb-4 ${
                      pkg.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p className="text-3xl font-medium mb-4">{pkg.price}</p>
                  <p className={`text-sm leading-relaxed ${pkg.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.highlight ? "text-orange-300" : "text-foreground"}`}
                        strokeWidth={2}
                      />
                      <span className={pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide transition-colors duration-300 rounded-md ${
                    pkg.highlight
                      ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                      : "border border-foreground/20 hover:bg-foreground hover:text-primary-foreground"
                  }`}
                >
                  Обсудить проект
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Дополнительно</p>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Отдельные услуги</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {additionalServices.map((service, index) => (
              <div
                key={service.name}
                className={`flex items-center justify-between py-5 px-0 border-b border-border ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:border-l"
                }`}
              >
                <span className="text-sm">{service.name}</span>
                <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
