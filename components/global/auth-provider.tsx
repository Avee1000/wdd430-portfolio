'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: number
  email: string
  name?: string
  role: string
}

interface AuthState {
  user: User | null
  loading: boolean
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  })

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setState((prev) => ({ ...prev, user: data.user, loading: false }))
      } else {
        setState((prev) => ({ ...prev, user: null, loading: false }))
      }
    } catch {
      setState((prev) => ({ ...prev, user: null, loading: false }))
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    const initializeSession = async () => {
      await refreshSession()
      if (isCancelled) return
    }

    initializeSession()

    return () => {
      isCancelled = true
    }
  }, [refreshSession])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Login failed')
    }

    const data = await response.json()
    setState({ user: data.user, loading: false })
  }

  const signup = async (email: string, password: string, name?: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
      credentials: 'include',
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Signup failed')
    }

    const data = await response.json()
    setState({ user: data.user, loading: false })
  }

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setState({ user: null, loading: false })
    router.refresh()
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: !!state.user,
        login,
        signup,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
