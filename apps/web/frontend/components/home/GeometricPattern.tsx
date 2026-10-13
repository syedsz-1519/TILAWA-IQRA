/**
 * GeometricPattern — original TILAWA background motif.
 *
 * An 8-pointed star + interlocking diamond grid, hand-authored SVG.
 * Rendered at low opacity as an atmospheric background — not copied from
 * any existing Quran or Islamic app.
 *
 * aria-hidden so screen readers skip the decorative element.
 */
export function GeometricPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <defs>
        {/* The repeating tile: 80×80 px unit cell */}
        <pattern
          id="tilawa-geo"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* ── 8-pointed star: two overlapping squares rotated 45° ── */}
          {/* Square 1 (axis-aligned), centred at 40,40, side 28 */}
          <rect
            x="26" y="26" width="28" height="28"
            fill="none" stroke="currentColor" strokeWidth="0.7"
          />
          {/* Square 2 (rotated 45°), same centre */}
          <rect
            x="40" y="20.2" width="28" height="28"
            transform="rotate(45 40 40)"
            fill="none" stroke="currentColor" strokeWidth="0.7"
          />

          {/* ── Connecting diamonds at tile corners ── */}
          {/* NW corner */}
          <polygon
            points="0,6 6,0 12,6 6,12"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />
          {/* NE corner */}
          <polygon
            points="68,6 74,0 80,6 74,12"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />
          {/* SW corner */}
          <polygon
            points="0,68 6,62 12,68 6,74"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />
          {/* SE corner */}
          <polygon
            points="68,74 74,68 80,74 74,80"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />

          {/* ── Edge midpoint diamonds ── */}
          {/* Top */}
          <polygon
            points="40,0 46,6 40,12 34,6"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />
          {/* Bottom */}
          <polygon
            points="40,68 46,74 40,80 34,74"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />
          {/* Left */}
          <polygon
            points="0,34 6,40 0,46 -6,40"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />
          {/* Right */}
          <polygon
            points="80,34 86,40 80,46 74,40"
            fill="none" stroke="currentColor" strokeWidth="0.5"
          />

          {/* ── Inner cross lines connecting star to edge diamonds ── */}
          <line x1="40" y1="12" x2="40" y2="26" stroke="currentColor" strokeWidth="0.4" />
          <line x1="40" y1="54" x2="40" y2="68" stroke="currentColor" strokeWidth="0.4" />
          <line x1="12" y1="40" x2="26" y2="40" stroke="currentColor" strokeWidth="0.4" />
          <line x1="54" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="0.4" />

          {/* ── Diagonal connectors ── */}
          <line x1="6"  y1="6"  x2="26" y2="26" stroke="currentColor" strokeWidth="0.4" />
          <line x1="74" y1="6"  x2="54" y2="26" stroke="currentColor" strokeWidth="0.4" />
          <line x1="6"  y1="74" x2="26" y2="54" stroke="currentColor" strokeWidth="0.4" />
          <line x1="74" y1="74" x2="54" y2="54" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Fill entire SVG with the pattern */}
      <rect width="100%" height="100%" fill="url(#tilawa-geo)" />
    </svg>
  )
}
