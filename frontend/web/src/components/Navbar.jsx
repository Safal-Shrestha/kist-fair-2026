import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar({ onToggleSidebar, hideLinks=false, open=false, logoSize='large' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.name || 'John Doe'
  const phone = user?.phone || user?.email || ''

  return (
    <motion.header initial={{y:-8, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.36}} className="bg-navy-royal text-on-gradient border-b border-white/30">
      <div className="mx-auto px-2 flex items-center h-14"> 
        {/* left: hamburger + logo */}
        <div className="flex items-center gap-4">
            {onToggleSidebar && (
            <motion.button whileHover={{ scale: 1.06, rotate: 6 }} className="text-on-gradient p-2 rounded hover:bg-white/5 transition" onClick={onToggleSidebar} aria-label="Toggle sidebar">
              <motion.svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" whileHover={{ rotate: 12 }} transition={{ duration: 0.18 }} className="inline-block">
                <rect x="0" y="1" width="20" height="2" rx="1" fill="currentColor" />
                <rect x="0" y="6" width="20" height="2" rx="1" fill="currentColor" />
                <rect x="0" y="11" width="20" height="2" rx="1" fill="currentColor" />
              </motion.svg>
            </motion.button>
          )}

          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="e-SIKKA" className={logoSize === 'small' ? 'h-6 w-6 sm:h-8 sm:w-8' : 'h-12 w-12 sm:h-14 sm:w-14'} />
            <h1 className="text-lg md:text-xl font-semibold">e-SIKKA</h1>
          </div>
        </div>

        {/* right: nav links then user info */}
        <div className="ml-auto flex items-center gap-6">
          {!hideLinks && (
            <nav className="flex items-center gap-4 text-sm opacity-90">
              <Link to="/" className="px-3 py-1 btn">Home</Link>
              <Link to="/about" className="px-3 py-1 btn">About e-Sikka</Link>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right mr-2">
                  <div className="text-sm font-medium">{displayName}</div>
                  <div className="text-xs opacity-80 flex items-center justify-end mt-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-1"><path d="M22 16.92V19a2 2 0 0 1-2 2 19 19 0 0 1-8.63-2.7 19 19 0 0 1-6-6A19 19 0 0 1 3 4a2 2 0 0 1 2-2h2.09a2 2 0 0 1 2 1.72c.12 1.21.38 2.39.76 3.5a2 2 0 0 1-.45 2.11L8.91 9.91" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{phone}</div>
                </div>
                <button
                  onClick={async () => { await logout(); navigate('/') }}
                  title="Logout"
                  className="p-2 rounded border border-white/20 text-on-gradient/90 hover:bg-white/5 no-underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-1 btn-fill btn-primary text-sm">Login</Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
