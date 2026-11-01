import { contacts, site } from "@/content";

/** Illustrative map: hand-drawn streets in the site palette, no real location data. */
export default function MapPlaceholder() {
  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-line bg-coal">
      <svg
        viewBox="0 0 480 400"
        className="block h-auto w-full"
        role="img"
        aria-label="Illustrated map showing the shop's location"
      >
        <defs>
          <pattern id="blocks" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="48" height="48" fill="#17130f" />
            <path d="M0 0H48M0 0V48" stroke="#2a221b" strokeWidth="5" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="65%">
            <stop offset="55%" stopColor="#0e0c0a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0e0c0a" stopOpacity="0.9" />
          </radialGradient>
        </defs>
        <rect width="480" height="400" fill="url(#blocks)" />
        {/* River */}
        <path d="M-10 320C60 300 90 250 150 255S250 330 320 300 400 200 490 210V420H-10Z" fill="#141b1e" />
        <path d="M-10 320C60 300 90 250 150 255S250 330 320 300 400 200 490 210" fill="none" stroke="#24313a" strokeWidth="2" />
        {/* Park */}
        <path d="M300 60h90l20 70-80 20-40-40z" fill="#1a1d14" stroke="#262b1c" />
        {/* Main roads */}
        <path d="M-10 170L490 100" stroke="#3d3228" strokeWidth="12" />
        <path d="M200 -10L250 420" stroke="#3d3228" strokeWidth="12" />
        <path d="M-10 60L490 250" stroke="#2f271f" strokeWidth="7" />
        <g fill="#7d7266" fontFamily="system-ui, sans-serif" fontSize="11" letterSpacing="1.5">
          <text x="40" y="150" transform="rotate(-8 40 150)">
            IRONWOOD AVE
          </text>
          <text x="262" y="380" transform="rotate(83 262 380)">
            OAK ST
          </text>
          <text x="318" y="102">
            RIVERSIDE PARK
          </text>
        </g>
        <rect width="480" height="400" fill="url(#fade)" />
        {/* Pin */}
        <g transform="translate(236 136)">
          <circle r="38" fill="#c8a26b" className="pin-pulse" />
          <path d="M0 8C-10-4-16-12-16-20a16 16 0 0132 0c0 8-6 16-16 28z" transform="translate(0 -14)" fill="#c8a26b" />
          <circle cy="-34" r="6" fill="#0e0c0a" />
        </g>
      </svg>
      <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line/80 bg-ink/90 px-4 py-3">
        <span>
          <span className="block font-serif text-lg text-cream">{site.shortName}</span>
          <span className="block text-sm text-muted">
            {contacts.address.street}, {contacts.address.city}
          </span>
        </span>
        <span className="shrink-0 text-xs text-muted">Map for illustration</span>
      </figcaption>
    </figure>
  );
}
