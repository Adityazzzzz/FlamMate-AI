# 🗺️ WanderPlan AI — Trip Planner

An interactive AI-powered trip planner built with React. Describe your dream trip in plain text, and the AI generates a structured day-by-day itinerary that you can expand, reorder, remove stops from, and refine with follow-up prompts.

**Built for the Flam AI Frontend Internship Assignment.**

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan) ![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-orange)

---

## ✨ Features

### Core
- **Free-form text input** — describe any trip in natural language
- **Structured AI output** — AI returns JSON parsed into interactive UI cards
- **Day-by-day itinerary** — expandable/collapsible day cards with categorized stops
- **Interactive controls** — reorder stops (up/down), remove stops, expand/collapse all
- **Refinement loop** — modify existing itinerary with follow-up prompts (e.g., "add more food stops")
- **Error handling** — handles malformed JSON, wrong schema, empty responses, timeouts, rate limits, network errors
- **Loading skeleton** — beautiful skeleton UI matching the itinerary layout
- **Mobile responsive** — works on all screen sizes with touch-friendly targets

### Stretch Goals Implemented
- ✅ Different block types (category-based cards with icons: 🍜 food, 🏛️ culture, 🏔️ adventure, etc.)
- ✅ Refinement loop (follow-up prompts that edit existing itinerary)
- ✅ Save & reload sessions (localStorage persistence, up to 10 saved trips)
- ✅ Dark mode (toggle + system preference detection)
- ✅ Animations (CSS transitions on expand/collapse, hover effects)

---

## 🚀 Setup

### Prerequisites
- Node.js 18+ 
- A [Gemini API key](https://aistudio.google.com/apikey) (free, no credit card)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd flam-assignment

# Install dependencies
npm install

# Create .env file with your Gemini API key
cp .env.example .env
# Edit .env and add your key: GEMINI_API_KEY=your_key_here

# Start the backend server (terminal 1)
npm run server

# Start the frontend dev server (terminal 2)
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🏗️ Architecture

```
├── server/                 # Express backend (API proxy)
│   ├── index.js           # Express server, /api/generate endpoint
│   ├── gemini.js          # Gemini SDK wrapper
│   └── prompts.js         # System prompt + user prompt builders
│
├── src/
│   ├── components/        # React UI components
│   │   ├── Header.jsx     # App header with vector art + dark mode toggle
│   │   ├── TripInput.jsx  # Free-form textarea with example prompts
│   │   ├── EmptyState.jsx # Landing state with vector SVG illustration
│   │   ├── Itinerary.jsx  # Full trip display wrapper
│   │   ├── DayCard.jsx    # Expandable day with stops
│   │   ├── StopCard.jsx   # Individual stop with actions
│   │   ├── LoadingState.jsx   # Skeleton loading UI
│   │   ├── ErrorState.jsx     # Error display with categorized messages
│   │   ├── RefineInput.jsx    # Follow-up prompt input
│   │   └── SavedSessions.jsx  # Recent trips sidebar
│   │
│   ├── hooks/
│   │   ├── useTripPlanner.js  # Core state machine (idle/loading/success/error)
│   │   ├── useLocalStorage.js # Session persistence
│   │   └── useDarkMode.js     # Theme toggle
│   │
│   ├── utils/
│   │   ├── api.js             # Fetch wrapper with timeout + abort
│   │   └── validateItinerary.js # Schema validation + defaults
│   │
│   ├── App.jsx            # Root component wiring everything
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind + custom theme
│
├── vite.config.js         # Vite config with Tailwind + API proxy
└── .env.example           # Environment variables template
```

### Key Design Decisions

1. **State Machine Pattern** — `useTripPlanner` manages a clean `idle → loading → success | error` state machine with request deduplication and stale response prevention via request IDs.

2. **API Key Security** — The Gemini API key lives server-side in Express. The frontend only hits `/api/generate`. In production, this prevents key exposure.

3. **Defensive JSON Parsing** — The server tries `JSON.parse()` first, then falls back to regex extraction of JSON from markdown code fences. The frontend then validates the schema with `validateItinerary()`, filling defaults for any missing fields.

4. **Request ID Guard** — Each request gets a monotonically increasing ID. If a newer request fires before the old one completes, the old response is discarded — preventing stale data from overwriting fresher results.

5. **AbortController Timeout** — API calls have a 30s timeout via `AbortController`. Users can also cancel manually via the loading state's cancel button.

---

## 🤖 AI Usage Note

This project was built with the assistance of **Antigravity (Claude)** AI coding assistant. The AI helped with:
- Scaffolding the project structure and component architecture
- Writing boilerplate code for components, hooks, and server endpoints
- Generating SVG vector art illustrations
- Implementing Tailwind CSS styling and dark mode

All code was reviewed and understood by the developer. The architecture decisions (state machine pattern, request deduplication, defensive parsing) are intentional design choices I can explain and modify.

---

## ⚠️ Known Limitations

1. **No streaming** — Responses are fetched in full, not streamed. For long itineraries, there's a noticeable wait.
2. **No drag-and-drop** — Reordering uses up/down buttons instead of drag-and-drop (simpler, more accessible, works on mobile).
3. **No cross-day reordering** — Stops can only be reordered within their day, not moved between days.
4. **LocalStorage limits** — Session storage is capped at 10 trips. Very large itineraries may hit browser storage limits.
5. **No deployment** — Currently runs locally only. Could be deployed to Vercel (frontend) + Railway (backend).

---

## ⏱️ Time Spent

| Phase | Time |
|-------|------|
| Planning & architecture | ~30 min |
| Backend + Gemini integration | ~45 min |
| Core UI components | ~2 hrs |
| Error handling & validation | ~1 hr |
| Dark mode + polish | ~45 min |
| Testing & debugging | ~30 min |
| README + docs | ~20 min |
| **Total** | **~5.5 hrs** |

---

## 📄 License

MIT
