import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchUsers, toggleUserStatus } from '../../services/api'
import ToggleSwitch from '../../components/ToggleSwitch'

export default function Users(){
  const [users, setUsers] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterWallet, setFilterWallet] = useState('all')
  const [logs, setLogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    fetchUsers().then(u=>{ if(mounted) setUsers(u) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  async function toggleStatus(id){
    // call mock API to toggle and update local list & logs
    const updated = await toggleUserStatus(id)
    if(!updated) return
    setUsers(u=> u.map(x=> x.id===updated.id ? updated : x))
    const action = updated.status === 'frozen' ? 'freeze' : 'unfreeze'
    setLogs(l => [{ ts: Date.now(), userId: id, userName: updated.name, action }, ...l])
  }

  function handleCreate(e){
    e.preventDefault()
    setError(null)
    const f = new FormData(e.target)
    const payload = Object.fromEntries(f)
    // validate phone if provided
    if(payload.phone && !/^\d{10}$/.test(payload.phone)){
      setError('Contact phone must be exactly 10 digits')
      return
    }
    const id = Math.max(0,...users.map(u=>u.id))+1
    const newUser = {id, name:payload.name || 'New User', role:payload.role||'government', phone:payload.phone||'', status:'active', walletLinked: payload.walletLinked === 'on'}
    setUsers(u=>[newUser, ...u])
    // TODO: call Supabase create user endpoint in src/services
    e.target.reset()
    setError(null)
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">User & Identity Management</h2>
      {/* No toasts displayed after actions */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h4 className="font-semibold">All Users</h4>
          <div className="mt-3 flex gap-3 items-center">
            <label className="text-sm">Status</label>
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="border rounded p-1 text-sm">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
            </select>
            <label className="text-sm">Wallet</label>
            <select value={filterWallet} onChange={e=>setFilterWallet(e.target.value)} className="border rounded p-1 text-sm">
              <option value="all">Any</option>
              <option value="linked">Linked</option>
              <option value="unlinked">Unlinked</option>
            </select>
          </div>
          <table className="w-full mt-3 text-sm">
            <thead className="text-left text-slate-500"><tr><th>Name</th><th>Role</th><th>Phone</th><th>Status</th><th>Freeze</th></tr></thead>
            <tbody>
              {users.filter(u=> (filterStatus==='all' || u.status===filterStatus) && (filterWallet==='all' || (filterWallet==='linked' ? u.walletLinked : !u.walletLinked))).map(u=> (
                  <tr key={u.id} className="border-t">
                    <td className="py-2">{u.name}</td>
                    <td>{u.role}</td>
                    <td>{u.phone}</td>
                    <td>{u.status} {u.walletLinked ? <span className="ml-2 text-xs text-slate-400">(wallet)</span> : null}</td>
                    <td>
                      <ToggleSwitch checked={u.status==='active'} onChange={() => toggleStatus(u.id)} title={u.status==='active' ? 'Freeze account' : 'Unfreeze account'} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h4 className="font-semibold">Create Government Department</h4>
          <form onSubmit={handleCreate} className="mt-3 space-y-3">
            <input name="name" placeholder="Department name" className="w-full p-2 border rounded" required />
            <input
              name="phone"
              placeholder="Phone number"
              className="w-full p-2 border rounded"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              onChange={(e)=>{ e.target.value = e.target.value.replace(/\D/g,'').slice(0,10); if(error) setError(null) }}
            />
            <input name="role" defaultValue="government" hidden />
            <label className="flex items-center gap-2"><input type="checkbox" name="walletLinked" /> Wallet linked</label>
            <div>
              {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
              <button className="w-full btn-fill btn-primary">Create Government Department</button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="font-semibold">Freeze / Unfreeze Logs</h4>
          <div className="mt-3 text-sm">
            {logs.length===0 ? <div className="text-slate-500">No actions yet</div> : (
              <ul className="list-disc ml-5">
                {logs.map(l=> (
                  <li key={l.ts}>{new Date(l.ts).toLocaleString()}: {l.userName} — {l.action}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  )
}
