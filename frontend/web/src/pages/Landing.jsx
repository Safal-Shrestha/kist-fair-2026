import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const cards = [
  { title: 'Citizen Wallets', desc: 'Auto-created wallet with personal and subsidy sub-wallets for targeted benefits and restrictions.' },
  { title: 'Merchant Payments', desc: 'Secure, categorized merchant payments enforcing spending categories and rules.' },
  { title: 'Government Oversight', desc: 'Transparent budget allocation and monitoring with auditable records.' },
  { title: 'Subsidy Distribution', desc: 'Targeted subsidies with expiry dates and spending restrictions to prevent misuse.' },
]

export default function Landing(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="w-full bg-navy-royal text-on-gradient">
        <motion.section initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.46}} className="py-20">
          <div className="container grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img src="/assets/logo.png" alt="e-SIKKA" className="h-32 mb-4" />
              <h1 className="text-3xl lg:text-4xl font-semibold fade-in">e-SIKKA</h1>
              <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}} className="mt-3 text-xl lg:text-2xl font-medium">
                <span className="typing">CBDC simulation for Nepal Rastra Bank</span>
              </motion.h2>
              <p className="mt-4 max-w-2xl text-slate-200 fade-in">Citizens use a mobile app to view wallet balances, receive government benefits, and perform secure PIN-protected transactions. The app mirrors real-world flows while the admin portal provides analytics and control.</p>
              <div className="mt-6 flex gap-3 items-center">
                <Link to="/about" className="px-3 py-1 btn btn-fill text-sm">About e-Sikka</Link>
                <Link to="/login" className="px-3 py-1 btn-fill btn-primary text-sm">Login</Link>
              </div>
            </div>
            <div className="w-full">
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:.25}} className="w-full h-56 sm:h-72 md:h-96 overflow-hidden rounded-md">
            <video src="/assets/landing-page.mp4" className="w-full h-full object-cover" autoPlay muted playsInline loop />
          </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      <main className="container py-12">
        <section id="features" className="grid gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{opacity:0,y:10},visible:{opacity:1,y:0,transition:{staggerChildren:0.12}}}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
