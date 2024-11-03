import { ConnectButton } from "./";

export function Header() {
  return (
    <div className="flex flex-row justify-between px-6 mt-4">
      <h1>TODO NAME</h1>
      <ConnectButton />
    </div>
  );
}
