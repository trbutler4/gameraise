"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { useWallets } from "@/providers/wallet-provider"
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

import { Skeleton } from "./ui/skeleton"

function AccountAvatar({ address }: { address: string | undefined }) {
  return (
    <Avatar className="h-1/2 w-auto">
      {address ? (
        <Jazzicon
          svgStyles={{
            filter: "blur(4px)",
          }}
          diameter={32}
          seed={jsNumberForAddress(
            address ?? "0x1111111111111111111111111111111111111111"
          )}
        />
      ) : (
        <AvatarFallback className="bg-transparent text-base font-semibold"></AvatarFallback>
      )}
    </Avatar>
  )
}

export default function Account() {
  const router = useRouter()
  const { logout } = useAuth()
  const { user, loading } = useUser()
  const { state, newWallet, newWalletAccount, selectWallet, selectAccount } =
    useWallets()
  const { selectedWallet, selectedAccount, wallets } = state

  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return <Skeleton className="h-12 w-52" />
  }

  if (!user) {
    return (
      <Button className="bg-white" onClick={() => router.push("/login")}>
        <div className="font-lg text-black">Get Started</div>
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="dark" asChild>
        <Button
          variant="outline"
          className="h-full w-min justify-between gap-3 bg-none text-foreground"
        >
          <div className="flex items-center gap-3">
            <AccountAvatar address={selectedAccount?.address} />
            <div className="text-left">
              <div className="text-sm font-semibold ">{user.email}</div>
            </div>
          </div>
          {isOpen ? (
            <ChevronUpIcon className="hidden h-4 w-4 text-muted-foreground sm:block" />
          ) : (
            <ChevronDownIcon className="hidden h-4 w-4 text-muted-foreground sm:block" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" w-80 bg-background text-foreground"
      >
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(selectedAccount?.address || "")
          }}
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>{selectedAccount?.address}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
