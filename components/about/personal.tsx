"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useLanguage } from "@/lib/contexts/LanguageContext"

const skills = [
  "JavaScript",
  "TypeScript",
  "Java",
  "C#",
  "Vue.js",
  "React",
  "Next.js",
  "Node.js",
  "HTML",
  "CSS",
  "Docker",
  "Firebase",
  "Supabase",
  "Github",
  "Figma",
  "Postman",
  "English",
  "Dutch",
  "Scrum",
]

export default function Personal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
        className="bg-card rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 flex-shrink-0">
            <Image src="/portrait.png?height=128&width=128" alt="Sven Groot" fill className="object-cover" />
          </div>

          <div>
            <p className="text-foreground/80 mb-4">
              {t.about.description1}
            </p>
            <p className="text-foreground/80 mb-4">
              {t.about.description2}
            </p>
            <p className="text-foreground/80 mb-4">
              {t.about.description3}
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Download className="w-4 h-4 mr-2" />
              {t.about.downloadCV}
            </Button>
          </div>
        </div>
      </motion.div>

      <SkillsSection />
      <EducationSection />
    </div>
  )
}

function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useLanguage()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="bg-card rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">{t.about.skills.title}</h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
          >
            <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 py-1.5">{skill}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1, 
    margin: "-5%" 
  })
  const { t } = useLanguage()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="bg-card rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">{t.about.education.title}</h2>

      <div className="space-y-6">
        {t.about.education.items.map((item, index) => (
          <div key={index} className="border-l-2 border-purple-500/30 pl-4">
            <h3 className="text-lg font-semibold">{item.degree}</h3>
            <p className="text-foreground/70">
              {item.institution} | {item.period}
            </p>
            <p className="text-foreground/80 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
