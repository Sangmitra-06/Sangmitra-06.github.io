# Personal site

Static site (plain HTML/CSS/JS, no build step, no auto-sync). Everything —
including publications — is hand-maintained by editing files directly.

## 1. Fill in your details

Search for `[ADD]` and `verify` tags across the repo before publishing:

- **`js/site-config.js`** — name, tagline, email, links, CV link.
- **`data/publications.json`** — your publications, grouped into categories
  you define (e.g. "Cultural bias & representation", "Benchmark design").
  Add/edit/remove entries directly; no script touches this file. Each entry:
  ```json
  {
    "title": "Paper title",
    "authors": "Author list",
    "venue": "ACL 2026",
    "year": 2026,
    "url": "https://...",
    "citations": 4
  }
  ```
  The `stats` block at the top (total citations / h-index) is optional —
  fill it in by hand from your Scholar profile if you want it shown, or
  delete the block entirely.
- **`portfolio.html`** — experience, presentations, and awards timeline.
  I pre-filled what I had context on, flagged with `verify` tags since I
  wasn't certain of exact dates — check those before publishing.

## 2. Logo

The monogram in the nav (top-left) and the favicon are both generated from
the first letter of `SITE_CONFIG.name` in `js/site-config.js` — change your
name there and both update. If you want a different letter or a custom mark
instead of the auto-generated monogram, edit the SVG directly in
`js/main.js` (`renderNav`) and `assets/favicon.svg`.

## 3. Turn on GitHub Pages

In this repo: **Settings → Pages → Build and deployment → Source: "Deploy
from a branch"**, branch `main`, folder `/ (root)`. Save. Your site will be
live at `https://sangmitra-06.github.io/PersonalWebsite/` within a minute or
two, and stay live automatically on every push to `main`.

## 4. Local preview

No build step needed — but don't just double-click the HTML files, since
the browser blocks local JSON fetches from `file://` URLs. Run a local
server instead:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000 (not the file:/// path)
```

Or use VS Code's "Live Server" extension — right-click `index.html` →
"Open with Live Server".

## Structure

```
index.html            Home
research.html          Publications (reads data/publications.json)
portfolio.html          Experience, presentations, awards
css/style.css           All styling
js/site-config.js        Edit this for name/links/bio copy
js/main.js              Shared nav/footer + logo rendering
js/research.js           Publications list rendering (by category)
data/publications.json   Hand-maintained — edit directly, no sync
assets/favicon.svg        Logo mark used as favicon
```
