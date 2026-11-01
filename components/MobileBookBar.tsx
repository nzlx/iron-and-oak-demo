"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { contacts } from "@/content";
import BookButton from "./ui/BookButton";

/** Phone-only floating "Book Now": shows after the hero, hides while the booking form is on screen. */
export default function MobileBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const book = document.getElementById("book");
    const io = new IntersectionObserver(([e]) => setBookingVisible(e.isIntersecting), { rootMargin: "-20% 0px -20% 0px" });
    if (book) io.observe(book);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !bookingVisible;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        >
          <div className="flex gap-2 rounded-full border border-line/80 bg-ink/95 p-1.5 shadow-[0_20px_40px_-10px_rgb(0_0_0/0.9)]">
            <BookButton className="btn btn-brass h-12 flex-1 text-base">Book Now</BookButton>
            <a
              href={contacts.phoneHref}
              aria-label={`Call ${contacts.phoneDisplay}`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-brass"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M6.6 2.8l1.6 3.4c.2.5.1 1-.3 1.4L6.6 8.8a10 10 0 004.6 4.6l1.2-1.3c.4-.4.9-.5 1.4-.3l3.4 1.6c.5.2.8.8.6 1.4l-.6 2c-.2.6-.7 1-1.3 1C8.4 17.6 2.4 11.6 2.2 4.1c0-.6.4-1.1 1-1.3l2-.6c.6-.2 1.2.1 1.4.6z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
