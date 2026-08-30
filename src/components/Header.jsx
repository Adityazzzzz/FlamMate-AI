export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
      {/* Vector art decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating circles */}
        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-accent-400/10" />
        <div className="absolute top-12 right-20 w-24 h-24 rounded-full bg-accent-300/15" />
        <div className="absolute -bottom-6 left-1/3 w-32 h-32 rounded-full bg-primary-400/20" />
        
        {/* Geometric lines */}
        <svg className="absolute top-0 right-0 w-64 h-full opacity-10" viewBox="0 0 256 128" fill="none">
          <path d="M200 0L256 64L200 128" stroke="currentColor" strokeWidth="2" className="text-accent-300" />
          <path d="M180 0L236 64L180 128" stroke="currentColor" strokeWidth="1.5" className="text-accent-400" />
          <path d="M160 0L216 64L160 128" stroke="currentColor" strokeWidth="1" className="text-accent-500" />
        </svg>
        
        {/* Grid dots */}
        <svg className="absolute bottom-0 left-0 w-48 h-24 opacity-10" viewBox="0 0 192 96">
          {Array.from({ length: 48 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 8) * 24 + 12}
              cy={Math.floor(i / 8) * 16 + 8}
              r="1.5"
              fill="currentColor"
              className="text-accent-200"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-3">
          {/* Logo icon */}
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              WanderPlan AI
            </h1>
            <p className="text-sm text-primary-200/80 hidden sm:block">
              Describe your dream trip — get an interactive itinerary
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
