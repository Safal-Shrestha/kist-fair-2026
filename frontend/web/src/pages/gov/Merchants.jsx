import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { fetchMerchants, createMerchant, updateMerchant, deleteMerchant, fetchTransactions, issueSubsidy, createSubWallet } from '../../services/api'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

export default function Merchants(){
  const [merchants, setMerchants] = useState([])
  const [transactions, setTransactions] = useState([])
  const [form, setForm] = useState({ name:'', category:'', walletId:'' })
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({ category:'all', status:'all' })
  const [sortBy, setSortBy] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [toast, setToast] = useState(null)

  useEffect(()=>{ fetchMerchants().then(setMerchants); fetchTransactions().then(setTransactions) },[])

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(null), 3500) }

  const categories = useMemo(()=>{
    const set = new Set(merchants.map(m=>m.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  },[merchants])

  async function handleCreate(e){
    e && e.preventDefault()
    if(!form.name) return showToast('Name required')
    const payload = { name: form.name, category: form.category || 'General', walletId: Number(form.walletId||0), approved: false }
    const res = await createMerchant(payload)
    if(res && res.success){ setMerchants(m=>[res.merchant, ...m]); setForm({ name:'', category:'', walletId:'' }); showToast('Merchant created') }
  }

  async function handleSaveEdit(e){
    e && e.preventDefault()
    if(!editing) return
    const res = await updateMerchant(editing.id, editing)
    if(res && res.success){ setMerchants(m => m.map(x => x.id === editing.id ? res.merchant : x)); setEditing(null); showToast('Merchant updated') }
  }

  async function handleDelete(id){
    if(!confirm('Delete merchant?')) return
    const res = await deleteMerchant(id)
    if(res && res.success){ setMerchants(m => m.filter(x=> x.id !== id)); showToast('Merchant deleted') }
  }

  function changeSort(field){
    if(sortBy === field) setSortDir(d => d==='asc' ? 'desc' : 'asc')
    else { setSortBy(field); setSortDir('asc') }
  }

  const visible = useMemo(()=>{
    let list = merchants.slice()
    if(filters.category && filters.category!=='all') list = list.filter(m=> m.category === filters.category)
    if(filters.status && filters.status!=='all') list = list.filter(m=> (filters.status==='active') ? m.approved : !m.approved)
    list.sort((a,b)=>{
      const A = (a[sortBy] || '').toString().toLowerCase()
      const B = (b[sortBy] || '').toString().toLowerCase()
      if(A<B) return sortDir==='asc' ? -1 : 1
      if(A>B) return sortDir==='asc' ? 1 : -1
      return 0
    })
    return list
  },[merchants, filters, sortBy, sortDir])

  // Analytics
  const analytics = useMemo(()=>{
    const totalSales = {}
    const subsidyByCategory = {}
    transactions.forEach(t=>{
      if(!t || !t.amount) return
      // treat transactions which have toWalletId or to walletId (data variations)
      const w = t.toWalletId || t.walletId || t.to || null
      const merchant = merchants.find(m => m.walletId && (m.walletId === Number(w)))
      if(merchant){
        totalSales[merchant.name] = (totalSales[merchant.name]||0) + (t.amount||0)
      }
      if(t.type === 'subsidy'){
        const cat = t.category || 'Unspecified'
        subsidyByCategory[cat] = (subsidyByCategory[cat]||0) + (t.amount||0)
      }
    })
    const topMerchants = Object.entries(totalSales).sort((a,b)=> b[1]-a[1]).slice(0,5)
    return { totalSales, subsidyByCategory, topMerchants }
  },[transactions, merchants])

  const chartData = useMemo(()=>{
    const entries = Object.entries(analytics.totalSales)
    if(entries.length>0) return entries.map(([name, v])=>({ name, sales: v }))
    // fallback mock: derive stable sample values from merchants
    return merchants.map((m, i)=> ({ name: m.name, sales: (i+1) * 500 }))
  },[analytics.totalSales, merchants])

  // Subsidy approval flow: find pending subsidies mapped to merchants by walletId
  function pendingForMerchant(m){
    return transactions.filter(t => t.type==='subsidy' && (t.toWalletId === m.walletId || t.walletId === m.walletId || String(t.toWalletId) === String(m.walletId)) && t.status === 'pending')
  }

  async function handleApproveSubsidy(tx, merchant){
    // enforce category match
    if(tx.category !== merchant.category){
      showToast('Category mismatch — cannot approve')
      return
    }
    // simulate issuing subsidy or creating sub-wallet
    const res = await createSubWallet({ userId: tx.userId || tx.recipientId || 0, category: tx.category, amount: tx.amount, merchantId: merchant.id })
    if(res && res.success){
      // update transactions locally
      setTransactions(txs => txs.map(x => x.id === tx.id ? { ...x, status: 'approved' } : x))
      showToast('Subsidy approved and sub-wallet created')
    } else showToast('Approve failed')
  }

  async function handleDenySubsidy(tx, merchant){
    setTransactions(txs => txs.map(x => x.id === tx.id ? { ...x, status: 'denied' } : x))
    showToast('Subsidy denied')
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Merchant System</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">Merchants</h4>
              <div className="text-sm text-slate-500">Manage merchant profiles, approve merchants, and review subsidy requests.</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Total merchants: {merchants.length}</div>
              <div className="text-xs text-slate-500">Top merchant: {analytics.topMerchants[0] ? `${analytics.topMerchants[0][0]} (${analytics.topMerchants[0][1]})` : '—'}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-3 flex flex-wrap gap-3 items-center">
            <select value={filters.category} onChange={e=>setFilters(f=>({...f, category: e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All categories</option>
              {categories.slice(1).map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.status} onChange={e=>setFilters(f=>({...f, status: e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All status</option>
              <option value="active">Approved</option>
              <option value="pending">Pending</option>
            </select>
            <div className="ml-auto text-sm">Sort: <button className="underline" onClick={()=>changeSort('name')}>Name</button> · <button className="underline" onClick={()=>changeSort('category')}>Category</button></div>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Name</th><th>Category</th><th>Wallet</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {visible.map(m=> (
                  <tr key={m.id} className="border-t">
                    <td className="py-2">{m.name}</td>
                    <td>{m.category}</td>
                    <td>{m.walletId}</td>
                    <td>{m.approved ? <span className="text-green-600">Approved</span> : <span className="text-slate-500">Pending</span>}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>{ setEditing(m) }} className="px-2 py-1 border rounded text-sm">Edit</button>
                        <button onClick={()=>{ setMerchants(ms => ms.map(x => x.id===m.id ? {...x, approved:true} : x)); showToast('Merchant approved') }} className="btn-fill btn-primary px-3 py-1 text-sm">Approve</button>
                        <button onClick={()=>{ setMerchants(ms => ms.map(x => x.id===m.id ? {...x, approved:false} : x)); showToast('Merchant denied') }} className="px-3 py-1 text-sm border rounded">Deny</button>
                        <button onClick={()=>handleDelete(m.id)} className="px-2 py-1 text-sm text-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="block lg:hidden mt-3 space-y-3">
            {visible.map(m=> (
              <div key={m.id} className="border rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-xs text-slate-500">Category: {m.category} · Wallet: {m.walletId}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm">{m.approved ? <span className="text-green-600">Approved</span> : <span className="text-slate-500">Pending</span>}</div>
                    <div className="flex gap-2">
                      <button onClick={()=>{ setEditing(m) }} className="px-2 py-1 border rounded text-sm">Edit</button>
                      <button onClick={()=>handleDelete(m.id)} className="px-2 py-1 text-sm text-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pending subsidies per merchant (show approvals) */}
          <div className="mt-4">
            <h4 className="font-semibold">Pending Subsidy Requests</h4>
            <div className="mt-2 space-y-3">
              {merchants.map(m=> {
                const pend = pendingForMerchant(m)
                if(pend.length===0) return null
                return (
                  <div key={`p_${m.id}`} className="border rounded p-3">
                    <div className="font-semibold">{m.name} · {m.category}</div>
                    <div className="mt-2 space-y-2">
                      {pend.map(tx=> (
                        <div key={tx.id} className="flex items-center justify-between">
                          <div className="text-sm">{tx.id} — {tx.category} — {tx.amount}</div>
                          <div className="flex gap-2">
                            <button onClick={()=>handleApproveSubsidy(tx,m)} className="btn-fill btn-primary px-3 py-1 text-sm">Approve</button>
                            <button onClick={()=>handleDenySubsidy(tx,m)} className="px-3 py-1 text-sm border rounded">Deny</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Create / Edit Merchant</h4>
          <form onSubmit={editing ? handleSaveEdit : handleCreate} className="mt-3 space-y-3">
            <input name="name" value={editing?.name ?? form.name} onChange={e=> editing ? setEditing({...editing, name: e.target.value}) : setForm({...form, name:e.target.value})} placeholder="Business name" className="w-full p-2 border rounded" required />
            <input name="category" value={editing?.category ?? form.category} onChange={e=> editing ? setEditing({...editing, category: e.target.value}) : setForm({...form, category:e.target.value})} placeholder="Category" className="w-full p-2 border rounded" />
            <input name="walletId" value={editing?.walletId ?? form.walletId} onChange={e=>{
              const val = e.target.value.replace(/\D/g,'')
              editing ? setEditing({...editing, walletId: Number(val)}) : setForm({...form, walletId: val})
            }} placeholder="Wallet ID" className="w-full p-2 border rounded" />
            <div className="flex justify-between">
              <div>
                {editing ? <button type="button" onClick={()=>{ setEditing(null); setForm({ name:'', category:'', walletId:'' }) }} className="px-3 py-1 border rounded">Cancel</button> : null}
              </div>
              <div><button className="btn-fill btn-primary">{editing ? 'Save Changes' : 'Create Merchant'}</button></div>
            </div>
          </form>

          {/* Analytics */}
          <div className="mt-6">
            <h4 className="font-semibold">Analytics</h4>
            <div className="mt-3 text-sm space-y-4">
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>Total merchant sales (sample):</div>
              <ul className="ml-4 list-disc text-xs">
                {chartData.length===0 ? <li className="text-slate-500">No sales data</li> : chartData.map(c=> <li key={c.name}>{c.name}: {c.sales}</li>)}
              </ul>

              <div className="mt-2">Subsidy usage by category:</div>
              <ul className="ml-4 list-disc text-xs">
                {Object.entries(analytics.subsidyByCategory).length===0 ? <li className="text-slate-500">None</li> : Object.entries(analytics.subsidyByCategory).map(([k,v])=> <li key={k}>{k}: {v}</li>)}
              </ul>

              <div className="mt-2">Top merchants by volume:</div>
              <ul className="ml-4 list-decimal text-xs">
                {analytics.topMerchants.length===0 ? <li className="text-slate-500">—</li> : analytics.topMerchants.map(([k,v])=> <li key={k}>{k}: {v}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded shadow">{toast}</div>}
    </motion.main>
  )
}
