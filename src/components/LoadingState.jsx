export default function LoadingState({ onCancel }) {
  return (
    <div className="space-y-6 py-4">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-64 bg-surface-200 dark:bg-surface-700 rounded-lg animate-pulse" />
        <div className="h-4 w-96 max-w-full bg-surface-100 dark:bg-surface-800 rounded animate-pulse" />
        <div className="h-4 w-40 bg-surface-100 dark:bg-surface-800 rounded animate-pulse" />
      </div>

      {/* Day card skeletons */}
      {[1, 2, 3].map((day) => (
        <div
          key={day}
          className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 overflow-hidden"
          style={{ animationDelay: `${day * 150}ms` }}
        >
          {/* Day header skeleton */}
          <div className="flex items-center gap-3 px-6 py-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-5 w-32 bg-surface-200 dark:bg-surface-700 rounded animate-pulse" />
              <div className="h-3 w-16 bg-surface-100 dark:bg-surface-800 rounded animate-pulse" />
            </div>
          </div>

          {/* Stop skeletons */}
          <div className="px-6 pb-4 border-t border-surface-100 dark:border-surface-800 space-y-3 pt-3">
            {[1, 2, 3].map((stop) => (
              <div key={stop} className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-40 bg-surface-200 dark:bg-surface-700 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-surface-100 dark:bg-surface-800 rounded animate-pulse" />
                  <div className="h-3 w-full bg-surface-50 dark:bg-surface-800/50 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Planning message */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
          </svg>
          <span className="text-sm font-medium">AI is planning your trip...</span>
        </div>

        <button
          onClick={onCancel}
          className="text-sm text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 underline transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
