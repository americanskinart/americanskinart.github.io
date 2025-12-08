# Dynamic Slideshow System

## Overview

The slideshow on the homepage dynamically pulls images from artist folders. Add or remove images from the slideshow folders, then run a simple command to update the site.

## Folder Structure

```
images/artists/
├── sinisterblack_tattoos/
│   └── slideshow/           ← Drop images here for Devin
├── dannypeltier.ink/
│   └── slideshow/           ← Drop images here for Danny
└── cruelbloomtattoo/
    └── slideshow/           ← Drop images here for Dale
```

## How to Use (GitHub Pages Compatible)

### Adding New Images

1. **Drop images** into the artist's `slideshow` folder
   - Example: `images/artists/sinisterblack_tattoos/slideshow/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

2. **Run the generator script**:
   ```bash
   python generate-slideshow-json.py
   ```
   This scans all slideshow folders and updates `data/slideshow-images.json`

3. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Added new slideshow images"
   git push
   ```

4. Done! The slideshow will automatically show your new images (newest first)

### Removing Images

1. Delete the image from the slideshow folder
2. Run `python generate-slideshow-json.py`
3. Commit and push changes

### Image Guidelines

- **File Naming**: Use descriptive names (e.g., `skull-tattoo-01.jpg`, `rose-sleeve.png`)
- **File Size**: Optimize images for web (recommended < 2MB per image)
- **Dimensions**: Consistent aspect ratios work best (portrait or square)
- **Quality**: Use high-quality images that showcase the work well

## Features

- **GitHub Pages Compatible**: Pure JavaScript solution, no server required
- **Newest First**: Images are sorted by modification time (newest appear first)
- **Clickable Links**: Each image links to the respective artist's page
- **Responsive**: Works on both desktop and mobile devices
- **Simple Updates**: Just run one command after adding/removing images

## Technical Details

### How It Works

1. Images are stored in `images/artists/{artist}/slideshow/` folders
2. Running `python generate-slideshow-json.py` scans these folders
3. The script creates/updates `data/slideshow-images.json` with all images
4. The website loads this JSON file and displays the slideshow
5. Images are sorted by modification time (newest first)

### Artist Configuration

To add a new artist, edit `generate-slideshow-json.py`:

```python
ARTISTS = {
    'artist_folder_name': {
        'handle': '@instagram_handle',
        'page': 'artists/artist-page.html'
    }
}
```

### Slideshow Settings

The slideshow auto-advances every 4 seconds. To change this, edit the `setInterval` value in `index.html`:

```javascript
setInterval(nextSlide, 4000); // 4000 = 4 seconds
```

## Troubleshooting

**Images not showing up?**
- Make sure you ran `python generate-slideshow-json.py` after adding images
- Check the file extension is supported (jpg, jpeg, png, gif, webp)
- Verify `data/slideshow-images.json` was updated (check the file modification time)
- Clear your browser cache and refresh

**Need to change artist links?**
- Edit the `ARTISTS` dictionary in `generate-slideshow-json.py`
- Run the script again to regenerate the JSON

**Want different slideshow speeds?**
- Change the `setInterval` timing in [index.html:1163](index.html:1163) (currently 4000ms)

## Requirements

- Python 3 (already installed on your system)
- That's it! Works with any static hosting (GitHub Pages, Netlify, etc.)
