import React, { useState } from 'react'
import * as api from '../../services/api'

export default function BudgetAllocation(){
  const [dept, setDept] = useState('Education')
  const [amount, setAmount] = useState('')
  const [year, setYear] = useState('2025')
  const [msg, setMsg] = useState(null)

  async function submit(e){
    e.preventDefault()
    // TODO: POST request to Supabase (createBudget)
    try{
      await api.createBudget({ name: dept, allocated: Number(amount), year })
      setMsg('Budget allocated')
    }catch(err){ setMsg('Failed') }
  }

  return (
    <main className="container py-8">
      <h2 className="text-xl font-semibold">Budget Allocation</h2>
      <div className="mt-4 card">
        <form onSubmit={submit} className="grid gap-3">
          <label className="text-sm">Department</label>
          <input value={dept} onChange={e=>setDept(e.target.value)} className="border rounded p-2" />
          <label className="text-sm">Amount (रु)</label>
          <input value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,''))} className="border rounded p-2" />
          <label className="text-sm">Fiscal Year</label>
          <input value={year} onChange={e=>setYear(e.target.value)} className="border rounded p-2" />
          <div><button className="px-3 py-1 btn-fill btn-primary">Allocate</button></div>
          {msg && <div className="text-sm text-slate-600">{msg}</div>}
        </form>
      </div>
    </main>
  )
}
