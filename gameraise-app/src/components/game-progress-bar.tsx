interface GameProgressBarProps {
  currentAmount: number
  requestedAmount: number
}
export default function GameProgressBar(props: GameProgressBarProps) {
  return (
    <div className="my-4 h-full w-full border border-white bg-black">
      <div
        className="h-8 w-full bg-white"
        style={{
          width: `${(props.currentAmount / props.requestedAmount) * 100}%`,
          marginTop: `auto`,
        }}
      ></div>
    </div>
  )
}
