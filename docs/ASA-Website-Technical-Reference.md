# American Skin Art - Website Technical Reference

## Website Information

**Primary Domain:** americanskinart.com
**Canonical URL:** https://americanskinart.com/

## Site Structure

### Main Pages
1. **Home/Index** (`index.html`)
   - Hero section with logo
   - Portfolio showcase (Instagram feed integration)
   - Shop slideshow
   - Booking form
   - Contact information

2. **Artists** (`artists.html`)
   - Overview of all artists
   - Links to individual artist profiles
   - Memorial section for Dead Ed Walker

3. **Individual Artist Pages** (`artists/`)
   - `sinisterblack_tattoos.html` - Devin Goff
   - `dannypeltier.ink.html` - Danny Peltier
   - `cruelbloomtattoo.html` - Dale Murray
   - `deadedwalker_memorial.html` - Memorial page

4. **Flash** (`flash.html`)
   - Available flash designs

5. **FAQ** (`faq.html`)
   - Frequently asked questions
   - Booking information
   - Policies

6. **Contact** (`contact.html`)
   - Contact form
   - Business hours
   - Location map
   - Phone and email

7. **About** (`about.html`)
   - Studio history
   - Mission and values

8. **Shop** (`shop.html`)
   - Coming soon page
   - Merchandise preview
   - Future online store

## Navigation Structure

### Desktop Navigation (All Pages)
Order: Artists → Flash → FAQ → [Logo] → Contact → About → Shop

### Mobile Navigation (Hamburger Menu)
Order: Portfolio → Artists → Flash → FAQ → Contact → About → Shop → Book Now

## Technical Details

### Meta Information

#### SEO
- **Primary Description:** "American Skin Art in North Tonawanda is a Buffalo-area tattoo studio specializing in black and grey, realism, fine line, and cover-up tattoos. Every piece starts with a real conversation and is designed for comfort, safety, and long-lasting quality—trusted by Buffalo, Bills Mafia, and the 716."
- **Keywords:** American Skin Art, tattoo shop Buffalo, tattoo artist Buffalo NY, Buffalo tattoos, North Tonawanda tattoos, Devin Goff, black and grey tattoos, custom tattoo artist, realism tattoos, fine line tattoos, cover up tattoos, 716 tattoos, Bills Mafia tattoos, Sabres tattoos, Buffalo NY tattoo studio, Niagara Falls tattoos, Western New York tattoos, WNY tattoo artist, private tattoo studio Buffalo
- **Robots:** index, follow
- **Theme Color:** #0b0b0b (dark black)

#### Open Graph (Social Sharing)
- **OG Title:** American Skin Art — Devin Goff
- **OG Description:** American Skin Art is a custom tattoo studio in North Tonawanda offering black and grey, realism, fine line, and custom tattoos by artist Devin Goff. View portfolio and book a consult.
- **OG Type:** website
- **OG URL:** https://americanskinart.com/
- **OG Image:** https://americanskinart.com/images/asa_logo.png
- **OG Locale:** en_US

### Analytics & Tracking

**Google Analytics:**
- **Tracking ID:** G-YRJES7B1V5
- **Status:** Currently commented out (disabled until site goes live)
- **Location:** Top of `<head>` on all pages
- **Note:** To activate, uncomment the Google Analytics code blocks

### Fonts

**Font Families:**
- **Primary (Body):** 'Inter', Arial, sans-serif
  - Weights: 300, 400, 600, 800
- **Display (Headings):** 'Cormorant Garamond', serif
  - Weights: 400, 600, 700
- **Source:** Google Fonts

### Styling Framework

**Tailwind CSS:**
- Delivered via CDN: https://cdn.tailwindcss.com
- Custom styles in: `assets/css/styles.css?v=asa-v2`

### Color Scheme

**Primary Colors:**
- **Background:** #0b0b0b (near-black)
- **Text:** #f4f4f4 (off-white)
- **Accent:** #c1121f (red)
- **Zinc Grays:** Various zinc shades (300, 400, 500, 600)

