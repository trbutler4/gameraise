"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import GameProgressBar from "./game-progress-bar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface GameHeroProps {
  title: string
  description: string
  requestedAmount: number
  currentAmount: number
  requestedDuration: number
  onCardPressed: () => void
  is_proposed: boolean
  is_active: boolean
  is_live: boolean
  background_url: string
}

export default function GameHero({
  title,
  description,
  requestedAmount,
  currentAmount,
  requestedDuration,
  onCardPressed,
  is_live,
  is_active,
  is_proposed,
  background_url,
}: GameHeroProps) {
  console.log(background_url)
  return (
    <Card
      onClick={onCardPressed}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardHeader className="flex flex-row text-white">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <div className="flex h-full flex-col justify-start">
          <div className="mb-auto">{description}</div>
        </div>
        {/*

          <GameProgressBar
            requestedAmount={requestedAmount}
            currentAmount={currentAmount}
          />

          */}
      </CardContent>
    </Card>
  )
}
