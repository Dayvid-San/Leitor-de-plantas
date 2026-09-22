export function DayvidLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="20" fill="currentColor" opacity="0.1" />
      <path d="M30 30 L30 70 L50 70 C60 70 70 60 70 50 C70 40 60 30 50 30 Z" fill="currentColor" />
      <circle cx="55" cy="50" r="8" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
