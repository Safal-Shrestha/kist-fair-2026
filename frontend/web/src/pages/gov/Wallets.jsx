import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Tooltip from '../../components/Tooltip'
import { formatINR } from '../../utils/format'

const CURRENT_VERSION = 'v1.2'
const EMPTY_WALLET = (user) => ({
  id: user.id,
  owner: user.name,
  ownerFrozen: user.status === 'frozen',
  personal: 0,
  subsidy: 0,
  subsidyExpiry: null,
  restrictions: '',
  version: CURRENT_VERSION,
  role: user.role,
})

export default function Wallets(){
  const [wallets, setWallets] = useState([])
  const [users, setUsers] = useState([])
  const [filterRole, setFilterRole] = useState('all')
  const [filterExpiry, setFilterExpiry] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(()=>{
    let mounted = true
    // build wallets per user; merge with mock initial data where owner matches
    import('../../services/api').then(async ({ fetchUsers })=>{
      const u = await fetchUsers()
      if(!mounted) return
      setUsers(u)
      // initial mock data map (keeps previous examples)
      const initial = [
        { id:1, owner:'Ram Thapa', personal:5000, subsidy:1200, subsidyExpiry:'2026-03-01', restrictions:'food', version: 'v1.2' },
        { id:2, owner:'Sita Karki', personal:3000, subsidy:0, subsidyExpiry:'2024-12-01', restrictions:'', version: 'v1.0' },
      ]
      const list = u.map(user => {
        const found = initial.find(x => x.owner === user.name)
        if(found){
          return { ...found, ownerFrozen: user.status === 'frozen', role: user.role, id: user.id }
        }
        return EMPTY_WALLET(user)
      })
      setWallets(list)
    })
    return ()=>{ mounted=false }
  },[])

  const isExpired = (expiry) => {
    if(!expiry) return false
    return new Date(expiry) < new Date()
  }

  const categories = Array.from(new Set(wallets.map(w=>w.restrictions).filter(Boolean)))

  function applyFilters(list){
    return list.filter(w=>{
      if(filterRole !== 'all' && w.role !== filterRole) return false
      if(filterCategory !== 'all' && w.restrictions !== filterCategory) return false
      if(filterExpiry === 'expired' && !isExpired(w.subsidyExpiry)) return false
      if(filterExpiry === 'active' && isExpired(w.subsidyExpiry)) return false
      return true
    })
  }

  function showToast(msg){
    setToast(msg)
    setTimeout(()=>setToast(null), 3000)
  }

  function resetVersion(id){
    setWallets(ws => ws.map(w => w.id === id ? { ...w, version: CURRENT_VERSION } : w))
    showToast('Wallet version reset')
  }

  function viewDetails(id){
    setExpandedId(expandedId === id ? null : id)
  }

  const totals = wallets.reduce((acc,w)=>{
    acc.total += (w.personal||0) + (w.subsidy||0)
    if(isExpired(w.subsidyExpiry)) acc.expired += (w.subsidy||0)
    return acc
  }, { total:0, expired:0 })

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Wallet Oversight</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="card lg:col-span-1">
          <h4 className="font-semibold">Totals</h4>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <div className="p-3 bg-white/5 rounded">Total Balance<br/><strong>{formatINR(totals.total)}</strong></div>
            <div className="p-3 bg-white/5 rounded">Expired Subsidies<br/><strong>{formatINR(totals.expired)}</strong></div>
            <div className="p-3 bg-white/5 rounded">Wallets<br/><strong>{wallets.length}</strong></div>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h4 className="font-semibold">Filters</h4>
          <div className="mt-3 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm">User Type</label>
              <select value={filterRole} onChange={e=>setFilterRole(e.target.value)} className="border rounded p-1 text-sm w-40">
                <option value="all">All</option>
                <option value="citizen">Citizen</option>
                <option value="merchant">Merchant</option>
                <option value="government">Govt Dept</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">Subsidy Category</label>
              <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)} className="border rounded p-1 text-sm w-40">
                <option value="all">All</option>
                {categories.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">Expiry</label>
              <select value={filterExpiry} onChange={e=>setFilterExpiry(e.target.value)} className="border rounded p-1 text-sm w-36">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {applyFilters(wallets).map(w=> (
          <div key={w.id} className="p-3 border rounded">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{w.owner} <span className="text-xs ml-2 text-slate-400">{w.version}</span></div>
                <div className="text-xs text-slate-400">Role: {w.role || '—'}</div>
                <div className="text-sm mt-2">Personal: <strong>{formatINR(w.personal)}</strong> · Subsidy: <strong>{formatINR(w.subsidy)}</strong></div>
                <div className="text-xs text-slate-400 mt-1">Expiry: {w.subsidyExpiry || '—'} · {isExpired(w.subsidyExpiry) ? <span className="text-red-600 font-medium">Expired</span> : <span className="text-green-600">Active</span>}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm">{w.restrictions ? <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">{w.restrictions}</span> : <span className="px-2 py-1 bg-gray-50 text-slate-600 rounded">No restrictions</span>}</div>
                <Tooltip content={()=>{
                  const reasons = []
                  if(isExpired(w.subsidyExpiry)) reasons.push('subsidy expired')
                  if(w.restrictions) reasons.push(`restricted to ${w.restrictions}`)
                  if(w.ownerFrozen) reasons.push('owner account frozen')
                  if(w.version !== CURRENT_VERSION) reasons.push(`version mismatch (${w.version} != ${CURRENT_VERSION})`)
                  if(reasons.length===0) return 'No restrictions — spendable'
                  return reasons.join('. ')
                }}>
                  <button className="p-1 rounded border text-xs">Why can\'t I spend this money?</button>
                </Tooltip>

                <button onClick={()=>viewDetails(w.id)} className="px-3 py-1 btn">View</button>
                <button onClick={()=>resetVersion(w.id)} className="px-3 py-1 btn-outline">Reset Version</button>
              </div>
            </div>

            {expandedId === w.id && (
              <div className="mt-3 border-t pt-3">
                <h5 className="font-semibold">Sub-wallets</h5>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded">Personal<br/><strong>{formatINR(w.personal)}</strong></div>
                  <div className={`p-3 rounded ${isExpired(w.subsidyExpiry) ? 'bg-red-50' : 'bg-green-50'}`}>Subsidy<br/><strong>{formatINR(w.subsidy)}</strong></div>
                  <div className="p-3 bg-white/5 rounded">Version<br/><strong>{w.version}</strong></div>
                </div>

                <div className="mt-3">
                  <h6 className="font-medium">Restrictions</h6>
                  <div className="text-sm text-slate-600">{w.restrictions ? `Category: ${w.restrictions}` : 'No category restrictions'}</div>
                </div>

                <div className="mt-3 flex gap-3">
                  <button onClick={()=>{ resetVersion(w.id) }} className="btn-fill btn-primary px-3 py-1">Reset wallet version</button>
                  <button onClick={()=>{ setWallets(ws => ws.map(x => x.id===w.id ? { ...x, subsidyExpiry: new Date().toISOString().slice(0,10) } : x)); showToast('Subsidy expiry updated') }} className="btn px-3 py-1">Mark subsidy expired</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* simple toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded shadow">{toast}</div>
      )}
    </motion.main>
  )
}
