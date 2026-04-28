import { useState, useEffect, useRef } from "react"
import { ProjectModal, type ProjectDetails } from "./ProjectModal"

const projects = [
  {
    id: 1,
    title: "Квартира на Красном проспекте",
    category: "Жилой интерьер",
    location: "Новосибирск",
    year: "2024",
    image: "/images/hously-1.png",
    images: [
      "/images/hously-1.png",
      "/images/hously-1.png",
      "/images/hously-1.png",
      "/images/hously-1.png",
      "/images/hously-1.png",
    ],
    description:
      "Тёплый минимализм с акцентом на натуральные фактуры и мягкий свет. Мы сохранили ощущение простора и добавили продуманное хранение, чтобы интерьер оставался визуально лёгким.",
  },
  {
    id: 2,
    title: "Семейный дом в Академгородке",
    category: "Загородный дом",
    location: "Новосибирск",
    year: "2024",
    image: "/images/hously-2.png",
    images: [
      "/images/hously-2.png",
      "/images/hously-2.png",
      "/images/hously-2.png",
      "/images/hously-2.png",
      "/images/hously-2.png",
    ],
    description:
      "Интерьер для семьи — спокойный, тактильный и практичный. В основе — светлая палитра, дерево и лаконичные формы, чтобы дом был уютным каждый день.",
  },
  {
    id: 3,
    title: "Студия для молодой пары",
    category: "Малогабаритный интерьер",
    location: "Новосибирск",
    year: "2023",
    image: "/images/hously-3.png",
    images: [
      "/images/hously-3.png",
      "/images/hously-3.png",
      "/images/hously-3.png",
      "/images/hously-3.png",
      "/images/hously-3.png",
    ],
    description:
      "Компактная студия с чётким зонированием и скрытыми системами хранения. Визуально расширили пространство за счёт света, зеркал и единой отделки.",
  },
  {
    id: 4,
    title: "Кофейня «Утро»",
    category: "Коммерческий интерьер",
    location: "Новосибирск",
    year: "2023",
    image: "/images/hously-4.png",
    images: [
      "/images/hously-4.png",
      "/images/hously-4.png",
      "/images/hously-4.png",
      "/images/hously-4.png",
      "/images/hously-4.png",
    ],
    description:
      "Атмосфера спокойного утра: натуральные материалы, тёплые оттенки и мягкая подсветка. Пространство спроектировано так, чтобы гостям было комфортно и на быстрый кофе, и на долгую беседу.",
  },
  {
    id: 5,
    title: "Пентхаус на Речном вокзале",
    category: "Жилой интерьер",
    location: "Новосибирск",
    year: "2024",
    image: "/images/hously-1 (1).png",
    images: [
      "/images/hously-1 (1).png",
      "/images/hously-1 (1).png",
      "/images/hously-1 (1).png",
      "/images/hously-1 (1).png",
      "/images/hously-1 (1).png",
    ],
    description:
      "Проект с акцентом на панорамные виды и чистые линии. Контрастные детали и текстуры добавляют глубину, а сценарии освещения помогают менять настроение в течение дня.",
  },
  {
    id: 6,
    title: "Офис IT-компании",
    category: "Коммерческий интерьер",
    location: "Новосибирск",
    year: "2025",
    image: "/images/hously-2 (1).png",
    images: [
      "/images/hously-2 (1).png",
      "/images/hously-2 (1).png",
      "/images/hously-2 (1).png",
      "/images/hously-2 (1).png",
      "/images/hously-2 (1).png",
    ],
    description:
      "Функциональный офис с тихими зонами, переговорными и местами для быстрых встреч. Пространство гибкое и легко адаптируется под рост команды.",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Мои проекты</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
