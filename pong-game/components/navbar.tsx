"use client"

import { useState } from "react"
import Link from "next/link"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useUser()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Pong Game
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              Leaderboard
            </Link>
            <Link
              href="/tournaments"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              Tournaments
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Profile
                </Link>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default">Login</Button>
            )}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              Leaderboard
            </Link>
            <Link
              href="/tournaments"
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              Tournaments
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Profile
                </Link>
                <Button variant="outline" onClick={logout} className="w-full justify-start">
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default" className="w-full justify-start">
                Login
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-full justify-start">
              {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}

