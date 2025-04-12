"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            Home
          </NavLink>
          <NavLink href="/about" active={pathname === "/about"}>
            About
          </NavLink>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </nav>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="/" active={pathname === "/"} onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" active={pathname === "/about"} onClick={() => setMobileMenuOpen(false)}>
              About
            </MobileNavLink>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href="#contact">Contact Me</a>
            </Button>
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
      className={`block py-2 text-lg font-medium ${active ? "text-foreground" : "text-foreground/60"}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
