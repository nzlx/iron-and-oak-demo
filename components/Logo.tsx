export function Monogram({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.2 1.6" />
      {/* Crossed razor and comb, reduced to two strokes */}
      <path d="M12.5 27.5l15-15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12.5 12.5l15 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="0.9 1.3" />
      <circle cx="20" cy="20" r="2.6" fill="currentColor" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-brass">
      <Monogram />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.35rem] text-cream">Iron &amp; Oak</span>{" "}
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-brass">Barber Co.</span>
      </span>
    </span>
  );
}
