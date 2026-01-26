import React, { useEffect, useState } from 'react'
import { fetchWallet } from '../../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CitizenDashboard(){
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card md:col-span-2">
          <h3 className="font-semibold">Wallet Summary</h3>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-slate-500">Balance</div>
              <div className="text-2xl font-bold text-primary">रु{wallet.balance}</div>
            </div>
            <div>
              <div className="text-slate-500">Income</div>
              <div className="text-lg">रु{wallet.income}</div>
            </div>
            <div>
              <div className="text-slate-500">Expense</div>
              <div className="text-lg">रु{wallet.expense}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold">Recent Activity</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {wallet.transactions.map(t=> (
              <li key={t.id} className="flex justify-between"><span>{t.date} — {t.description}</span><span>रु{t.amount}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-6 card">
        <h4 className="font-semibold">Income / Expense Over Time</h4>
        <div className="h-48 mt-3">
          <ResponsiveContainer>
            <LineChart data={wallet.transactions.map((t,i)=>({name:t.date, amt:t.amount}))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amt" stroke="#0b3a66" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  )
}
