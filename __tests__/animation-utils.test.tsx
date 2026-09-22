/**
 * Unit tests for door animation utility
 * Tests the animateDoor function resolves correctly
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { animateDoor } from "@/lib/animation-utils"

// Mock DOM elements
beforeEach(() => {
  document.body.innerHTML = `
    <footer data-door-footer style="transform: translateY(0); transition: none;">
      Footer content
    </footer>
  `
  // Fake timers make requestAnimationFrame/setTimeout deterministic instead of
  // racing real wall-clock waits, and let each test fully drain animateDoor's
  // internal timers before the next test replaces document.body.
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  document.body.innerHTML = ""
})

describe("animateDoor", () => {
  it("should resolve only after the full duration elapses (close)", async () => {
    let resolved = false
    animateDoor({ direction: "close", duration: 100 }).then(() => {
      resolved = true
    })

    await vi.advanceTimersByTimeAsync(99)
    expect(resolved).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    expect(resolved).toBe(true)
  })

  it("should resolve only after the full duration elapses (open)", async () => {
    let resolved = false
    animateDoor({ direction: "open", duration: 100 }).then(() => {
      resolved = true
    })

    await vi.advanceTimersByTimeAsync(99)
    expect(resolved).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    expect(resolved).toBe(true)
  })

  it("should apply correct transform for close direction", async () => {
    const footer = document.querySelector("[data-door-footer]") as HTMLElement

    const promise = animateDoor({ direction: "close", duration: 50 })
    await vi.advanceTimersByTimeAsync(50)
    await promise

    expect(footer.style.transform).toBe("translateY(0)")
  })

  it("should apply correct transform for open direction", async () => {
    const footer = document.querySelector("[data-door-footer]") as HTMLElement

    const promise = animateDoor({ direction: "open", duration: 50 })
    await vi.advanceTimersByTimeAsync(50)
    await promise

    expect(footer.style.transform).toBe("translateY(calc(100vh - 4rem))")
  })

  it("should handle missing footer element gracefully", async () => {
    document.body.innerHTML = ""

    const promise = animateDoor({ direction: "close", duration: 50 })
    await vi.advanceTimersByTimeAsync(50)

    await expect(promise).resolves.toBeUndefined()
  })

  it("should create an animation for the footer element", async () => {
    const footer = document.querySelector("[data-door-footer]") as HTMLElement

    const promise = animateDoor({ direction: "close", duration: 50 })
    await vi.advanceTimersByTimeAsync(50)
    await promise

    expect(footer.style.transition).toBe("transform 50ms ease-in-out")
  })
})
