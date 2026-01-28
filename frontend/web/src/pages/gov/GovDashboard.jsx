import React, { useEffect, useState } from 'react'
import { fetchBudgets, fetchTransactions } from '../../services/api'
import CardStat from '../../components/CardStat'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'

const COLORS = ['#0b3a66', '#2fa44f', '#94a3b8']

import { motion } from 'framer-motion'
import { formatINR } from '../../utils/format'

export default function GovDashboard(){
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(()=>{
    async function load(){
      const b = await fetchBudgets()
      setBudgets(b)
      const t = await fetchTransactions()
      setTransactions(t)
    }
    load()
  },[])

  const totalAllocated = budgets.reduce((s,b)=>s+(b.allocated||0),0)
  const totalUsed = budgets.reduce((s,b)=>s+(b.used||0),0)

  const pieData = budgets.map(b=>({name:b.name, value:b.allocated}))

  // Mock revenue vs expense series
  const series = [
    { month: 'Jan', revenue: 120, expense: 90 },
    { month: 'Feb', revenue: 150, expense: 110 },
    { month: 'Mar', revenue: 170, expense: 130 },
  ]

  // Project progress mock
  const projects = [
    { name: 'Education', progress: 70 },
    { name: 'Health', progress: 45 },
    { name: 'Infra', progress: 55 },
  ]

  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="py-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{greet}, John Doe</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
        <CardStat title="Total Allocated" value={formatINR(totalAllocated)} />
        <CardStat title="Total Used" value={formatINR(totalUsed)} />
        <CardStat title="Active Projects" value={projects.length} />
      </div>

      <div className="container mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="card lg:col-span-2" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.08}}>
          <h4 className="font-semibold">Revenue vs Expense</h4>
          <div className="h-56 mt-3">
            <ResponsiveContainer>
              <BarChart data={series}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0b3a66" isAnimationActive={true} animationDuration={900} />
                <Bar dataKey="expense" fill="#2fa44f" isAnimationActive={true} animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.12}}>
          <h4 className="font-semibold">Leads / Allocation Share</h4>
          <div className="h-40 mt-3">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={60} isAnimationActive={true} animationDuration={900}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="container mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.16}}>
          <h4 className="font-semibold">Project Progress</h4>
          <div className="mt-3 space-y-3">
            {projects.map(p=> (
              <div key={p.name}>
                <div className="flex justify-between text-sm text-slate-600"><span>{p.name}</span><span>{p.progress}%</span></div>
                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                  <div style={{width:`${p.progress}%`}} className="h-2 bg-primary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.20}}>
          <h4 className="font-semibold">Recent Expenditures</h4>
          <div className="mt-3 text-sm">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500"><tr><th>Date</th><th>Department</th><th>Amount</th></tr></thead>
              <tbody>
                {transactions.slice(0,6).map(t=> (
                  <tr key={t.id} className="border-t"><td>{t.date}</td><td>{t.department}</td><td>{new Intl.NumberFormat().format(t.amount)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
