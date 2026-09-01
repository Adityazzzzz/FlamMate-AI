export default function Header({ showHero }) {
  // Dynamic color classes based on background
  const textColor = showHero ? 'text-white' : 'text-surface-900'
  const navColor = showHero ? 'text-white/90 hover:text-white' : 'text-surface-600 hover:text-surface-900'
  const btnStyle = showHero
    ? 'bg-white hover:bg-white/90 text-surface-900'
    : 'bg-surface-900 hover:bg-surface-800 text-white'

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="flex items-center justify-between">
          <span className={`${textColor} font-display font-medium text-sm tracking-widest uppercase transition-colors duration-300`}>
            WanderPlan
          </span>

          <div className="flex items-center gap-6 sm:gap-8">
            <span className={`hidden md:inline text-sm ${navColor} cursor-pointer transition-colors duration-300`}>
              How it works
            </span>
            <span className={`hidden md:inline text-sm ${navColor} cursor-pointer transition-colors duration-300`}>
              Trips
            </span>
            <span className={`hidden md:inline text-sm ${navColor} cursor-pointer transition-colors duration-300`}>
              Sign in
            </span>

            <a
              href="#trip-input"
              className={`inline-flex px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${btnStyle}`}
            >
              Start planning
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}