import { ConnectButton } from "./ConnectButton";

export function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-lg font-bold">Stake to Play</h1>
      <ConnectButton />
    </div>
  );
}
