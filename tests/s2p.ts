import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { S2p } from "../target/types/s2p";

describe("s2p", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.S2p as Program<S2p>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
