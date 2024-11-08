"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import arbitrumLogo from "@/assets/arbitrum.svg"
import avaxLogo from "@/assets/avalanche.svg"
import baseLogo from "@/assets/base.svg"
import starknetLogo from "@/assets/starknet.svg"

import { Button } from "@/components/ui/button"

export default function Landing() {
  const router = useRouter()

  return (
    <main>
      <>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative h-screen w-full">
            <div className="absolute inset-0">
              <Hero
                onGetGamingPressed={() => router.push("/get-gaming")}
                onGetFundedPressed={() => router.push("/get-funded")}
              />
            </div>
          </div>
          <div>
            <div>Explore games across ecosystems</div>
            <div className="flex space-x-4">
              <Image
                src={arbitrumLogo}
                alt="Arbitrum Logo"
                width={100}
                height={100}
              />
              <Image
                src={avaxLogo}
                alt="Avalanche Logo"
                width={100}
                height={100}
              />
              <Image src={baseLogo} alt="Base Logo" width={100} height={100} />
              <Image
                src={starknetLogo}
                alt="StarkNet Logo"
                width={100}
                height={100}
              />
            </div>
          </div>
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
    <>
      <div className="absolute inset-0 flex items-center bg-secondary">
        <Button
          className="absolute left-[4%] z-10 text-6xl font-bold text-white md:left-[6%] lg:left-[12%]"
          variant="link"
          onClick={props.onGetFundedPressed}
        >
          GET FUNDED
        </Button>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(-45deg, transparent 50%, #BEE9E8 50%)",
        }}
      >
        <Button
          className="absolute left-[50%] text-6xl font-bold text-white md:left-[58%] lg:left-[62%]"
          variant="link"
          onClick={props.onGetGamingPressed}
        >
          GET GAMING
        </Button>
      </div>
    </>
  )
}
