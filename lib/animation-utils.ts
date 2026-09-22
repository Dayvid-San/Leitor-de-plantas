/**
 * Animation utility for the theatrical door transition effect
 * Animates the footer element to create a "door closing/opening" effect
 */

export interface AnimateDoorOptions {
  direction: "close" | "open"
  duration?: number
}

export async function animateDoor({ direction, duration = 1000 }: AnimateDoorOptions): Promise<void> {
  return new Promise((resolve) => {
    const footer = document.querySelector("[data-door-footer]") as HTMLElement
    if (!footer) {
      resolve()
      return
    }

    const originalZIndex = footer.style.zIndex
    footer.style.zIndex = "9999"
    footer.style.willChange = "transform"

    const startTransform = direction === "close" ? "translateY(calc(100vh - 4rem))" : "translateY(0)"
    const endTransform = direction === "close" ? "translateY(0)" : "translateY(calc(100vh - 4rem))"
    const easing = direction === "close" ? "ease-in-out" : "ease-out"

    footer.style.transition = "none"
    footer.style.transform = startTransform

    // Force a reflow so the browser commits startTransform before the
    // transition is enabled — otherwise the two style writes can land in the
    // same frame and the transition gets skipped, making the door "jump".
    void footer.offsetHeight

    footer.style.transition = `transform ${duration}ms ${easing}`

    // Announce to screen readers
    const announcement = document.createElement("div")
    announcement.setAttribute("role", "status")
    announcement.setAttribute("aria-live", "polite")
    announcement.className = "sr-only"
    announcement.textContent = direction === "close" ? "Transitioning to new page" : "Page loaded"
    document.body.appendChild(announcement)

    requestAnimationFrame(() => {
      footer.style.transform = endTransform
    })

    setTimeout(() => {
      footer.style.zIndex = originalZIndex
      footer.style.willChange = ""
      document.body.removeChild(announcement)
      resolve()
    }, duration)
  })
}
