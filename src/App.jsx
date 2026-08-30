import Header from './components/Header'
import TripInput from './components/TripInput'
import EmptyState from './components/EmptyState'
import Itinerary from './components/Itinerary'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import RefineInput from './components/RefineInput'
import useTripPlanner from './hooks/useTripPlanner'

export default function App() {
  const {
    status,
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
  } = useTripPlanner()

  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {/* Input section — always visible when idle or has error, hidden when loading/success */}
        {(isIdle || isError) && (
          <TripInput onSubmit={generate} isLoading={isLoading} />
        )}

        {/* States */}
        {isLoading && <LoadingState onCancel={cancel} />}
        
        {isError && <ErrorState error={error} onRetry={() => generate(error?.lastMessage || '')} />}
        
        {isSuccess && itinerary && (
          <>
            <Itinerary
              itinerary={itinerary}
              onRemoveStop={removeStop}
              onReorderStop={reorderStop}
              onReset={reset}
            />
            <RefineInput onRefine={refine} isLoading={isLoading} />
          </>
        )}

        {isIdle && !isLoading && <EmptyState />}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 py-4 text-center text-xs text-surface-400">
        Built with React + Gemini AI · WanderPlan AI
      </footer>
    </div>
  )
}
