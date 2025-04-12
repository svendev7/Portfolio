"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Internship Test Engineer",
    company: "Kadaster",
    location: "Apeldoorn, Netherlands",
    period: "2025, Feb - Present",
    description:
      "Researching implementation of automated tests within the KLIC-viewer of Kadaster",
    skills: ["Robot Framework", "SikuliX", "WinAppDriver", "AutoIt", "Github"],
  },
  {
    id: 2,
    title: "Bike Courier",
    company: "Just Eat Takeaway",
    location: "Utrecht, Netherlands",
    period: "2023, Okt - 2025, January",
    description:
      "Delivering food via Bike in my home City of utrecht, i loved this job as the alone time cycling allowed me to listen to podcasts and music, the weather wasn't always great, but i got paid for free exercise!",
    skills: [],
  },
  {
    id: 3,
    title: "Supermarket Truck Loader/Offloader",
    company: "Ahold Delhaize",
    location: "Utrecht, Netherlands",
    period: "2021, Juli - 2023, June",
    description:
      "Worked to offload and load trucks with groceries, worked to sort the carts per aisle, i was young and this was my first part-time job during middle & high -school",
    skills: [],
  },
]

export default function Experience() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.id} experience={experience} index={index} />
        ))}
      </div>
    </div>
  )
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-6 border-l-2 border-purple-500/30"
    >
      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-purple-500" />

      <div className="mb-2">
        <h3 className="text-xl font-semibold">{experience.title}</h3>
        <div className="flex items-center text-foreground/70 text-sm mt-1">
          <Briefcase className="w-4 h-4 mr-1" />
          <span>{experience.company}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <div className="flex items-center text-foreground/70 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{experience.period}</span>
        </div>
        <div className="flex items-center text-foreground/70 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{experience.location}</span>
        </div>
      </div>

      <p className="text-foreground/80 mb-3">{experience.description}</p>

      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill) => (
          <Badge key={skill} variant="outline" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}
