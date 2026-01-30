import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { fetchBudgets, createBudget, fetchTransactions, fetchMerchants, fetchPrograms, createProgram, fetchProgramAllocations, createProgramAllocation } from '../../services/api'
import { formatINR } from '../../utils/format'

export default function AdminUtilities(){
  const [budgets, setBudgets] = useState([])
  const [form, setForm] = useState({title:'', category:'', amount:''})

  useEffect(()=>{
    async function load(){
      const b = await fetchBudgets()
      setBudgets(b)
    }
    load()
  },[])

  const [analytics, setAnalytics] = useState({ totalTx:0, subsidyUsage:0, merchantSales:0 })
  const [programs, setPrograms] = useState([])
  const [programAllocations, setProgramAllocations] = useState([])
  const [progForm, setProgForm] = useState({ name:'', categories:'', budget:'', fiscalYear:'' })

  useEffect(()=>{
    async function loadAll(){
      const [txs, merchants] = await Promise.all([fetchTransactions(), fetchMerchants()])
      const totalTx = (txs && txs.length) || 0
      const subsidyUsage = (txs||[]).filter(t=> t.type === 'subsidy').reduce((s,t)=> s + (t.amount||0), 0)
      const merchantSales = (txs||[]).filter(t=> t.type === 'sale').reduce((s,t)=> s + (t.amount||0), 0)
      setAnalytics({ totalTx, subsidyUsage, merchantSales })
    }
    loadAll()
    // load programs and allocations
    fetchPrograms().then(setPrograms)
    fetchProgramAllocations().then(setProgramAllocations)
  },[])

  function exportJSON(name, data){
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name + '.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function arrayToCSV(rows){
    if(!rows || rows.length===0) return ''
    const keys = Object.keys(rows[0])
    const header = keys.join(',')
    const lines = rows.map(r => keys.map(k=> {
      const v = r[k]
      if(v === null || v === undefined) return ''
      const s = String(v).replace(/"/g,'""')
      return `"${s}"`
    }).join(','))
    return [header, ...lines].join('\n')
  }

  function exportCSV(name, data){
    const csv = arrayToCSV(data || [])
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name + '.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCreate(e){
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const payload = { name: data.title || '', categories: (data.categories||'').split(',').map(s=>s.trim()).filter(Boolean), budget: Number(data.amount||0), fiscalYear: data.fiscalYear||'' , status: 'active' }
    const res = await createProgram(payload)
    if(res && res.success){ setPrograms(p=>[res.program, ...p]); setProgForm({ name:'', categories:'', budget:'', fiscalYear:'' }); alert('Program created (mock)') }
  }

  async function handleAllocate(e){
    e.preventDefault()
    const payload = { name: form.title, allocated: Number(form.amount) }
    // call mock createBudget which returns created budget
    const res = await createBudget(payload)
    if(res && res.budget){
      // prepend locally so UI updates immediately
      setBudgets(b => [res.budget, ...b])
    } else {
      // fallback to re-fetch
      const b = await fetchBudgets()
      setBudgets(b)
    }
    setForm({title:'', category:'', amount:''})
  }

  async function handleCreateProgramAllocation(e){
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const payload = { programId: data.programId, department: data.department, amount: Number(data.amount), fiscalYear: data.fiscalYear }
    const res = await createProgramAllocation(payload)
    if(res && res.success){ setProgramAllocations(a=>[res.allocation, ...a]); alert('Program allocation created (mock)') }
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Admin Utilities</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1">
          <h4 className="font-semibold">Program Creation</h4>
          <div className="mt-2 text-sm">
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-white/5 rounded">Total tx<br/><strong>{analytics.totalTx}</strong></div>
              <div className="p-2 bg-white/5 rounded">Subsidy used<br/><strong>{formatINR(analytics.subsidyUsage)}</strong></div>
              <div className="p-2 bg-white/5 rounded">Merchant sales<br/><strong>{formatINR(analytics.merchantSales)}</strong></div>
            </div>
          </div>
          <form onSubmit={handleCreate} className="mt-3 space-y-3">
            <input name="title" placeholder="Program name" className="w-full p-2 border rounded" required />
            <input name="categories" placeholder="Categories (comma separated)" className="w-full p-2 border rounded" />
            <input name="amount" placeholder="Budget allocation" className="w-full p-2 border rounded" />
            <input name="fiscalYear" placeholder="Fiscal year (e.g. 2025-2026)" className="w-full p-2 border rounded" />
            <button className="btn-fill btn-primary hover:scale-105 transition-transform">Create Program (mock)</button>
          </form>
        </div>

        <div className="card lg:col-span-2">
          <h4 className="font-semibold">Budget Allocation & Analytics</h4>
          <form onSubmit={handleAllocate} className="mt-3 space-y-3">
            <input name="title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Department name" className="w-full p-2 border rounded" required />
            <input name="amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value.replace(/\D/g,'')})} placeholder="Amount" className="w-full p-2 border rounded" required />
            <div className="flex justify-end"><button className="btn-fill btn-primary">Allocate Budget (mock)</button></div>
          </form>

          <div className="mt-4 overflow-visible" style={{height:420, padding: '8px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgets} margin={{top:24, right:16, left:72, bottom:36}} barCategoryGap="20%">
                <XAxis dataKey="name" tick={{fontSize:12}} />
                <YAxis width={64} tick={{fontSize:12}} />
                <Tooltip formatter={(v)=>new Intl.NumberFormat().format(v)} />
                <Bar dataKey="allocated" fill="#7C4DFF" />
                <Bar dataKey="used" fill="#111827" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4">
            <h5 className="font-medium">Programs</h5>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-slate-500"><tr><th>Name</th><th>Category</th><th>Budget</th><th>FY</th><th>Status</th></tr></thead>
                <tbody>
                  {programs.map(p=> (
                    <tr key={p.id} className="border-t"><td className="py-2">{p.name}</td><td>{(p.categories||[]).join(', ')}</td><td>{formatINR(p.budget)}</td><td>{p.fiscalYear}</td><td>{p.status}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1">
          <h4 className="font-semibold">Export Data</h4>
          <div className="mt-3 flex flex-col gap-2">
            <button className="btn-fill px-3 py-1" onClick={()=>exportCSV('budgets', budgets)}>Export Budgets (CSV)</button>
            <button className="btn-fill px-3 py-1" onClick={async ()=>exportCSV('transactions', await fetchTransactions())}>Export Transactions (CSV)</button>
            <button className="btn-fill px-3 py-1" onClick={async ()=>exportCSV('merchants', await fetchMerchants())}>Export Merchants (CSV)</button>
            <button className="btn-fill px-3 py-1" onClick={async ()=>exportCSV('programs', await fetchPrograms())}>Export Programs (CSV)</button>
            <button className="btn-fill px-3 py-1" onClick={async ()=>exportCSV('program_allocations', await fetchProgramAllocations())}>Export Program Allocations (CSV)</button>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h4 className="font-semibold">Analytics</h4>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="p-2 bg-white/5 rounded">Total tx<br/><strong>{analytics.totalTx}</strong></div>
            <div className="p-2 bg-white/5 rounded">Subsidy used<br/><strong>{formatINR(analytics.subsidyUsage)}</strong></div>
            <div className="p-2 bg-white/5 rounded">Merchant sales<br/><strong>{formatINR(analytics.merchantSales)}</strong></div>
          </div>

          <div className="mt-6">
            <h5 className="font-medium">Budgets</h5>
            <table className="w-full text-sm mt-2">
              <thead className="text-left text-slate-500"><tr><th>Name</th><th>Allocated</th><th>Used</th></tr></thead>
              <tbody>
                {budgets.map(b=> (
                  <tr key={b.id} className="border-t"><td className="py-2">{b.name}</td><td>{formatINR(b.allocated)}</td><td>{formatINR(b.used || 0)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
