import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import HowItWorks from './HowItWorks'

export default function About(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex-1 container py-12">
        <h1 className="text-3xl font-semibold mb-4">About e-Sikka</h1>

        <section className="space-y-6">
          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
            <h3 className="font-semibold">Problem Statements</h3>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>Lack of transparency in government fund distribution.</li>
              <li>Difficulty tracking citizen-level transactions.</li>
              <li>Need for secure, centralized wallet infrastructure.</li>
            </ul>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.04}}>
            <h3 className="font-semibold">Solutions</h3>
            <p className="mt-2 text-sm text-slate-700">e-Sikka provides a CBDC simulation platform tailored for the Nepal Rastra Bank. Key aspects:
            <ul className="list-disc ml-5 mt-2">
              <li>Role-based access for citizens, merchants, and government departments.</li>
              <li>Real-time analytics and budget control via the admin dashboard.</li>
              <li>Automated wallet provisioning (personal + subsidy sub-wallets).</li>
            </ul>
            </p>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.08}}>
            <h3 className="font-semibold">Security</h3>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>PIN-based login for mobile clients.</li>
              <li>Role-based authentication for admin and citizen workflows.</li>
              <li>Data encryption and audit logging (mocked in demo; Supabase-ready placeholders included).</li>
            </ul>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.12}}>
            <h3 className="font-semibold">Future Scope</h3>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>QR payments and merchant integrations.</li>
              <li>Mobile-first native apps with offline reconciliation.</li>
              <li>Full Supabase integration for persistence and auth.</li>
            </ul>
          </motion.article>
        </section>
        
        {/* Merge HowItWorks sections here for client-side flows, security, and implementation notes */}
        <motion.section className="mt-6 space-y-6">
          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
            <h3 className="font-semibold">Client-Side Flow</h3>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>Citizens log in with phone + PIN; wallets are auto-created with personal and subsidy sub-wallets.</li>
              <li>Citizens can view balances, transaction history, and subsidy restrictions (expiry, category rules).</li>
              <li>Merchants receive payments linked to categories; transactions enforce category rules and limits.</li>
            </ul>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.04}}>
            <h3 className="font-semibold">Security & CBDC Simulation</h3>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>Sub-wallet restrictions enforce spending rules and expiry to prevent misuse.</li>
              <li>Government departments allocate budgets transparently; all allocations are auditable.</li>
              <li>Transactions are idempotent to avoid double-spend; admin oversight enables freezes and account controls.</li>
            </ul>
          </motion.article>

          <motion.article className="card" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.08}}>
            <h3 className="font-semibold">Implementation Notes</h3>
            <ul className="mt-3 list-disc ml-5 text-sm text-slate-700">
              <li>All forms use <code>&lt;form&gt;</code> and <code>&lt;input&gt;</code> and placeholder hooks for Supabase endpoints.</li>
              <li>Security features are mocked; Supabase-ready integration points are marked in services.</li>
              <li>Future capabilities: QR payments, offline reconciliation, and richer analytics.</li>
            </ul>
          </motion.article>
        </motion.section>
      </motion.main>
      <Footer />
    </div>
  )
}

