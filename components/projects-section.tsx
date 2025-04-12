"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for e-commerce businesses with real-time analytics, inventory management, and customer insights.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Health & Fitness App",
    description:
      "A mobile-first application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Firebase", "Redux", "UI/UX Design"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Smart Home Control System",
    description:
      "An IoT platform for controlling and automating home devices with an intuitive interface and powerful scheduling features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Express", "WebSockets", "MQTT"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Smart Home Control System",
    description:
      "An IoT platform for controlling and automating home devices with an intuitive interface and powerful scheduling features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Express", "WebSockets", "MQTT"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 5,
    title: "Groots Design Site",
    description:
      "A custom React site commisioned for GrootsDesign an Interior Design company, with a focus on showcasing their work and services.",
    image: "/grootsdesign.png?height=600&width=800",
    tags: ["React", "Next.js", "Typescript"],
    liveLink: "https://www.grootsdesign.com",
    githubLink: "#",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader title="My Projects" subtitle="Check out some of my recent work" />

        <div className="mt-16 space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} isEven={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-foreground/70">{subtitle}</p>
    </motion.div>
  )
}

function ProjectCard({
  project,
  isEven,
}: {
  project: (typeof projects)[0]
  isEven: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.7 }}
    >
      <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <motion.div
          className="relative overflow-hidden rounded-xl shadow-xl"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 w-full">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
        <p className="text-lg text-foreground/70 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View Code
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
