import { useState } from 'react'

const EXAMPLE_PROMPTS = [
  "3-day trip to Tokyo for a first-time visitor who loves food and temples",
  "Weekend getaway to Goa with beaches and nightlife",
  "5-day family trip to Rajasthan covering Jaipur, Udaipur, and Jodhpur",
  "2-day adventure trip to Manali with trekking and paragliding",
]

export default function TripInput({ onSubmit, isLoading }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    onSubmit(trimmed)
  }

  const handleExampleClick = (prompt) => {
    setText(prompt)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input area */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your dream trip... Where do you want to go? How many days? What do you enjoy?"
              className="w-full min-h-[120px] sm:min-h-[140px] p-4 sm:p-5 rounded-2xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:border-primary-400 resize-none transition-colors duration-200 text-base leading-relaxed"
              disabled={isLoading}
              rows={4}
            />
            
            {/* Character count */}
            <div className="absolute bottom-3 right-3 text-xs text-surface-400">
              {text.length > 0 && `${text.length} chars`}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
              Planning your trip...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Plan My Trip
            </>
          )}
        </button>
      </form>

      {/* Example prompts */}
      {!isLoading && !text && (
        <div className="mt-6">
          <p className="text-sm text-surface-500 mb-3 font-medium">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(prompt)}
                className="px-3 py-1.5 text-sm rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 border border-surface-200 dark:border-surface-700 hover:border-primary-200 transition-colors duration-150"
              >
                {prompt.length > 50 ? prompt.slice(0, 50) + '…' : prompt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
