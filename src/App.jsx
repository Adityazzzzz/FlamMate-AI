import Header from './components/Header'
import TripInput from './components/TripInput'
import EmptyState from './components/EmptyState'
import Itinerary from './components/Itinerary'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import RefineInput from './components/RefineInput'
import SavedSessions from './components/SavedSessions'
import useTripPlanner from './hooks/useTripPlanner'
import useLocalStorage from './hooks/useLocalStorage'

export default function App() {
  const {
    itinerary,
    error,
    isLoading,
    isIdle,
    isSuccess,
    isError,
    generate,
    refine,
    cancel,
    reset,
    removeStop,
    reorderStop,
    loadItinerary,
  } = useTripPlanner()

  const { sessions, saveSession, deleteSession } = useLocalStorage()

  const handleSave = () => {
    if (itinerary) saveSession(itinerary)
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {/* Input section */}
        {(isIdle || isError) && (
          <>
            <TripInput onSubmit={generate} isLoading={isLoading} />
            {isIdle && sessions.length > 0 && (
              <SavedSessions
                sessions={sessions}
                onLoad={loadItinerary}
                onDelete={deleteSession}
              />
            )}
          </>
        )}

        {/* States */}
        {isLoading && <LoadingState onCancel={cancel} />}
        
        {isError && <ErrorState error={error} onRetry={() => generate('')} />}
        
        {isSuccess && itinerary && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Trip
              </button>
            </div>
            <Itinerary
              itinerary={itinerary}
              onRemoveStop={removeStop}
              onReorderStop={reorderStop}
              onReset={reset}
            />
            <RefineInput onRefine={refine} isLoading={isLoading} />
          </>
        )}

        {isIdle && !isLoading && sessions.length === 0 && <EmptyState />}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 py-4 text-center text-xs text-surface-400">
        Built with React + Gemini AI · WanderPlan AI
      </footer>
    </div>
  )
}
