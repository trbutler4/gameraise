import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("GameKey", function () {
  async function deployGameKeyFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const gameKey = await hre.viem.deployContract("GameKey", []);

    const publicClient = await hre.viem.getPublicClient();

    return {
      gameKey,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Minting", function () {
    it("Should mint a key to the specified user", async function () {
      const { gameKey, publicClient, owner, otherAccount } =
        await loadFixture(deployGameKeyFixture);

      const amount = 1n;
      const tokenId = 1n;

      const hash = await gameKey.write.mint([
        otherAccount.account.address,
        tokenId,
        amount,
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const balance = await gameKey.read.balanceOf([
        otherAccount.account.address,
        tokenId,
      ]);

      expect(balance).to.equal(amount);
    });
  });
});
