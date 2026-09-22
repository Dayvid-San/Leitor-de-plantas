"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"

type Theme = "dark"

interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light")
    root.classList.add("dark")
  }, [])

  return <ThemeContext.Provider value={{ theme: "dark" }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
