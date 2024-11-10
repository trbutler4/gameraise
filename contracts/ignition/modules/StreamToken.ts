// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const StreamTokenModule = buildModule("StreamTokenModule", (m) => {
  const recipient = "0xB2b67c240aF280D4dC77C2da02013cF9Cbd4b6B1"; // turnkey wallet for trbiv@proton.me
  const streamToken = m.contract("StreamToken", [
    "StreamToken",
    "STRM",
    recipient,
  ]);

  return { streamToken };
});

export default StreamTokenModule;
