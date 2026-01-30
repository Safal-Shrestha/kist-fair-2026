import React, { useEffect, useState } from 'react'
import { fetchBudgets, fetchTransactions, fetchUsers } from '../../services/api'
import CardStat from '../../components/CardStat'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'

const COLORS = ['#0b3a66', '#2fa44f', '#94a3b8']

import { motion } from 'framer-motion'
import { formatINR } from '../../utils/format'

export default function GovDashboard(){
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [users, setUsers] = useState([])

  // Filters
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [dateError, setDateError] = useState('')

  useEffect(()=>{
    async function load(){
      const b = await fetchBudgets()
      setBudgets(b)
      const t = await fetchTransactions()
      setTransactions(t)
      const u = await fetchUsers()
      setUsers(u)
    }
    load()
  },[])

  // derive lists for filters
  const departments = Array.from(new Set([...transactions.map(t=>t.department), ...budgets.map(b=>b.name)])).filter(Boolean)
  const categories = budgets.map(b=>b.name)

  // apply filters
  function inRange(dateStr){
    if(!startDate && !endDate) return true
    const d = new Date(dateStr)
    if(startDate){ const s = new Date(startDate); if(d < s) return false }
    if(endDate){ const e = new Date(endDate); if(d > e) return false }
    return true
  }

  const filteredTransactions = transactions.filter(t => {
    if(departmentFilter && t.department !== departmentFilter) return false
    return inRange(t.date)
  })

  const filteredBudgets = budgets.filter(b => {
    if(categoryFilter && b.name !== categoryFilter) return false
    return true
  })

  const totalAllocated = filteredBudgets.reduce((s,b)=>s+(b.allocated||0),0)
  const totalUsed = filteredBudgets.reduce((s,b)=>s+(b.used||0),0)

  const pieData = filteredBudgets.map(b=>({name:b.name, value:b.allocated}))

  // Mock revenue vs expense series
  const series = [
    { month: 'Jan', revenue: 120, expense: 90 },
    { month: 'Feb', revenue: 150, expense: 110 },
    { month: 'Mar', revenue: 170, expense: 130 },
  ]

  // Project progress mock
  const projects = [
    { name: 'Education', progress: 70 },
    { name: 'Health', progress: 45 },
    { name: 'Infra', progress: 55 },
  ]

  // Mock subsidies for demo notifications (would be fetched from API)
  const subsidies = [
    { id: 's1', userId: 1, category: 'Education', expiry: '2026-01-30' },
    { id: 's2', userId: 2, category: 'Health', expiry: '2026-02-05' },
  ]

  // notifications
  const frozenAccounts = users.filter(u=>u.status === 'frozen').length
  const now = new Date()
  const expiringSoon = subsidies.filter(s => {
    const d = new Date(s.expiry)
    const diff = (d - now) / (1000*60*60*24)
    return diff >=0 && diff <= 7
  }).length

  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="py-6">
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-xl font-semibold">{greet}, John Doe</h2>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-sm text-slate-700">Filters:</div>
            <label className="text-sm text-slate-600">Start:</label>
            <input type="date" value={startDate} onChange={e=>{ setStartDate(e.target.value); if(dateError) setDateError('') }} className="border rounded p-1 text-sm" />
            <label className="text-sm text-slate-600">End:</label>
            <input type="date" value={endDate} onChange={e=>{
              const v = e.target.value
              if(startDate && v && new Date(v) < new Date(startDate)){
                // enforce end >= start
                setEndDate(startDate)
                setDateError('End date cannot be before start date')
                setTimeout(()=>setDateError(''), 3000)
              } else {
                setEndDate(v)
                if(dateError) setDateError('')
              }
            }} className="border rounded p-1 text-sm" />
            {dateError && <div className="text-sm text-red-600 ml-1">{dateError}</div>}
            <select value={departmentFilter} onChange={e=>setDepartmentFilter(e.target.value)} className="border rounded p-1 text-sm">
              <option value="">All Departments</option>
              {departments.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="border rounded p-1 text-sm">
              <option value="">All Categories</option>
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={() => { setStartDate(''); setEndDate(''); setDepartmentFilter(''); setCategoryFilter('') }} className="text-sm px-2 py-1 btn">Clear</button>
          </div>
        </div>
        
        <div className="mt-3 flex gap-3 flex-wrap">
          <div className="px-3 py-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">{expiringSoon} subsidies expiring this week</div>
          <div className="px-3 py-2 bg-red-50 border-l-4 border-red-400 text-red-800 rounded">{frozenAccounts} frozen accounts pending review</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
        <CardStat title="Total Allocated" value={formatINR(totalAllocated)} />
        <CardStat title="Total Used" value={formatINR(totalUsed)} />
        <CardStat title="Active Projects" value={projects.length} />
      </div>

      <div className="container mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="card lg:col-span-2" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.08}}>
          <h4 className="font-semibold">Revenue vs Expense</h4>
          <div className="h-56 mt-3">
            <ResponsiveContainer>
              <BarChart data={series}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0b3a66" isAnimationActive={true} animationDuration={900} />
                <Bar dataKey="expense" fill="#2fa44f" isAnimationActive={true} animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.12}}>
          <h4 className="font-semibold">Leads / Allocation Share</h4>
          <div className="h-40 mt-3">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={60} isAnimationActive={true} animationDuration={900}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="container mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.16}}>
          <h4 className="font-semibold">Project Progress</h4>
          <div className="mt-3 space-y-3">
            {projects.map(p=> (
              <div key={p.name}>
                <div className="flex justify-between text-sm text-slate-600"><span>{p.name}</span><span>{p.progress}%</span></div>
                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                  <div style={{width:`${p.progress}%`}} className="h-2 bg-primary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.20}}>
          <h4 className="font-semibold">Recent Expenditures</h4>
          <div className="mt-3 text-sm">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Date</th><th>Department</th><th>Amount</th></tr></thead>
              <tbody>
                {transactions.slice(0,6).map(t=> (
                  <tr key={t.id} className="border-t"><td>{t.date}</td><td>{t.department}</td><td>{new Intl.NumberFormat().format(t.amount)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
