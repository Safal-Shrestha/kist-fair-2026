import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchMerchants, createMerchant } from '../../services/api'

export default function Merchants(){
  const [merchants, setMerchants] = useState([])
  const [form, setForm] = useState({ name:'', category:'', walletId:'' })

  useEffect(()=>{ fetchMerchants().then(setMerchants) },[])

  const handleCreate = async (e)=>{
    e.preventDefault()
    const res = await createMerchant({ name: form.name, category: form.category, walletId: Number(form.walletId) })
    if(res && res.success){ setMerchants(m=>[res.merchant, ...m]); setForm({ name:'', category:'', walletId:'' }) }
  }

  const handleApprove = (id)=>{
    setMerchants(m=> m.map(x=> x.id===id ? {...x, approved:true} : x))
  }

  const handleDeny = (id)=>{
    setMerchants(m=> m.map(x=> x.id===id ? {...x, approved:false} : x))
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Merchant System</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h4 className="font-semibold">Merchants</h4>
          <div className="mt-3 space-y-3">
            {merchants.map(m=> (
              <div key={m.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold">{m.name} {m.approved ? <span className="text-xs text-green-600 ml-2">(Approved)</span> : <span className="text-xs text-slate-400 ml-2">(Pending)</span>}</div>
                  <div className="text-xs text-slate-400">Category: {m.category} · Wallet: {m.walletId}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>handleApprove(m.id)} className="btn-fill btn-primary px-3 py-1 text-sm">Approve</button>
                  <button onClick={()=>handleDeny(m.id)} className="px-3 py-1 text-sm border rounded">Deny</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Create Merchant</h4>
          <form onSubmit={handleCreate} className="mt-3 space-y-3">
            <input name="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Business name" className="w-full p-2 border rounded" required />
            <input name="category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} placeholder="Category" className="w-full p-2 border rounded" />
            <input name="walletId" value={form.walletId} onChange={e=>setForm({...form, walletId:e.target.value.replace(/\D/g,'')})} placeholder="Wallet ID" className="w-full p-2 border rounded" />
            <div className="flex justify-end"><button className="btn-fill btn-primary">Create Merchant (mock)</button></div>
          </form>
        </div>
      </div>

      
    </motion.main>
  )
}
