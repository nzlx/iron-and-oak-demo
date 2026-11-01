import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { contacts, hero, stats } from "@/content";
import Counter from "@/components/ui/Counter";
import Parallax from "@/components/ui/Parallax";
import BookButton from "@/components/ui/BookButton";

export default function Hero() {
  // Each sentence on its own line; words rise in one after another.
  const sentences = hero.title.split(/(?<=\.)\s+/);
  let w = 0;

  // Art direction: a portrait crop for phones, the full interior from tablets up.
  const common = { alt: hero.image.alt, fill: true, quality: 70, priority: true } as const;
  const desktop = getImageProps({ ...common, src: hero.image.src, sizes: "100vw" }).props;
  const mobile = getImageProps({ ...common, src: hero.image.mobileSrc, sizes: "150vw" }).props;
  preload(mobile.src, {
    as: "image",
    imageSrcSet: mobile.srcSet,
    imageSizes: "150vw",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });
  preload(desktop.src, {
    as: "image",
    imageSrcSet: desktop.srcSet,
    imageSizes: "100vw",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });

  return (
    <section id="top" aria-label="Welcome" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Parallax className="absolute inset-0 -z-10" amount={0.25}>
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...mobile} fetchPriority="high" className="scale-110 object-cover object-[50%_55%]" />
        </picture>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/45 via-ink/20 to-ink md:from-ink/55 md:via-ink/25" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_20%_60%,transparent_0%,rgb(14_12_10/0.6)_100%)] md:bg-[radial-gradient(90%_90%_at_45%_55%,transparent_20%,rgb(14_12_10/0.7)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/80 via-ink/30 to-transparent md:block"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-10 pt-28 sm:px-6 md:pb-14">
        <p className="eyebrow fade-up" style={{ animationDelay: "0s" }}>
          {hero.eyebrow}
        </p>

        <h1 className="mt-5 font-serif text-[3.4rem] leading-[0.98] tracking-[-0.01em] text-cream sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          {sentences.map((s, i) => (
            <span key={s} className="block">
              {s.split(" ").map((word) => {
                const delay = 0.05 + w++ * 0.07;
                return (
                  <span key={word}>
                    <span className="word-in" style={{ animationDelay: `${delay}s` }}>
                      {i === sentences.length - 1 && word === s.split(" ").at(-1) ? (
                        <em className="text-brass not-italic">{word}</em>
                      ) : (
                        word
                      )}
                    </span>{" "}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl" style={{ animationDelay: "0.45s" }}>
          {hero.subtitle}
        </p>

        <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "0.55s" }}>
          <BookButton className="btn btn-brass h-14 px-8 text-base">{hero.cta}</BookButton>
          <a href={contacts.phoneHref} className="btn btn-ghost h-14 px-7 text-base">
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path
                d="M6.6 2.8l1.6 3.4c.2.5.1 1-.3 1.4L6.6 8.8a10 10 0 004.6 4.6l1.2-1.3c.4-.4.9-.5 1.4-.3l3.4 1.6c.5.2.8.8.6 1.4l-.6 2c-.2.6-.7 1-1.3 1C8.4 17.6 2.4 11.6 2.2 4.1c0-.6.4-1.1 1-1.3l2-.6c.6-.2 1.2.1 1.4.6z"
                fill="currentColor"
              />
            </svg>
            <span>
              <span className="sr-only">Call </span>
              {contacts.phoneDisplay}
            </span>
          </a>
        </div>

        <dl
          className="fade-up mt-12 grid grid-cols-3 gap-4 border-t border-cream/15 pt-6 md:mt-16 md:max-w-2xl"
          style={{ animationDelay: "0.65s" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-xs uppercase tracking-[0.14em] text-muted sm:text-sm">{s.label}</dt>
              <dd className="order-1 font-serif text-3xl text-cream sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
