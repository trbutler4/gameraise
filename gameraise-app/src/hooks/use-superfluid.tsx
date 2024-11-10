import { useState } from "react"
import { useWallets } from "@/providers/wallet-provider"
import { useTurnkey } from "@turnkey/sdk-react"

import { getTurnkeyWalletClient } from "@/lib/web3"

export const useSuperfluid = () => {
  const CFAv1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125"
  const GDAv1ForwarderAddress = "0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08"
  const StreamTokenAddress = "0x90Dd5250fD06b9E6E3d048cAF7f26Da609cb67cC"

  const { getActiveClient } = useTurnkey()
  const [message, setMessage] = useState("")

  const { state, newWallet, newWalletAccount, selectWallet, selectAccount } =
    useWallets()

  // Simplified ABIs with only the functions we need
  const CFAv1ForwarderABI = [
    "function createFlow(address token, address sender, address receiver, int96 flowRate, bytes memory userData) external returns (bool)",
  ]

  const GDAv1ForwarderABI = [
    "function createPool(address token, address admin, (uint32 transferabilityForUnitsOwner, bool distributionFromAnyAddress) memory poolConfig) external returns (bool, address)",
  ]

  const createStream = async ({
    flowRate,
    receiverAddress,
  }: {
    flowRate: string
    receiverAddress: string
  }) => {
    if (!state.selectedAccount) {
      setMessage("Please connect your wallet first.")
      return
    }

    const turnkeyClient = await getActiveClient()
    const client = await getTurnkeyWalletClient(
      turnkeyClient,
      state.selectedAccount.address
    )

    try {
      const hash = await client.writeContract({
        address: CFAv1ForwarderAddress,
        abi: CFAv1ForwarderABI,
        functionName: "createFlow",
        args: [
          StreamTokenAddress,
          state.selectedAccount.address,
          receiverAddress,
          flowRate,
          "0x",
        ],
      })

      setMessage("The stream has been created successfully.")
    } catch (error) {
      console.error("Error creating stream:", error)
      setMessage("Failed to create stream. Please try again.")
    }
  }

  const createPool = async () => {
    if (!state.selectedAccount) {
      setMessage("Please connect your wallet first.")
      return
    }

    const turnkeyClient = await getActiveClient()
    const client = await getTurnkeyWalletClient(
      turnkeyClient,
      state.selectedAccount.address
    )

    try {
      const poolConfig = {
        transferabilityForUnitsOwner: 0,
        distributionFromAnyAddress: false,
      }

      const hash = await client.writeContract({
        address: GDAv1ForwarderAddress,
        abi: GDAv1ForwarderABI,
        functionName: "createPool",
        args: [StreamTokenAddress, state.selectedAccount.address, poolConfig],
      })

      setMessage(`Pool created successfully: ${hash}`)
    } catch (error) {
      console.error("Error creating pool:", error)
      setMessage("Failed to create pool. Please try again.")
    }
  }
  return {
    createStream,
    createPool,
    message,
  }
}
