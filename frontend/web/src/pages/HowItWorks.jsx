import React from 'react'
import { motion } from 'framer-motion'

export default function HowItWorks(){
  return (
    <main className="container py-12">
      <h2 className="text-2xl font-semibold text-primary">How it Works</h2>

      <p className="mt-4 text-slate-700">This page explains how the client-side mobile experience works within the e-Sikka simulation.</p>

      <section className="mt-6 grid gap-4">
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="card">
          <h4 className="font-semibold">Citizens: Phone + PIN</h4>
          <p className="text-sm text-slate-600 mt-1">Citizens log in with their phone number and a 4-digit PIN to access wallet features on the mobile client.</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.06}} className="card">
          <h4 className="font-semibold">Wallet & Transactions</h4>
          <p className="text-sm text-slate-600 mt-1">Users view balances, income and expense logs, and a full transaction history. Transactions are recorded with an auditable trail (simulated).</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.12}} className="card">
          <h4 className="font-semibold">Receiving Benefits</h4>
          <p className="text-sm text-slate-600 mt-1">Government disbursements (benefits) are delivered digitally to citizen wallets and visible instantly in the mobile app.</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.18}} className="card">
          <h4 className="font-semibold">Security & Simulation</h4>
          <p className="text-sm text-slate-600 mt-1">Access is role-based, PIN-protected, and all actions are logged for audit. Backend integrations (Supabase) are stubbed with TODO comments for future secure implementation.</p>
        </motion.div>
      </section>
    </main>
  )
}