**Selection Color:**
- Background: red-700 at 50% opacity

### Icons & Images

**Favicon & App Icons:**
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`

**Primary Logo:**
- Full logo: `images/asa_logo.png`
- Symbol: `images/asa_symbol_white_transparent.png`

## Forms & Integrations

### Booking Form
- **Form Handler:** Formspree
- **Action URL:** https://formspree.io/f/mvgerjvo
- **Method:** POST
- **Reply-To:** admin@americanskinart.com

**Form Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Placement
- Preferred Artist (Devin Goff, Danny Peltier, Dale Murray, No Preference)
- Tattoo Idea/Description
- Hidden field: artist-prefill (for URL parameter pre-filling)

### Consent Form
**External Link:** https://americanskinart.paperform.co

### Contact Email
**Primary Contact:** admin@americanskinart.com
**Link Type:** mailto: protocol (opens default email client)

### Map Integration
**Google Maps Embed Link:**
```
https://www.google.com/maps?ll=43.023184,-78.877792&z=16&t=m&hl=en-US&gl=US&mapclient=embed&cid=5624804665664541133
```

**Coordinates:**
- Latitude: 43.039
- Longitude: -78.864

**Embedded Map Location:**
- Business: American Skin Art
- Address: 44 Webster St, North Tonawanda, NY 14120

## Portfolio & Gallery

### Instagram Feed Integration
**JSON Data Source:** `/data/instagram-feed.json`
**Container ID:** `recent-showcase`
**Implementation:** Dynamic loading via JavaScript

### Artist Galleries
**Data Storage:** Inline JSON in `<script>` tags with IDs:
- `devin-works`
- `danny-works`
- `dale-works`

**Image Locations:**
- Devin: `images/artists/sinisterblack_tattoos/`
- Danny: `images/artists/dannypeltier.ink/`
- Dale: `images/artists/cruelbloomtattoo/`

**Image Naming Convention:**
- `work-01.png` through `work-12.png`
- Devin uses: `devin-01.png` through `devin-12.png`

### Shop Slideshow
**Combined Image Sources:** All artist images
**Slideshows:** Separate desktop and mobile versions
- Desktop: `#shop-slideshow`
- Mobile: `#shop-slideshow-mobile`
**Auto-advance:** Every 4 seconds

### Lightbox Feature
**Functionality:**
- Click any `[data-lightbox]` image to view full-size
- Navigation: Arrow keys, on-screen buttons, swipe gestures
- Close: ESC key or click overlay
- IDs: `#lightbox`, `#lightbox-prev`, `#lightbox-next`

## JavaScript Functionality

### Custom Scripts
1. **Slider:** `assets/js/slider.js?v=asa-v2`
2. **Year Footer:** Auto-updates copyright year
3. **Mobile Menu:** Toggle hamburger navigation
4. **Form Validation:** Booking form submission handling
5. **Artist Picker:** Mobile-friendly artist selection overlay
6. **Lightbox:** Image gallery viewer
7. **Header Scroll:** Dynamic header background on scroll
8. **Hash Navigation:** Smooth scroll to anchor links

### Reload Behavior (Index Only)
On page reload with hash or query parameters, redirects to clean `index.html#top`

## Social Media & External Links

### Official Accounts
- **Instagram (Studio):** https://instagram.com/americanskinart
- **Facebook:** https://facebook.com/americanskinart
- **Devin Goff:** https://instagram.com/sinisterblack_tattoos
- **Danny Peltier:** https://instagram.com/dannypeltier.ink
- **Dale Murray:** https://instagram.com/cruelbloomtattoo
- **Site Creator:** https://instagram.com/ffogekaj (doomsday)

### Review Platforms
- **Google Maps:** Listed and linked
- **Yelp:** https://www.yelp.com/biz/american-skin-art-north-tonawanda
- **MapQuest:** https://www.mapquest.com/us/new-york/american-skin-art-1785761

### Share Links
- **Google Share:** https://share.google/s5hH7YX2zrZPiW8VM

## Schema Markup

