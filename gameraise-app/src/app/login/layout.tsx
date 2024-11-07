import { Toaster } from "sonner"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LoginLayout({ children }: LandingLayoutProps) {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex items-center justify-center px-6">
        {children}
        <Toaster />
      </div>
    </main>
  )
}
