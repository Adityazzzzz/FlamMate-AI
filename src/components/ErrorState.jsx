const ERROR_MESSAGES = {
  TIMEOUT: {
    title: 'Request timed out',
    suggestion: 'The AI took too long to respond. Try a simpler trip description.',
    icon: '⏳',
  },
  NETWORK_ERROR: {
    title: 'Connection failed',
    suggestion: 'Check your internet connection and try again.',
    icon: '📡',
  },
  RATE_LIMIT: {
    title: 'Too many requests',
    suggestion: 'Please wait a moment before trying again.',
    icon: '🚦',
  },
  AUTH_ERROR: {
    title: 'API key error',
    suggestion: 'The Gemini API key may be invalid. Check the server .env file.',
    icon: '🔑',
  },
  PARSE_ERROR: {
    title: 'Bad AI response',
    suggestion: 'The AI returned data we couldn\'t understand. Try again — results vary.',
    icon: '🤖',
  },
  VALIDATION_ERROR: {
    title: 'Invalid itinerary data',
    suggestion: 'The AI response didn\'t match the expected format. Try rephrasing your trip.',
    icon: '📋',
  },
  SERVER_ERROR: {
    title: 'Server error',
    suggestion: 'Something went wrong on our end. Please try again.',
    icon: '⚙️',
  },
}

export default function ErrorState({ error, onRetry }) {
  const config = ERROR_MESSAGES[error?.code] || ERROR_MESSAGES.SERVER_ERROR

  return (
    <div className="flex flex-col items-center py-12 px-4">
      {/* Vector art error illustration */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
          <span className="text-4xl">{config.icon}</span>
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-red-200 border-dashed animate-[spin_8s_linear_infinite]" />
      </div>

      <h3 className="text-lg font-display font-bold text-surface-800 mb-1 text-center">
        {config.title}
      </h3>
      <p className="text-sm text-surface-500 text-center max-w-sm mb-1">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <p className="text-xs text-surface-400 text-center max-w-sm mb-6">
        {config.suggestion}
      </p>

      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/25 active:scale-[0.98]"
      >
        Try Again
      </button>
    </div>
  )
}
