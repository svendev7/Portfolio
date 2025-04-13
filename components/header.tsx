"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/lib/contexts/LanguageContext"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <motion.div
            className="text-xl md:text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              svenwritescode
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/" active={pathname === "/"}>
            {t.nav.home}
          </NavLink>
          <NavLink href="/about" active={pathname === "/about"}>
            {t.nav.about}
          </NavLink>
          <LanguageSwitcher />
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <a href="#contact">{t.nav.contact}</a>
          </Button>
        </nav>

        <button 
          className="md:hidden p-2 hover:bg-background/50 rounded-lg transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-x-0 top-0 bg-background/95 backdrop-blur-md border-b border-border/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6">
              <Link href="/">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  svenwritescode
                </span>
              </Link>
              <button 
                className="p-2 hover:bg-background/50 rounded-lg transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="/" active={pathname === "/"} onClick={() => setMobileMenuOpen(false)}>
                {t.nav.home}
              </MobileNavLink>
              <MobileNavLink href="/about" active={pathname === "/about"} onClick={() => setMobileMenuOpen(false)}>
                {t.nav.about}
              </MobileNavLink>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#contact">{t.nav.contact}</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative text-base font-medium transition-colors hover:text-foreground/80 ${
        active ? "text-foreground" : "text-foreground/60"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
          layoutId="underline"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}

function MobileNavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`block py-2.5 px-4 text-lg font-medium rounded-lg transition-colors ${
        active 
          ? "bg-purple-500/10 text-purple-500" 
          : "text-foreground/60 hover:text-foreground hover:bg-background/50"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
