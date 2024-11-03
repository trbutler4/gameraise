use anchor_lang::prelude::*;

declare_id!("9qpG5L48T871jkAHkb5pgXABQf5eZY7bU7LYjiJZKUHb");

#[program]
pub mod temp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
