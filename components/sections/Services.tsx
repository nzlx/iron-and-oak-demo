import { services, servicesSection } from "@/content";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { Clock } from "@/components/booking/StepService";
import { Arrow } from "@/components/ui/Arrow";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="services-title" {...servicesSection} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.08} className="leather flex h-full flex-col rounded-3xl p-6 sm:p-7">
              <div className="flex items-baseline gap-3">
                <h3 className="font-serif text-2xl text-cream">{s.name}</h3>
                <span className="mb-1.5 flex-1 border-b border-dotted border-brass/40" aria-hidden="true" />
                <p className="font-serif text-3xl text-brass">
                  <span className="sr-only">Price: </span>${s.price}
                </p>
              </div>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm text-cream/75">
                  <Clock /> {s.duration} min
                  {s.badge && (
                    <span className="ml-2 rounded-full bg-brass/15 px-2.5 py-0.5 text-xs font-medium text-brass-light">
                      {s.badge}
                    </span>
                  )}
                </span>
                <BookButton
                  preset={{ serviceId: s.id }}
                  className="relative z-10 inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-semibold text-brass-light transition-colors hover:text-cream"
                  aria-label={`Book a ${s.name}`}
                >
                  Book <Arrow dir="right" />
                </BookButton>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
