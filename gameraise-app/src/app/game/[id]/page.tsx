"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { supabase } from "@/utils/supabase"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

import { useSuperfluid } from "@/hooks/use-superfluid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import GameProgressBar from "@/components/game-progress-bar"

export default function GamePage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [contributionAmount, setContributionAmount] = useState()
  const { createPool, createStream, message } = useSuperfluid()

  const [amount, setAmount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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
        // Only update amount if not streaming
        if (!data.is_streaming) {
          setAmount(data.current_amount_usd)
        }
      }
      setLoading(false)
    }

    fetchGame()
  }, [params.id, game])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    const refreshRate = 1000

    if (game?.is_streaming) {
      // Initialize amount when streaming starts
      setAmount(game.streamed_amount || 0)

      intervalId = setInterval(() => {
        setAmount((prevAmount) => {
          const increment =
            game.total_amount_usd / (game.duration_days * 24 * 3600)
          const newAmount = Math.min(
            prevAmount + increment,
            game.current_amount_usd
          )

          // Update database with streamed amount
          supabase
            .from("game")
            .update({
              streamed_amount: newAmount,
              ...(newAmount >= game.current_amount_usd
                ? {
                    is_streaming: false,
                    is_live: true,
                  }
                : {}),
            })
            .eq("id", params.id)
            .single()
            .then(({ data: updatedData, error: updateError }) => {
              if (!updateError && updatedData) {
                if (newAmount >= game.current_amount_usd) {
                  clearInterval(intervalId!)
                  setGame(updatedData)
                }
              }
            })

          return newAmount
        })
      }, refreshRate)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [
    game?.is_streaming,
    game?.streamed_amount,
    game?.current_amount_usd,
    params.id,
  ])

  async function fillFundingAmount(
    fundAmount: number,
    currentAmount: number,
    totalAmount: number
  ) {
    try {
      if (currentAmount + fundAmount >= totalAmount) {
        // Update current_amount and start streaming
        const { data, error } = await supabase
          .from("game")
          .update({
            current_amount_usd: currentAmount + fundAmount,
            streamed_amount: 0, // Start streaming from 0
            is_streaming: true,
            is_proposed: false,
          })
          .eq("id", params.id)
          .single()

        if (error) {
          console.error("Error updating funding amount:", error)
          return
        }

        setGame(data)
        setAmount(0) // Start animation from 0
      } else {
        const { data, error } = await supabase
          .from("game")
          .update({ current_amount_usd: fundAmount + currentAmount })
          .eq("id", params.id)
          .single()

        if (error) {
          console.error("Error updating funding amount:", error)
          return
        }

        setGame(data)
        setAmount(fundAmount + currentAmount)
      }
    } catch (err) {
      console.error("Error in fillFundingAmount:", err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!game) return <div>Game not found</div>

  return (
    <div className="flex w-full flex-col items-center justify-center text-white">
      {game.pfp_image_url && (
        <Card className="relative flex h-36 w-48 items-center justify-center overflow-hidden">
          <Image
            src={game.pfp_image_url}
            alt={game.title}
            width={500}
            height={500}
            className="object-fill"
          />
        </Card>
      )}
      <div className="my-4 text-4xl font-bold">{game.title}</div>
      <Card className="flex flex-row border-none bg-black">
        <div>
          {game.social_github_url && (
            <Button
              onClick={() => window.open(game.social_github_url, "_blank")}
            >
              <FaGithub size={24} color="white" />
            </Button>
          )}
        </div>
        <div>
          {game.social_twitter_url && (
            <Button
              onClick={() => window.open(game.social_twitter_url, "_blank")}
            >
              <FaTwitter size={24} color="white" />
            </Button>
          )}
        </div>
        <div>
          {game.social_discord_url && (
            <Button
              onClick={() => window.open(game.social_discord_url, "_blank")}
            >
              <FaDiscord size={24} color="white" />
            </Button>
          )}
        </div>
      </Card>
      <div className="my-6 w-2/3 text-center text-xl font-bold">
        {game.description}
      </div>
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
              <Button
                variant="outline"
                onClick={() =>
                  fillFundingAmount(
                    game.total_amount_usd / 2,
                    game.current_amount_usd,
                    game.total_amount_usd
                  )
                }
              >
                Fund
              </Button>
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
        {game.is_streaming && (
          <div className="flex w-2/3 flex-col">
            <div className="flex flex-row items-center justify-center">
              <div className="mr-4">fund: </div>
              <GameProgressBar
                currentAmount={amount}
                requestedAmount={game.total_amount_usd}
              />
              <div className="ml-4">{`${amount.toFixed(5)}/${game.total_amount_usd}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="mr-4">Status:</div>
              <div>Streaming (Stage 2)</div>
            </div>
            <div className="flex flex-row justify-end">
              <Button variant="outline">Stop Fund</Button>
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
            <div className="flex flex-row justify-end">
              <Button variant="outline">Dev chat</Button>
            </div>
          </div>
        )}
        {game.is_live && (
          <div className="flex w-2/3 flex-col">
            <div className="flex flex-row text-xl">
              <div className="mr-4">Status:</div>
              <div>Live (Stage 3)</div>
            </div>
            <div className="flex flex-row justify-center p-8">
              <Button
                variant="outline"
                onClick={() => window.open(game.website_url, "_blank")}
                className="w-54 h-12"
              >
                <div className="text-4xl">Play Game</div>
              </Button>
            </div>
            <Card className="my-8 bg-black text-white">
              <CardTitle className="p-4">Backer Exclusives</CardTitle>
              <CardContent>
                {game.backer_perks &&
                  game.backer_perks.map((perk, i) => (
                    <Card
                      key={i}
                      className="my-2 flex flex-row items-center justify-between bg-black text-white"
                    >
                      <div className="p-2">{perk}</div>
                      <Button variant="link">Claim</Button>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
