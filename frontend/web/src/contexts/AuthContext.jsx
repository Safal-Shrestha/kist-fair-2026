import React, { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const u = await authService.getCurrentUser()
      setUser(u)
      setLoading(false)
    }
    load()
  }, [])

  const login = async (email, password, role) => {
    const u = await authService.login({ email, password, role })
    setUser(u)
    return u
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
