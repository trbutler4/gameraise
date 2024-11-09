"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import GameProgressBar from "@/components/game-progress-bar"

export default function GamePage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [contributionAmount, setContributionAmount] = useState()

  useEffect(() => {
    async function fetchGame() {
      const { data, error } = await supabase
        .from("game")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching game:", error)
      } else {
        setGame(data)
      }
      setLoading(false)
    }

    fetchGame()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!game) return <div>Game not found</div>

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">{game.title}</div>
      <div className="flex w-2/3 flex-col items-center justify-center">
        {game.is_proposed && (
          <>
            <div>Status: State 1 (Open Proposal)</div>
            <GameProgressBar
              currentAmount={game.current_amount_usd}
              requestedAmount={game.total_amount_usd}
            />
            <div>
              <Button>Contribute</Button>
            </div>
          </>
        )}
        {game.is_active && (
          <>
            <div>Status: Stage 2 (Streaming Funds)</div>
            <GameProgressBar
              currentAmount={game.streamed_amount}
              requestedAmount={game.total_amount_usd}
            />
            <div>
              <Button variant="destructive">Stop Fund</Button>
            </div>
          </>
        )}
        {game.is_live && (
          <>
            <div>Status: Stage 3 (Live Game)</div>
            <GameProgressBar currentAmount={1} requestedAmount={1} />
            <Button variant="destructive">Play Game</Button>
            <Card className="mt-6">
              <CardTitle className="mb-2 flex items-center justify-center">
                Earned Perks
              </CardTitle>
              <CardContent>
                <div>1. Playtest of Alpha v1.2</div>
                <div>2. Gated discord community</div>
                <div>3. 50% off on game launch</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
