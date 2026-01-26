import React, { useState } from 'react'

export default function Accounts(){
  const [accounts] = useState([
    {id:1, name:'Ram', phone:'9800000001', balance:1200, status:'active'},
    {id:2, name:'Sita', phone:'9800000002', balance:450, status:'active'},
    {id:3, name:'Hari', phone:'9800000003', balance:0, status:'frozen'}
  ])

  return (
    <main className="container py-8">
      <h2 className="text-xl font-semibold">All Citizen Accounts</h2>
      <div className="mt-4 card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500"><tr><th>Name</th><th>Phone</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>
            {accounts.map(a=> (
              <tr key={a.id} className="border-t"><td>{a.name}</td><td>{a.phone}</td><td>रु{a.balance}</td><td>{a.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
