import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <main className="container py-12">
      <h2 className="text-2xl font-semibold text-primary">About e-Sikka</h2>

      <section className="mt-6 grid gap-4">
        <div className="card">
          <h4 className="font-semibold">Problem Statements</h4>
          <ul className="mt-2 list-disc pl-5 text-slate-700">
            <li>Lack of transparency in government fund distribution</li>
            <li>Difficulty in tracking citizen-level transactions</li>
            <li>Need for secure digital wallet infrastructure</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-semibold">Proposed Solutions</h4>
          <ul className="mt-2 list-disc pl-5 text-slate-700">
            <li>A centralized CBDC simulation platform</li>
            <li>Role-based access for government and citizens</li>
            <li>Real-time analytics and budget control</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-semibold">Security Features</h4>
          <ul className="mt-2 list-disc pl-5 text-slate-700">
            <li>Role-based authentication</li>
            <li>PIN-based login for mobile clients</li>
            <li>Data encryption (mocked for demo)</li>
            <li>Future integration: Supabase auth & mobile security layers</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {title:'Transparency', desc:'Clear audit trails and reporting.'},
          {title:'Security', desc:'Role-based access and controlled simulations.'},
          {title:'Integration', desc:'API-ready design for Supabase and mobile clients.'}
        ].map(c=> (
          <motion.article key={c.title} className="card" initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#7C4DFF] rounded flex items-center justify-center text-white font-semibold">{c.title[0]}</div>
              <div>
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{c.desc}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  )
}
