# American Skin Art Website

Custom static site for American Skin Art, covering the studio homepage, artist bios, coming-soon shop, FAQs, contact information, and supporting JSON-powered galleries. The site is authored directly in HTML/CSS with a Tailwind CDN layer, plus a few lightweight JavaScript helpers for sliders, lightboxes, and the service worker.

## Project Layout

```
├── *.html                  # Top-level pages (home, artists, FAQ, shop, contact, etc.)
├── artists/                # Individual artist portfolio pages
│   ├── sinisterblack_tattoos.html    # Devin Goff portfolio
│   ├── cruelbloomtattoo.html         # Dale Murray portfolio
│   ├── dannypeltier.ink.html         # Danny Peltier portfolio
│   └── deadedwalker_memorial.html    # Dead Ed Walker memorial
├── assets/
│   ├── css/                # Global styles (`styles.css`, legacy `main.css` overrides)
│   ├── img/                # UI icons + reusable graphics
│   └── js/                 # `main.js` interactions + `slider.js` for the recent-work carousel
├── images/                 # Full-resolution artist, merch, and logo imagery grouped by usage
│   └── artists/            # Artist-specific images organized by handle
│       ├── sinisterblack_tattoos/
│       ├── cruelbloomtattoo/
│       ├── dannypeltier.ink/
│       └── creator-pfp.png
├── data/                   # JSON feeds (artist bios, Instagram feed stub, shop items, Devin works)
├── blocks/                 # Reusable HTML blocks and snippets
├── admin/, scripts/, workers/  # Admin notes, automation helpers, Cloudflare Worker examples
└── snippets/               # Drop-in HTML fragments (e.g., recent work block)
```

### Notable Pages
- `index.html` – hero, booking CTAs, rotating recent work, and studio story.
- `artists.html` – main artists directory with links to individual portfolios.
- `shop.html` – merch preview blocks, storefront imagery, and call-to-action card.
- `contact.html` – centered studio details, satellite map, and Instagram handles.
- `faq.html`, `coming-soon.html` – supporting informational views.
- `artists/` folder – individual artist portfolio pages with detailed bios, lightbox galleries, and booking CTAs:
  - `sinisterblack_tattoos.html` – Devin Goff (owner/lead artist)
  - `cruelbloomtattoo.html` – Dale Murray
  - `dannypeltier.ink.html` – Danny Peltier
  - `deadedwalker_memorial.html` – memorial page for Dead Ed Walker

### Supporting Data & Scripts
- `data/artists.json` feeds shared artist metadata.
- `data/devin-works.json` plus `assets/js/slider.js` drive the Devin slider on the homepage and his solo page.
- `assets/js/slider.js` contains `ARTIST_ROUTES` array mapping artist handles to their portfolio pages in the `artists/` folder.
- `service-worker.js` and `site.webmanifest` prep the site for installable/PWA behavior.
- `blocks/` contains reusable HTML snippets like `dead_ed_memorial.txt` for the memorial footer link.

## Working Locally
1. Clone this repo somewhere convenient.
2. Open the folder in VS Code (recommended) to benefit from workspace settings.
3. Edit the HTML/CSS/JS files directly; Tailwind utilities are already available via CDN, so no build step is required.
4. Use any static server (VS Code Live Server, `python -m http.server`, etc.) if you want live reload, otherwise open the `.html` files in a browser.
5. Save image assets under `images/` or `assets/img/` depending on reuse needs. Keep filenames lowercase with hyphens.

## Updating Data-Driven Sections
- **Recent Work slider:** Upload new artwork to `images/artists/<name>/works/` and update `data/devin-works.json` with filename + alt text.
- **Artists list:** Adjust `data/artists.json`, then ensure each artist's page under `artists/` mirrors the URL slug.
- **Instagram feed placeholder:** `data/instagram-feed.json` is a stub for the worker under `workers/` if you plan to automate.
- **Artist portfolio pages:** All artist pages are located in the `artists/` folder. When linking to them from the root, use `artists/filename.html` (e.g., `artists/sinisterblack_tattoos.html`).
- **Artist page links:** Artist pages use relative paths with `../` to reference root-level files (e.g., `../index.html`, `../assets/css/styles.css`, `../images/`).

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
- Update `sitemap.xml` whenever routes change (all artist pages are now under `artists/` path).
- Keep the Cloudflare Worker example (`workers/instagram-feed.example.js`) in sync with any live worker code.
- Re-run accessibility and performance checks (Lighthouse/Pagespeed) after major layout shifts, since this is a purely static stack.
- When adding new artist pages, place them in the `artists/` folder and update:
  - `assets/js/slider.js` ARTIST_ROUTES array
  - `sitemap.xml` with the new page URL
  - `artists.html` main directory page
  - Any navigation menus or links

## Recent Changes (December 2025)

### Site Reorganization
All artist portfolio pages have been moved from the root directory into the `artists/` folder for better organization:

**Files Moved:**
- `sinisterblack_tattoos.html` → `artists/sinisterblack_tattoos.html`
- `cruelbloomtattoo.html` → `artists/cruelbloomtattoo.html`
- `dannypeltier.ink.html` → `artists/dannypeltier.ink.html`
- `deadedwalker_memorial.html` → `artists/deadedwalker_memorial.html`

**Updated Files:**
- All internal links in artist pages now use `../` for root-level references
- `artists.html` - Updated all artist portfolio links
- `assets/js/slider.js` - Updated ARTIST_ROUTES array
- `sitemap.xml` - Updated all artist page URLs
- `index.html`, `faq.html`, `shop.html`, `contact.html` - Updated memorial links
- `blocks/Artists.txt`, `blocks/dead_ed_memorial.txt` - Updated snippet links
- `snippets/owner-cta-link.snippet.html` - Updated portfolio link

This reorganization makes the site structure cleaner and easier to maintain without affecting any functionality.
