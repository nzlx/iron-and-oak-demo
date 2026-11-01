import Image from "next/image";
import { barbers, booking, hours } from "@/content";
import { Check } from "./Check";

const dayName = (d: number) => hours.find((h) => h.day === d)?.label ?? "";

export default function StepBarber({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const options = [
    {
      id: booking.anyBarber.id,
      name: booking.anyBarber.name,
      line: booking.anyBarber.note,
      meta: "Whoever is free at your time",
      photo: null as string | null,
    },
    ...barbers.map((b) => ({
      id: b.id,
      name: b.name,
      line: b.specialty,
      meta: `Off ${b.daysOff.map((d) => `${dayName(d)}s`).join(", ")}`,
      photo: b.photo,
    })),
  ];

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const on = o.id === selected;
        return (
          <li key={o.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(o.id)}
              className={`relative flex w-full items-center gap-4 rounded-2xl border p-3 pr-4 text-left transition-all duration-200 ${
                on
                  ? "border-brass bg-brass/10 shadow-[0_0_0_1px_var(--color-brass)]"
                  : "border-line bg-ink/40 hover:border-brass/60 hover:bg-oak"
              }`}
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-oak-2">
                {o.photo ? (
                  <Image src={o.photo} alt="" fill sizes="64px" className="object-cover object-top" />
                ) : (
                  <span className="grid h-full w-full place-items-center text-brass" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-7 w-7">
                      <path
                        d="M12 3l2.4 5.1 5.6.6-4.2 3.8 1.2 5.5L12 15.2 7 18l1.2-5.5L4 8.7l5.6-.6L12 3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-lg leading-tight text-cream">{o.name}</span>
                <span className="mt-0.5 block text-sm text-brass-light/90">{o.line}</span>
                <span className="mt-1 block text-xs text-muted">{o.meta}</span>
              </span>
              {on && <Check className="absolute -right-2 -top-2" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
