import Image from "next/image";
import { barbers, barbersSection } from "@/content";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";

export default function Barbers() {
  return (
    <section id="barbers" aria-labelledby="barbers-title" className="wood relative py-20 md:py-28">
      <div className="rule absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader id="barbers-title" {...barbersSection} />
      </div>

      {/* Phones: swipeable row. Tablet and up: grid. */}
      <ul className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-6 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {barbers.map((b, i) => (
          <Reveal as="li" key={b.id} delay={i * 0.08} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <TiltCard className="leather flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={b.photo}
                  alt={b.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 78vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/10 to-transparent" aria-hidden="true" />
                <p className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-brass-light">
                  {b.role}
                </p>
              </div>
              <div className="relative -mt-12 flex flex-1 flex-col px-5 pb-6">
                <h3 className="font-serif text-2xl text-cream">{b.name}</h3>
                <p className="mt-1 text-sm font-medium text-brass">{b.specialty}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{b.bio}</p>
                <BookButton preset={{ barberId: b.id }} className="btn btn-ghost relative z-10 mt-5 h-11 min-h-0 w-full text-sm">
                  Book with {b.firstName}
                </BookButton>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
      <div className="rule absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
