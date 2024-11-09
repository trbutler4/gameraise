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
    <div className="flex flex-col items-center justify-center text-white">
      <div className="text-2xl font-bold">{game.title}</div>
      <div className="my-6 text-xl font-bold">{game.description}</div>
      <div className="flex w-2/3 flex-col items-center justify-center">
        {game.is_proposed && (
          <div className="flex w-2/3 flex-col">
            <div className="flex flex-row items-center justify-center">
              <div className="mr-4">fund: </div>
              <GameProgressBar
                currentAmount={game.current_amount_usd}
                requestedAmount={game.total_amount_usd}
              />
              <div className="ml-4">{`${game.current_amount_usd}/${game.total_amount_usd}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="mr-4">Status:</div>
              <div>State 1 (Open Proposal)</div>
            </div>
            <div className="flex flex-row justify-end">
              <Button variant="outline">Fund</Button>
            </div>
            <div>
              <div className="flex flex-col">
                <div className="text-lg">Project milestones:</div>
                <Button variant="link" className="justify-start">
                  • Mainet launched
                </Button>
                <Button variant="link" className="justify-start">
                  • Smart contract audit
                </Button>
                <Button variant="link" className="justify-start">
                  • Token economy launched
                </Button>
                <Button variant="link" className="justify-start">
                  • Update marketplace
                </Button>
              </div>
            </div>
          </div>
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
