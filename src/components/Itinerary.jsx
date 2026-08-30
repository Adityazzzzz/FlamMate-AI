import DayCard from './DayCard'

export default function Itinerary({ itinerary, onRemoveStop, onReorderStop }) {
  if (!itinerary) return null

  return (
    <div className="space-y-6">
      {/* Trip header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-900 dark:text-white">
          {itinerary.tripTitle}
        </h2>
        {itinerary.summary && (
          <p className="mt-2 text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl">
            {itinerary.summary}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-sm text-surface-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {itinerary.days.length} {itinerary.days.length === 1 ? 'day' : 'days'}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {itinerary.days.reduce((acc, day) => acc + day.stops.length, 0)} stops
          </span>
        </div>
      </div>

      {/* Day cards */}
      <div className="space-y-4">
        {itinerary.days.map((day, index) => (
          <DayCard
            key={`day-${day.day}-${index}`}
            day={day}
            dayIndex={index}
            onRemoveStop={onRemoveStop}
            onReorderStop={onReorderStop}
          />
        ))}
      </div>
    </div>
  )
}
