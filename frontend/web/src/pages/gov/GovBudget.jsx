import React, { useEffect, useState } from 'react'
import { fetchBudgets, createBudget, updateBudget } from '../../services/api'

export default function GovBudget(){
  const [budgets, setBudgets] = useState([])
  const [form, setForm] = useState({name:'', allocated:''})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function load(){
      const b = await fetchBudgets()
      setBudgets(b)
    }
    load()
  },[])

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleCreate = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      await createBudget({ name: form.name, allocated: Number(form.allocated) })
      const b = await fetchBudgets()
      setBudgets(b)
      setForm({name:'', allocated:''})
    }catch(err){
    }finally{ setLoading(false) }
  }

  return (
    <main className="container py-8">
      <h2 className="text-lg font-semibold text-primary">Budget Management</h2>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-medium">Allocate Budget</h3>
          <form onSubmit={handleCreate} className="mt-3 space-y-3">
            <div>
              <label className="block text-sm text-slate-700">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm text-slate-700">Amount</label>
              <input name="allocated" value={form.allocated} onChange={handleChange} required type="number" className="mt-1 w-full border rounded p-2" />
            </div>
            <div className="flex justify-end">
              <button disabled={loading} className="px-4 py-2 btn-fill btn-primary" style={{opacity: loading?0.6:1}}>Create</button>
            </div>
          </form>
        </div>

        <div className="card">
          <h3 className="font-medium">Budgets</h3>
          <div className="mt-3">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Name</th><th>Allocated</th><th>Used</th></tr></thead>
              <tbody>
                {budgets.map(b=> (
                  <tr key={b.id} className="border-t"><td>{b.name}</td><td>{new Intl.NumberFormat().format(b.allocated)}</td><td>{new Intl.NumberFormat().format(b.used || 0)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
