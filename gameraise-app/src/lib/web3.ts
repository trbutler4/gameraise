import { fundWallet as serverFundWallet } from "@/actions/turnkey"
import { TurnkeyBrowserClient } from "@turnkey/sdk-browser"
import { TurnkeyServerClient } from "@turnkey/sdk-server"
import { createAccount } from "@turnkey/viem"
import {
  Account,
  Address,
  createPublicClient,
  createWalletClient,
  getAddress,
  http,
  parseEther,
  PublicClient,
  webSocket,
} from "viem"
import { hardhat } from "viem/chains"

import { env } from "@/env.mjs"
import type { AlchemyMinedTransaction, Transaction } from "@/types/web3"
import { turnkeyConfig } from "@/config/turnkey"

import { showTransactionToast } from "./toast"
import { truncateAddress } from "./utils"

let publicClient: PublicClient

export const getPublicClient = () => {
  if (!publicClient) {
    publicClient = createPublicClient({
      chain: hardhat,
      transport: http(turnkeyConfig.rpcUrl),
    })
  }
  return publicClient
}

export const getBalance = async (address: Address) => {
  const publicClient = getPublicClient()
  const balance = await publicClient.getBalance({ address })
  return balance
}

/**
 * Creates and returns a wallet client for interacting with the Turnkey API using a specified account.
 *
 * @param {TurnkeyBrowserClient} turnkeyClient - The Turnkey client instance used for the API connection.
 * @param {string} signWith - The Turnkey wallet account address or private key ID used to sign transactions
 * @returns {Promise<WalletClient>} A promise that resolves to the wallet client configured for the specified account and chain.
 */
export const getTurnkeyWalletClient = async (
  turnkeyClient: TurnkeyBrowserClient | TurnkeyServerClient,
  signWith: string
) => {
  // Create a new account using the provided Turnkey client and the specified account for signing
  const turnkeyAccount = await createAccount({
    client: turnkeyClient,
    organizationId: process.env.ORGANIZATION_ID!,
    signWith,
  })

  const client = createWalletClient({
    account: turnkeyAccount as Account,
    chain: hardhat,
    transport: http(turnkeyConfig.rpcUrl),
  })

  return client
}
