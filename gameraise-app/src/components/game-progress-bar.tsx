interface GameProgressBarProps {
  currentAmount: number
  requestedAmount: number
}
export default function GameProgressBar(props: GameProgressBarProps) {
  return (
    <div className="my-4 h-full w-full bg-gray-200">
      <div
        className="h-4 w-full bg-blue-500"
        style={{
          width: `${(props.currentAmount / props.requestedAmount) * 100}%`,
          marginTop: `auto`,
        }}
      ></div>
    </div>
  )
}
