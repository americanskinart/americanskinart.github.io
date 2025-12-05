# American Skin Art Website

Custom static site for American Skin Art, covering the studio homepage, artist bios, coming-soon shop, FAQs, contact information, and supporting JSON-powered galleries. The site is authored directly in HTML/CSS with a Tailwind CDN layer, plus a few lightweight JavaScript helpers for sliders, lightboxes, and the service worker.

## Project Layout

```
├── *.html                  # Top-level pages (home, FAQ, shop, contact, artist promos, etc.)
├── assets/
│   ├── css/                # Global styles (`styles.css`, legacy `main.css` overrides)
│   ├── img/                # UI icons + reusable graphics
│   └── js/                 # `main.js` interactions + `slider.js` for the recent-work carousel
├── images/                 # Full-resolution artist, merch, and logo imagery grouped by usage
├── data/                   # JSON feeds (artist bios, Instagram feed stub, shop items, Devin works)
├── artists/                # Individual artist landing pages (`devin-walker.html`, etc.)
├── admin/, scripts/, workers/  # Admin notes, automation helpers, Cloudflare Worker examples
└── snippets/               # Drop-in HTML fragments (e.g., recent work block)
```

### Notable Pages
- `index.html` – hero, booking CTAs, rotating recent work, and studio story.
- `shop.html` – merch preview blocks, storefront imagery, and call-to-action card.
- `contact.html` – centered studio details, satellite map, and Instagram handles.
- `faq.html`, `contact.html`, `shop.html`, `coming-soon.html` – supporting informational views.
- `artists/` children – detailed bios, lightbox galleries, CTA buttons per artist.

### Supporting Data & Scripts
- `data/artists.json` feeds shared artist metadata.
- `data/devin-works.json` plus `assets/js/slider.js` drive the Devin slider on the homepage and his solo page.
- `service-worker.js` and `site.webmanifest` prep the site for installable/PWA behavior.

## Working Locally
1. Clone this repo somewhere convenient.
2. Open the folder in VS Code (recommended) to benefit from workspace settings.
3. Edit the HTML/CSS/JS files directly; Tailwind utilities are already available via CDN, so no build step is required.
4. Use any static server (VS Code Live Server, `python -m http.server`, etc.) if you want live reload, otherwise open the `.html` files in a browser.
5. Save image assets under `images/` or `assets/img/` depending on reuse needs. Keep filenames lowercase with hyphens.

## Updating Data-Driven Sections
- **Recent Work slider:** Upload new artwork to `images/artists/<name>/works/` and update `data/devin-works.json` with filename + alt text.
- **Artists list:** Adjust `data/artists.json`, then ensure each artist’s page under `artists/` mirrors the URL slug.
- **Instagram feed placeholder:** `data/instagram-feed.json` is a stub for the worker under `workers/` if you plan to automate.

## Publishing to GitHub Pages
The production site is served from the `americanskinart/americanskinart.github.io` repo. To deploy:

1. **Clone the Pages repo (if you haven’t already):**
   ```bash
   git clone git@github.com:americanskinart/americanskinart.github.io.git
   cd americanskinart.github.io
   ```
2. **Copy the latest build:** From your working copy of this repo, copy all public files (HTML, assets, images, data, etc.) into the Pages repo root. Overwrite existing files to keep it in sync. Example on macOS/Linux:
   ```bash
   rsync -av --delete ../american-skin-art/ ./
   ```
   On Windows PowerShell:
   ```powershell
   robocopy C:\path\to\american-skin-art C:\path\to\americanskinart.github.io /MIR
   ```
   (Skip `.git`, `.vscode`, or other local-only folders if needed.)
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Deploy updated site"
   git push origin main
   ```
4. **Verify:** GitHub Pages will automatically rebuild. Visit `https://americanskinart.github.io/` (or the custom domain if configured) after a minute to ensure the update looks correct.

### Tips
- Keep backups of large image assets outside the repo if storage becomes a concern.
- Use `git status` before copying to Pages so you only deploy intentional changes.
- If you add new directories (e.g., additional artist folders), make sure the copy step mirrors them as well so the live site stays identical to this source.

## Maintenance Checklist
- Update `robots.txt`, `sitemap.xml`, and `site.webmanifest` whenever routes change.
- Keep the Cloudflare Worker example (`workers/instagram-feed.example.js`) in sync with any live worker code.
- Re-run accessibility and performance checks (Lighthouse/Pagespeed) after major layout shifts, since this is a purely static stack.
