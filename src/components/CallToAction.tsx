import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

import { useTheme } from "../context/ThemeContext"
import { cn } from "../lib/utils"

export function CallToAction() {
  const { theme } = useTheme()

  return (
    <section id="contact" className={cn(
      "py-32 md:py-29",
      theme === 'dark'
        ? "bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100"
        : "bg-foreground text-primary-foreground"
    )}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className={cn(
            "text-sm tracking-[0.3em] uppercase mb-8",
            theme === 'dark' ? "text-slate-400" : "text-primary-foreground/60"
          )}>
            Начать проект
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Создадим ваш
            <br />
            идеальный <HighlightedText>интерьер</HighlightedText>?
          </h2>

          <p className={cn(
            "text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto",
            theme === 'dark' ? "text-slate-300" : "text-primary-foreground/70"
          )}>
            Расскажите мне о вашем пространстве — я помогу превратить его в место, где хочется жить. Каждый проект начинается с одного разговора.
          </p>

          <div className="flex justify-center">
            <a
              href="mailto:maria.kostina@mail.ru"
              className={cn(
                "inline-flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-wide transition-colors duration-300 group rounded-md font-medium",
                theme === 'dark'
                  ? "bg-yellow-400/90 text-gray-900 hover:bg-yellow-500"
                  : "bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
              )}
            >
              Написать Марии
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
