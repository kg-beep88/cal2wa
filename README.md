# Work Plan PWA (Google Calendar ↔ WhatsApp)

This PWA:
- looks like a simple Google Calendar agenda on phone (Day/Week)
- reads events from Google Calendar
- lets you CREATE / EDIT / DELETE events (saved into Google Calendar)
- provides a ready Notes template (EN+中文)
- generates ONE combined WhatsApp message for the selected date (copy/open)

## WhatsApp note (important)
A website cannot directly auto-send into a specific WhatsApp group.
The reliable flow is: Copy → WhatsApp → paste into your pinned group → Send.

## Google Cloud setup (free)
1) Create Google Cloud project
2) Enable Google Calendar API
3) OAuth Consent Screen:
   - External
   - Testing
   - Add your Gmail under Test Users
4) Create OAuth Client ID (Web application)
   - Authorized JavaScript origin: https://YOURNAME.github.io
5) In config.js paste your CLIENT_ID

Scope used:
- https://www.googleapis.com/auth/calendar.events  (read + write events)

## GitHub Pages
Repo Settings → Pages → Deploy from branch → main / root
Open the Pages link in Safari and Add to Home Screen.

## Recommended workflow
- Put #JOB in work items (title or notes)
- Keep Location = address, Notes = details (workers/vehicle, wall to remove, PTW)
