"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function Landing() {
  const router = useRouter()

  return (
    <main>
      <>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="mt-20 w-full">
            <Hero
              onGetGamingPressed={() => router.push("/get-gaming")}
              onGetFundedPressed={() => router.push("/get-funded")}
            />
          </div>
        </div>
        <div className="mt-44 flex flex-1 flex-col items-center justify-end text-lg text-white">
          But what is GameRaise?
        </div>
      </>
    </main>
  )
}

function Hero(props: {
  onGetGamingPressed: () => void
  onGetFundedPressed: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-2/3 flex-row items-center justify-between">
        <Button
          variant="link"
          onClick={props.onGetFundedPressed}
          className="text-xl text-white"
        >
          GET FUNDED
        </Button>
        <Button
          variant="link"
          onClick={props.onGetGamingPressed}
          className="text-xl text-white"
        >
          GET GAMING
        </Button>
      </div>
    </div>
  )
}
