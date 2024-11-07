"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function Landing() {
  const router = useRouter()
  return (
    <main>
      <>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative h-screen w-full">
            <div className="absolute inset-0">
              <div className="absolute inset-0 flex items-center bg-secondary">
                <Button
                  className="absolute left-[4%] z-10 text-6xl font-bold text-white md:left-[6%] lg:left-[12%]"
                  variant="link"
                  onClick={() => router.push("get-funded")}
                >
                  GET FUNDED
                </Button>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(-45deg, transparent 50%, #BEE9E8 50%)",
                }}
              >
                <Button
                  className="absolute left-[50%] text-6xl font-bold text-white md:left-[58%] lg:left-[62%]"
                  variant="link"
                  onClick={() => router.push("get-gaming")}
                >
                  GET GAMING
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    </main>
  )
}
