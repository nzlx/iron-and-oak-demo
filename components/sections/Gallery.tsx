"use client";

import { useState } from "react";
import Image from "next/image";
import { gallery } from "@/content";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const tileClass = {
  feature: "col-span-2 row-span-2",
  tall: "row-span-2",
  regular: "",
} as const;

const tileSizes = {
  feature: "(min-width: 1024px) 540px, (min-width: 640px) 66vw, 100vw",
  tall: "(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw",
  regular: "(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw",
} as const;

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="gallery-title" eyebrow={gallery.eyebrow} title={gallery.title} subtitle={gallery.subtitle} />

        <div className="@container mt-12">
          <ul className="bento grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {gallery.items.map((g, i) => {
              const feature = g.tile === "feature";
              return (
                <Reveal as="li" key={g.src} delay={(i % 4) * 0.06} y={20} className={tileClass[g.tile]}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group relative block h-full w-full overflow-hidden rounded-2xl bg-oak text-left"
                    aria-label={`Open photo: ${g.title}`}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes={tileSizes[g.tile]}
                      quality={60}
                      style={{ objectPosition: g.pos }}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Caption: always on touch screens, on hover/focus where a mouse is available. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3 pt-12 transition-opacity duration-300 sm:p-4 sm:pt-16 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
                    >
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brass-light">{g.tag}</span>
                      <span
                        className={`mt-1 font-semibold leading-snug text-white ${feature ? "font-serif text-2xl font-normal sm:text-3xl" : "text-sm sm:text-base"}`}
                      >
                        {g.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:ring-brass/50"
                    />
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>

      <Lightbox items={gallery.items} index={open} onChange={setOpen} />
    </section>
  );
}
