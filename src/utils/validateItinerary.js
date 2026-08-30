const VALID_CATEGORIES = ['food', 'culture', 'adventure', 'nature', 'shopping', 'nightlife', 'transport', 'rest']

/**
 * Validates a single stop object and fills in defaults for missing fields
 */
function validateStop(stop, index) {
  if (!stop || typeof stop !== 'object') return null

  return {
    id: stop.id || `stop-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    name: typeof stop.name === 'string' && stop.name.trim() ? stop.name.trim() : `Stop ${index + 1}`,
    time: typeof stop.time === 'string' ? stop.time.trim() : '',
    duration: typeof stop.duration === 'string' ? stop.duration.trim() : '',
    description: typeof stop.description === 'string' ? stop.description.trim() : '',
    category: VALID_CATEGORIES.includes(stop.category) ? stop.category : 'culture',
    tips: typeof stop.tips === 'string' ? stop.tips.trim() : '',
  }
}

/**
 * Validates a single day object
 */
function validateDay(day, index) {
  if (!day || typeof day !== 'object') return null

  const stops = Array.isArray(day.stops)
    ? day.stops.map((s, i) => validateStop(s, i)).filter(Boolean)
    : []

  if (stops.length === 0) return null

  return {
    day: typeof day.day === 'number' ? day.day : index + 1,
    title: typeof day.title === 'string' && day.title.trim() ? day.title.trim() : `Day ${index + 1}`,
    stops,
  }
}

/**
 * Validates the full itinerary object.
 * Returns { valid: true, itinerary } or { valid: false, error }
 */
export function validateItinerary(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Response is not an object' }
  }

  // Check if the itinerary is nested inside an "itinerary" key
  const itinerary = data.itinerary || data

  if (!Array.isArray(itinerary.days) || itinerary.days.length === 0) {
    return { valid: false, error: 'No days found in the itinerary' }
  }

  const validDays = itinerary.days.map((d, i) => validateDay(d, i)).filter(Boolean)

  if (validDays.length === 0) {
    return { valid: false, error: 'No valid days with stops found' }
  }

  return {
    valid: true,
    itinerary: {
      tripTitle: typeof itinerary.tripTitle === 'string' && itinerary.tripTitle.trim()
        ? itinerary.tripTitle.trim()
        : 'Your Trip',
      summary: typeof itinerary.summary === 'string' ? itinerary.summary.trim() : '',
      days: validDays,
    },
  }
}
