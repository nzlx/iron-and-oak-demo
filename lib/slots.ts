import { barbers, booking, contacts, hours, type Barber } from "@/content";

/**
 * Demo availability engine. Everything is computed in the browser: each barber's
 * schedule is filled with pseudo-random "taken" half-hour cells, seeded by date + barber,
 * so the same day always shows the same openings.
 */

export type DateKey = string; // "YYYY-MM-DD", shop-local
export type Slot = { time: string; available: boolean; barberId?: string };

const CELL = 30;

const pad = (n: number) => String(n).padStart(2, "0");

export function toKey(y: number, m: number, d: number): DateKey {
  return `${y}-${pad(m)}-${pad(d)}`;
}

export function parseKey(key: DateKey) {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d };
}

/** Weekday (0 = Sunday) of a shop-local date. */
export function weekdayOf(key: DateKey) {
  const { y, m, d } = parseKey(key);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function addDays(key: DateKey, days: number): DateKey {
  const { y, m, d } = parseKey(key);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return toKey(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/** Current date and minutes-since-midnight in Tampa, whatever the visitor's own time zone. */
export function shopNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: contacts.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { key: toKey(get("year"), get("month"), get("day")), minutes: get("hour") * 60 + get("minute") };
}

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
export const fromMinutes = (n: number) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;

export function hoursOn(key: DateKey) {
  const h = hours.find((x) => x.day === weekdayOf(key));
  return h?.open && h.close ? { open: toMinutes(h.open), close: toMinutes(h.close) } : null;
}

export function worksOn(barber: Barber, key: DateKey) {
  return !!hoursOn(key) && !barber.daysOff.includes(weekdayOf(key));
}

/** Small deterministic hash → [0, 1). */
function rand(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/** How full a day is: Saturdays and Fridays book up faster. */
function density(key: DateKey) {
  const wd = weekdayOf(key);
  return wd === 6 ? 0.55 : wd === 5 ? 0.45 : 0.32;
}

function cellTaken(barberId: string, key: DateKey, minute: number) {
  return rand(`${key}|${barberId}|${minute}`) < density(key);
}

function barberSlots(barber: Barber, key: DateKey, duration: number, earliest: number): Slot[] {
  const h = hoursOn(key);
  if (!h || !worksOn(barber, key)) return [];
  const out: Slot[] = [];
  for (let t = h.open; t + duration <= h.close; t += booking.slotStep) {
    let free = t >= earliest;
    for (let c = t; free && c < t + duration; c += CELL) {
      if (cellTaken(barber.id, key, c - (c % CELL))) free = false;
    }
    out.push({ time: fromMinutes(t), available: free, barberId: free ? barber.id : undefined });
  }
  return out;
}

/** Earliest bookable minute on a given day (respects the lead time for "today"). */
function earliestOn(key: DateKey, now = shopNow()) {
  if (key < now.key) return Infinity;
  if (key > now.key) return 0;
  const m = now.minutes + booking.minLeadMinutes;
  return Math.ceil(m / booking.slotStep) * booking.slotStep;
}

export function slotsFor(key: DateKey, barberId: string, duration: number, now = shopNow()): Slot[] {
  const earliest = earliestOn(key, now);
  if (barberId !== booking.anyBarber.id) {
    const b = barbers.find((x) => x.id === barberId);
    return b ? barberSlots(b, key, duration, earliest) : [];
  }
  // "Any available": merge every working barber, picking whoever is free (order varies per slot).
  const per = barbers.map((b) => ({ id: b.id, slots: barberSlots(b, key, duration, earliest) })).filter((x) => x.slots.length);
  if (!per.length) return [];
  const times = per.reduce((acc, p) => (p.slots.length > acc.length ? p.slots : acc), per[0].slots).map((s) => s.time);
  return times.map((time) => {
    const free = per.map((p) => p.slots.find((s) => s.time === time && s.available)).filter((s): s is Slot => !!s);
    if (!free.length) return { time, available: false };
    const pick = free[Math.floor(rand(`${key}|any|${time}`) * free.length)];
    return { time, available: true, barberId: pick.barberId };
  });
}

export type DayStatus = "closed" | "off" | "past" | "full" | "few" | "open";

export function dayStatus(key: DateKey, barberId: string, duration: number, now = shopNow()): DayStatus {
  if (key < now.key) return "past";
  if (!hoursOn(key)) return "closed";
  if (barberId !== booking.anyBarber.id) {
    const b = barbers.find((x) => x.id === barberId);
    if (b && !worksOn(b, key)) return "off";
  }
  const free = slotsFor(key, barberId, duration, now).filter((s) => s.available).length;
  return free === 0 ? "full" : free <= 3 ? "few" : "open";
}

/* ----- formatting ----- */

export function formatTime(t: string) {
  const m = toMinutes(t);
  const h = Math.floor(m / 60);
  return `${((h + 11) % 12) + 1}:${pad(m % 60)} ${h < 12 ? "AM" : "PM"}`;
}

export function formatDate(key: DateKey, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) {
  const { y, m, d } = parseKey(key);
  return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Converts a shop-local wall time to a UTC Date (handles DST). */
export function shopTimeToUtc(key: DateKey, time: string) {
  const { y, m, d } = parseKey(key);
  const mins = toMinutes(time);
  const guess = Date.UTC(y, m - 1, d, Math.floor(mins / 60), mins % 60);
  let utc = guess;
  for (let i = 0; i < 2; i++) {
    const local = shopNow(new Date(utc));
    const { y: ly, m: lm, d: ld } = parseKey(local.key);
    const asUtc = Date.UTC(ly, lm - 1, ld, Math.floor(local.minutes / 60), local.minutes % 60);
    utc += guess - asUtc;
  }
  return new Date(utc);
}
