"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProfilePage() {
  const { user } = useUser()
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "Pong enthusiast and competitive player",
  })

  // Mock match history data
  const matchHistory = [
    { id: 1, opponent: "pongmaster", result: "Win", score: "10-8", date: "2023-06-15" },
    { id: 2, opponent: "paddleking", result: "Loss", score: "7-10", date: "2023-06-14" },
    { id: 3, opponent: "ballchaser", result: "Win", score: "10-5", date: "2023-06-12" },
    { id: 4, opponent: "pingpro", result: "Win", score: "10-9", date: "2023-06-10" },
    { id: 5, opponent: "rallyrookie", result: "Loss", score: "8-10", date: "2023-06-08" },
  ]

  // Mock stats data
  const stats = {
    totalGames: 42,
    wins: 28,
    losses: 14,
    winRate: "66.7%",
    averageScore: "9.2",
    highestScore: "15",
    tournamentWins: 2,
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call to update the profile
    console.log("Updating profile:", profileData)
    alert("Profile updated successfully!")
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>You need to be logged in to view your profile.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.username} />
              <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="mt-4 text-center">
              <p className="text-sm">{profileData.bio}</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="stats">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="history">Match History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Player Statistics</CardTitle>
                  <CardDescription>Your performance in Pong games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Games</p>
                      <p className="text-2xl font-bold">{stats.totalGames}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Wins</p>
                      <p className="text-2xl font-bold text-green-600">{stats.wins}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Losses</p>
                      <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Win Rate</p>
                      <p className="text-2xl font-bold">{stats.winRate}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Avg. Score</p>
                      <p className="text-xl font-bold">{stats.averageScore}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Highest Score</p>
                      <p className="text-xl font-bold">{stats.highestScore}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Tournament Wins</p>
                      <p className="text-xl font-bold">{stats.tournamentWins}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Match History</CardTitle>
                  <CardDescription>Your recent games</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Opponent</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matchHistory.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>{match.opponent}</TableCell>
                          <TableCell>{match.score}</TableCell>
                          <TableCell>
                            <span className={match.result === "Win" ? "text-green-600" : "text-red-600"}>
                              {match.result}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

