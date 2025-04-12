"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                svenwritescode
              </span>
            </Link>
            <p className="mt-2 text-sm text-foreground/60 max-w-md">
              Full-stack developer and Web Designer creating beautiful, functional, and user-centered digital
              experiences.
            </p>
          </div>

          <div className="flex space-x-4">
            <SocialLink href="https://github.com/svenwritescode" icon={<Github size={20} />} />
            <SocialLink href="https://linkedin.com/in/svenwritescode" icon={<Linkedin size={20} />} />
            <SocialLink href="mailto:hello@svenwritescode.com" icon={<Mail size={20} />} />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Sven Groot. All rights reserved.</p>

          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="mt-6 md:mt-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 hover:bg-purple-500/20 transition-colors"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 hover:bg-purple-500/20 transition-colors"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.a>
  )
}
