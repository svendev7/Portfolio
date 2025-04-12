"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1, 
    margin: "-10%" 
  })

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-background to-purple-950/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Like What You See?</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactForm() {
  return (
    <motion.div
      className="bg-card rounded-xl p-6 shadow-lg text-left"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-4">Send Me a Message</h3>
      <form className="space-y-4">
        <div>
          <Input type="text" placeholder="Your Name" className="bg-background" />
        </div>
        <div>
          <Input type="email" placeholder="Your Email" className="bg-background" />
        </div>
        <div>
          <Input type="text" placeholder="Subject" className="bg-background" />
        </div>
        <div>
          <Textarea placeholder="Your Message" className="bg-background min-h-[120px]" />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Send Message
        </Button>
      </form>
    </motion.div>
  )
}

function ContactInfo() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/svendev7",
      username: "@svenwritescode",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/sven-groot-85b7582bb/",
      username: "Sven Groot",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:svengroot88@gmail.com",
      username: "svengroot88@gmail.com",
    },
  ]

  return (
    <motion.div
      className="text-left"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>

      <div className="space-y-6">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-card/80 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              {link.icon}
            </div>
            <div>
              <h4 className="font-medium">{link.name}</h4>
              <p className="text-sm text-foreground/70">{link.username}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <h4 className="font-medium mb-2">Available for Hire</h4>
        <p className="text-sm text-foreground/70">
          I'm currently available for work. If you have a job or project in mind or just want to chat, feel free to reach out!
        </p>
      </div>
    </motion.div>
  )
}
