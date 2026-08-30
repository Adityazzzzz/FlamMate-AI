import { useState } from 'react'

const QUICK_ACTIONS = [
  { icon: '✨', label: 'Create a new trip' },
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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background — layered gradient that mimics a sunset landscape */}
      <div className="absolute inset-0">
        {/* Base gradient — warm sunset tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-800/90 via-orange-700/60 to-purple-400/80" />
        
        {/* Landscape SVG overlay for vector art feel */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ height: '55%' }}>
          {/* Far hills */}
          <path d="M0 200 Q200 120 400 180 Q600 100 800 160 Q1000 80 1200 140 Q1350 100 1440 130 L1440 400 L0 400Z" fill="rgba(34, 85, 50, 0.6)" />
          {/* Mid hills */}
          <path d="M0 260 Q150 200 350 240 Q500 180 700 230 Q900 170 1100 220 Q1300 180 1440 210 L1440 400 L0 400Z" fill="rgba(45, 100, 55, 0.7)" />
          {/* Near hills */}
          <path d="M0 310 Q200 270 400 300 Q600 260 800 290 Q1000 250 1200 280 Q1400 260 1440 275 L1440 400 L0 400Z" fill="rgba(30, 70, 40, 0.85)" />
          {/* Foreground */}
          <path d="M0 350 Q300 330 600 345 Q900 325 1200 340 Q1350 335 1440 340 L1440 400 L0 400Z" fill="rgba(20, 50, 30, 0.9)" />
        </svg>

        {/* Sun/glow */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-radial from-amber-300/40 via-orange-400/10 to-transparent blur-3xl" />
        
        {/* Purple/pink top tint like Luma */}
        <div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-b from-purple-500/30 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-pink-400/20 to-transparent" />

        {/* Subtle noise/grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12">
        {/* Hero text */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-5 sm:mb-6 drop-shadow-lg">
            Meet WanderPlan,
            <br />
            <span className="text-purple-200">your AI travel</span>
            <br />
            guide
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            An AI travel planner that turns your mood, dates, and budget into a calm, ready-to-follow route
          </p>
        </div>

        {/* Floating search input */}
        <div className="w-full max-w-2xl mb-6" id="trip-input">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 focus-within:bg-white/15 focus-within:border-white/30 focus-within:shadow-black/30">
              {/* Sparkle icon */}
              <div className="pl-4 sm:pl-5 flex-shrink-0">
                <svg className="w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
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
                className="flex-1 bg-transparent text-white placeholder:text-white/40 px-3 sm:px-4 py-4 sm:py-5 text-base sm:text-lg focus:outline-none"
                disabled={isLoading}
              />

              {/* Send button */}
              <div className="pr-2 sm:pr-3 flex-shrink-0">
                <button
                  type="submit"
                  disabled={!text.trim() || isLoading}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 active:scale-95"
                >
                  {isLoading ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick action pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl">
          {QUICK_ACTIONS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => handleQuickAction(label)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-sm hover:bg-white/20 hover:text-white hover:border-white/25 transition-all duration-200 disabled:opacity-50"
            >
              <span className="text-sm">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom fade into main content */}
      <div className="relative z-10 h-16 bg-gradient-to-b from-transparent to-surface-50 dark:to-surface-950" />
    </section>
  )
}
