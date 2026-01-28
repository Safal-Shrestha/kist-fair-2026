import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import GovDashboard from '../pages/gov/GovDashboard'
import GovBudget from '../pages/gov/GovBudget'
import GovTransactions from '../pages/gov/Transactions'
import Departments from '../pages/gov/Departments'
import BudgetAllocation from '../pages/gov/BudgetAllocation'
import Accounts from '../pages/gov/Accounts'
import FreezeAccount from '../pages/gov/FreezeAccount'
import Users from '../pages/gov/Users'
import Wallets from '../pages/gov/Wallets'
import Merchants from '../pages/gov/Merchants'
import AdminUtilities from '../pages/gov/AdminUtilities'
import Subsidies from '../pages/gov/Subsidies'
import About from '../pages/About'
import HowItWorks from '../pages/HowItWorks'
import CitizenDashboard from '../pages/citizen/CitizenDashboard'
import WalletDetails from '../pages/citizen/WalletDetails'
import Documentation from '../pages/Documentation'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminLayout from '../layouts/AdminLayout'
import CitizenLayout from '../layouts/CitizenLayout'

export default function AppRoutes() {
  const location = useLocation()

  const Page = ({ children }) => (
    <motion.div initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -12, opacity: 0 }} transition={{ duration: 0.28 }}>
      {children}
    </motion.div>
  )

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Landing /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/how-it-works" element={<Page><HowItWorks /></Page>} />
        <Route path="/login" element={<Page><Login /></Page>} />

        <Route
          path="/gov/*"
          element={
            <Page>
              <ProtectedRoute allowedRoles={["government"]}>
                <AdminLayout>
                  <Routes>
                      <Route index element={<GovDashboard />} />
                      <Route path="budgets" element={<BudgetAllocation />} />
                      <Route path="transactions" element={<GovTransactions />} />
                      <Route path="departments" element={<Departments />} />
                      <Route path="budgets-alloc" element={<BudgetAllocation />} />
                      <Route path="accounts" element={<Accounts />} />
                      <Route path="freeze" element={<FreezeAccount />} />
                      <Route path="users" element={<Users />} />
                      <Route path="wallets" element={<Wallets />} />
                      <Route path="merchants" element={<Merchants />} />
                      <Route path="subsidies" element={<Subsidies />} />
                      <Route path="admin" element={<AdminUtilities />} />
                    </Routes>
                </AdminLayout>
              </ProtectedRoute>
            </Page>
          }
        />

        <Route
          path="/citizen/*"
          element={
            <Page>
              <ProtectedRoute allowedRoles={["citizen"]}>
                <CitizenLayout>
                  <Routes>
                    <Route index element={<CitizenDashboard />} />
                    <Route path="wallet" element={<WalletDetails />} />
                  </Routes>
                </CitizenLayout>
              </ProtectedRoute>
            </Page>
          }
        />

        <Route path="/docs" element={<Page><Documentation /></Page>} />
        <Route path="/404" element={<Page><NotFound /></Page>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
