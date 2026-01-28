import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar({ role = 'government' }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleBack(e){
    e.preventDefault()
    try{ logout() }catch(e){}
    navigate('/')
  }

  return (
    <aside className="w-32 sm:w-40 bg-navy-royal text-on-gradient p-4 flex flex-col transition-all">
      <nav className="flex-1 flex flex-col gap-3 text-sm">
        {/* Back to Home removed per request */}

        <NavLink to="/gov" end className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">Dashboard</div>
          </div>
        </NavLink>

        <NavLink to="/gov/users" className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">User & Identity Management</div>
          </div>
        </NavLink>

        <NavLink to="/gov/wallets" className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">Wallet Oversight</div>
          </div>
        </NavLink>

        <NavLink to="/gov/transactions" className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">Transactions</div>
          </div>
        </NavLink>

        <NavLink to="/gov/merchants" className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">Merchant System</div>
          </div>
        </NavLink>

        <NavLink to="/gov/subsidies" className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">Government Subsidy Management</div>
          </div>
        </NavLink>

        <NavLink to="/gov/admin" className={({isActive})=> `btn-fill flex items-start gap-3 px-3 py-2 rounded transition hover:bg-white/5 hover:scale-105 transform ${isActive? 'font-semibold bg-white/10':'opacity-90'}`}>
          <div>
            <div className="font-semibold">Admin Utilities</div>
          </div>
        </NavLink>
      </nav>
    </aside>
  )
}
