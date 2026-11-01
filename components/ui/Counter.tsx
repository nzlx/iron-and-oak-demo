"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up from 0 when scrolled into view. Screen readers get the final value straight away. */
export default function Counter({ value, suffix = "", duration = 1600 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const fmt = (x: number) => x.toLocaleString("en-US");
  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {fmt(n)}
        {suffix}
      </span>
      <span className="sr-only">
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}
