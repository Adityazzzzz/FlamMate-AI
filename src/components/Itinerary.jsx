import DayCard from './DayCard'

export default function Itinerary({ itinerary, onRemoveStop, onReorderStop, onReset }) {
  if (!itinerary) return null

  return (
    <div className="space-y-6">
      {/* Trip header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-surface-900">
            {itinerary.tripTitle}
          </h2>
          {itinerary.summary && (
            <p className="mt-1.5 text-surface-500 leading-relaxed max-w-2xl">
              {itinerary.summary}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-sm text-surface-400">
            <span>{itinerary.days.length} {itinerary.days.length === 1 ? 'day' : 'days'}</span>
            <span>·</span>
            <span>
              {itinerary.days.reduce((acc, day) => acc + day.stops.length, 0)} stops
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium text-surface-600 bg-surface-100 hover:bg-surface-200 border border-surface-200 transition-colors"
        >
          New Trip
        </button>
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
