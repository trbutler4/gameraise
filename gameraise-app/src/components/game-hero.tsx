"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface GameHeroProps {
  title: string
  description: string
  requestedAmount: number
  currentAmount: number
  requestedDuration: number
}

export default function GameHero({
  title,
  description,
  requestedAmount,
  currentAmount,
  requestedDuration,
}: GameHeroProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div>{description}</div>
          </div>
          <div className="mx-6">
            <div className="h-48 w-12 overflow-hidden bg-blue-500">
              <div
                className="w-full bg-gray-200"
                style={{
                  height: `${(currentAmount / requestedAmount) * 100}%`,
                  marginTop: `auto`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
