import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function CitizenLayout({ children }){
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setOpen(o=>!o)} />
      <div className="flex flex-1">
        {open && <Sidebar role="citizen" />}
        <div className="flex-1 bg-gray-50 p-6">
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.36}}>
            {children}
          </motion.div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
