# KG Demolish Calendar — SYNC Version (Google Calendar) FREE

This PWA:
- Syncs using Google Calendar (same on iPhone + desktop)
- Day / Week agenda view
- Add / Edit / Delete / Copy to any day
- WhatsApp daily/weekly schedule (Copy + Open WhatsApp)
- Uses your template exactly in the event Description

## 1) Google Calendar (recommended)
Create a new calendar called: "KG Demolish"
Then copy its Calendar ID and paste into config.js (CALENDAR_ID).

Tip: This app filters events by keyword #KG so your personal events won't show.

## 2) Google Cloud setup (free)
1. Create Google Cloud Project
2. Enable "Google Calendar API"
3. OAuth consent screen:
   - External → Testing
   - Add your Gmail under Test Users
4. Create OAuth Client ID (Web application)
   - Authorized JavaScript origin: https://YOURNAME.github.io
5. Paste the Client ID into config.js

Scope:
- https://www.googleapis.com/auth/calendar.events

## 3) Host on GitHub Pages (free)
Repo Settings → Pages → Deploy from branch → main / root

Open the link on iPhone Safari → Share → Add to Home Screen.

## WhatsApp note
Web apps cannot directly post into a specific group automatically.
Use: Copy → WhatsApp → paste into pinned group → Send.


## Optional: Private Billing Copy calendar
Create another calendar (e.g. 'KG Billing (Private)') that is NOT shared with anyone.
Copy its Calendar ID into config.js as BILLING_CALENDAR_ID.

When you Create/Update/Move/Copy/Delete jobs inside this PWA, it will automatically keep a one-way copy in your billing calendar and preserve anything you type under:
---
BILLING NOTES (private):

Note: if you edit jobs directly in Google Calendar (outside the PWA), the billing copy will not auto-update.
