import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <main className="container py-12 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
      <div className="mt-6">
        <Link to="/" className="px-4 py-2 border rounded">Return home</Link>
      </div>
    </main>
  )
}
