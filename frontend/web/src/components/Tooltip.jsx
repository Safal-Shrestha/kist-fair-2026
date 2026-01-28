import React from 'react'
import { motion } from 'framer-motion'

export default function Tooltip({ children, content, className='' }){
  return (
    <div className={`relative inline-block group ${className}`}>
      {children}
      <motion.div initial={{opacity:0,y:6}} animate={{opacity:0}} whileHover={{opacity:1,y:0}} className="absolute z-50 invisible group-hover:visible -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1" style={{whiteSpace:'nowrap'}}>
        {content}
      </motion.div>
    </div>
  )
}
