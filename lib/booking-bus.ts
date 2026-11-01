import { scrollToTarget } from "@/lib/scroll";

export type BookingPreset = { serviceId?: string; barberId?: string };

export const BOOKING_EVENT = "iron-oak:book";

/** Opens the booking wizard with a service and/or barber already picked. */
export function openBooking(preset: BookingPreset = {}) {
  window.dispatchEvent(new CustomEvent<BookingPreset>(BOOKING_EVENT, { detail: preset }));
  scrollToTarget("#book");
}
