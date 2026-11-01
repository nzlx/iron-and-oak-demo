# Iron & Oak Barber Co. (demo)

A one-page website for a fictional premium barbershop in Tampa, Florida, built as a portfolio piece.

**Live site:** https://iron-and-oak-demo.vercel.app

> **This is a demo.** Iron & Oak Barber Co. is not a real business. The address, phone number (a reserved 555-01xx number), barbers and reviews are made up. The online booking runs entirely in the browser: no appointment is created and nothing you type is sent anywhere.

## Highlights

- **Online booking wizard:** service → barber (or "any available") → date → time → contact details → review → confirmation. Availability is generated on the client in Tampa time (America/New_York), respects opening hours, barbers' days off and service length, and stays consistent between visits. The confirmation screen offers an "Add to calendar" `.ics` file generated in the browser.
- **"Book with [barber]" and per-service "Book" buttons** jump to the wizard with the choice already made.
- Full-screen hero with word-by-word headline reveal and parallax, animated stat counters, service menu, barber cards with hover tilt, bento photo gallery with a keyboard- and swipe-friendly lightbox, reviews slider, story section, hours with a live "Open now" badge and a stylized map.
- Mobile-first: tuned for 375px screens, with a floating "Book Now" bar on phones.
- Accessibility: semantic landmarks, alt text, visible focus, keyboard-navigable calendar and lightbox, `prefers-reduced-motion` support.
- SEO: metadata, Open Graph image, JSON-LD (`BarberShop`), sitemap and robots.txt.
- Lighthouse (mobile): Performance 90+, Accessibility 100, Best Practices 100, SEO 100.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, statically generated) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animations, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- `next/image` for responsive, optimized images; self-hosted fonts (DM Serif Display, Inter)
- Deployed on [Vercel](https://vercel.com)

## Run locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/<your-username>/iron-and-oak-demo.git
cd iron-and-oak-demo
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
```

## Customizing

All copy lives in [`content.ts`](content.ts): business name, contacts, hours, services and prices, barbers, gallery, reviews and the About text. Photos are in `public/images`. Changing those two places is enough to rebrand the site for another shop.

Optional environment variable: `NEXT_PUBLIC_SITE_URL` sets the canonical URL used in metadata, the sitemap and Open Graph tags. It defaults to the live demo URL.

## Project structure

```
app/            layout, page, global styles, OG image, sitemap, robots, fonts
components/
  booking/      booking wizard steps (service, barber, calendar, time, details, review, success)
  sections/     page sections (hero, services, barbers, gallery, booking, reviews, about, visit)
  ui/           shared pieces (reveal, parallax, tilt card, lightbox, counter, hours, map)
lib/            availability engine (slots.ts), .ics export, scroll helpers
content.ts      all site content
```

## Credits

Photos from [Unsplash](https://unsplash.com) under the Unsplash License. See [CREDITS.md](CREDITS.md). The people in the photos are not the fictional barbers named on the site.

Designed and built by **NeoCode**.
