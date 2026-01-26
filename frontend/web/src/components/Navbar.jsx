import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar({ onToggleSidebar, hideLinks=false }) {
  const { user, logout } = useAuth()

  const displayName = user?.name || 'John Doe'
  const phone = user?.phone || user?.email || ''

  return (
    <motion.header initial={{y:-8, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.36}} className="bg-navy-royal text-on-gradient">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <button className="text-on-gradient" onClick={onToggleSidebar} aria-label="Toggle sidebar">
            ☰
          </button>
          <div className="flex items-center gap-3">
            <img src="/src/assets/logo.png" alt="e-SIKKA" className="h-8 w-8" />
            <h1 className="text-lg font-semibold">e-SIKKA</h1>
          </div>
          {!hideLinks && (
            <nav className="ml-6 flex items-center gap-4 text-sm opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/about" className="hover:underline">About e-Sikka</Link>
              <Link to="/how-it-works" className="hover:underline">How it works</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </nav>
          )}
        </div>

        <nav className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right phone-icon">
                <div className="text-sm font-medium">{displayName}</div>
                <div className="text-xs opacity-80"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-1"><path d="M22 16.92V19a2 2 0 0 1-2 2 19 19 0 0 1-8.63-2.7 19 19 0 0 1-6-6A19 19 0 0 1 3 4a2 2 0 0 1 2-2h2.09a2 2 0 0 1 2 1.72c.12 1.21.38 2.39.76 3.5a2 2 0 0 1-.45 2.11L8.91 9.91" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{phone}</div>
              </div>
              <img src="/src/assets/profile-photo.png" alt="profile" className="h-10 w-10 rounded-full object-cover" onError={(e)=>{e.currentTarget.src='/src/assets/logo.png'}} />
              <button
                onClick={() => logout()}
                title="Logout"
                className="p-2 rounded border border-white/20 text-on-gradient/90 hover:bg-white/5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-3 py-1 btn-fill btn-primary text-sm">Login</Link>
          )}
        </nav>
      </div>
    </motion.header>
  )
}