### Structured Data (JSON-LD)
**Type:** TattooParlor
**ID:** https://americanskinart.com/

**Organization Details:**
- Name: American Skin Art
- URL: https://americanskinart.com
- Logo: https://americanskinart.com/images/asa_logo.png
- Description: Custom tattoo studio in North Tonawanda, NY specializing in black & grey, fine line, cover-ups, and bold custom work.

**Address:**
- Street: 44 Webster St
- City: North Tonawanda
- State: NY
- Postal Code: 14120
- Country: US

**Geo Coordinates:**
- Latitude: 43.039
- Longitude: -78.864

**Contact:**
- Telephone: +17166949185

**Hours:**
- Tuesday-Friday: 12:00-20:00
- Saturday: 12:00-20:00

**Price Range:** $$

**Founder:**
- Name: Devin Goff
- Title: Owner/Lead Artist
- Social: https://instagram.com/sinisterblack_tattoos

**Employees:**
1. Danny Peltier - Tattoo Artist (@dannypeltier.ink)
2. Dale Murray - Tattoo Artist (@cruelbloomtattoo)

## Mobile Responsiveness

### Breakpoints
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px

### Mobile-Specific Features
1. Hamburger menu navigation
2. Full-screen mobile menu overlay
3. Touch/swipe lightbox controls
4. Mobile artist picker overlay (burger-style)
5. Responsive image sizing
6. Stacked layouts for forms and content

## Performance Optimizations

### Image Loading
- `loading="lazy"` on non-critical images
- `loading="eager"` on hero/logo images
- `decoding="async"` for non-blocking image decode

### Font Loading
- Preconnect to Google Fonts domains
- Font display: swap (implied)

### Version Cache Busting
- CSS: `?v=asa-v2`
- JS: `?v=asa-v2`
- Images: `?t=20251204` (timestamp-based)

## Accessibility Features

### ARIA Labels
- Navigation: `aria-label="Main navigation"`
- Buttons: Descriptive aria-labels
- Links: Meaningful link text and aria-labels
- Live regions: `aria-live="polite"` on form status

### Semantic HTML
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Proper heading hierarchy
- Form labels (some using `sr-only` for visual design)

### Keyboard Navigation
- Arrow keys for lightbox
- ESC to close modals/overlays
- Tab navigation support

## Footer Information

### Footer Content
1. Business address with link to Google Maps
2. Copyright notice with auto-updating year
3. Site creator credit: "Site by doomsday" → @ffogekaj

### Floating Creator Badge
**Position:** Fixed bottom-right
**Content:**
- Profile image: `images/artists/creator-pfp.png`
- Text: "doomsday"
- Link: https://instagram.com/ffogekaj

## URL Parameters

### Booking Form Pre-fill
**Parameter:** `?artist=[Artist Name]#book`

**Examples:**
- `index.html?artist=Devin%20Goff#book`
- `index.html?artist=Danny%20Peltier#book`
- `index.html?artist=Dale%20Murray#book`

**Functionality:** Auto-selects preferred artist in booking form

## File Structure Summary

```
/
├── index.html
├── about.html
├── artists.html
├── contact.html
├── faq.html
├── flash.html
├── shop.html
├── artists/
│   ├── sinisterblack_tattoos.html
│   ├── dannypeltier.ink.html
│   ├── cruelbloomtattoo.html
│   └── deadedwalker_memorial.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── slider.js
│   └── img/
│       └── ui/
│           ├── instagram-logo.svg
│           ├── facebook-logo.svg
│           └── tiktok-logo.svg
├── images/
│   ├── asa_logo.png
│   ├── asa_symbol_white_transparent.png
│   ├── artists/
│   │   ├── sinisterblack_tattoos/
│   │   ├── dannypeltier.ink/
│   │   ├── cruelbloomtattoo/
│   │   ├── deadedwalker/
│   │   └── creator-pfp.png
│   └── shop/
│       ├── black_tshirt.png
│       ├── black_hoodie.png
│       └── black_trucker_hat.png
├── data/
│   └── instagram-feed.json
└── [favicon files]
```
