const ERROR_MESSAGES = {
  TIMEOUT: { title: 'Request timed out', suggestion: 'The AI took too long to respond. Try a simpler trip description.', icon: '⏳' },
  NETWORK_ERROR: { title: 'Connection failed', suggestion: 'Check your internet connection and try again.', icon: '📡' },
  RATE_LIMIT: { title: 'Too many requests', suggestion: 'Please wait a moment before trying again.', icon: '🚦' },
  AUTH_ERROR: { title: 'API key error', suggestion: 'The Gemini API key may be invalid. Check the server .env file.', icon: '🔑' },
  PARSE_ERROR: { title: 'Bad AI response', suggestion: 'The AI returned data we couldn\'t understand. Try again — results vary.', icon: '🤖' },
  VALIDATION_ERROR: { title: 'Invalid itinerary data', suggestion: 'The AI response didn\'t match the expected format. Try rephrasing your trip.', icon: '📋' },
  SERVER_ERROR: { title: 'Server error', suggestion: 'Something went wrong on our end. Please try again.', icon: '⚙️' },
}

export default function ErrorState({ error, onRetry }) {
  const config = ERROR_MESSAGES[error?.code] || ERROR_MESSAGES.SERVER_ERROR

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 fade-in">
      {/* Clean, minimal icon block */}
      <div className="w-16 h-16 mb-6 rounded-2xl bg-red-50/50 text-red-500 flex items-center justify-center text-2xl border border-red-100">
        {config.icon}
      </div>

      <h3 className="text-2xl font-display font-medium text-surface-900 mb-2 text-center">
        {config.title}
      </h3>
      
      <p className="text-surface-500 text-center max-w-md mb-8 font-light leading-relaxed">
        {error?.message || config.suggestion}
      </p>

      <button
        onClick={onRetry}
        className="px-8 py-3 rounded-full font-medium text-white bg-surface-900 hover:bg-surface-800 transition-all duration-200 active:scale-95 shadow-md"
      >
        Try Again
      </button>
    </div>
  )
}