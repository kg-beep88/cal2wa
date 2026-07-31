# KG Calendar v5.4.0 — Session Keeper

## What changed

- Removed the old behavior that deliberately turned Google sync OFF when the access token reached expiry.
- The page remembers that Google authorization was previously granted in this browser.
- While the page is open, normal pointer/keyboard activity renews Google access when the token is within 10 minutes of expiry or already expired.
- If renewal was started by the same user action, Calendar API work waits for renewal before continuing.
- Automatic 60-second Google -> website pull runs only while a currently valid token exists. If the page is untouched past expiry, it pauses safely rather than deleting/replacing anything.
- Next normal user action resumes authorization/sync.
- Billing page receives the same session-keeper behavior.
- Service Worker cache bumped to v5.4.0 so GitHub Pages/PWA clients receive the new files.

## Safety

- No refresh token is stored in GitHub or localStorage.
- No client secret is added to the browser app.
- Token renewal never bulk deletes Calendar events.
- Existing ETag conflict protection and local safety backups remain in place.

## Google limitation

A browser-only Google Identity Services token flow requires user interaction to request a new access token. Fully unattended renewal requires an OAuth Authorization Code backend and secure refresh-token storage.
