"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export default function LiveChat() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Mock online users
  const onlineUsers = [
    { id: "1", username: "pongmaster" },
    { id: "2", username: "paddleking" },
    { id: "3", username: "ballchaser" },
    { id: "4", username: "pingpro" },
  ]

  // Mock initial messages
  useEffect(() => {
    const initialMessages = [
      {
        id: "1",
        sender: "pongmaster",
        content: "Hey everyone! Who's up for a game?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        sender: "paddleking",
        content: "I'm in! Let's start a tournament.",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        sender: "ballchaser",
        content: "Count me in too!",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
      {
        id: "4",
        sender: "system",
        content: "A new tournament has been created. Join now!",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
    ]
    setMessages(initialMessages)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      sender: user.username,
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg">Live Chat</CardTitle>
      </CardHeader>
      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                {message.sender !== "system" ? (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.sender.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-8 w-8 flex items-center justify-center bg-primary/10 rounded-full">
                    <span className="text-xs text-primary">SYS</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {message.sender === "system" ? "System" : message.sender}
                    </span>
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                  </div>
                  <p className="text-sm mt-1">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="w-48 border-l p-3 hidden md:block">
          <h3 className="text-sm font-semibold mb-2">Online Users</h3>
          <div className="space-y-2">
            {onlineUsers.map((onlineUser) => (
              <div key={onlineUser.id} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">{onlineUser.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CardFooter className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!user}
          />
          <Button type="submit" disabled={!user}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

