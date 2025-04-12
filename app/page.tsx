import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
