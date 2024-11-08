import { WalletsProvider } from "@/providers/wallet-provider"

import { Toaster } from "@/components/ui/sonner"
import NavMenu from "@/components/nav-menu"

export default function GetGamingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=" h-screen bg-muted/40 dark:bg-neutral-950/80">
      <NavMenu />
      <div className="">{children}</div>
      <Toaster />
    </main>
  )
}
