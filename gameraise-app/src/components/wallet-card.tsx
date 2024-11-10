"use client"

import { useEffect, useState } from "react"
import { useWallets } from "@/providers/wallet-provider"
import { CopyIcon, Download, HandCoins, Upload } from "lucide-react"
import { toast } from "sonner"
import { createPublicClient, formatEther, http } from "viem"
import { hardhat } from "viem/chains"

import { turnkeyConfig } from "@/config/turnkey"
import { truncateAddress } from "@/lib/utils"
import { fundWallet } from "@/lib/web3"
import { useTokenPrice } from "@/hooks/use-token-price"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ExportWalletDialog from "./export-wallet"
import ImportWalletDialog from "./import-wallet"
import TransferDialog from "./transfer-dialog"
import { Skeleton } from "./ui/skeleton"

export default function WalletCard() {
  const { ethPrice } = useTokenPrice()
  const { state } = useWallets()
  const { selectedWallet, selectedAccount } = state
  const { user } = useUser()
  const [usdAmount, setUsdAmount] = useState<number | undefined>(undefined)

  const fetchTokenBalance = async () => {
    if (!selectedAccount?.address) {
      console.log("connect wallet first")
      return
    }
    const streamTokenAddress = "0x90Dd5250fD06b9E6E3d048cAF7f26Da609cb67cC"
    const erc20Abi = [
      {
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
    ]

    const publicClient = createPublicClient({
      chain: hardhat,
      transport: http(turnkeyConfig.rpcUrl),
    })

    const tokenBalance = await publicClient.readContract({
      address: streamTokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [selectedAccount.address],
    })

    // just treating the token like its a USDC amount
    if (tokenBalance) {
      setUsdAmount(tokenBalance)
    }
  }

  useEffect(() => {
    fetchTokenBalance()
  }, [ethPrice, selectedAccount])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className=" font-medium">
          {(user && user.email) || (
            <Skeleton className="h-4 w-20 bg-muted-foreground/50" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-4xl font-bold">
          Balance: ${usdAmount?.toString() || "0.00"}
        </div>
      </CardContent>
    </Card>
  )
}
