import Experience from "@/components/about/experience"
import Personal from "@/components/about/personal"
import Footer from "@/components/footer"
import ContactSection from "@/components/contact-section"
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Personal />
          <Experience />
        </div>
      </div>
      <ContactSection />
      <Footer />
    </main>
  )
}
