"use client";

import { useState } from "react";
import { booking } from "@/content";
import { formatDate, formatTime } from "@/lib/slots";
import { Arrow } from "@/components/ui/Arrow";
import { getBarber, getService, type BookingState } from "./types";

type Props = { state: BookingState; onEdit: (step: number) => void; onConfirm: () => void };

export default function Review({ state, onEdit, onConfirm }: Props) {
  const [busy, setBusy] = useState(false);
  const service = getService(state.serviceId)!;
  const assigned = getBarber(state.assignedBarberId);
  const isAny = state.barberId === booking.anyBarber.id;

  const rows = [
    { step: 0, label: "Service", value: `${service.name}`, extra: `${service.duration} min` },
    { step: 1, label: "Barber", value: assigned?.name ?? "", extra: isAny ? "First available" : assigned?.role },
    { step: 2, label: "Date", value: formatDate(state.date!) },
    { step: 3, label: "Time", value: formatTime(state.time!) },
    { step: 4, label: "Contact", value: state.details.name, extra: `${state.details.phone} · ${state.details.email}` },
  ];

  const confirm = () => {
    setBusy(true);
    // Simulated network round-trip: this demo never sends anything.
    setTimeout(onConfirm, 900);
  };

  return (
    <div>
      <dl className="divide-y divide-line/70 rounded-2xl border border-line bg-ink/40">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3 px-4 py-3.5">
            <dt className="w-20 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{r.label}</dt>
            <dd className="min-w-0 flex-1">
              <span className="block text-cream">{r.value}</span>
              {r.extra && <span className="block break-words text-sm text-muted">{r.extra}</span>}
            </dd>
            <button
              type="button"
              onClick={() => onEdit(r.step)}
              className="shrink-0 rounded-full px-2 py-1 text-sm text-brass-light underline-offset-4 hover:underline"
              aria-label={`Edit ${r.label.toLowerCase()}`}
            >
              Edit
            </button>
          </div>
        ))}
        {state.details.notes && (
          <div className="flex items-start gap-3 px-4 py-3.5">
            <dt className="w-20 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Notes</dt>
            <dd className="min-w-0 flex-1 break-words text-sm text-cream/90">{state.details.notes}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex items-baseline justify-between px-1">
        <span className="text-muted">Total, pay at the shop</span>
        <span className="font-serif text-3xl text-brass">${service.price}</span>
      </div>
      <p className="mt-2 px-1 text-sm text-muted">{booking.policy}</p>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/70 pt-5">
        <button type="button" className="btn btn-ghost px-5" onClick={() => onEdit(4)} disabled={busy}>
          <Arrow dir="left" /> Back
        </button>
        <button type="button" className="btn btn-brass min-w-[11rem]" onClick={confirm} disabled={busy} aria-busy={busy}>
          {busy ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
              Booking…
            </>
          ) : (
            "Confirm booking"
          )}
        </button>
      </div>
    </div>
  );
}
