import GameHero from "@/components/game-hero"

export default function Home() {
  const mockGameData = [
    {
      title: "Example Game 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      requestedAmount: 1000000000,
      currentAmount: 250000000,
      requestedDuration: 123154523453412,
    },
    {
      title: "Stellar Conquest",
      description:
        "An epic space exploration RPG where players command their own fleet and discover the mysteries of a procedurally generated galaxy. Features deep strategic combat and rich storylines.",
      requestedAmount: 500000,
      currentAmount: 125000,
      requestedDuration: 15768000000,
    },
    {
      title: "Neon Nights",
      description:
        "A cyberpunk action-adventure set in a dystopian megacity. Players navigate through neon-lit streets, hack systems, and uncover corporate conspiracies in this immersive world.",
      requestedAmount: 750000,
      currentAmount: 450000,
      requestedDuration: 31536000000,
    },
    {
      title: "Forest Keeper",
      description:
        "A peaceful management sim where players nurture and protect an enchanted forest. Build relationships with magical creatures while maintaining the delicate balance of nature.",
      requestedAmount: 250000,
      currentAmount: 75000,
      requestedDuration: 23652000000,
    },
    {
      title: "Quantum Break",
      description:
        "A mind-bending puzzle platformer that plays with the concepts of time and space. Use quantum mechanics to solve increasingly complex challenges across parallel universes.",
      requestedAmount: 400000,
      currentAmount: 200000,
      requestedDuration: 18921600000,
    },
    {
      title: "Legends of the Arena",
      description:
        "A competitive multiplayer gladiator game with unique character classes and deep customization. Rise through the ranks in intense PvP combat tournaments.",
      requestedAmount: 850000,
      currentAmount: 600000,
      requestedDuration: 27648000000,
    },
  ]

  return (
    <main className="container mx-auto space-y-4 p-2 sm:p-8 lg:space-y-8 xl:px-12 2xl:px-24">
      <div className="flex flex-col items-center justify-center space-y-6">
        {mockGameData.map((game, i) => (
          <GameHero {...game} key={i} />
        ))}
      </div>
    </main>
  )
}
