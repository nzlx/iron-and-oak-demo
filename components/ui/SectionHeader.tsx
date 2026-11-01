import Reveal from "./Reveal";

export default function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-serif text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed text-cream/80 ${center ? "mx-auto max-w-md" : "max-w-xl"}`}>{subtitle}</p>
      )}
      {children}
    </Reveal>
  );
}
