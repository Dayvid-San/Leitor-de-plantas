"use client"

import { useRouter } from "next/navigation"
import { useState, useRef } from "react"

export function Footer() {
  const router = useRouter()
  const [clickCount, setClickCount] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSecretClick = () => {
    // Limpa o timeout anterior para garantir que os cliques sejam rápidos
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setClickCount((prevCount) => {
      const nextCount = prevCount + 1

      if (nextCount >= 2) {
        router.push("/admin/dashboard") // Altere para a sua rota de admin real
        return 0
      }

      // Reseta o contador se você demorar mais de 1.5 segundos entre os cliques
      timeoutRef.current = setTimeout(() => {
        setClickCount(0)
      }, 1500)

      return nextCount
    })
  }

  return (
    <footer
      data-door-footer
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background min-h-screen"
      style={{ transform: "translateY(calc(100vh - 4rem))" }}
    >
      <div className="absolute top-0 left-0 right-0 container flex h-16 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground select-none">
          © {new Date().getFullYear()} 
          <span
            onClick={handleSecretClick}
            className="cursor-default select-none"
            title="" // Evita tooltips automáticos de navegadores
          >
            {" "}Dayvid.
          </span>{" "}
          All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground select-none">Built with Blood, Code and AI</p>
      </div>
    </footer>
  )
}