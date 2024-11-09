"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function GetFunded() {
  const router = useRouter()

  return (
    <>
      <div className="flex w-screen items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">GET FUNDING</h2>
      </div>
      <section className="space-y-16 p-4">
        <div>
          <Card>
            <CardHeader className="mb-4 text-2xl font-bold">
              Have an idea for a cool game? Get funding and start building!
            </CardHeader>
            <CardContent className="flex flex-col justify-end">
              <Button
                className="bg-secondary"
                onClick={() => router.push("/application")}
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="mb-4 text-2xl font-bold">
              Check out previously funded games and their progress
            </CardHeader>
            <CardContent className="flex flex-col justify-center space-y-4">
              <Button className="bg-secondary">Crosswordle</Button>
              <Button className="bg-secondary">Loot Survivor</Button>
              <Button className="bg-secondary">Force Prime</Button>
              <Button className="bg-secondary">Jokers of Neon</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
