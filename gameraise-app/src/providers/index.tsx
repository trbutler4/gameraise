"use client"

import { TurnkeyProvider } from "@turnkey/sdk-react"

import { turnkeyConfig } from "@/config/turnkey"

import { AuthProvider } from "./auth-provider"
import { ThemeProvider } from "./theme-provider"
import { WalletsProvider } from "./wallet-provider"

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
  >
    <TurnkeyProvider
      config={{
        rpId: turnkeyConfig.passkey.rpId,
        apiBaseUrl: turnkeyConfig.apiBaseUrl,
        defaultOrganizationId: turnkeyConfig.organizationId,
      }}
    >
      <AuthProvider>
        <WalletsProvider>{children}</WalletsProvider>
      </AuthProvider>
    </TurnkeyProvider>
  </ThemeProvider>
)
