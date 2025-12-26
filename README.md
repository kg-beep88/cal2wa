# Calendar → WhatsApp (PWA)

A simple iPhone-friendly PWA that:
- reads your Google Calendar events automatically (OAuth login)
- shows a clean list on your phone
- generates ONE combined WhatsApp message for Today or a chosen date

## Files
- index.html : app UI + Calendar fetch + WhatsApp share
- config.js  : paste your Google OAuth Client ID here
- manifest.webmanifest : PWA settings
- sw.js : offline shell cache
- icons/ : app icons

## Important
WhatsApp cannot auto-send directly to a specific group from a website.
The reliable flow is: Copy → open WhatsApp → paste into the group → Send.

## Quick format for Calendar events
Title:  Site – Work – Area / 地点-工作-区域
Location: full address + meet point
Notes: use the template inside the app (copy button)

