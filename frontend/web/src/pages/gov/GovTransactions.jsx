import React, { useEffect, useState } from 'react'
import { fetchTransactions } from '../../services/api'

export default function GovTransactions(){
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    async function load(){
      const t = await fetchTransactions()
      setTransactions(t)
    }
    load()
  },[])

  const filtered = transactions.filter(tx => !filter || tx.department.toLowerCase().includes(filter.toLowerCase()))

  return (
    <main className="container py-8">
      <h2 className="text-lg font-semibold text-primary">Expenditure Logs</h2>
      <div className="mt-4 card">
        <div className="flex items-center gap-3">
          <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder="Filter by department" className="border p-2 rounded" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500"><tr><th>Date</th><th>Department</th><th>Amount</th><th>Purpose</th></tr></thead>
            <tbody>
              {filtered.map(t=> (
                <tr key={t.id} className="border-t"><td>{t.date}</td><td>{t.department}</td><td>{new Intl.NumberFormat().format(t.amount)}</td><td>{t.purpose}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
