"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Player {
  id: string
  name: string
}

interface Match {
  id: string
  player1: Player | null
  player2: Player | null
  winner: Player | null
  round: number
  matchNumber: number
}

export default function TournamentBracket() {
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Player 1" },
    { id: "2", name: "Player 2" },
    { id: "3", name: "Player 3" },
    { id: "4", name: "Player 4" },
    { id: "5", name: "Player 5" },
    { id: "6", name: "Player 6" },
    { id: "7", name: "Player 7" },
    { id: "8", name: "Player 8" },
  ])

  const [matches, setMatches] = useState<Match[]>([
    // Round 1
    { id: "m1", player1: players[0], player2: players[1], winner: null, round: 1, matchNumber: 1 },
    { id: "m2", player1: players[2], player2: players[3], winner: null, round: 1, matchNumber: 2 },
    { id: "m3", player1: players[4], player2: players[5], winner: null, round: 1, matchNumber: 3 },
    { id: "m4", player1: players[6], player2: players[7], winner: null, round: 1, matchNumber: 4 },
    // Round 2
    { id: "m5", player1: null, player2: null, winner: null, round: 2, matchNumber: 1 },
    { id: "m6", player1: null, player2: null, winner: null, round: 2, matchNumber: 2 },
    // Final
    { id: "m7", player1: null, player2: null, winner: null, round: 3, matchNumber: 1 },
  ])

  const handleWinner = (matchId: string, winnerId: string) => {
    const updatedMatches = [...matches]
    const matchIndex = updatedMatches.findIndex((m) => m.id === matchId)

    if (matchIndex === -1) return

    const match = updatedMatches[matchIndex]
    const winner = match.player1?.id === winnerId ? match.player1 : match.player2

    updatedMatches[matchIndex] = { ...match, winner }

    // Update next round match
    if (match.round < 3) {
      const nextRoundMatchIndex = updatedMatches.findIndex(
        (m) => m.round === match.round + 1 && Math.ceil(match.matchNumber / 2) === m.matchNumber,
      )

      if (nextRoundMatchIndex !== -1) {
        const nextMatch = updatedMatches[nextRoundMatchIndex]
        if (match.matchNumber % 2 === 1) {
          updatedMatches[nextRoundMatchIndex] = { ...nextMatch, player1: winner }
        } else {
          updatedMatches[nextRoundMatchIndex] = { ...nextMatch, player2: winner }
        }
      }
    }

    setMatches(updatedMatches)
  }

  const renderMatch = (match: Match) => {
    return (
      <Card key={match.id} className="mb-4 w-full">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">
            Round {match.round} - Match {match.matchNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className={`${match.winner?.id === match.player1?.id ? "font-bold" : ""}`}>
                {match.player1?.name || "TBD"}
              </span>
              {match.player1 && match.player2 && !match.winner && (
                <Button size="sm" variant="outline" onClick={() => handleWinner(match.id, match.player1.id)}>
                  Win
                </Button>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className={`${match.winner?.id === match.player2?.id ? "font-bold" : ""}`}>
                {match.player2?.name || "TBD"}
              </span>
              {match.player1 && match.player2 && !match.winner && (
                <Button size="sm" variant="outline" onClick={() => handleWinner(match.id, match.player2.id)}>
                  Win
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Tournament Bracket</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Round 1</h3>
          {matches.filter((match) => match.round === 1).map(renderMatch)}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Semi-Finals</h3>
          {matches.filter((match) => match.round === 2).map(renderMatch)}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Final</h3>
          {matches.filter((match) => match.round === 3).map(renderMatch)}
        </div>
      </div>
    </div>
  )
}

