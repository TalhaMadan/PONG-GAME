"use client"

import { useState } from "react"
import PongGame from "@/components/pong-game"
import Navbar from "@/components/navbar"
import UserAuth from "@/components/user-auth"
import { UserProvider } from "@/context/user-context"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {!isLoggedIn ? (
            <UserAuth onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <div className="grid gap-8">
              <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Welcome to Pong Game</h2>
                <p className="mb-4">Challenge your friends or play against AI in this classic game!</p>
                <PongGame />
              </section>
            </div>
          )}
        </main>
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Pong Game. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </UserProvider>
  )
}

