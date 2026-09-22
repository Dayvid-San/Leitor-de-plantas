"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Instagram, Mail, Volume2, VolumeX, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"
import { useDoorTransition } from "@/components/door-transition-provider"
import { DayvidLogo } from "@/components/dayvid-logo"
import { useContent } from "@/components/content-provider"

const navLinks = [
  { href: "/", key: "header.nav.home" },
  { href: "/programador", key: "header.nav.programador" },
  { href: "/empreendedor", key: "header.nav.empreendedor" },
  { href: "/universitario", key: "header.nav.universitario" },
  { href: "/portfolio", key: "header.nav.portfolio" },
  { href: "/contato", key: "header.nav.contato" },
]

const socialLinks = [
  { href: "https://github.com/Dayvid-San", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/dayvid-santana-jr/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com/dayvid_jr_", icon: Instagram, label: "Instagram" },
  { href: "mailto:santana.dayvid@outlook.com", icon: Mail, label: "Email" },
]

export function Header() {
  const pathname = usePathname()
  const { isMuted, toggleMute } = useAudio()
  const { navigateWithDoor, isTransitioning } = useDoorTransition()
  const { locale, setLocale, t } = useContent()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (pathname !== href) {
      navigateWithDoor(href)
    }
    setIsMenuOpen(false)
  }

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    navigateWithDoor(href, true)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          aria-label="Dayvid Home"
        >
          <DayvidLogo className="h-8 w-8" />
          <span className="text-lg font-bold">Dayvid</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <div className="flex items-center rounded-md border border-border/40 p-0.5 mr-1">
            <Button
              variant={locale === "pt" ? "secondary" : "ghost"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setLocale("pt")}
              aria-pressed={locale === "pt"}
            >
              PT
            </Button>
            <Button
              variant={locale === "en" ? "secondary" : "ghost"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </Button>
          </div>
          {socialLinks.map((social) => (
            <Button
              key={social.href}
              variant="ghost"
              size="icon"
              asChild
              disabled={isTransitioning}
              aria-label={social.label}
            >
              <a href={social.href} onClick={(e) => handleSocialClick(e, social.href)}>
                <social.icon className="h-4 w-4" />
              </a>
            </Button>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        {/* Hamburger Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Hamburger Menu */}
      {isMenuOpen && (
        <nav
          className="md:hidden border-t border-border/40 bg-background"
          aria-label="Mobile navigation"
        >
          <div className="container flex flex-col items-start space-y-4 px-4 py-4">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary w-full py-2 ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {t(link.key)}
              </Link>
            ))}
            <hr className="w-full border-t border-border/40" />
            <div className="flex items-center rounded-md border border-border/40 p-0.5 w-fit">
              <Button
                variant={locale === "pt" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setLocale("pt")}
                aria-pressed={locale === "pt"}
              >
                PT
              </Button>
              <Button
                variant={locale === "en" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setLocale("en")}
                aria-pressed={locale === "en"}
              >
                EN
              </Button>
            </div>
            <hr className="w-full border-t border-border/40" />
            {/* Social Links */}
            <div className="flex flex-col space-y-4 w-full">
              <span className="text-sm font-medium text-muted-foreground">{t("header.social.title")}</span>
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  onClick={(e) => handleSocialClick(e, social.href)}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
            <hr className="w-full border-t border-border/40" />
            {/* Audio Control Only */}
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="flex items-center space-x-2"
                aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isMuted ? t("header.audio.unmute") : t("header.audio.mute")}</span>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}