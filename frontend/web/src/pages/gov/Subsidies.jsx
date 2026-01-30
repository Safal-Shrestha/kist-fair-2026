import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { fetchSubsidies, createSubsidy, fetchAllocations, createAllocation, fetchSubsidyLogs } from '../../services/api'
import { formatINR } from '../../utils/format'

export default function Subsidies(){
  const [subsidies, setSubsidies] = useState([])
  const [allocations, setAllocations] = useState([])
  const [logs, setLogs] = useState([])
  const [toast, setToast] = useState(null)

  const [form, setForm] = useState({ category:'', expiry:'', amount:'', department:'' })
  const [allocForm, setAllocForm] = useState({ department:'', amount:'', fiscalYear:'' })
  const [filters, setFilters] = useState({ department:'all', category:'all', expiry:'all' })

  useEffect(()=>{ loadAll() },[])
  async function loadAll(){
    const s = await fetchSubsidies(); setSubsidies(s)
    const a = await fetchAllocations(); setAllocations(a)
    const l = await fetchSubsidyLogs(); setLogs(l)
  }

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(null),3500) }

  async function handleIssue(e){
    e && e.preventDefault()
    if(!form.category || !form.amount || !form.department) return showToast('Fill required fields')
    const payload = { category: form.category, expiry: form.expiry || null, amount: Number(form.amount), department: form.department }
    const res = await createSubsidy(payload)
    if(res && res.success){ setSubsidies(s=>[res.subsidy, ...s]); setForm({ category:'', expiry:'', amount:'', department:'' }); showToast('Subsidy issued'); const l = await fetchSubsidyLogs(); setLogs(l) }
  }

  async function handleAllocate(e){
    e && e.preventDefault()
    if(!allocForm.department || !allocForm.amount || !allocForm.fiscalYear) return showToast('Fill allocation fields')
    const payload = { department: allocForm.department, amount: Number(allocForm.amount), fiscalYear: allocForm.fiscalYear }
    const res = await createAllocation(payload)
    if(res && res.success){ setAllocations(a=>[res.allocation, ...a]); setAllocForm({ department:'', amount:'', fiscalYear:'' }); showToast('Budget allocated'); const l = await fetchSubsidyLogs(); setLogs(l) }
  }

  // usage tracking: derive used amounts per department/category from subsidies (mocked)
  const usage = useMemo(()=>{
    const issued = {}
    subsidies.forEach(s=>{
      const key = `${s.department}||${s.category}`
      issued[key] = (issued[key]||0) + (s.amount||0)
    })
    const rows = Object.entries(issued).map(([k,v])=>{
      const [dept, cat] = k.split('||')
      return { department: dept, category: cat, issued: v, used: Math.round(v*0.6), remaining: Math.round(v*0.4), expiry: subsidies.find(s=> s.department===dept && s.category===cat)?.expiry || null }
    })
    return rows
  },[subsidies])

  function filteredUsage(){
    return usage.filter(r=> (filters.department==='all' || r.department===filters.department) && (filters.category==='all' || r.category===filters.category) && (filters.expiry==='all' || (filters.expiry==='expired' ? (r.expiry && new Date(r.expiry) < new Date()) : true)))
  }

  function exportLogsCSV(){
    const header = ['Timestamp','Type','Text']
    const csv = [header.join(',')].concat(logs.map(l=>[`"${new Date(l.ts).toLocaleString()}"`, l.type, `"${(l.text||'').replace(/"/g,'""')}"`].join(',')))
    const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download = `subsidy-logs-${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url)
    showToast('Logs exported')
  }

  // collections for filters
  const departments = useMemo(()=> Array.from(new Set([...subsidies.map(s=>s.department), ...allocations.map(a=>a.department)])).filter(Boolean), [subsidies, allocations])
  const categories = useMemo(()=> Array.from(new Set(subsidies.map(s=>s.category))).filter(Boolean), [subsidies])

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Subsidies & Budgets</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h4 className="font-semibold">Subsidy Issuance</h4>
          <form onSubmit={handleIssue} className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Category" value={form.category} onChange={e=>setForm(f=>({...f, category:e.target.value}))} className="p-2 border rounded" />
            <input type="date" placeholder="Expiry" value={form.expiry} onChange={e=>setForm(f=>({...f, expiry:e.target.value}))} className="p-2 border rounded" />
            <input placeholder="Amount" value={form.amount} onChange={e=>setForm(f=>({...f, amount: e.target.value.replace(/[^0-9.]/g,'')}))} className="p-2 border rounded" />
            <input placeholder="Department" value={form.department} onChange={e=>setForm(f=>({...f, department: e.target.value}))} className="p-2 border rounded" />
            <div className="md:col-span-2 flex justify-end"><button className="btn-fill btn-primary">Issue Subsidy</button></div>
          </form>

          <h4 className="font-semibold mt-6">Usage Tracking</h4>
          <div className="mt-3 flex gap-3 items-center">
            <select value={filters.department} onChange={e=>setFilters(f=>({...f, department: e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All departments</option>
              {departments.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filters.category} onChange={e=>setFilters(f=>({...f, category: e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All categories</option>
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.expiry} onChange={e=>setFilters(f=>({...f, expiry: e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All</option>
              <option value="expired">Expired</option>
              <option value="active">Active</option>
            </select>
            <div className="ml-auto"><button onClick={exportLogsCSV} type="button" className="btn">Export Logs</button></div>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Department</th><th>Category</th><th>Amount Issued</th><th>Amount Used</th><th>Remaining</th><th>Expiry</th></tr></thead>
              <tbody>
                {filteredUsage().map((r,idx)=> (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{r.department}</td>
                    <td>{r.category}</td>
                    <td>{formatINR(r.issued)}</td>
                    <td>{formatINR(r.used)}</td>
                    <td>{formatINR(r.remaining)}</td>
                    <td>{r.expiry || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Budget Allocation</h4>
          <form onSubmit={handleAllocate} className="mt-3 space-y-3">
            <input placeholder="Department" value={allocForm.department} onChange={e=>setAllocForm(a=>({...a, department: e.target.value}))} className="w-full p-2 border rounded" />
            <input placeholder="Amount" value={allocForm.amount} onChange={e=>setAllocForm(a=>({...a, amount: e.target.value.replace(/[^0-9.]/g,'')}))} className="w-full p-2 border rounded" />
            <input placeholder="Fiscal Year" value={allocForm.fiscalYear} onChange={e=>setAllocForm(a=>({...a, fiscalYear: e.target.value}))} className="w-full p-2 border rounded" />
            <div className="flex justify-end"><button className="btn-fill btn-primary">Allocate Budget</button></div>
          </form>

          <h4 className="font-semibold mt-6">Activity Logs</h4>
          <div className="mt-3 text-sm space-y-2">
            {logs.length===0 ? <div className="text-slate-500">No activity</div> : (
              <ul className="list-disc ml-5">
                {logs.map(l=> (
                  <li key={l.ts}>{new Date(l.ts).toLocaleDateString()} — {l.text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded shadow">{toast}</div>}
    </motion.main>
  )
}
