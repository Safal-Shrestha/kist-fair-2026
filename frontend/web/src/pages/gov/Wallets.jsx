import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Tooltip from '../../components/Tooltip'
import { formatINR } from '../../utils/format'

const CURRENT_VERSION = 'v1.2'
const MOCK_WALLETS = [
  { id:1, owner:'Ram Thapa', ownerFrozen:false, personal:5000, subsidy:1200, subsidyExpiry:'2026-03-01', restrictions:'food', version: 'v1.2' },
  { id:2, owner:'Sita Karki', ownerFrozen:true, personal:3000, subsidy:0, subsidyExpiry:'2024-12-01', restrictions:'', version: 'v1.0' },
]

export default function Wallets(){
  const [wallets] = useState(MOCK_WALLETS)

  const isExpired = (expiry) => {
    if(!expiry) return false
    return new Date(expiry) < new Date()
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="py-6">
      <h2 className="text-xl font-semibold mb-4">Wallet Oversight</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="font-semibold">Totals</h4>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="p-3 bg-white/5 rounded">Total Balance<br/><strong>{formatINR(8200)}</strong></div>
            <div className="p-3 bg-white/5 rounded">Allocated<br/><strong>{formatINR(5000)}</strong></div>
            <div className="p-3 bg-white/5 rounded">Expired<br/><strong>{formatINR(200)}</strong></div>
          </div>
        </div>
        <div className="card lg:col-span-2">
          <h4 className="font-semibold">Wallets</h4>
          <div className="mt-3 space-y-3">
            {wallets.map(w=> (
              <div key={w.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold">{w.owner} <span className="text-xs ml-2 text-slate-400">{w.version}</span></div>
                  <div className="text-xs text-slate-400">Personal: {formatINR(w.personal)} · Subsidy: {formatINR(w.subsidy)}</div>
                  <div className="text-xs text-slate-400">Expiry: {w.subsidyExpiry || '—'} · {isExpired(w.subsidyExpiry) ? <span className="text-red-600 font-medium">Expired</span> : <span className="text-green-600">Active</span>}</div>
                </div>

                <div className="text-sm text-slate-600 flex items-center gap-3">
                  <div>{w.restrictions ? `Restricted: ${w.restrictions}` : 'No restrictions'}</div>
                  {(()=>{
                    const reasons = []
                    if(isExpired(w.subsidyExpiry)) reasons.push('subsidy expired')
                    if(w.restrictions) reasons.push(`category restriction: ${w.restrictions}`)
                    if(w.ownerFrozen) reasons.push('owner account frozen')
                    if(w.version !== CURRENT_VERSION) reasons.push(`version mismatch (${w.version} != ${CURRENT_VERSION})`)
                    if(reasons.length===0) reasons.push('no restrictions — spendable')
                    return (
                      <Tooltip content={reasons.join('. ')}>
                        <button className="p-1 rounded border text-xs">Why?</button>
                      </Tooltip>
                    )
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  )
}
