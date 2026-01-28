import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function Login(){
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const valid = /^\d{10}$/.test(phone) && /^\d{4}$/.test(pin)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if(!valid){ setError('Please enter a valid phone number and 4-digit PIN'); return }
    try{
      // TODO: POST request to Supabase auth endpoint
      const user = await login(phone, pin, 'government')
      navigate('/gov')
    }catch(err){
      setError('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-navy-royal">
      <div className="flex-1 flex items-center justify-center">
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="w-full max-w-md bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <button aria-label="Back to home" onClick={()=>navigate('/')} className="p-2 rounded hover:bg-gray-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <h2 className="text-2xl font-semibold text-primary">Login</h2>
                <div className="w-8" />
              </div>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-700">Phone Number</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V19a2 2 0 0 1-2 2 19 19 0 0 1-8.63-2.7 19 19 0 0 1-6-6A19 19 0 0 1 3 4a2 2 0 0 1 2-2h2.09a2 2 0 0 1 2 1.72c.12 1.21.38 2.39.76 3.5a2 2 0 0 1-.45 2.11L8.91 9.91" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <input value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,''))} required type="tel" inputMode="numeric" pattern="\d*" maxLength={10} className="pl-10 w-full border rounded p-2" placeholder="10-digit phone" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700">PIN</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <input value={pin} onChange={(e)=>setPin(e.target.value.replace(/\D/g,'').slice(0,4))} required type="password" inputMode="numeric" maxLength={4} className="pl-10 w-full border rounded p-2" placeholder="4-digit PIN" />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <button type="submit" disabled={!valid} className="w-full px-4 py-2 rounded font-semibold btn-fill btn-primary" style={{opacity: valid?1:0.6}}>LOGIN</button>
          </div>

              </form>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
