import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function HowItWorks(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex-1 container py-12">
        <h1 className="text-3xl font-semibold mb-4">How e-Sikka works</h1>

        <section className="space-y-6">
          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
            <h4 className="font-semibold">Client-Side Flow</h4>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>Citizens log in with phone + PIN; wallets are auto-created with personal and subsidy sub-wallets.</li>
              <li>Citizens can view balances, transaction history, and subsidy restrictions (expiry, category rules).</li>
              <li>Merchants receive payments linked to categories; transactions enforce category rules and limits.</li>
            </ul>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.04}}>
            <h4 className="font-semibold">Security & CBDC Simulation</h4>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>Sub-wallet restrictions enforce spending rules and expiry to prevent misuse.</li>
              <li>Government departments allocate budgets transparently; all allocations are auditable.</li>
              <li>Transactions are idempotent to avoid double-spend; admin oversight enables freezes and account controls.</li>
            </ul>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.08}}>
            <h4 className="font-semibold">Implementation Notes</h4>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>All forms use <code>&lt;form&gt;</code> and <code>&lt;input&gt;</code> and placeholder hooks for Supabase endpoints.</li>
              <li>Security features are mocked; Supabase-ready integration points are marked in services.</li>
              <li>Future capabilities: QR payments, offline reconciliation, and richer analytics.</li>
            </ul>
          </motion.article>
        </section>

        <div className="mt-8">
          <Link to="/" className="btn-fill btn-primary px-4 py-2">Back to Home</Link>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

