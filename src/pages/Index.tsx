import { useEffect } from "react"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { PricingSection } from "../components/PricingSection"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"

export default function Index() {
  console.log('Index component rendering')
  
  useEffect(() => {
    console.log('Index mounted')
    
    // Проверяем высоту секций
    const checkSections = () => {
      const sections = ['hero', 'about', 'projects', 'services', 'pricing', 'faq', 'contact']
      sections.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          console.log(`Section ${id}:`, {
            height: rect.height,
            top: rect.top,
            bottom: rect.bottom,
            visible: rect.top < window.innerHeight && rect.bottom > 0
          })
        } else {
          console.log(`Section ${id} NOT FOUND`)
        }
      })
    }
    
    // Проверяем сразу и через 2 секунды
    checkSections()
    setTimeout(checkSections, 2000)
    
    // Проверяем при скролле
    window.addEventListener('scroll', checkSections)
    
    return () => window.removeEventListener('scroll', checkSections)
  }, [])
  
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Philosophy />
      <Projects />
      <Expertise />
      <PricingSection />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}
