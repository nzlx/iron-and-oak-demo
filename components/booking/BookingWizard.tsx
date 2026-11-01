"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { booking } from "@/content";
import { BOOKING_EVENT, type BookingPreset } from "@/lib/booking-bus";
import { scrollToTarget } from "@/lib/scroll";
import { dayStatus, formatDate, formatTime, slotsFor } from "@/lib/slots";
import { DONE, REVIEW, barberLabel, getService, initialState, validate, type BookingState, type Details } from "./types";
import StepService from "./StepService";
import StepBarber from "./StepBarber";
import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";
import DetailsForm from "./DetailsForm";
import Review from "./Review";
import Success from "./Success";
import { Arrow } from "@/components/ui/Arrow";

type Action =
  | { type: "preset"; preset: BookingPreset }
  | { type: "service"; id: string }
  | { type: "barber"; id: string }
  | { type: "date"; key: string }
  | { type: "time"; time: string; assignedBarberId: string }
  | { type: "details"; details: Details }
  | { type: "goto"; step: number }
  | { type: "confirm"; code: string }
  | { type: "reset" };

/** First step that still needs an answer. */
function missingStep(s: BookingState) {
  if (!s.serviceId) return 0;
  if (!s.barberId) return 1;
  if (!s.date) return 2;
  if (!s.time) return 3;
  return Object.keys(validate(s.details)).length ? 4 : REVIEW;
}

/** After the service or barber changes, keep the date/time only if they still work. */
function revalidate(s: BookingState): BookingState {
  const service = getService(s.serviceId);
  if (!service || !s.barberId || !s.date) return s;
  const st = dayStatus(s.date, s.barberId, service.duration);
  if (st !== "open" && st !== "few") return { ...s, date: null, time: null, assignedBarberId: null };
  if (!s.time) return s;
  const slot = slotsFor(s.date, s.barberId, service.duration).find((x) => x.time === s.time);
  return slot?.available ? { ...s, assignedBarberId: slot.barberId ?? null } : { ...s, time: null, assignedBarberId: null };
}

function advance(prev: BookingState, next: BookingState): BookingState {
  const missing = Math.min(missingStep(next), 4);
  const step = missing > prev.step ? missing : prev.step + 1;
  return { ...next, step, dir: 1 };
}

function reducer(s: BookingState, a: Action): BookingState {
  switch (a.type) {
    case "preset": {
      const base = s.step === DONE ? initialState : s;
      const next = revalidate({
        ...base,
        serviceId: a.preset.serviceId ?? base.serviceId,
        barberId: a.preset.barberId ?? base.barberId,
      });
      return { ...next, step: Math.min(missingStep(next), 4), dir: 1 };
    }
    case "service":
      return advance(s, revalidate({ ...s, serviceId: a.id }));
    case "barber":
      return advance(s, revalidate({ ...s, barberId: a.id }));
    case "date":
      return advance(s, { ...s, date: a.key, time: s.date === a.key ? s.time : null });
    case "time":
      return advance(s, { ...s, time: a.time, assignedBarberId: a.assignedBarberId });
    case "details":
      return { ...s, details: a.details, step: REVIEW, dir: 1 };
    case "goto":
      return { ...s, step: a.step, dir: a.step < s.step ? -1 : 1 };
    case "confirm":
      return { ...s, confirmation: a.code, step: DONE, dir: 1 };
    case "reset":
      return { ...initialState, dir: -1 };
  }
}

const headings = ["Choose a service", "Choose your barber", "Pick a date", "Pick a time", "Your details", "Review & confirm"];

function confirmationCode() {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "";
  for (let i = 0; i < 6; i++) c += abc[Math.floor(Math.random() * abc.length)];
  return `IO-${c}`;
}

