# KG Calendar — Google 2-Way Sync Setup (Donkey Steps)

## What this version does

Very simple:

- Website -> Google Calendar: when you Add / Edit / Move / Copy a job, it saves directly to Google Calendar.
- Google Calendar -> Website: press **Sync now**, or leave the website open and it refreshes from Google every 60 seconds.
- When you return to the tab/window, it syncs again automatically.
- Google Calendar is the MASTER copy. The website does NOT run a bulk replace or bulk delete during sync.
- If two people edit the same job at the same time, the website uses Google's event version (ETag). If the job changed after you opened it, the website STOPS and tells you to Sync now instead of overwriting the newer version.
- Before Edit / Move / Delete, the browser keeps a small local safety snapshot of the old event (last 50 changes).
- New jobs also get a private `kg_app=1` marker. This helps the website continue finding the job even if somebody edits the description in Google Calendar and removes `#KG`.

IMPORTANT: The normal **Delete** button still deletes the job only when a person deliberately presses Delete and confirms it. Automatic sync never deletes Google Calendar events.

---

# PART A — Google Cloud (do once)

## 1. Open Google Cloud

Go to Google Cloud Console and sign in with the Google account that owns/manages this app.

## 2. Select your existing project

If you already made the OAuth Client ID that is inside `config.js`, KEEP the same project.

Do NOT create another project unless you really need a new one.

## 3. Enable Google Calendar API

Google Cloud Console:

1. Go to **APIs & Services** / **API Library**.
2. Search: **Google Calendar API**.
3. Open it.
4. Press **Enable**.

If it already says Enabled, do nothing.

## 4. Google Auth Platform — Branding

Google Cloud Console:

1. Open **Google Auth Platform**.
2. Open **Branding**.
3. App name: for example `KG Calendar`.
4. Put your support email.
5. Save.

## 5. Google Auth Platform — Audience

If all users are inside ONE Google Workspace company/domain and Google lets you choose **Internal**, use Internal.

If workers/users use different Gmail accounts, use **External**.

### While testing

You can keep Publishing status = **Testing** and add the Gmail accounts under Test users.

Note: Google currently limits Testing to 100 test users, and authorization for Calendar scopes can expire after 7 days in Testing.

### When everyone must use it normally

Move the OAuth app to **In production** when you are ready. Google may ask for OAuth verification because Calendar permissions can be sensitive. Follow Google's Verification Center instructions if shown.

## 6. Data Access / Scopes

This website requests these permissions:

- `https://www.googleapis.com/auth/calendar.events`
- `https://www.googleapis.com/auth/calendar.readonly`
- `openid`
- `email`

Do not give broader permissions unless you actually need them.

## 7. Create/check the OAuth Client

Google Auth Platform -> **Clients**.

Use application type: **Web application**.

You already have a Client ID in `config.js`. You can keep using it.

### Authorized JavaScript origins

Add ONLY the website origin. Example:

`https://YOUR-GITHUB-NAME.github.io`

Important:

- Do NOT put `/repo-name/` behind it.
- Do NOT put `/index.html` behind it.
- Origin is only `https://domain`.

If you use a custom domain, also add that origin, for example:

`https://calendar.yourcompany.com`

For local testing, you may add:

`http://localhost:8000`

## 8. Client ID in config.js

Open `config.js`.

You should see:

```js
CLIENT_ID: ".....apps.googleusercontent.com"
```

If your existing Client ID already works, DO NOT change it.

There is NO client secret needed in this GitHub Pages version. Never paste a Google OAuth client secret into `config.js` or GitHub Pages.

---

# PART B — Which Google Calendar will sync?

Your current `config.js` has:

```js
CALENDAR_ID: "primary"
```

That means after a user signs in, the default is that user's Primary Google Calendar.

The website also loads the user's writable calendars into the **Calendar** dropdown.

## Recommended for your company

Create ONE shared Google Calendar, for example:

`KG Work Calendar`

Then share that calendar with the staff who need access.

Give the correct Google Calendar permission:

- People who only need to see jobs: read permission.
- People who must Add/Edit/Move jobs from this website: they need permission to make changes to events.

Then choose `KG Work Calendar` from the website Calendar dropdown.

The website remembers the selected calendar in that browser.

---

# PART C — Put the new files on GitHub

## Easy way

1. Make a backup copy of your OLD GitHub repo/files first.
2. Open your GitHub repository.
3. Upload/replace the files from this new ZIP.
4. Keep your real `config.js` values.
5. Commit the changes.
6. GitHub Pages will publish the new version.

This new version has Service Worker cache name:

`kg-cal2wa-safe-2way-v5-3-0`

So the browser should pick up the update cleanly.

If your phone still shows the old page:

1. Open website.
2. Press **Reset Cache** once.
3. Website reloads.

Reset Cache clears the website cache only. It does NOT delete Google Calendar events.

---

# PART D — How staff use it every day

## Login

1. Open KG Calendar website.
2. Press **1-Click Google Login**.
3. First time only: Google may ask which account and ask permission.
4. Later visits: Google normally remembers the previous grant; the same button starts the authorization without forcing the consent screen every time.

Important: Google access tokens are deliberately short-lived. A browser-only GitHub Pages app cannot securely keep a permanent refresh token. If the Google session expires, the website will tell the user to press **1-Click Google Login** again. It will NOT wipe anything.

## 2-way sync

### Website -> Google

Add/Edit/Move/Copy -> it saves to Google Calendar immediately.

### Google -> Website

If somebody edits the job directly in Google Calendar:

- press **Sync now**, OR
- wait up to about 60 seconds while the site is open, OR
- leave the tab and come back; the website pulls Google again.

---

# PART E — Data safety rules in this version

1. **No bulk delete during sync.**
2. **No “website database wins” overwrite.** Google Calendar is master.
3. **PATCH is used for changes.** Fields the website does not send are left unchanged by Google Calendar.
4. **ETag conflict protection.** If somebody changed an event after you opened it, your stale edit is stopped instead of silently overwriting the newer event.
5. **Local safety snapshots.** Last 50 events changed/moved/deleted are copied into that browser's localStorage before the action.
6. **Delete is manual only.** User must open the job, press Delete and confirm.
7. **Reset Cache does not clear Calendar data.** It only unregisters the Service Worker/cache and reloads the app.

---

# PART F — Safe test before using on all staff

Use ONE test Gmail first.

1. Login to website.
2. Choose the correct shared KG calendar.
3. Make a test job called `SYNC TEST - DO NOT USE`.
4. Open Google Calendar. Confirm the job appears.
5. Change its time in Google Calendar.
6. Go back to website.
7. Press **Sync now**. Confirm the new time appears.
8. Edit the address/name on website.
9. Check Google Calendar again. Confirm it changed there too.
10. Test on a second phone/account.
11. Only after this works, let all staff use it.

## Conflict test (important)

1. Phone A opens one test job but does not save yet.
2. Phone B edits that same job and saves.
3. Phone A now tries to save its old open copy.
4. Phone A should show **SYNC CONFLICT** and say nothing was overwritten.
5. Phone A presses **Sync now**, reopens job, and edits again.

That proves the anti-wipe / anti-overwrite safety is working.
