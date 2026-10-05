# AP STUDY – Static Resource Website
Files: `index.html`, `style.css`, `script.js`, `robots.txt`, `sitemap.xml`. Upload all to the GitHub repo root (`butanepropile-code/Download-Fromhere`). No build step.

## Google Sheet (ID `1RzZkw3LiC0ICwT-Gmp47potgY0OvWw2-iC9XsDeSNNQ`, tab `Sheet1`)
Row 1 headers exactly: `ID | Title | Category | Description | Image | Resource URL | Telegram URL | Status`
- Share → General access → **Anyone with the link: Viewer** (and optionally File → Share → Publish to web).
- Add resource = add a row, Status `Active`. Deactivate = change Status to anything else (e.g. `Inactive`).
- Image must be a direct image URL (.jpg/.png). Telegram URL can be `@name` or a full link.

## Deploy / update
Repo → Settings → Pages → Deploy from branch `main` / root. Site: https://butanepropile-code.github.io/Download-Fromhere/ . To update code, re-upload the file; sheet changes need no upload.

## Settings
Top of `script.js` (`CFG`): step durations, Telegram channels, social links, contact, logo. Ads: `AD` object + `nativeAd()` in `script.js`; popunder/social-bar scripts at the end of `index.html`.

## Troubleshooting
- "Resources are temporarily unavailable": sheet not shared publicly, wrong tab name, or offline.
- Logo shows "AP": the Google Photos share link is not a direct image; upload a logo to the repo (e.g. `logo.png`) and set `logo:'logo.png'`.
- No ads: ad blockers hide them; ad networks need an approved domain.
## Security
No keys or secrets exist in this project. Sheet text is escaped before display; only http/https links are accepted.
