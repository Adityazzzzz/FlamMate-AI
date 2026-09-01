import { useState } from 'react'

const QUICK_ACTIONS = [
  { icon: '+', label: 'Create a new trip' },
  { icon: '🧭', label: 'Inspire me where to go' },
  { icon: '🚗', label: 'Plan a road trip' },
  { icon: '⏰', label: 'Last-minute escape' },
]

export default function HeroSection({ onSubmit, isLoading }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    onSubmit(trimmed)
  }

  const handleQuickAction = (label) => {
    const prompts = {
      'Create a new trip': '',
      'Inspire me where to go': 'Surprise me with a unique 4-day trip to a beautiful destination. I enjoy culture, food, and scenic views.',
      'Plan a road trip': 'Plan a 5-day road trip from Mumbai to Goa with stops at interesting places along the way.',
      'Last-minute escape': 'Plan a spontaneous 2-day weekend getaway near Delhi. Budget-friendly and relaxing.',
    }
    const prompt = prompts[label]
    if (prompt) {
      setText(prompt)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/landscape.jpg")' }}
      >
        {/* Very subtle dark overlay so the image pops but text remains readable */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Soft bottom gradient to blend into the rest of the app */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-surface-50 dark:from-surface-950 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center mt-16">
        {/* Hero text */}
        <div className="text-center mb-12">
          <h1 className="font-display font-medium text-white text-5xl sm:text-6xl md:text-[80px] leading-[1.05] tracking-tight mb-6 drop-shadow-sm">
            Meet WanderPlan,<br />
            your AI travel<br />
            guide
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-md mx-auto leading-relaxed font-light drop-shadow-sm">
            An AI travel planner that turns your<br/>mood, dates, and budget into a<br/>calm, ready-to-follow route
          </p>
        </div>

        {/* Floating search input - Widened and softened */}
        <div className="w-full max-w-3xl mb-8" id="trip-input">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center bg-black/20 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl p-2 transition-all duration-300 focus-within:bg-black/30 focus-within:border-white/30">
              
              {/* Sparkle icon */}
              <div className="pl-6 flex-shrink-0">
                <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Plan a romantic 5-day trip to Rome for couples"
                className="flex-1 bg-transparent text-white placeholder:text-white/60 px-5 py-4 text-lg font-light focus:outline-none"
                disabled={isLoading}
              />

              {/* Send button - Matched to Luma's soft purple/pink */}
              <div className="pr-1 flex-shrink-0">
                <button
                  type="submit"
                  disabled={!text.trim() || isLoading}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 bg-[#b693b1] hover:bg-[#a682a1] text-white shadow-md active:scale-95"
                >
                  {isLoading ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick action pills - Refined layout */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl">
          {QUICK_ACTIONS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => handleQuickAction(label)}
              disabled={isLoading}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/10 backdrop-blur-xl border border-white/20 text-white/90 text-sm hover:bg-black/20 hover:text-white transition-all duration-200 disabled:opacity-50 font-light tracking-wide"
            >
              <span className="text-sm opacity-70">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}