"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
}

interface UserContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Mock login function
  const login = async (username: string, password: string) => {
    // In a real app, this would make an API call to verify credentials
    // For demo purposes, we'll just set a mock user
    setUser({
      id: "1",
      username,
      email: `${username}@example.com`,
    })
  }

  // Mock register function
  const register = async (username: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a new user
    // For demo purposes, we'll just log the registration attempt
    console.log("Registering user:", { username, email })
  }

  // Logout function
  const logout = () => {
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, register, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

