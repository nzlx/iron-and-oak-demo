import { contacts, visit } from "@/content";
import Reveal from "@/components/ui/Reveal";
import Hours from "@/components/ui/Hours";
import MapPlaceholder from "@/components/ui/MapPlaceholder";

export default function Visit() {
  const a = contacts.address;
  return (
    <section id="visit" aria-labelledby="visit-title" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow">Location &amp; Hours</p>
          <h2 id="visit-title" className="mt-3 font-serif text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl">
            {visit.title}
          </h2>

          <address className="mt-6 not-italic">
            <p className="text-xl text-cream">{a.street}</p>
            <p className="text-xl text-cream">
              {a.city}, {a.state} {a.zip}
            </p>
            <p className="mt-2 text-sm text-muted">{visit.parking}</p>
          </address>

          <div className="mt-8">
            <Hours />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={contacts.phoneHref} className="btn btn-brass h-14 px-7 text-base">
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M6.6 2.8l1.6 3.4c.2.5.1 1-.3 1.4L6.6 8.8a10 10 0 004.6 4.6l1.2-1.3c.4-.4.9-.5 1.4-.3l3.4 1.6c.5.2.8.8.6 1.4l-.6 2c-.2.6-.7 1-1.3 1C8.4 17.6 2.4 11.6 2.2 4.1c0-.6.4-1.1 1-1.3l2-.6c.6-.2 1.2.1 1.4.6z"
                  fill="currentColor"
                />
              </svg>
              Call {contacts.phoneDisplay}
            </a>
            <a
              href={contacts.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost h-14 px-7 text-base"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M10 1.5l8.5 8.5-8.5 8.5L1.5 10 10 1.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 11.5V9.5h4V8l2.2 2.2-2.2 2.2v-1.4h-2.5v.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              Get Directions
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <MapPlaceholder />
        </Reveal>
      </div>
    </section>
  );
}
