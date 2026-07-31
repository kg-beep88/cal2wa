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

---

## SAFE 2-WAY SYNC v5.4.0

This package includes `DONKEY-GOOGLE-2WAY-SYNC-SETUP.md` with the current simple Google Cloud + GitHub setup.

Key safety behavior:
- Google Calendar is the master copy.
- Automatic refresh is Google -> website only; it never bulk-deletes/reconciles Google data.
- Website changes are written directly to Google Calendar.
- Event ETags prevent stale edits from overwriting a newer Google Calendar edit.
- Browser keeps a local safety snapshot before Edit/Move/Delete.


### v5.4.0 session keeper
- The app no longer deliberately switches to OFF just because the short-lived browser access token reaches its expiry time.
- While the page remains open, a normal tap/click/key action renews the Google token before the Calendar action continues.
- If the page has been idle past token expiry, the next normal user action starts renewal. Google may still require sign-in again if the Google account session itself ended or permissions were revoked.
- No refresh token or client secret is stored in GitHub/browser storage.
- No sync renewal path bulk-deletes or replaces Calendar data.
