import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Itinerary from './components/Itinerary'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import RefineInput from './components/RefineInput'
import SavedSessions from './components/SavedSessions'
import useTripPlanner from './hooks/useTripPlanner'
import useLocalStorage from './hooks/useLocalStorage'
import useDarkMode from './hooks/useDarkMode'

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
    retry,
  } = useTripPlanner()

  const { sessions, saveSession, deleteSession } = useLocalStorage()
  const { isDark, toggle: toggleDark } = useDarkMode()

  const handleSave = () => {
    if (itinerary) saveSession(itinerary)
  }

  // Show the full-screen hero when idle (no itinerary yet)
  const showHero = isIdle && !isLoading

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-surface-950' : 'bg-surface-50'}`}>
      <Header isDark={isDark} onToggleDark={toggleDark} />

      {/* Full-screen Hero landing */}
      {showHero && (
        <>
          <HeroSection onSubmit={generate} isLoading={isLoading} />
          {/* Saved sessions below the hero */}
          {sessions.length > 0 && (
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 -mt-6 pb-12">
              <SavedSessions
                sessions={sessions}
                onLoad={loadItinerary}
                onDelete={deleteSession}
              />
            </div>
          )}
        </>
      )}

      {/* Results / Loading / Error views */}
      {!showHero && (
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-24 pb-10">
          {isLoading && <LoadingState onCancel={cancel} />}

          {isError && (
            <ErrorState error={error} onRetry={retry} />
          )}

          {isSuccess && itinerary && (
            <>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={reset}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isDark
                      ? 'text-surface-300 bg-surface-800 hover:bg-surface-700 border border-surface-700'
                      : 'text-surface-600 bg-surface-100 hover:bg-surface-200 border border-surface-200'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  New Trip
                </button>
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
        </main>
      )}

      {/* Footer */}
      {!showHero && (
        <footer className={`border-t py-4 text-center text-xs ${
          isDark ? 'border-surface-800 text-surface-500' : 'border-surface-200 text-surface-400'
        }`}>
          Built with React + Gemini AI · WanderPlan AI
        </footer>
      )}
    </div>
  )
}
