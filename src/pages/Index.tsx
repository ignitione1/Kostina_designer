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
