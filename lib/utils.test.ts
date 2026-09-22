import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges plain class name strings", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center")
  })

  it("ignores falsy values", () => {
    expect(cn("flex", false, undefined, null, "")).toBe("flex")
  })

  it("supports the conditional object syntax", () => {
    expect(cn({ flex: true, hidden: false })).toBe("flex")
  })

  it("lets the last conflicting Tailwind utility win instead of keeping both", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })

  it("keeps non-conflicting classes while resolving conflicting ones", () => {
    expect(cn("text-sm font-bold", "font-normal")).toBe("text-sm font-normal")
  })
})
