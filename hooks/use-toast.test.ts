import { describe, it, expect } from "vitest"
import { reducer } from "@/hooks/use-toast"

function makeToast(id: string, overrides: Record<string, unknown> = {}) {
  return { id, open: true, title: `toast ${id}`, ...overrides } as any
}

describe("use-toast reducer", () => {
  it("adds a toast to an empty state", () => {
    const state = reducer({ toasts: [] }, { type: "ADD_TOAST", toast: makeToast("1") })
    expect(state.toasts.map((t) => t.id)).toEqual(["1"])
  })

  it("caps the toast list at TOAST_LIMIT (1), keeping only the newest", () => {
    let state = reducer({ toasts: [] }, { type: "ADD_TOAST", toast: makeToast("1") })
    state = reducer(state, { type: "ADD_TOAST", toast: makeToast("2") })
    expect(state.toasts.map((t) => t.id)).toEqual(["2"])
  })

  it("updates only the toast matching the given id", () => {
    const state = { toasts: [makeToast("1", { title: "old" }), makeToast("2")] }
    const next = reducer(state, { type: "UPDATE_TOAST", toast: { id: "1", title: "new" } })
    expect(next.toasts.find((t) => t.id === "1")?.title).toBe("new")
    expect(next.toasts.find((t) => t.id === "2")?.title).toBe("toast 2")
  })

  it("dismisses a single toast by id without closing the others", () => {
    const state = { toasts: [makeToast("1"), makeToast("2")] }
    const next = reducer(state, { type: "DISMISS_TOAST", toastId: "1" })
    expect(next.toasts.find((t) => t.id === "1")?.open).toBe(false)
    expect(next.toasts.find((t) => t.id === "2")?.open).toBe(true)
  })

  it("dismisses every toast when no toastId is given", () => {
    const state = { toasts: [makeToast("1"), makeToast("2")] }
    const next = reducer(state, { type: "DISMISS_TOAST" })
    expect(next.toasts.every((t) => t.open === false)).toBe(true)
  })

  it("removes a single toast by id", () => {
    const state = { toasts: [makeToast("1"), makeToast("2")] }
    const next = reducer(state, { type: "REMOVE_TOAST", toastId: "1" })
    expect(next.toasts.map((t) => t.id)).toEqual(["2"])
  })

  it("clears every toast when REMOVE_TOAST has no toastId", () => {
    const state = { toasts: [makeToast("1"), makeToast("2")] }
    const next = reducer(state, { type: "REMOVE_TOAST" })
    expect(next.toasts).toEqual([])
  })
})
