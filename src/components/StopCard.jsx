const CATEGORY_CONFIG = {
  food: { icon: '🍜', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  culture: { icon: '🏛️', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  adventure: { icon: '🏔️', color: 'bg-red-100 text-red-700 border-red-200' },
  nature: { icon: '🌿', color: 'bg-green-100 text-green-700 border-green-200' },
  shopping: { icon: '🛍️', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  nightlife: { icon: '🌙', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  transport: { icon: '🚗', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  rest: { icon: '😴', color: 'bg-gray-100 text-gray-700 border-gray-200' },
}

export default function StopCard({ stop, dayIndex, stopIndex, totalStops, onRemove, onReorder }) {
  const config = CATEGORY_CONFIG[stop.category] || CATEGORY_CONFIG.culture

  return (
    <div className="group relative flex gap-3 sm:gap-4 py-3 px-3 sm:px-4 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors duration-150">
      {/* Timeline connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${config.color} border flex items-center justify-center text-base sm:text-lg`}>
          {config.icon}
        </div>
        {stopIndex < totalStops - 1 && (
          <div className="w-0.5 flex-1 mt-1 bg-surface-200 min-h-[20px]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-surface-900 dark:text-surface-100 text-sm sm:text-base leading-snug">
              {stop.name}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              {stop.time && (
                <span className="text-xs text-surface-500 font-medium">{stop.time}</span>
              )}
              {stop.time && stop.duration && (
                <span className="text-surface-300">·</span>
              )}
              {stop.duration && (
                <span className="text-xs text-surface-400">{stop.duration}</span>
              )}
            </div>
          </div>

          {/* Actions — visible on hover / always on mobile */}
          <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onReorder(dayIndex, stopIndex, -1)}
              disabled={stopIndex === 0}
              className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Move up"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => onReorder(dayIndex, stopIndex, 1)}
              disabled={stopIndex === totalStops - 1}
              className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Move down"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => onRemove(dayIndex, stop.id)}
              className="p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Remove stop"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {stop.description && (
          <p className="mt-1.5 text-sm text-surface-600 leading-relaxed">
            {stop.description}
          </p>
        )}

        {stop.tips && (
          <div className="mt-2 flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg bg-accent-50 border border-accent-100">
            <span className="text-xs flex-shrink-0 mt-0.5">💡</span>
            <span className="text-xs text-accent-700">{stop.tips}</span>
          </div>
        )}
      </div>
    </div>
  )
}
