export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Minimal Text Logo */}
          <span className="text-white font-display font-medium text-sm tracking-widest uppercase">
            WanderPlan
          </span>

          {/* Right side nav */}
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="hidden md:inline text-sm text-white/90 hover:text-white cursor-pointer transition-colors">
              How it works
            </span>
            <span className="hidden md:inline text-sm text-white/90 hover:text-white cursor-pointer transition-colors">
              Trips
            </span>
            <span className="hidden md:inline text-sm text-white/90 hover:text-white cursor-pointer transition-colors">
              Sign in
            </span>
            
            <a
              href="#trip-input"
              className="inline-flex px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-surface-900 text-sm font-medium transition-all duration-200"
            >
              Start planning
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}