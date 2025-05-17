import TournamentBracket from "@/components/tournament-bracket"

export default function TournamentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tournaments</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <TournamentBracket />
      </div>
    </div>
  )
}

