// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const GameKeyModule = buildModule("GameKeyModule", (m) => {
  const gameKey = m.contract("GameKey", []);

  return { gameKey };
});

export default GameKeyModule;
