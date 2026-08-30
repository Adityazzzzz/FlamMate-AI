import { useState } from 'react'

export default function RefineInput({ onRefine, isLoading }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    onRefine(trimmed)
    setText('')
  }

  return (
    <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
      <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-3">
        ✨ Refine your itinerary
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Add more food stops, make day 2 shorter..."
          className="flex-1 px-4 py-2.5 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:border-primary-400 transition-colors text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm flex-shrink-0"
        >
          {isLoading ? 'Refining...' : 'Refine'}
        </button>
      </form>

      {/* Quick refinement suggestions */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {['Add more food spots', 'Make it more budget-friendly', 'Add free activities', 'More adventure activities'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setText(suggestion)}
            className="px-2.5 py-1 text-xs rounded-lg bg-surface-50 text-surface-500 hover:bg-accent-50 hover:text-accent-700 border border-surface-200 hover:border-accent-200 transition-colors"
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
