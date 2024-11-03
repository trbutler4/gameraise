import { ConnectButton } from "./";

export function Header() {
  return (
    <div className="flex flex-row justify-between">
      <h1>TODO NAME</h1>
      <ConnectButton />
    </div>
  );
}
