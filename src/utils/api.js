const API_BASE = '/api'
const TIMEOUT_MS = 30000 // 30 second timeout

/**
 * Makes a request to the backend API with timeout and abort support
 */
export async function generateTrip(message, existingItinerary = null, signal = null) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  // Allow external abort signal to also cancel the request
  if (signal) {
    signal.addEventListener('abort', () => controller.abort())
  }

  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, existingItinerary }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const error = new Error(errorData.error || `Server error (${response.status})`)
      error.code = errorData.code || 'UNKNOWN_ERROR'
      error.status = response.status
      throw error
    }

    const data = await response.json()
    return data
  } catch (err) {
    clearTimeout(timeoutId)
    
    if (err.name === 'AbortError') {
      const error = new Error('Request timed out. Please try again.')
      error.code = 'TIMEOUT'
      throw error
    }

    if (err.code) throw err // Already categorized

    // Network error
    const error = new Error('Network error. Check your connection and try again.')
    error.code = 'NETWORK_ERROR'
    throw error
  }
}
