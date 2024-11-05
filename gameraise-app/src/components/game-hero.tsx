"use client"

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
    <div className="w-4/5 rounded-sm border p-8">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>{title}</div>
          <div>{description}</div>
          <button
            onClick={() => console.log("TODO: fund game with user balance")}
          >
            Fund
          </button>
        </div>
        <div>
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
    </div>
  )
}
