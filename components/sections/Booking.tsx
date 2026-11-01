import { booking } from "@/content";
import BookingWizard from "@/components/booking/BookingWizard";
import Reveal from "@/components/ui/Reveal";

export default function Booking() {
  return (
    <section id="book" aria-labelledby="book-title" className="wood relative px-4 py-20 sm:px-6 md:py-28">
      <div className="rule absolute inset-x-0 top-0" aria-hidden="true" />
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Online booking</p>
        <h2 id="book-title" className="mt-3 font-serif text-4xl text-cream sm:text-5xl md:text-6xl">
          {booking.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-cream/80">{booking.subtitle}</p>
      </Reveal>
      <Reveal className="mt-10 md:mt-12" delay={0.1}>
        <BookingWizard />
      </Reveal>
      <p className="mx-auto mt-6 max-w-md text-center text-xs text-muted">{booking.demoNote}</p>
      <div className="rule absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
