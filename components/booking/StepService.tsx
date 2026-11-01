import { services } from "@/content";
import { Check } from "./Check";

export default function StepService({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {services.map((s) => {
        const on = s.id === selected;
        return (
          <li key={s.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(s.id)}
              className={`group relative flex h-full w-full flex-col rounded-2xl border p-4 text-left transition-all duration-200 ${
                on
                  ? "border-brass bg-brass/10 shadow-[0_0_0_1px_var(--color-brass)]"
                  : "border-line bg-ink/40 hover:border-brass/60 hover:bg-oak"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-serif text-xl leading-tight text-cream">{s.name}</span>
                <span className="font-serif text-xl text-brass">${s.price}</span>
              </span>
              <span className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</span>
              <span className="mt-3 flex items-center gap-3 text-xs text-cream/70">
                <span className="inline-flex items-center gap-1.5">
                  <Clock /> {s.duration} min
                </span>
                {s.badge && <span className="rounded-full bg-brass/15 px-2 py-0.5 font-medium text-brass-light">{s.badge}</span>}
              </span>
              {on && <Check className="absolute -right-2 -top-2" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Clock() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.8V8l2.2 1.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
