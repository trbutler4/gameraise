"use client"

import { useRouter } from "next/navigation"
import { useWallets } from "@/providers/wallet-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function GetFunded() {
  const router = useRouter()
  const { state } = useWallets()
  const { selectedWallet, selectedAccount } = state

  return (
    <>
      <div className="flex w-screen items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">GET FUNDING</h2>
      </div>
      <section className="space-y-16 p-4">
        <div>
          <Card className="bg-black">
            <CardHeader className="mb-4 text-2xl font-bold text-white">
              Bullish onchain gaming? Get funding and start building!
            </CardHeader>
            <CardContent className="flex flex-row justify-end">
              <Button
                className="w-32 text-white"
                variant="outline"
                onClick={() => router.push("/application")}
                disabled={!selectedAccount?.address}
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-black">
            <CardHeader className="mb-4 text-2xl font-bold text-white">
              Check out previously funded games below
            </CardHeader>
            <CardContent className="flex flex-col justify-center space-y-4">
              <Button className="text-lg text-white">Crosswordle</Button>
              <Button className="text-lg text-white">Loot Survivor</Button>
              <Button className="text-lg text-white">Force Prime</Button>
              <Button className="text-lg text-white">Jokers of Neon</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
