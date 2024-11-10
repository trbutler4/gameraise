"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { useWallets } from "@/providers/wallet-provider"
import { supabase } from "@/utils/supabase"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LogOutIcon,
  PlusCircleIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import Jazzicon, { jsNumberForAddress } from "react-jazzicon"

import { truncateAddress } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GameHero from "@/components/game-hero"

export default function GetGaming() {
  const searchParams = new URLSearchParams(window.location.search)
  const ecosystemFromRoute = searchParams.get("platform")
  const [games, setGames] = useState<any[]>([])
  const router = useRouter()
  const [selectedEcosystem, setSelectedEcosystem] = useState<string | null>(
    ecosystemFromRoute
  )
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from("game").select("*")

      if (error) {
        console.error("Error fetching games:", error)
        return
      }

      if (data) {
        console.log(data)
        setGames(data)
      }
    }

    fetchGames()
  }, [])

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const ecosystemMatch =
        !selectedEcosystem || game.platform === selectedEcosystem
      const statusMatch =
        !selectedStatus ||
        (selectedStatus === "live" && game.is_live) ||
        (selectedStatus === "proposed" && game.is_proposed) ||
        (selectedStatus === "active" && game.is_active)

      return ecosystemMatch && statusMatch
    })
  }, [games, selectedEcosystem, selectedStatus])

  return (
    <div>
      <div className="my-8 flex items-center justify-center text-xl text-white">
        Welcome to the Dungeon
      </div>
      <div className="mb-12 flex flex-row space-x-12 px-12">
        <EcosystemDropdown onEcosystemChange={setSelectedEcosystem} />
        <StatusDropdown onStatusChange={setSelectedStatus} />
      </div>
      <div className="flex flex-col justify-evenly space-y-8 px-12">
        {filteredGames.map((game) => (
          <GameHero
            title={game.title}
            description={game.description}
            key={game.id}
            requestedAmount={game.total_amount_usd}
            currentAmount={game.current_amount_usd}
            requestedDuration={game.duration}
            onCardPressed={() => router.push(`/game/${game.id}`)}
            is_live={game.is_live}
            is_proposed={game.is_proposed}
            is_active={game.is_active}
            background_url={game.bg_image_url}
          />
        ))}
      </div>
    </div>
  )
}

function StatusDropdown({
  onStatusChange,
}: {
  onStatusChange: (status: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="dark" asChild>
        <Button
          variant="outline"
          className="h-full w-min justify-between gap-3 bg-none text-foreground"
        >
          <div className="mr-2 text-white">Status</div>
          {isOpen ? (
            <ChevronUpIcon className="hidden h-4 w-4 text-muted-foreground sm:block" />
          ) : (
            <ChevronDownIcon className="hidden h-4 w-4 text-muted-foreground sm:block" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-black text-white font-mono">
        <DropdownMenuItem onClick={() => onStatusChange("live")}>
          live
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onStatusChange("proposed")}>
          proposed
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onStatusChange("active")}>
          active
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function EcosystemDropdown({
  onEcosystemChange,
}: {
  onEcosystemChange: (ecosystem: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="dark" asChild>
        <Button
          variant="outline"
          className="h-full w-min justify-between gap-3 bg-none text-foreground"
        >
          <div className="mr-2 text-white">Ecosystem</div>
          {isOpen ? (
            <ChevronUpIcon className="hidden h-4 w-4 text-muted-foreground sm:block" />
          ) : (
            <ChevronDownIcon className="hidden h-4 w-4 text-muted-foreground sm:block" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-black text-white font-mono">
        <DropdownMenuItem onClick={() => onEcosystemChange("starknet")}>
          Starknet
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEcosystemChange("arbitrum")}>
          Arbitrum
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEcosystemChange("avalanche")}>
          Avalanche
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEcosystemChange("solana")}>
          Solana
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
