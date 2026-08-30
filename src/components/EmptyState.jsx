export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
      {/* Vector art illustration */}
      <svg
        className="w-48 h-48 sm:w-64 sm:h-64 mb-8"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="128" cy="128" r="120" className="fill-primary-50" />
        <circle cx="128" cy="128" r="100" className="fill-primary-100/50" />
        
        {/* Map/Globe */}
        <circle cx="128" cy="115" r="55" className="fill-white stroke-primary-300" strokeWidth="2" />
        <ellipse cx="128" cy="115" rx="55" ry="20" className="stroke-primary-200" strokeWidth="1.5" fill="none" />
        <ellipse cx="128" cy="115" rx="20" ry="55" className="stroke-primary-200" strokeWidth="1.5" fill="none" />
        <line x1="73" y1="100" x2="183" y2="100" className="stroke-primary-200" strokeWidth="1" />
        <line x1="73" y1="130" x2="183" y2="130" className="stroke-primary-200" strokeWidth="1" />
        
        {/* Location pin */}
        <g transform="translate(148, 72)">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" className="fill-accent-500" />
          <circle cx="12" cy="12" r="5" className="fill-white" />
        </g>
        
        {/* Plane */}
        <g transform="translate(85, 80) rotate(-30)">
          <path d="M0 8L20 0L15 8L20 16L0 8Z" className="fill-primary-400" />
          <path d="M8 5L8 11" className="stroke-white" strokeWidth="1" />
        </g>
        
        {/* Dotted path */}
        <path
          d="M95 140 Q128 160 155 140 Q170 130 180 145"
          className="stroke-accent-400"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        
        {/* Stars / sparkles */}
        <g className="fill-accent-400">
          <polygon points="75,75 77,70 79,75 84,77 79,79 77,84 75,79 70,77" />
          <polygon points="175,85 176.5,81.5 178,85 181.5,86.5 178,88 176.5,91.5 175,88 171.5,86.5" transform="scale(0.8) translate(40, 15)" />
        </g>
        
        {/* Small clouds */}
        <g className="fill-surface-200" opacity="0.6">
          <ellipse cx="85" cy="70" rx="12" ry="6" />
          <ellipse cx="93" cy="67" rx="8" ry="5" />
          <ellipse cx="180" cy="95" rx="10" ry="5" />
          <ellipse cx="187" cy="92" rx="7" ry="4" />
        </g>
      </svg>

      <h3 className="text-xl sm:text-2xl font-display font-bold text-surface-800 mb-2 text-center">
        Where to next?
      </h3>
      <p className="text-surface-500 text-center max-w-md leading-relaxed">
        Describe your dream trip above and let AI craft a personalized day-by-day itinerary for you.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {['Interactive cards', 'Reorder stops', 'Refine with AI'].map((feature) => (
          <span
            key={feature}
            className="px-3 py-1 text-xs font-medium rounded-full bg-accent-50 text-accent-700 border border-accent-200"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}
