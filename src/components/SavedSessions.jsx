export default function SavedSessions({ sessions, onLoad, onDelete }) {
  if (!sessions || sessions.length === 0) return null

  const formatDate = (iso) => {
    try {
      const d = new Date(iso)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    } catch {
      return ''
    }
  }

  return (
    <div className="mt-6 pt-6 border-t border-surface-200">
      <h3 className="text-sm font-semibold text-surface-600 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        Recent Trips
      </h3>
      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-surface-200 hover:border-primary-200 hover:bg-primary-50/30 transition-colors cursor-pointer"
            onClick={() => onLoad(session.itinerary)}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-surface-800 truncate">
                {session.tripTitle}
              </p>
              <p className="text-xs text-surface-400 mt-0.5">
                {formatDate(session.savedAt)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(session.id)
              }}
              className="flex-shrink-0 p-1.5 rounded-lg text-surface-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
              title="Delete session"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
