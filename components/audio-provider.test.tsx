import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, act, waitFor } from "@testing-library/react"
import type { ReactNode } from "react"
import { AudioProvider, useAudio } from "@/components/audio-provider"

function wrapper({ children }: { children: ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>
}

beforeEach(() => {
  localStorage.clear()
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
  HTMLMediaElement.prototype.pause = vi.fn()
})

describe("AudioProvider / useAudio", () => {
  it("throws when used outside AudioProvider", () => {
    expect(() => renderHook(() => useAudio())).toThrow(
      "useAudio must be used within AudioProvider"
    )
  })

  it("starts unmuted when localStorage has no stored preference", async () => {
    const { result } = renderHook(() => useAudio(), { wrapper })
    await waitFor(() => expect(result.current.isMuted).toBe(false))
  })

  it("restores the muted preference from localStorage", async () => {
    localStorage.setItem("audioMuted", "true")
    const { result } = renderHook(() => useAudio(), { wrapper })
    await waitFor(() => expect(result.current.isMuted).toBe(true))
  })

  it("toggleMute flips the state and persists it to localStorage", async () => {
    const { result } = renderHook(() => useAudio(), { wrapper })
    await waitFor(() => expect(result.current.isMuted).toBe(false))

    act(() => {
      result.current.toggleMute()
    })

    await waitFor(() => expect(localStorage.getItem("audioMuted")).toBe("true"))
    expect(result.current.isMuted).toBe(true)
  })

  it("does not play the door sound while muted", async () => {
    localStorage.setItem("audioMuted", "true")
    const { result } = renderHook(() => useAudio(), { wrapper })
    await waitFor(() => expect(result.current.isMuted).toBe(true))

    await act(async () => {
      await result.current.playDoorSound()
    })

    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
  })

  it("plays the door sound when unmuted", async () => {
    const { result } = renderHook(() => useAudio(), { wrapper })
    await waitFor(() => expect(result.current.isMuted).toBe(false))

    await act(async () => {
      await result.current.playDoorSound()
    })

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1)
  })
})
