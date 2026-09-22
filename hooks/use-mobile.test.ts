import { describe, it, expect, vi, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useIsMobile } from "@/hooks/use-mobile"

function mockMatchMedia() {
  const listeners: Array<() => void> = []
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: (_event: string, cb: () => void) => listeners.push(cb),
    removeEventListener: (_event: string, cb: () => void) => {
      const index = listeners.indexOf(cb)
      if (index > -1) listeners.splice(index, 1)
    },
  })) as unknown as typeof window.matchMedia

  return { trigger: () => listeners.forEach((cb) => cb()) }
}

function setInnerWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width })
}

describe("useIsMobile", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("returns true when the viewport is under the mobile breakpoint (768px)", () => {
    setInnerWidth(500)
    mockMatchMedia()

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it("returns false when the viewport is at or above the breakpoint", () => {
    setInnerWidth(1024)
    mockMatchMedia()

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it("updates when the media query listener fires after a resize", () => {
    setInnerWidth(1024)
    const { trigger } = mockMatchMedia()

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    setInnerWidth(500)
    act(() => {
      trigger()
    })

    expect(result.current).toBe(true)
  })
})
