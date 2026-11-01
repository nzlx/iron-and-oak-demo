export function Check({ className = "" }: { className?: string }) {
  return (
    <span className={`grid h-6 w-6 place-items-center rounded-full bg-brass text-ink shadow-lg ${className}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
        <path
          d="M3 8.5l3 3 7-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
