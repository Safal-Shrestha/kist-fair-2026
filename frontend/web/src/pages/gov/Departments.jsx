import React, { useState } from 'react'

export default function Departments(){
  const [depts, setDepts] = useState([{id:1,name:'Education'},{id:2,name:'Health'},{id:3,name:'Infrastructure'}])
  const [name, setName] = useState('')

  function add(e){
    e.preventDefault()
    if(!name) return
    setDepts(d=>[...d,{id:Date.now(), name}])
    setName('')
  }

  function remove(id){ setDepts(d=>d.filter(x=>x.id!==id)) }

  return (
    <main className="container py-8">
      <h2 className="text-xl font-semibold">Government Departments</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="card">
          <form onSubmit={add} className="space-y-3">
            <label className="block text-sm">Department name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded p-2" />
            <div><button className="px-3 py-1 btn-fill btn-primary">Add</button></div>
          </form>
        </div>

        <div className="card">
          <h4 className="font-semibold">Existing Departments</h4>
          <ul className="mt-3 space-y-2">
            {depts.map(d=> (
              <li key={d.id} className="flex justify-between items-center"><span>{d.name}</span><div className="space-x-2"><button onClick={()=>remove(d.id)} className="text-sm text-red-600">Delete</button></div></li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
