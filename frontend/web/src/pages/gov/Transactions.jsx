import React, { useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TXS from '../../data/transactions'
import USERS from '../../data/users'
import { fetchUsers, toggleUserStatus } from '../../services/api'
import { formatINR } from '../../utils/format'
import ToggleSwitch from '../../components/ToggleSwitch'

export default function Transactions(){
  const [users, setUsers] = useState(USERS.map(u=>({...u})))
  const [filters, setFilters] = useState({ type: 'all', status: 'all' })
  const [processedTx, setProcessedTx] = useState(new Set())
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [actionLogs, setActionLogs] = useState([])
  const [idempotencyLogs, setIdempotencyLogs] = useState([])
  const [toast, setToast] = useState(null)
  const lastActionRef = useRef(new Map())

  useEffect(()=>{
    let mounted = true
    fetchUsers().then(u=>{ if(mounted) setUsers(u) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  // mark tx as blocked if from/to correspond to a frozen user and apply date/type/status filters
  function inDateRange(dateStr){
    if(!startDate && !endDate) return true
    const d = new Date(dateStr || '')
    if(startDate){ const s = new Date(startDate); if(d < s) return false }
    if(endDate){ const e = new Date(endDate); if(d > e) return false }
    return true
  }

  const rows = useMemo(()=> TXS.map(t=>{
    const fromUser = users.find(u=> t.from === u.name)
    const toUser = users.find(u=> t.to === u.name)
    const blocked = (fromUser && fromUser.status==='frozen') || (toUser && toUser.status==='frozen')
    return {...t, blocked}
  }).filter(t=> (filters.type==='all' || t.type===filters.type) && (filters.status==='all' || t.status===filters.status) && inDateRange(t.timestamp || t.date)), [users, filters, startDate, endDate])

  // toast
  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(null), 3000) }

  // toggle freeze for a user (from transaction context)
  // senderIdentifier: sender name or department; tx: full transaction object
  async function handleToggleFreeze(senderIdentifier, txOrId){
    console.debug('handleToggleFreeze called', { senderIdentifier, txOrId })
    if(!senderIdentifier && !txOrId) return
    // determine tx object vs id
    const txObj = (txOrId && typeof txOrId === 'object') ? txOrId : null
    const txId = (txOrId && (typeof txOrId === 'string' || typeof txOrId === 'number')) ? txOrId : (txObj?.id || 'manual')

    // Prefer department -> government account mapping when available
    let user = null
    if(txObj && txObj.department){
      user = users.find(u => u.role === 'government' && (u.name || '').toLowerCase().includes((txObj.department || '').toLowerCase()))
    }

    // fallback to direct sender name match
    if(!user && senderIdentifier){
      user = users.find(u => u.name === senderIdentifier)
    }

    // fallback: first government user (best-effort mapping)
    if(!user){
      user = users.find(u => u.role === 'government')
    }

    if(!user){ showToast('No account found to freeze/unfreeze'); return }

    const desired = user.status === 'active' ? 'freeze' : 'unfreeze'
    const last = lastActionRef.current.get(txId)
    const actionKey = `${txId}:${desired}`
    // idempotency: if same action was recently logged for this tx, ignore
    if(last === actionKey){
      setIdempotencyLogs(l => [{ ts: Date.now(), txId, user: user.name, action: desired, note: 'duplicate ignored' }, ...l])
      showToast('Duplicate request ignored')
      return
    }

    try{
      console.debug('Attempting freeze/unfreeze for user', { user })
      // optimistic UI update so toggle animates immediately
      const previousStatus = user.status
      const optimisticStatus = previousStatus === 'active' ? 'frozen' : 'active'
      setUsers(us => us.map(u => u.id === user.id ? { ...u, status: optimisticStatus } : u))

      const updated = await toggleUserStatus(user.id)
      if(!updated){
        // rollback
        setUsers(us => us.map(u => u.id === user.id ? { ...u, status: previousStatus } : u))
        showToast('Action failed')
        return
      }

      // apply authoritative update from API
      setUsers(us => us.map(u => u.id === updated.id ? updated : u))
      setActionLogs(l => [{ ts: Date.now(), txId, user: user.name, action: `${desired} sender` }, ...l])
      lastActionRef.current.set(txId, actionKey)
      showToast(`Sender ${desired === 'freeze' ? 'frozen' : 'unfrozen'}`)
    }catch(err){
      // rollback on error
      setUsers(us => us.map(u => u.id === user.id ? { ...u, status: user.status } : u))
      showToast('Action failed')
    }
  }

  function clearFilters(){ setFilters({ type:'all', status:'all' }); setStartDate(''); setEndDate(''); setDateError('') }

  function exportCSV(){
    const header = ['Timestamp','From','To','Type','Status','Amount']
    const csv = [header.join(',')].concat(rows.map(r=>[
      `"${(r.timestamp||r.date||'').toString()}"`, `"${(r.from||r.department||'') }"`, `"${(r.to||r.recipient||'') }"`, `"${(r.type||r.purpose||'')}"`, `"${(r.status||'')}"`, `${(r.amount||'')}`
    ].join(',')))
    const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast('CSV exported')
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <div className="card">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Recent Transactions</h4>
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="btn">Export CSV</button>
          </div>
        </div>

        <form className="mt-3 flex flex-wrap gap-3 items-center text-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm">Type</label>
            <select value={filters.type} onChange={e=>setFilters(f=>({...f, type:e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All</option>
              <option value="send">Send</option>
              <option value="receive">Receive</option>
              <option value="subsidy">Subsidy</option>
              <option value="merchant">Merchant</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Status</label>
            <select value={filters.status} onChange={e=>setFilters(f=>({...f, status:e.target.value}))} className="border rounded p-1 text-sm">
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Start:</label>
            <input type="date" value={startDate} onChange={e=>{ setStartDate(e.target.value); if(dateError) setDateError('') }} className="border rounded p-1 text-sm" />
            <label className="text-sm">End:</label>
            <input type="date" value={endDate} onChange={e=>{
              const v = e.target.value
              if(startDate && v && new Date(v) < new Date(startDate)){
                setEndDate(startDate)
                setDateError('End date cannot be before start date')
                setTimeout(()=>setDateError(''), 3000)
              } else { setEndDate(v); if(dateError) setDateError('') }
            }} className="border rounded p-1 text-sm" />
            {dateError && <div className="text-sm text-red-600 ml-1">{dateError}</div>}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button type="button" onClick={clearFilters} className="btn">Clear</button>
          </div>

          <div className="w-full text-slate-500 text-xs mt-2">Processed IDs: {processedTx.size}</div>
        </form>

        {/* Mobile cards */}
        <div className="block lg:hidden mt-3 space-y-3">
          {rows.map(t=> {
            const senderName = t.from || t.department || t.fromName || ''
            // resolve department->gov account, then name fallback, then first gov
            const deptUser = t.department ? users.find(u => u.role === 'government' && (u.name||'').toLowerCase().includes((t.department||'').toLowerCase())) : null
            const nameUser = users.find(u => u.name === senderName)
            const resolvedUser = deptUser || nameUser || users.find(u => u.role === 'government')
            const isActive = !!(resolvedUser ? resolvedUser.status === 'active' : false)
            return (
            <div key={t.id} className="border rounded p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{t.timestamp || t.date || '—'}</div>
                  <div className="text-xs text-slate-500">{senderName || '—'} → {t.to || '—'}</div>
                  <div className="text-xs text-slate-500">{t.type || '—'} · {t.status || '—'}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{t.amount ? formatINR(t.amount) : '—'}</div>
                  <div className="mt-2">
                    <ToggleSwitch checked={isActive} offClass="bg-red-400" onChange={()=> handleToggleFreeze(null, t)} title={isActive ? 'Freeze sender' : 'Unfreeze sender'} />
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500"><tr><th>Timestamp</th><th>From</th><th>To</th><th>Type</th><th>Status</th><th>Amount</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map(t=> (
                <tr key={t.id} className="border-t">
                  <td className="py-2">{t.timestamp || t.date || '—'}</td>
                  <td>{t.from || t.department || '—'}</td>
                  <td>{t.to || t.recipient || '—'}</td>
                  <td>{t.type || t.purpose || '—'}</td>
                  <td>{t.blocked? 'blocked (frozen account)' : (t.status || '—')}</td>
                  <td>{t.amount ? formatINR(t.amount) : '—'}</td>
                  <td>
                    {(() => {
                      const senderName = t.from || t.department || t.fromName || ''
                      const senderUser = users.find(u => u.name === senderName)
                      const isActive = !!(senderUser ? senderUser.status === 'active' : false)
                      return (
                        <div className="flex items-center gap-2">
                              <ToggleSwitch checked={isActive} offClass="bg-red-400" onChange={()=> handleToggleFreeze(null, t)} title={isActive ? 'Freeze sender' : 'Unfreeze sender'} />
                        </div>
                      )
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h4 className="font-semibold">Action Logs</h4>
          <div className="mt-3 text-sm">
            {actionLogs.length===0 ? <div className="text-slate-500">No actions yet</div> : (
              <ul className="list-disc ml-5">
                {actionLogs.map(l=> (
                  <li key={l.ts}>{new Date(l.ts).toLocaleString()}: {l.action} — user: {l.user} (tx: {l.txId})</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Idempotency Logs</h4>
          <div className="mt-3 text-sm">
            {idempotencyLogs.length===0 ? <div className="text-slate-500">No idempotent events</div> : (
              <ul className="list-disc ml-5">
                {idempotencyLogs.map(l=> (
                  <li key={l.ts}>{new Date(l.ts).toLocaleString()}: Duplicate for tx {l.txId} — {l.note} (user: {l.user})</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && <div className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded shadow">{toast}</div>}
    </motion.main>
  )
}
