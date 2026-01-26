import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

const cards = [
  { title: 'Wallet balance tracking', desc: 'Always know current balance on the mobile app.' },
  { title: 'Income & expense logs', desc: 'View incoming transfers and expense history quickly.' },
  { title: 'Secure digital payments', desc: 'Make and receive payments with PIN protection (simulated).' },
  { title: 'Government benefit receipts', desc: 'Receive and verify benefit disbursements instantly.' },
  { title: 'Transaction history', desc: 'Full, auditable ledger of transactions per citizen.' },
]

export default function Landing(){
  return (
    <div>
      <header className="bg-navy-royal text-on-gradient">
        <div className="container py-20 grid lg:grid-cols-2 gap-8 items-center">
            <div>
            <img src="/src/assets/logo.png" alt="e-SIKKA" className="h-20 mb-4" />
            <h1 className="text-3xl lg:text-4xl font-semibold fade-in">e-SIKKA</h1>
            <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}} className="mt-3 text-xl lg:text-2xl font-medium">
              <span className="typing">Mobile-first CBDC simulation for Nepal Rastra Bank</span>
            </motion.h2>
            <p className="mt-4 max-w-2xl text-slate-200 fade-in">Citizens use a mobile app to view wallet balances, receive government benefits, and perform secure PIN-protected transactions. The app mirrors real-world flows while the admin portal provides analytics and control.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/login" className="px-4 py-2 btn-fill btn-primary rounded shadow">Login</Link>
              <a href="#features" className="px-4 py-2 btn-fill border border-white/30 rounded text-white/90">How it works</a>
            </div>
          </div>
          <div className="w-full">
            <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:.25}} className="w-full h-56 sm:h-72 md:h-96 overflow-hidden rounded-md">
              <video src="/src/assets/landing-page.mp4" className="w-full h-full object-cover" autoPlay muted playsInline loop />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <section id="features" className="grid gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{opacity:0,y:10},visible:{opacity:1,y:0,transition:{staggerChildren:0.12}}}} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <motion.article key={c.title} className="card" variants={{hidden:{opacity:0,y:8},visible:{opacity:1,y:0}}}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#7C4DFF] rounded flex items-center justify-center text-white font-semibold">{c.title[0]}</div>
                  <div>
                    <h4 className="font-semibold">{c.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
