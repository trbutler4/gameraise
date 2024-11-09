"use client"

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
  is_pending: boolean
  is_active: boolean
  is_live: boolean
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
  is_pending,
}: GameHeroProps) {
  return (
    <Card onClick={onCardPressed}>
      <CardHeader className="flex flex-row">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-full flex-col justify-start">
          <div className="mb-auto">{description}</div>
        </div>
        <GameProgressBar
          requestedAmount={requestedAmount}
          currentAmount={currentAmount}
        />
      </CardContent>
    </Card>
  )
}
