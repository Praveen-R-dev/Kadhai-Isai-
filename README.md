# Kadhai Isai — Website

Everything you need to put this site online, add your audio samples, and
collect client info into Google Sheets — no coding experience required,
just follow each step in order.

## 1. What's in this folder

```
kadhai-isai-website/
├── index.html              ← the page content (edit text here)
├── css/
│   └── style.css            ← all colors, spacing, fonts (edit design here)
├── js/
│   └── script.js            ← animations + the contact form logic
├── assets/
│   └── audio/                ← put your mp3 files in here
├── google-apps-script/
│   └── Code.gs               ← goes INTO Google Sheets, not GitHub (see step 4)
└── README.md                 ← this file
```

**Why plain HTML/CSS/JS instead of React?**
React needs a build step (npm, a bundler, a build server) before it can go
live — that's an extra layer you don't need for a one-page site like this.
Plain HTML/CSS/JS uploads straight to GitHub Pages and works immediately,
which is the fastest path to "live today." If you later want a multi-page
site with a lot of interactive logic (a client dashboard, a booking system
with logins, etc.), that's when React starts to earn its complexity — happy
to build that version when you're there.

## 2. How to edit things

- **Change any text** (headings, prices, bio) → open `index.html`, find the
  text between tags, edit it, save.
- **Change colors/fonts/spacing** → open `css/style.css`. Near the top you'll
  see:
  ```css
  :root{
    --ink:#15120f;      /* background */
    --gold:#d9a548;     /* accent color */
    --maroon:#7c2f2f;
    --teal:#4c7a73;
  }
  ```
  Change the hex codes and the whole site updates everywhere that color is used.
- **Change animations/behavior** → `js/script.js`.

You can edit these directly on GitHub.com (click the pencil icon on any file)
— you don't need to install anything on your computer.

## 3. Put this on GitHub and make it live (GitHub Pages)

1. Go to [github.com](https://github.com) → sign in (or create a free account).
2. Click the **+** icon top-right → **New repository**.
   - Name it something like `kadhai-isai-website`
   - Set it to **Public**
   - Click **Create repository**
3. On the new repo page, click **uploading an existing file**.
4. Drag in ALL the files and folders from this project, keeping the same
   folder structure (`css/style.css` must stay inside a `css` folder, etc.)
5. Click **Commit changes**.
6. Go to **Settings** (top tab) → **Pages** (left sidebar).
7. Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
8. Branch: `main`, folder: `/ (root)` → **Save**.
9. Wait ~1 minute, refresh the page. You'll see a green box with your live URL:
   `https://yourusername.github.io/kadhai-isai-website/`

That's it — that URL is your live website. Any time you edit a file on
GitHub and commit, the live site updates in ~1 minute automatically.

## 4. Adding your sample audio

You have two options:

### Option A — Host the files yourself (simplest)
1. Put your `.mp3` files inside the `assets/audio/` folder.
2. Name them clearly, e.g. `yembuttu-irukkuthu-aasai.mp3`, `yaazhini.mp3`.
3. In `index.html`, find these lines (there are two, one per song):
   ```html
   <source src="assets/audio/track1.mp3" type="audio/mpeg">
   ```
   Change `track1.mp3` to your actual filename, e.g.:
   ```html
   <source src="assets/audio/yembuttu-irukkuthu-aasai.mp3" type="audio/mpeg">
   ```
4. Upload the mp3 files to GitHub the same way you uploaded everything else
   (make sure they land inside `assets/audio/`).

Keep individual files under ~20MB for fast loading — if a track is longer,
export a slightly lower-bitrate mp3 (128–192kbps is plenty for previews).

### Option B — Host on SoundCloud/YouTube and embed
If you'd rather not store audio in GitHub (e.g. many long tracks), upload the
track to SoundCloud or YouTube (can be "unlisted"), then replace the
`<audio>` block in `index.html` with their embed `<iframe>` code, which
SoundCloud/YouTube give you on the Share → Embed screen.

## 5. Connect the contact form to Google Sheets

This lets every form submission on your site land automatically as a new
row in a Google Sheet — free, no backend server needed.

**Step 1 — Create the sheet**
1. Go to [sheets.google.com](https://sheets.google.com) → create a new blank sheet.
2. Name it `Kadhai Isai Bookings`.
3. In row 1, add headers: `Timestamp | Name | Occasion | Language | Story | Contact`.

**Step 2 — Add the script**
1. In the sheet, go to **Extensions → Apps Script**.
2. Delete anything in the code editor, and paste in the contents of
   `google-apps-script/Code.gs` (from this project).
3. Click the **Save** icon (disk symbol).

**Step 3 — Deploy it as a web app**
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. It will ask you to authorize — click through (Google will warn you it's
   an unverified app since you wrote it yourself; click **Advanced → Go to
   [project name] (unsafe)** → **Allow**). This is safe — it's your own script.
6. Copy the **Web app URL** it gives you (looks like
   `https://script.google.com/macros/s/XXXXXXXX/exec`).

**Step 4 — Connect it to your website**
1. Open `js/script.js`.
2. Find this line near the top:
   ```js
   const GOOGLE_SHEET_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder text with the URL you copied, keeping the quotes:
   ```js
   const GOOGLE_SHEET_ENDPOINT = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```
4. Save, upload the updated `script.js` to GitHub (or edit it directly on
   GitHub.com).

**Step 5 — Test it**
1. Open your live site, fill out the "Tell me what happened" form, submit.
2. Check your Google Sheet — a new row should appear within a few seconds.
3. If it doesn't work: re-open the Apps Script deployment, click **Manage
   deployments**, confirm "Who has access" is still set to **Anyone**, and
   double-check the URL in `script.js` matches exactly (no extra spaces).

**Note:** if you ever edit `Code.gs` again, you need to create a **New
deployment** (not just save) for the changes to take effect, since Apps
Script deployments are versioned snapshots.

## 6. Placeholders you still need to fill in

Search `index.html` for these and replace them with your real info:
- `assets/audio/track1.mp3` / `track2.mp3` → your real filenames
- `youremail@example.com` → your email
- `+91XXXXXXXXXX` → your WhatsApp number (no spaces, with country code)
- `@yourhandle` → your Instagram handle
- `₹ ——,———` → your real prices (three places, in the Packages section)
- The three testimonial quotes → real client feedback once you have it

## 7. Questions to come back with

If you want any of these next, just ask:
- A custom domain (e.g. `kadhaiisai.com`) instead of the github.io address
- An admin view that reads booking data back out of the Sheet
- A React version, if the site grows into something with logins/dashboards
- Instagram caption copy for your launch posts
