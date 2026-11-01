"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { booking } from "@/content";
import { downloadIcs } from "@/lib/ics";
import { formatDate, formatTime, shopTimeToUtc } from "@/lib/slots";
import { getBarber, getService, type BookingState } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Success({ state, onReset }: { state: BookingState; onReset: () => void }) {
  const service = getService(state.serviceId)!;
  const barber = getBarber(state.assignedBarberId)!;
  const first = state.details.name.split(/\s+/)[0];
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    title.current?.focus({ preventScroll: true });
  }, []);

  const addToCalendar = () =>
    downloadIcs({
      start: shopTimeToUtc(state.date!, state.time!),
      minutes: service.duration,
      title: `${service.name} with ${barber.firstName} at Iron & Oak`,
      description: `Confirmation ${state.confirmation}. ${booking.policy}`,
    });

  return (
    <div className="py-4 text-center sm:py-8">
      <div className="relative mx-auto h-24 w-24">
        {[0, 1].map((i) => (
          <m.span
            key={i}
            className="absolute inset-0 rounded-full border border-brass/40"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 1.6, delay: 0.35 + i * 0.35, ease: "easeOut" }}
            aria-hidden="true"
          />
        ))}
        <m.div
          className="grid h-24 w-24 place-items-center rounded-full bg-brass text-ink shadow-[0_0_60px_-10px_var(--color-brass)]"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
            <m.path
              d="M12 25l8 8 16-17"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
            />
          </svg>
        </m.div>
      </div>

      <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }}>
        <h3 ref={title} tabIndex={-1} className="mt-8 font-serif text-4xl text-cream outline-none sm:text-5xl">
          {booking.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-lg text-cream/85">
          See you {formatDate(state.date!, { weekday: "long", month: "long", day: "numeric" })} at {formatTime(state.time!)},{" "}
          {first}.
        </p>

        <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-line bg-ink/50 p-5 text-left">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
            <span>Confirmation</span>
            <span className="font-mono text-sm tracking-wider text-brass-light">{state.confirmation}</span>
          </div>
          <div className="rule my-4" />
          <p className="font-serif text-xl text-cream">{service.name}</p>
          <p className="mt-1 text-sm text-muted">
            with {barber.name} · {service.duration} min · ${service.price}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" className="btn btn-brass w-full sm:w-auto" onClick={addToCalendar}>
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <rect x="3" y="4.5" width="14" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 8.5h14M7 2.8v3.4M13 2.8v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Add to calendar
          </button>
          <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={onReset}>
            Book another appointment
          </button>
        </div>
        <p className="mx-auto mt-6 max-w-sm text-sm text-muted">{booking.success.text}</p>
      </m.div>
    </div>
  );
}
