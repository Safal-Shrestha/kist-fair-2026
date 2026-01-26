import React from 'react'
import { motion } from 'framer-motion'

export default function CardStat({ title, value, hint, children }) {
  return (
    <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="card">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-bold text-primary">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
      {children}
    </motion.div>
  )
}
