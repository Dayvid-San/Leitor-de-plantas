# Rule: Testing

- Test runner is Vitest (`vitest.config.mts`, jsdom, `globals: true`), plus `@testing-library/react` for hooks/context. No extra setup file is needed, its auto-cleanup already runs on the global `afterEach`.
- For anything touching `requestAnimationFrame` or `setTimeout` (the door-transition animation code, `lib/animation-utils.ts`), use `vi.useFakeTimers()` + `vi.advanceTimersByTimeAsync(...)`. Do not use real waits/sleeps in tests: jsdom's `requestAnimationFrame` polyfill can fire up to ~40ms late, and a dangling un-awaited animation whose timers fire after the test ends will throw against a `document.body` the next test's `beforeEach` already replaced.
- New tests live next to what they test (`*.test.ts(x)`) or under `__tests__/`, matching the existing pattern: `lib/utils.test.ts`, `hooks/use-toast.test.ts`, `hooks/use-mobile.test.ts`, `components/audio-provider.test.tsx`, `components/door-transition-provider.test.tsx`, `__tests__/animation-utils.test.tsx`.
- `components/door-transition-provider.test.tsx` mocks `next/navigation` and `@/components/audio-provider` via `vi.mock`, follow that pattern for any test that renders something inside the provider chain.
- Run `npm test` for a single pass, `npx vitest` for watch mode. Both are pre-approved in `.claude/settings.json`.
