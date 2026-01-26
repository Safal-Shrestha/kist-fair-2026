import React, { useState } from 'react'

export default function FreezeAccount(){
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState(null)

  function submit(e){
    e.preventDefault()
    // TODO: POST to Supabase to change account status
    setStatus(`Account ${phone} frozen/unfrozen (mock)`)
  }

  return (
    <main className="container py-8">
      <h2 className="text-xl font-semibold">Account Freeze / Unfreeze</h2>
      <div className="mt-4 card">
        <form onSubmit={submit} className="grid gap-3">
          <label className="text-sm">Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} className="border rounded p-2" placeholder="10-digit phone" />
          <label className="text-sm">Reason</label>
          <input value={reason} onChange={e=>setReason(e.target.value)} className="border rounded p-2" />
          <div><button className="px-3 py-1 btn-fill btn-primary">Confirm</button></div>
          {status && <div className="text-sm text-slate-600">{status}</div>}
        </form>
      </div>
    </main>
  )
}
