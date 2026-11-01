/**
 * All site copy lives here: texts, prices, barbers, reviews, hours and contacts.
 * Iron & Oak Barber Co. is a fictional business. The address and phone number are
 * made up (555-01xx numbers are reserved for fiction).
 */

export const site = {
  name: "Iron & Oak Barber Co.",
  shortName: "Iron & Oak",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iron-and-oak-demo.vercel.app",
  description:
    "Premium barbershop in Tampa, FL. Classic cuts, skin fades, beard trims and hot-towel straight-razor shaves. Book online in under a minute.",
  established: 2014,
  credit: { label: "Demo website by NeoCode", href: "https://neocodestudio.vercel.app" },
};

export const contacts = {
  phoneDisplay: "(813) 555-0142",
  phoneHref: "tel:+18135550142",
  email: "hello@ironandoak.example",
  address: {
    street: "2417 Ironwood Ave",
    city: "Tampa",
    state: "FL",
    zip: "33606",
  },
  // Placeholder: points to the city, not to a real storefront.
  directionsHref: "https://maps.google.com/?q=Tampa,+FL",
  timeZone: "America/New_York",
};

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Yelp", href: "#" },
];

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Barbers", href: "#barbers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
];

/** Weekly hours. day: 0 = Sunday … 6 = Saturday. Times are 24h, shop-local (Tampa, ET). */
export const hours: { day: number; label: string; open: string | null; close: string | null }[] = [
  { day: 1, label: "Monday", open: null, close: null },
  { day: 2, label: "Tuesday", open: "09:00", close: "19:00" },
  { day: 3, label: "Wednesday", open: "09:00", close: "19:00" },
  { day: 4, label: "Thursday", open: "09:00", close: "19:00" },
  { day: 5, label: "Friday", open: "09:00", close: "19:00" },
  { day: 6, label: "Saturday", open: "08:00", close: "17:00" },
  { day: 0, label: "Sunday", open: "10:00", close: "15:00" },
];

export const hero = {
  eyebrow: `Tampa, Florida · Est. ${site.established}`,
  title: "Look sharp. Leave better.",
  subtitle:
    "Classic cuts, skin fades and hot-towel shaves in a shop that feels like your favorite neighborhood bar. Minus the hangover.",
  cta: "Book Now",
  image: {
    src: "/images/hero-chair.jpg",
    mobileSrc: "/images/hero-chair-mobile.jpg",
    alt: "A vintage chrome-and-leather barber chair in the warm low light of the Iron & Oak shop floor",
  },
};

export const stats = [
  { value: 10, suffix: "+", label: "Years in Tampa" },
  { value: 5000, suffix: "+", label: "Happy clients" },
  { value: 4, suffix: "", label: "Master barbers" },
];

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  description: string;
  badge?: string;
};

export const services: Service[] = [
  {
    id: "classic",
    name: "Classic Cut",
    price: 35,
    duration: 45,
    description: "Scissor or clipper cut tailored to your head shape, finished with a hot-lather neck shave and style.",
  },
  {
    id: "fade",
    name: "Skin Fade",
    price: 40,
    duration: 45,
    description: "A seamless fade down to the skin, a crisp lineup and a straight-razor finish.",
  },
  {
    id: "beard",
    name: "Beard Trim",
    price: 20,
    duration: 30,
    description: "Shape, line and condition. Comes with a hot towel and a dab of beard oil.",
  },
  {
    id: "shave",
    name: "Hot Towel Shave",
    price: 35,
    duration: 45,
    description: "The full ritual: hot towels, pre-shave oil, rich lather and a straight razor. Cold towel to finish.",
  },
  {
    id: "combo",
    name: "Cut + Beard",
    price: 50,
    duration: 60,
    description: "Any haircut plus a full beard trim. Our most-booked service, and the best value in the house.",
    badge: "Most popular",
  },
  {
    id: "kids",
    name: "Kids Cut",
    price: 25,
    duration: 30,
    description: "For young gentlemen 12 and under. Patience included, lollipop optional.",
  },
];

export type Barber = {
  id: string;
  name: string;
  firstName: string;
  role: string;
  specialty: string;
  bio: string;
  photo: string;
  photoAlt: string;
  /** Weekdays this barber is off (0 = Sunday). The shop is closed on Mondays anyway. */
  daysOff: number[];
};

