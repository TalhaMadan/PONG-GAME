import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LeaderboardPage() {
  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, username: "champion", wins: 42, losses: 5, winRate: "89.4%" },
    { rank: 2, username: "pongmaster", wins: 38, losses: 7, winRate: "84.4%" },
    { rank: 3, username: "paddleking", wins: 35, losses: 10, winRate: "77.8%" },
    { rank: 4, username: "ballchaser", wins: 30, losses: 12, winRate: "71.4%" },
    { rank: 5, username: "pingpro", wins: 28, losses: 15, winRate: "65.1%" },
    { rank: 6, username: "rallyrookie", wins: 25, losses: 18, winRate: "58.1%" },
    { rank: 7, username: "servesmasher", wins: 22, losses: 20, winRate: "52.4%" },
    { rank: 8, username: "bounceback", wins: 20, losses: 22, winRate: "47.6%" },
    { rank: 9, username: "paddlepro", wins: 18, losses: 25, winRate: "41.9%" },
    { rank: 10, username: "newplayer", wins: 10, losses: 30, winRate: "25.0%" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Players</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Wins</TableHead>
                <TableHead className="text-right">Losses</TableHead>
                <TableHead className="text-right">Win Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>{player.username}</TableCell>
                  <TableCell className="text-right">{player.wins}</TableCell>
                  <TableCell className="text-right">{player.losses}</TableCell>
                  <TableCell className="text-right">{player.winRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

