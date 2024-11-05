"use client"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

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
        <div className="flex h-48 flex-row justify-between">
          <div className="flex h-full flex-col justify-start">
            <div className="mb-auto">{description}</div>
            <div className="mt-4 w-full space-x-4">
              <Button>Read More</Button>
              <Button>Fund</Button>
            </div>
          </div>
          <div className="mx-6">
            <div className="h-full w-12 overflow-hidden bg-blue-500">
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
