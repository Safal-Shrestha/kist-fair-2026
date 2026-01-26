import React, { useEffect, useState } from 'react'
import { fetchWallet } from '../../services/api'

export default function WalletDetails(){
  const [wallet, setWallet] = useState(null)

  useEffect(()=>{
    async function load(){
      const w = await fetchWallet()
      setWallet(w)
    }
    load()
  },[])

  if(!wallet) return <div className="container py-8">Loading...</div>

  return (
    <main className="container py-8">
      <h2 className="text-lg font-semibold text-primary">Wallet Details</h2>
      <div className="mt-4 card">
        <div className="text-sm text-slate-600">Balance</div>
        <div className="text-2xl font-bold mt-2">रु{wallet.balance}</div>
        <div className="mt-4">
          <h4 className="font-medium">Transactions</h4>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Date</th><th>Type</th><th>Amount</th><th>Description</th></tr></thead>
              <tbody>
                {wallet.transactions.map(t=> (
                  <tr key={t.id} className="border-t"><td>{t.date}</td><td>{t.type}</td><td>रु{t.amount}</td><td>{t.description}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
