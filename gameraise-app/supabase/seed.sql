insert into game
  (
    author_name,
    author_address,
    title,
    description,
    total_amount_usd,
    current_amount_usd,
    duration_days,
    is_proposed,
    is_streaming,
    is_live,
    social_github_url,
    social_twitter_url,
    social_discord_url,
    pfp_image_url,
    bg_image_url,
    backer_addresses,
    platform,
    website_url
  )
values
  (
    'Provable Games',
    '0xC1faD6a07fE75940f357D69aFc2BECD5383CdBae',
    'Loot Survivor',
    'Enter the dungeon, kill beasts, gain loot, gain glory!',
    '50000',
    '25000',
    '90',
    TRUE,
    FALSE,
    FALSE,
    'https://github.com/BibliothecaDAO/loot-survivor',
    NULL,
    NULL,
    'https://imgs.search.brave.com/hNENzc0mEZpPrM1kGfmoBw7_XThw_TBwgW9epNjufss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nYW0z/cy5nZy9fbmV4dC9p/bWFnZS8_dXJsPWh0/dHBzOi8vYXNzZXRz/LnBvbGthc3RhcnRl/ci5nZy9MT09UX0cy/X2IzNTZkZjA4MjMv/TE9PVF9HMl9iMzU2/ZGYwODIzLnBuZyZ3/PTM4NDAmcT03NQ',
    'https://imgs.search.brave.com/hrbaYV3kKG7qyyxbn-saEuFcV5kxPYnb6XMuuZ1Ton4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFh/dm9zLmFwcC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wMS9M/b290LVN1cnZpdm9y/LUluLUdhbWUtMS0x/MDI0eDUzMi5wbmc',
    NULL,
    'starknet',
    'https://lootsurvivor.io/'
  );
