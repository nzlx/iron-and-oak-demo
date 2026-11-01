import Image from "next/image";
import { about, aboutSection, site } from "@/content";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wood relative px-4 py-20 sm:px-6 md:py-28">
      <div className="rule absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-brass/30 sm:aspect-[5/4] md:aspect-[4/5]">
            <Parallax className="absolute inset-0" amount={0.08} through>
              <Image
                src={aboutSection.image.src}
                alt={aboutSection.image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                quality={70}
                className="scale-[1.18] object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden="true" />
          </div>
          <div className="absolute -bottom-5 right-5 grid h-28 w-28 place-items-center rounded-full border border-brass/50 bg-ink text-center shadow-2xl sm:-right-5">
            <span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-brass">Est.</span>
              <span className="block font-serif text-3xl text-cream">{site.established}</span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-brass">Tampa</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">{aboutSection.eyebrow}</p>
          <h2 id="about-title" className="mt-3 font-serif text-4xl leading-[1.05] text-cream sm:text-5xl">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-cream/80">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-4 font-serif text-xl italic text-brass-light">
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            {aboutSection.signature}
          </p>
        </Reveal>
      </div>
      <div className="rule absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
