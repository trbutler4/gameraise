"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase"

import GameHero from "@/components/game-hero"

export default function GetGaming() {
  const [games, setGames] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from("game").select("*")

      if (error) {
        console.error("Error fetching games:", error)
        return
      }

      if (data) {
        console.log(data)
        setGames(data)
      }
    }

    fetchGames()
  }, [])

  return (
    <div>
      {games.map((game) => (
        <GameHero
          title={game.title}
          description={game.description}
          key={game.id}
          requestedAmount={game.total_amount_usd}
          currentAmount={game.current_amount_usd}
          requestedDuration={game.duration}
          onCardPressed={() => router.push(`/game/${game.id}`)}
        />
      ))}
    </div>
  )
}
