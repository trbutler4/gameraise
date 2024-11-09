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
      <div className="my-8 flex items-center justify-center text-xl text-white">
        Welcome to the Dungeon
      </div>
      <div className="flex flex-col justify-evenly space-y-8 px-12">
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
    </div>
  )
}
