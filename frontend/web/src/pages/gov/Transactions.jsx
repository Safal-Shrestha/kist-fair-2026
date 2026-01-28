import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TXS from '../../data/transactions'
import USERS from '../../data/users'
import { fetchUsers, toggleUserStatus } from '../../services/api'
import { formatINR } from '../../utils/format'

export default function Transactions(){
  const [users, setUsers] = useState(USERS.map(u=>({...u})))
  const [filters, setFilters] = useState({ type: 'all', status: 'all' })
  const [processedTx, setProcessedTx] = useState(new Set())

  useEffect(()=>{
    let mounted = true
    fetchUsers().then(u=>{ if(mounted) setUsers(u) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  // no action column or action logs per admin preference

  // mark tx as blocked if from/to correspond to a frozen user
  const rows = useMemo(()=> TXS.map(t=>{
    const fromUser = users.find(u=> t.from === u.name)
    const toUser = users.find(u=> t.to === u.name)
    const blocked = (fromUser && fromUser.status==='frozen') || (toUser && toUser.status==='frozen')
    return {...t, blocked}
  }).filter(t=> (filters.type==='all' || t.type===filters.type) && (filters.status==='all' || t.status===filters.status)), [users, filters])

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <div className="card">
        <h4 className="font-semibold">Recent Transactions</h4>
        <form className="mt-3 flex gap-3 items-center text-sm">
          <label>Type</label>
          <select value={filters.type} onChange={e=>setFilters(f=>({...f, type:e.target.value}))} className="border rounded p-1">
            <option value="all">All</option>
            <option value="send">Send</option>
            <option value="receive">Receive</option>
          </select>
          <label>Status</label>
          <select value={filters.status} onChange={e=>setFilters(f=>({...f, status:e.target.value}))} className="border rounded p-1">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
          <div className="ml-auto text-slate-500 text-xs">Processed IDs: {processedTx.size}</div>
        </form>

        <table className="w-full mt-3 text-sm">
          <thead className="text-left text-slate-500"><tr><th>Timestamp</th><th>From</th><th>To</th><th>Type</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            {rows.map(t=> (
              <tr key={t.id} className="border-t">
                <td className="py-2">{t.timestamp || t.date || '—'}</td>
                <td>{t.from || t.department || '—'}</td>
                <td>{t.to || t.recipient || '—'}</td>
                <td>{t.type || t.purpose || '—'}</td>
                <td>{t.blocked? 'blocked (frozen account)' : (t.status || '—')}</td>
                <td>{t.amount ? formatINR(t.amount) : '—'}</td>
                {/* Actions column removed per request */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Logs removed per request */}
    </motion.main>
  )
}
