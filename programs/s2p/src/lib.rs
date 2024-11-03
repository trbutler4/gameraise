use anchor_lang::prelude::*;

declare_id!("7Cx4kbXPqyhrToJ8sxuHbAmVtzProUaZzXhTHy9StozD");

#[program]
pub mod s2p {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
