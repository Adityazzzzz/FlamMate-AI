import { useState } from 'react'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        <div className="text-center text-surface-500 py-20">
          <p className="text-lg">App shell ready — components coming next!</p>
        </div>
      </main>
    </div>
  )
}
