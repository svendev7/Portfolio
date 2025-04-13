"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import { toast } from "sonner"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1, 
    margin: "-10%" 
  })
  const { t } = useLanguage()

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
            {t.contact.description}
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
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t.contact.errors?.name || "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.contact.errors?.email || "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.errors?.invalidEmail || "Please enter a valid email"
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t.contact.errors?.subject || "Subject is required"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.contact.errors?.message || "Message is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error(t.contact.errors?.form || "Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://formspree.io/f/mkgjyvod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        toast.success(t.contact.success || "Message sent successfully!")
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast.error(t.contact.errors?.submit || "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <motion.div
      className="bg-card rounded-xl p-6 shadow-lg text-left"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-4">{t.contact.title}</h3>
      
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h4 className="text-xl font-medium mb-2">{t.contact.successTitle || "Message Sent!"}</h4>
          <p className="text-foreground/70 mb-4">{t.contact.successMessage || "Thank you for your message. I'll get back to you soon!"}</p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-2"
          >
            {t.contact.sendAnother || "Send Another Message"}
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contact.placeholder.name} 
              className={`bg-background ${errors.name ? 'border-red-500' : ''}`} 
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
          </div>
          <div>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contact.placeholder.email} 
              className={`bg-background ${errors.email ? 'border-red-500' : ''}`} 
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
          </div>
          <div>
            <Input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t.contact.placeholder.subject} 
              className={`bg-background ${errors.subject ? 'border-red-500' : ''}`} 
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</p>}
          </div>
          <div>
            <Textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contact.placeholder.message} 
              className={`bg-background min-h-[120px] ${errors.message ? 'border-red-500' : ''}`} 
            />
            {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.contact.sending || "Sending..." : t.contact.send}
          </Button>
        </form>
      )}
    </motion.div>
  )
}

function ContactInfo() {
  const { t } = useLanguage()
  
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
      <h3 className="text-xl font-semibold mb-6">{t.contact.connect}</h3>

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
        <h4 className="font-medium mb-2">{t.contact.available}</h4>
        <p className="text-sm text-foreground/70">
          {t.contact.availableDescription}
        </p>
      </div>
    </motion.div>
  )
}
