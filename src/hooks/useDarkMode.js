import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'wanderplan-theme'

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark') return true
      if (stored === 'light') return false
    } catch {}
    // Fall back to system preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    } catch {}
  }, [isDark])

  const toggle = useCallback(() => setIsDark((prev) => !prev), [])

  return { isDark, toggle }
}
