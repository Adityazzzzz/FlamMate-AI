import { useState } from 'react'
import StopCard from './StopCard'

export default function DayCard({ day, dayIndex, onRemoveStop, onReorderStop }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="rounded-2xl border border-surface-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Day header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-surface-50 transition-colors duration-150 text-left"
      >
        <div className="flex items-center gap-3">
          {/* Day number badge */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            D{day.day}
          </div>
          <div>
            <h3 className="font-display font-bold text-surface-900 text-base sm:text-lg">
              {day.title}
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              {day.stops.length} {day.stops.length === 1 ? 'stop' : 'stops'}
            </p>
          </div>
        </div>

        {/* Expand/collapse icon */}
        <svg
          className={`w-5 h-5 text-surface-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Stops list */}
      {isExpanded && (
        <div className="px-2 sm:px-4 pb-4 border-t border-surface-100">
          <div className="mt-2">
            {day.stops.map((stop, stopIndex) => (
              <StopCard
                key={stop.id}
                stop={stop}
                dayIndex={dayIndex}
                stopIndex={stopIndex}
                totalStops={day.stops.length}
                onRemove={onRemoveStop}
                onReorder={onReorderStop}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