export const barbers: Barber[] = [
  {
    id: "marcus",
    name: "Marcus Reyes",
    firstName: "Marcus",
    role: "Owner & Master Barber",
    specialty: "Classic cuts & straight-razor shaves",
    bio: "Opened Iron & Oak in 2014 after a decade behind the chair in Ybor City. Still takes the first appointment every morning.",
    photo: "/images/barber-marcus.jpg",
    photoAlt: "Marcus Reyes holding a pair of barber shears",
    daysOff: [0],
  },
  {
    id: "dre",
    name: "Dre Coleman",
    firstName: "Dre",
    role: "Senior Barber",
    specialty: "Skin fades & clean lineups",
    bio: "Precision is Dre's whole personality. Bring a photo or don't, you'll leave with the sharpest fade on the block.",
    photo: "/images/barber-dre.jpg",
    photoAlt: "Dre Coleman lining up a client's haircut with clippers",
    daysOff: [3],
  },
  {
    id: "tony",
    name: "Tony Russo",
    firstName: "Tony",
    role: "Barber & Beard Specialist",
    specialty: "Beard sculpting & hot-towel shaves",
    bio: "Learned the hot-towel shave from his grandfather in Brooklyn. Fifteen minutes in Tony's chair beats a nap.",
    photo: "/images/barber-tony.jpg",
    photoAlt: "Tony Russo, in a black cap, cutting a client's hair with scissors",
    daysOff: [2],
  },
  {
    id: "jake",
    name: "Jake Whitfield",
    firstName: "Jake",
    role: "Barber",
    specialty: "Textured crops & kids' cuts",
    bio: "Patient, funny and great with first-timers. Jake is the reason half the kids in the neighborhood don't dread haircut day.",
    photo: "/images/barber-jake.jpg",
    photoAlt: "Jake Whitfield, in a flat cap and tie, styling a client's hair with a comb",
    daysOff: [5],
  },
];

export const booking = {
  title: "Book your chair",
  subtitle: "Pick a service, a barber and a time. Takes about a minute.",
  daysAhead: 21,
  slotStep: 30, // minutes between start times
  minLeadMinutes: 60, // earliest booking from "now"
  steps: ["Service", "Barber", "Date", "Time", "Details"],
  anyBarber: { id: "any", name: "Any available barber", note: "Fastest way to get in" },
  demoNote: "This is a demo. No booking is created and nothing you enter leaves your browser.",
  success: {
    title: "You’re booked!",
    text: "We'll see you soon. A confirmation would normally land in your inbox. This is a demo, so nothing was sent.",
  },
  policy: "Running late? Give us a call. We hold your chair for 10 minutes.",
};

// DEMO CONTENT: the reviews below are fictional and written for this portfolio demo.
export const reviews = [
  {
    name: "Chris M.",
    source: "Google",
    rating: 5,
    text: "Best fade I've had in Tampa, period. Dre took his time, asked the right questions and the lineup was still crisp a week later.",
  },
  {
    name: "Daniel R.",
    source: "Yelp",
    rating: 5,
    text: "Booked a hot towel shave before my wedding. Tony made it feel like an event. My face has never been that smooth.",
  },
  {
    name: "Jessica T.",
    source: "Google",
    rating: 5,
    text: "My son used to hate haircuts. Jake had him laughing the whole time and now he asks when we're going back. That's a miracle.",
  },
  {
    name: "Andre W.",
    source: "Google",
    rating: 5,
    text: "Online booking took thirty seconds, I walked in on time and was in the chair two minutes later. No waiting around. Love it.",
  },
  {
    name: "Mike S.",
    source: "Yelp",
    rating: 5,
    text: "Classic barbershop feel without the attitude. Marcus remembers how you like it and the conversation is half the reason I come back.",
  },
  {
    name: "Luis G.",
    source: "Google",
    rating: 5,
    text: "Cut + Beard is the move. Fair price, great vibe, cold drink while you wait. Been coming every three weeks for two years.",
  },
];

