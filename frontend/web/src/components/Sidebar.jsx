import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ role = 'government' }) {
  return (
    <aside className="w-64 bg-navy-royal text-on-gradient p-4 flex flex-col">
      <nav className="flex-1 flex flex-col gap-3 text-sm">
        <NavLink to={role === 'government' ? '/gov' : '/citizen'} className={({isActive})=> isActive? 'font-semibold underline':'opacity-90'}>Dashboard</NavLink>
        <NavLink to="/gov/departments" className={({isActive})=> isActive? 'font-semibold underline':'opacity-90'}>Government Department</NavLink>
        <NavLink to="/gov/budgets" className={({isActive})=> isActive? 'font-semibold underline':'opacity-90'}>Budget Allocation</NavLink>
        <NavLink to="/gov/accounts" className={({isActive})=> isActive? 'font-semibold underline':'opacity-90'}>Show All Existing Accounts</NavLink>
        <NavLink to="/gov/freeze" className={({isActive})=> isActive? 'font-semibold underline':'opacity-90'}>Account Freeze</NavLink>
      </nav>

      <div className="mt-6">
        <NavLink to="/" className="block px-3 py-2 bg-white/5 rounded text-sm text-on-gradient text-center">Back to Home</NavLink>
      </div>
    </aside>
  )
}
