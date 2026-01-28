import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchUsers, issueSubsidy, createSubWallet, fetchBudgets } from '../../services/api'
import { formatINR } from '../../utils/format'

export default function Subsidies(){
  const [users, setUsers] = useState([])
  const [budgets, setBudgets] = useState([])
  const [form, setForm] = useState({ userId:'', category:'', amount:'', expiry:'' })
  const [subWalletForm, setSubWalletForm] = useState({ userId:'', category:'', amount:'', expiry:'' })
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState({ type: 'all', expiry: 'all', department: 'all' })

  useEffect(()=>{
    fetchUsers().then(setUsers)
    fetchBudgets().then(setBudgets)
  },[])

  const handleIssue = async (e) =>{
    e.preventDefault()
    const payload = { userId: Number(form.userId), category: form.category, amount: Number(form.amount), expiry: form.expiry }
    const res = await issueSubsidy(payload)
    if(res && res.success){
      setLogs(l=>[{ts:Date.now(), type:'issue', payload:res.subsidy}, ...l])
      setForm({ userId:'', category:'', amount:'', expiry:'' })
    }
  }

  const handleCreateSub = async (e) =>{
    e.preventDefault()
    const payload = { userId: Number(subWalletForm.userId), category: subWalletForm.category, amount: Number(subWalletForm.amount), expiry: subWalletForm.expiry }
    const res = await createSubWallet(payload)
    if(res && res.success){
      setLogs(l=>[{ts:Date.now(), type:'subwallet', payload:res.subWallet}, ...l])
      setSubWalletForm({ userId:'', category:'', amount:'', expiry:'' })
    }
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Government Subsidy Management</h2>
      <div className="mt-3 flex items-center gap-3">
        <label className="text-sm">Type</label>
        <select value={filters.type} onChange={e=>setFilters(f=>({...f, type:e.target.value}))} className="border rounded p-1 text-sm">
          <option value="all">All</option>
          <option value="cash">Cash</option>
          <option value="subsidy">Subsidy</option>
        </select>
        <label className="text-sm">Expiry</label>
        <select value={filters.expiry} onChange={e=>setFilters(f=>({...f, expiry:e.target.value}))} className="border rounded p-1 text-sm">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
        <label className="text-sm">Department</label>
        <select value={filters.department} onChange={e=>setFilters(f=>({...f, department:e.target.value}))} className="border rounded p-1 text-sm">
          <option value="all">All</option>
          {budgets.map(b=> <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="card">
          <h4 className="font-semibold">Issue Subsidy</h4>
          <form onSubmit={handleIssue} className="mt-3 space-y-3">
            <select name="userId" value={form.userId} onChange={e=>setForm({...form,userId:e.target.value})} required className="w-full p-2 border rounded">
              <option value="">Select recipient</option>
              {users.map(u=> <option key={u.id} value={u.id}>{u.name} · {u.role}</option>)}
            </select>
            <input name="category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Category" className="w-full p-2 border rounded" required />
            <input name="amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value.replace(/\D/g,'')})} placeholder="Amount" className="w-full p-2 border rounded" required />
            <input name="expiry" value={form.expiry} onChange={e=>setForm({...form,expiry:e.target.value})} placeholder="Expiry (YYYY-MM-DD)" className="w-full p-2 border rounded" />
            <div className="flex justify-end"><button className="btn-fill btn-primary">Issue Subsidy (mock)</button></div>
          </form>
        </div>

        <div className="card">
          <h4 className="font-semibold">Create Subsidy Sub-wallet</h4>
          <form onSubmit={handleCreateSub} className="mt-3 space-y-3">
            <select name="userId" value={subWalletForm.userId} onChange={e=>setSubWalletForm({...subWalletForm,userId:e.target.value})} required className="w-full p-2 border rounded">
              <option value="">Select user</option>
              {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <input name="category" value={subWalletForm.category} onChange={e=>setSubWalletForm({...subWalletForm,category:e.target.value})} placeholder="Category" className="w-full p-2 border rounded" required />
            <input name="amount" value={subWalletForm.amount} onChange={e=>setSubWalletForm({...subWalletForm,amount:e.target.value.replace(/\D/g,'')})} placeholder="Amount" className="w-full p-2 border rounded" required />
            <input name="expiry" value={subWalletForm.expiry} onChange={e=>setSubWalletForm({...subWalletForm,expiry:e.target.value})} placeholder="Expiry (YYYY-MM-DD)" className="w-full p-2 border rounded" />
            <div className="flex justify-end"><button className="btn-fill btn-primary">Create Sub-wallet (mock)</button></div>
          </form>
        </div>

        <div className="card">
          <h4 className="font-semibold">Budget Allocation</h4>
          <div className="mt-3">
            <form onSubmit={(e)=>{ e.preventDefault(); alert('Budget allocation (mock)') }} className="space-y-3">
              <select className="w-full p-2 border rounded">
                <option>Department</option>
                {budgets.map(b=> <option key={b.id}>{b.name}</option>)}
              </select>
              <input placeholder="Amount" className="w-full p-2 border rounded" />
              <input placeholder="Fiscal Year" className="w-full p-2 border rounded" />
              <div className="flex justify-end"><button className="btn-fill btn-primary">Allocate (mock)</button></div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="font-semibold">Usage & Remaining</h4>
          <div className="mt-3 text-sm">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Budget</th><th>Allocated</th><th>Used</th><th>Remaining</th></tr></thead>
              <tbody>
                {budgets.map(b=> (
                  <tr key={b.id} className="border-t"><td className="py-2">{b.name}</td><td>{formatINR(b.allocated)}</td><td>{formatINR(b.used||0)}</td><td>{formatINR((b.allocated||0)-(b.used||0))}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Activity Logs</h4>
          <div className="mt-3 text-sm">
            {logs.length===0 ? <div className="text-slate-500">No actions yet</div> : (
              <ul className="list-disc ml-5">
                {logs.map(l=> {
                  const when = new Date(l.ts).toLocaleString()
                  if(l.type === 'issue'){
                    const p = l.payload
                    return <li key={l.ts}>{when}: Issued {formatINR(p.amount)} to user #{p.userId} ({p.category}) expiry: {p.expiry || '—'}</li>
                  }
                  if(l.type === 'subwallet'){
                    const p = l.payload
                    return <li key={l.ts}>{when}: Created sub-wallet {p.id} for user #{p.userId} ({p.category}) amount {formatINR(p.amount)} expiry: {p.expiry || '—'}</li>
                  }
                  return <li key={l.ts}>{when}: {l.type}</li>
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  )
}
