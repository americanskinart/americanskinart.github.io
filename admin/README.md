# American Skin Art — Admin & Documentation

This document contains notable internal documentation, automation instructions, and setup guides for site maintainers and contributors.

---

## Automation & Instagram Feed
- See `ARTIST-INSTAGRAM-SETUP.md` for details on enabling the automated Instagram feed, what you need from each artist, and how to configure the Cloudflare Worker.
- See `scripts/AUTOMATION-README.md` for automation options (GitHub Action, Worker, etc.).

## Data Management
- `data/artists.json` — master list of artists and their metadata.
- `data/devin-works.json` — Devin's homepage/portfolio slider images.
- `data/instagram-feed.json` — (optional) static or automated Instagram feed.
- `data/shop.json` — merch and shop item data.

## Scripts & Workers
- `workers/instagram-feed.js` — Cloudflare Worker for multi-account Instagram feed.
- `workers/instagram-feed.example.js` — single-account example.
- `workers/wrangler.example.toml` — Worker deployment config example.
- `scripts/` — automation helpers and notes.

## Notable Internal Instructions
- For adding new artists, see `ARTIST-INSTAGRAM-SETUP.md`.
- For updating the homepage slider, see `data/devin-works.json` and `assets/js/slider.js`.
- For PWA/service worker, see `service-worker.js` and `site.webmanifest`.

## Recent Admin/Automation Updates
- Instagram feed logic is present but currently disabled until all artist tokens/IDs are collected.
- New documentation files: `ARTIST-INSTAGRAM-SETUP.md` (artist onboarding), this file (admin notes).
- See root `README.md` for public-facing project info and structure.

---

For any new automation, deployment, or data changes, document the process here or in a new file in the `admin/` folder.