export const about = {
  title: "Built on craft, kept by community",
  paragraphs: [
    "Iron & Oak started in 2014 with two chairs, one stubborn idea and a lot of secondhand furniture. Marcus Reyes wanted a shop where a great haircut came without the rush, the upsell or the attitude: just good work and good conversation.",
    "Twelve years later we've got four barbers, more chairs and a few thousand regulars, but the idea hasn't changed. Every cut starts with a real consultation. Every shave gets a hot towel. And every customer, whether it's your first visit or your two-hundredth, gets the same attention.",
    "We're proud to be a Tampa shop. We sponsor the local Little League team, we keep the coffee on and the game is usually playing. Come in, sit down, stay a while.",
  ],
};

export const visit = {
  title: "Come see us",
  parking: "Free parking out back. Enter from the alley off Oak St.",
};

export const servicesSection = {
  eyebrow: "Services & Prices",
  title: "The menu",
  subtitle:
    "Straightforward prices. Every service comes with a hot towel, a proper consultation and a style you can recreate at home.",
};

export const barbersSection = {
  eyebrow: "Our Barbers",
  title: "The crew behind the chair",
  subtitle: "Four barbers, four specialties, one standard. Pick your person or let us match you.",
};

export const gallery = {
  eyebrow: "Gallery",
  title: "Fresh off the chair",
  subtitle: "A few recent cuts, fades and shaves. Tap any photo for a closer look.",
  /**
   * Bento grid: one "feature" tile (2×2), one "tall" tile (1×2) and six regular tiles. In this order they fill
   * 4×3 on desktop, 3×4 on tablets and 2×6 on phones with no gaps, so keep the count and order of tile types.
   * pos = object-position for the crop.
   */
  items: [
    {
      src: "/images/work-fade-curls.jpg",
      w: 1203,
      h: 1600,
      tile: "feature",
      pos: "50% 30%",
      tag: "Fade",
      title: "Taper with curly top",
      alt: "Barber shaping a taper fade on a client with a curly top",
    },
    {
      src: "/images/work-crew-cut.jpg",
      w: 1280,
      h: 1600,
      tile: "regular",
      pos: "50% 35%",
      tag: "Classic",
      title: "Classic crew cut",
      alt: "Fresh crew cut with a short fade, finished with clippers",
    },
    {
      src: "/images/work-razor-beard.jpg",
      w: 1600,
      h: 1209,
      tile: "regular",
      pos: "45% 50%",
      tag: "Shave",
      title: "Razor line-up",
      alt: "Barber lining up a client's beard with a straight razor",
    },
    {
      src: "/images/work-kids-cut.jpg",
      w: 1067,
      h: 1600,
      tile: "tall",
      pos: "50% 40%",
      tag: "Kids",
      title: "Kids' side part",
      alt: "Young boy in the barber chair with a neat side-part haircut",
    },
    {
      src: "/images/work-clipper-fade.jpg",
      w: 1600,
      h: 1068,
      tile: "regular",
      pos: "62% 50%",
      tag: "Fade",
      title: "Clipper skin fade",
      alt: "Barber blending a skin fade with clippers and a comb",
    },
    {
      src: "/images/work-textured-crop.jpg",
      w: 1600,
      h: 860,
      tile: "regular",
      pos: "50% 50%",
      tag: "Texture",
      title: "Textured crop",
      alt: "Textured crop with a high fade, styled with a comb",
    },
    {
      src: "/images/work-beard-trim.jpg",
      w: 1063,
      h: 1600,
      tile: "regular",
      pos: "50% 45%",
      tag: "Beard",
      title: "Beard shape-up",
      alt: "Black and white photo of a barber trimming a full beard with scissors",
    },
    {
      src: "/images/work-scissor-comb.jpg",
      w: 1280,
      h: 1600,
      tile: "regular",
      pos: "50% 40%",
      tag: "Classic",
      title: "Scissor-over-comb",
      alt: "Barber cutting with scissors over a comb above a fade",
    },
  ] satisfies {
    src: string;
    w: number;
    h: number;
    tile: "feature" | "tall" | "regular";
    pos: string;
    tag: string;
    title: string;
    alt: string;
  }[],
};

export const reviewsSection = {
  eyebrow: "Reviews",
  title: "Word around Tampa",
  // DEMO CONTENT: fictional rating summary for the portfolio demo.
  rating: "4.9",
  count: "600+",
};

export const aboutSection = {
  eyebrow: "About",
  image: { src: "/images/about.jpg", alt: "A red leather barber chair in a wood-paneled room lined with framed paintings" },
  signature: "Marcus Reyes, founder",
};