export default function BookingWizard() {
  const [s, dispatch] = useReducer(reducer, initialState);
  const cardRef = useRef<HTMLDivElement>(null);
  const userNav = useRef(false);
  const service = getService(s.serviceId);
  const reachable = missingStep(s);

  const act = useCallback((a: Action) => {
    userNav.current = true;
    dispatch(a);
  }, []);

  // Preset from "Book with Dre" / service cards elsewhere on the page.
  useEffect(() => {
    const onPreset = (e: Event) => act({ type: "preset", preset: (e as CustomEvent<BookingPreset>).detail ?? {} });
    window.addEventListener(BOOKING_EVENT, onPreset);
    return () => window.removeEventListener(BOOKING_EVENT, onPreset);
  }, [act]);

  // Keep the card in view when a step changes while scrolled down a long list.
  useEffect(() => {
    if (!userNav.current || !cardRef.current) return;
    if (cardRef.current.getBoundingClientRect().top < 72) scrollToTarget(cardRef.current, { offset: -84 });
  }, [s.step]);

  const focusHeading = () => {
    if (!userNav.current) return;
    cardRef.current?.querySelector<HTMLElement>("[data-step-heading]")?.focus({ preventScroll: true });
  };

  const goto = (step: number) => act({ type: "goto", step });

  const renderStep = () => {
    switch (s.step) {
      case 0:
        return <StepService selected={s.serviceId} onSelect={(id) => act({ type: "service", id })} />;
      case 1:
        return <StepBarber selected={s.barberId} onSelect={(id) => act({ type: "barber", id })} />;
      case 2:
        return (
          <Calendar
            selected={s.date}
            barberId={s.barberId!}
            duration={service!.duration}
            onSelect={(key) => act({ type: "date", key })}
          />
        );
      case 3:
        return (
          <TimeSlots
            date={s.date!}
            barberId={s.barberId!}
            duration={service!.duration}
            selected={s.time}
            onSelect={(time, assignedBarberId) => act({ type: "time", time, assignedBarberId })}
            onChangeDate={() => goto(2)}
          />
        );
      case 4:
        return <DetailsForm initial={s.details} onSubmit={(details) => act({ type: "details", details })} />;
      case REVIEW:
        return <Review state={s} onEdit={goto} onConfirm={() => act({ type: "confirm", code: confirmationCode() })} />;
      default:
        return <Success state={s} onReset={() => act({ type: "reset" })} />;
    }
  };

  const chips = [
    service && { step: 0, label: `${service.name} · $${service.price}` },
    s.barberId && { step: 1, label: barberLabel(s.barberId) },
    s.date && { step: 2, label: formatDate(s.date, { weekday: "short", month: "short", day: "numeric" }) },
    s.time && { step: 3, label: formatTime(s.time) },
  ].filter(Boolean) as { step: number; label: string }[];

  const inWizard = s.step < DONE;
  const canContinue = s.step < 4 && reachable > s.step;

  return (
    <div ref={cardRef} className="leather mx-auto max-w-3xl rounded-[28px] p-4 pb-6 sm:p-8">
      {inWizard && (
        <>
          <Progress step={s.step} reachable={reachable} onGo={goto} />
          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your selections">
              {chips.map((c) => (
                <li key={c.step}>
                  <button
                    type="button"
                    onClick={() => goto(c.step)}
                    className="rounded-full border border-line bg-ink/40 px-3 py-1.5 text-xs text-cream/90 transition-colors hover:border-brass hover:text-brass-light"
                    aria-label={`${c.label}. Change ${booking.steps[c.step].toLowerCase()}`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {!inWizard
          ? "Booking confirmed"
          : s.step === REVIEW
            ? headings[REVIEW]
            : `Step ${s.step + 1} of ${booking.steps.length}: ${headings[s.step]}`}
      </p>

      <div className={inWizard ? "relative mt-6 min-h-[320px]" : "relative"}>
        <AnimatePresence mode="wait" custom={s.dir} initial={false}>
          <m.div
            key={s.step}
            custom={s.dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 28 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -28 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={(def) => def === "center" && focusHeading()}
          >
            {inWizard && (
              <h3 data-step-heading tabIndex={-1} className="mb-5 font-serif text-2xl text-cream outline-none sm:text-3xl">
                {headings[s.step]}
              </h3>
            )}
            {renderStep()}
          </m.div>
        </AnimatePresence>
      </div>

      {inWizard && s.step > 0 && s.step !== REVIEW && (
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/70 pt-5">
          <button type="button" className="btn btn-ghost px-5" onClick={() => goto(s.step - 1)}>
            <Arrow dir="left" /> Back
          </button>
          {s.step === 4 ? (
            <button type="submit" form="booking-details" className="btn btn-brass">
              Review<span className="hidden sm:inline">&nbsp;booking</span> <Arrow dir="right" />
            </button>
          ) : (
            canContinue && (
              <button type="button" className="btn btn-brass" onClick={() => goto(s.step + 1)}>
                Continue <Arrow dir="right" />
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

function Progress({ step, reachable, onGo }: { step: number; reachable: number; onGo: (n: number) => void }) {
  const current = Math.min(step, 4);
  const pct = step >= REVIEW ? 100 : (step / booking.steps.length) * 100;
  return (
    <nav aria-label="Booking progress">
      {/* Phone: compact counter + bar */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted">{step >= REVIEW ? "Almost done" : `Step ${current + 1} of ${booking.steps.length}`}</span>
          <span className="font-medium text-brass">{step >= REVIEW ? "Review" : booking.steps[current]}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-line/60">
          <div
            className="h-full rounded-full bg-brass transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(pct, 6)}%` }}
          />
        </div>
      </div>

      {/* Tablet and up: labeled steps */}
      <ol className="hidden items-center gap-2 sm:flex">
        {booking.steps.map((label, i) => {
          const done = i < step;
          const active = i === step;
          const can = i <= reachable && !active;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <button
                type="button"
                disabled={!can}
                onClick={() => onGo(i)}
                aria-current={active ? "step" : undefined}
                className={`group flex items-center gap-2 rounded-full py-1 pr-2 text-sm transition-colors ${
                  active ? "text-cream" : done ? "text-brass-light hover:text-cream" : "text-muted"
                } disabled:cursor-default`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition-colors ${
                    active ? "border-brass bg-brass text-ink" : done ? "border-brass/70 text-brass" : "border-line text-muted"
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M3 8.5l3 3 7-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {label}
              </button>
              {i < booking.steps.length - 1 && (
                <span className={`h-px flex-1 ${i < step ? "bg-brass/60" : "bg-line"}`} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
