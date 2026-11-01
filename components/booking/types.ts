import { barbers, booking, services } from "@/content";

export type Details = { name: string; phone: string; email: string; notes: string };

export type BookingState = {
  step: number; // 0–4 = wizard steps, 5 = review, 6 = done
  dir: 1 | -1;
  serviceId: string | null;
  barberId: string | null; // barber id or booking.anyBarber.id
  date: string | null;
  time: string | null;
  assignedBarberId: string | null; // who actually takes the slot (matters for "any")
  details: Details;
  confirmation: string | null;
};

export const REVIEW = 5;
export const DONE = 6;

export const emptyDetails: Details = { name: "", phone: "", email: "", notes: "" };

export const initialState: BookingState = {
  step: 0,
  dir: 1,
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
  assignedBarberId: null,
  details: emptyDetails,
  confirmation: null,
};

export const getService = (id: string | null) => services.find((s) => s.id === id) ?? null;
export const getBarber = (id: string | null) => barbers.find((b) => b.id === id) ?? null;
export const barberLabel = (id: string | null) =>
  id === booking.anyBarber.id ? booking.anyBarber.name : (getBarber(id)?.name ?? "");

/** US phone mask: (813) 555-0142. */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function validate(d: Details) {
  const errors: Partial<Record<keyof Details, string>> = {};
  if (d.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = d.phone.replace(/\D/g, "");
  if (digits.length !== 10) errors.phone = "Enter a 10-digit US phone number.";
  else if (/^[01]/.test(digits)) errors.phone = "That area code doesn't look right.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) errors.email = "Enter a valid email, like name@example.com.";
  return errors;
}
