# American Skin Art Website

Welcome to the American Skin Art website repository! This is a custom static site for the studio, featuring artist portfolios, a coming-soon shop, FAQs, contact info, and a JSON-powered gallery. The site is built with HTML/CSS (Tailwind CDN) and lightweight JavaScript for interactive features.

## Project Overview

- **Static HTML/CSS/JS** — No build step required; just open in your browser or use any static server.
- **Artist Portfolios** — Each artist has a dedicated page under `artists/`.
- **Shop & Merch** — Preview and info in `shop.html` (coming soon).
- **Recent Work Slider** — JSON-driven, easily updatable.
- **PWA Support** — Installable with service worker and manifest.

## Recent Updates

- Instagram feed automation logic added (currently disabled until all artist tokens/IDs are collected).
- New documentation for artist onboarding and automation in `admin/` and project root.
- Improved internal organization for scripts, workers, and data files.

## Repository Structure

See the project tree for details on folders and files. Notable folders:

- `artists/` — Individual artist portfolio pages
- `assets/` — CSS, JS, and UI images
- `images/` — Full-resolution artwork and logos
- `data/` — JSON feeds for artists, shop, and galleries
- `admin/` — Internal documentation and automation notes
- `scripts/`, `workers/` — Automation helpers and Cloudflare Worker code

## For Maintainers & Contributors

See `admin/README.md` for internal documentation, automation setup, and instructions for adding new artists or updating data-driven sections.

---

For questions or contributions, please open an issue or contact the repository owner.
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
