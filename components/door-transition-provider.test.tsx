import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import type { ReactNode } from "react"
import { DoorTransitionProvider, useDoorTransition } from "@/components/door-transition-provider"

const pushMock = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}))

const playDoorSoundMock = vi.fn().mockResolvedValue(undefined)
vi.mock("@/components/audio-provider", () => ({
  useAudio: () => ({ playDoorSound: playDoorSoundMock }),
}))

function wrapper({ children }: { children: ReactNode }) {
  return <DoorTransitionProvider>{children}</DoorTransitionProvider>
}

function mockPrefersReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  pushMock.mockClear()
  playDoorSoundMock.mockClear()
  document.body.innerHTML = `<footer data-door-footer style="transform: translateY(0);"></footer>`
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  document.body.innerHTML = ""
})

describe("useDoorTransition", () => {
  it("throws when used outside DoorTransitionProvider", () => {
    expect(() => renderHook(() => useDoorTransition())).toThrow(
      "useDoorTransition must be used within DoorTransitionProvider"
    )
  })

  it("skips the door animation and sound when prefers-reduced-motion is set", async () => {
    mockPrefersReducedMotion(true)
    const { result } = renderHook(() => useDoorTransition(), { wrapper })

    await act(async () => {
      const navigation = result.current.navigateWithDoor("/portfolio")
      await vi.advanceTimersByTimeAsync(200)
      await navigation
    })

    expect(pushMock).toHaveBeenCalledWith("/portfolio")
    expect(playDoorSoundMock).not.toHaveBeenCalled()
  })

  it("plays the door animation and sound before navigating when motion is allowed", async () => {
    mockPrefersReducedMotion(false)
    const { result } = renderHook(() => useDoorTransition(), { wrapper })

    await act(async () => {
      const navigation = result.current.navigateWithDoor("/portfolio")
      // close (700ms) + sound cue (420ms) + pause (120ms) + open (600ms), generously rounded up
      await vi.advanceTimersByTimeAsync(2000)
      await navigation
    })

    expect(pushMock).toHaveBeenCalledWith("/portfolio")
    expect(playDoorSoundMock).toHaveBeenCalledTimes(1)
  })

  it("opens external links in a new tab instead of pushing a route", async () => {
    mockPrefersReducedMotion(true)
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null)
    const { result } = renderHook(() => useDoorTransition(), { wrapper })

    await act(async () => {
      const navigation = result.current.navigateWithDoor("https://github.com/Dayvid-San", true)
      await vi.advanceTimersByTimeAsync(200)
      await navigation
    })

    expect(openSpy).toHaveBeenCalledWith("https://github.com/Dayvid-San", "_blank", "noopener,noreferrer")
    expect(pushMock).not.toHaveBeenCalled()
  })

  it("ignores a second call while a transition is already in flight", async () => {
    mockPrefersReducedMotion(true)
    const { result } = renderHook(() => useDoorTransition(), { wrapper })

    await act(async () => {
      const first = result.current.navigateWithDoor("/portfolio")
      const second = result.current.navigateWithDoor("/contato")
      await vi.advanceTimersByTimeAsync(200)
      await Promise.all([first, second])
    })

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith("/portfolio")
  })
})
